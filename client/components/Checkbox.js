import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
    handleCheckboxChange(label[0]);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label[0]}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          {label[1]}
        </label>
      </div>
    );
  }
}

export default Checkbox;
