package ru.mativ.dicer.dto;

import ru.mativ.dicer.entity.DicePack;

public class RollDto {
    private String userId;
    private DicePack dicePack;

    public RollDto() {
        super();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public DicePack getDicePack() {
        return dicePack;
    }

    public void setDicePack(DicePack dicePack) {
        this.dicePack = dicePack;
    }

    @Override
    public String toString() {
        return "RollDto [userId=" + userId + ", dicePack=" + dicePack + "]";
    }

}
