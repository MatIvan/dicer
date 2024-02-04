package ru.mativ.dicer.entity;

import java.util.Arrays;

public class Dice {
	private Integer face;
	private Integer count;
	private Integer[] values;

	public Dice() {
		super();
	}

	public Integer getFace() {
		return face;
	}

	public void setFace(Integer face) {
		this.face = face;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Integer[] getValues() {
		return values;
	}

	public void setValues(Integer[] values) {
		this.values = values;
	}

	@Override
	public String toString() {
		return "Dice [face=" + face + ", count=" + count + ", values=" + Arrays.toString(values) + "]";
	}

}
