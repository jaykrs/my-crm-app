import React from "react";
import { toast } from "react-toastify";

interface toastProp{
  Type: 'success' | 'warn' | 'error' | 'ValidationError';
  Message: string;
  Func: ()=> void;
}
const toastComponent: React.FC<toastProp> = ({Type, Message, Func}) => {
  if (Type === "success") {
    return toast.success(Message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      onClose: Func,
    });
  }
  if (Type === "warn") {
    return toast.warn(Message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      onClose: Func,
    });
  }
  if (Type === "error") {
    return toast.error(Message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      onClose: Func,
    });
    }
    if (Type === "ValidationError") {
        return toast.error(Message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            onClose: Func,
        });
    }
};

export default toastComponent;