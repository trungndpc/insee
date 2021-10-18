package com.vn.insee.zalobot.zalo.webhook.msg;

import com.vn.insee.zalobot.zalo.ZMsgWebhook;

public class UnFollowMsg extends ZMsgWebhook {
    public String source;
    public FollowMsg.Follower follower;

    public static class Follower {
        public String id;
    }
}
