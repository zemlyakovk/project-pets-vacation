export const loginUser = (data) => ({
  type: 'LOGIN_USER',
  params: data
});

export const regUser = (data) => ({
  type: 'REG_USER',
  params: data
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});
