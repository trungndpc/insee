package com.vn.insee.zalobot.entity;

import com.vladmihalcea.hibernate.type.array.ListArrayType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "customer", schema="promotion")
@TypeDef(name = "list-array",typeClass = ListArrayType.class)
public class CustomerEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer birthday;
    private Integer mainAreaId;
    private String phone;
    private String fullName;
    private String avatar;
    private Integer status;
    private Integer userId;
    private Boolean isLinkedUser;
    private String note;
    private Integer volumeCiment;
    private Integer point;
    private Integer rankPoint;
    private String zaloId;
    private String followerZaloId;
    private Integer roleId;
    private Integer referralUser;
    private String password;

    @Type(type = "list-array")
    @Column(name = "lst_session",columnDefinition = "character varying[]")
    private List<String> lstSession;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBirthday() {
        return birthday;
    }

    public void setBirthday(Integer birthday) {
        this.birthday = birthday;
    }

    public Integer getMainAreaId() {
        return mainAreaId;
    }

    public void setMainAreaId(Integer mainAreaId) {
        this.mainAreaId = mainAreaId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Boolean getLinkedUser() {
        return isLinkedUser;
    }

    public void setLinkedUser(Boolean linkedUser) {
        isLinkedUser = linkedUser;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Integer getVolumeCiment() {
        return volumeCiment;
    }

    public void setVolumeCiment(Integer volumeCiment) {
        this.volumeCiment = volumeCiment;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Integer getRankPoint() {
        return rankPoint;
    }

    public void setRankPoint(Integer rankPoint) {
        this.rankPoint = rankPoint;
    }

    public String getZaloId() {
        return zaloId;
    }

    public void setZaloId(String zaloId) {
        this.zaloId = zaloId;
    }

    public String getFollowerZaloId() {
        return followerZaloId;
    }

    public void setFollowerZaloId(String followerZaloId) {
        this.followerZaloId = followerZaloId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getReferralUser() {
        return referralUser;
    }

    public void setReferralUser(Integer referralUser) {
        this.referralUser = referralUser;
    }

    public List<String> getLstSession() {
        return lstSession;
    }

    public void setLstSession(List<String> lstSession) {
        this.lstSession = lstSession;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
