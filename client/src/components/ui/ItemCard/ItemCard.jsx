import React from 'react';
import styles from "./ItemCard.module.css";

function ItemCard({ data, onChange, onRemoveItem, onSelectItem, selectItem }) {

  const handleChange = (e) => {
    e.stopPropagation();
    onChange({...data, completed: !data.completed})
  };
  return (
    <div
      className={`${styles.ItemCard} ${selectItem === data.id ? styles.selected : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelectItem(selectItem === data.id ? "" : data.id);
      }}
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        name={data.title}
        id={data.id}
        checked={data.completed}
        onChange={handleChange}
        onClick={e => e.stopPropagation()}
      />
      <label
        className={`${styles.title} ${data.completed ? styles.completed : ""}`}
        id={data.id}
      >{data.title}</label>
      <div
        className={styles.times}
        onClick={(e) => {
          e.stopPropagation();
          onRemoveItem(data.id);
        }}
      >&times;</div>
    </div>
  );
}

export default ItemCard;