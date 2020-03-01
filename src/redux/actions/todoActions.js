export const addTask = (task) => {
  return {
      type: 'ADD_TASK',
      payload: task
  }
},
  deleteTask = (taskId) => {
      return {
          type: 'DELETE_TASK',
          payload: taskId
      }
  },
  updateTask = (task) => {
    return {
        type: 'UPDATE_TASK',
        payload: task
    }
}

export default { addTask, deleteTask,updateTask };