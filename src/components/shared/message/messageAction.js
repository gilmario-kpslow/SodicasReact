export function show(message){
    return dispatch => {
        dispatch({type : 'SHOW_MESSAGE',payload : message})
        iniciarContador(dispatch)
    }  
}
export function incremetaTempo(){
    return {type : 'INCREMENT_TIME'}
}

export function hide(){
    return {type : 'HIDE_MESSAGE'}
}

function iniciarContador(dispatch){
    let intervalo = setInterval(() => {
        dispatch(incremetaTempo())
    },40) 
        setTimeout(()=> {
            clearInterval(intervalo)
            dispatch(hide());
        }, 4000);
}

