import React, { useEffect, useReducer} from 'react';
import axios from 'axios';

const reducer = (state, action) =>{

    if(action.type == 'SUCCESS'){
      state = {
        data:action.data
      }
    }
  
    return state
  }
  
  
  
export const useGet = url => {
    const [state, dispach] = useReducer(reducer,{
      data:''
    })
    useEffect(()=>{
  
      axios.get(url)
      .then(response=>{
        dispach({type:'SUCCESS',data:Object.entries(response.data)[0].filter(item=>{
          if(typeof item != 'string'){
            return item
          }
       })})
        
      })
    },[])
  
    return state.data
  
}
