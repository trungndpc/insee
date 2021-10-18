package com.vn.insee.zalobot.worker.script.loyalty.reply;

import com.vn.insee.zalobot.worker.script.Reply;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;

import java.util.ArrayList;

public class SubmitFormMessage extends Reply {
    @Override
    public ZMsg build() {
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
}
