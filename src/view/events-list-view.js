import {createElement} from '../render.js';

const createEventListViewTemplate = () => '<ul class="trip-events__list"></ul>';
const createFormListViewTemplate = () => '<div class="create-form"></div>';

export default class EventListView {
  get template() {
    return createEventListViewTemplate();
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

class FormListView {
  getTemplate() {
    return createFormListViewTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }

}

export {FormListView};
