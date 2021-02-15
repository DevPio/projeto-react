import React, { useEffect, useReducer} from 'react';
import axios from 'axios';

const reducerDelete = (state, action) =>{

    switch (action.type) {
        case 'REQUEST':
            return action
            break;
    
        default:
            break;
    }
}


export const useDelete = url =>{

    const [state, dispach] = useReducer(reducerDelete,{
        type:'',
        data:''
    })


    const deleteFunc = async urlParse =>{
        dispach({type:'REQUEST',data:''})
     const deleteSend = await axios.delete(url+urlParse+'.json')
        dispach({type:'REQUEST',data:deleteSend.data})
        return deleteSend.data
    }


    return {
        state,
        deleteSend:deleteFunc
    }
        
    

}