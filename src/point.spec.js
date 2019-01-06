const { expect } = require('chai');

const { Point, PointConstructorError, PointDistanceError } = require('./point');

describe('Point', () => {
  it('should throw error if constructor parameters are invalid', () => {
    const errorMessage = new PointConstructorError().message;

    expect(() => new Point()).to.throw(errorMessage);
    expect(() => new Point(10)).to.throw(errorMessage);
    expect(() => new Point('qwe', 'qwe')).to.throw(errorMessage);
  });

  it('should create Point instance', () => {
    const point1 = new Point(0, 0);
    expect(point1).to.be.instanceOf(Point);
    expect(point1.x).to.be.equal(0);
    expect(point1.y).to.be.equal(0);

    const point2 = new Point(10, 20);
    expect(point2).to.be.instanceOf(Point);
    expect(point2.x).to.be.equal(10);
    expect(point2.y).to.be.equal(20);

    const point3 = new Point(-5, -3);
    expect(point3).to.be.instanceOf(Point);
    expect(point3.x).to.be.equal(-5);
    expect(point3.y).to.be.equal(-3);
  });

  it('getDistanceTo method should throw error if target point is invalid', () => {
    const point = new Point(0, 0);
    const errorMessage = new PointDistanceError().message;

    expect(() => point.getDistanceTo()).to.throw(errorMessage);
  });

  it('getDistanceTo method should return distance to a target point', () => {
    const point = new Point(0, 0);

    expect(point.getDistanceTo(new Point(3, 4))).to.be.equal(5);
  });
});
