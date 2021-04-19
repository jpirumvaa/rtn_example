var regionModel = require ('../models/regionModel');
var regionController = module.exports;

/*
 * Gets a list of region data from the region model.
 * Layer defaults to 0 (province).
 */
regionController.getRegionData = (layer = 0, params = [], callback) => {
  regionModel.getRegionData (layer, params, callback);
};
