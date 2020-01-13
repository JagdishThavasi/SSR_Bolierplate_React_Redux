import { FETCH_ACCOUNTS,SORT_ACCOUNTS } from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return Object.assign([],action.payload)
    case SORT_ACCOUNTS:
      return Object.assign([],action.payload)
    default:
      return state
  }
};
