import "./column.css";
import Note from "../note/note";

export default class Column {
  constructor(container, column) {
    this.container = container;
    this.element = Column.createForContent(column);
    this.bindToDOM();
  }

  static createForContent({ title, notes }) {
    const result = document.createElement("div");
    result.classList.add("column");
    result.innerHTML = `<div class="column__header">
      <h3 class="column_title">${title}</h3>
    </div>
    <div class="notes"></div>
    <div class="column__footer">
      <div class="column__add-button">
      Add another card
      </div>
      <div class="column__add-form add-form hidden">
      <form>
        <textarea class="add-form__text" placeholder="Enter your note..."></textarea>
        <div class="add-form__footer">
        <button class="add-form__add-button">Add Note</button>
        <div class="add-form__close-button"></div>  
        </div>
      </form>
      </div>
    </div>`;
    const notesContainer = result.querySelector(".notes");
    notes.forEach((note) => {
      new Note(notesContainer, note);
    });
    return result;
  }

  bindToDOM() {
    this.container.appendChild(this.element);
  }
}