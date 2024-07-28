export const updateTodoAction = (id, title) => ({
	type: 'UPDATING',
	payload: {
		isUpdating: true,
		id: id,
		modalActive: true,
		title: title,
	},
});
