import { Helmet } from "react-helmet";
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
import useProtectAfterLogin from "../../hooks/useProtectAfterLogin";
import { signInWithGoogle } from "../../utils/googleAuthProvider";
import { useGoogleLoginMutation } from "../../redux/apiSlice.auth";
import { SignInModal } from "../../components/modal/SignInModel";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export default function Login() {
  useProtectAfterLogin(["user"], "/");
  useProtectAfterLogin(["agent"], "/agent");

  const dispatch = useDispatch();
  const [loginMutation, { isLoading: loading }] = useLoginMutation();
  const [getCartMutation] = useGetCartMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isBuyClicked, setIsBuyClicked] = useState(false);
  const [googleLoginMutation, { isLoading }] = useGoogleLoginMutation();
  const [addData, setAddData] = useState({});
  const [googleUserData, setGoogleUserData] = useState(null);
  const [googleToken, setGoogleToken] = useState(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [loginError, setLoginError] = useState(null);

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
      const { success, user, message } = await loginMutation(data).unwrap();
      if (success) {
        setLoginError(null);
        dispatch(login(user));

        const cart = await getCartMutation();
        const allCart = cart.data.cartItems.map(
          (cartItem) => cartItem.serviceId
        );

        dispatch(hydrateFavorites(allCart));
        reset();
        toast.success(message);

        const from = location.state?.from || "/";
        console.log(user?.role);
        
        if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
          navigate("/admin");
        } else if (user.role.toLowerCase() === "agent") {
          navigate("/agent");
        } else if (user.role.toLowerCase() === "user") {
          sessionStorage.setItem("justLoggedIn", true);
          navigate(from);
        } else {
          navigate(from);
        }
       
      }
    } catch (error) {
      let errorMessage =
        error?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      let errorCode = error?.data?.code;
      if (
        error?.status === 401 ||
        errorMessage.toLowerCase().includes("invalid email") ||
        errorMessage.toLowerCase().includes("invalid password")
      ) {
        errorMessage = "Invalid email or password";
      }
      if (errorCode === "P2022") {
        errorMessage = "We're updating our login system. Please try again soon or contact support if this persists.";
      }
      setLoginError(errorMessage);
      toast.error(errorMessage, {
        position: "botom-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

  const proceedWithGoogleLogin = async (
    userInfo,
    token,
    extraData = addData
  ) => {
    const data = {
      googleUid: userInfo.uid,
      email: userInfo.email,
      displayName: userInfo.displayName,
      photoURL: userInfo.photoURL,
      googleIdToken: token,
      wedding_location: extraData?.wedding_location,
      phone_number: extraData?.phone_number,
    };

    try {
      const { success, user, message } = await googleLoginMutation(
        data
      ).unwrap();

      if (success) {
        dispatch(login(user));
        toast.success(message);
        sessionStorage.setItem("justLoggedIn", true);
        navigate(location.state?.from || "/", { replace: true });
      }
    } catch (err) {
      toast.error("Google Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    const { googleUser } = await signInWithGoogle();
    if (!googleUser) return;

    const token = await googleUser.getIdToken();
    setGoogleUserData(googleUser);
    setGoogleToken(token);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/users/check-for-phone?email=${
        googleUser.email
      }`
    );
    const result = await response.json();

    if (!result?.phone_number || !result?.wedding_location) {
      setIsSignInModalOpen(true);
    } else {
      proceedWithGoogleLogin(googleUser, token, result);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Couple Login - Marriage Vendors",
    description:
      "Login to Marriage Vendors to access your couple account, explore vendors, and manage your wedding planning effortlessly.",
    image: loginImage,
    url: "https://yourwebsite.com/login",
    author: {
      "@type": " Event Organization",
      name: "Marriage Vendors",
    },
  };

  return (
    <>
      <Helmet>
        <title>Couple Login - Marriage Vendors</title>
        <meta
          name="description"
          content="Login to Marriage Vendors to access your couple account, explore vendors, and manage your wedding planning effortlessly."
        />
        <meta
          name="keywords"
          content="Marriage Vendors, wedding planning, couple login, find wedding vendors, wedding services, vendor directory, wedding management,Couple account, wedding planning login, marriage vendors couple, manage wedding, wedding dashboard, couple profile, wedding services access"
        />
        <meta name="author" content="Marriage Vendors" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Couple Login - Marriage Vendors" />
        <meta
          property="og:description"
          content="Login to Marriage Vendors to access your couple account, explore vendors, and manage your wedding planning effortlessly."
        />
        <meta property="og:image" content={loginImage} />
        <meta
          property="og:url"
          content="https://www.marriagevendors.com/login"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center md:py-10">
        <div className="flex items-center justify-center md:space-x-10">
          <div className="hidden md:block w-3/4">
            <img
              src={loginImage}
              className="h-[600px] w-full object-cover object-center rounded-lg"
              alt="Login Illustration"
            />
          </div>
          <div className="h-[600px] sm:bg-white bg-transparent sm:shadow-md rounded-lg sm:px-8 px-4 w-full space-y-6">
            <CustomText
              variant="heading"
              className="text-3xl font-bold text-black mt-2"
            >
              Welcome to Marriage Vendors
            </CustomText>
            <CustomText variant="paragraph" className="text-sm text-gray-600 ">
              Enter your credentials to access your account
            </CustomText>

            {loginError && (
              <div className="max-w-md mx-auto mt-6 mb-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-between">
                <span>{loginError}</span>
                <button onClick={() => setLoginError(null)} className="ml-4 text-red-500 hover:text-red-700 font-bold">&times;</button>
              </div>
            )}

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 ">
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
                  text={loading ? "Logging in..." : "Login"}
                  disabled={loading}
                  className={`w-full ${loading ? "text-primary" : "bg-primary"} 
      disabled:cursor-not-allowed cursor-pointer border-2 hover:bg-dustyRose
      text-muted font-bold py-2 px-4 rounded transition`}
                />

                <div className="my-8 flex items-center justify-between w-full gap-x-5">
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
            <div className="mt-6 text-center">
              <CustomText variant="paragraph" className="text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </CustomText>
            </div>
          </div>
        </div>
      </div>
      {isSignInModalOpen && (
        <SignInModal
          setAddData={setAddData}
          setIsSignInModalOpen={setIsSignInModalOpen}
          googleUserData={googleUserData}
          googleToken={googleToken}
          proceedWithGoogleLogin={proceedWithGoogleLogin}
        />
      )}
    </>
  );
}
