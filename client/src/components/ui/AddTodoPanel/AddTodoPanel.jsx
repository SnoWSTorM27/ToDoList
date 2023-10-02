import React, { useEffect, useState } from 'react';
import TextField from '../../common/TextField';
import styles from "./AddTodoPanel.module.css";
const initialState = { title: ""}

function AddTodoPanel({ onCreateTodo }) {
  const [data, setData] = useState(initialState);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (data.title) setIsValid(true);
    if (!data.title) setIsValid(false);
  }, [data.title]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onCreateTodo({
      ...data,
      id: String(Date.now()),
      completed:false
    });
    setData(initialState);
  };
  return (
    <div className={styles.AddTodoPanel}>
      <h3 className={styles.title}>Добавить действие</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название действия"
          name="title"
          value={data.title}
          onChange={handleChange}
          style={{ marginBottom: '24px' }}
        />
        <button
          type='submit'
          className={`${styles.Button} ${styles.green}`}
          disabled={!isValid}
        >
          Добавить в список
        </button>
        <button
          type='button'
          onClick={() => setData(initialState)}
          className={styles.Button}
          style={{background: "gray", marginLeft: "10px"}}
        >
          Очистить поля
        </button>
      </form>
    </div>
  );
}

export default AddTodoPanel;