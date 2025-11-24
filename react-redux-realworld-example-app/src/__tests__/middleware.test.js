import { promiseMiddleware } from '../middleware';
import * as types from '../constants/actionTypes';

// simple mock store + next
const createMockStore = (state = {}) => {
  const actions = [];
  const getState = () => state;
  const dispatch = (action) => {
    actions.push(action);
    return action;
  };
  return { getState, dispatch, getActions: () => actions };
};

describe('promiseMiddleware', () => {
  it('passes through non-promise actions', () => {
    const store = createMockStore({});
    const next = jest.fn();
    const action = { type: 'TEST_ACTION', payload: 'value' };

    const middleware = promiseMiddleware(store);
    middleware(next)(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(store.getActions()).toEqual([]);
  });

  it('handles promise rejections with missing error.response without crashing', async () => {
    const store = createMockStore({ viewChangeCounter: 0 });
    const next = jest.fn();

    const failingPromise = Promise.reject(new Error('Network error'));

    const action = {
      type: types.HOME_PAGE_LOADED,
      payload: failingPromise
    };

    const middleware = promiseMiddleware(store);

    await middleware(next)(action);

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThan(0);
  });
});