import React from 'react'
import { BASE_URL } from '../../utils/constants'
import { useNavigate } from 'react-router'

const AlertModal = ({ _id, showModal, setShowModal }) => {
  const navigate = useNavigate();
  const deleteTask = async () => {
    try {
      const response = await fetch(BASE_URL + "todo/" + _id, {
        credentials: "include",
        method: "DELETE",
      });
      const deleteJson = await response.json();
      if (deleteJson?.status == true) navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-3">Confirm Delete</h2>
            <p className="text-gray-600 mb-5">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={() => {
                  deleteTask();
                  setShowModal(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertModal;
