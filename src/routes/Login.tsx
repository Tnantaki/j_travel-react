import { Link } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";

const Login = () => {
  return (
    <section className="hero">
      <div className="grid grid-cols-2 w-full text-white mx-20 items-center place-items-center">
        <div className="flex flex-col w-[650px] h-[800px] bg-black/20 rounded-3xl backdrop-blur-xl p-20 gap-12 drop-shadow-xl">
          <form className="flex flex-col gap-8">
            <Input type="email" label="Email" name="email" placeholder="Enter your email" />
            <Input type="password" label="Password" name="password" placeholder="Enter your password" />
            <Link to="#" className="text-xl hover:underline text-right">
              Forgot Password
            </Link>
            <Button size="md" primary={true}>
              SIGN IN
            </Button>
          </form>
          <button className="rounded-xl py-3.5 px-6 font-medium text-xl gap-4 font-inter border-2 flex justify-center items-center hover:bg-black/20">
            <img
              src="./icons/google-icon.svg"
              alt="google icon"
              className="size-7"
            />
            Sign in with Google
          </button>
          <p className="text-xl text-center">
            Are you new?{" "}
            <span>
              <Link to="/signup" className="font-semi-bold hover:underline">
                Create an Accout
              </Link>
            </span>
          </p>
        </div>
      </div>
      <img
        className="absolute top-0 h-[120vh] object-cover -z-30"
        src="./background/Itsukushima_shrine.png"
      />
    </section>
  );
};

export default Login;
