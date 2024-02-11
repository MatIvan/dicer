package ru.mativ.dicer.dto;

public class UserDto {
    private String userId;
    private String name;
    private String theme;

    public UserDto() {
        super();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    @Override
    public String toString() {
        return "UserDto [userId=" + userId + ", name=" + name + ", theme=" + theme + "]";
    }

}
