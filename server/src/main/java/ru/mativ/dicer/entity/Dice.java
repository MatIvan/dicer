package ru.mativ.dicer.entity;

public class Dice {
	private Integer faсe;
	private Integer value;

	public Dice() {
		super();
	}

	public Integer getFaсe() {
		return faсe;
	}

	public void setFaсe(Integer faсe) {
		this.faсe = faсe;
	}

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "Dice [faсe=" + faсe + ", value=" + value + "]";
	}

}
