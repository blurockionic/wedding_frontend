import CustomText from "../text/CustomText";

export const InputField = ({ id, type, label, autoFocus, register, error, icon, placeholder }) => (
  <div className="my-4">
    <label htmlFor={id} className="block font-montserrat text-muted-foreground text-sm font-bold mb-2">{label}</label>
    <div className="relative gap-3">
      {icon && <span className="absolute left-3 top-3 cursor-pointer">{icon}</span>}
      <input
        type={type}
        autoFocus={autoFocus}
        id={id}
        {...register(id)}
        placeholder={placeholder}
        className={`w-full ${icon?" px-10":""} py-2  border border-border focus:ring-ring focus:outline-none rounded`}
      />
      {error && <CustomText variant="error" className="text-destructive mt-1 font-montserrat text-xs">{error.message}</CustomText>}
    </div>
  </div>
);
