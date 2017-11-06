import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { spy } from 'sinon'
import { OrderDetail } from './past-order-detail'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('PastOrderDetail component', () => {

  let pastOrderDetail

  let fakeProps = {
    user: { id: 1 },
    fetchOrder: spy(),
    order: {
      id: 2,
      products: [
        {
          productOrders: { quantity: 1 },
          price: 11.00
        },
        {
          productOrders: { quantity: 2 },
          price: 10.00
        }
      ]
    },
    match: { params: 3 }
  }

  beforeEach(() => {
    pastOrderDetail = shallow(<OrderDetail {...fakeProps} />)
  })

  it('should calculate the correct order total', () => {
    expect(pastOrderDetail.find('li').last().text()).to.be.equal('Order Total: $31.00');
  })


})


describe('PastOrderDetail admin functionality', () => {

  let pastOrderDetailAdmin;
  let pastOrderDetailNonAdmin;

  let fakePropsAdmin = {
    user: { id: 1, isAdmin: true },
    fetchOrder: spy(),
    order: {
      id: 2,
      products: [
        {
          productOrders: { quantity: 1 },
          price: 11.00
        },
        {
          productOrders: { quantity: 2 },
          price: 10.00
        }
      ]
    },
    match: { params: 3 }
  }

  let fakePropsNonAdmin = {
    user: { id: 1, isAdmin: false },
    fetchOrder: spy(),
    order: {
      id: 2,
      products: [
        {
          productOrders: { quantity: 1 },
          price: 11.00
        },
        {
          productOrders: { quantity: 2 },
          price: 10.00
        }
      ]
    },
    match: { params: 3 }
  }

  beforeEach(() => {
    pastOrderDetailAdmin = shallow(<OrderDetail {...fakePropsAdmin} />)
    pastOrderDetailNonAdmin = shallow(<OrderDetail {...fakePropsNonAdmin} />)
  })

  it('should only allow admin users to update order status', () => {
    expect(pastOrderDetailAdmin.find('select')).to.have.length(1)
    expect(pastOrderDetailNonAdmin.find('select')).to.have.length(0)
  })


})

