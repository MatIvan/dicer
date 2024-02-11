package ru.mativ.dicer.entity;

import java.util.Arrays;

public class DicePack {
    private Dice[] dices;

    public DicePack() {
        super();
    }

    public Dice[] getDices() {
        return dices;
    }

    public void setDices(Dice[] dices) {
        this.dices = dices;
    }

    @Override
    public String toString() {
        return "DicePack [dices=" + Arrays.toString(dices) + "]";
    }

}
