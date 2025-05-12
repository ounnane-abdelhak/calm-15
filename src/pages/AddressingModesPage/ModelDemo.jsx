// ModelDemo.jsx
import { useEffect } from "react";
import "./modal.css";

const ModalDemo = ({ onClose, content }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div className="modal">
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        {content}
      </div>
      <div className="overlay" onClick={onClose} />
    </>
  );
};

export default ModalDemo;
