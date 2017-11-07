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
    const users = this.props.users.filter((user) => {
        if ( user.name ){
            return user.name.match(regex)
        }
    });
    const control = false
    return (
    <div className="container">
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <div className="users-list" >
                <form className="form-group" style={{marginTop: '20px'}}>
                    <input
                        className="form-control"
                        placeholder="User Search"
                        onChange={this.filterHandleChange}
                    />
                </form>
        {
            users.map((user) => {
                return (
                    <div className="card" key={user.id}>
                    <div className="card-block">
                      <h4 className="card-title">{user.name}</h4>
                      <h6 className="card-subtitle mb-2 text-muted">User</h6>
                      <p className="card-text">Email: {user.email}</p>
                      <p>Admin: {user.isAdmin === true ? `True` : `False`}</p>
                      <button className="btn btn-default btn btn-danger btn-sm" onClick={(event) => this.props.handleDelete(event, user.id)}>Delete</button>
                        {
                            !user.isAdmin && <button  className="btn btn-default btn btn-danger btn-sm" onClick={(event) => this.props.handlePromote(event, user.id)}>Promote</button>
                        }
                    </div>
                  </div>
             
                
                
                )
            })
        }
        </div>
        </div>
        <div className="col-sm-8" />
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

