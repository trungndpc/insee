import React, { Component } from 'react'

class FollowWidget extends Component {


    constructor(props) {
        super(props)
        this.callbackFollow = this.callbackFollow.bind(this);
        window.callbackFollow = this.callbackFollow;
    }

    callbackFollow() {
        var check = setInterval(function() {
            this.props.appActions.getProfile();
        }.bind(this), 500)

        setTimeout(function () {
            clearInterval(check)
        }.bind(this), 5000)
    }

    componentDidMount() {
        console.log("xxxxxxx")
        if (!document.getElementById("widget-zalo-follow")) {
            let div = document.createElement("DIV");
            div.setAttribute("id", "widget-zalo-follow")
            div.setAttribute("class", "zalo-follow-only-button");
            div.setAttribute("data-oaid", "428332895304538762");
            div.setAttribute("data-callback", "callbackFollow")
            document.getElementById("widget-follow").appendChild(div);
        }
        if (ZaloSocialSDK) {
            ZaloSocialSDK.reload();
        }
    }

    render() {
        return (
            <div style={{ textAlign: 'center', fontSize: 'small', color: 'red' }}>
                Vui lòng quan tâm OA chính thức của INSEE để có thể tham gia các chương trình khuyến mãi
                <div style={{ paddingLeft: 'calc(50% - 40px)', paddingTop: '10px' }}>
                    <div style={{ width: '100px', height: '20px' }} id="widget-follow">
                    </div>
                </div>
            </div>


        )
    }
}

export default FollowWidget
