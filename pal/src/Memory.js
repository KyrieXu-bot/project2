import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode, startSavingMemory, startDeletingMemory} from './actions';
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export function Memory(props){
    const memory = props.memory;
    const dispatch = useDispatch();
    const[year, setYear] = useState(memory.year);
    const[month, setMonth] = useState(memory.month);
    const[day, setDay] = useState(memory.day);
    const[username,setUsername] = useState(memory.username);
    const[message, setMessage] = useState(memory.message);



    const onEdit = () =>{
        dispatch(enterEditMode(memory));
    }
    const onCancel = () =>{
        dispatch(leaveEditMode(memory));
    }

    const onSave = () => {
        dispatch(startSavingMemory({
            id: memory.id,
            year,
            month,
            day,
            username,
            message,
        }));
    }

    const onDelete = () => {
        dispatch(startDeletingMemory(memory));
    }




    if(memory.isEditing){
        return (
            <div className="memory">
                <div className="memory-above">
                    
                    <p>Date: <input type = 'text' value={year} onChange={e =>
                    setYear(parseInt(e.target.value))}/>
                    &nbsp;&nbsp;
                    <input type = 'text' value={month} onChange={e =>
                    setMonth(parseInt(e.target.value))}/>
                    &nbsp;&nbsp;
                    <input type = 'text' value={day} onChange={e =>
                    setDay(parseInt(e.target.value))}/></p>
                    &nbsp;&nbsp;
                    <br></br>
                    <br></br>
                    <p>username: <input type = 'text' value={username} onChange={e =>
                    setUsername(e.target.value)}/></p>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <button onClick = {onSave}>save</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick = {onCancel}>cancel</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick = {onDelete}>delete</button>
                    
                </div>
                <div className="memory-below">
                    <p>Message:<textarea value={message} onChange={e =>
                        setMessage(e.target.value)}/></p>
                        <br></br>
                    
                </div>
            </div>
        );    
    }else{
        
        return (
            <div className="comments">
                <div className="comments-left">
                    <span className="year">{memory.year}</span>
                    <span>{months[memory.month -1]} {memory.day}</span>
                    <button onClick={onEdit}>edit</button>
                    <br></br>
                </div>
                <div className="comments-right">
                    <p>username:&nbsp;{memory.username}</p><br></br>
                    <p>message:&nbsp;{memory.message}</p><br></br>
                </div>
                <br></br>
            </div>
        );
    }
}