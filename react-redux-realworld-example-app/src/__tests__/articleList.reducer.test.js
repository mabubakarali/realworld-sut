import articleList from '../reducers/articleList';
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionTypes';

// Helper to create initial state
const initialState = {};

describe('articleList reducer', () => {
  it('should return initial state by default', () => {
    const nextState = articleList(undefined, { type: '@@INIT' });
    expect(nextState).toEqual({});
  });

  it('handles HOME_PAGE_LOADED with valid payload', () => {
    const action = {
      type: HOME_PAGE_LOADED,
      pager: jest.fn(),
      tab: 'global',
      payload: [
        { tags: ['react', 'angular'] },
        {
          articles: [
            { slug: 'test-article', title: 'Test Article', description: 'desc' }
          ],
          articlesCount: 1
        }
      ]
    };

    const nextState = articleList(initialState, action);

    expect(nextState.pager).toBe(action.pager);
    expect(nextState.tab).toBe('global');
    expect(nextState.currentPage).toBe(0);
    expect(nextState.tags).toEqual(['react', 'angular']);
    expect(nextState.articles).toHaveLength(1);
    expect(nextState.articles[0].slug).toBe('test-article');
    expect(nextState.articlesCount).toBe(1);
  });

  it('handles HOME_PAGE_LOADED with missing/invalid payload gracefully', () => {
    const action = {
      type: HOME_PAGE_LOADED,
      pager: null,
      tab: 'global',
      payload: undefined // this simulates API/network error shape
    };

    const nextState = articleList(initialState, action);

    expect(nextState.pager).toBeNull();
    expect(nextState.tab).toBe('global');
    expect(nextState.currentPage).toBe(0);
    expect(nextState.tags).toEqual([]);
    expect(nextState.articles).toEqual([]);
    expect(nextState.articlesCount).toBe(0);
  });

  it('handles HOME_PAGE_UNLOADED by resetting state', () => {
    const populatedState = {
      pager: jest.fn(),
      tab: 'global',
      currentPage: 1,
      tags: ['react'],
      articles: [{ slug: 'a' }],
      articlesCount: 1
    };

    const action = { type: HOME_PAGE_UNLOADED };
    const nextState = articleList(populatedState, action);

    expect(nextState).toEqual({});
  });
});
