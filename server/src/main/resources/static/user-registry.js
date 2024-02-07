/**
 * @typedef {object} User
 * @property {string} name
 * @property {string} theme
 */

const users = new Map();
var myId;

/**
 * @param {User} user 
 */
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

/**
 * @param {number} userId
 * @returns {User} user 
 */
function get(userId) {
	return users.get(userId);
}

/**
 * @param {User} user 
 */
function remove(user) {
	return users.delete(user.userId);
}

function setMyId(id) {
	myId = id;
}

function isAmI(user) {
	return user.userId === myId;
}

export const UserRegistry = {
	put,
	update,
	get,
	remove,
	setMyId,
	isAmI,
};
