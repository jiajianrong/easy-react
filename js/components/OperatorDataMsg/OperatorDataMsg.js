import React, { Component, PropTypes } from 'react';
import Grid from '../../components_common/Grid';
import 'whatwg-fetch';
import { formatUrl, fetchJson, stringifyDate } from '../../utils';

const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;


const GRID_TITLE = "短信详单";
const GRID_HEAD = [ '对方手机号码', '发送时间' ];
const GRID_HEAD_KEY = [ 'otherPhone', 'sendTime' ];

const USER_ID = location.search.match(/userId=([^&#$]*)/);


class OperatorDataMsg extends Component {
    
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
    
    
    formatData (data) {
        data.forEach( item => {
            item.sendTime = stringifyDate( new Date(item.sendTime), '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}')
        } )
    }
    
    
    /*
     * /jxl/phone/sms/log/list?userId=223&page=1&count=15
     */
    removeFetch(_page=this.state.page, _size=this.state.size) {
        
        fetchJson('/jxl/phone/sms/log/list', {
            userId: USER_ID,
            page: _page,
            count: _size
        })
        .then( json => {
            if ( !json || !json.data ) {
                this.setState({ view: STATUS_NO_DATA });
                return;
            }
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
        
        /*$.ajax({
        	type: "get",
        	url: "/jxl/phone/sms/log/list",
        	cache: false,
            dataType: 'json',
            data: {
                userId: 1,
                page: 2,
                count: 20
            },
            success: function(data) {
                this.setState({ 
                    view: STATUS_NORMAL,
                    page: _page,
                    size: _size,
                    total: data.length,
                    data: data
                })
            }.bind(this),
            error: function() {
            },
            complete: function() {
            }
        })*/
        
        
        /*setTimeout( () => {
            this.setState({ 
                view: STATUS_NORMAL,
                
                page: _page,
                size: _size,
                total: Math.floor(Math.random()*80)+20,
                data: [{ otherPhone: '13312345678', sendTime: '下午'+Math.random() },
                       { otherPhone: '13312345678', sendTime: '下午'+Math.random() },
                       { otherPhone: '13312345678', sendTime: '下午'+Math.random() },
                       { otherPhone: '13312345678', sendTime: '下午'+Math.random() },
                       { otherPhone: '13312345678', sendTime: '下午'+Math.random() },
                       { otherPhone: '13312345678', sendTime: '下午'+Math.random() },
                       { otherPhone: '13312345678', sendTime: '下午'+Math.random() }
                ]
            })
        }, 400 )*/
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

export default OperatorDataMsg;