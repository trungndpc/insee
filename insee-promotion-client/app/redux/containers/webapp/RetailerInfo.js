import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import { CustomerStatus } from '../../../components/enum/CustomerStatus'
import { ContentSideBar } from '../../../components/layout/SideBar'
import UploadFileUtil from '../../../utils/UploadFileUtil'

class RetailerInfo extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }



    render() {
        const user = this.props.app.user;
        const contractor = user && user.customer;
        return (
            <div>
                <FormUploadRealtimeImage />
                <WebAppLayout {...this.props}>
                    <section>
                        <div className="gap gray-bg">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row merged20" id="page-contents">
                                            <div className="col-lg-3">
                                                <aside className="sidebar static">
                                                    <div className="widget">
                                                        <h4 className="widget-title">Thông tin</h4>
                                                        <ContentSideBar />
                                                    </div>
                                                </aside>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="loadMore">
                                                    <div className="m-content">

                                                        {contractor && <div className="central-meta">
                                                            <div className="about">
                                                                <div className="personal">
                                                                    <h5 className="f-title">THÔNG TIN CHI TIẾT</h5>
                                                                </div>
                                                                {contractor &&
                                                                    <table className="table table-responsive table-info-contractor">
                                                                        <tbody>
                                                                            {user &&
                                                                                <tr>
                                                                                    <th>Cửa hàng</th>
                                                                                    <td>{contractor.fullName}</td>
                                                                                </tr>
                                                                            }
                                                                            <tr>
                                                                                <th>SDT</th>
                                                                                <td>{contractor.phone}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Địa chỉ</th>
                                                                                <td>Bình Tân - Hồ Chí minh</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Trạng thái</th>
                                                                                <td>
                                                                                    {CustomerStatus.findByStatus(contractor.status).getName()}
                                                                                </td>
                                                                            </tr>
                                                                            {contractor && contractor.volumeCiment > 0 &&
                                                                                <tr>
                                                                                    <th>Đã mua</th>
                                                                                    <td><span className="volume">{contractor.volumeCiment}</span> bao xi măng INSEE</td>
                                                                                </tr>
                                                                            }
                                                                            {contractor && contractor.note &&
                                                                                <tr>
                                                                                    <th>Ghi chú</th>
                                                                                    <td>{contractor.note}</td>
                                                                                </tr>
                                                                            }

                                                                        </tbody>

                                                                    </table>
                                                                }
                                                                <div className="btn-container">
                                                                    <button className="btn-insee btn-insee-bg">Gửi hình</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </WebAppLayout>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RetailerInfo)

const options = {
    enableHighAccuracy: true
}


function downloadImg(src) {
    var image = new Image();
    image.src = src;
    var w = window.open("");
    w.document.write(image.outerHTML);
}

class FormUploadRealtimeImage extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            error: 0,
            location: null,
            time2Click: -1,
            isPreviewImg: false,
            previewImg: null,
            isUploadImg: false,
            uploadImg: null
        }
        this.geolocation = this.geolocation.bind(this)
        this.showErrorLocation = this.showErrorLocation.bind(this)
        this.onChangeInputImg = this.onChangeInputImg.bind(this);
        this.onClickUploadImage = this.onClickUploadImage.bind(this);
        this.drawImg = this.drawImg.bind(this)
        this.uploadImg = this.uploadImg.bind(this)
    }


    componentDidMount() {
        this.geolocation()
    }

    geolocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            this.setState({ location: { latitude: position.coords.latitude, longitude: position.coords.longitude } })
        }, this.showErrorLocation, options);
    }

    onChangeInputImg(event) {
        let files = event.target.files;
        let file = files[0];
        let time2Click = this.state.time2Click;
        let test = false;
        if (test && (time2Click <= 0 || file.lastModified < time2Click)) {
            this.setState({ error: -2, msg: 'Vui lòng chụp ảnh tại cửa hàng của bạn' })
        } else {
            this.drawImg(file)
            this.setState({ error: 200, msg: null })
        }
    }

    onClickUploadImage() {
        this.setState({ time2Click: new Date().getTime() })
        this.inputImgRef.click();
    }

    showErrorLocation(error) {
        let msg = null;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                msg = "Anh chị đã từ chối cho chúng tối truy cập vị trí."
                break;
            case error.POSITION_UNAVAILABLE:
                msg = "Thiết bị của bạn chưa cho phép chúng tôi truy cập vị trí. Vui lòng kiểm tra lại."
                break;
            case error.TIMEOUT:
                msg = "Your request timed out. Please try again"
                break;
            case error.UNKNOWN_ERROR:
                msg = "An unknown error occurred please try again after some time."
                break;
        }
        this.setState({ error: -1, msg: msg })
    }

    drawImg(file) {
        var canvas = document.getElementById('imageCanvas');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.crossOrigin = "anonymous";
        var reader = new FileReader();
        var location = this.state.location;

        reader.onload = function (event) {
            img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                ctx.font = 'bold 30px Arial';
                ctx.fillStyle = "red";
                ctx.fillText("Vị trí: " + location.latitude + ", " + location.longitude, 20, 50);
                ctx.fillText("Thời gian: " + new Date().toLocaleString('vi-VN'), 20, 80);

                this.setState({ isPreviewImg: true, previewImg: canvas.toDataURL('png') })
                var dataUrl = canvas.toDataURL('image/jpeg')
                var blobBin = atob(dataUrl.split(',')[1]);
                var array = [];
                for (var i = 0; i < blobBin.length; i++) {
                    array.push(blobBin.charCodeAt(i));
                }
                var file = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
                this.setState({uploadImg: file})
            }.bind(this)
            img.src = event.target.result;
        }.bind(this)
        reader.readAsDataURL(file);
    }


    uploadImg() {
        this.setState({ isPreviewImg: false, isUploadImg: true })
        UploadFileUtil.uploadImg(this.state.uploadImg)
        .then(resp => {
            if (resp.error == 200) {
                this.setState({isPreviewImg: false, isUploadImg: false, uploadImg: null, isPreviewImg: null})
            }
        })
    }


    render() {
        return (
            <div className="modal-m">
                {!this.state.isPreviewImg && !this.state.isUploadImg && <div style={{ padding: '20px 10px', textAlign: 'left' }} className="modal-popup">
                    <p style={{ color: '#111', fontWeight: '500' }}>Để đáp ứng những yêu cầu của chương trình. Anh chị cần chụp ảnh trực tiếp tại cửa hàng. </p>
                    <p style={{ paddingLeft: '10px', marginTop: '15px' }}>- Anh chị vui lòng chập nhận chia sẻ vị trí hiện tại.
                        {this.state.location ? <i style={{ color: "green", paddingLeft: '5px' }} className="fa fa-check"></i> : <i style={{ color: 'red', paddingLeft: '5px' }} className="fa fa-exclamation-circle"></i>}
                        {this.state.error == -1 && this.state.msg && <span style={{ color: 'red', paddingLeft: '5px', fontSize: '1rem' }}>{this.state.msg}</span>}
                    </p>

                    <p style={{ paddingLeft: '10px' }}>- Vui lòng chụp ảnh trực tiếp từ camera
                        {this.state.location && (this.state.error == 200 ? <i style={{ color: "green", paddingLeft: '5px' }} className="fa fa-check"></i> : <i style={{ color: 'red', paddingLeft: '5px' }} className="fa fa-exclamation-circle"></i>)}
                    </p>
                    <div className="modal-close-btn">
                        <input onChange={this.onChangeInputImg} ref={e => this.inputImgRef = e} style={{ display: 'none' }} type="file" accept="image/*" capture />
                        {this.state.location &&
                            <button onClick={this.onClickUploadImage} className="btn-insee btn-insee-bg post-btn btn-small">Chụp ảnh</button>
                        }
                    </div>
                    <div style={{ padding: '20px 0px' }}>
                        <canvas style={{ display: 'none', width: '200px', height: '200px' }} id="imageCanvas">
                            <canvas id="canvasID"></canvas>
                        </canvas>
                    </div>
                </div>
                }
                {this.state.isPreviewImg && !this.state.isUploadImg &&
                    <div style={{ padding: '5px', textAlign: 'center' }} className="modal-popup">
                        <img style={{ height: '70vh' }} src={this.state.previewImg} />
                    </div>
                }

                {this.state.isPreviewImg && !this.state.isUploadImg &&
                    <div className="btn-bar-send">
                        <button onClick={() => { this.setState({ isPreviewImg: false }) }} style={{ height: '100%', borderRadius: '0', width: '50%' }} className="btn-insee btn-back-gray btn-small">Quay lại</button>
                        <button onClick={this.uploadImg} style={{ height: '100%', borderRadius: '0', width: '50%' }} className="btn-insee btn-insee-bg btn-small">Gửi</button>
                    </div>
                }
                {!this.state.isPreviewImg && this.state.isUploadImg &&
                    <div>
                        <img className="img-loading" src={require('../../../resources/images/loading.gif')} />
                    </div>
                }
            </div>
        )
    }
}