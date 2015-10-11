describe('misc', function() {
  describe('getDays', function () {
    it('returns a single day when back=0 and forward=0', function () {
      expect(getDays(0,0).length).toEqual(1)
    });
    it('returns a 3 days when back=1 and forward=1', function () {
      expect(getDays(1,1).length).toEqual(3)
    });
  });
  describe('padObjectArray', function() {
    function compareId(arg1, arg2) {
      return arg1.id == arg2.id;
    }
    it('returns an empty array if both arrays are empty', function() {
      expect(padObjectArray([], [], compareId)).toEqual([])
    });
    it('returns an empty array if the padding is empty', function() {
      expect(padObjectArray([{foo: 3}], [], compareId)).toEqual([])
    });
    it('returns the padding if the original array is empty', function() {
      expect(padObjectArray([], [{foo: 3}], compareId)).toEqual([{foo: 3}])
    });
    it('overrides the padding', function() {
      var original = [{id: 1, bar: 'original'}];
      var padding = [{id: 1, bar: 'padding'}];
      var expected = [{id: 1, bar: 'original'}];
      expect(padObjectArray(original, padding, compareId)).toEqual(expected);
    });
    it('leaves other objects in padding', function() {
      var original = [{id: 1, bar: 'original'}];
      var padding = [{id: 1, bar: 'padding'}, {id: 2, bar: 'padding'}];
      var expected = [{id: 1, bar: 'original'}, {id: 2, bar: 'padding'}];
      expect(padObjectArray(original, padding, compareId)).toEqual(expected);
    });
  });
});