import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './Grid.css';


class Grid extends Component {
    
    constructor(props) {
        super(props);
    }
    
    
    renderRow(row) {
        return this.props.headId.map( item => 
            <td> {row[item]} </td> 
        )
    }
    
    
    makePaging() {
        let size = this.props.size,
            total = this.props.total,
            maxPage = Math.ceil(total/size);
        
        let arr = [];
        for (let i=1; i<=maxPage; i++) {
            arr.push(i);
        }
        return arr;
    }
    
    
    renderPaging() {
        let arr = this.makePaging();
        let max = arr.length;
        let page = this.props.page;
        
        arr = arr.map( i => {
            //<li className={i==page?"active":""}><Link to={`/${i}`} onClick={()=>this.clickHandler(i)} >{i}</Link></li>
            return <li className={i==page?"active":""}><a href="javascript:;" onClick={()=>this.clickHandler(i)} >{i}</a></li>
        } )
        
        arr.push( <li><a href="javascript:;" onClick={()=>this.clickHandler(max)} >&raquo;</a></li> )
        arr.unshift( <li><a href="javascript:;" onClick={()=>this.clickHandler(1)}>&laquo;</a></li> )
        
        return arr;
    }
    
    
    clickHandler(page) {
        this.props.pageHandler(page);
    }
    
    
    render() {
        return (
            <div className="Grid-C">
                <table className="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                        {
                            this.props.head.map( item => 
                                <th> {item} </th> 
                            )
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map( item => 
                                <tr> {this.renderRow(item)} </tr>
                            )
                        }
                    </tbody>
                </table>
                
                <ul className="pagination">
                    {this.renderPaging()}
                </ul>
            </div>
        );
    }
}

export default Grid;