import {get} from '../index';

describe('creating the http request', () => {
  describe('get', () => {
    describe('with params', () => {
      it('should be the correct path', () => {
        const actual = get('some-path', {
          param1: 'some-param',
          param2: 'other-param',
          param3: 'another-param'
        });

        expect(actual.path)
          .toEqual('some-path?param1=some-param&param2=other-param&param3=another-param');
      });
    });
    describe('without params', () => {
      it('should be the correct path', () => {
        const actual = get('some-path');

        expect(actual.path).toEqual('some-path');
      });
    });
  });
});
