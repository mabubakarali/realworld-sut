import home from '../reducers/home';
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionTypes';

describe('home reducer', () => {
  it('returns initial state by default', () => {
    const nextState = home(undefined, { type: '@@INIT' });
    expect(nextState).toEqual({});
  });

  it('handles HOME_PAGE_LOADED with valid payload', () => {
    const action = {
      type: HOME_PAGE_LOADED,
      payload: [
        { tags: ['react', 'redux'] }
      ]
    };

    const nextState = home({}, action);

    expect(nextState.tags).toEqual(['react', 'redux']);
  });

  it('handles HOME_PAGE_LOADED with invalid payload without crashing', () => {
    const action = {
      type: HOME_PAGE_LOADED,
      payload: undefined
    };

    const nextState = home({}, action);

    expect(nextState.tags).toEqual([]);
  });

  it('handles HOME_PAGE_UNLOADED by clearing state', () => {
    const action = { type: HOME_PAGE_UNLOADED };
    const nextState = home({ tags: ['react'] }, action);

    expect(nextState).toEqual({});
  });
});
