import css from "./Button.module.css";
import PropTypes from "prop-types";

export default function Button({ onClick }) {
  return (
    <div className={css.button__container}>
      <button className={css.button} onClick={onClick} type="button">
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
