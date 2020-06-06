import db from '../apis/db'

const noteId = '5ed8261fd3912f0c9ca85369'

export const getItems = ()=>{

    return(async(dispatch)=>{
        const response = await db.get(`/notes/`);
        dispatch({
            type: 'GET_ITEMS',
            payload: response.data[0].notes
        })

    })
}

export const addItem = (item)=>{
    const noteItem = {"note":item}
    return(async(dispatch)=>{
        const response = await db.post(`/notes/${noteId}`, noteItem);
        dispatch({
            type: 'ADD_ITEM',
            payload: response.data.notes
        })

    })
}

export const removeItem = (itemId)=>{
   
    return(async(dispatch)=>{
        const response = await db.delete(`/notes/${noteId}/${itemId}`)
        dispatch( {
            type: 'REMOVE_ITEM',
            payload: response.data.notes
        })
    })
}