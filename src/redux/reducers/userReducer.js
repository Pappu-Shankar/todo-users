const initialState = {
  users: [
    { key: '001', name: 'Mike', email: 'moke@gmail.com' },
    { key: '002', name: 'John', email: 'john@gmail.com' },
    { key: '003', name: 'Shankar', email: 'shankar@gmail.com' },
  ]
};

function userReducer(prevState = initialState, { type, payload }) {
  let newState;
  switch (type) {
    case 'ADD_USER':
      newState = { 'users': [...prevState.users, payload] };
      break;
    case 'UPDATE_USER':
      let foundIndex = prevState.users.findIndex(e => e.key === payload.key);
      prevState.users[foundIndex] = payload;
      newState = { 'users': [...prevState.users] };
      break;
    case 'DELETE_USER':
      let tbArry = prevState.users.filter(e => e.key !== payload);
      newState = { 'users': [...tbArry] };
      break;
    // case 'SET'
    default:
      newState = prevState;
      break;
  }
  return newState;
}

export default userReducer;