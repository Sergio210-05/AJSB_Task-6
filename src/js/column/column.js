import "./column.css";
import Note from "../note/note";

export default class Column {
  constructor(container, column) {
    this.container = container;
    this.element = Column.createForContent(column);
    // this.bindToDOM();
    this.container.appendChild(this.element);
  }

  static createAppend(tag, parent, ...classes) {
    const newTag = document.createElement(`${tag}`);
    newTag.classList.add(...classes);
    parent.appendChild(newTag);  
    return newTag;
  }

  static createForContent({ title, notes }) {
    const result = document.createElement("div");
    result.classList.add("column");
    // result.innerHTML = `<div class="column__header">
    //   <h3 class="column_title">${title}</h3>
    // </div>
    // <div class="notes"></div>
    // <div class="column__footer">
    //   <div class="note-add-button">
    //   Add another card
    //   </div>
    //   <div class="note-add-form add-form hidden">
    //   <form>
    //     <textarea class="add-form__text" placeholder="Enter your note..."></textarea>
    //     <div class="add-form__footer">
    //     <button class="add-form__add-button">Add Note</button>
    //     <div class="add-form__close-button"></div>  
    //     </div>
    //   </form>
    //   </div>
    // </div>`;

    // const columnHeader = document.createElement('div');
    // columnHeader.classList.add(column__header);
    // result.appendChild(columnHeader);

    // const columnTitle = document.createElement('h3');
    // columnTitle.innerText = `${title}`;
    // columnHeader.appendChild()
    const columnHeader = Column.createAppend('div', result, 'column__header');
    const columnTitle = Column.createAppend('h3', columnHeader, 'column_title');
    columnTitle.innerText = `${title}`;

    const newNotes = Column.createAppend('div', result, 'notes');
    const columnFooter = Column.createAppend('div', result, 'column__footer');

    const notaAdd = Column.createAppend('div', columnFooter, 'note-add-button');
    notaAdd.innerText = 'Добавить новую карточку';
    const noteAddForm = Column.createAppend('div', columnFooter, 'note-add-form', 'add-form', 'hidden');

    const noteForm = Column.createAppend('form', noteAddForm, 'note-form');
    const noteText = Column.createAppend('textarea', noteForm, 'add-form__text');
    noteForm.placeholder = "Введите текст заметки...";
    const noteAdd = Column.createAppend('div', noteForm, 'add-form__footer');
    const noteAddButton = Column.createAppend('button', noteForm, 'add-form__add-button');
    noteAddButton.innerText = 'Добавить заметку';
    const noteCloseButton = Column.createAppend('div', noteForm, 'add-form__close-button');

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