package ru.mativ.dicer.dto;

public class WellcomeDto {
    private String userId;

    public WellcomeDto(String userId) {
        super();
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "WellcomeDto [userId=" + userId + "]";
    }

}
