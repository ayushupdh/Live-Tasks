import db from '../apis/db'
import history from '../history'


export const getNotes = ()=>{
    return(async(dispatch)=>{
        const response = await db.get('/notes');
        dispatch({
            type:'GET_NOTES',
            payload:response.data
        })

    })
   
}

export const addNote = ()=>{
    return(async(dispatch)=>{
        const response = await db.post('/notes')
        console.log(response);
        dispatch({
            type:'ADD_NOTE',
            payload:response.data
        })
        history.push(`/notes/${response.data._id}`)
    })
}

export const removeNote = (noteId)=>{
    return(async(dispatch)=>{
         await db.delete(`/notes/${noteId}`)
        dispatch({
            type:'REMOVE_NOTES',
            payload:noteId
        })
    })
}

















export const getItems = (noteId)=>{

    return(async(dispatch)=>{
        const response = await db.get(`/notes/${noteId}`);
        dispatch({
            type: 'GET_ITEMS',
            payload: response.data.itemsCollections
        })

    })
}

export const addItem = (noteId,item)=>{
    const noteItem = {"item":item}
    return(async(dispatch)=>{
        const response = await db.post(`/notes/${noteId}`, noteItem);
        dispatch({
            type: 'ADD_ITEM',
            payload: response.data
        })

    })
}

export const removeItem = (noteId,itemId)=>{
    return(async(dispatch)=>{
        await db.delete(`/notes/${noteId}/${itemId}`)
        dispatch( {
            type: 'REMOVE_ITEM',
            payload: itemId
        })
    })
}