import 'babel-polyfill'

window.onunhandledrejection = (e) => {
    if ('reason' in e) {
        throw e.reason
    }
}

import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, IndexRedirect, Route, browserHistory } from 'react-router'

import App from './App/components/App'
import Slide from '~/Slide/components/Slide'

import './styles.scss'

class NotFound extends Component {
    render() {
        return <h1>404: Error Not Found</h1>
    }
}

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="slide/1/" />

            <Route path="slide/:ordering" component={Slide} />

            <Route path="*" component={NotFound} />
        </Route>
    </Router>
, document.getElementById('app'))
