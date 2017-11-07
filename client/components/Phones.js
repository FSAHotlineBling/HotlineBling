import React from 'react';
import { connect } from 'react-redux';
import store from '../store/index';
import { fetchProducts, createProduct, createCategory, fetchCategories2  } from '../store';
import Product from './Product';
import Checkbox from './Checkbox';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
class PhonesHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            categoryIds: [],
            isDirty: false
        }
        this.filterHandleChange = this.filterHandleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.createCheckbox = this.createCheckbox.bind(this);
    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
      }

    componentDidMount() {
        this.props.loadInitialData()
    }

    filterHandleChange(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        let catIds = [];
        for (const checkbox of this.selectedCheckboxes) {
            catIds.push(checkbox)
        }
        this.setState({
            categoryIds: catIds,
            isDirty: true
        })
    }

    createCheckbox = label => (
        <Checkbox
            label={label}
            key={label[0]}
            handleCheckboxChange={this.toggleCheckbox}
        />
    )

filterHandleChange (event) {
    this.setState({
        inputValue: event.target.value
    });
}
  render() {
    const categories = this.props.categories;
    const regex =  new RegExp(this.state.inputValue, 'i')
    let products = this.props.products.filter((product) => {
        if (product.name.match(regex) || product.description.match(regex)){
            return product
        }
    });
    const control = this.props.user.isAdmin === undefined || this.props.user.isAdmin === false
        //CATEGORIES
        let categories2 = {};
        this.props.category.forEach((cat) => {
            let keys = Object.keys(categories2)
            let keyName = cat.category
            if (keys.indexOf(keyName) === -1) {
                categories2[keyName] = [];
            }
            categories2[keyName].push([cat.id, cat.value])
        })
        let keys = Object.keys(categories2)
        if (this.state.isDirty) { products = products.filter((product) => {
            let bool = false;
            product.categories.forEach((cat) => {
                if (this.state.categoryIds.indexOf(cat.id) !== -1) bool = true
            })
            return bool;
          })
        }
    return (
      <div>
      <div className="container">
      <div className="row">
          <div className="col-sm-12">
              <form onSubmit={this.handleFormSubmit}>
                  {keys.map((key) => {
                      return (
                          <div key={key}>
                              <h6>{key}</h6>
                              {categories2[key].map(this.createCheckbox)}
                          </div>
                      )
                  })}
                  <button className="btn btn-default" type="submit">Save</button>
              </form>
          </div>
      </div>
  </div>
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
         <Link to="/users"><button>View Users</button></Link>
         <Link to="/users/admin/orders"><button>View All Orders</button></Link>
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
                          <button className="btn btn-default btn btn-danger btn-sm" type="submit">Submit</button>
                      </span>
                  </form>
            <h3>Add category form</h3>
            <form
                      id="edit-category-form"
                      onSubmit={this.props.handleCategorySubmit}
            >
                <div className="input-group input-group-sm"
                        >
                            <input
                                className="form-control"
                                type="text"
                                name="value"
                                placeholder="Enter Category Value"
                            />
                </div>
                <div className="input-group input-group-sm"
                        >
                            <input
                                className="form-control"
                                type="text"
                                name="category"
                                placeholder="Enter Category"
                            />
                </div>
                <span className="input-group-btn">
                          <button className="btn btn-default btn btn-danger btn-sm" type="submit">Submit</button>
                </span>
            </form>
      </div>
      </div>
      <div className="col-sm-2" />
      </div>
      </div>
      </div>
    )
  }
}



const mapState = ({ products, user, categories, category }) => ({ products, user, categories, category });

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData() {
        dispatch(fetchCategories2());
    },
    handleSubmit(event) {
      event.preventDefault()
      dispatch(createProduct(event.target.name.value, event.target.price.value, event.target.quantity.value, event.target.imgURL.value, event.target.description.value, event.target.category.value, ownProps.history));
    },
    handleCategorySubmit(event) {
        event.preventDefault()
        dispatch(createCategory(event.target.value.value, event.target.category.value, ownProps.history))
    }
  }
}

export default connect(mapState, mapDispatch)(PhonesHome);
