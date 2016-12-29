import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, IndexLink } from 'react-router';
import './Nav.css';



class Nav extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            /* 页面正常显示下的路由index */
            //actIdx: 1
        };
    }
    
    
    
    render() {
        return(
            <ul className="nav nav-tabs">
            {
                this.props.routes.map( item => {
                    return (
                    <li> {/*onClick={this.handleClick.bind(this, item.id)} className={ this.state.actIdx==item.id ? 'active': '' } */}
                        <IndexLink to={item.route}  activeClassName='active' >{item.title}</IndexLink>
                    </li> )
                } )
                
            }
            </ul>
        );
    }
    
    
    
    handleClick(actIdx) {
        //this.setState({ actIdx: actIdx })
    }
}

export default Nav;