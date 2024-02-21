import "./note.css";

export default class Note {
  constructor(container, note) {
    this.container = container;
    this.element = Note.createForContent(note);
    this.bindToDOM();
  }

  static createForContent({ text }) {
    const result = document.createElement("div");
    result.classList.add("note");
    this.text = document.createElement("div");
    this.text.classList.add("note__text");
    this.text.innerText = text;
    result.appendChild(this.text);
    this.closeButton = document.createElement("div");
    this.closeButton.classList.add("note__close-button");
    result.appendChild(this.closeButton);
    return result;
  }

  bindToDOM() {
    this.container.appendChild(this.element);
  }
}
