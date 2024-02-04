const users = new Map();
var myId;

function put(user) {
	users.set(user.userId, user);
}

function update(userData) {
	const user = users.get(userData.userId);
	if (user) {
		user.name = userData.name;
		user.theme = userData.theme;
	}
}

function get(userId) {
	return users.get(userId);
}

function remove(user) {
	return users.delete(user.userId);
}

function setMyId(id) {
	myId = id;
}
export const UserRegistry = {
	put,
	update,
	get,
	remove,
	setMyId,
};
