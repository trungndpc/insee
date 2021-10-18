package com.vn.insee.zalobot.zalo.webhook.msg;

import com.vn.insee.zalobot.zalo.ZMsgWebhook;

public class ShareInfoMsg extends ZMsgWebhook {
    public Info info;

    public static class Info {
        public String address;
        public String phone;
        public String city;
        public String district;
        public String name;
        public String ward;
    }
}
