const fs = require('file-system');


module.exports.init = function () {

const trails = JSON.parse(fs.readFileSync('../server/data/sentier-estivaux-converted_geographic-google.json'));

// const trailsId = JSON.parse(fs.readFileSync('server/data/trailId-strating-point.json'));

const trailIdArr = [];

trails.forEach((trail, idx) =>  {
  if(trail.properties.Niv_diff){
  trailIdArr.push({
    type: "Feature",
    _id: idx + 1,
    geometry: {
      type : "LineString",
      coordinates : trail.geometry.coordinates,
    }
  });
}
}
);
console.log(trailIdArr)
fs.writeFileSync('../server/data/trails-geo.json', JSON.stringify(trailIdArr));

};

