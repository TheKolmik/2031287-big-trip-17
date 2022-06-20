import {getRandomInteger} from '../utils/common.js';

const generatePointType = () => {
  const pointType = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
  const randomIndex = getRandomInteger(0, pointType.length - 1);
  return pointType[randomIndex];
};


const generateDescriptions = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. In rutrum ac purus sit amet tempus.',
    'Aliquam id orci ut lectus varius viverra. Nunc fermentum tortor ac porta dapibus.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateDestination = () => {
  const destination = ['London', 'Geneva', 'Rome', 'Czech Republic'];
  const randomIndex = getRandomInteger(0, destination.length - 1);
  return destination[randomIndex];
};

const someOffers = [{
  'id': 1,
  'title': 'Upgrade to a business class',
  'price': 120
},
{
  'id': 2,
  'title': 'Upgrade to a business class',
  'price': 10
},
{
  'id': 3,
  'title': 'Upgrade to a business class',
  'price': 100
},
{
  'id': 4,
  'title': 'Upgrade to a business class',
  'price': 200
}];

const generateOffer = () => {
  const randomIndex = getRandomInteger(0,someOffers.length-1);
  return someOffers[randomIndex];
};

const Date = ['2019-07-10T22:55:56.845Z', '2021-09-12T11:22:13.375Z', '2015-06-09T11:22:13.375Z', '2017-04-08T11:22:13.375Z', '2020-09-07T11:22:13.375Z'];

const generateDate = () => {
  const randomIndex = getRandomInteger(0,someOffers.length-1);
  return Date[randomIndex];
};

export const generatePoint = () => ({
  'basePrice': 1100,
  'date_from': '2019-07-10T22:55:56.845Z',
  'date_to': '2019-07-11T11:22:13.375Z',
  'destination': generateDestination(),
  'id': '0',
  'isFavorite': Boolean(getRandomInteger(0,1)),
  'offers': generateOffer(),
  'type': generatePointType(),
  'description': generateDescriptions(),
  'dueDate': generateDate()
});

