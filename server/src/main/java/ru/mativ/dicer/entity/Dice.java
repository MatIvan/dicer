package ru.mativ.dicer.entity;

public class Dice {
	private Integer face;
	private Integer value;

	public Dice() {
		super();
	}

	public Integer getFace() {
		return face;
	}

	public void setFace(Integer face) {
		this.face = face;
	}

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "Dice [face=" + face + ", value=" + value + "]";
	}

}
