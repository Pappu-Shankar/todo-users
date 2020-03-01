const initialState = {
  users: [
    // { key: '001', name: 'Pappu Shankar', email: 'pappushankar59@gmail.com' },
    // { key: '002', name: 'Suriya', email: 'suriya@gmail.com' },
    // { key: '003', name: 'Sathya', email: 'sathya@gmail.com' },
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