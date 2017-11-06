const INITIAL_STATE = { classeCss: 'alert-info', classeProgress: 'bg-info', mgs: '', visible: false, tempo: 0 }

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SHOW_MESSAGE':
            return {
                ...state,
                classeCss: 'alert-' + action.payload.tipo,
                classeProgress: 'bg-' + action.payload.tipo,
                mgs: action.payload.msg,
                visible: true
            }
        case 'HIDE_MESSAGE':
            return INITIAL_STATE
        case 'INCREMENT_TIME':
            return { ...state, tempo: state.tempo + 1 }
        default:
            return state
    }
}