let users = [{
  id: 1,
  name: 'Tamas',
  cars: [1, 2]
}, {
  id: 2,
  name: 'Susan',
  cars: []
}, {
  id: 3,
  name: 'Steven',
  cars: [3]
}];

let cars = [{
  id: 1,
  make: 'Ford',
  model: 'Focus',
  colour: 'red',
  ownedBy: 1
}, {
  id: 2,
  make: 'Fiat',
  model: '500',
  colour: 'blue',
  ownedBy: 1
}, {
  id: 3,
  make: 'Mercedes',
  model: 'C250',
  colour: 'silver',
  ownedBy: 3
}];

module.exports = {
  users,
  cars
};