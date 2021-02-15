import { useEffect, useReducer, useState} from 'react';
import axios from 'axios';

const reducer = (state, action) =>{

  if(action.type == 'SUCCESS'){
    return {
      data:action.data
    }
  }

  return state
}

export const init = baseUrl => {
    
    
     const useGet = resource => {

        const [data, setData] = useState({
          data:''
        })
        const [request, setRequest] = useState(false)


        const carregar = async ()=>{
         const dt =  await axios.get(`${baseUrl}${resource}.json`)
         
          setData({data:dt.data})
            
          return dt.data
          
        }
       
         
        useEffect(()=>{
          carregar()
      
        },[request])

        
      
        return {
          ...data,
          refetch:carregar,
          upDate:setData
        }
      
    }
    

    return {
        useGet
    }


}


