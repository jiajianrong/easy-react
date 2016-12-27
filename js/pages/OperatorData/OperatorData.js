import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';
import './OperatorData.css';


class OperatorData extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            actIdx: 1
        };
    }
    
    
    render() {
        return(
            <section className="OperatorData-P">
                
                <ul className="nav nav-tabs">
                    <li onClick={this.handleClick.bind(this, 1)} className={ this.state.actIdx==1 ? 'active': '' }>
                        <Link to="/">通话详情</Link>
                    </li>
                    <li onClick={this.handleClick.bind(this, 2)} className={ this.state.actIdx==2 ? 'active': '' }>
                        <Link to="/callSum">通话数据分析</Link>
                    </li>
                    <li onClick={this.handleClick.bind(this, 3)} className={ this.state.actIdx==3 ? 'active': '' }>
                        <Link to="/messages">短信详单</Link>
                    </li>
                    <li onClick={this.handleClick.bind(this, 4)} className={ this.state.actIdx==4 ? 'active': '' }>
                        <Link to="/status">用户行为检测</Link>
                    </li>
                </ul>
                
                <div className="tab-content">
                    {this.props.children}
                </div>
            </section>
        );
    }
    
    
    handleClick(actIdx) {
        this.setState({ actIdx: actIdx })
    }
}

export default OperatorData;