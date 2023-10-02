import React, { useEffect, useRef } from "react";
import styles from "./SearchField.module.css";
import { ReactComponent as SearchIcon } from '../../../assets/icons/search-field-icon.svg';
import { ReactComponent as CancelIcon } from '../../../assets/icons/cancel-icon.svg';

function SearchField({ placeholder = "Поиск", name, value, onChange, onCleanField, labelButton, onGoBack }) {
  const inputRef = useRef(null);

  const handleFocusClick = () => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  };
  useEffect(() => {
    handleFocusClick();
  }, []);
  return (
    <div className={styles.SearchField} >
      <div className={styles.InputGroup} onClick={handleFocusClick}>
        {/* <span className="input-group-text" id="inputGroup-sizing-default">{label}</span> */}
        <div className={styles.SearchIcon}>
          <SearchIcon />
        </div>
        <input
          // style={{ marginRight: value ? "17px" : "36px" }}
          ref={inputRef}
          onChange={onChange}
          name={name}
          value={value}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          minLength="2"
        />
        {value &&
          <div className={styles.CancelIcon} onClick={onCleanField}>
            <CancelIcon />
          </div>}
      </div>
    </div>
  );
}

export default SearchField;
