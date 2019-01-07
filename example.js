const { findLinkStation } = require('./src/find-link-station');

const linkStationsParams = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];
const pointsOfInterest = [[0, 0], [100, 100], [15, 10], [18, 18]];

for (const pointParams of pointsOfInterest) {
  const result = findLinkStation(pointParams, linkStationsParams);
  console.log(result);
}

/*

Output:

Best link station for point 0, 0 is 0, 0 with power 10
No link station within reach for point 100, 100
Best link station for point 15, 10 is 10, 0 with power 12
Best link station for point 18, 18 is 20, 20 with power 5

 */
