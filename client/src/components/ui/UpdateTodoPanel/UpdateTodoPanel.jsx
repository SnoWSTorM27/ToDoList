import React, { useEffect, useState } from 'react';
import api from '../../../api';
import TextField from '../../common/TextField';
import styles from "./UpdateTodoPanel.module.css";

function UpdateTodoPanel({ active , onUpdateData }) {
  const [data, setData] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() =>  {
    api.todos.getTododById(active).then((data) => setData(data));
  }, [active]);
  useEffect(() =>  {
    if (Object.keys(data).length !== 0) setIsLoading(false);
  }, [data]);
  const validate = (data) => {
    return !!data.title;
  };
  useEffect(() => {
    setIsValid(validate(data));
  }, [data]);
  if (isLoading) {
    return <div>Loading...</div>
  }
  const handleChange = (target) => {
    console.log(target);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onUpdateData({
      ...data
    });
  };
  return (
    <div className={styles.UpdateTodoPanel}>
      <h3 className={styles.title}>Изменить данные id: {data.id}</h3>
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
          Сохранить изменения
        </button>
        <button
          type='button'
          onClick={() => setData(prev => ({...prev, title: ""}))}
          className={styles.Button}
          style={{background: "gray", marginLeft: "10px"}}
        >
          Очистить поля
        </button>
      </form>
    </div>
  );
}

export default UpdateTodoPanel;