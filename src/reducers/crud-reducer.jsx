export const initialCrudState = {
	// active: false,
	isDeleting: false,
	isUpdating: false,
	isCreating: false,
	isLoading: false,
	curTodoTitle: null,
	curTodoId: null,
	refreshing: false,
	todos: {},
};

export const crudReducer = (state = initialCrudState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'GET_DATA':
			return {
				...state,
				todos: payload,
			};

		case 'CREATING':
			return {
				...state,
				isCreating: payload.isCreating,
				curTodoTitle: payload.title,
			};

		case 'LOADING':
			return {
				...state,
				isLoading: payload.isLoading,
			};

		case 'DELETING':
			return {
				...state,
				isDeleting: payload.isDeleting,
				//modalActive: payload.modalActive,
				curTodoId: payload.id,
			};

		case 'UPDATING':
			return {
				...state,
				isUpdating: payload.isUpdating,
				curTodoId: payload.id,
				curTodoTitle: payload.title,
				//modalActive: payload.modalActive,
			};

		// case 'MODAL_ACTIVE':
		// 	return { ...state, modalActive: payload };

		// case 'MODAL_CANCEL':
		// 	return { ...state, isUpdating: false, isDeleting: false, modalActive: false };

		case 'CHANGE_TITLE':
			return { ...state, curTodoTitle: payload };

		case 'REFRESH':
			return { ...state, refreshing: payload };

		default:
			return state;
	}
};
