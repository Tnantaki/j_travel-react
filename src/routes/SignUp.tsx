import { Link } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";

const SignUp = () => {
  return (
    <section className="hero sec-padding bg-[url('/background/fujiyoshida.png')] bg-cover bg-center">
      <div className="page-container flex items-center justify-center w-full lg:justify-end">
        <div className="flex flex-col bg-black/30 max-w-[420px] backdrop-blur-xl rounded-xl py-4 px-8 gap-3 drop-shadow-xl sm:py-5 sm:px-12 sm:max-w-none sm:w-[560px] sm:rounded-2xl sm:gap-6 lg:w-[650px] lg:py-8 lg:px-20 lg:gap-12 lg:rounded-3xl">
          <h3 className="text-center">Create Account</h3>
          <form className="flex flex-col gap-2 sm:gap-3 lg:gap-6">
              <Input name="username" label="Username" />
              <Input name="password" label="Password" />
              <Input name="confirmPassword" label="Confirm Password" />
            <div className="flex justify-center">
              <Button size="md" primary={true}>
                SIGN UP
              </Button>
            </div>
          </form>
          <Link
            to="/login"
            className="text-base text-center font-semi-bold hover:underline sm:text-lg md:text-xl"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
