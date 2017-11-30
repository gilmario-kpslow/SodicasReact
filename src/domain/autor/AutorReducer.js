import AutorService from "./AutorService";
import { AUTOR_SETADO } from "./AutorConstants";

const INITAL_STATE = { autor : AutorService.getAutor()}

export default (state = INITAL_STATE,action) => {
    switch(action.type){
        case AUTOR_SETADO : 
            return { autor : AutorService.getAutor() }
        default:
            return state
    }
}