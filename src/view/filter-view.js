import {createElement} from '../render.js';

const createFilterViewTemplate = () => `
<form class="trip-filters" action="#" method="get">
<div class="trip-filters__filter">
  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
</div>
<div class="trip-filters__filter">
  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
  <label class="trip-filters__filter-label" for="filter-future">Future</label>
</div>
<div class="trip-filters__filter">
  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>
  <label class="trip-filters__filter-label" for="filter-past">Past</label>
</div>
<button class="visually-hidden" type="submit">Accept filter</button>
</form>
`;

export default class FilterView {
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
