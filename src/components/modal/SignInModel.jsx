import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { InputField } from "../global/inputfield/InputField";
import { GoDeviceMobile, GoLocation } from "react-icons/go";

export function SignInModal({ setAddData, setIsSignInModalOpen, googleUserData, googleToken, proceedWithGoogleLogin }) {
  const [openModal, setOpenModal] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onModalSubmit = (dataFromModal) => {
    setAddData(dataFromModal);
    setIsSignInModalOpen(false); // close modal after submission

    if (googleUserData && googleToken) {
      proceedWithGoogleLogin(googleUserData, googleToken, dataFromModal);
    }
  };

  return (
    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
      <ModalHeader />
      <ModalBody>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Complete your profile
          </h3>

          <form onSubmit={handleSubmit(onModalSubmit)} className="space-y-4">
            <div className="md:flex md:flex-row items-center justify-between gap-x-3">
              <InputField
                id="wedding_location"
                type="text"
                label="Event Location"
                register={register}
                validation={{ required: "Event location is required" }}
                error={errors.wedding_location}
                icon={<GoLocation size={19} className="text-gray-500" />}
                placeholder="Event Location"
              />
              <InputField
                id="phone_number"
                type="text"
                label="Phone Number"
                register={register}
                validation={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                }}
                error={errors.phone_number}
                icon={<GoDeviceMobile size={20} className="text-gray-500" />}
                placeholder="Phone Number"
              />
            </div>
            <div className="text-center">
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}
