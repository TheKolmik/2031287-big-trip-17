import {filter} from '../utils/filter.js';
import {getRandomInteger} from '../utils/common.js';

export const generateFilter = () => Object.entries(filter).map(
  ([filterName]) => ({
    name: filterName,
    count: getRandomInteger(0,8),
  }),
);
