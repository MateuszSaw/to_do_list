{
  const tasks = [];

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

  const toggleTaskDone = (index) => {
    tasks[index].done = !tasks[index].done;
    render();
  };

  const bindEvents = () => {
    const deleteButtons = document.querySelectorAll(".taskList__button--delete");

    deleteButtons.forEach((deleteButton, index) => {

      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".taskList__button--done");

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
      <li
        class="listItem"
      >
        <button class="taskList__button taskList__button--done">
          ${task.done ? "✔" :""}
        </button>
        <p class="listItem__paragraph ${task.done ? " tasks__content--done" :""}">
          ${task.content}
        </p>
        <button class="taskList__button taskList__button--delete">
          🗑
        </button>
      </li>
      `;
    }

    document.querySelector(".js-tasksList").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }
    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}