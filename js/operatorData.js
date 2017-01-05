import 'whatwg-fetch';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'


/* Components */
import OperatorData           from './containers/OperatorData';
import OperatorDataCallDetail from './components/OperatorDataCallDetail';
import OperatorDataCallSum    from './components/OperatorDataCallSum';
import OperatorDataMsg        from './components/OperatorDataMsg';
import OperatorDataStatus     from './components/OperatorDataStatus';

//const routeConfig = [
//  {
//      path: '/',
//      component: OperatorData,
//      indexRoute: { component: OperatorDataCallDetail },
//      childRoutes: [
//          /*{
//              path: ':id',
//              component: OperatorDataCallDetail
//          },*/
//          {
//              path: 'callSum',
//              onEnter: function(){},
//              getComponents(location, callback) {
//                  require.ensure([], function (require) {
//                      callback(null, require('./components/OperatorDataCallSum'))
//                  }, 'secondChunk')
//              }
//          },
//          {
//              path: 'messages',
//              getComponents(location, callback) {
//                  require.ensure([], function (require) {
//                      callback(null, require('./components/OperatorDataMsg'))
//                  }, 'thirdChunk')
//              }
//          },
//          {
//              path: 'status',
//              getComponents(location, callback) {
//                  require.ensure([], function (require) {
//                      callback(null, require('./components/OperatorDataStatus'))
//                  }, 'forthChunk')
//              }
//          }
//      ]
//  }
//]
//
//ReactDOM.render(<Router routes={routeConfig} />, document.getElementById('wrap'))


render((
  <Router history={hashHistory}>
      <Route path="/" component={OperatorData}>
          
          <IndexRedirect to="/callDetail" />
          
          <Route path="callDetail" component={OperatorDataCallDetail}>
              // <Route path=":page" component={OperatorDataCallDetail}></Route>
          </Route>
          
          <Route path="callSum" component={OperatorDataCallSum}>
              
          </Route>
          
          <Route path="messages" component={OperatorDataMsg}>
              
          </Route>
          
          <Route path="status" component={OperatorDataStatus}>
              
          </Route>
          
      </Route>
  </Router>
), document.getElementById('wrap'))