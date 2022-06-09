import {generatePoint} from '../fish/point.js';

export default  class PointModel {

  point = Array.from({length:22},generatePoint);
  getPoint = () => this.point;
}
