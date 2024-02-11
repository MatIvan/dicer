package ru.mativ.dicer.entity;

public class UserProps {
    private String name;
    private String theme;

    public UserProps() {
        super();
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
        return "UserProps [name=" + name + ", theme=" + theme + "]";
    }

}
