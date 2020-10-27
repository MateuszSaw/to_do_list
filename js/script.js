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

    const deleteButtons = document.querySelectorAll(".listItem__delete");

    deleteButtons.forEach((deleteButton, index) => {

      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      });
    });
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