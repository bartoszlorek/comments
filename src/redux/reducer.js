export default function (state = [], action) {
    if (action.type === 'SET_VALUE')
        state.value = action.value;
    return state;
}