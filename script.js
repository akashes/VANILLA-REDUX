
import { createStore } from "redux";
import { combineReducers } from "redux";

const ORDER_PIZZA="ORDER_PIZZA"; // to avoid typos when using multiple times
const ORDER_BURGER= 'ORDER_BURGER'; 

//Action
// const action={
//     type:ORDER_PIZZA,
//     shop_name:"Pizza Hut",
// }

//Action Creator   //a function that returns an action object

function orderPizza(){
    return {
        type:ORDER_PIZZA,
    }
}

function orderBurger(){
    return{
        type:ORDER_BURGER
    }
    
}

const initialStateForPizza={
    pizzaBase:100,
    
}
const initialStateForBurger={
    burgerBuns:50,

    
}
//Reducer

const reducerPizza=(state=initialStateForPizza,action)=>{
    switch(action.type){
        case 'ORDER_PIZZA' :
            return {...state,pizzaBase:state.pizzaBase-1}

           

            default:
                return state

    }

}
const reducerBurger=(state=initialStateForBurger,action)=>{
    switch(action.type){
        case "ORDER_BURGER":
            return { ...state,burgerBuns:state.burgerBuns-1  }
           

            default:
                return state

    }

}


//store 
// getState() // returns the current state of the store
//combiner reducers before passing to store , because store only accepts one reducer
const rootReducer = combineReducers({
    pizza:reducerPizza,
    burger:reducerBurger
})
const store = createStore(rootReducer); // create a store with the reducer
//?instead of passing initialState why we are passing reducer :because reducer contains the  initial state and also the logic for state changes

console.log('initial state',store.getState()); // get the initial state of the store

//Register listener via subscribe
const unsubscribe = store.subscribe(()=>console.log('updated state',store.getState())); // register a listener to log the state when it changes

//Dispatch action
store.dispatch(orderPizza()); 
store.dispatch(orderPizza()); 
store.dispatch(orderPizza()); 
store.dispatch(orderBurger())
unsubscribe(); // unsubscribe the listener
store.dispatch(orderPizza()); // this will not log the state because we have unsubscribed the listener