import { Link } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import OAuthButton from "../components/OAuthButton";

const Login = () => {
  return (
    <section className="hero sec-padding bg-[url('/background/Itsukushima_shrine.png')] bg-cover bg-center">
      <div className="grid lg:grid-cols-2 w-full items-center place-items-center">
        <div className="flex flex-col max-w-[420px]  bg-black/20 rounded-xl backdrop-blur-xl p-8 gap-6 drop-shadow-xl sm:max-w-none sm:w-[560px] sm:p-12 sm:rounded-2xl lg:w-[650px] lg:p-20 lg:gap-12 lg:rounded-3xl">
          <form className="flex flex-col gap-4 md:gap-8">
            <Input type="email" label="Email" name="email" placeholder="Enter your email" />
            <Input type="password" label="Password" name="password" placeholder="Enter your password" />
            <Link to="#" className="text-base sm:text-lg md:text-xl hover:underline text-right">
              Forgot Password
            </Link>
            <Button size="md" primary={true}>
              SIGN IN
            </Button>
          </form>
          <OAuthButton>
            <img
              src="./icons/google-icon.svg"
              alt="google icon"
              className="size-5 sm:size-7"
            />
            Sign in with Google
          </OAuthButton>
          <p className="text-base sm:text-lg md:text-xl text-center">
            Are you new?{" "}
            <span>
              <Link to="/signup" className="font-semi-bold hover:underline">
                Create an Accout
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
