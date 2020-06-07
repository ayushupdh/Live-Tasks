import db from '../apis/db'
import history from '../history'
const noteId = '5edc225370e1282807b80eed'

export const getNotes = ()=>{
    return(async(dispatch)=>{
        const response = await db.get('/notes');
        console.log(response);
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

















export const getItems = ()=>{

    return(async(dispatch)=>{
        const response = await db.get(`/notes`);
        dispatch({
            type: 'GET_ITEMS',
            payload: response.data[0].itemsCollections
        })

    })
}

export const addItem = (item)=>{
    const noteItem = {"item":item}
    return(async(dispatch)=>{
        const response = await db.post(`/notes/${noteId}`, noteItem);
        dispatch({
            type: 'ADD_ITEM',
            payload: response.data
        })

    })
}

export const removeItem = (itemId)=>{
    return(async(dispatch)=>{
        await db.delete(`/notes/${noteId}/${itemId}`)
        dispatch( {
            type: 'REMOVE_ITEM',
            payload: itemId
        })
    })
}