(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{195:function(e,t){e.exports="https://insee-client.wash-up.vn/static/images/icon-phone.png"},201:function(e,t,n){"use strict";n.r(t);var a=n(36),r=n.n(a),s=n(8),i=n.n(s),o=n(9),c=n.n(o),u=n(10),l=n.n(u),p=n(13),h=n.n(p),f=n(14),m=n.n(f),d=n(11),v=n.n(d),g=n(0),y=n.n(g),b=n(23),E=n(19),k=n(24),_=(n(102),n(103),n(104),n(86)),C=n(31),R=n(63),N=n(21),P=function(){function e(){i()(this,e)}return c()(e,null,[{key:"checkPhone",value:function(e){var t={phone:e};return new Promise((function(e,n){N.a.postJSONWithCredentials("https://insee-client.wash-up.vn/authen/check-phone",JSON.stringify(t),e,n)}))}},{key:"updateCustomer",value:function(e){var t={phone:e.phone,mainAreaId:e.location,pass:e.password,fullName:e.name};return new Promise((function(e,n){N.a.postJSONWithCredentials("https://insee-client.wash-up.vn/api/customer/update",JSON.stringify(t),e,n)}))}},{key:"login",value:function(e){var t={phone:e.phone,idToken:e.token};return new Promise((function(e,n){N.a.postJSONWithCredentials("https://insee-client.wash-up.vn/authen/login",JSON.stringify(t),e,n)}))}}]),e}(),S=0,M="Lỗi đường truyền!!!",w="Đăng ký thất bại",D="Lỗi đường truyền",T="Số điện thoại đã được đăng ký",O="Có lỗi xảy ra trong quá trình gửi mã OTP đến số điện thoại này",I="Mã OTP đã hết hạn, bấm Gửi Lại Mã để nhận OTP mới",x="Vui lòng nhập mã OTP",A="Mã OTP không đúng vui lòng thử lại";function L(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var V=function(e){h()(s,e);var t,a=(t=s,function(){var e,n=v()(t);if(L()){var a=v()(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return m()(this,e)});function s(e){var t;return i()(this,s),(t=a.call(this,e)).state={errorMsg:null},t.phone=null,t._formatPhone=t._formatPhone.bind(l()(t)),t._submit=t._submit.bind(l()(t)),t._sendOTP=t._sendOTP.bind(l()(t)),t._setErrorMessage=t._setErrorMessage.bind(l()(t)),t}return c()(s,[{key:"_sendOTP",value:function(){var e=this;this.props.firebase.sendOTP(this.phone,(function(t){e.props.appActions.setStatusLoading(!1),t==S?(e.props.setPhone(e.phone),e.props.appActions.pushStateRegister(2)):e._setErrorMessage(O)}))}},{key:"_submit",value:function(){var e=this;try{var t=this.phoneInputRef.value;R.c.isValidPhone(t)&&(t=_.a.standardized(t),this.phone=t,this.props.appActions.setStatusLoading(!0),P.checkPhone(t).then((function(t){t.error==S?e._sendOTP():e._setErrorMessage(T)})).catch((function(t){e._setErrorMessage(M)})))}catch(e){this.setState({errorMsg:e})}}},{key:"_setErrorMessage",value:function(e){this.setState({errorMsg:e})}},{key:"_formatPhone",value:function(e){var t=e.target.value;(t=_.a.format(t))&&t.length>12||(this.phoneInputRef.value=t)}},{key:"render",value:function(){var e=this;return y.a.createElement(C.a,r()({},this.props,{copyright:!0}),y.a.createElement("span",{className:"contact100-form-title"},"Đăng ký",y.a.createElement("div",{className:"line-bt"})," "),y.a.createElement("div",{className:"form-container"},y.a.createElement("div",{className:"input-shell"},y.a.createElement("img",{src:n(195)}),y.a.createElement("input",{ref:function(t){return e.phoneInputRef=t},onChange:this._formatPhone,placeholder:"Vui lòng nhập số điện thoại",type:"tel",pattern:"[0-9]{4}.[0-9]{3}.[0-9]{3}"})),y.a.createElement("div",{style:{marginTop:"40px"}},this.state.errorMsg&&y.a.createElement("span",{style:{color:"red",fontSize:"medium"}},"*** ",this.state.errorMsg))),y.a.createElement("div",{className:"btn-container"},y.a.createElement("button",{onClick:this._submit,className:"btn-insee btn-insee-bg"},"Đăng ký")))}}]),s}(g.Component);function K(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var J=function(e){h()(a,e);var t,n=(t=a,function(){var e,n=v()(t);if(K()){var a=v()(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return m()(this,e)});function a(e){var t;return i()(this,a),(t=n.call(this,e)).state={count:t.props.count},t.countdown=t.countdown.bind(l()(t)),t.done=t.done.bind(l()(t)),t.reset=t.reset.bind(l()(t)),t.isExpired=t.isExpired.bind(l()(t)),t}return c()(a,[{key:"componentDidMount",value:function(){this.state.count>0&&this.countdown()}},{key:"reset",value:function(){this.setState({count:this.props.count})}},{key:"countdown",value:function(){var e=setInterval(function(){var t=this.state.count-1;this.setState({count:t}),t<=0&&(clearInterval(e),this.props.done())}.bind(this),1e3)}},{key:"toCountString",value:function(e){var t="",n=parseInt(e/60);n>0&&(t=t+n+" phút ");var a=e-60*n;return a>0&&(t=t+a+" giây"),t}},{key:"done",value:function(){this.props.done&&this.props.done()}},{key:"isExpired",value:function(){return this.state.count<=0}},{key:"render",value:function(){return y.a.createElement("span",{style:{color:"#b71c1c",fontWeight:"600"}},this.toCountString(this.state.count))}}]),a}(g.Component);function U(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var z=function(e){h()(a,e);var t,n=(t=a,function(){var e,n=v()(t);if(U()){var a=v()(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return m()(this,e)});function a(e){var t;return i()(this,a),(t=n.call(this,e)).getValue=t.getValue.bind(l()(t)),t.reset=t.reset.bind(l()(t)),t._onChange=t._onChange.bind(l()(t)),t._onKeyPress=t._onKeyPress.bind(l()(t)),t}return c()(a,[{key:"getValue",value:function(){for(var e="",t=1;t<=6;t++){var n=this["smsCodeInput"+t].value;if(!n)return null;e+=n}return e}},{key:"reset",value:function(){for(var e=1;e<=6;e++){this["smsCodeInput"+e].value=""}}},{key:"_onChange",value:function(e){e.target.value?e.target.value=e.target.value%10:e.target.value=null}},{key:"_onKeyPress",value:function(e,t){if("Backspace"==e.key){var n=t-1;if(n>0)this["smsCodeInput"+n].focus()}else if(e.key>=0&&e.key<=9){var a=t+1;if(a<=6)this["smsCodeInput"+a].focus()}}},{key:"render",value:function(){var e=this;return y.a.createElement("div",null,y.a.createElement("div",{className:"wrap-input100 wrap-input25"},y.a.createElement("input",{ref:function(t){return e.smsCodeInput1=t},onChange:this._onChange,onKeyUp:function(t){e._onKeyPress(t,1)},className:"input100",type:"number"})),y.a.createElement("div",{className:"wrap-input100 wrap-input25"},y.a.createElement("input",{ref:function(t){return e.smsCodeInput2=t},onChange:this._onChange,onKeyUp:function(t){e._onKeyPress(t,2)},className:"input100",type:"number"})),y.a.createElement("div",{className:"wrap-input100 wrap-input25"},y.a.createElement("input",{ref:function(t){return e.smsCodeInput3=t},onChange:this._onChange,onKeyUp:function(t){e._onKeyPress(t,3)},className:"input100",type:"number"})),y.a.createElement("div",{className:"wrap-input100 wrap-input25"},y.a.createElement("input",{ref:function(t){return e.smsCodeInput4=t},onChange:this._onChange,onKeyUp:function(t){e._onKeyPress(t,4)},className:"input100",type:"number"})),y.a.createElement("div",{className:"wrap-input100 wrap-input25"},y.a.createElement("input",{ref:function(t){return e.smsCodeInput5=t},onChange:this._onChange,onKeyUp:function(t){e._onKeyPress(t,5)},className:"input100",type:"number"})),y.a.createElement("div",{className:"wrap-input100 wrap-input25"},y.a.createElement("input",{ref:function(t){return e.smsCodeInput6=t},onChange:this._onChange,onKeyUp:function(t){e._onKeyPress(t,6)},className:"input100",type:"number"})))}}]),a}(g.Component);function W(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var Y=function(e){h()(a,e);var t,n=(t=a,function(){var e,n=v()(t);if(W()){var a=v()(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return m()(this,e)});function a(e){var t;return i()(this,a),(t=n.call(this,e)).state={errorMsg:null},t.expires=t.expires.bind(l()(t)),t._sendOTP=t._sendOTP.bind(l()(t)),t._resetOTP=t._resetOTP.bind(l()(t)),t._submit=t._submit.bind(l()(t)),t._setErrorMessage=t._setErrorMessage.bind(l()(t)),t._resetErrorMessage=t._resetErrorMessage.bind(l()(t)),t._nextStep=t._nextStep.bind(l()(t)),t}return c()(a,[{key:"componentDidMount",value:function(){this.countDownRef.reset()}},{key:"expires",value:function(){this._setErrorMessage(I)}},{key:"_sendOTP",value:function(){var e=this;this.props.appActions.setStatusLoading(!0),this.props.firebase.sendOTP(this.props.phone,(function(t){e.props.appActions.setStatusLoading(!1),t==S?e.countDownRef.reset():e._setErrorMessage(O)}))}},{key:"_resetOTP",value:function(){this._sendOTP(),this.optForm.reset(),this._resetErrorMessage()}},{key:"_submit",value:function(){var e=this;if(!this.countDownRef.isExpired()){this.props.appActions.setStatusLoading(!0),this._resetErrorMessage();var t=this.optForm.getValue();if(null==t||t.length<6)return this.props.appActions.setStatusLoading(!1),void this._setErrorMessage(x);this.props.firebase.confirm(t,(function(t,n){t==S?n.user.getIdToken().then((function(t){P.login({phone:e.props.phone,token:t}).then((function(n){e.props.appActions.setStatusLoading(!1),n.error==S?e._nextStep(t):e._setErrorMessage(D)})).catch((function(t){e._setErrorMessage(D),e.props.appActions.setStatusLoading(!1)}))})):(e.props.appActions.setStatusLoading(!1),e._setErrorMessage(A),e.optForm.reset())}))}}},{key:"_setErrorMessage",value:function(e){this.setState({errorMsg:e})}},{key:"_resetErrorMessage",value:function(){this.setState({errorMsg:null})}},{key:"_nextStep",value:function(e){this.props.setToken(e),this.props.appActions.pushStateRegister(3)}},{key:"render",value:function(){var e=this;return y.a.createElement(C.a,this.props,y.a.createElement("span",{className:"contact100-form-title"},"Nhập OTP",y.a.createElement("div",{className:"line-bt"})),y.a.createElement("div",{className:"form-description"},"Vui lòng nhập số OTP( được gửi đến SDT bạn) vào ô bên dưới và bấm xác nhận để hoàn tất truy cập vào hệ thống"),y.a.createElement("div",{className:"form-center"},y.a.createElement("div",{style:{padding:"20px 10px"}},y.a.createElement(J,{ref:function(t){return e.countDownRef=t},count:120,done:this.expires})),this.state.errorMsg&&y.a.createElement("div",{className:"error-msg"},this.state.errorMsg),y.a.createElement(z,{ref:function(t){return e.optForm=t}})),y.a.createElement("div",{className:"btn-container center"},y.a.createElement("div",{className:"btn-retry-send-code"},y.a.createElement("button",{onClick:this._resetOTP,className:"btn-insee btn-default-none-bg"},"Gửi lại mã")),y.a.createElement("div",{className:"btn-submit-otp"},y.a.createElement("button",{onClick:this._submit,className:"btn-insee btn-insee-bg"},"Đăng ký"))))}}]),a}(g.Component),F=n(48);function G(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var H=F.a.getArrayYear().reverse(),B=F.a.getArrayMonth(),Z=function(e){h()(a,e);var t,n=(t=a,function(){var e,n=v()(t);if(G()){var a=v()(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return m()(this,e)});function a(e){var t;return i()(this,a),(t=n.call(this,e)).state={year:0,month:0,day:0,default:null},t.onChangeMonth=t.onChangeMonth.bind(l()(t)),t.onChangeYear=t.onChangeYear.bind(l()(t)),t.onChangeDay=t.onChangeDay.bind(l()(t)),t.getListDay=t.getListDay.bind(l()(t)),t.getValue=t.getValue.bind(l()(t)),t}return c()(a,[{key:"shouldComponentUpdate",value:function(e,t){if(e.default&&e.default!=t.default&&null==t.default){var n=new Date(1e3*e.default),a=n.getDate(),r=n.getFullYear(),s=n.getMonth()+1;return t.year=r,t.day=a,t.month=s,!0}return this.state!=t}},{key:"getValue",value:function(){var e="",t=0,n=0;return 0==this.state.year?(e="Vui lòng chọn năm sinh",t=-1):0==this.state.month?(e="Vui lòng chọn tháng sinh",t=-1):0==this.state.day?(e="Vui lòng chọn ngày sinh",t=-1):n=new Date(this.state.year,this.state.month,this.state.day,0,0,0,0).getTime(),{error:t,errorMsg:e,value:n}}},{key:"getListDay",value:function(e,t){return 0==e||0==t?[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]:F.a.getArrayDay(t,e)}},{key:"onChangeDay",value:function(e){var t=e.target.value;this.setState({day:t})}},{key:"onChangeYear",value:function(e){var t=e.target.value;this.setState({year:t})}},{key:"onChangeMonth",value:function(e){var t=e.target.value;this.setState({month:t})}},{key:"render",value:function(){var e=this.getListDay(this.state.year,this.state.month);return y.a.createElement("div",{className:"birthday"},y.a.createElement("div",{style:{float:"left"},className:"birthday-item"},y.a.createElement("select",{value:this.state.day,onChange:this.onChangeDay},y.a.createElement("option",{value:0},"Ngày"),e&&e.map((function(e){return y.a.createElement("option",{key:e,value:e},e)})))),y.a.createElement("div",{className:"birthday-item"},y.a.createElement("select",{value:this.state.month,onChange:this.onChangeMonth},y.a.createElement("option",null,"Tháng"),B.map((function(e){return y.a.createElement("option",{key:e.id,value:e.id},e.name)})))),y.a.createElement("div",{style:{float:"right"},className:"birthday-item"},y.a.createElement("select",{value:this.state.year,onChange:this.onChangeYear},y.a.createElement("option",{value:0},"Năm sinh"),H.map((function(e){return y.a.createElement("option",{key:e,value:e},e)})))))}}]),a}(g.Component),j=n(29);function q(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var Q=function(e){h()(a,e);var t,n=(t=a,function(){var e,n=v()(t);if(q()){var a=v()(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return m()(this,e)});function a(e){var t;return i()(this,a),(t=n.call(this,e)).state={errorMsg:null},t._submit=t._submit.bind(l()(t)),t._setErrorMessage=t._setErrorMessage.bind(l()(t)),t}return c()(a,[{key:"componentDidMount",value:function(){this.props.appActions.getProfile()}},{key:"shouldComponentUpdate",value:function(e,t){if(this.props!=e&&null!=e.app.user&&e.app.user&&!this.props.app.user){var n=e.app.user;t.name=n.name,t.birthday=n.birthday}return!0}},{key:"_submit",value:function(){var e=this;try{var t={token:this.props.token,name:this.nameInputRef.value,location:parseInt(this.mainAreaRef.value)},n=this.birthdayInputRef.getValue();R.c.isValidBirthday(n)&&(t.birthday=parseInt(n.value/1e3)),R.c.isValid2Create(t)&&(this.props.appActions.setStatusLoading(!0),P.updateCustomer(t).then((function(t){t.error==S?e.props.appActions.pushStateRegister(4):e._setErrorMessage(w),e.props.appActions.setStatusLoading(!1)})).catch((function(t){e._setErrorMessage(D),e.props.appActions.setStatusLoading(!1)})))}catch(e){this.setState({errorMsg:e})}}},{key:"_setErrorMessage",value:function(e){this.setState({errorMsg:e})}},{key:"render",value:function(){var e=this;return y.a.createElement(C.a,this.props,y.a.createElement("span",{className:"contact100-form-title"},"Đăng ký",y.a.createElement("div",{className:"line-bt"})),y.a.createElement("div",{className:"form-description"},"Vui lòng nhập thông tin để tạo tài khoản"),y.a.createElement("div",{className:"form-row"},y.a.createElement("input",{ref:function(t){return e.nameInputRef=t},value:this.state.name,onChange:function(t){return e.setState({name:t.target.value})},className:"insee-input",type:"text",placeholder:"Họ và tên"})),y.a.createElement("div",{className:"form-row"},y.a.createElement(Z,{default:this.state.birthday,ref:function(t){return e.birthdayInputRef=t}})),y.a.createElement("div",{className:"form-row"},y.a.createElement("select",{ref:function(t){return e.mainAreaRef=t},className:"insee-input"},y.a.createElement("option",{value:0},"Khu vực xây dựng"),j.a.getList().map((function(e,t){return y.a.createElement("option",{key:t,value:e.key},e.value)})))),y.a.createElement("div",{className:"form-row prelative policy"},y.a.createElement("input",{defaultChecked:!0,type:"checkbox"}),y.a.createElement("span",null," Tôi đã đọc và đồng ý các ",y.a.createElement("a",{href:"#"},"điều khoản sử dụng và chính sách bảo mật ")," của công ty ")),this.state.errorMsg&&y.a.createElement("div",{className:"msg-error"},y.a.createElement("span",null,"*** ",this.state.errorMsg)),y.a.createElement("div",{className:"btn-container"},y.a.createElement("button",{onClick:this._submit,className:"btn-insee btn-insee-bg"},"Đăng ký")))}}]),a}(g.Component),X=n(28);function $(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var ee=function(e){h()(a,e);var t,n=(t=a,function(){var e,n=v()(t);if($()){var a=v()(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return m()(this,e)});function a(e){return i()(this,a),n.call(this,e)}return c()(a,[{key:"_onClickToZalo",value:function(){return window.location.href="https://zalo.me/2574239635754425040",!1}},{key:"render",value:function(){return y.a.createElement(C.a,this.props,y.a.createElement("span",{className:"contact100-form-title"},"Hoàn tất đăng ký",y.a.createElement("div",{className:"line-bt"})),y.a.createElement("div",{className:"form-description"},"Đơn đăng ký đã được hoàn tất. INSEE sẽ tiến hành kiểm tra và gửi tin nhắn xác nhận trong vòng 24 giờ"),y.a.createElement("div",{className:"btn-container btn-to-zalo"},y.a.createElement("button",{onClick:this._onClickToZalo,className:"btn-insee btn-default-none-bg"},"Quay lại Zalo")),y.a.createElement("div",{className:"btn-container"},y.a.createElement(X.b,{to:"/khach-hang"},y.a.createElement("button",{className:"btn-insee btn-insee-bg"},"Nhà thầu ngoại hạng"))))}}]),a}(g.Component),te=n(81),ne=n(196);n(197);function ae(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var re={apiKey:"AIzaSyAEC96WyRueD1Ash54kgIHJ31BqGWHHS_4",authDomain:"insee-nt.firebaseapp.com",projectId:"insee-nt",storageBucket:"insee-nt.appspot.com",messagingSenderId:"1089546471836",appId:"1:1089546471836:web:4275dfaa3fc5d7330a6059",measurementId:"G-D60ZS1G34Q"},se=!1,ie=function(e){h()(a,e);var t,n=(t=a,function(){var e,n=v()(t);if(ae()){var a=v()(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return m()(this,e)});function a(e){var t;return i()(this,a),t=n.call(this,e),se||(ne.a.initializeApp(re),ne.a.auth().languageCode="vi",se=!0),t.dataRecaptcha=null,t.dataConfirmation=null,t.recaptcha=t.recaptcha.bind(l()(t)),t.sendOTP=t.sendOTP.bind(l()(t)),t.confirm=t.confirm.bind(l()(t)),t}return c()(a,[{key:"componentDidMount",value:function(){this.recaptcha()}},{key:"recaptcha",value:function(){var e=new ne.a.auth.RecaptchaVerifier("recaptcha-container",{size:"invisible"});return this.dataRecaptcha=e,e}},{key:"sendOTP",value:function(e,t){console.log("sendOTP start.....");var n=this.dataRecaptcha?this.dataRecaptcha:this.recaptcha();console.log("sendOTP"),ne.a.auth().signInWithPhoneNumber(e,n).then(function(e){this.dataConfirmation=e,t(0)}.bind(this)).catch(function(e){t(-1),this.dataRecaptcha=null}.bind(this).bind(this))}},{key:"confirm",value:function(e,t){this.dataConfirmation.confirm(e).then((function(e){t(0,e)})).catch((function(e){t(-1,null)}))}},{key:"render",value:function(){return y.a.createElement("div",null,y.a.createElement("div",{id:"recaptcha-container"}))}}]),a}(y.a.Component);function oe(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var ce=function(e){h()(a,e);var t,n=(t=a,function(){var e,n=v()(t);if(oe()){var a=v()(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return m()(this,e)});function a(e){var t;return i()(this,a),(t=n.call(this,e)).phone=null,t.token=null,t.setPhone=t.setPhone.bind(l()(t)),t.setToken=t.setToken.bind(l()(t)),t}return c()(a,[{key:"setPhone",value:function(e){this.phone=e}},{key:"setToken",value:function(e){this.token=e}},{key:"render",value:function(){var e=this,t=this.props.app.register;return y.a.createElement("div",null,y.a.createElement(ie,{ref:function(t){return e.firebase=t}}),t&&1==t.step&&y.a.createElement(V,r()({setPhone:this.setPhone,firebase:this.firebase},this.props)),t&&2==t.step&&y.a.createElement(Y,r()({setToken:this.setToken,phone:this.phone,firebase:this.firebase},this.props)),t&&3==t.step&&y.a.createElement(Q,r()({token:this.token},this.props)),t&&4==t.step&&y.a.createElement(ee,this.props),y.a.createElement(te.a,this.props))}}]),a}(y.a.Component);t.default=Object(b.b)((function(e){return{app:e.app}}),(function(e){return{appActions:Object(E.bindActionCreators)(k,e)}}))(ce)}}]);