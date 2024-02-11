package ru.mativ.dicer.service;

import java.util.Random;

import org.springframework.stereotype.Service;

import ru.mativ.dicer.entity.Dice;
import ru.mativ.dicer.entity.DicePack;

@Service
public class RollService {
    private static final Random RND = new Random(System.currentTimeMillis());

    private Integer[] getRnd(Dice dice) {
        final Integer count = dice.getCount();
        Integer[] arr = new Integer[count];
        for (int i = 0; i < count; i++) {
            arr[i] = RND.nextInt(dice.getFace()) + 1;
        }
        return arr;
    }

    public DicePack roll(DicePack pack) {
        Dice[] dices = pack.getDices();
        for (int i = 0; i < dices.length; i++) {
            Dice dice = dices[i];
            dice.setValues(getRnd(dice));
        }
        return pack;
    }

}
