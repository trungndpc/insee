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

public class NumberOfBagQuestion extends Question {
    private static final Pattern PATTERN = Pattern.compile("\\d+");
    private static final Logger LOGGER = LogManager.getLogger(NumberOfBagQuestion.class);
    private int bags = 0;
    private int min = 0;

    public NumberOfBagQuestion(int min) {
        this.min = min;
        this.status = INIT_STATUS;
    }

    @Override
    public ZMsg build2Ask() throws Exception {
        return ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị vui lòng nhập số lượng xi măng đã mua trong đơn hàng.\n" +
                "Lưu ý: chương trình khuyến mãi chỉ áp dụng từ " + min + " bao trở lên");
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) throws Exception {
        if (msgWebhook instanceof TextMsg) {
            try{
                TextMsg textMsg = (TextMsg) msgWebhook;
                String text = textMsg.message.text;
                int bag = extractFromAns(text);
                this.bags = bag;
                if (bag < min) {
                    ZaloService.INSTANCE.sendMsg(msgWebhook.sender.id, minException());
                }
            }catch (Exception e) {
                ZaloService.INSTANCE.sendMsg(msgWebhook.sender.id, unknownException());
            }
        }
        return this.bags >= min;
    }

    private ZMsg unknownException() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Anh nhập số thôi ạ. ví dụ: 60 70");
    }

    private ZMsg minException() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Vui lòng nhập số lượng sản phẩm lớn hơn yêu cầu là " + min + " bao.");
    }

    private static int extractFromAns(String text) {
        Matcher m = PATTERN.matcher(text);
        if (m.find()) {
            return Integer.parseInt(m.group());
        }
        return 0;
    }

    public int getBags() {
        return bags;
    }
}
