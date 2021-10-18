package com.vn.insee.zalobot.zalo.webhook.msg;

import com.vn.insee.zalobot.zalo.ZMsgWebhook;

public class FollowMsg extends ZMsgWebhook {
    public String source;
    public Follower follower;

    public static class Follower {
        public String id;
    }
}
