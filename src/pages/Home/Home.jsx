import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";
import Clock from "../../assets/images/Group 162.svg";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Home() {
  const [modal, setModal] = useState(false);
  const [fillInput, setFillInput] = useState(false);
  // const [userData, setUserData] = useState()
  const [taskData, setTaskData] = useState([]);
  const [task, setTask] = useState({
    task: "",
  });

  const openModal = () => {
    setModal(true);
  };
  useEffect(() => {
    fetchData();
    // fetchUserData();
  }, []);

  // const fetchUserData = async () => {
  //   const {data} = await axios.get("http://localhost:3001/users");

  //   setUserData(data);

  //   console.log(data);
  // };

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
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (task?.task) {
      const response = await axios.post("http://localhost:3001/tasks", task);

      if ((response.status === 201, task)) {
        setTaskData([...taskData, response.data]);
        setTask({
          task: "",
        });
        setModal(false);
      }
    } else {
      setFillInput(true);
    }
  };

  return (
    <div className="home">
      <div className="home__top">
        <h1>Welcome dear user!</h1>
      </div>
      {modal && (
        <div className="home__addModal">
          <form onSubmit={submitHandler}>
            <div className="home__addModal-top">
              <label htmlFor="">Add task</label>
              <CloseIcon onClick={() => setModal(false)} className="close" />
            </div>
            <input
              onChange={inputHandler}
              type="text"
              name="task"
              placeholder="Enter the task..."
              value={task.task}
            />
            {fillInput && <p className="error">Please fill this input!</p>}
            <button onClick={submitHandler} type="submit">
              add
            </button>
          </form>
        </div>
      )}
      <div className="home__midImage">
        <img src={Clock} alt="" />
      </div>
      <div className="home__taskList">
        <h2>Tasks List</h2>
        <div className="home__taskList-list">
          <div className="home__taskList-list-top">
            <h3>Daily tasks</h3>
            <AddCircleOutlineIcon onClick={openModal} className="addIcon" />
          </div>
          <div className="home__taskList-list-tasks">

          {taskData.map((eachTask) => {
            return (
              <div className="home__taskList-list-tasks-task" key={eachTask.id}>
                <h5>{eachTask.task}</h5>
                <DeleteOutlineIcon className="deleteIcon" onClick={() => deleteHandler(eachTask.id)}>del</DeleteOutlineIcon>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

// npm run start:both
