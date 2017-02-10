import { call, put, select } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import { SEARCH } from '../constants'
//import { sendCall, warnOnNetworkError, createAction } from '../utils'

const searchEffects = {

    simple: function*(action) {
        hashHistory.push(`/search/${action.value}`)
        
    },

    advanced: function*(action) {
        hashHistory.push(`/advanced-search/${action.params.query}/${page}`)
    }

}

export default searchEffects

