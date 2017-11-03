// /* global describe beforeEach it */


import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Product} from './Product'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Product', () => {
  let product = {
    name: 'Cool phone',
    quantityAvailable: 3
  }
  
  let productComponent;

  beforeEach(() => {
    productComponent = shallow(<Product product={product} />)
  })

  it('renders the phones name in an h4', () => {
    expect(productComponent.find('span').first().text()).to.be.equal('Cool phone')
  })
})
