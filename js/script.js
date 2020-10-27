{
  const tasks = [{
    content: "odrobić zadanie z YouCode",
    done: false,
  }];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
  };

  const deleteTask = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const toggleTaskDone = (index)=> {
    tasks[index].done = !tasks[index].done;
    render();
  };

  const bindEvents = () => {
    const deleteButtons = document.querySelectorAll(".listItem__delete");

    deleteButtons.forEach((deleteButton, index) => {

      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".listItem__check");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {

      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  }
  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="listItem">
        <button class="listItem__check">${task.done ? "✔" :""}</button>
        <p class="listItem__paragraph">${task.content}</p>
        <button class="listItem__delete">🗑</button>
      </li>
      `;
    }

    document.querySelector(".js-tasksList").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}