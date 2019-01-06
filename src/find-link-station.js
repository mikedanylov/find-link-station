const { Point } = require('./point');
const { LinkStation } = require('./link-station');

/**
 * Find the most powerfull link station within reach
 * @param {Array<Number>} pointParams array with point coordinates [x, y]
 * @param {Array<Number>} linkStationsParams array of stations with location coordinates
 * and reach parameters for each station [x, y, reach]
 */
const findLinkStation = (pointParams, linkStationsParams) => {
  if (!pointParams || pointParams.length !== 2 || !linkStationsParams) {
    throw Error('search: Invalid parameters');
  }

  const [targetPointX, targetPointY] = pointParams;
  const targetPoint = new Point(targetPointX, targetPointY);

  const linkStations = linkStationsParams.map(
    ([x, y, reach]) => new LinkStation(x, y, reach)
  );

  const maxPowerLinkStation = LinkStation.getMaxPowerLinkStationForPoint(
    linkStations,
    targetPoint
  );

  return maxPowerLinkStation
    ? `Best link station for point ${targetPoint.x}, ${targetPoint.y} is ${
        maxPowerLinkStation.location.x
      }, ${maxPowerLinkStation.location.y} with power ${maxPowerLinkStation.reach}`
    : `No link station within reach for point ${targetPoint.x}, ${targetPoint.y}`;
};

module.exports.findLinkStation = findLinkStation;
