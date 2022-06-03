import {render} from '../render.js';
import CreateFormView from '../view/create-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import Point from '../view/point-view.js';
import EventListView from '../view/events-list-view.js';
import {FormListView}  from '../view/events-list-view.js';

export default class ListPresenter {
  listComponent = new EventListView();
  createFormComponent = new FormListView();

  init = (listContainer, pointModel) => {
    this.listContainer = listContainer;
    this.pointModel = pointModel;
    this.listPoint = [...this.pointModel.getPoint()];

    render (this.createFormComponent, this.listContainer);
    render(this.listComponent, this.listContainer);
    render(new CreateFormView(this.listPoint[0]), this.createFormComponent.getElement());
    render(new EditFormView(this.listPoint[0]), this.listComponent.getElement());

    for (let i = 0; i < this.listPoint.length; i++){
      render(new Point(this.listPoint[i]), this.listComponent.getElement());
    }

  };
}
