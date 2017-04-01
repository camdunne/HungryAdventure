
module.exports = {
  trimSkyBody: (skyBody) => {
    const trimResults = {};
    let price = 0;
    skyBody.Quotes.forEach((skyElem) => {
      if (skyElem.InboundLeg && skyElem.OutboundLeg && skyElem.MinPrice > price) {
        trimResults.price = skyElem.MinPrice;
        trimResults.carrierId = skyElem.OutboundLeg.CarrierIds[0];
        trimResults.originId = skyElem.OutboundLeg.OriginId;
        trimResults.destinationId = skyElem.InboundLeg.OriginId;
        trimResults.arrivalDate = skyElem.OutboundLeg.DepartureDate.slice(0, 10);
        trimResults.departureDate = skyElem.InboundLeg.DepartureDate.slice(0, 10);
        price = skyElem.MinPrice;
      }
    });
    const getOGID = (id) => {
      skyBody.Places.forEach((elem) => {
        if (elem.PlaceId === id) {
          delete (trimResults.originId);
          trimResults.originTerminal = elem.IataCode;
        }
      });
    };
    const getDesID = (id) => {
      skyBody.Places.forEach((elem) => {
        if (elem.PlaceId === id) {
          delete (trimResults.destinationId);
          trimResults.destinationTerminal = elem.IataCode;
          trimResults.location = elem.CityName;
        }
      });
    };
    const getCarID = (id) => {
      skyBody.Carriers.forEach((elem) => {
        if (elem.CarrierId === id) {
          delete (trimResults.carrierId);
          trimResults.carrier = elem.Name;
        }
      });
    };
    getOGID(trimResults.originId);
    getDesID(trimResults.destinationId);
    getCarID(trimResults.carrierId);

    return trimResults;
  },
};
