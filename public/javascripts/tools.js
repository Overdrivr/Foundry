module.exports = {
  getTransformedCoords: function(x, y, ctm) {
      var xn = x * ctm.a + y * ctm.c + ctm.e;
      var yn = x * ctm.b + y * ctm.d + ctm.f;
      return {
        x: xn,
        y: yn
      };
  },

  dst: function(x,y,cx,cy){
    return Math.sqrt((cx - x)*(cx - x) + (cy - y)*(cy - y));
  }
}
