import React, { Component, PropTypes } from 'react';
import Grid from '../../components_common/Grid';
import 'whatwg-fetch';
import { formatUrl, fetchJson } from '../../utils';

const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;


const GRID_TITLE = "通话详情";
const GRID_HEAD = [ '对方手机号码', '通话地点', '通话起始时间', '通话时长' , '通话类型' , '主叫/被叫' , '通话费用' ];
const GRID_HEAD_KEY = [ 'callPhone', 'callAddress', 'callTime', 'callDuration', 'callType', 'callStyle', 'callCost' ];

const USER_ID = location.search.match(/userId=([^&#$]*)/)[1];


class OperatorDataCallDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            view: STATUS_LOADING,
            page: 1,
            size: 10
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
    
    
    /*
     * /jxl/phone/call/log/list?userId=223&page=1&count=15
     */
    removeFetch(_page=this.state.page, _size=this.state.size) {
        
        fetchJson('/jxl/phone/call/log/list', {
            userId: USER_ID,
            page: _page,
            count: _size
        })
        .then( json => {
            if ( !json || !json.data || !json.data.length ) {
                this.setState({ view: STATUS_NO_DATA });
                return;
            }
            
            /*
             * format
             */
            this.formatData(json.data);
            
            this.setState({ 
                view: STATUS_NORMAL,
                page: _page,
                size: _size,
                total: json.total,
                data: json.data
            })
        })
        .catch( e => console.log(e) );
        
        /*
        setTimeout( () => {
            this.setState({ 
                view: STATUS_NORMAL,
                
                page: _page,
                size: _size,
                total: Math.floor(Math.random()*80)+20,
                data: [{ "callPhone": "13312345678", "callAddress": "北京", "callTime": "1456828210000", 
                         "callDuration": "50", "callType": "长途", "callStyle": "1", "callCost": "1.2" },
                ]
            })
        }, 400 )*/
    }
    
    
    formatData(data) {
        data.forEach( item => {
            item.callTime = new Date(+item.callTime).format('{y}年{M}月{d}日 {H}:{m}:{s}');
            item.callDuration = +item.callDuration>=60 ? 
                ( Math.floor(+item.callDuration/60) + '分' + +item.callDuration%60 + '秒' ) :
                ( item.callDuration + '秒' );
            item.callStyle = item.callStyle == 1 ? '主叫' : '被叫';
            item.callCost = item.callCost + '元';
        } )
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