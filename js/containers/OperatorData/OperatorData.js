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


class OperatorData extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            /* 页面：加载中；正常显示；无数据 */
            // view: STATUS_LOADING
        };
    }
    
    
    componentDidMount() {
        // remote fetch
        //setTimeout( () => {
            //this.setState({ view: STATUS_NORMAL })
        //}, 400 )
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