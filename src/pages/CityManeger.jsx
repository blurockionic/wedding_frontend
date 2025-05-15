import React from 'react';
import { Modal } from 'flowbite-react';
import { SlLocationPin } from "react-icons/sl";
import { IoCallOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


const CityManagerPopup = ({ show, onClose, manager }) => {
  if (!manager) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      size="sm" // Small size to match the ~300px width
      dismissible
      theme={{
        root: {
          base: 'fixed top-0 right-0 left-0 z-50 h-full overflow-y-auto overflow-x-hidden md:inset-0 flex justify-center items-center',
          show: {
            true: 'bg-gray-900 bg-opacity-50',
            false: '',
          },
        },
        content: {
          base: 'relative w-full max-w-[300px] bg-white rounded-lg shadow',
          inner: 'p-4',
        },
      }}
    >
      <Modal.Header
        theme={{
          base: 'flex items-center justify-between p-4 border-b border-gray-200',
          title: 'text-lg font-bold text-black text-center w-full',
          close: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900',
        }}
      >
        City Manager for Your Event
      </Modal.Header>
      <Modal.Body
        theme={{
          base: 'p-4 space-y-4',
        }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className='flex w-full border-b border-gray-200 pb-2'>
            {/* Circular Placeholder for Profile Picture */}
            <div className="w-16 h-16 bg-white rounded-full border-2 border-gray-200"></div>
            <div>
              {/* Manager Name */}
              <p className="text-lg font-bold text-black ms-2 mt-2">{manager.name}</p>
              <p className="text-xs text-gray-400 ms-2">Event Planner</p>
            </div>
          </div>

          {/* Details with Icons */}
          <div className="w-full space-y-2">
            <div>Contact</div>
            {/* City */}
            <div className="flex items-center space-x-2">
              <SlLocationPin className='text-[#F20574]'/>
              <p className="text-black">{manager.city}</p>
            </div>

            {/* Contact */}
            <div className="flex items-center space-x-2">
              <IoCallOutline className='text-[#F20574]'/>
              <p className="text-black">{manager.phone}</p>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <MdEmail className='text-[#F20574]'/>
              <p className="text-black">{manager.email}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        theme={{
          base: 'flex justify-center p-4 border-t border-gray-200',
        }}
      >
        <button
          onClick={onClose}
          className="bg-[#F20574] text-white px-6 py-2 rounded-lg"
          style={{ width: '100px', height: '40px' }}
        >
          Got It
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CityManagerPopup;
