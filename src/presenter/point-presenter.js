import {render, RenderPosition, replace, remove} from '../framework/render.js';
import Point from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {

  #pointListContainer = null;

  #pointComponent = null;
  #editForm = null;

  #point = null;

  #changeData = null;
  #changeMode = null;

  #mode = Mode.DEFAULT;

  constructor (pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {

    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditForm = this.#editForm;

    this.#pointComponent = new Point(point);
    this.#editForm = new EditFormView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#editForm.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editForm.setEditClickHandler(this.#handleFormEdit);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevPointComponent === null || prevEditForm === null) {
      render(this.#pointComponent, this.#pointListContainer.element, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editForm, prevEditForm);
    }
    remove(prevPointComponent);
    remove(prevEditForm);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  };

  destroy = () => {
    remove(this.#pointComponent );
    remove(this.#editForm);
  };

  #replacePointToEditForm = () => {
    replace(this.#editForm, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#editForm);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceEditFormToPoint();
  };

  #handleFormEdit = () => {
    this.#replaceEditFormToPoint();
  };
}
