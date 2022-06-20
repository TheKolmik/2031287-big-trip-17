import {render, replace, remove} from '../framework/render.js';
// import CreateFormView from '../view/create-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import Point from '../view/point-view.js';
import EventListView from '../view/events-list-view.js';
// import {FormListView}  from '../view/events-list-view.js';
import LoadMoreButton from '../view/load-more-button-view.js';
import NoPointView from '../view/no-point-view.js';
import {RenderPosition} from '../framework/render.js';

const POINT_COUNT_PER_STEP = 8;

export default class ListPresenter {
  #listComponent = new EventListView();
  // #createFormComponent = new FormListView();
  #loadMoreButton = new LoadMoreButton();
  #renderPointCount = POINT_COUNT_PER_STEP;
  #noPointView = new NoPointView();
  #listContainer = null;
  #pointModel = null;
  #listPoint = null;

  constructor(listContainer, pointModel) {
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#listPoint = [...this.#pointModel.point];
    this.#renderList();
  };

  #handleLoadMoreButtonClick = () => {
    this.#listPoint
      .slice(this.#renderPointCount, this.#renderPointCount + POINT_COUNT_PER_STEP)
      .forEach((task) => this.#renderPoint(task));

    this.#renderPointCount += POINT_COUNT_PER_STEP;

    if (this.#renderPointCount >= this.#listPoint.length) {
      remove(this.#loadMoreButton);
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new Point(point);
    const editForm = new EditFormView(point);

    const replacePointToEditForm = () => {
      // this.#listComponent.element.replaceChild(editForm.element, pointComponent.element);
      replace(editForm, pointComponent);
    };

    const replaceEditFormToPoint = () => {
      // this.#listComponent.element.replaceChild(pointComponent.element, editForm.element);
      replace(pointComponent, editForm);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    // editForm.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    editForm.setEditClickHandler( () => {
      replaceEditFormToPoint();
    });

    // pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    pointComponent.setEditClickHandler(() => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    // editForm.element.addEventListener('submit', (evt) => {
    //   evt.preventDefault();
    editForm.setFormSubmitHandler(() => {
      replaceEditFormToPoint();

    });
    // сделать див кнопки под ul
    render(pointComponent, this.#listComponent.element, RenderPosition.BEFOREBEGIN);
  };

  #renderList = () => {
    // render (this.#createFormComponent, this.#listContainer);
    render(this.#listComponent, this.#listContainer);
    // render(new CreateFormView(this.#listPoint[0]), this.#createFormComponent.element);

    if (this.#listPoint.every((point) => point.isArchive)) {
      render(this.#noPointView, this.#listComponent.element);
    } else {

      for (let i = 0; i < Math.min(this.#listPoint.length, POINT_COUNT_PER_STEP); i++){
        this.#renderPoint(this.#listPoint[i]);
      }
      if (this.#listPoint.length > POINT_COUNT_PER_STEP) {
        render(this.#loadMoreButton, this.#listComponent.element);
      }
      // this.#loadMoreButton.element.addEventListener('click', this.#handleLoadMoreButtonClick);
      this.#loadMoreButton.setClickHandler(this.#handleLoadMoreButtonClick);
    }
  };
}
