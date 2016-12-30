import React, { Component, PropTypes } from 'react';
class OperatorDataCallDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 10
        };
    }
    
    render() {
        return(
        <div className="tab-pane fade in active">
            <table className="table table-hover table-bordered table-striped">
                <caption>基本的表格布局</caption>
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>城市</th>
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
        );
    }
}

export default OperatorDataCallDetail;