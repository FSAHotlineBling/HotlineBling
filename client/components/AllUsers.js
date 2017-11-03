import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Link } from 'react-router-dom';
import store from '../store/index';
import { adminUser, destroyUser } from '../store';

/**
 * COMPONENT
 */
export class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputValue: ''
    }
    this.filterHandleChange = this.filterHandleChange.bind(this);
}
filterHandleChange (event) {
    this.setState({
        inputValue: event.target.value
    });
}

  render() {
    const regex =  new RegExp(this.state.inputValue, 'i')
    const users = this.props.users.filter(user => user.name.match(regex));
    const control = false
    return (
      <div>
      <div className="products-list" >
      <form className="form-group" style={{marginTop: '20px'}}>
            <input
                className="form-control"
                placeholder="User Search"
                onChange={this.filterHandleChange}
            />
     </form>
        <ul>
        {
            users.map((user) => {
                return (
                <li key={user.id}>Name: {user.name} Email: {user.email}, Admin: {user.isAdmin === true ? `True` : `False`} <button onClick={(event) => this.props.handleDelete(event, user.id)}>Delete</button>
                {
                    !user.isAdmin && <button  onClick={(event) => this.props.handlePromote(event, user.id)}>Promote</button>
                }
                </li>
                )
            })
        }
        </ul>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users
    };
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handlePromote(event, id) {
            const thunk = adminUser(id, ownProps.history);
            dispatch(thunk);
        },
        handleDelete(event, id) {
            const thunk = destroyUser(id, ownProps.history);
            dispatch(thunk);
        }
    }
}

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUsers))

export default Container

