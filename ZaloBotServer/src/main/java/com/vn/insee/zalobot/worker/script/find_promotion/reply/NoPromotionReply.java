package com.vn.insee.zalobot.worker.script.find_promotion.reply;

import com.vn.insee.zalobot.worker.script.Reply;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsg;

public class NoPromotionReply extends Reply {
    @Override
    public ZMsg build() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Rất tiếc!!! Chưa có chương trình cho khu vực thi công của anh/chị");
    }
}
