import React from 'react';
import { toast } from 'react-toastify';

interface ToastComponentProp{
    message: String
}


const ToastComponent: React.FC <ToastComponentProp> = ({message}) => {
  const handleClick = () => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored', // or 'light', 'dark'
      });
    toast.error(message, {
        position: "top-right",
        autoClose: 5000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored', // or 'light', 'dark'
      });
    toast.info(message, {
        position: "top-right",
        autoClose: 5000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored', // or 'light', 'dark'
      });
    toast.warning(message, {
        position: "top-right",
        autoClose: 5000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored', // or 'light', 'dark'
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Show Toast</button>
    </div>
  );
};

export default ToastComponent;
