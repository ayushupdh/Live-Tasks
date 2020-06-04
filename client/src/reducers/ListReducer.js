export default (items=[], action)=>{

    switch(action.type){
        case 'GET_ITEMS':
            return action.payload
        case 'ADD_ITEM':
            return action.payload
        case 'REMOVE_ITEM':
            console.log(action.payload);
            return action.payload
        default:
            return items
    }
}
