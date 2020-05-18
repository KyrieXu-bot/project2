import React from 'react';
import './App.css';
import {Memory} from './Memory';
import {useSelector, useDispatch} from 'react-redux';
import {loadDay, startAddingMemory} from './actions';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
const day = date.getDate();



function App() {
  const memories = useSelector(state => state.memories);
  const dispatch = useDispatch();

  const onSearch = () =>{
    var month=document.getElementById("month1").value;
    var day=document.getElementById("day1").value;

    dispatch(loadDay(month, day));
  }

  const onAdd = () =>{
    dispatch(startAddingMemory(year, month ,day));
  }

  return (
    <div class="main">
      <div class="Home">
          <ul class="NavBar">
            <h1>Yummy! Restaurant</h1>
            <br></br>
            <h6>Message board</h6>
          </ul>
          <br></br>
          <hr></hr>
          <div class="AllComments">
              <h1>All Comments (we have comments on May 15-17)</h1>
              <p>Please input your date(MM/DD):&nbsp; 
                <input type="text" id="month1"/>
                &nbsp;&nbsp;
                <input type="text" id="day1"/>
              &nbsp;
              <button onClick={onSearch}>Search</button>
              </p>
              <div className="memories-root">
                {memories.map(memory => <Memory memory={memory} />)}
              </div>
          </div>
          <div class="WriteComments">
            <h1>My Comments</h1>
            <button onClick={onAdd}>new memory</button>
          </div>


      

      </div>
    </div>
  );
}

export default App;
