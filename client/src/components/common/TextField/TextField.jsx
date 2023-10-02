import React, { useState } from 'react';
import styles from './TextField.module.css';

export default function TextField({ label, type = "text", name, value, onChange, error, placeholder, style, isError, onFocus, onBlur }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <>
      <div className={styles.TextField} style={style}>
        <div className={styles.InputGroup}>
          {label && <label htmlFor={name}>{label}</label>}
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            className={`${styles.InputControl} ${isError ? styles.error : ''}`}
            autoComplete={type === "password" ? "new-password" : "off"}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>
    </>
  )
}