const { findLinkStation } = require('./find-link-station');
const { expect } = require('chai');

describe('findLinkStation', () => {
  it('should not find anything when there are no stations', () => {
    expect(findLinkStation([10, 10], [])).to.be.equal(
      'No link station within reach for point 10, 10'
    );
  });

  it('should not find anything when there are no stations within reach', () => {
    const linkStationsParams = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];
    expect(findLinkStation([13, 13], linkStationsParams)).to.be.equal(
      'No link station within reach for point 13, 13'
    );
  });

  it('should find a station within reach', () => {
    const linkStationsParams = [[0, 0, 10], [20, 20, 5]];
    expect(findLinkStation([5, 5], linkStationsParams)).to.be.equal(
      'Best link station for point 5, 5 is 0, 0 with power 10'
    );
  });

  it('should select the most powerfull station within reach', () => {
    const linkStationsParams = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];
    expect(findLinkStation([5, 5], linkStationsParams)).to.be.equal(
      'Best link station for point 5, 5 is 10, 0 with power 12'
    );
  });
});
