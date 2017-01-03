import React, { Component, PropTypes } from 'react';


const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;


class OperatorDataMsg extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 10,
            view: STATUS_LOADING
        };
    }
    
    
    componentDidMount() {
        // remote fetch
        setTimeout( () => {
            this.setState({ view: STATUS_NORMAL })
        }, 400 )
    }
    
    
    render() {
        
        let _rtn;
        
        if (this.state.view==STATUS_LOADING)
            _rtn = <section className="loading"> loading... </section>
        
        else if (this.state.view==STATUS_NO_DATA)
            _rtn = <section className="no-data"> 该客户未授权,无信息  </section>
            
        else if (this.state.view==STATUS_NORMAL)
        
            _rtn = (
                <div className="tab-pane fade in active">
                    <table className="table table-hover table-bordered table-striped">
                        <caption>基本的表格布局</caption>
                        <thead>
                            <tr>
                                <th>名称3333</th>
                                <th>城市333</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Tanmay</td>
                                <td>Bangalore</td>
                            </tr>
                            <tr>
                                <td>Sachin</td>
                                <td>Mumbai</td>
                            </tr>
                            <tr>
                                <td>Tanmay</td>
                                <td>Bangalore</td>
                            </tr>
                            <tr>
                                <td>Sachin</td>
                                <td>Mumbai</td>
                            </tr><tr>
                                <td>Tanmay</td>
                                <td>Bangalore</td>
                            </tr>
                            <tr>
                                <td>Sachin</td>
                                <td>Mumbai</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
            
        return _rtn;
    }
}

export default OperatorDataMsg;