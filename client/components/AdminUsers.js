import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers, deleteUser} from '../store/users'
import {Link} from 'react-router-dom'
import AddUser from './AddUser'

class AdminUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdding: false
    }
  }
  componentDidMount() {
    this.props.fetchAllUsers()
  }
  render() {
    const {isLoggedIn, allUsers, removeUser} = this.props
    if (!allUsers.length) {
      return <h2>Loading users...</h2>
    }
    return (
      <div>
        <button
          className="all-prod-button"
          type="button"
          onClick={() => {
            this.setState({isAdding: true})
          }}
        >
          Add User
        </button>
        {this.state.isAdding && <AddUser />}
        {this.state.isAdding && (
          <button
            type="button"
            className="all-prod-button"
            onClick={() => this.setState({isAdding: false})}
          >
            Cancel
          </button>
        )}
        <div className="all-users-container">
          {allUsers.map(user => (
            <div key={user.id} className="users-container">
              <Link to={`/users/${user.id}/edit`}>
                <h3 className="all-users-user-info">{user.email}</h3>
              </Link>
              <p className="all-users-user-info">
                Admin Status: {`${user.admin}`}
              </p>
              <p className="all-users-user-info">{user.address}</p>
              <button
                className="delete-button"
                type="button"
                onClick={() => removeUser(user)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    removeUser: user => dispatch(deleteUser(user))
  }
}

export default connect(mapState, mapDispatch)(AdminUsers)
