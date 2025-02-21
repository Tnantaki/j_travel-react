import { Link } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import OAuthButton from "../components/OAuthButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Must be 4 or more characters long" }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(errors);
    console.log(data);
  };

  return (
    <section className="hero sec-padding bg-[url('/background/Itsukushima_shrine.png')] bg-cover bg-center">
      <div className="page-container flex flex-col justify-center items-center lg:items-start">
        <div className="flex flex-col max-w-[420px]  bg-black/30 backdrop-blur-xl rounded-xl p-5 gap-6 drop-shadow-xl sm:max-w-none sm:w-[560px] sm:p-12 sm:rounded-2xl lg:w-[650px] lg:p-20 lg:gap-12 lg:rounded-3xl">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password}
            />
            <Link
              to="#"
              className="text-base sm:text-lg md:text-xl hover:underline text-right"
            >
              Forgot Password
            </Link>
            <Button type="submit">SIGN IN</Button>
          </form>
          <OAuthButton>
            <img
              src="./icons/google-icon.svg"
              alt="google icon"
              className="size-5 sm:size-7"
            />
            Sign in with Google
          </OAuthButton>
          <p className="text-base text-center sm:text-lg md:text-xl">
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
