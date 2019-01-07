## Find link station

This module helps to find the most powerful link station for a point in a 2d plane.

### Example

The module has one exported function `findLinkStation` which takes two parameters.
First, an array with x and y coordinates for target point. Second, an array of 
available link stations each of which is represented by its location (x and y 
coordinates) as well as the reach of the station.

Below you can see the `example.js` how `findLinkStation` can be used.

```javascript
const { findLinkStation } = require('./src/find-link-station');

const linkStationsParams = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];
const pointsOfInterest = [[0, 0], [100, 100], [15, 10], [18, 18]];

for (const pointParams of pointsOfInterest) {
  const result = findLinkStation(pointParams, linkStationsParams);
  console.log(result);
}
```

The snippet produces the following output to the console:

```bash
[mikedanylov@t470p find-link-station]$ node example.js 
Best link station for point 0, 0 is 0, 0 with power 10
No link station within reach for point 100, 100
Best link station for point 15, 10 is 10, 0 with power 12
Best link station for point 18, 18 is 20, 20 with power 5
```
