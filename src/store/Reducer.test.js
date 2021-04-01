import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import reducer from './reducer';
import * as actionsTypes from './actions/actionsTypes';


configure({adapter: new Adapter()});

describe('Authenticate', () => {
    it('should render Login button if not authenticated', () => {
        expect(reducer(undefined, {})).toEqual({
            auth: false,
            userName: null,
            userEmail: null,
            error: null
        })
    })

    it('should render an error if there is a mistake by user', () => {
        expect(reducer({
            auth: false,
            userName: null,
            userEmail: null,
            error: null
        }, {
            type: actionsTypes.ERRORS,
            error: 'some error'
        }))
    })

    it('should save the user details', () => {
        expect(reducer({
            auth: false,
            userName: null,
            userEmail: null,
            error: null
        }, {
            type: actionsTypes.USER_DETAILS,
            userName: 'Usman Badar',
            userEmail: 'usman.umer0335@Gmail.com',
        }))
    })
})
