import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';

class App extends Component {
    render() {
        return(
            <section className = "app_cpt">
                
                <ul className = "nav nav-tabs">
                    <li className="active"><Link to="/">通话详情</Link></li>
                    <li><Link to="/callSum">通话数据分析</Link></li>
                    <li><Link to="/messages">短信详单</Link></li>
                    <li><Link to="/status">用户行为检测</Link></li>
                </ul>
                {/*
                <ul id="myTab" className="nav nav-tabs">
                    <li className="active"><a href="#home" data-toggle="tab">菜鸟教程</a></li>
                    <li><a href="#ios" data-toggle="tab">iOS</a></li>
                </ul>
                */}
                
                <div class="tab-content">
                    {this.props.children}
                </div>
            </section>
        );
    }
}

export default App;