import {createElement} from '../render.js';

const createFilterViewTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoPointView {
  get template() {
    return createFilterViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.template);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
