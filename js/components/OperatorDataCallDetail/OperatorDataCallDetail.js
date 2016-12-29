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
        OperatorDataCallDetail
        </div>
        );
    }
}

export default OperatorDataCallDetail;