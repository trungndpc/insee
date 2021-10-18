package com.vn.insee.zalobot.zalo;

import java.time.Duration;

public class ZaloService {
    public static final ZaloService INSTANCE = new ZaloService();

    public boolean sendMsg(String followerId, ZMsg msg) {
        return true;
    }

    public boolean sendMsg(String followerId, ZMsg msg, boolean isForce, Duration timeout, String key) {
        return true;
    }

}
