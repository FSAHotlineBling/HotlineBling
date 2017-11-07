import React, { Component } from 'react';
import { putProduct, destroyProduct, destroyCategory, addCategory } from '../store/index';
import { withRouter, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postCart, postOrder, decreaseProductPut } from '../store'
import PhoneReviews from './phone-reviews'

export class SingleProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {}
        }
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleImageURLChange = this.handleImageURLChange.bind(this);
        this.handleDesciptionChange = this.handleDesciptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleProductNameChange(event) {
        this.setState({
            product: { ...this.state.product, name: event.target.value }
        })
    }
    handlePriceChange(event) {
        this.setState({
            product: { ...this.state.product, price: event.target.value }
        })
    }
    handleQuantityChange(event) {
        this.setState({
            product: { ...this.state.product, quantityAvailable: event.target.value }
        })

    }
    handleImageURLChange(event) {
        this.setState({
            product: { ...this.state.product, imageUrl: event.target.value }
        })
    }
    handleDesciptionChange(event) {
        this.setState({
            product: { ...this.state.product, description: event.target.value }
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        const singleProduct = this.state.product;
        this.props.handleDispatch(Number(this.props.match.params.phoneid), singleProduct)
    }

    render() {
        const products = this.props.products;
        const categories = this.props.categories;
        //filtering products by product id
        const filteredProducts = products.filter((productFilter) => {
            return productFilter.id === Number(this.props.match.params.phoneid)
        })
        const product = filteredProducts[0]
        const control = this.props.user.isAdmin === undefined || this.props.user.isAdmin === false
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3" >
                            <div id="add-content" hidden={control}>
                                <h3>Edit Product </h3>
                                <button id="delete-button" hidden={control} type="button" className="btn btn-danger" onClick={(e) => this.props.handleDelete(e, product.id)}>Delete Product</button>
                                <form
                                    id="edit-product-form"
                                    onSubmit={this.handleSubmit}
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
                                <div><p>Categories</p></div>
                                <h2>Add Category</h2>
                                <form
                                    id="add-category-form"
                                    onSubmit={(e) => this.props.handleCategory(e, product.id)}>
                                    <select
                                        className="form-control"
                                        name="category">
                                        {
                                            categories.map((category) => {
                                                return <option key={category.id} value={category.id}>{category.value}</option>
                                            })
                                        }
                                    </select>
                                    <span className="input-group-btn">
                                        <button className="btn btn-default btn btn-danger btn-sm" type="submit" >Add</button>
                                    </span>
                                </form>
                                <h3>Remove Category</h3>
                            {
                                product === undefined ? <div /> : product.categories.map((category) => {
                                    return <div key={category.id}><span>{category.value}<button onClick={(e) => this.props.handleCategoryDelete(e, category.id, product.id)}>Remove</button></span></div>
                                })
                            }
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="container">
                                <div id="product-card-container">
                                    <div>
                                        {
                                            product === undefined ? <div /> : <img src={`${product.imageURL}`} />
                                        }
                                    </div>
                                    <div id="product-card-info">
                                        {
                                            product === undefined ? <p /> : <div><h1>{product.name}</h1></div>
                                        }
                                        {
                                            product !== undefined &&  <img src={product.imageUrl} />
                                        }
                                        {
                                            product === undefined ? <p /> : <div><h1>Price: {product.price}</h1></div>
                                        }
                                        {
                                            product !== undefined && <p>{product.description}</p>
                                        }
                                        {
                                            product !== undefined && product.quantityAvailable >= 1 ?
                                            <button
                                            className="btn btn-default"
                                            onClick={() => this.props.addProductToCart(event, this.props, product)}
                                            >
                                            <span className="glyphicon glyphicon-remove" />
                                            Add to Cart!
                                            </button> : <p>More Coming Soon!!</p>
                                        }
                                        {
                                            product !== undefined &&  <PhoneReviews productId={product.id} />
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1" />
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        user: state.user,
        categories: state.categories,
        order: state.order
    };
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleDispatch(id, product) {
            const thunk = putProduct(id, product, ownProps.history);
            dispatch(thunk);
        },
        handleDelete(event, id) {
            dispatch(destroyProduct(id));
        },
        handleCategoryDelete(event, categoryId, productId) {
            event.preventDefault();
            dispatch(destroyCategory(categoryId, productId));
            dispatch(putProduct(productId, {}, ownProps.history))
        },
        handleCategory(event, productId) {
            event.preventDefault();
            dispatch(addCategory(event.target.category.value, productId));
            dispatch(putProduct(productId, {}, ownProps.history))
        },
        addProductToCart(event, props, product) {
            const productId = product.id
            const userId = props.user ? props.user.id : null
            let orderId
            if (props.order === null || Object.keys(props.order).length === 0){
              dispatch(postOrder(productId, userId))
            } else {
              orderId = props.order.id
              dispatch(postCart(productId, orderId));
            }
            dispatch(decreaseProductPut(product))
            event.stopPropagation();
          }
    }
}

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct))

export default Container
