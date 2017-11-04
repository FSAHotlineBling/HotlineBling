/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {NewReview} from './new-review'
import { spy } from 'sinon'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('NewReview', () => {
  let newReview
  let user = { name: 'John',
               email: 'jon@gmail.com',
               password: '123',
               salt: 'ND38ENjs8dnen90sdnSPO',
               userName: 'johnnn'}

let fakeProps = {
  postReview: spy(),
  user
}

  beforeEach(() => {
    newReview = shallow(<NewReview {...fakeProps} />)
  })

  it('triggers the postReview method when the form is submitted', () => {
    newReview.find('form').simulate('submit')
    let spy = fakeProps.postReview
    expect(spy.calledOnce).to.be.equal(true)
  })
})
