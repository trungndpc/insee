package com.vn.insee.zalobot.worker.script.upload_bill.question;

import com.vn.insee.zalobot.common.City;
import com.vn.insee.zalobot.util.StringUtils;
import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.ZaloService;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class AddressQuestion extends Question {
    private static final Logger LOGGER = LogManager.getLogger(AddressQuestion.class);
    private String address;
    private Integer cityId;
    private Integer districtId;

    public AddressQuestion() {
        this.status = INIT_STATUS;
    }

    @Override
    public ZMsg build2Ask() throws Exception {
        this.status = ASKED_STATUS;
        return ZMsgFactory.INSTANCE.buildTextMsg("Vui lòng nhập địa chỉ công trình của anh/chị vào đây!\n" +
                "Theo cấu trúc đường/xã, huyện, tỉnh.\n" +
                "Ví dụ: 245 Ngô Thì Nhậm, phường 1, TP. Cao Lãnh, Đồng Tháp");
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) throws Exception {
        if (msgWebhook instanceof TextMsg) {
            this.status = ACCEPTED_STATUS;
            TextMsg textMsg = (TextMsg) msgWebhook;
            try{
                String text = textMsg.message.text;
                if (text == null || text.length() < 10) {
                    ZaloService.INSTANCE.sendMsg(textMsg.sender.id, tooShortAnswer());
                    return false;
                }
                int detect_district = City.detectDistrict(text);
                if (detect_district > 0) {
                    this.districtId = detect_district;
                    this.cityId = City.getCityFromDistrict(districtId);
                } else {
                    this.cityId = City.detectCity(text);
                }
                this.address = text;
            }catch (Exception e) {
                ZaloService.INSTANCE.sendMsg(textMsg.sender.id, unknownAnswer());
                return false;
            }
        }
        return StringUtils.isEmpty(this.address);
    }

    private ZMsg tooShortAnswer() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị nhập rõ giúp em với ạ!\nVí dụ: 245 Ngô Thì Nhậm, phường 1, TP. Cao Lãnh, Đồng Tháp");
    }

    private ZMsg unknownAnswer() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Em không hiểu ý anh lắm");
    }

    public String getAddress() {
        return address;
    }

    public Integer getCityId() {
        return cityId;
    }

    public Integer getDistrictId() {
        return districtId;
    }
}
