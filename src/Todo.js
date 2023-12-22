import { func } from "prop-types";
import { useState, useEffect } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);   // Todo 항목을 담아둘 리스트
  const [complete, setComplete] = useState([]);  // ToDo의 달성 여부(boolean type)
  
  const onChange_toDo = (event) => {setToDo(event.target.value)};
  const onsubmit_toDo = (event) =>{
    event.preventDefault();
    if(toDo === ""){
      return;
    }
    setToDos((currentArray) =>  [toDo, ...currentArray]);
    setToDo("");

    setComplete((currentArray) => [false, ...currentArray]);
  }
  const onClick_delete = (index) =>{
    setToDos((currentArray) => currentArray.filter((item, i) => i !== index));
  }
  const onClick_complete = (index) =>{
    setComplete((currentArray) => currentArray.map((item, i) => i === index ? true : item));
    setTimeout(() => {
      onClick_delete(index);
      setComplete((currentArray) => currentArray.filter((item, i) => i !== index));
    }, 1000);
  }
  
  return (
    <div>
      <div>
        <h1>My To Dos {toDos.length}</h1>
        {/* <h1>Completed Dos {complete.filter(isCompleted => isCompleted === true).length}</h1> */}
      </div>
      <form onSubmit={onsubmit_toDo}>
        <input onChange={onChange_toDo} value={toDo} type="text" 
          placeholder="Write toDo!"></input>
          <button>Add to do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <div>
            <li key={index} style={complete[index] ? {textDecoration: 'line-through'} : null}>
              {item}
              <button onClick={() => onClick_complete(index)}>Complete</button>
              <button onClick={() => onClick_delete(index)}>Delete</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
