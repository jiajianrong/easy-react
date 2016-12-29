import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';
import './OperatorData.css';
import Nav from '../../components_common/Nav';


const ROUTE_ARR = [
    { route: '/',         title: '通话详情'    },
    { route: '/callSum',  title: '通话数据分析' },
    { route: '/messages', title: '短信详单'    },
    { route: '/status',   title: '用户行为检测' }
];


const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;



class OperatorData extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            /* 页面：加载中；正常显示；无数据 */
            view: STATUS_LOADING
        };
    }
    
    
    componentDidMount() {
        // remote fetch
        setTimeout( () => {
            this.setState({ view: STATUS_NORMAL })
        }, 1000 )
    }
    
    
    render() {
        let rtn;
        
        if (this.state.view==STATUS_LOADING)
            rtn = <section className="loading"> loading... </section>
            
        else if (this.state.view==STATUS_NO_DATA)
            rtn = <section className="no-data"> 该客户未授权,无信息  </section>
            
        else if (this.state.view==STATUS_NORMAL)
            rtn = 
            <section className="OperatorData-P">
                <Nav routes={ROUTE_ARR} />
                
                <div className="tab-content">
                    {this.props.children}
                </div>
            </section>
            
        return rtn;
    }
}

export default OperatorData;