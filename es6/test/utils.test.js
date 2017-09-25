import {fixDecimalPoints, splitStringInTwo, copyObject} from '../utils';

describe('utils', () => {
  describe('#fixDecimalPoints', () => {
    it('fix the decimal points to 4', () => {
      expect(fixDecimalPoints(1.23456)).toEqual('1.2346');
    });
  });

  describe('#splitStringInTwo', () => {
    it('splits the string into two halves', () => {
      expect(splitStringInTwo('abcdef')).toEqual('ABC - DEF');
    });
  });

  describe('#copyObject', () => {
    it('copies the second object into first object', () => {
      let obj1 = {},
        obj2 = {
          a: 1,
          b: 2
        };

      copyObject(obj1, obj2);

      expect(obj1.a).toEqual(1);
      expect(obj1.b).toEqual(2);
    });
  })
});