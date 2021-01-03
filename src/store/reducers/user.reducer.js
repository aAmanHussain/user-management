import { UserActions } from '../actions/user.actions';
import { filterUsers } from '../../services/users.service';
import { initialState } from '../../config/users.config';

export const UserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UserActions.loadUsers: {
            return { 
                ...state,
                loading: true,
                loaded: false,
                users: [],
                displayedUsers: []
            };
        }
        case UserActions.fetchUsersSuccess: {
            return { 
                ...state,
                loading: false,
                loaded: true,
                users: payload,
                displayedUsers: filterUsers(payload, state.term)
            };
        }
        case UserActions.fetchUsersError: {
            return { 
                ...state,
                loading: false,
                loaded: true,
                users: [],
                displayedUsers: []
            };
        }
        case UserActions.searchUsers: {
            return { 
                ...state,
                term: payload,
                displayedUsers: filterUsers(state.users, payload)
            };
        }
        case UserActions.updateUser: {
            const { users = [] }= state;
            const idx = users.findIndex(user => user.id === payload.id);
            users[idx] = payload;
            return {
                ...state,
                users,
                displayedUsers: filterUsers(users, state.term)
            };
        }
        case UserActions.deleteUser: {
            const users = state.users.filter(user => user.id !== payload.id);
            return {
                ...state,
                users,
                displayedUsers: filterUsers(users, state.term)
            }
        }
        default: {
            return { 
                ...state
            };
        }
    }
};