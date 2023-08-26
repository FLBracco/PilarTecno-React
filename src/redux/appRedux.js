const ADD_TODO = "ADD_TODO";
const COMPLETE_TODO = "COMPLETE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SET_LOADING = "SET_LOADING"

const stateInitial = {
    todo: [],
    loading: false
}

export const appSelector = {
    todo: (state) => state.todo,
    loading: (state) => state.loading
}

export const appActions = {
    addTodo: (payload) => ({
        type: ADD_TODO,
        payload,
    }),
    setCompleteTodo: (payload) => ({
        type: COMPLETE_TODO,
        payload,
    }),
    deleteTodo: (id) => ({
        type: DELETE_TODO,
        id,
    }),
    loading: (value) => ({
        type: SET_LOADING,
        value,
    }),
}

export const appReducer = (state = stateInitial, action) =>{
    switch(action.type){
        case ADD_TODO:
            return{
                ...state, 
                todo: [...state.todo, {
                    id: action.payload.id,
                    text: action.payload.text,
                    completed: false,
                }]
            }
        case COMPLETE_TODO:
            return{
                ...state,
                todo: state.todo.map((t)=>{
                    if (t.id === action.payload.id){
                        return{
                            ...t,
                            completed: true
                        }
                    }
                    return t
                })
            }
        case DELETE_TODO:
            return{
                ...state,
                todo: state.todo.filter((t) => t.id !== action.id)
            }
        

        case SET_LOADING:
            return{
                ...state,
                loading: action.value
            }
    
        default:
            return state;
    }
}