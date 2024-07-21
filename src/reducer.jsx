export const initialState = {
	active: false,
	isDeleting: false,
	isUpdating: false,
	isCreating: false,
	isLoading: false,
	curTodoTitle: null,
	curTodoId: null,
	refreshing: false,
};

export const reducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
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
				modalActive: payload.modalActive,
				curTodoId: payload.id,
			};

		case 'UPDATING':
			return {
				...state,
				isUpdating: payload.isUpdating,
				curTodoId: payload.id,
				curTodoTitle: payload.title,
				modalActive: payload.modalActive,
			};

		case 'MODAL_ACTIVE':
			return { ...state, modalActive: payload };

		case 'CHANGE_TITLE':
			return { ...state, curTodoTitle: payload };

		case 'REFRESH':
			return { ...state, refreshing: payload };

		default:
			return state;
	}
};
