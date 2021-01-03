import { useEffect, useReducer } from 'react';
import { initialState } from './config/users.config';
import { loadUsers } from './services/users.service';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserReducer } from './store/reducers/user.reducer';
import { UserActions } from './store/actions/user.actions';
import './App.css';

const App = () => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const searchUsers = event => {
    dispatch({
      type: UserActions.searchUsers,
      payload: event.target.value.toLowerCase()
    });
  };

  const updateUser = user => {
    dispatch({
      type: UserActions.updateUser,
      payload: user
    });
  };

  const deleteUser = user => {
    dispatch({
      type: UserActions.deleteUser,
      payload: user
    });
  };

  useEffect(() => {
    localStorage.setItem(`term`, state.term);
  }, [state.term]);

  useEffect(() => {
    loadUsersList();
  }, []);

  const loadUsersList = async () => {
    try {
      const response = await loadUsers();
      const data = await response.json();
      dispatch({
        type: UserActions.fetchUsersSuccess,
        payload: data
      });
    } catch (ex) {
      dispatch({
        type: UserActions.fetchUsersError
      });
    }
  };

  const { displayedUsers, term, loading, loaded } = state;
  return (
    <UsersListComponent
      users={displayedUsers}
      term={term}
      loading={loading}
      loaded={loaded}
      loadUsersList={loadUsersList}
      onKeyUpHandler={searchUsers}
      updateUser={updateUser}
      deleteUser={deleteUser}
    />
  );
};

export default App;
