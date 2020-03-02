const initialState = {
  tasks: [
    { key: '001', task: 'Task 1', dateAdded: '01-03-2020 12:12' },
    { key: '002', task: 'Task 2', dateAdded: '01-03-2020 12:12' },
    { key: '003', task: 'Task 3', dateAdded: '01-03-2020 12:12' },
  ]
};

function todoReducer(prevState = initialState, { type, payload }) {
  let newState;
  switch (type) {
    case 'ADD_TASK':
      newState = { 'tasks': [...prevState.tasks, payload] };
      break;
    case 'UPDATE_TASK':
      let foundIndex = prevState.tasks.findIndex(e => e.key === payload.key);
      prevState.tasks[foundIndex] = payload;
      newState = { 'tasks': [...prevState.tasks] };
      break;
    case 'DELETE_TASK':
      let tbArry = prevState.tasks.filter(e => e.key !== payload);
      newState = { 'tasks': [...tbArry] };
      break;
    default:
      newState = prevState;
      break;
  }
  return newState;
}

export default todoReducer;