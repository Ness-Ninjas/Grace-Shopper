import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'
const ADD_USER = 'ADD_USER'
export const EDIT_USER = 'EDIT_USER'
const REMOVE_USER = 'REMOVE_USER'

const getAllUsers = allUsers => ({
  type: GET_ALL_USERS,
  allUsers
})

const addUser = user => ({
  type: ADD_USER,
  user
})

const editUser = user => ({
  type: EDIT_USER,
  user
})

const removeUser = user => ({
  type: REMOVE_USER,
  user
})

export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const allUsers = (await axios.get('/api/users')).data
      dispatch(getAllUsers(allUsers))
    } catch (err) {
      console.error(err)
    }
  }
}

export const createUser = user => {
  return async dispatch => {
    try {
      const created = (await axios.post('/api/users', user)).data
      dispatch(addUser(created))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateUser = (user, history) => {
  return async dispatch => {
    try {
      const updated = (await axios.put(`/api/users/${user.id}`, user)).data
      dispatch(editUser(updated))
      history.push('/admin/users')
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteUser = user => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${user.id}`)
      dispatch(removeUser(user))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialUsersState = []

export default (state = initialUsersState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers
    case ADD_USER:
      return [...state, action.user]
    case EDIT_USER:
      return state.map(user => {
        return user.id === action.user.id ? action.user : user
      })
    case REMOVE_USER:
      return state.filter(user => user.id !== action.user.id)
    default:
      return state
  }
}
