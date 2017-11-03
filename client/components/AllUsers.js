import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Link } from 'react-router-dom';
import store from '../store/index';
import { adminUser } from '../store';

/**
 * COMPONENT
 */
export class AllUsers extends Component {
  constructor(props) {
    super(props);
}

  render() {
    const regex =  new RegExp(this.state.inputValue, 'i')
    const users = this.props.users.filter((user) => {
        if(user.name.match(regex) || user.description.match(regex)){
            return user
        }
    });
    const control = this.props.user.isAdmin === undefined || this.props.user.isAdmin === false
    return (
      <div>
      <div className="products-list" >
      <form className="form-group" style={{marginTop: '20px'}}>
            <input
                className="form-control"
                placeholder="Product Search"
                onChange={this.filterHandleChange}
            />
     </form>
        <ul>
        {
            users.map((user) => {
                return (
                <li key={user.id}>Name: {user.name} Email: {user.email}, Admin: {user.isAdmin} 
                {
                    !user.isAdmin && <button onClick={handlePromote}>Promote</button>
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
        handlePromote(id, product) {
            // const thunk = putProduct(id, product, ownProps.history);
            // dispatch(thunk);
        }
    }
}

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUsers))

export default Container

