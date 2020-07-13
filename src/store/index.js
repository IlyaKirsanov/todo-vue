import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: '',
    todoItem: {},
    todos: [],
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
      state.todoItem = {};
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
    addNewTodo: (state, payload) => {
      state.todos.push({
        id: Math.floor(Math.random() * 100000000),
        title: payload.title,
        description: payload.description,
        isDone: false,
        createDate: new Date().toLocaleDateString(),
      });
    },
    removeTodo: (state, payload) => {
      state.todos.splice(payload, 1);
    },
    selectTodoItem: (state, payload) => {
      state.todoItem = state.todos[payload];
    },
    updateTodoItem: (state, payload) => {
      const todo = state.todos.find((todo) => {
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
    addNewTodo: (context, payload) => {
      if (payload.title != "" && payload.description != "") {
        context.commit("addNewTodo", payload);
        context.commit("showTodoForm")
        context.commit("updateLocalStorage")
      }
    },
    removeTodo: (context, payload) => {
      context.commit("removeTodo", payload);
      context.commit("updateLocalStorage")
    },
    selectTodoItem: (context, payload) => {
      context.commit("showTodoForm")
      context.commit("selectTodoItem", payload)

    },
    updateTodoItem:(context,payload) =>{
      context.commit("updateTodoItem", payload)
      context.commit("updateLocalStorage")
      context.commit("showTodoForm")
    },
    clearData: (context) => {
      context.commit("clearState")
      localStorage.clear();
      router.push("/login");
    }
  }
})
