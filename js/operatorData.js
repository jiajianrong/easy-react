import 'whatwg-fetch';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';


/* Components */
import OperatorData from './containers/OperatorData';
import OperatorDataCallDetail from './components/OperatorDataCallDetail';

const routeConfig = [
    {
        path: '/',
        component: OperatorData,
        indexRoute: { component: OperatorDataCallDetail },
        childRoutes: [
            /*{
                path: ':id',
                component: OperatorDataCallDetail
            },*/
            {
                path: 'callSum',
                onEnter: function(){},
                getComponents(location, callback) {
                    require.ensure([], function (require) {
                        callback(null, require('./components/OperatorDataCallSum'))
                    }, 'secondChunk')
                }
            },
            {
                path: 'messages',
                getComponents(location, callback) {
                    require.ensure([], function (require) {
                        callback(null, require('./components/OperatorDataMsg'))
                    }, 'thirdChunk')
                }
            },
            {
                path: 'status',
                getComponents(location, callback) {
                    require.ensure([], function (require) {
                        callback(null, require('./components/OperatorDataStatus'))
                    }, 'forthChunk')
                }
            }
        ]
    }
]

ReactDOM.render(<Router routes={routeConfig} />, document.getElementById('wrap'))


