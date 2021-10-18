package com.vn.insee.zalobot.worker.script.find_promotion.reply;

import com.vn.insee.zalobot.worker.script.Reply;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsg;

public class WaitingApprovalReply extends Reply {

    @Override
    public ZMsg build() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Vui lòng chờ xác nhận!! " +
                "Để có thể tham gia các chương trình khuyến mãi độc quyền của chúng tôi.");
    }
}
