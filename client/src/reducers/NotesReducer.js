export default (notes=[], action)=>{

    switch(action.type){
        case 'UPDATE_TITLE':
            return action.payload
        case 'GET_NOTES':
            return action.payload
        case 'ADD_NOTE':
            return [...notes, action.payload]
        case 'ADD_TITLE':
            return  notes
        case 'REMOVE_NOTES':
            return notes.filter(note => note._id!==action.payload)
        default:
            return notes
    }
}
