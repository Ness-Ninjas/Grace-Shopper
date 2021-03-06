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
            onClick={() => this.setState({isAdding: false})}
          >
            Cancel
          </button>
        )}
        <div className="all-users-container">
          {allUsers.map(user => (
            <div key={user.id} className="all-users-user">
              <Link to={`/users/${user.id}/edit`}>
                <h3>{user.email}</h3>
              </Link>
              <p>{user.address}</p>
              <p>Admin Status: {`${user.admin}`}</p>
              <button type="button" onClick={() => removeUser(user)}>
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
