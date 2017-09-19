import {fixDecimalPoints, splitStringInTwo} from '../utils';

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
});