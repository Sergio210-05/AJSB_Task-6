import "./board.css";
import Column from "../column/column";
import Note from "../note/note";

export default class Board {
  constructor(container, data) {
    this.container = container;
    this.columns = this.createColumns(data);
    this.current = undefined;
    this.container.appendChild(this.columns);

    this.placeholder = document.createElement("div");
    this.placeholder.classList.add("note");

    this.columns.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.closest(".note__close-button")) {
        e.target.closest(".note").remove();
        return false;
      }

      if (e.target.closest(".note-add-button")) {
        e.target.closest(".note-add-button").classList.add("hidden");
        e.target
          .closest(".column__footer")
          .querySelector(".note-add-form")
          .classList.remove("hidden");
        return false;
      }

      if (e.target.closest(".add-form__close-button")) {
        e.target
          .closest(".column__footer")
          .querySelector(".note-add-button")
          .classList.remove("hidden");
        e.target.closest(".note-add-form").classList.add("hidden");
        return false;
      }

      if (e.target.closest(".add-form__add-button")) {
        const formText = e.target
          .closest(".note-add-form")
          .querySelector(".add-form__text");
        const container = e.target.closest(".column").querySelector(".notes");
        if (formText.value !== "") {
          new Note(container, { text: formText.value });
        } else {
          return;
        }
        formText.value = "";
        e.target
          .closest(".column__footer")
          .querySelector(".note-add-button")
          .classList.remove("hidden");
        e.target.closest(".note-add-form").classList.add("hidden");
        return false;
      }
    });

    this.columns.addEventListener("mousedown", (e) => {
      if (e.target.closest(".note__close-button")) return;
      if (e.target.closest(".note")) {
        document.body.style.cursor = "grabbing";
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.current = e.target.closest(".note");
        this.current.after(this.placeholder);
        const { height, width } = this.current.getBoundingClientRect();
        this.current.style.width = width + "px";
        this.current.style.height = height + "px";
        this.placeholder.style.width = width + "px";
        this.placeholder.style.height = height + "px";
        this.current.classList.add("note__moving");
        const { top, left } = this.current.getBoundingClientRect();
        this.currentTop = top;
        this.currentLeft = left;
        return false;
      }
    });

    this.columns.addEventListener("mousemove", (el) => {
      if (this.current) {
        el.preventDefault();
        this.current.style.top =
          this.currentTop + el.clientY - this.startY + "px";
        this.current.style.left =
          this.currentLeft + el.clientX - this.startX + "px";
        if (el.target.closest(".note")) {
          const target = el.target.closest(".note");
          const { top, height } = target.getBoundingClientRect();
          if (el.clientY < top + height / 2) {
            target.before(this.placeholder);
          } else {
            target.after(this.placeholder);
          }
          return;
        }
        if (el.target.closest(".column__header")) {
          this.placeholder.remove();
          el.target
            .closest(".column")
            .querySelector(".notes")
            .insertAdjacentElement("afterbegin", this.placeholder);
          return;
        }
        if (el.target.closest(".column__footer")) {
          this.placeholder.remove();
          el.target
            .closest(".column")
            .querySelector(".notes")
            .insertAdjacentElement("beforeend", this.placeholder);
          return;
        }
      }
    });

    this.columns.addEventListener("mouseup", () => {
      if (this.current) {
        document.body.style.cursor = null;
        document.body.style.pointerEvents = null;
        this.current.classList.remove("note__moving");
        this.current.style.top = null;
        this.current.style.left = null;
        this.placeholder.replaceWith(this.current);
        this.current = undefined;
      }
    });
  }

  createColumns(data) {
    const result = document.createElement("div");
    result.classList.add("board");
    data.columns.forEach((column) => {
      new Column(result, column);
    });
    return result;
  }

  saveBeforeExit() {
    const board = document.querySelector(".board");
    const columns = [];

    const columnElements = board.querySelectorAll(".column");
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
  }
}