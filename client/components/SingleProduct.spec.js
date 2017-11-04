import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './SingleProduct'
import { spy } from 'sinon'

const adapter = new Adapter()
enzyme.configure({adapter})

// describe('SingleProduct component', () => {
//   let singleProductComponent

//   let fakeProps = {
//     user: {name: 'Cody', isAdmin: true},
//     products: [{name: 'Motorola'}],
//     handleDelete: spy()
//   }

//   beforeEach(() => {
//     singleProductComponent = shallow(<SingleProduct {...fakeProps} />)
//   })

//   it('should call handleSubmit on submit', () => {
//     authFormComponent.find('button').simulate('onClick');
//     let spy = fakeProps.handleDelete
//     expect(spy.calledOnce).to.be.equal(true);
//   })
// })