import Board from "./board/board";

document.addEventListener("DOMContentLoaded", () => {
  const json = localStorage.getItem("storage-data");

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
  }

  const container = document.createElement("div");
  container.classList.add('container');
  document.body.appendChild(container);

  const board = new Board(container, data);

  window.addEventListener("beforeunload", () => {
    board.saveBeforeExit();
  });
});