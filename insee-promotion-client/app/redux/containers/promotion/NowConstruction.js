import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import FormLayout from '../../../components/layout/FormLayout'

import '../../../resources/css/mobile/bootstrap.min.css';
import '../../../resources/css/mobile/main.css';
import '../../../resources/css/mobile/me.css';
import Loading from '../../../components/layout/Loading'
import ImageInput from '../../../components/promotions/ImageInput'
import S3Util from '../../../utils/S3Util'
const BILL_FOLDER = "bill"
class NowConstruction extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null
        }
        this.submit = this.submit.bind(this)
        this.uploadBill = this.uploadBill.bind(this)
    }


    uploadBill() {
        var uid = 25;
        return new Promise((resolve, reject) => {
            S3Util.createAlbum(BILL_FOLDER, uid + "", (pathFolder) => {
                let name = new Date().getTime();
                let fileList = this.billInputRef.getValue();
                let promoise = S3Util.addPhotos(pathFolder, fileList, name);
                promoise.then(values => {
                    resolve(values.map(value => value.Location))
                }).catch(e => {
                    reject(e);
                })
            });
        });
        
    }

    submit() {
        this.props.appActions.setStatusLoading(true);
        this.uploadBill().then((bills) => {
            console.log(bills)
            this.props.appActions.setStatusLoading(false);
        } )
    }


    render() {
        return (
            <div>
                <FormLayout {...this.props}>
                    <span className="contact100-form-title">
                        {/* Chương trình giới thiệu công trình tiếp theo của tôi */}
                     <div className="line-bt" />
                    </span>
                    {/* <div className="form-description">Vui lòng nhập thông tin để hoàn tất</div> */}
                    <div className="form-row">
                        <ImageInput ref={e => this.billInputRef = e} />
                    </div>
                    <div className="form-row">
                        <ImageInput ref={e => this.imageInputRef = e} />
                    </div>

                    <div className="btn-container">
                        <button onClick={this.submit} className="btn-insee btn-insee-bg">Xác nhận</button>
                    </div>
                    
                </FormLayout>
                <Loading {...this.props}/>
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
)(NowConstruction)
