import React from 'react';
import { connect } from 'react-redux';
import store from '../store/index';
import { fetchProducts } from '../store';
import Product from './Product';

/**
 * COMPONENT
 */
class PhonesHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const products = this.props.products
    return (
      <div className="products-list" >
        {products.map(product => <Product product={product} key={product.id} />)}
      </div>
    )
  }
}

const mapState = ({ products }) => ({ products });

const mapDispatch = { fetchProducts};

export default connect(mapState, mapDispatch)(PhonesHome);
