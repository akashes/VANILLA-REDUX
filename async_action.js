import { createStore } from "redux"
import { applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import axios from "axios"

const initialState={
    loading:false,
    products:[ ],
    error:false,
}

//action types
const FETCH_REQUEST='FETCH_REQUEST'
const FETCH_SUCCESS='FETCH_SUCCESS'
const FETCH_ERROR='FETCH_ERROR'

//action creators
function fetchRequest(){
    return {
        type:FETCH_REQUEST
    }
}
function fetchSuccess(products){
    return {
        type:FETCH_SUCCESS,
        payload:products
    }
}
function fetchError(){
    return {
        type:FETCH_ERROR
    }
}

//reducers

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_REQUEST':
          return  {...state,loading:true}

          case 'FETCH_SUCCESS':
            return {...state,loading:false,products:action.payload}

            case "FETCH_ERROR":
                return {...state,loading:false,error:true}

                default :
                return state
    }
}
//Thunk action creator
//it returns a function instead of an object and this function doesnt need to be pure like reducer functions

// When you dispatch fetchProducts(), Redux normally expects an action object.

// However, since Redux Thunk is applied as middleware, it checks if the dispatched action is a function instead of an object.

// If it is a function, Redux Thunk calls that function and automatically injects dispatch as its argument.

// This allows the function to dispatch multiple actions asynchronously.
const fetchProducts=()=>{
    return function(dispatch){
        dispatch(fetchRequest())
axios.get('https://fakestoreapi.com/products')
  .then(response => {
const products = response.data.map((p)=>p.title)
console.log(products)
dispatch(fetchSuccess(products))
}
  ).catch((error)=>{
  dispatch(fetchError())

  })


    }
}


//creating store
const store = createStore(reducer,applyMiddleware(thunk))
console.log('initial state',store.getState())
store.subscribe(()=>console.log('updated state',store.getState()))

store.dispatch(fetchProducts())