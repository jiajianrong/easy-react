import React, { Component, PropTypes } from 'react';
import Grid from '../../components_common/Grid';
import 'whatwg-fetch';
import { formatUrl, fetchJson } from '../../utils';

const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;


const GRID_TITLE = "通话数据分析";
const GRID_HEAD = [ '通话号码', '号码标注', '需求类别', '归属地' , '通话次数' , '呼入次数' , '呼出次数', '最近一周联系次数', '最近一月联系次数', '最近三个月联系次数', '是否全天联系', '关系推测' ];
const GRID_HEAD_KEY = [ 'phoneNum', 'contractName', 'needsType', 'userAttribution', 'callCount', 'callInCount', 'callOutCount', 'contactOneWeek', 'contactOneMonth', 'contactThreeMonth', 'contactAllDay', 'relationSpeculate' ];

const USER_ID = location.search.match(/userId=([^&#$]*)/)[1];


class OperatorDataCallSum extends Component {
    
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
     * /jxl/phone/call/analy/list?userId=223&page=1&count=15
     */
    removeFetch(_page=this.state.page, _size=this.state.size) {
        
        fetchJson('/jxl/phone/call/analy/list', {
            userId: USER_ID,
            page: _page,
            count: _size
        })
        .then( json => {
            if ( !json || !json.data || !json.data.length ) {
                this.setState({ view: STATUS_NO_DATA });
                return;
            }
            this.setState({ 
                view: STATUS_NORMAL,
                page: _page,
                size: _size,
                total: json.total,
                data: json.data
            })
        })
        .catch( e => console.log(e) );
        
        /*setTimeout( () => {
            this.setState({ 
                view: STATUS_NORMAL,
                
                page: _page,
                size: _size,
                total: Math.floor(Math.random()*80)+20,
                data: [
                       { "phoneNum": "13312345678", "contractName": "未知", "needsType": "13312345678", 
                         "userAttribution": "北京", "callCount": "5", "callInCount": "4", "callOutCount": "1",
                         "contactOneWeek": "6", "contactOneMonth": "12", "contactThreeMonth": "18",
                         "contactAllDay": "否", "relationSpeculate": "亲属" }
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

export default OperatorDataCallSum;