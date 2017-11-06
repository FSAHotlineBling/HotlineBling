import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { spy } from 'sinon'
import { PastOrders } from './past-orders'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('PastOrders component for non-admin users', () => {

  let pastOrders

  let fakeProps = {
    pastOrders: [
        {id: 1, dateCreated: '', status: '', total: ''},
        {id: 1, dateCreated: '', status: '', total: ''}
    ],
    fetchOrders: () => {},
    user: {isAdmin: false, id: 1},
    userId: 1
  }

  beforeEach(() => {
    pastOrders = shallow(<PastOrders {...fakeProps} />)
  })

  it('should list each of the user\'s past orders', () => {
    expect(pastOrders.find('ul').first().children().length).to.be.equal(2);
  })
})


describe('PastOrders component admin authentication', () => {

    let pastOrdersAdmin, pastOrdersNonAdmin

    let fakePropsAdmin = {
      pastOrders: [
          {id: 1, dateCreated: '', status: '', total: ''},
          {id: 1, dateCreated: '', status: '', total: ''}
      ],
      fetchOrders: () => {},
      user: {isAdmin: true, id: 1},
      userId: 'admin'
    }

    let fakePropsNonAdmin = {
      pastOrders: [
          {id: 1, dateCreated: '', status: '', total: ''},
          {id: 1, dateCreated: '', status: '', total: ''}
      ],
      fetchOrders: () => {},
      user: {isAdmin: false, id: 1},
      userId: 'admin'
    }

    beforeEach(() => {
      pastOrdersAdmin = shallow(<PastOrders {...fakePropsAdmin} />)
      pastOrdersNonAdmin = shallow(<PastOrders {...fakePropsNonAdmin} />)
    })

    it('should only display all orders with admin privileges', () => {
      expect(pastOrdersAdmin.find('ul').first().children().length).to.be.equal(2);
      expect(pastOrdersNonAdmin.find('ul').first().children().length).to.be.equal(0);
    })
  })
