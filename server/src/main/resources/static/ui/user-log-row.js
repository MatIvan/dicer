function create(user) {
	const el = $.createDiv("log-row-user");
	if (!user) {
		el.style.color = "black";
		el.innerText = ">>>";
		return el;
	}

	const icon = $.createDiv("log-row-user-icon");
	icon.style.backgroundColor = user.theme;

	const name = $.createDiv("log-row-user-name");
	name.style.color = user.theme;
	name.innerText = user.name + ":";

	el.append(icon, name);
	return el;
}

export const UserLogRow = {
	create
}
