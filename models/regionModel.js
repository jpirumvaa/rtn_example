var data = require('./data');
var regionModel = module.exports;

/*
 * Gets the requested region data from the static json object.
 * Allways calls back with an array (empty array in case of any error).
 */
regionModel.getRegionData = (layer, params, callback) => {
  var i = 0, d = data.regions;
  console.log("aaaaaaaaaaaaaa", d)
  while (i < layer) {
    var selection = d.filter(x => x.name === params[i])[0];
    if (selection && selection.children) d = selection.children;
    else return callback(['']);
    i++;
  }
  console.log("bbbbbbbb", d);
  if (callback) callback(d.map(x => x.name));
};
