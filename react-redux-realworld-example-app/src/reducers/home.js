import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED: {
      const payload = action.payload || [];
      const tagsPart = Array.isArray(payload) ? payload[0] : null;

      return {
        ...state,
        tags: tagsPart && tagsPart.tags ? tagsPart.tags : []
      };
    }
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};