import React, { useEffect } from 'react'
import {useState} from "react"
const Todo = () => {
    const [todos,setTodos] = useState([]);
    const [text,setText] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    useEffect(()=>{
        const fetchTodo = async () => {
            setLoading(true);
            try{
                const results = await fetch("http://localhost:5000/api/todos");
                const data = await results.json();
                setTodos(data);
                setLoading(false)
            }catch(error){
                setLoading(false);
                setError(error.msg)
            }
        } 
        fetchTodo()
    },[])

    const addTodo = async () => {
        console.log("clciked")
        try{
            const res = await fetch("http://localhost:5000/api/todos",{
                method:"POST",headers:{"Content-Type":"application/json"},
                body:JSON.stringify({text})
            });
            const newTodo = await res.json();
            setTodos((prev)=>[...prev,newTodo]);
setText("")
        }catch(error){
            setError(error.msg)
        }
    }

    const deleteTodo = async (id) => {
try{
 await fetch(`http://localhost:5000/api/todos/${id}`,{method:"DELETE"})
setTodos(todos.filter((t) => t._id !== id));
}catch(error){
    setError(err)
}
    }

    const updateTodo = async (id) => {
        try{
const res =  await fetch(`http://localhost:5000/api/todos/${id}`,{
    method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(text)

})
const newtodo = awat
        }catch(error){
            setError(error.msg)
        }
    }
  return (
    <div className='text-white'><h1>Todo list</h1>
    <ul>{todos.map((todo)=>(<li><div className='flex justify-between px-4 '><span>{todo.text}</span><button className='border border-white' onClick={()=>deleteTodo(todo._id)}>Delete</button><button className='border border-white'>Edit</button></div></li>))}</ul>
    <div>
        <label>Create todo:<input type='text' value={text} onChange={(e)=>setText(e.target.value)}/></label>
        <button onClick={addTodo}>Add todo</button>
        </div></div>
  )
}

export default Todo