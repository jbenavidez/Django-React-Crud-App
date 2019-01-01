import React from 'react';


const ListItem =  (props) => {

    return (
        <li className="list-group-item"  >

                    


        <button 
          onClick = {props.editTodo}
        className="btn-sm btn btn-info mr-4">
          Edit
        </button>

        {props.item.content}

        <button 
          onClick = {props.deleteTodo}
        className="btn-sm btn btn-danger ml-4">
          delete
        </button>
      </li>
    )
}

export default ListItem;