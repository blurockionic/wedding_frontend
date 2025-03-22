import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputField } from "../../../components/global/inputfield/InputField";
import { GoLock, GoMail } from "react-icons/go";
import { PasswordFieldForSignUp } from "../../../components/global/inputfield/PasswordFieldForSignUp";

function Step1() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Personal Information
      </h2>
        {/* Name Field */}
        <InputField
          label={"Name"}
          type="name"
          placeholder="Enter your name"
          id="name"
          icon={<GoMail size={19} className="text-primary" />}
          register={() => register("name", { required: "Name is required" })} // ✅ Wrap in a function
          error={errors.name}
        />

        {/* Phone Number Field */}
       
          <InputField
            label={"Phone Number"}
            type="tel"
            id="phone_number"
            icon={<GoMail size={19} className="text-primary" />}
            register={() =>
              register("phone_number", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone number must be numeric",
                },
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits",
                },
              })
            }
            error={errors.phone_number}
            placeholder="Enter your phone number"
          />
        

        <h2 className="text-2xl font-semibold mb-1 mt-5 text-gray-800">
          Login Credential
        </h2>
        {/* Email Field */}
        <InputField
          label={"Email"}
          type="email"
          placeholder="Enter your email"
          id="email"
          icon={<GoMail size={19} className="text-primary" />}
          register={() => register("email", { required: "Email is required" })} 
          error={errors.email}
        />

        {/* Password Field */}
        <PasswordFieldForSignUp
          icon={<GoLock size={19} className="text-primary" />}
          type={isShowPassword ? "text" : "password"}
          isShow={isShowPassword}
          register={register}
          setIsShow={setIsShowPassword}
          id="password"
          label="Enter your password"
          placeholder="Enter a strong 6-length password"
          error={errors.password}
        />
      
    </div>
  );
}

export default Step1;
