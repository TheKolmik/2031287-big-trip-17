import {createElement} from '../render.js';

const createFilterViewTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoPointView {
  #element = null;
  get template() {
    return createFilterViewTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
