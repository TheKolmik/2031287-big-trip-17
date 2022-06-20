import {FilterType} from '../const';
import {isTaskExpired, isTaskExpiringToday,
  // isTaskRepeating
} from './point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => !point.isArchive),
  [FilterType.FUTURE]: (points) => points.filter((point) => isTaskExpired(point.dueDate) && !point.isArchive),
  [FilterType.TODAY]: (points) => points.filter((point) => isTaskExpiringToday(point.dueDate) && !point.isArchive),
  [FilterType.PAST]: (points) => points.filter((point) => point.isFavorite && !point.isArchive),
  // [FilterType.REPEATING]: (points) => points.filter((point) => isTaskRepeating(point.repeating) && !point.isArchive),
  // [FilterType.ARCHIVE]: (points) => points.filter((point) => point.isArchive),
};

export {filter};
