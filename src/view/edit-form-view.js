import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
// import flatpickr from 'flatpickr';

// import 'flatpickr/dist/flatpickr.min.css';

// import {humanizePointDueDate,
// } from '../utils/point.js';

const BLANK_POINT = {
  description: '',
  dueDate: null,
  isArchive: false,
  isFavorite: false,
};

const createEditFormViewTemplate = (point = {}) => {
  const {destination, basePrice, timeFrom, timeTo, type, description ='', offers = ''} = point;

  return (`
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" src="img/icons/${type}.png" alt="Event type icon" width="17" height="17">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        Flight
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time0" id="event-start-time-1" type="text" name="event-start-time" value="${timeFrom}">
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time1" id="event-end-time-1" type="text" name="event-end-time" value="${timeTo}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        €
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="editf-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
          <label class="event__offer-label" for="editf-offer-luggage-1">
            <span class="event__offer-title">${offers.title}</span>
            +€&nbsp;
            <span class="event__offer-price">${offers.price}</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="editf-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked="">
          <label class="event__offer-label" for="editf-offer-comfort-1">
            <span class="event__offer-title">${offers.title}</span>
            +€&nbsp;
            <span class="event__offer-price">${offers.price}</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="editf-offer-meal-1" type="checkbox" name="event-offer-meal">
          <label class="event__offer-label" for="editf-offer-meal-1">
            <span class="event__offer-title">${offers.title}</span>
            +€&nbsp;
            <span class="event__offer-price">${offers.price}</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="editf-offer-seats-1" type="checkbox" name="event-offer-seats">
          <label class="event__offer-label" for="editf-offer-seats-1">
            <span class="event__offer-title">${offers.title}</span>
            +€&nbsp;
            <span class="event__offer-price">${offers.price}</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="editf-offer-train-1" type="checkbox" name="event-offer-train">
          <label class="event__offer-label" for="editf-offer-train-1">
            <span class="event__offer-title">${offers.title}</span>
            +€&nbsp;
            <span class="event__offer-price">${offers.price}</span>
          </label>
        </div>
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
    </section>
  </section>
</form>`);
};

export default class EditFormView extends AbstractStatefulView {
  constructor(point = BLANK_POINT) {
    super();
    this._state = EditFormView.parsePointToState(point);

    this.#setInnerHandlers();
  }

  get template() {
    return createEditFormViewTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  reset = (point) => {
    this.updateElement(
      EditFormView.parsePointToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  };

  #dateInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      timeFrom: evt.target.value,
    });
  };

  #timeToInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      timeTo: evt.target.value,
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      destination: evt.target.value,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #setInnerHandlers = () => {
    const typeInputs = this.element.querySelectorAll('.event__type-input');
    typeInputs.forEach((inputs) => inputs.addEventListener('input', this.#typeToggleHandler));
    this.element.querySelector('.event__input--time0').addEventListener('input', this.#dateInputHandler);
    this.element.querySelector('.event__input--time1').addEventListener('input', this.#timeToInputHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationInputHandler);

  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  static parsePointToState = (point) => ({
    ...point,
    isDueDate: point.dueDate !== null
  });

  static parseStateToPoint = (state) => {
    const point = {...state};
    if (!point.isDueDate) {
      point.dueDate = null;
    }
    delete point.isDueDate;
    return point;
  };
}
