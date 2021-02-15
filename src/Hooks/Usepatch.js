import  {  useReducer} from 'react';
import axios from 'axios';

const reducerPatch = (state, action) =>{

    switch (action.type) {
        case 'REQUEST':
            return action
            break;
    
        default:
            break;
    }
}


export const usePatch = url =>{

    const [state, dispach] = useReducer(reducerPatch,{
        type:'',
        data:''
    })


    const patchUp = async container =>{
        dispach({type:'REQUEST',data:''})

     const pachtVar = await axios.patch(url+container.urlParse+'.json',container.data)

        dispach({type:'REQUEST',data:pachtVar.data})

        
        return pachtVar.data
    }


    return {
        state,
        patch:patchUp
    }
        
    

}