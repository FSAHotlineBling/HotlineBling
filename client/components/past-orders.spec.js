import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { spy } from 'sinon'
import { PastOrders } from './past-orders'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('PastOrders component', () => {

  let pastOrders

  let fakeProps = {
    pastOrders: [{id: 1, dateCreated: '', status: '', total: ''}, {id: 1, dateCreated: '', status: '', total: ''}],
    fetchUserOrders: () => {},
    user: {isAdmin: true},
    userId: 1
  }

  beforeEach(() => {
    pastOrders = shallow(<PastOrders {...fakeProps} />)
  })

  it('should list each of the user\'s past orders', () => {
    expect(pastOrders.find('ul').first().children().length).to.be.equal(2);
  })
})
