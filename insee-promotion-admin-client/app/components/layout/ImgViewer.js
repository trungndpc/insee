import React, { Component } from 'react'
import { ImageStatus, APPROVED, REJECTED, WAITING_APPROVAL } from '../enum/ImageStatus'
import ImageModel from '../../model/ImageModel'

const MODE_PREVIEW = 1
const MODE_APPROVAL = 2
class ImgViewer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: '',
            isShow: false,
            item: null,
            mode: 1,
            type: null,
            isChecked: false
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.reject = this.reject.bind(this)
        this.approval = this.approval.bind(this)
    }

    open(item, type) {
        this.setState({ isShow: true, url: item.link, item: item, mode: MODE_PREVIEW, type: type })
        document.body.style.overflow = 'hidden';
    }

    close() {
        document.body.style.overflow = 'initial';
        this.setState({ isShow: false })
    }

    reject() {
        let data = {};
        data.id = this.state.item.id;
        this.billIdRef && (data.labelId = this.billIdRef.value);
        this.weighRef && (data.volumeCiment = this.weighRef.value);
        data.type = this.state.type;
        data.status = REJECTED.getStatus();
        ImageModel.updateStatus(data)
            .then(resp => {
                this.close()
                this.props.appActions.getConstruction(this.props.constructionId)
            })
    }

    approval() {
        let data = {};
        data.id = this.state.item.id;
        this.billIdRef && (data.labelId = this.billIdRef.value);
        this.weighRef && (data.volumeCiment = this.weighRef.value);
        data.type = this.state.type;
        data.status = APPROVED.getStatus();
        ImageModel.updateStatus(data)
            .then(resp => {
                this.close()
                this.props.appActions.getConstruction(this.props.constructionId)
            })
    }

    render() {
        return (
            <div style={{ display: this.state.isShow ? 'block' : 'none' }} className="img-view-container">
                <span onClick={this.close} className="btn-close">X</span>
                <table id="wrapper">
                    <tbody>
                        <tr>
                            {this.state.mode == MODE_PREVIEW && <td>
                                <img src={this.state.url} />
                                {this.state.item && <p>{this.state.item.id} - Trang thái: <span style={{ color: ImageStatus.getColor(this.state.item.status) }}>{ImageStatus.getName(this.state.item.status)}</span></p>}
                                {this.state.item && this.state.item.status == WAITING_APPROVAL.getStatus() && <button onClick={() => this.setState({ mode: MODE_APPROVAL })} type="button" className="mtr-btn"><span>Duyệt</span></button>}
                            </td>
                            }
                            {this.state.mode == MODE_APPROVAL &&
                                <td>
                                    <div style={{ width: '600px' }} className="central-meta">
                                        <div className="onoff-options">
                                            <h5 style={{ textAlign: 'left' }} className="f-title"><i className="ti-settings" />Duyệt</h5>
                                            <div method="post">
                                                <div className="setting-row">
                                                    <span>Bạn có chắc?</span>
                                                    <p>Đã đủ tiêu chí của chương trình</p>
                                                </div>
                                                {this.state.type == 1 &&
                                                    <div className="setting-row">
                                                        <p>Định danh</p>
                                                        <input ref={e => this.billIdRef = e} className="input-lable" type="text" />
                                                    </div>
                                                }
                                                {this.state.type == 1 &&
                                                    <div className="setting-row">
                                                        <p>Khố lượng xi măng (kg)</p>
                                                        <input ref={e => this.weighRef = e} className="input-lable" type="number" />
                                                    </div>
                                                }
                                                <div className="submit-btns">
                                                    <button onClick={() => this.setState({ mode: MODE_PREVIEW })} style={{ color: '#bfbfbf' }} type="button" className="mtr-btn"><span>Xem lại</span></button>
                                                    <button onClick={this.reject} style={{ marginLeft: '30px' }} style={{ color: 'red', margin: '0 20px' }} type="button" className="mtr-btn"><span>Từ chối</span></button>
                                                    <button onClick={this.approval} style={{ marginLeft: '30px' }} type="button" className="mtr-btn"><span>Chấp nhận</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ImgViewer
