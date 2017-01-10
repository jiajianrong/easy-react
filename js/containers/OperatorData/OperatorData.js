import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';
import './OperatorData.css';
import Nav from '../../components_common/Nav';


const ROUTE_ARR = [
    { route: '/callDetail', title: '通话详情'    },
    { route: '/callSum',    title: '通话数据分析' },
    { route: '/messages',   title: '短信详单'    },
    { route: '/status',     title: '用户行为检测' }
];


class OperatorData extends Component {
    
    constructor(props) {
        super(props);
    }
    
    
    render() {
        return (
            <section className="container-OperatorData">
                <Nav routes={ROUTE_ARR}/>
                
                <div className="tab-content">
                    {/*this.props.children*/}
                    {React.cloneElement(this.props.children, {siteData: 111})}
                </div>
            </section>
        )
    }
}

export default OperatorData;