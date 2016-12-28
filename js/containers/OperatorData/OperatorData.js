import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';
import './OperatorData.css';
import Nav from '../../components_common/Nav/Nav.js'


const ROUTE_CALL_DETAIL = 1;
const ROUTE_CALL_SUM    = 2;
const ROUTE_MSG_DETAIL  = 3;
const ROUTE_USER_STATUS = 4;


const ROUTE_ARR = [
    { id: ROUTE_CALL_DETAIL, title: '通话详情' },
    { id: ROUTE_CALL_SUM,    title: '通话数据分析' },
    { id: ROUTE_MSG_DETAIL,  title: '短信详单' },
    { id: ROUTE_USER_STATUS, title: '用户行为检测' }
];


const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;



class OperatorData extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            actIdx: ROUTE_CALL_DETAIL,
            status: STATUS_LOADING /* 1-loading, 2-normal, 3-no_data */
        };
    }
    
    
    componentDidMount() {
        // remote fetch
        setTimeout( () => {
            this.setState({ status: STATUS_NORMAL })
        }, 2000 )
    }
    
    
    render() {
        let rtn;
        
        if (this.state.status==STATUS_LOADING)
            rtn = <section className="loading"> loading... </section>
            
        if (this.state.status==STATUS_NO_DATA)
            rtn = <section className="no-data"> 该客户未授权,无信息  </section>
            
        else if (this.state.status==STATUS_NORMAL)
            rtn = 
            <section className="OperatorData-P">
                <Nav routes={ROUTE_ARR} />
                <div className="tab-content">
                    {this.props.children}
                </div>
            </section>
            
        return rtn;
    }
    
    
    handleClick(actIdx) {
        this.setState({ actIdx: actIdx })
    }
}

export default OperatorData;