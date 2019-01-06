class PointConstructorError extends Error {
  constructor() {
    super('Invalid constructor parameters');
    this.name = 'PointConstructorError';
  }
}

module.exports.PointConstructorError = PointConstructorError;

class PointDistanceError extends Error {
  constructor() {
    super('Invalid parameters for target point to calculate distance');
    this.name = 'PointDistanceError';
  }
}

module.exports.PointDistanceError = PointDistanceError;

class Point {
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
   * Calculate distanse to the targetPoint
   * @param {Point} targetPoint
   */
  getDistanceTo(targetPoint) {
    if (
      !targetPoint ||
      Number.isNaN(Number.parseFloat(targetPoint.x)) ||
      Number.isNaN(Number.parseFloat(targetPoint.y))
    ) {
      throw new PointDistanceError();
    }

    return Math.sqrt(
      Math.pow(this.x - targetPoint.x, 2) + Math.pow(this.y - targetPoint.y, 2)
    );
  }
}

module.exports.Point = Point;
