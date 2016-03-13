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

Dimension.prototype.ratioX = function () {
  return ratio(this.viewportWidth, this.width);
};

Dimension.prototype.ratioY = function () {
  return ratio(this.viewportHeight, this.height);
};


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
  if (matchDimension.width == FREE && matchDimension.height == FREE) {
    return new Dimension(width, height, viewportWidth, viewportHeight);
  }
  else if (matchDimension.width == FREE) {
    width = oldDimension.width * matchDimension.height / oldDimension.height;
  }
  else if (matchDimension.height == FREE) {
    height = oldDimension.height * matchDimension.width / oldDimension.width;
  }

  // center
  else {
    var dx = matchDimension.width - oldDimension.width;
    if (dx != 0) {
      dx *= oldDimension.ratioX();
      viewportWidth += dx;
      translateX = dx / 2;
    }
    var dy = matchDimension.height - oldDimension.height;
    if (dy != 0) {
      dy *= oldDimension.ratioY();
      viewportHeight += dy;
      translateY = dy / 2;
    }
  }
  return new Dimension(width, height, viewportWidth, viewportHeight, translateX, translateY);
}




function calculate (e) {
  e.preventDefault();

  var oldDimension = new Dimension();
  handleDimension('old', oldDimension, getDimension);
  console.log(oldDimension);

  var matchDimension = new Dimension();
  handleDimension('match', matchDimension, getDimension);
  console.log(matchDimension);

  var outputDimension = transform(oldDimension, matchDimension);
  handleDimension('new', outputDimension, updateInput);
  console.log(outputDimension);

}

function handleDimension (prefix, dimension, actionFunction) {
  for (var property in dimension) {
    if (dimension.hasOwnProperty(property)) {
      var element = document.getElementById(prefix + '_' + property);
      if (element === null) continue;
      actionFunction(dimension, property, element);
    }
  }
}

function e (id) {
  return document.getElementById(id);
}

function getDimension (dimension, property, element) {
  dimension[property] = parseInt(element.value);
}

function updateInput (dimension, property, element) {
  element.value = dimension[property];
}

window.onload = function (){
  var btn = document.getElementById('button');
  btn.onclick = calculate;
};