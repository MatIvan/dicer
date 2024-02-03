const users = new Map();

function put(user) {
	users.set(user.userId, user);
}

function update(userId, props) {
	const user = users.get(userId);
	if (user) {
		user.props = props;
	}
}

function get(userId) {
	return users.get(userId);
}

export const UserRegistry = {
	put,
	update,
	get,
};
