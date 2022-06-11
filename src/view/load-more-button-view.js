import {createElement} from '../render.js';

const createFilterViewTemplate = () => '<div class="btn-center"><button class="btn btn--big  btn--yellow" type="button">Load More</button></div>';

export default class LoadMoreButton {
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
