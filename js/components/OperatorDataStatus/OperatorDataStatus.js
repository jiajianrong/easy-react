import React, { Component, PropTypes } from 'react';

const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;


class OperatorDataStatus extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            view: STATUS_LOADING,
            page: 1,
            size: 20
        };
    }
    
    
    componentDidMount() {
        this.removeFetch();
    }
    
    
    removeFetch() {
        // /jxl/phone/call/report/data
        // userId
        setTimeout( ()=>{
            this.setState({
                view: STATUS_NORMAL,
                data: {
                    friend_circle: '北京',
                    use_time: '长期使用',
                    contact_amount: '数量正常',
                    call_macao: '无通话记录',
                    call_110: '无通话记录',
                    call_120: '无通话记录',
                    call_lawyer: '无通话记录',
                    call_court: '无通话记录',
                    night_use: '很少',
                    call_loan: '很少',
                    call_bank: '很少',
                    call_credit: '无通话记录'
                }
            })
        }, 500 )
    }
    
    
    render() {
        let _rtn;
        let _data = this.state.data;
        
        if (this.state.view==STATUS_LOADING)
            _rtn = <section className="loading"> loading... </section>
        
        else if (this.state.view==STATUS_NO_DATA)
            _rtn = <section className="no-data"> 该客户未授权,无信息  </section>
            
        else if (this.state.view==STATUS_NORMAL)
            _rtn = (
                <div className="tab-pane fade in active">
                    <div className="Grid-C">
                        <table className="table table-hover table-bordered table-striped">
                            <thead><td>检查项</td><td>结果</td></thead>
                            <tbody>
                                <tr><td>朋友圈在哪里</td>         <td>{_data.friend_circle}</td></tr>
                                <tr><td>号码使用时间</td>         <td>{_data.use_time}</td></tr>
                                <tr><td>互通电话的号码数量</td>     <td>{_data.contact_amount}</td></tr>
                                <tr><td>澳门通话情况</td>         <td>{_data.call_macao}</td></tr>
                                <tr><td>110通话情况</td>         <td>{_data.call_110}</td></tr>
                                <tr><td>120通话情况</td>         <td>{_data.call_120}</td></tr>
                                <tr><td>律师通话情况</td>         <td>{_data.call_lawyer}</td></tr>
                                <tr><td>法院通话情况</td>         <td>{_data.call_court}</td></tr>
                                <tr><td>夜间(23点-6点)使用情况</td><td>{_data.night_use}</td></tr>
                                <tr><td>贷款类号码联系情况</td>     <td>{_data.call_loan}</td></tr>
                                <tr><td>银行类号码联系情况</td>     <td>{_data.call_bank}</td></tr>
                                <tr><td>信用卡类号码联系情况</td>    <td>{_data.call_credit}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
            
        return _rtn;
    }
}

export default OperatorDataStatus