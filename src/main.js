import FilterView from './view/filter-view.js';
// import SortView from './view/sort-view.js';
import {render} from './framework/render.js';
import ListPresenter from './presenter/list-presenter.js';
import PointModel from '../src/model/point-model.js';
import {generateFilter} from './fish/filter.js';

const tripMain = document.querySelector('.trip-main');
const tripFilters = tripMain.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const pointModel = new PointModel();
const listPresenter = new ListPresenter(tripEvents, pointModel);

const filters = generateFilter(pointModel.points);

render(new FilterView(filters), tripFilters);

// render(new SortView(), tripEvents);

listPresenter.init();
