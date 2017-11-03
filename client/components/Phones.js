import React from 'react';
import { connect } from 'react-redux';
import store from '../store/index';
import { fetchProducts, createProduct } from '../store';
import Product from './Product';

/**
 * COMPONENT
 */
class PhonesHome extends React.Component {
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
    const products = this.props.products.filter((product) => {
        if(product.name.match(regex) || product.description.match(regex)){
            return product
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
        {products.map(product => <Product product={product} key={product.id} />)}
      </div>
      <div hidden={control}>
         <h3>Add Phone </h3>
                  <form
                      id="edit-product-form"
                      onSubmit={this.props.handleSubmit}
                      >
                      <div className="input-group input-group-sm"
                      >
                          <input
                              className="form-control"
                              type="text"
                              name="name"
                              placeholder="Enter Product name"
                              onChange={this.handleProductNameChange}
                          />
                      </div>
                      <div className="input-group input-group-sm"
                      >
                          <input
                              className="form-control"
                              type="text"
                              name="price"
                              placeholder="Enter Product Price"
                              onChange={this.handlePriceChange}
                          />
                      </div>
                      <div className="input-group input-group-sm"
                      >
                          <input
                              className="form-control"
                              type="text"
                              name="quantity"
                              placeholder="Enter Product Quantity"
                              onChange={this.handleQuantityChange}
                          />
                      </div>
                      <div className="input-group input-group-sm"
                      >
                          <input
                              className="form-control"
                              type="text"
                              name="imgURL"
                              placeholder="Enter Product Image Url"
                              onChange={this.handleImageURLChange}
                          />
                      </div>
                      <div className="input-group input-group-sm"
                      >
                          <input
                              className="form-control"
                              type="text"
                              name="description"
                              placeholder="Enter Product Description"
                              onChange={this.handleDescriptionChange}
                          />
                      </div>
                      <span className="input-group-btn">
                          <button className="btn btn-default btn btn-danger btn-sm" type="submit">Submit</button>
                      </span>
                  </form>
      </div>
      </div>
    )
  }
}

const mapState = ({ products, user }) => ({ products, user });

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      dispatch(createProduct(event.target.name.value, event.target.price.value, event.target.quantity.value, event.target.imgURL.value, event.target.description.value, ownProps.history));
    }
  }
}

export default connect(mapState, mapDispatch)(PhonesHome);
