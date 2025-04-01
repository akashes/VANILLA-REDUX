import { createStore } from "redux"
import { produce } from "immer"

const initialState={
    type:"Veggie",
    ingredients:{
        bread:"Whole Grain",
        filling:"Lettuce and Tomato",
        sauce:"Mustard"
    }
}

//ACTION TYPE
const FILL_UPDATE = 'FILL_UPDATE'

//ACTION CREATOR
const fillUpdate=(filling)=>{
    return {
        type:FILL_UPDATE,
        payload:filling
    }
}


//REDUCER

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case  FILL_UPDATE:
            // return{...state,ingredients:{...state.ingredients,filling:action.payload}}
            return produce(state,(draft)=>{
                draft.ingredients.filling=action.payload
            })
            
            default:
                return state

    }

}

//store

const store = createStore(reducer)
console.log(store.getState())

store.subscribe(()=>console.log(store.getState()))
store.dispatch(fillUpdate('fries'))