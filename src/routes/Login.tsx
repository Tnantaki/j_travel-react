import { Link, NavLink } from "react-router";
import Button from "../components/Button";

const Login = () => {
  return (
    <section className="relative min-h-screen flex overflow-hidden">
      <div className="flex flex-col text-white mt-40 mx-40">
        <div className="flex flex-col w-[650px] h-[800px] bg-black/20 rounded-3xl backdrop-blur-xl p-20 gap-12 drop-shadow-xl">
          <form className="flex flex-col gap-8">
            <div className="flex flex-col font-inter font-medium gap-4">
              <label htmlFor="email" className="text-2xl">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-white text-xl h-14 rounded-lg w-full text-dark-primary font-normal p-4 focus:outline-1 focus:outline-dark-secondary"
              />
            </div>
            <div className="flex flex-col font-inter font-medium gap-4">
              <label htmlFor="password" className="text-2xl">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-white text-xl h-14 rounded-lg w-full text-dark-primary font-normal p-4 focus:outline-1 focus:outline-dark-secondary"
              />
            </div>
            <Link to="#" className="text-xl hover:underline text-right">
              Forgot Password
            </Link>
            <Button size="lg" primary={true}>
              SIGN IN
            </Button>
          </form>
          <button className="rounded-xl py-3.5 px-6 font-medium text-xl gap-4 font-inter border-2 flex justify-center items-center hover:bg-black/20">
            <img
              src="./icons/google-icon.svg"
              alt="google icon"
              className="size-9"
            />
            Sign in with Google
          </button>
          <p className="text-xl text-center">
            Are you new?{" "}
            <span>
              <NavLink to="/register" className="font-semi-bold hover:underline">
                Create an Accout
              </NavLink>
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
