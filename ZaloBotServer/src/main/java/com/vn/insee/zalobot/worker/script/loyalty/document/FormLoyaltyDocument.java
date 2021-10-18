package com.vn.insee.zalobot.worker.script.loyalty.document;
import java.util.List;

public class FormLoyaltyDocument {
    private String address;
    private List<String> images;
    private List<String> bills;
    private int cementId;
    private boolean isMixCement;
    private int floor;
    private int bags;
    private int square;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<String> getBills() {
        return bills;
    }

    public void setBills(List<String> bills) {
        this.bills = bills;
    }

    public int getCementId() {
        return cementId;
    }

    public void setCementId(int cementId) {
        this.cementId = cementId;
    }

    public boolean isMixCement() {
        return isMixCement;
    }

    public void setMixCement(boolean mixCement) {
        isMixCement = mixCement;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public int getBags() {
        return bags;
    }

    public void setBags(int bags) {
        this.bags = bags;
    }

    public int getSquare() {
        return square;
    }

    public void setSquare(int square) {
        this.square = square;
    }
}
