import React, { Component, PropTypes } from 'react';
import Grid from '../../components_common/Grid';

const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;


class OperatorDataCallDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            view: STATUS_LOADING,
            
            page: 1,
            size: 10,
            title: '通话详单',
            head: [ '对方手机号码', '通话地点', '通话起始时间', '通话时长' , '通话类型' , '主叫/被叫' , '通话费用' ],
            headId: [ 'call_phone', 'call_address', 'call_time', 'call_duration', 'call_type', 'call_style', 'call_cost' ],
            data: [{ call_phone: '13312345678', call_address: '北京', call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                   { call_phone: '13312345678', call_address: '北京', call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                   { call_phone: '13312345678', call_address: '北京', call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                   { call_phone: '13312345678', call_address: '北京', call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                   { call_phone: '13312345678', call_address: '北京', call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' }
            ]
        };
    }
    
    
    componentDidMount() {
        // remote fetch
        setTimeout( () => {
            this.setState({ 
                view: STATUS_NORMAL,
                
                page: 1,
                size: 10,
                total: 101,
                head: [ '对方手机号码', '通话地点', '通话起始时间', '通话时长' , '通话类型' , '主叫/被叫' , '通话费用' ],
                headId: [ 'call_phone', 'call_address', 'call_time', 'call_duration', 'call_type', 'call_style', 'call_cost' ],
                data: [{ call_phone: '13312345678', call_address: '北京1', call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京2', call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京3', call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京4', call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京5', call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' }
                ]
            })
        }, 400 )
        
    }
    
    
    onPage(_page, _size) {
        // remote fetch
        setTimeout( () => {
            this.setState({ 
                view: STATUS_NORMAL,
                
                page: _page,
                size: 10,
                total: 101,
                data: [{ call_phone: '13312345678', call_address: '北京1'+Math.random(), call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京2'+Math.random(), call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京3'+Math.random(), call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京4'+Math.random(), call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京5'+Math.random(), call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' }
                ]
            })
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
                    <Grid title={this.state.title} head={this.state.head} headId={this.state.headId}
                          total={this.state.total} page={this.state.page} size={this.state.size}
                          data={this.state.data} pageHandler={this.onPage.bind(this)} />
                </div>
            )
            
        return _rtn;
    }
}

export default OperatorDataCallDetail;