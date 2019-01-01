import React from 'react';


const RowItem =  (props) => {

    return (
        <tr>
        <td>  {props.item.content}</td>
        
        <td>

            <div className="btn-group">
            <button 
          onClick = {props.editTodo}
        className="btn-sm btn btn-primary  ">
          Edit
        </button>

    
        <button 
          onClick = {props.deleteTodo}
        className="btn-sm btn btn-danger  ">
          delete
        </button>
            </div>

        </td>
      </tr>
    )
}
 
export default RowItem;