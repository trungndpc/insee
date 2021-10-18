package com.vn.insee.zalobot.worker.script.upload_bill.reply;

import com.vn.insee.zalobot.worker.script.Reply;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;

public class SuccessSubmitReply extends Reply {
    private String title;
    private static final String FORMAT  = "Đơn tham gia chương trình khuyến mãi %s đã được gửi thành công! INSEE sẽ kiểm tra và thông báo kết quả duyệt đơn trong thời gian 3-5 ngày. Mọi thắc mắc xin liên hệ hotline 1800 1718.";

    public SuccessSubmitReply(String title) {
        this.title = title;
    }

    @Override
    public ZMsg build() {
        return ZMsgFactory.INSTANCE.buildTextMsg(String.format(FORMAT, title));
    }
}
