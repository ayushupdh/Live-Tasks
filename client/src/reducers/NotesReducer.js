export default (notes=[], action)=>{

    switch(action.type){
        case 'UPDATE_TITLE':
            return action.payload
        case 'GET_NOTES':
            return action.payload
        case 'ADD_NOTE':
            console.log(notes);
            return [...notes, action.payload]
        case 'ADD_TITLE':
            return  notes
        case 'REMOVE_NOTES':
            return notes
        default:
            return notes
    }
}
