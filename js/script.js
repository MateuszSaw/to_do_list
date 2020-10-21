{
  const tasks = [
    {
    content: "odrobić zadanie z YouCode",
    done: false,
    }
  ];

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li>
        ${task.content}
      </li>
      `;
    }

    document.querySelector(".js-tasksList").innerHTML = htmlString;


  };

  const init = () => {
    render();
  };

  init();
}