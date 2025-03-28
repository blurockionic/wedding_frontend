import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputField } from "../../../components/global/inputfield/InputField";
import { GoLock, GoMail, GoPerson, GoDeviceMobile } from "react-icons/go";
import { PasswordFieldForSignUp } from "../../../components/global/inputfield/PasswordFieldForSignUp";

function Step1() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Personal Information
      </h2>
      {/* Name Field */}
      {/* Name Field */}
      <InputField
        label={"Name"}
        type="text"
        placeholder="Enter your name"
        id="name"
        icon={<GoPerson size={19} className="text-primary" />} // Corrected icon
        register={() => register("name", { required: "Name is required" })}
        error={errors.name}
      />

      {/* Phone Number Field */}
      <InputField
        label={"Phone Number"}
        type="tel"
        id="phone_number"
        icon={<GoDeviceMobile size={19} className="text-primary" />} // Corrected icon
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

      {/* Email Field */}
      <InputField
        label={"Email"}
        type="email"
        placeholder="Enter your email"
        id="email"
        icon={<GoMail size={19} className="text-primary" />} // Correct icon remains
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
