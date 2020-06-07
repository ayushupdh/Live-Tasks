export default (items=[], action)=>{

    switch(action.type){
        case 'GET_ITEMS':
            return action.payload
        case 'ADD_ITEM':
            return  [...items, action.payload]
        case 'REMOVE_ITEM':
            return items.filter(item => item._id!==action.payload)
        default:
            return items
    }
}
