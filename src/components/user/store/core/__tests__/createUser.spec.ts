import {create} from '../createUser';
import {NewUser} from '../../types';

const fetchMock = require('fetch-mock');

describe('creating a user', () => {
  const body = {name: 'Ryan', id: 1};
  const mock = jest.fn();

  beforeEach(() => {
    fetchMock.post('http://localhost:3000/users', body);
  });

  it('should handle the response of creating a user', async () => {
    await create({name: 'Ryan'}, (user: NewUser) => {
      mock(user);
    });
    expect(mock).toHaveBeenCalledWith(body);
  });
});
