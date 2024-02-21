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
    // const board = document.querySelector(".board");
    // if (!board) return;
    const columns = [];

    const columnElements = board.querySelectorAll(".column");
    // console.log(columnElements);
    // [...columnElements].forEach((column) => {
    Array.from(columnElements).forEach((column) => {
      const columnTitle = column.querySelector('.column_title');
      const noteElements = column.querySelectorAll(".note");
      const notes = [];
      Array.from(noteElements).forEach((note) => {
        const noteText = note.querySelector(".note__text");
        notes.push({ text: noteText.innerText });
      });
      columns.push({ title: columnTitle.innerText, notes });
    });

    localStorage.setItem("storage-data", JSON.stringify( {columns} ));
    // console.log(localStorage.getItem("storage-data"))
  });
});