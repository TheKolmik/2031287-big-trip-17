import {generatePoint} from '../fish/point.js';

export default  class PointModel {
// Домашка:
  #point = Array.from({length:0},generatePoint);
  get point() {
    return this.#point;
  }
}
