import { Link, useNavigate } from "react-router";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import OAuthButton from "../components/OAuthButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import iconGoogle from "@img/icons/google-icon.svg";
import UserService from "../services/user"
import { AxiosError } from "axios";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Must be 4 or more characters long" }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  let navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (userInput) => {
    console.log(userInput)

    try {
      const {data: jwt} = await UserService.login(userInput)
      UserService.setJWT(jwt)

      navigate("/account/profile")
    } catch (error) {
      const err = error as AxiosError
      if (err.response) {
        console.log(err.response.data)
        setError('password', {
          message: err.response.data as string
        })
      }
    }
    console.log(errors);
  };

  return (
    <section className="hero sec-padding bg-[url('/src/assets/img/background/Itsukushima_shrine.png')] bg-cover bg-center">
      <div className="page-container flex flex-col justify-center items-center text-char-sec lg:items-start">
        <div className="flex flex-col max-w-[420px]  bg-black/50 rounded-xl p-5 gap-6 drop-shadow-xl sm:max-w-none sm:w-[560px] sm:p-12 sm:rounded-2xl lg:w-[650px] lg:p-20 lg:gap-12 lg:rounded-3xl">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="text"
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
              src={iconGoogle}
              alt="google icon"
              className="size-5 sm:size-7"
            />
            Sign in with Google
          </OAuthButton>
          <p className="text-base text-center sm:text-lg md:text-xl">
            Are you new?{" "}
            <span>
              <Link to="/signup" className="font-semibold text-primary hover:underline">
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
