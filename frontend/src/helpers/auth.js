export const isAuthenticate = () =>
  localStorage.getItem('user-authenticate') !== null ? true : false;
