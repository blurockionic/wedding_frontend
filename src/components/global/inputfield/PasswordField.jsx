import { GoEye, GoEyeClosed, GoLock } from "react-icons/go";
import CustomText from "../text/CustomText";  // Assuming CustomText is the same as used in InputField

export const PasswordField = ({ label, id, register, isShow, setIsShow, error,autoComplete }) => (
  

  <div className="my-4 w-full mx-auto">
    <label htmlFor={id} className="block text-muted-foreground text-sm font-bold mb-2">
      {label}
    </label>
    <div className="relative gap-3">
      <span className="absolute left-3 top-3 cursor-pointer">
        <GoLock size={19} className="text-primary" /> {/* Replace with your custom color */}
      </span>
      <input
        type={isShow ? "text" : "password"}
        id={id}
        {...register(id)}
        placeholder={label}
        autoComplete={autoComplete}
        className="w-full px-10 py-2 border  border-border focus:ring-ring rounded"
      />
      <span
        className="absolute right-3 top-3 cursor-pointer"
        onClick={() => setIsShow(!isShow)}
      >
        {isShow ? (
          <GoEye size={20} className="text-primary" />  
        ) : (
          <GoEyeClosed size={20} className="text-primary" /> 
        )}
      </span>
      {error && <CustomText variant="error" className="text-destructive font-montserrat text-xs">{error.message}</CustomText>}
    </div>
  </div>
);
