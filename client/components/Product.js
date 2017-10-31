import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

class Product extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    console.log(this.props)
    return (
      <div >
        <h1>Phones</h1>
      </div>
    );
  }

}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ products }) => ({ products });


export default connect(mapState)(Product);
