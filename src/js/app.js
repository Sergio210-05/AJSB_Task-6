import Board from "./board/board";

document.addEventListener("DOMContentLoaded", () => {
  const json = localStorage.getItem("storage-data");
  // console.log(json);

  let data;
  

  try {
    data = JSON.parse(json);
  } catch (error) {
    console.log(error);
    data = { 
      columns: [ 
        { title: "TODO", notes: [], }, 
        { title: "IN PROGRESS", notes: [], }, 
        { title: "DONE", notes: [] }
      ]
    }
  };

  const container = document.createElement("div");
  container.classList.add('container');
  document.body.appendChild(container);

  // if (data) {
  //   new Board(container, data);
  // } else {
  //   new Board(container);
  // }
  // console.log(data)
  const board = new Board(container, data);
  // console.log(board)
  // const button = document.createElement("button");
  // button.classList.add("button");
  // button.innerText = "Demo";
  // container.appendChild(button);

  window.addEventListener("beforeunload", () => {
    board.saveBeforeExit();
  });
});