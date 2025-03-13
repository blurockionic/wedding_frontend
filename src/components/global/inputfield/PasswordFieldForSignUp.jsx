import PropTypes from "prop-types";
import { GoEye, GoEyeClosed, GoLock } from "react-icons/go";
import CustomText from "../text/CustomText";

export const PasswordFieldForSignUp = ({ label, id, register, isShow, setIsShow, error }) => (
  <div className="my-4">
    <label htmlFor={id} className="block text-muted-foreground text-sm font-bold mb-2">
      {label}
    </label>
    <div className="relative flex items-center">
      {/* Lock Icon */}
      <span className="absolute left-3 cursor-pointer">
        <GoLock size={19} className="text-primary" />
      </span>

      {/* Password Input */}
      <input
        type={isShow ? "text" : "password"}
        id={id}
        {...register(id, {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
            message: "Password must include at least one uppercase letter, one number, and one special character",
          },
        })}
        placeholder={label}
        className="w-full pl-10 pr-12 py-2 border border-border focus:ring-ring rounded"
      />

      {/* Toggle Visibility Button */}
      <button
        type="button"
        className="absolute right-3 cursor-pointer"
        onClick={() => setIsShow(!isShow)}
      >
        {isShow ? <GoEye size={20} className="text-primary" /> : <GoEyeClosed size={20} className="text-primary" />}
      </button>
    </div>

    {/* Error Message */}
    {error && (
      <CustomText variant="error" className="text-destructive font-montserrat text-xs mt-1">
        {error.message}
      </CustomText>
    )}
  </div>
);

/* PropTypes Validation */
PasswordFieldForSignUp.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired, // register should be a function from react-hook-form
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired, // function to toggle visibility
  error: PropTypes.object, // optional, since errors might not exist initially
};

/* Default Props */
PasswordFieldForSignUp.defaultProps = {
  error: null, // Default to null if no validation errors exist
};
