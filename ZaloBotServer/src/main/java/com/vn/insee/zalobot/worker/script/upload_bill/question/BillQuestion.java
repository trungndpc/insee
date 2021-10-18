package com.vn.insee.zalobot.worker.script.upload_bill.question;

import com.vn.insee.zalobot.util.StringUtils;
import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.ZaloService;
import com.vn.insee.zalobot.zalo.webhook.msg.ImageMsg;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public class BillQuestion extends Question {
    private static final Logger LOGGER = LogManager.getLogger(BillQuestion.class);
    private List<String> urls = new ArrayList<>();
    private boolean isDone;

    public BillQuestion() {
    }

    @Override
    public ZMsg build2Ask() throws Exception {
        return ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị gửi hình ảnh công trình có bao xi măng INSEE và hóa đơn mua hàng vào đây giúp em nhé!");
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) throws Exception {
        try{
            if (msgWebhook instanceof  ImageMsg) {
                this.status = ACCEPTED_STATUS;
                ImageMsg imageMsg = (ImageMsg) msgWebhook;
                List<ImageMsg.Attachment> attachments = imageMsg.message.attachments;
                for (ImageMsg.Attachment attachment: attachments) {
                    if ("image".equals(attachment.type)) {
                        urls.add(attachment.payload.url);
                        String key = msgWebhook.sender.id + "." + BillQuestion.class.getSimpleName();
                        if (urls.size() == 1) {
                            ZaloService.INSTANCE.sendMsg(msgWebhook.sender.id, min2Image(),
                                    true, Duration.ofSeconds(10), key);
                        }else {
                            ZaloService.INSTANCE.sendMsg(msgWebhook.sender.id, isDoneMsg(),
                                    true, Duration.ofSeconds(2), key);
                        }
                    }
                }
            }

            if (msgWebhook instanceof TextMsg) {
                this.status = ACCEPTED_STATUS;
                TextMsg textMsg = (TextMsg) msgWebhook;
                String text = textMsg.message.text;
                if (!StringUtils.isEmpty(text)) {
                    if ("Đã xong".equals(text)) {
                        this.isDone = true;
                    }
                    if ("Chờ bồ xung thêm".equals(text)) {
                        this.isDone = false;
                        ZaloService.INSTANCE.sendMsg(msgWebhook.sender.id, ok());
                    }
                }
            }

        }catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return this.isDone;
    }

    public ZMsg min2Image() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị vui lòng gửi tối thiểu 2 tấm hình");
    }

    public ZMsg ok() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Dạ");
    }

    public ZMsg isDoneMsg() {
        ZMsg.Attachment.Payload payload = new ZMsg.Attachment.Payload();
        payload.buttons = new ArrayList<>();
        ZMsg.Attachment.Payload.Button done_button = new ZMsg.Attachment.Payload.Button();
        done_button.type = "oa.query.show";
        done_button.title = "Đã xong";
        done_button.payload = "Đã xong";
        payload.buttons.add(done_button);

        ZMsg.Attachment.Payload.Button wait_button = new ZMsg.Attachment.Payload.Button();
        wait_button.type = "oa.query.show";
        wait_button.title = "Chờ bổ sung thêm";
        wait_button.payload = "Chờ bổ sung thêm";
        payload.buttons.add(wait_button);

        ZMsg.Attachment attachment = new ZMsg.Attachment();
        attachment.type = "template";
        attachment.payload = payload;
        ZMsg message = ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị hoàn tất đơn tham gia khuyến mãi chưa?");
        message.attachment = attachment;
        return message;
    }

    public List<String> getUrls() {
        return urls;
    }
}
