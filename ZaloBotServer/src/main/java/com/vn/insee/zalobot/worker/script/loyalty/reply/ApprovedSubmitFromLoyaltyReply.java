package com.vn.insee.zalobot.worker.script.loyalty.reply;

import com.vn.insee.zalobot.worker.script.Reply;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;

import java.text.DecimalFormat;

public class ApprovedSubmitFromLoyaltyReply extends Reply {
    private String title;
    private int ton;
    private int nextTon;
    private String link;

    public ApprovedSubmitFromLoyaltyReply(String title, int ton, int nextTon, String link) {
        this.title = title;
        this.ton = ton;
        this.nextTon = nextTon;
        this.link = link;
    }

    @Override
    public ZMsg build() {
        String str = "";
        String nextStr = "";
        if (ton < 1000) {
            str = ton + " kg";
        }else {
            str = new DecimalFormat("#.##").format(ton / 1000) + " tấn";
        }
        nextStr = new DecimalFormat("#.##").format(nextTon / 1000) + " tấn";
        return ZMsgFactory.INSTANCE.buildTextMsg("Đơn tham gia chương trình khuyến mãi " + title + " đã được duyệt thành công!\n" +
                "Anh/chị đã tích lũy tổng cộng " + str + ", tích lũy tiếp " + nextStr + " để đạt phần thưởng tiếp theo của chương trình\n" +
                "Chi tiết tích lũy xem tại " + link);
    }

    public String getTitle() {
        return title;
    }

    public int getTon() {
        return ton;
    }

    public int getNextTon() {
        return nextTon;
    }

    public String getLink() {
        return link;
    }
}
