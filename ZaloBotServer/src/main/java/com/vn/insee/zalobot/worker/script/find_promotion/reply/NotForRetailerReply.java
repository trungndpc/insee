package com.vn.insee.zalobot.worker.script.find_promotion.reply;

import com.vn.insee.zalobot.worker.script.Reply;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsg;

public class NotForRetailerReply extends Reply {

    @Override
    public ZMsg build() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Chương trình khuyến mãi chỉ dành riêng cho thầu/thợ, " +
                "anh chị vui lòng liên hệ hotline 1800 1718 nếu có thắc mắc");
    }
}
