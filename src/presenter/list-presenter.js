import {render} from '../render.js';
// import CreateFormView from '../view/create-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import Point from '../view/point-view.js';
import EventListView from '../view/events-list-view.js';
import {FormListView}  from '../view/events-list-view.js';
import LoadMoreButton from '../view/load-more-button-view.js';
import NoPointView from '../view/no-point-view.js';

const POINT_COUNT_PER_STEP = 8;

export default class ListPresenter {
  listComponent = new EventListView();
  createFormComponent = new FormListView();
  loadMoreButton = new LoadMoreButton();
  #renderPointCount = POINT_COUNT_PER_STEP;
  #noPointView = new NoPointView();

  constructor(listContainer, pointModel) {
    this.listContainer = listContainer;
    this.pointModel = pointModel;
  }

  init = () => {
    this.listPoint = [...this.pointModel.getPoint()];
    this.#renderList();
  };

  #handleLoadMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.listPoint
      .slice(this.#renderPointCount, this.#renderPointCount + POINT_COUNT_PER_STEP)
      .forEach((task) => this.#renderPoint(task));

    this.#renderPointCount += POINT_COUNT_PER_STEP;

    //Почему button LOAD MORE не снизу при клике на него? Т.е. почему задачи не появляються перед ним?
    if (this.#renderPointCount >= this.listPoint.length) {
      this.loadMoreButton.getElement().remove();
      this.loadMoreButton.removeElement();
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new Point(point);
    const editForm = new EditFormView(point);

    const replacePointToEditForm = () => {
      this.listComponent.getElement().replaceChild(editForm.getElement(), pointComponent.getElement());
    };

    const replaceEditFormToPoint = () => {
      this.listComponent.getElement().replaceChild(pointComponent.getElement(), editForm.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    editForm.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditFormToPoint();
    });

    pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editForm.getElement().addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
    });

    render(pointComponent, this.listComponent.getElement());
  };

  #renderList = () => {
    render (this.createFormComponent, this.listContainer);
    render(this.listComponent, this.listContainer);
    // render(new CreateFormView(this.listPoint[0]), this.createFormComponent.getElement());

    // Зачем тут нужен код is.Archive ?
    if (this.listPoint.every((point) => point.isArchive)) {
      render(this.#noPointView, this.listComponent.getElement());
    } else {

      for (let i = 0; i < Math.min(this.listPoint.length, POINT_COUNT_PER_STEP); i++){
        this.#renderPoint(this.listPoint[i]);
      }
      if (this.listPoint.length > POINT_COUNT_PER_STEP) {
        render(this.loadMoreButton, this.listComponent.getElement());
      }
      this.loadMoreButton.getElement().addEventListener('click', this.#handleLoadMoreButtonClick);
    }
  };
}
