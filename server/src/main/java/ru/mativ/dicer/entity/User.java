package ru.mativ.dicer.entity;

import ru.mativ.dicer.dto.UserDto;

public class User {
    private String id;
    private String name;
    private String theme;

    public User(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
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
        return "User [id=" + id + ", name=" + name + ", theme=" + theme + "]";
    }

    public UserDto toDto() {
        UserDto dto = new UserDto();
        dto.setUserId(getId());
        dto.setName(getName());
        dto.setTheme(getTheme());
        return dto;
    }

}
