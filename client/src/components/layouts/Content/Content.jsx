import React, { useState, useEffect } from 'react';
import styles from './Content.module.css';
import api from '../../../api';
import ItemCard from '../../ui/ItemCard/ItemCard';
import AddTodoPanel from '../../ui/AddTodoPanel';
import SearchField from '../../common/SearchField';
import UpdateTodoPanel from '../../ui/UpdateTodoPanel';

export default function Content() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectTodo, setSelectTodo] = useState("");
  const [searchValue, setSearchValue] = useState("");
  useEffect(() =>  {
    api.todos.fetchAll().then((data) => setTodos(data));
  }, []);
  useEffect(() =>  {
    if (todos) setIsLoading(false);
  }, [todos]);
  const handleUpdateTodo = (target) => {
    const newTodos = [...todos];
    const index = todos.findIndex(todo => todo.id === target.id);
    newTodos[index] = {...newTodos[index], ...target};
    api.todos.updateTodo(target.id, target);
    setTodos(newTodos);
  };
  const handleRemoveTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    if (selectTodo === id) setSelectTodo("");
    api.todos.removeTodo(id);
    setTodos(newTodos);
  };
  const handleAddTodo = (data) => {
    const newTodos = [...todos];
    newTodos.push(data);
    api.todos.addTodo(data);
    setTodos(newTodos);
  };
  const handleSearchChange = ({ target }) => {
    const { value } = target;
    setSearchValue(value);
  };
  const handleCleanFilter = () => {
    setSearchValue("");
  };
  function filterTodo(data) {
    const filteredTodos = searchValue
      ? data.filter(
        (todo) =>
          todo.title
            .toLowerCase()
            .indexOf(searchValue.toLowerCase()) !== -1
      )
      : data;
    return filteredTodos;
  }
  const filteredTodos = filterTodo(todos);
  return ( 
    <div className={styles.Content}>
      {!isLoading ? <div className={styles.ListPanel}>
        {filteredTodos.map((todo) => (
          <ItemCard
            key={todo.id}
            data={todo}
            onChange={handleUpdateTodo}
            onRemoveItem={handleRemoveTodo}
            onSelectItem={()=> setSelectTodo(selectTodo === todo.id ? "" : todo.id)}
            selectItem={selectTodo}
          />
        ))}
      </div> : <div>Loading...</div>}
      <div className={styles.SearchPanel}>
        <SearchField
          placeholder="Поиск по названию"
          name="search"
          labelButton="Назад"
          value={searchValue}
          onChange={handleSearchChange}
          onCleanField={handleCleanFilter}
        />
      </div>
      <div
        className={styles.ControlPanel}
        onClick={e =>{
          e.stopPropagation();
        }}
      >
        { !selectTodo
          ? <AddTodoPanel onCreateTodo={handleAddTodo}/>
          : <UpdateTodoPanel active={selectTodo} onUpdateData={handleUpdateTodo}/>
        }
      </div> 
    </div>
  );
};
