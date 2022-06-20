import AbstractView from '../framework/view/abstract-view.js';

const createEventListViewTemplate = () => '<ul class="trip-events__list"></ul>';
// const createFormListViewTemplate = () => '<div class="create-form"></div>';

export default class EventListView extends AbstractView {

  get template() {
    return createEventListViewTemplate();
  }

}

// class FormListView extends AbstractView {

//   get template() {
//     return createFormListViewTemplate();
//   }

// }

// export {FormListView};
