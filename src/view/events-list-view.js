import {createElement} from '../render.js';

const createEventListViewTemplate = () => '<ul class="trip-events__list"></ul>';
const createFormListViewTemplate = () => '<div class="create-form"></div>';

export default class EventListView {
  #element = null;
  get template() {
    return createEventListViewTemplate();
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

class FormListView {
  #element = null;
  getTemplate() {
    return createFormListViewTemplate();
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.#element = null;
  }

}

export {FormListView};
