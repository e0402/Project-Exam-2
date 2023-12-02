import React from "react";
import { FaSignInAlt } from 'react-icons/fa';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-12 rounded-lg shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-5 text-lg font-bold"
        >
          X
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center">Login <FaSignInAlt className="inline-block ml-2 text-2xl relative top-[-2px]" /></h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;
