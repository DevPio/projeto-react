import React, { useEffect, useReducer} from 'react';
import axios from 'axios';


const reducerPost = (state, action)=>{
    switch (action.type) {
        case 'REQUEST':
            return action
            break;
    
        default:
            break;
    }
}

export const usePost = url =>   {

    

    const [state, dispach] = useReducer(reducerPost,null)

    const post = async body => {
        dispach({type:'REQUEST'})
        const post = await axios.post(url,body)
            
        const respo = await post.data
        dispach({type:'SUCCESS'})

        return post
    }

    


    return {
        state,
        sendData: post
    }

    
}

