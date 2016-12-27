import 'whatwg-fetch';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';


/* Components */
import NavComponent from './components/Nav/Nav.js';
import TabFirstComponent from './components/TabFirst/index.js';

const routeConfig = [
    {
        path: '/',
        component: NavComponent,
        indexRoute: { component: TabFirstComponent },
        childRoutes: [
            {
                path: 'callSum',
                getComponents(location, callback) {
                    require.ensure([], function (require) {
                        callback(null, require('./components/TabSecond/index.js'))
                    }, 'secondChunk')
                }
            },
            {
                path: 'messages',
                getComponents(location, callback) {
                    require.ensure([], function (require) {
                        callback(null, require('./components/TabThird/index.js'))
                    }, 'thirdChunk')
                }
            },
            {
                path: 'status',
                getComponents(location, callback) {
                    require.ensure([], function (require) {
                        callback(null, require('./components/TabForth/index.js'))
                    }, 'forthChunk')
                }
            }
        ]
    }
]

ReactDOM.render(<Router routes={routeConfig} />, document.getElementById('wrap'))


