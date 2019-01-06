const { expect } = require('chai');

const { Point, PointDistanceError } = require('./point');
const {
  LinkStation,
  LinkStationConstructorError,
  LinkStationPowerError
} = require('./link-station');

describe('LinkStation', () => {
  it('should throw error if constructor parameters are invalid', () => {
    const errorMessage = new LinkStationConstructorError().message;

    expect(() => new LinkStation()).to.throw(errorMessage);
    expect(() => new LinkStation(0)).to.throw(errorMessage);
    expect(() => new LinkStation(0, 0)).to.throw(errorMessage);
    expect(() => new LinkStation(0, 0, 'qwe')).to.throw(errorMessage);
    expect(() => new LinkStation(0, 0, -12)).to.throw(errorMessage);
  });

  it('should create LinkStation instance', () => {
    const linkStation1 = new LinkStation(0, 0, 10);
    const linkStation2 = new LinkStation(10, 20, 12);
    const linkStation3 = new LinkStation(3, 4, 10);

    expect(linkStation1).to.be.instanceOf(LinkStation);
    expect(linkStation1.location.x).to.be.equal(0);
    expect(linkStation1.location.y).to.be.equal(0);
    expect(linkStation1.reach).to.be.equal(10);

    expect(linkStation2).to.be.instanceOf(LinkStation);
    expect(linkStation2.location.x).to.be.equal(10);
    expect(linkStation2.location.y).to.be.equal(20);
    expect(linkStation2.reach).to.be.equal(12);

    expect(linkStation3).to.be.instanceOf(LinkStation);
    expect(linkStation3.location.x).to.be.equal(3);
    expect(linkStation3.location.y).to.be.equal(4);
    expect(linkStation3.reach).to.be.equal(10);
  });

  it('getPowerForPoint method should throw error if params are invalid', () => {
    const linkStation = new LinkStation(0, 0, 20);
    const errorMessage = new PointDistanceError().message;

    expect(() => linkStation.getPowerForPoint()).to.throw(errorMessage);
  });

  it('getPowerForPoint method should return power for the target point', () => {
    const linkStation = new LinkStation(0, 0, 5);
    const point1 = new Point(3, 3);
    const point2 = new Point(2, 2);

    expect(linkStation.getPowerForPoint(point1)).to.be.closeTo(0.57, 0.01);
    expect(linkStation.getPowerForPoint(point2)).to.be.closeTo(4.72, 0.01);
  });

  it('getPowerForPoint method should return 0 for not reachable points', () => {
    const linkStation = new LinkStation(0, 0, 5);
    const point1 = new Point(10, 10);
    const point2 = new Point(5, 5);

    expect(linkStation.getPowerForPoint(point1)).to.be.equal(0);
    expect(linkStation.getPowerForPoint(point2)).to.be.equal(0);
  });

  it('getMaxPowerLinkStationForPoint static method should throw error if params are invalid', () => {
    const errorMessage = new LinkStationPowerError().message;

    expect(() => LinkStation.getMaxPowerLinkStationForPoint()).to.throw(errorMessage);
    expect(() => LinkStation.getMaxPowerLinkStationForPoint([])).to.throw(errorMessage);
  });

  it('getMaxPowerLinkStationForPoint static method should return null if link stations list is empty', () => {
    const point = new Point(8, 8);

    expect(LinkStation.getMaxPowerLinkStationForPoint([], point)).to.be.equal(null);
  });

  it('getMaxPowerLinkStationForPoint static method should return null when all link stations are unreachable', () => {
    const linkStation = new LinkStation(0, 0, 5);
    const point = new Point(8, 8);

    expect(LinkStation.getMaxPowerLinkStationForPoint([linkStation], point)).to.be.equal(
      null
    );
  });

  it('getMaxPowerLinkStationForPoint static method should find a single link station', () => {
    const linkStation = new LinkStation(0, 0, 10);
    const point = new Point(2, 2);

    expect(LinkStation.getMaxPowerLinkStationForPoint([linkStation], point)).to.be.equal(
      linkStation
    );
  });

  it('getMaxPowerLinkStationForPoint static method should find most powerfull link station', () => {
    const linkStation1 = new LinkStation(0, 0, 10);
    const linkStation2 = new LinkStation(5, 0, 12);
    const point = new Point(5, 2);

    expect(
      LinkStation.getMaxPowerLinkStationForPoint([linkStation1, linkStation2], point)
    ).to.be.equal(linkStation2);
  });
});
