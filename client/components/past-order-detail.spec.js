import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { spy } from 'sinon'
import { OrderDetail } from './past-order-detail'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('PastOrderDetail component', () => {

  let pastOrderDetail

  let fakeProps = {
   user: {id: 1},
   fetchOrder: spy(),
   order: {id: 2,
           products: [
              {
                productOrders: {quantity: 1},
                price: 11.00
              },
              {
                productOrders: {quantity: 2},
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

