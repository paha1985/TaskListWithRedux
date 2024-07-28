export const deleteTodoAction = (id) => ({
	type: 'DELETING',
	payload: {
		isDeleting: true,
		id: id,
		modalActive: true,
	},
});
