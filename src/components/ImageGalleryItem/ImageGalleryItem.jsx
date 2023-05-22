import { useState } from "react";
import css from "./ImageGalleryItem.module.css";

import { Modal } from "../Modal/Modal";
import PropTypes from "prop-types";

export function ImageGalleryItem({ item }) {
  const [showModal, setShowModal] = useState(false);

  const onModal = () => {
    setShowModal(!showModal);
  };

  const { webformatURL } = item;
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={onModal}
        className={css.ImageGalleryItem__image}
        src={webformatURL}
        alt="img"
      />
      {showModal && <Modal onClose={onModal} image={item} />}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};
