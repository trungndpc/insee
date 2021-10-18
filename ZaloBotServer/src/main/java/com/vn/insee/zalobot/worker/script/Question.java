package com.vn.insee.zalobot.worker.script;

import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;

public abstract class Question {
    public static final int INIT_STATUS = 0;
    public static final int ASKED_STATUS = 1;
    public static final int NOT_ACCEPT_STATUS = 2;
    public static final int ACCEPTED_STATUS = 3;
    public static final int COMPLETED_STATUS = 4;

    public int status;

    public abstract ZMsg build2Ask() throws Exception;
    public abstract boolean ans(ZMsgWebhook msgWebhook) throws Exception;
}
