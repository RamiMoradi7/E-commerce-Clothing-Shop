import { cyber } from "../2-utils/cyber";
import { ValidationError } from "../3-models/client-errors";
import { ICredentialsModel } from "../3-models/credentials-model";
import { RoleModel } from "../3-models/role-model";
import { IUserModel, UserModel } from "../3-models/user-model";

class AuthService {
  public async register(user: IUserModel): Promise<string> {
    const errors = user.validateSync();
    if (errors) throw new ValidationError(errors.message);
    const isTaken = await this.isEmailTaken(user.email);
    if (isTaken) throw new ValidationError("Email is already taken.");
    user.password = cyber.hashPassword(user.password);
    user.roleId = RoleModel.User;
    const addedUser = await user.save();
    user.id = addedUser._id;
    const token = cyber.getNewToken(user);
    return token;
  }

  public async login(credentials: ICredentialsModel): Promise<string> {
    credentials.validateSync();
    credentials.password = cyber.hashPassword(credentials.password);
    const user = await UserModel.findOne({
      email: credentials.email,
      password: credentials.password,
    }).exec();
    if (!user) {
      throw new ValidationError("Incorrect email or password.");
    }
    const token = cyber.getNewToken(user);
    return token;
  }

  private async isEmailTaken(email: string): Promise<boolean> {
    const existingUser = await UserModel.findOne({ email }).exec();
    if (!existingUser) {
      return false;
    }
    return true;
  }
}
export const authService = new AuthService();
