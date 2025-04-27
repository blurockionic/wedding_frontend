import React from 'react';
import { Modal } from 'flowbite-react';

const CityManagerPopup = ({ show, onClose, manager }) => {
  if (!manager) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>City Manager for Your Event</Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <p><strong>Name:</strong> {manager.name}</p>
          <p><strong>City:</strong> {manager.city}</p>
          <p><strong>Contact:</strong> {manager.phone}</p>
          <p><strong>Email:</strong> {manager.email}</p>
          <p><strong>Commission Rate:</strong> {manager.commission}%</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded">
          Got it
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CityManagerPopup;
