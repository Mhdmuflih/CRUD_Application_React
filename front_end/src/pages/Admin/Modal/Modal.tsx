import React from 'react'
import { ModalProps } from '../../../Interface/InputTypes';

const Modal: React.FC<ModalProps> = ({ show, onClose, onConform, title, body }) => {

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <div className="mb-4">
                    <h1 className="text-xl font-bold text-center">{title}</h1>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700 text-center">{body}</p>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConform}
                        className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Modal;