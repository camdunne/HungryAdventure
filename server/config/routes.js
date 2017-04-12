const flightController = require('../controllers/flights.js');
const anywhereController = require('../controllers/anywhere.js');
const geocoderController = require('../controllers/geocoder.js');
const hotelController = require('../controllers/hotels.js');
const weatherController = require('../controllers/weather.js');
const databaseController = require('../controllers/database.js');
const yelp = require('../controllers/yelp.js');
const viator = require('../controllers/viator.js');

module.exports = (app, express) => {
  app.get('/api/flights', flightController.getFlights);
  app.get('/api/geocoder', geocoderController.location);
  app.get('/api/weather', weatherController.getWeather);
  app.get('/api/yelp', yelp.getEvents);
  app.get('/api/dbQuery', databaseController.getProfile);
  app.get('/api/viator/', viator.scrape);

  // Activate for testing
  app.get('/api/anywhere', anywhereController.getAnywhereDummy);
  app.get('/api/hotels', hotelController.getHotelsDummy);
  // //Live
  // app.get('/api/anywhere', anywhereController.getAnywhere);
  // app.get('/api/hotels', hotelController.getHotels);


  // Analysis
  app.get('/api/dbSearchQuerySave', databaseController.saveQuery);
};
