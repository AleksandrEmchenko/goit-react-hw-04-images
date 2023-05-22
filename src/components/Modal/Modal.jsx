import { useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const ModalRoot = document.querySelector("#ModalRoot");

export function Modal({ image, onClose }) {

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  

  const handleModalClose = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const { largeImageURL } = image;
  return createPortal(
    <div onClick={handleModalClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="img" />
      </div>
    </div>,
    ModalRoot
  );
}

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};
