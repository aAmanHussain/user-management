import { environment } from '../config/environment';

export const filterUsers = (users, term) => {
  if (!term || !term.length) {
      return users;
  }
  return users.filter(user => user.login && user.login.includes(term));
};

export const userClicked = (event, { url }) => {
  event.stopPropagation();

  window.open(url, { target: '_blank' });
};

export const loadUsers = async () => {
  const response = await fetch(`${environment.baseUrl}/users`);
  return response;
};

export const loadFollowers = async (username) => {
  const response = await fetch(`${environment.baseUrl}/users/${username}/followers`);
  return response;
};
