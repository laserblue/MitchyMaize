var style;

// this is a wrapped function
(function () {

  // the variables declared here will not be scoped anywhere and will only be accessible in this wrapped function
  var defaultColor = "white",
    highlightColor = "#FEFFD5";

  style = {
    navitem: {
      base: {
        font: '30pt TheMinion',
        align: 'left',
        strokeThickness: 4
      },
      default: {
        fill: defaultColor,
        stroke: 'rgba(0,0,0,0)'
      },
      inverse: {   //this affects the options menu letters - note that changes seem to require some time to take effect
        fill: 'green',
        stroke: 'green'
      },
      hover: {
        fill: highlightColor,
        stroke: 'rgba(200,200,200,0.5)'
      }
    }
  };

  for (var key in style.navitem) {
    if (key !== "base") {
      Object.assign(style.navitem[key], style.navitem.base)
    }
  }

})();

// the trailing () triggers the function call immediately
