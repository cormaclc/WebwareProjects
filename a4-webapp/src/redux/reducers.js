const initialState = {
    beats: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_BEATS':
            return {...state, beats: action.beats};
        default:
            return state
    }
};

export default reducer;