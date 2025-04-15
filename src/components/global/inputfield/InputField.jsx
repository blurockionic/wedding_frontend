import CustomText from "../text/CustomText";
import PropTypes from "prop-types"

export const InputField = ({
  min,
  max,
  step,
  id,
  type,
  label,
  autoFocus,
  register,
  disabled = false,
  error,
  autoComplete,
  icon,
  onChange = () => {},
  placeholder,
  style
}) => (
  <div className="my-4 w-[70%] mx-auto">
    <label
      htmlFor={id}
      className="block  text-muted-foreground text-sm font-semibold mb-2"
    >
      {label}
    </label>
    <div className="relative gap-3">
      {icon && (
        <span className="absolute left-3 top-3 cursor-pointer">{icon}</span>
      )}
      <input
        type={type}
        autoFocus={autoFocus}
        id={id}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        disabled={disabled}
        {...register(id)}
        placeholder={placeholder}
        className={`w-full ${
          icon ? "px-10" : ""
        } py-2  ${style?style:""} border  placeholder:text-sm h-auto border-border focus:ring-ring focus:outline-none rounded`}
      />
      {error && (
        <CustomText
          variant="error"
          className="text-destructive mt-1 font-montserrat text-xs"
        >
          {error.message}
        </CustomText>
      )}
    </div>
  </div>
);


InputField.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  register: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.object,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.string,
};
