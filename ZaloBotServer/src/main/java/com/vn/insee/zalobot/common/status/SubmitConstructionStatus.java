package com.vn.insee.zalobot.common.status;

public enum SubmitConstructionStatus {
    INIT(1), REJECT(2), APPROVED(3);
    private int value;

    SubmitConstructionStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
