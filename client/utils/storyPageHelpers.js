module.exports = {
  pinArray: (data) => {
    const results = [];
    if (data.hotel) {
      if (data.hotel.lat && data.hotel.lng) results.push(data.hotel);
    }
    if (data.yelpEvents) {
      data.yelpEvents.forEach((event) => {
        if (event.coordinates) results.push(event);
      });
    }
    return results;
  },
  yelpPrice: (bling) => {
    if (bling) {
      const len = bling.length;
      if (len <= 1) {
        return 10;
      } else if (len === 2) {
        return 20;
      } else if (len === 3) {
        return 45;
      }
      return 100;
    }
    return 10;
  },
};
