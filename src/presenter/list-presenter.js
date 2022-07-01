import {render, RenderPosition, remove} from '../framework/render.js';
import EventListView from '../view/events-list-view.js';
import LoadMoreButton from '../view/load-more-button-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import SortView from '../view/sort-view.js';
import {sortPointUp, sortPointDown} from '../utils/point.js';
import {SortType} from '../const.js';

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
  #sortView = new SortView();
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor(listContainer, pointModel) {
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#listPoint = [...this.#pointModel.point];
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    this.#sourcedBoardPoints = [...this.#pointModel.point];
    this.#renderList();
  };

  #handleLoadMoreButtonClick = () => {

    this.#renderPoints(this.#renderPointCount, this.#renderPointCount + POINT_COUNT_PER_STEP);

    this.#renderPointCount += POINT_COUNT_PER_STEP;

    if (this.#renderPointCount >= this.#listPoint.length) {
      remove(this.#loadMoreButton);
    }
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#listPoint = updateItem(this.#listPoint, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.TIME:
        this.#listPoint.sort(sortPointUp);
        break;
      case SortType.PRICE:
        this.#listPoint.sort(sortPointDown);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#listPoint = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    // - Очищаем список
    this.#clearPointList();
    // - Рендерим список заново
    this.#renderPointList();
  };

  #renderSort = () => {
    render(this.#sortView, this.#listComponent.element, RenderPosition.BEFOREBEGIN);
    this.#sortView.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listComponent, this.#handlePointChange, this.#handleModeChange);
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
    render(this.#noPointView, this.#listComponent.element);
  };

  #renderLoadMoreButton = () => {

    render(this.#loadMoreButton, this.#listContainer);

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
    this.#renderSort();
    this.#renderPointList();

  };
}
