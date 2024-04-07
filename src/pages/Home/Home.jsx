import { useEffect, useState } from "react";
import axios from "axios";
import './Home.scss'

function Home() {
  const [modal, setModal] = useState(false)
  const [userData, setUserData] = useState()
  const [taskData, setTaskData] = useState([]);
  const [task, setTask] = useState({
    task: "",
  });

  const openModal = () => {
        setModal(true)

  }
  useEffect(() => {
    fetchData();
    fetchUserData();
  }, []);


  const fetchUserData = async  () => {
    const response = await axios.get('http://localhost:3001/users');

setUserData(response)

    console.log(response);
  }

  const fetchData = async () => {
    const { data, status } = await axios.get("http://localhost:3001/tasks");
    console.log(data, status);

    if (status === 200) {
      setTaskData(data);
    }
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTask((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const deleteHandler = async (taskId) => {
    const response = await axios.delete(
      `http://localhost:3001/tasks/${taskId}`
    );

    window.location.reload();

    console.log(response);
  };

  const submitHandler = async (e) => {
    e.preventDefault(); 

 if(task?.task){

   const response = await axios.post("http://localhost:3001/tasks", task);

   if (response.status === 201) {
     setTaskData([...taskData, response.data]);
     setTask({
       task: "",
     });
   }
 }else{
  alert("wrong")
 }

  };

  return (
    <div className="home">
      <h1>HELLO {userData?.name}</h1>
      { modal && 


      <div className="home__addModal">
        <form onSubmit={submitHandler}> 
          <input
            onChange={inputHandler}
            type="text"
            name="task"
            placeholder="enter"
            value={task.task} 
          />
          <button type="submit">add</button> 
        </form>
      </div>
      }
      <div className="home__taskList">
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="home__taskList-top"
        >
          <h1>Daily Task</h1>
          <button onClick={openModal}>add</button>
        </div>
        {taskData.map((eachTask) => {
          return (
            <div key={eachTask.id}>
              <h1>{eachTask.task}</h1>
              <button onClick={() => deleteHandler(eachTask.id)}>del</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;

// npm run start:both