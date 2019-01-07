class PointConstructorError extends Error {
  constructor() {
    super();
    this.name = 'PointConstructorError';
    this.message = 'Invalid constructor parameters';
  }
}

module.exports.PointConstructorError = PointConstructorError;

class PointDistanceError extends Error {
  constructor() {
    super();
    this.name = 'PointDistanceError';
    this.message = 'Invalid parameters for target point to calculate distance';
  }
}

module.exports.PointDistanceError = PointDistanceError;

class Point {
  /**
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x, y) {
    try {
      this.x = Number.parseFloat(x);
      this.y = Number.parseFloat(y);
    } catch (e) {
      throw new PointConstructorError();
    }

    if (Number.isNaN(this.x) || Number.isNaN(this.y)) {
      throw new PointConstructorError();
    }
  }

  /**
   * Calculate distance to the targetPoint
   * @param {Point} targetPoint
   */
  getDistanceTo(targetPoint) {
    if (!targetPoint) {
      throw new PointDistanceError();
    }

    return Math.sqrt(
      Math.pow(this.x - targetPoint.x, 2) + Math.pow(this.y - targetPoint.y, 2)
    );
  }
}

module.exports.Point = Point;
