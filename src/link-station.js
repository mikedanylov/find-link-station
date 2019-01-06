const { Point } = require('./point');

class LinkStationConstructorError extends Error {
  constructor() {
    super('Invalid constructor parameters');
    this.name = 'LinkStationConstructorError';
  }
}

module.exports.LinkStationConstructorError = LinkStationConstructorError;

class LinkStationPowerError extends Error {
  constructor() {
    super('Invalid parameters');
    this.name = 'LinkStationPowerError';
  }
}

module.exports.LinkStationPowerError = LinkStationPowerError;

class LinkStation {
  /**
   * @param {Number} x
   * @param {Number} y
   * @param {Number} reach
   */
  constructor(x, y, reach) {
    try {
      this.location = new Point(x, y);
      this.reach = Number.parseFloat(reach);
    } catch (e) {
      throw new LinkStationConstructorError();
    }

    if (Number.isNaN(this.reach) || this.reach < 0) {
      throw new LinkStationConstructorError();
    }
  }

  /**
   * Calculate link station power for the target point
   * @param {Point} point
   */
  getPowerForPoint(point) {
    const distanceToPoint = this.location.getDistanceTo(point);
    const isPointInRange = this.reach > distanceToPoint;

    return isPointInRange ? Math.pow(this.reach - distanceToPoint, 2) : 0;
  }

  /**
   * Find link station with max power for the target point
   * @param {Array<LinkStation>} linkStations
   * @param {Point} point
   */
  static getMaxPowerLinkStationForPoint(linkStations, point) {
    if (!linkStations || !point) {
      throw new LinkStationPowerError();
    }

    if (!linkStations.length) {
      return null;
    }

    const reachableLinkStations = linkStations.filter(
      station => station.getPowerForPoint(point) > 0
    );

    return reachableLinkStations.length > 0
      ? reachableLinkStations.reduce((prev, curr) =>
          prev.getPowerForPoint(point) > curr.getPowerForPoint(point) ? prev : curr
        )
      : null;
  }
}

module.exports.LinkStation = LinkStation;
