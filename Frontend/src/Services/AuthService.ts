import axios from "axios";
import { UserModel } from "../Models/UserModel";
import { appConfig } from "../Utils/AppConfig";
import { jwtDecode } from "jwt-decode";
import { appStore } from "../Redux/Store";
import { authActions } from "../Redux/AuthSlice";
import { CredentialsModel } from "../Models/CredentialsModel";
import { cartActions } from "../Redux/CartSlice";

class AuthService {
  public constructor() {
    const token = sessionStorage.getItem("token");
    if (token) {
      const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;
      appStore.dispatch(authActions.login(loggedInUser));
    }
  }
  public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>(appConfig.registerUrl, user);
    const token = response.data;
    const registeredUser = jwtDecode<{ user: UserModel }>(token).user;
    appStore.dispatch(authActions.register(registeredUser));
    sessionStorage.setItem("token", token);
  }
  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>(appConfig.loginUrl, credentials);
    const token = response.data;
    const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;
    appStore.dispatch(authActions.login(loggedInUser));
    sessionStorage.setItem("token", token);
    appStore.dispatch(cartActions.resetCart());
  }
  public logOut(): void {
    appStore.dispatch(authActions.logOut());
    sessionStorage.removeItem("token");
    appStore.dispatch(cartActions.resetCart());
  }
}
export const authService = new AuthService();
