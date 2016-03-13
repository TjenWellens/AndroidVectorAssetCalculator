var Dimension = require('./dimension');

/**
 * transform()
 */
function transform (oldDimension, matchDimension) {
  var width = matchDimension.width;
  var height = matchDimension.height;
  var viewportWidth = oldDimension.viewportWidth;
  var viewportHeight = oldDimension.viewportHeight;
  var translateX = 0;
  var translateY = 0;

  // stretch
  if (matchDimension.width === Dimension.FREE && matchDimension.height === Dimension.FREE) {
    return new Dimension(width, height, viewportWidth, viewportHeight);
  }
  else if (matchDimension.width === Dimension.FREE) {
    width = oldDimension.width * matchDimension.height / oldDimension.height;
  }
  else if (matchDimension.height === Dimension.FREE) {
    height = oldDimension.height * matchDimension.width / oldDimension.width;
  }

  // center
  else {
    var dx = matchDimension.width - oldDimension.width;
    if (dx !== 0) {
      dx *= oldDimension.ratioX();
      viewportWidth += dx;
      translateX = dx / 2;
    }
    var dy = matchDimension.height - oldDimension.height;
    if (dy !== 0) {
      dy *= oldDimension.ratioY();
      viewportHeight += dy;
      translateY = dy / 2;
    }
  }
  return new Dimension(width, height, viewportWidth, viewportHeight, translateX, translateY);
}

var exports = module.exports = transform;