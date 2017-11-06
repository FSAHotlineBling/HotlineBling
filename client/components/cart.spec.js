/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { spy } from 'sinon'
import {Cart} from './cart'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('Cart', () => {
  let fakeProps = {
    orderId: '3',
    products: [{
      name: 'Iphone',
      price: '$300.00',
      quanitityAvailable: 2
    }],
    fetchCartOrders: spy(),
    removeItem: spy()
  }
  let newCart;
  beforeEach(() => {
    newCart = shallow(<Cart {...fakeProps} />);
  });

  it('renders the correct name', () => {
    expect(newCart.text()).to.contain('Iphone')
  })

  it('does not render the wrong name', () => {
    expect(newCart.text()).to.not.contain('Different phone')
  })
})