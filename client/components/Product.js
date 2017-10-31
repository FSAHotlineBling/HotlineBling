import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

class Product extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('in product file', this.props.product)
    let product = this.props.product
    return (
      <div >
        <div className="media">
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/phones/${product.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="Jean Doe">{product.name}</span>
            </h4>
            <h5 className="tucked">
              <span>{product.description}</span>
            </h5>
            <h5 className="tucked">
              <span>{product.price}</span>
            </h5>
            <h5 className="tucked">
              <span>{product.quantity}</span>
            </h5>
          </NavLink>
          <div className="media-right media-middle">
          <button
              className="btn btn-default"
              >
            <span className="glyphicon glyphicon-remove" />
            Add to Cart!
          </button>
        </div>
        </div>
      </div>
    );
  }

}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ products }) => ({ products });


export default connect(mapState)(Product);
