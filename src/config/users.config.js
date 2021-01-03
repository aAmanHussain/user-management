export const initialState = {
  loading: true,
  loaded: false,
  users: [],
  displayedUsers: [],
  message: null,
  term: localStorage.getItem('term') || ''
};
