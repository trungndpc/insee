package com.vn.insee.zalobot.worker.script.loyalty.document;

import java.io.Serializable;

public class ConstructionLoyaltyDocument implements Serializable {
    private Integer id;
    private String address;
    private Integer cementId;
    private Integer square;
    private Integer floors;
    private Boolean isMixCement;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getCementId() {
        return cementId;
    }

    public void setCementId(Integer cementId) {
        this.cementId = cementId;
    }

    public Integer getSquare() {
        return square;
    }

    public void setSquare(Integer square) {
        this.square = square;
    }

    public Integer getFloors() {
        return floors;
    }

    public void setFloors(Integer floors) {
        this.floors = floors;
    }

    public Boolean getMixCement() {
        return isMixCement;
    }

    public void setMixCement(Boolean mixCement) {
        isMixCement = mixCement;
    }
}
