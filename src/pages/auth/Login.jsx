import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useLoginMutation } from "../../redux/apiSlice.auth";
import loginImage from "../../../public/login/login.jpg";
import CustomButton from "../../components/global/button/CustomButton";
import CustomText from "../../components/global/text/CustomText";
import { MdEmail } from "react-icons/md";
import { InputField } from "../../components/global/inputfield/InputField";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../../components/global/inputfield/PasswordField";
import { useGetCartMutation } from "../../redux/serviceSlice";
import { hydrateFavorites } from "../../redux/favoriteSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export default function Login() {
  const dispatch = useDispatch();
  const [loginMutation, { isLoading: loading }] = useLoginMutation();
  const [getCartMutation] = useGetCartMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    try {
      const result = await loginMutation(data).unwrap();

      if (result.user) {
        dispatch(login({ user: result }));

        const cart = await getCartMutation();
        const allcart = cart.data.cartItems.map(cartItem => cartItem.service.id)
        
        
        console.log(allcart)
        dispatch(hydrateFavorites(allcart));

        reset();
        toast.success("Login successful!");
        const from = location.state?.from || "/";
        navigate(from);
      }
    } catch (error) {
      toast.error(error || "An unexpected error occurred.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login is not yet implemented.", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex items-center justify-center space-x-10">
        {/* Image Section */}
        <div className="hidden md:block w-3/4">
          <img
            src={loginImage}
            className="h-[600px] w-full object-cover object-center rounded-lg"
            alt="Login Illustration"
          />
        </div>

        {/* Form Section */}
        <div className="h-[600px] sm:bg-white bg-transparent sm:shadow-md rounded-lg sm:px-8 px-4 w-full space-y-6">
          <CustomText
            variant="heading"
            className="text-3xl font-bold text-black"
          >
            Welcome to Wedd
          </CustomText>
          <CustomText variant="paragraph" className="text-sm text-gray-600">
            Enter your credentials to access your account
          </CustomText>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <InputField
              label="Email"
              id="email"
              type="email"
              autoFocus
              register={register}
              error={errors.email}
              icon={<MdEmail size={19} className="text-primary" />}
              placeholder="Enter your email"
            />

            <PasswordField
              error={errors.password}
              type={isShowPassword ? "text" : "password"}
              setIsShow={setIsShowPassword}
              register={register}
              id="password"
              label="Password"
              isShow={isShowPassword}
            />

            <div className="mb-6 text-end">
              <Link
                to="/user-forgot-password"
                className="font-bold text-sm text-muted-foreground"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
              <CustomButton
                type="submit"
                text="Login"
                disabled={loading}
                className={`w-full ${loading ? "bg-muted" : "bg-primary"} 
                  disabled:cursor-not-allowed cursor-pointer border-2 hover:bg-dustyRose
                  text-white font-bold py-2 px-4 rounded transition`}
              />

              <div className="mt-4 flex items-center justify-between w-full gap-x-5">
                <div className="h-[1px] px-3 w-full bg-gray-300"></div>
                <span>or</span>
                <div className="h-[1px] px-3 w-full bg-gray-300"></div>
              </div>

              <CustomButton
                type="button"
                text="Login with Google"
                onClick={handleGoogleLogin}
                leftIcon={<MdEmail size={20} className="text-red-500" />}
                className="w-full mt-4 py-2 bg-background text-red-600 border hover:border-ring"
              />
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <CustomText variant="paragraph" className="text-sm">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-dustyRose-dark hover:underline"
              >
                Sign Up
              </Link>
            </CustomText>
          </div>
        </div>
      </div>
    </div>
  );
}
