export default (items=[], action)=>{

    switch(action.type){
        case 'UPDATE_TITLE':
            return action.payload
        case 'GET_ITEMS':
            return action.payload
        case 'ADD_ITEM':
            return action.payload
        case 'REMOVE_ITEM':
            return action.payload
        default:
            return items
    }
}
