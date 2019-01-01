import React, { Component } from 'react';
import logo from './logo.svg';
import loader from './loader.gif';
import './App.css';
import axios from 'axios';
import NavBar from './NavBar';
import ListItem from './ListItem';
import RowItem from './RowItem';


class App extends Component {

  constructor(){
      super();
    this.state = {
      notification: null,
      editingIndex : null, 
      loading: true,
        newTodo:"",
        editing:false,
          todos: [
                  // {id:1, content:"helelo"},   {id:2, content:"hddaselelo"}, {id:3, content:"hadsadsddaselelo"}, 
          ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

    this.updateTodo = this.updateTodo.bind(this);
    this.alert = this.alert.bind(this);
    this.updateTodoDjango = this.updateTodoDjango.bind(this);
  }


  componentDidMount() {
    //for production sue /api/v1/notes/
    fetch("http://127.0.0.1:8000/api/v1/notes/")
    fetch("http://127.0.0.1:8000/api/v1/notes/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("this his rresult", result);
        
          this.setState({
            todos:result,
            loading:false
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleChange(event){
    this.setState({
      newTodo: event.target.value
    });

      
  }
  addTodo(){
    const newTodo = {
          // id:23,
          title:this.state.newTodo,
          content: this.state.newTodo

    };
    // const oldTodos = this.state.todos;
    // oldTodos.push(newTodo);
    // this.setState({
    //   todos:oldTodos,
    //   newTodo: ''
    // })
       
       this.sendTodoDjango(newTodo);
  }


  editTodo(index,item_id){

    let  todo = this.state.todos[index] ;
      console.log('edit the indez' ,index)
      console.log('the current todos lids', todo)

      this.setState({
        editing:true,
        newTodo: todo.content,
        editingIndex: index,

      })
  }

  updateTodo(){
    const todo = this.state.todos[this.state.editingIndex];
    todo.content =  this.state.newTodo;
    const todos = this.state.todos;
    todos[this.state.editingIndex] = todo;
    this.setState({todos, editing:false, editingIndex: null, newTodo:""});
    this.alert('Todo was updated succesfully');
    this.updateTodoDjango(todo);
    
  }

alert(notification){

  this.setState({
    notification: notification
  });


  setTimeout(() => {
    this.setState({
      notification:null
    });

  },2000);


}

  deleteTodo(index,item_id){
    const newtodos = this.state.todos;
    console.log("before delete", this.state.todos);
    delete newtodos[index];
    this.setState({todos:newtodos});
    console.log("after delete",this.state.todos)
    // console.log(index , item_id);
    this.sentDeleteTodoDjango(item_id);
    
    this.alert('Todo was deleted succesfully');

  }


  updateTodoDjango(payload){
    console.log("hello from update django" , payload.id);
    axios.put(`http://127.0.0.1:8000/api/v1/notes/${payload.id}/`, payload )
      .then(response => {
        // this.setState({ friends: response.data });
        console.log("edit woprk", response)
      })
      .catch(error => {
        console.log("edit didnt work", error);
      });
  }
  sendTodoDjango(payload){
    //THIS FUNCTION IS USE TO SEND DATA TO DJANGO API 
    
     axios.post("http://127.0.0.1:8000/api/v1/notes/",  payload)
    .then((response) => {
      console.log("django responms" , response.data.id);


      const newTodo = {
        id:response.data.id,
        title:payload.title,
        content: payload.content

  };
  const oldTodos = this.state.todos;
  oldTodos.push(newTodo);
  

 
  this.setState({
    todos:oldTodos,
    newTodo: ''
  })
  this.alert('Todo was created succesfully');
      // this.setState({
      //   todos:[response.data, ...this.state.todos],
      //   newTodo: ''
      // })
      
    })
    .catch(function (error) {
      console.log('ERROR FROM DJANGO', error);
    });
   
  }
  sentDeleteTodoDjango(item_id){
    //THIS FUNCTION IS USE To delete
    //  console.log("hello from delete", item_id);
     axios.delete(`http://127.0.0.1:8000/api/v1/notes/${item_id}/`)
     .then(res => {
       console.log(res);
       console.log(res.data);
     })
  }

  render() {

   
    return (
      <div className="App">
    
          <NavBar />
         <div className='container'>
          

        {
          this.state.notification &&

          <div className="alert alert-success">
          <p className="text-center mt-3">
          {this.state.notification}
          </p>
      </div>

        }




           <input 
           className="my-4 form-control"
            placeholder="addd todo"
            onChange = {this.handleChange}
            name ="todo"
            value ={this.state.newTodo}
            />
            <button 


            onClick={this.state.editing? this.updateTodo : this.addTodo}




            className="btn-success form-control mb-4"
            disabled={this.state.newTodo.length < 5}
            
            >

            {this.state.editing ? 'update Note' : 'Add Note'}
            
              </button>

            {
              this.state.loading &&
              <img src ={loader} />
            }

            {
              !this.state.editing &&


             <div>
                <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Note</th>
                 
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {this.state.todos.map((item,index) => {

            return (
                <RowItem 
                key ={index}
                  item = {item}
                  editTodo = {() => {this.editTodo(index,item.id)} }
                  deleteTodo = {() => {this.deleteTodo(index,item.id)} }
                />
            )

            })}

              
              </tbody>
            </table>
        
             </div>



         
            }
         </div>
      </div>
    );
  }
}

export default App;
