var rtnExample = {
  'selects': ['PROVINCE', 'DISTRICT', 'SECTOR', 'CELL', 'VILLAGE']
};

/*
 * Handle change events on selection fields. If a value was set, define
 * possible value for the next selection field. Ifempty value was set,
 * deavtivate all following selection fields.
 */
rtnExample.handleChange = event => {
  var target = event.target.id,
      value = event.target.value,
      index = rtnExample.selects.indexOf (target),
      next = rtnExample.selects[index + 1];
      after = rtnExample.selects[index + 2];
  if (value)
    rtnExample.requestRegionData (index + 1, rtnExample.getValues(), data => {
      rtnExample.setSelectOptions (next, data);
      if (after) rtnExample.disableSelects (after);
    });
  else
    rtnExample.disableSelects (next);
};

/*
 * Return an array of all current values.
 */
rtnExample.getValues = () => {
  return rtnExample.selects.map (select => document.getElementById (select).value);
};

/*
 * Set the options specified in <data> to the selection input <target>.
 */
rtnExample.setSelectOptions = (target, data) => {
  var el = document.getElementById (target);
  el.innerHTML = "<option value=''>please select</option>";
  data.forEach (d => {
    var opt = document.createElement ('option');
    opt.value = d;
    opt.innerHTML = d;
    el.appendChild (opt);
  });
  el.disabled = false;
};

/*
 * Disable the selection input <target> and all following ones.
 */
rtnExample.disableSelects = target => {
  for (var i = rtnExample.selects.indexOf (target); i < rtnExample.selects.length; i++){
    var el = document.getElementById (rtnExample.selects[i]);
    el.disabled = true;
    el.value = null;
  }
};

/*
 * Request region information from the server, <layer> being the adminstrative layer
 * (starting with 0 - province) and <params> being the currently selected values.
 */
rtnExample.requestRegionData = (layer, params, callback) => {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200){
      callback (JSON.parse (xhttp.responseText));
    }
  };
  xhttp.open ("POST", "/regions", true);
  xhttp.setRequestHeader ('Content-Type', 'application/json');
  xhttp.send (JSON.stringify ({layer: layer, params: params}));
};
