import { useState } from "react"

export default function Todo({item, onUpdate, onDelete}) {

    // con props se buscarán propiedades especificas del objeto 
    // export default function Todo(props) {
    // return <div>{props.item.title}</div>
    // }
    // En este caso se elimino variable props y se reemplaza directamente con la propiedad dada con {}

    const [isEdit, setIsEdit] = useState(false);

    function FormEdit(){
        const [newValue, setNewValue] = useState(item.title);

        function handleSubmit(e){
            e.preventDefault();
        }

        function handleChange(e){
            const value = e.target.value;
            setNewValue(value)
        }

        function handleClickUpdateTodo(){
            onUpdate(item.id, newValue);
            setIsEdit(false)
        }

        return <form className="todoUpdateForm" onSubmit={handleSubmit}>
            <input type="text" className="todoInput" onChange={handleChange} value={newValue} />
            <button className="button" onClick={handleClickUpdateTodo}>Update</button>
        </form>
    }

    function TodoElement(){
        return (
           <div className="todoInfo">
                <span className="todoTitle">{item.title}</span>
                <button className="button" onClick={() => setIsEdit(true)}>Edit</button>
                <button className="buttonDelete" onClick={() => onDelete(item.id)}>Delete</button>
           </div>
        )
    }

    return (
        <div className="todo">
            {isEdit ? <FormEdit /> : <TodoElement />}
        </div>
    )
     
}