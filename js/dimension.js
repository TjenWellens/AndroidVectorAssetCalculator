var FREE = -1;

function ratio (viewportValue, widthOrHeight) {
  return viewportValue / widthOrHeight;
}

/**
 * Dimension
 *
 * .FREE
 *
 * .width
 * .height
 * .viewportWidth
 * .viewportHeight
 * .translateX
 * .translateY
 *
 * .ratioX()
 * .ratioY()
 */
function Dimension (width, height, viewportWidth, viewportHeight, translateX, translateY) {
  if (typeof(width) === 'undefined') width = FREE;
  if (typeof(height) === 'undefined') height = FREE;
  if (typeof(viewportWidth) === 'undefined') viewportWidth = FREE;
  if (typeof(viewportHeight) === 'undefined') viewportHeight = FREE;
  if (typeof(translateX) === 'undefined') translateX = 0;
  if (typeof(translateY) === 'undefined') translateY = 0;

  this.width = width;
  this.height = height;
  this.viewportWidth = viewportWidth;
  this.viewportHeight = viewportHeight;
  this.translateX = translateX;
  this.translateY = translateY;
}

Dimension.FREE = FREE;

Dimension.prototype.ratioX = function () {
  return ratio(this.viewportWidth, this.width);
};

Dimension.prototype.ratioY = function () {
  return ratio(this.viewportHeight, this.height);
};

var exports = module.exports = Dimension;