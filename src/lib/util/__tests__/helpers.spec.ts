import {empty, has, is, not} from '../helpers';

describe('helpers', () => {
  describe('not', () => {
    it.each`
       value
       ${false}
       ${null}
       ${undefined}
       ${0}
       ${NaN}
       ${''}
      `('should be true when $value', ({value}) =>
      expect(not(value)).toBe(true));

    it.each`
       value
       ${true}
       ${{}}
       ${[]}
       ${'0'}
       ${'false'}
       ${new Date()}
       ${42}
       ${-42}
       ${3.14}
       ${-3.14}
       ${Infinity}
       ${-Infinity}
      `('should be false when $value', ({value}) =>
      expect(not(value)).toBe(false));
  });

  describe('is', () => {
    it.each`
    value
     ${true}
     ${{}}
     ${[]}
     ${'0'}
     ${'false'}
     ${new Date()}
     ${42}
     ${-42}
     ${3.14}
     ${-3.14}
     ${Infinity}
     ${-Infinity}
    `('should be true when $value', ({value}) => {
      expect(is(value)).toBe(true);
    });

    it.each`
       value
       ${false}
       ${null}
       ${undefined}
       ${0}
       ${NaN}
       ${''}
      `('should be false when $value', ({value}) =>
      expect(is(value)).toBe(false));
  });

  describe('has', () => {
    it.each`
      value
      ${undefined}
      ${false}
      ${null}
      ${{}}
      ${''}
      ${[]}
    `('should be false when $value', ({value}) =>
      expect(has(value)).toBe(false));

    it.each`
      value
      ${{I_AM: 'NOT EMPTY'}}
      ${{I_AM: (): any => undefined}}
      ${-1}
      ${0}
      ${3}
      ${-56.45}
      ${0.0}
      ${'NOT EMPTY'}
      ${['NOT EMPTY']}
      ${true}
      ${(): any => undefined}
    `('should be true when $value', ({value}) =>
      expect(has(value)).toBe(true));

    it('should ', () => {
      expect(has({I_AM: (): any => undefined})).toBe(true);
    });
  });

  describe('empty', () => {
    it.each`
      value
      ${{I_AM: 'NOT EMPTY'}}
      ${-1}
      ${0}
      ${3}
      ${-1.45}
      ${0.0}
      ${Number()}
      ${new Date()}
      ${'NOT EMPTY'}
      ${['NOT EMPTY']}
      ${true}
      ${(): any => undefined}
    `('should be false when $value', ({value}) =>
      expect(empty(value)).toBe(false));

    it.each`
      value
      ${undefined}
      ${false}
      ${null}
      ${{}}
      ${''}
      ${[]}
    `('should be true when $value', ({value}) =>
      expect(empty(value)).toBe(true));
  });
});
