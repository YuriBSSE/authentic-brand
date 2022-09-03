import React from 'react';
import { useHistory } from "react-router-dom"


function Client({name,orgName,noOfProjects,noOfSubscriptions,status,id}) {
    const history=useHistory();
    return (
        <tr style={{textAlign:'center'}}>
        <td>{orgName}.</td>
        <td>{name}</td>
        <td>{noOfProjects}</td>
        <td>{noOfSubscriptions}</td>
        <td>{status}</td>
        <td>
           <button 
           onClick={()=>history.push(`/clientDetails/${id}`)}
           className="in-progress">
                View Detail
            </button>
        </td>
      </tr>
    );
}

export default Client;