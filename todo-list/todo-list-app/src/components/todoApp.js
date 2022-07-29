import {useState} from 'react';
import Todo from './todo';
import './todoApp.css';

export default function TodoApp() {
    
    const [title, setTitle] = useState('Hello');
    const [todos, setTodos] = useState([]);

    // cada evento tiene su parametro e ---> event
    // preventDefault: anula comportamieto nativo del input
    function handleChange(e){
      const value = e.target.value;
      setTitle(value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
            id: crypto.randomUUID(), // para generar ids random
            title: title,
            completed: false
        }
        
        //actualizar el estado
        const temp = [ ...todos];
        temp.unshift(newTodo); // unshift agrega elemento al inicio del arreglo y push al final

        setTodos(temp);
        
        // otra forma de actualizarlo
        // setTodos([ ...todos, newTodo ]);

        setTitle(''); // de esta forma elimina el valor que hay en el input del todo
    }

    function handleUpdate(id, value){
        const temp = [...todos];
        const item = temp.find(item => item.id === id);
        item.title = value;
        setTodos(temp);
    }

    function handleDelete(id){
      const temp = todos.filter(item => item.id !== id);

      setTodos(temp);

    }

    return (
      <div className="todoContainer">
          <form className="todoCreateForm" onSubmit={handleSubmit}>
              <input 
                onChange={handleChange} 
                className="todoInput" 
                value={title}
              />
              <input 
                onClick={handleSubmit} 
                type="submit" 
                value="Create To-Do" 
                className="buttonCreate" 
              />
          </form>

          <div className="todosContainer">
            {
                todos.map((item) => (
                  // Se reemplazó por componente Todo ----> <div key={item.id}>{item.title}</div> // Se recomiendo colocar key en el contenedor donde se recorreran los elementos, de esta forma se hace mas fácil para React en reconocerlos y no confundirse
                  <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
                ))
            }
          </div>
      </div>
    );
}