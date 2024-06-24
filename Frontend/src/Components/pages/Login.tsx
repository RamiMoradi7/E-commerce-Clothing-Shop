import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import loginBackground from "../Assets/Images/LoginWallpaper.jpg";
import { CredentialsModel } from "../../Models/CredentialsModel";
import { appStore } from "../../Redux/Store";
import { authService } from "../../Services/AuthService";
import { notify } from "../../Utils/Notify";
import { useTitle } from "../../hooks/useTitle";
import PasswordInput from "../AuthArea/Inputs/PasswordInput/PasswordInput";
import EmailInput from "../Common/Inputs/EmailInput/EmailInput";

function Login() {
  useTitle("Login");
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function login(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      const firstName = appStore.getState().user.firstName;
      notify.success(`Welcome back ${firstName} 😊`);
      navigate("/");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="bg-gray-700 bg-opacity-50 rounded-xl px-8 py-10 shadow-lg backdrop-blur-md max-w-md w-full">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="mb-2 text-2xl">Login</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <form onSubmit={handleSubmit(login)} className="space-y-4">
            <div className="space-y-2">
              <EmailInput register={register} />
              <PasswordInput register={register} />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <NavLink to={"/register"} className="text-gray-300 hover:underline">
              Don't have an account? Register.
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
