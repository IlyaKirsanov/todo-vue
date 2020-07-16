import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import TodoModel from "@/model/TodoModel";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: '',
    //!todo
    todoItem: TodoModel,
    todos: Array<TodoModel>(),
    showTodoForm: false
  },
  getters: {
    userEmail: state => {
      return state.userEmail;
    },
    todos: state => {
      return state.todos
    },
    todoItem: state => {
      return state.todoItem
    },
    showTodoForm: state => {
      return state.showTodoForm
    }
  },
  mutations: {
    setUserEmail: (state, payload) => {
      state.userEmail = payload;
    },
    showTodoForm: state => {
      state.showTodoForm = !state.showTodoForm;
      //!todo
      state.todoItem = TodoModel;
    },
    setTodoItem: (state, payload) => {
      state.todoItem = payload
    },
    setTodos: (state, payload) => {
      state.todos = payload
    },
    updateLocalStorage: (state) => {
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    //!todo
    addNewTodo: (state, todoModel: TodoModel) => {
      state.todos.push(todoModel);
    },
    removeTodo: (state, payload) => {
      state.todos.splice(payload, 1);
    },

    //!todo
    selectTodoItem: (state, payload:number) => {
      let item: any = state.todos[payload];
      state.todoItem = item;
    },
    updateTodoItem: (state, payload) => {
      //!todo
      const todo: any = state.todos.find((todo) => {
        return todo.id === payload.id;
      });
      todo.title = payload.title;
      todo.description = payload.description;
    },
    clearState: state => {
      state.todos = []
      state.userEmail = ''
    }
  },
  actions: {
    //
    setUserEmail: (context, payload) => {
      context.commit("setUserEmail", payload);
    },
    setUserEmailToStorage: (context, payload) => {
      localStorage.setItem("email", JSON.stringify(payload));
      context.commit("setUserEmail", payload);
    },
    toggleTodoForm: (context) => {
      context.commit("showTodoForm");
    },
    setSingleTodoItem: (context, payload) => {
      context.commit("setTodoItem", payload);
    },
    setTodosFromStorage: (context, payload) => {
      context.commit("setTodos", payload);
    },
    //!todo
    addNewTodo: (context, todoModel: TodoModel) => {
      try {
        if (todoModel.title !== "" && todoModel.description !== "") {
          context.commit("addNewTodo", todoModel);
          context.commit("showTodoForm")
          context.commit("updateLocalStorage")
          alert('New todo created')
        }
      }catch (e) {
        alert("Something went wrong")
      }
    },
    removeTodo: (context, payload) => {
      if(confirm("Do you really want to delete?")){
        context.commit("removeTodo", payload);
        context.commit("updateLocalStorage")
      }
    },
    selectTodoItem: (context, payload) => {
      context.commit("showTodoForm")
      context.commit("selectTodoItem", payload)
    },
    updateTodoItem:(context,payload) =>{
      context.commit("updateTodoItem", payload)
      context.commit("updateLocalStorage")
      context.commit("showTodoForm")
      alert('Your todo item has been updated')
    },
    clearData: (context) => {
      context.commit("clearState")
      localStorage.clear();
      router.push("/login");
    }
  }
})
