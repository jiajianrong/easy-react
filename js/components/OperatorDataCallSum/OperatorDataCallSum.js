import React, { Component, PropTypes } from 'react';
import Grid from '../../components_common/Grid';

const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;


class OperatorDataCallSum extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            view: STATUS_LOADING,
            page: 1,
            size: 20,
            head: [ '通话号码', '号码标注', '需求类别', '归属地' , '通话次数' , '呼入次数' , '呼出次数', '最近一周联系次数', '最近一月联系次数', '最近三个月联系次数', '是否全天联系', '关系推测' ],
            headId: [ 'phone_num', 'contract_name', 'needs_type', 'user_attribution', 'call_count', 'call_in_count', 'call_out_count', 'contact_one_week', 'contact_one_month', 'contact_three_month', 'contact_all_day', 'relation_speculate' ]
        };
    }
    
    
    componentDidMount() {
        let _page = this.props.params.id;
        this.removeFetch(_page);
    }
    
    
    /*componentWillReceiveProps(nextProps) {
        let beforeId = this.props.params.id,
            nowId = nextProps.params.id;
        console.log('will.receive.props',beforeId,nowId)
        this.removeFetch(nowId);
    }*/
    
    
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
                data: [{ phone_num: '13312345678', contract_name: '未知', needs_type: '13312345678', 
                         user_attribution: '北京'+Math.random(), call_count: '5', call_in_count: '4', call_out_count: '1',
                         contact_one_week: '6', contact_one_month: '12', contact_three_month: '18',
                         contact_all_day: '否', relation_speculate: '亲属' },
                       { phone_num: '13312345678', contract_name: '未知', needs_type: '13312345678', 
                         user_attribution: '北京'+Math.random(), call_count: '5', call_in_count: '4', call_out_count: '1',
                         contact_one_week: '6', contact_one_month: '12', contact_three_month: '18',
                         contact_all_day: '否', relation_speculate: '亲属' },
                       { phone_num: '13312345678', contract_name: '未知', needs_type: '13312345678', 
                         user_attribution: '北京'+Math.random(), call_count: '5', call_in_count: '4', call_out_count: '1',
                         contact_one_week: '6', contact_one_month: '12', contact_three_month: '18',
                         contact_all_day: '否', relation_speculate: '亲属' },
                       { phone_num: '13312345678', contract_name: '未知', needs_type: '13312345678', 
                         user_attribution: '北京'+Math.random(), call_count: '5', call_in_count: '4', call_out_count: '1',
                         contact_one_week: '6', contact_one_month: '12', contact_three_month: '18',
                         contact_all_day: '否', relation_speculate: '亲属' },
                       { phone_num: '13312345678', contract_name: '未知', needs_type: '13312345678', 
                         user_attribution: '北京'+Math.random(), call_count: '5', call_in_count: '4', call_out_count: '1',
                         contact_one_week: '6', contact_one_month: '12', contact_three_month: '18',
                         contact_all_day: '否', relation_speculate: '亲属' }
                       
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

export default OperatorDataCallSum;