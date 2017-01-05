import React, { Component, PropTypes } from 'react';
import Grid from '../../components_common/Grid';

const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;


const GRID_TITLE = "短信详单";
const GRID_HEAD = [ '对方手机号码', '发送时间' ];
const GRID_HEAD_KEY = [ 'other_phone', 'send_time' ];


class OperatorDataMsg extends Component {
    
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
        
        setTimeout( () => {
            this.setState({ 
                view: STATUS_NORMAL,
                
                page: _page,
                size: _size,
                total: Math.floor(Math.random()*80)+20,
                data: [{ other_phone: '13312345678', send_time: '下午'+Math.random() },
                       { other_phone: '13312345678', send_time: '下午'+Math.random() },
                       { other_phone: '13312345678', send_time: '下午'+Math.random() },
                       { other_phone: '13312345678', send_time: '下午'+Math.random() },
                       { other_phone: '13312345678', send_time: '下午'+Math.random() },
                       { other_phone: '13312345678', send_time: '下午'+Math.random() },
                       { other_phone: '13312345678', send_time: '下午'+Math.random() }
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

export default OperatorDataMsg;