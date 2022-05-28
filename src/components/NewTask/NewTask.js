// import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  /**
   * here we don't have access to the taskText variable
   * so there are 2 options for this
   *    1) add this function inside of the enterTaskHandler function which you will then have access to the taskText variable because it is an argument to the parent function
   *    2) the 2nd option is to use the bind method
   *        the bind method is a js method that allows you to preconfigure a function before calling it
   *        its first argument is configuring the 'this' scope and the second argument is the first argument of the function that we are configuring.
   */
  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: "https://react-http-9b230-default-rtdb.firebaseio.com//tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
    );

    // setIsLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(
    //     "https://react-http-9b230-default-rtdb.firebaseio.com//tasks.json",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({ text: taskText }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Request failed!");
    //   }

    //   const data = await response.json();

    //   const generatedId = data.name; // firebase-specific => "name" contains generated id
    //   const createdTask = { id: generatedId, text: taskText };

    //   props.onAddTask(createdTask);
    // } catch (err) {
    //   setError(err.message || "Something went wrong!");
    // }
    // setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
