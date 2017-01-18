import React, { Component, PropTypes } from 'react';
import 'whatwg-fetch';
import { formatUrl, fetchJson } from '../../utils';

const STATUS_LOADING = 1;
const STATUS_NORMAL  = 2;
const STATUS_NO_DATA = 3;

const USER_ID = location.search.match(/userId=([^&#$]*)/);


class OperatorDataStatus extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            view: STATUS_LOADING
        };
    }
    
    
    componentDidMount() {
        this.removeFetch();
    }
    
    /*
     * /jxl/phone/call/report/data?userId=223
     */
    removeFetch() {
        
        fetchJson('/jxl/phone/call/report/data', {
            userId: USER_ID,
            page: 1,
            count: 10
        })
        .then( json => {
            if ( !json || !json.data ) {
                this.setState({ view: STATUS_NO_DATA });
                return;
            }
            this.setState({ 
                view: STATUS_NORMAL,
                data: json.data[0]
            })
        })
        .catch( e => console.log(e) );
        
        /*setTimeout( ()=>{
            this.setState({
                view: STATUS_NORMAL,
                data: {
                    friendCircle: '北京',
                    useTime: '长期使用',
                    contactAmount: '数量正常',
                    callMacao: '无通话记录',
                    call110: '无通话记录',
                    call120: '无通话记录',
                    callLawyer: '无通话记录',
                    callCourt: '无通话记录',
                    nightUse: '很少',
                    callLoan: '很少',
                    callBank: '很少',
                    callCredit: '无通话记录'
                }
            })
        }, 500 )*/
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
                                <tr><td>朋友圈在哪里</td>         <td>{_data.friendCircle}</td></tr>
                                <tr><td>号码使用时间</td>         <td>{_data.useTime}</td></tr>
                                <tr><td>互通电话的号码数量</td>     <td>{_data.contactAmount}</td></tr>
                                <tr><td>澳门通话情况</td>         <td>{_data.callMacao}</td></tr>
                                <tr><td>110通话情况</td>         <td>{_data.call110}</td></tr>
                                <tr><td>120通话情况</td>         <td>{_data.call120}</td></tr>
                                <tr><td>律师通话情况</td>         <td>{_data.callLawyer}</td></tr>
                                <tr><td>法院通话情况</td>         <td>{_data.callCourt}</td></tr>
                                <tr><td>夜间(23点-6点)使用情况</td><td>{_data.nightUse}</td></tr>
                                <tr><td>贷款类号码联系情况</td>     <td>{_data.callLoan}</td></tr>
                                <tr><td>银行类号码联系情况</td>     <td>{_data.callBank}</td></tr>
                                <tr><td>信用卡类号码联系情况</td>    <td>{_data.callCredit}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
            
        return _rtn;
    }
}

export default OperatorDataStatus