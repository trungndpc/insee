package com.vn.insee.zalobot.worker.script.loyalty.reply;

import com.vn.insee.zalobot.common.Constant;
import com.vn.insee.zalobot.worker.script.Reply;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import java.util.Arrays;

public class SendGiftForStartedReply extends Reply {
    private static final String SUB_TITLE_FORMAT = "Chúc mừng anh chị đã nhận được phần thưởng cho công trình đầu tiên chương trình %s. Nhấn vào đây để nhận quà.";
    private int giftId;
    private String title;
    private String cover;

    public SendGiftForStartedReply(int giftId, String title, String cover) {
        this.giftId = giftId;
        this.title = title;
        this.cover = cover;
    }

    @Override
    public ZMsg build() {
        String subTitle = String.format(SUB_TITLE_FORMAT, title);
        ZMsg.Attachment.Payload.Element.Action action = new ZMsg.Attachment.Payload.Element.Action();
        action.type = "oa.open.url";
        action.url = Constant.CLIENT_DOMAIN + "/chuc-mung/" + giftId;

        ZMsg.Attachment.Payload.Element element = new ZMsg.Attachment.Payload.Element();
        element.title = "Chúc mừng !!!";
        element.subtitle = subTitle;
        element.imageUrl =  cover;
        element.action = action;

        return ZMsgFactory.INSTANCE.buildListTemplateMsg(Arrays.asList(element));
    }
}
