var assert = require('assert');

var Dimension = require('../dimension');
var transform = require('../transform');

/**
 * TESTS
 */
describe('VetorAssetTransformer', function () {
  describe('#transform(oldDimension, matchDimension)', function () {

    it('should return double height when matchDimension has double width', function () {
      var w = 1, h = 2, vw = 1, vh = 1;
      var oldDimension = new Dimension(w, h, vw, vh);
      var matchDimension = new Dimension(2);
      var expectedDimension = new Dimension(2, 4, vw, vh);

      assert.deepEqual(expectedDimension, transform(oldDimension, matchDimension));
    });

    it('should return triple height when matchDimension has triple width', function () {
      var w = 1, h = 5, vw = 1, vh = 1;
      var oldDimension = new Dimension(w, h, vw, vh);
      var matchDimension = new Dimension(3);
      var expectedDimension = new Dimension(3, 15, vw, vh);

      assert.deepEqual(expectedDimension, transform(oldDimension, matchDimension));
    });

    it('should return same viewport values as oldDimension when matchWidth or matchHeight is free', function () {
      var w = 1, h = 1, vw = 2, vh = 3;
      var matchWidth = 3;

      var oldDimension = new Dimension(w, h, vw, vh);
      var matchDimension = new Dimension(matchWidth);
      var expectedDimension = new Dimension(matchWidth, matchWidth, vw, vh);

      assert.deepEqual(expectedDimension, transform(oldDimension, matchDimension));
    });

    it('should return conform with height when width is free', function () {
      var w = 3, h = 1, vw = 2, vh = 3;
      var matchHeight = 3;

      var oldDimension = new Dimension(w, h, vw, vh);
      var matchDimension = new Dimension(Dimension.FREE, matchHeight);
      var expectedDimension = new Dimension(9, matchHeight, vw, vh);

      assert.deepEqual(expectedDimension, transform(oldDimension, matchDimension));
    });

    it('should return centered if old.width != match.width changes and height same', function () {
      var oldDimension = new Dimension(10, 10, 10, 10);
      var matchDimension = new Dimension(20, 10);

      var expectedDimension = new Dimension(20, 10, 20, 10, 5);

      assert.deepEqual(expectedDimension, transform(oldDimension, matchDimension));
    });

    it('should return centered if old.height != match.height changes and width same', function () {
      var oldDimension = new Dimension(10, 10, 10, 10);
      var matchDimension = new Dimension(10, 20);

      var expectedDimension = new Dimension(10, 20, 10, 20, 0, 5);

      assert.deepEqual(expectedDimension, transform(oldDimension, matchDimension));
    });

    it('should return centered width and height', function () {
      var oldDimension = new Dimension(10, 10, 10, 10);
      var matchDimension = new Dimension(12, 20);

      var expectedDimension = new Dimension(12, 20, 12, 20, 1, 5);

      assert.deepEqual(expectedDimension, transform(oldDimension, matchDimension));
    });

    it('should calculate translateXY with ratio', function () {
      var oldDimension = new Dimension(10, 10, 100, 50);
      var matchDimension = new Dimension(12, 20);

      var expectedDimension = new Dimension(
        12, 20, // width, height
        120, 100, // viewport
        10, 25  // translate
      );

      assert.deepEqual(expectedDimension, transform(oldDimension, matchDimension));
    });

  });
});

assert.equalObjects = function (obj1, obj2) {
  assert.ok(JSON.stringify(obj1) === JSON.stringify(obj2));
};