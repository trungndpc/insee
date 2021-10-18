package com.vn.insee.zalobot.worker.script.loyalty.reply;

import com.vn.insee.zalobot.worker.script.Reply;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;

public class SuccessSubmitFromLoyaltyReply extends Reply {
    @Override
    public ZMsg build() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Hóa đơn mua hàng của anh chị đã được ghi nhận. Chúng tôi sẽ kiểm tra và phản hồi sớm cho anh/chị.");
    }
}
