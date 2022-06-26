import {render, RenderPosition, remove} from '../framework/render.js';
import EventListView from '../view/events-list-view.js';
import LoadMoreButton from '../view/load-more-button-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';

const POINT_COUNT_PER_STEP = 8;

export default class ListPresenter {
  #listComponent = new EventListView();
  // #createFormComponent = new FormListView();
  #loadMoreButton = new LoadMoreButton();
  #renderPointCount = POINT_COUNT_PER_STEP;
  #noPointView = new NoPointView();
  #listContainer = null;
  #pointModel = null;
  #listPoint = [];
  #pointPresenter = new Map();

  constructor(listContainer, pointModel) {
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#listPoint = [...this.#pointModel.point];
    this.#renderList();
  };

  #handleLoadMoreButtonClick = () => {

    this.#renderPoints(this.#renderPointCount, this.#renderPointCount + POINT_COUNT_PER_STEP);

    this.#renderPointCount += POINT_COUNT_PER_STEP;

    if (this.#renderPointCount >= this.#listPoint.length) {
      remove(this.#loadMoreButton);
    }
  };

  #handlePointChange = (updatedPoint) => {
    console.log(this.#listPoint);
    this.#listPoint = updateItem(this.#listPoint, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
    console.log(this.#listPoint);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listComponent, this.#handlePointChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (from, to) => {
    this.#listPoint
      .slice(from,to)
      .forEach((point) => this.#renderPoint(point));
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    this.#renderPointCount = POINT_COUNT_PER_STEP;
    remove(this.#loadMoreButton);
  };

  #renderNoPoints = () => {
    render(this.#noPointView, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderLoadMoreButton = () => {

    render(this.#loadMoreButton, this.#listComponent.element);

    this.#loadMoreButton.setClickHandler(this.#handleLoadMoreButtonClick);
  };

  //
  #renderPointList = () => {
    render(this.#listComponent,  this.#listContainer);
    this.#renderPoints(0, Math.min(this.#listPoint.length, POINT_COUNT_PER_STEP));

    if (this.#listPoint.length > POINT_COUNT_PER_STEP ){
      this.#renderLoadMoreButton();
    }
  };


  #renderList = () => {
    render(this.#listComponent, this.#listContainer);

    if (this.#listPoint.every((point) => point.isArchive)) {
      this.#renderNoPoints();
      return;

    }

    this.#renderPointList();

  };
}
