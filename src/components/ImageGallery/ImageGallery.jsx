import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css";
import PropTypes from "prop-types";

export default function ImageGallery({ items }) {
  return (
    <>
      <ul className={css.ImageGallery}>
        {items.map((item) => (
          <ImageGalleryItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.array,
};
