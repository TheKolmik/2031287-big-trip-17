import {generatePoint} from '../fish/point.js';

export default  class PointModel {

  point = Array.from({length:7},generatePoint);
  getPoint = () => this.point;
}
