import {has} from '../helpers';

describe('helpers', () => {
  describe('has', () => {
    it('should be false when given undefined', () => {
      expect(has(undefined)).toBe(false);
    });

    it('should be false when given null', () => {
      expect(has(null)).toBe(false);
    });

    describe('an object', () => {
      it('should be false if empty', () => {
        expect(has({})).toBe(false);
      });

      it('should be true if not empty', () => {
        expect(has({I_AM: 'NOT EMPTY'})).toBe(true);
      });
    });

    describe('a number', () => {
      it('should be false if empty', () => {
        expect(has(0)).toBe(false);
      });

      it.each`
      value
      ${-1}
      ${1}
      ${2}
      ${-2}
      ${3}
      `('should be true if not empty', ({value}) => {
        expect(has(value)).toBe(true);
      });
    });

    describe('a string', () => {
      it('should be false if empty', () => {
        expect(has('')).toBe(false);
      });

      it('should be true if not empty', () => {
        expect(has('NOT EMPTY')).toBe(true);
      });
    });

    describe('an array', () => {
      it('should be false if empty', () => {
        expect(has([])).toBe(false);
      });

      it('should be true if not empty', () => {
        expect(has(['NOT EMPTY'])).toBe(true);
      });
    });
  });
});
