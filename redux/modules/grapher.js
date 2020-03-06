const SET_GRAPHER = 'SET_GRAPHER';

export function setGrapher(grapher) {
    return {
        type: SET_GRAPHER,
        grapher
    }
}

const initialState = {
    grapher: null
}

export default function grapher(state = initialState, action) {
    switch (action.type) {
        case SET_GRAPHER:
            return {
                ...state,
                grapher: action.grapher
            }

        default:
            return state;
    }
}
