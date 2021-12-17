import styles from "./Filter.module.scss";
import PropTypes from "prop-types";

const Filter = ({ value, onChange }) => {
  return (
    <label className={styles.label}>
      Find contacts
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
