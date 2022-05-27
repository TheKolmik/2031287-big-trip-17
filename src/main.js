import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import {render} from './render.js';
import ListPresenter from './presenter/list-presenter.js';

const tripMain = document.querySelector('.trip-main');
const tripFilters = tripMain.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const listPresenter = new ListPresenter();

render(new FilterView(), tripFilters);

render(new SortView(), tripEvents);

listPresenter.init(tripEvents);
