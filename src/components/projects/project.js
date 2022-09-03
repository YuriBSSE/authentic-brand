import React from 'react';
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import { useHistory } from "react-router-dom"


function Project({index,name,des,domain,price,id,deleteProjectFunc}) {
    const history=useHistory();
    return (
        <tr style={{textAlign:'center'}}>
        <td>{index}.</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>In Progress</td>
        <td>
           <button 
           onClick={()=>history.push(`/projectDetail/${id}`)}
           className="in-progress">
                View Detail
            </button>
        </td>
        <td>
           <AiFillDelete
           onClick={deleteProjectFunc}
           style={{cursor:"pointer"}}
           color="#e72d18"
           size={30}
           />
           <AiFillEdit
           style={{cursor:"pointer",marginLeft:20}}
           onClick={()=>history.push(`/updateProject/${id}`)}
           color="grey"
           size={30}
           />
        </td>
      </tr>
    );
}

export default Project;