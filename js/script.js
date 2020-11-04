{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent
      }
    ];
    render();
  };

  function deleteTask(index) {
    tasks = [
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1),
    ];
    render();
  }

  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      {
        ...tasks[index],
        done: !tasks[index].done
      },
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const markAllTaskDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTask = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  }

  const bindDeleteEvents = () => {
    const deleteButtons = document.querySelectorAll(".taskList__button--delete");

    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      });
    });
  }
  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".taskList__button--done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  }

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton){
      markAllDoneButton.addEventListener("click" , markAllTaskDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

    if(toggleHideDoneTasksButton){
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTask);
    }

  };

  const renderTasks = () => {
    const taskToHTML = task => `
      <li class="
        listItem${task.done && hideDoneTasks ? " listItem--hidden" : ""} js-listItem
      ">
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

    const tasksElement = document.querySelector(".js-tasksList");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }
    buttonsElement.innerHTML = `
            <button class="buttons__button js-toggleHideDoneTasks">
              ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button
              class="buttons__button js-markAllDone"
              ${ tasks.every(({ done}) => done) ? "disabled" : "" }
            >
              Ukończ wszystkie
            </button>
        `;

  }

    const render = () => {

      renderTasks();
      bindDeleteEvents();
      bindToggleDoneEvents();

      renderButtons();
      bindButtonsEvents();
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
