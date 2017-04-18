module.exports = {
  pinArray: (data) => {
    const results = [];
    if (data.hotel) results.push(data.hotel);
    if (data.yelpEvents) {
      data.yelpEvents.forEach((event) => {
        results.push(event);
      });
    }
    return results;
  },
  yelpPrice: (bling) => {
    const len = bling.length;
    if (len <= 1) {
      return 10;
    } else if (len === 2) {
      return 20;
    } else if (len === 3) {
      return 45;
    }
    return 100;
  },
};
