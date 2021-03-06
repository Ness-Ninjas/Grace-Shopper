import axios from 'axios'
import {EDIT_USER} from './users'

const SET_SINGLE_USER = 'SET_SINGLE_USER'

const setSingleUser = user => ({
  type: SET_SINGLE_USER,
  user
})

export const fetchSingleUser = userId => {
  return async dispatch => {
    try {
      const user = (await axios.get(`/api/users/${userId}`)).data
      dispatch(setSingleUser(user))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialSingleUserState = {}

export default (state = initialSingleUserState, action) => {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.user
    case EDIT_USER:
      return action.user
    default:
      return state
  }
}
