import React, { Component, PropTypes } from 'react';
import Grid from '../../components_common/Grid';

const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;


const GRID_TITLE = "通话详情";
const GRID_HEAD = [ '对方手机号码', '通话地点', '通话起始时间', '通话时长' , '通话类型' , '主叫/被叫' , '通话费用' ];
const GRID_HEAD_KEY = [ 'call_phone', 'call_address', 'call_time', 'call_duration', 'call_type', 'call_style', 'call_cost' ];


class OperatorDataCallDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            view: STATUS_LOADING,
            page: 1,
            size: 20
        };
    }
    
    
    componentDidMount() {
        let _page = this.props.params.page;
        this.removeFetch(_page);
    }
    
    
    componentWillReceiveProps(nextProps) {
        let _prevPage = this.props.params.page,
            _currPage = nextProps.params.page;
        console.log('will.receive.props',_prevPage,_currPage)
        this.removeFetch(_currPage);
    }
    
    
    onPage(_page, _size) {
        this.removeFetch(_page, _size);
    }
    
    
    removeFetch(_page=this.state.page, _size=this.state.size) {
        // /jxl/phone/call/log/list
        // userId, start(start page), end(row count)
        setTimeout( () => {
            this.setState({ 
                view: STATUS_NORMAL,
                
                page: _page,
                size: _size,
                total: Math.floor(Math.random()*80)+20,
                data: [{ call_phone: '13312345678', call_address: '北京'+Math.random(),
                         call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京'+Math.random(),
                         call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京'+Math.random(),
                         call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京'+Math.random(),
                         call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' },
                       { call_phone: '13312345678', call_address: '北京'+Math.random(),
                         call_time: '昨天', call_duration: '5分钟', call_type: '长途', call_style: '主叫', call_cost: '12元' }
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
                    <Grid title={GRID_TITLE} head={GRID_HEAD} headKey={GRID_HEAD_KEY}
                          total={this.state.total} page={this.state.page} size={this.state.size}
                          data={this.state.data} pageHandler={this.onPage.bind(this)} />
                </div>
            )
            
        return _rtn;
    }
}

export default OperatorDataCallDetail;