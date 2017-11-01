import React from 'react';
import { } from '../store/index';
import { withRouter, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export function SingleProduct(props) {
    const products = props.products;
    //filtering products by product id
    const filteredProducts = products.filter((productFilter) => {
        return productFilter.id === Number(props.match.params.productid)
    })
    const product = filteredProducts[0];
    const toShow = (props) => {
        if (!props.loggedInUser){
            return true
        } else if (props.loggedInUser.isAdmin){
            return false
        } return true
    }
    const control = toShow(props);
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3" >
                        <div id="add-content" hidden={control}>
                            <h3>Edit Product </h3>
                            <form
                                id="edit-product-form"
                                onSubmit={props.handleSubmit}
                                >
                                <div className="input-group input-group-sm"
                                >
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Enter Product name"
                                        onChange={props.handleProductChange}
                                        value={props.newProductEntry}
                                    />
                                </div>
                                <div className="input-group input-group-sm"
                                >
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        placeholder="Enter Product Price"
                                        onChange={props.handleEmailChange}
                                        value={props.newEmailEntry}
                                    />
                                </div>
                                <div className="input-group input-group-sm"
                                >
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="quantity"
                                        placeholder="Enter Product Quantity"
                                        onChange={props.handleQuantityChange}
                                        value={props.newQuantityEntry}
                                    />
                                </div>
                                <div className="input-group input-group-sm"
                                >
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="imgURL"
                                        placeholder="Enter Product Image Url"
                                        onChange={props.handleImageURLChange}
                                        value={props.newImageURLEntry}
                                    />
                                </div>
                                <div className="input-group input-group-sm"
                                >
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="description"
                                        placeholder="Enter Product Description"
                                        onChange={props.handleDescriptionChange}
                                        value={props.newDescriptionEntry}
                                    />
                                </div>
                            </form>
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
                                    product === undefined ? <p /> : <div><h1>Price: {product.price}</h1></div>
                                    }
                                    {
                                    product !== undefined && <p>{product.description}</p>
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


const mapStateToProps = (state, ownProps) => {
    return {
        products
    };
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleStudentChange(event) {
            const action = writeStudent(event.target.value);
            dispatch(action);
        },
        handleEmailChange(event) {
            const action = writeEmail(event.target.value);
            dispatch(action);
        },
        handleCampusChange(event) {
            const action = selectCampus(event.target.value);
            dispatch(action);
        },
        handleSubmit(event) {
            event.preventDefault();
            const thunk = putStudent(Number(ownProps.match.params.studentid), event.target.name.value, event.target.email.value, event.target.campus.value, ownProps.history);
            dispatch(thunk);
            const actionStudentClear = writeStudent('');
            dispatch(actionStudentClear);
            const actionEmailClear = writeEmail('');
            dispatch(actionEmailClear);
            const actionCampusClear = selectCampus(1);
            dispatch(actionCampusClear);
        }
    }
}

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct))

export default Container
