package ru.mativ.dicer.entity;

public class DicePack {
	private int faces;
	private int count;

	public DicePack() {
		super();
	}

	public int getFaces() {
		return faces;
	}

	public void setFaces(int faces) {
		this.faces = faces;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return "DicePack [faces=" + faces + ", count=" + count + "]";
	}

}
