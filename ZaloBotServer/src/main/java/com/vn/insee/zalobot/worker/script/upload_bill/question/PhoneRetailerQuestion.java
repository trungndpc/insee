package com.vn.insee.zalobot.worker.script.upload_bill.question;

import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.ZaloService;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class PhoneRetailerQuestion extends Question {
    private static final String REGEX_PHONE = "(027|03|05|07|08|09|01[2|6|8|9])+([0-9]{8})";
    private static final Logger LOGGER = LogManager.getLogger(PhoneRetailerQuestion.class);

    private String phone = null;
    private String store = null;

    public PhoneRetailerQuestion() {
        this.status = INIT_STATUS;
    }

    @Override
    public ZMsg build2Ask() throws Exception {
        return ZMsgFactory.INSTANCE.buildTextMsg("Vui lòng nhập tên và số điện thoại cửa hàng anh/chị đã mua.\n" +
                "Ví dụ: Cửa hàng Tâm Thủy, 0901234567");
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) throws Exception {
        if (msgWebhook instanceof TextMsg) {
            this.status = ACCEPTED_STATUS;
            TextMsg textMsg = (TextMsg) msgWebhook;
            try{
                extractPhone(textMsg.message.text);
                if (this.phone == null) {
                   ZaloService.INSTANCE.sendMsg(textMsg.sender.id, notValid(textMsg.message.text));
                }
            }catch (Exception e) {
                ZaloService.INSTANCE.sendMsg(textMsg.sender.id, unknownException());
            }
        }
        return this.phone != null;
    }
    private ZMsg unknownException() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Xin lỗi!!! Em chưa hiểu ý anh/chị");
    }

    private ZMsg notValid(String phone) {
        return ZMsgFactory.INSTANCE.buildTextMsg("Số điện thoại '" + phone + "' không tồn tại");
    }

    private void extractPhone(String text) {
        this.store = text;
        text = text.replaceAll("[^\\d.]", "");
        text = text.replaceAll("\\.", "");
        Pattern pattern = Pattern.compile(REGEX_PHONE);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            this.phone = text.substring(matcher.start(), matcher.end());
            this.store = this.store.replace(this.phone, "");
        }
    }

    public String getPhone() {
        return phone;
    }

    public String getStore() {
        return store;
    }
}
