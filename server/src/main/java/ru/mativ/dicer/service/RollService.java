package ru.mativ.dicer.service;

import java.util.Random;

import org.springframework.stereotype.Service;

import ru.mativ.dicer.entity.Dice;
import ru.mativ.dicer.entity.DicePack;

@Service
public class RollService {
	private static final Random RND = new Random(System.currentTimeMillis());

	private int getRnd(Dice dice) {
		return RND.nextInt(dice.getFace()) + 1;
	}

	public DicePack roll(DicePack pack) {
		Dice[] dices = pack.getDices();
		Dice[] result = new Dice[dices.length];
		for (int i = 0; i < dices.length; i++) {
			Dice dice = dices[i];
			Dice res = new Dice();
			res.setFace(dice.getFace());
			res.setValue(getRnd(dice));
			result[i] = res;
		}
		DicePack resPack = new DicePack();
		resPack.setDices(result);
		return resPack;
	}

}
