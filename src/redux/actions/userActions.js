export const addUser = (user) => {
    return {
        type: 'ADD_USER',
        payload: user
    }
},
    deleteUser = (userId) => {
        return {
            type: 'DELETE_USER',
            payload: userId
        }
    },
    updateUser = (user) => {
        return {
            type: 'UPDATE_USER',
            payload: user
        }
    }

export default { addUser, deleteUser, updateUser };