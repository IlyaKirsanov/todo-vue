import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import { console } from "vuedraggable/src/util/helper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userEmail: "",
    columns: [
      { colTitle: "New Todos", todoList: [] },
      { colTitle: "Trash", todoList: [] }
    ],
    todoItem: {},
    todos: [],
    showTodoForm: false
  },
  getters: {
    userEmail: state => {
      return state.userEmail;
    },
    todos: state => {
      return state.todos;
    },
    todoItem: state => {
      return state.todoItem;
    },
    showTodoForm: state => {
      return state.showTodoForm;
    },
    columns: state => {
      return state.columns;
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
      state.todoItem = payload;
    },
    setTodos: (state, payload) => {
      state.columns = payload;
    },
    updateLocalStorage: state => {
      localStorage.setItem("columns", JSON.stringify(state.columns));
    },
    addNewTodo: (state, payload) => {
      console.log(payload);
      state.columns[0].todoList.push({
        id: Math.floor(Math.random() * 100000000),
        title: payload.title,
        description: payload.description,
        imageUrl: payload.imageUrl,
        isDone: false,
        createDate: new Date().toLocaleDateString()
      });
      console.log(state.columns[0].todoList[0]);
    },
    removeTodo: (state, payload) => {
      state.columns[payload.colIndex].todoList.splice([payload.todoIndex], 1);
    },
    selectTodoItem: (state, payload) => {
      state.todoItem =
        state.columns[payload.colIndex].todoList[payload.todoIndex];
    },
    updateTodoItem: (state, payload) => {
      for (let column of state.columns) {
        //console.log(column.todoList)
        column.todoList.find(todo => {
          //console.log(todo.id === payload.id)
          if (todo.id === payload.id) {
            todo.title = payload.title;
            todo.description = payload.description;
            return;
          }
        });
      }
      //console.log(todo)
      // todo.title = payload.title;
      // todo.description = payload.description;
    },
    clearState: state => {
      state.todos = [];
      state.userEmail = "";
    },
    createNewColumn: (state, payload) => {
      state.columns.splice(state.columns.length - 1, 0, {
        colTitle: payload,
        todoList: []
      });
    },
    removeColumn: (state, payload) => {
      if (confirm("Do you really want to delete?")) {
        if (state.columns[payload].todoList.length !== 0) {
          alert(`This list is not empty, delete forbidden`);
        } else {
          state.columns.splice(payload, 1);
        }
      }
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
    toggleTodoForm: context => {
      context.commit("showTodoForm");
    },
    setSingleTodoItem: (context, payload) => {
      context.commit("setTodoItem", payload);
    },
    setTodosFromStorage: (context, payload) => {
      context.commit("setTodos", payload);
    },
    addNewTodo: (context, payload) => {
      try {
        if (payload.title !== "" && payload.description !== "") {
          console.log(payload);
          context.commit("addNewTodo", payload);
          context.commit("showTodoForm");
          context.commit("updateLocalStorage");
          alert("New todo created");
        }
      } catch (e) {
        alert("Something went wrong");
      }
    },
    removeTodo: (context, payload) => {
      if (confirm("Do you really want to delete?")) {
        context.commit("removeTodo", payload);
        context.commit("updateLocalStorage");
      }
    },
    selectTodoItem: (context, payload) => {
      context.commit("showTodoForm");
      context.commit("selectTodoItem", payload);
    },
    updateTodoItem: (context, payload) => {
      context.commit("updateTodoItem", payload);
      context.commit("updateLocalStorage");
      context.commit("showTodoForm");
      alert("Your todo item has been updated");
    },
    updateLocalStorage: ({ commit }) => {
      commit("updateLocalStorage");
    },
    clearData: context => {
      context.commit("clearState");
      localStorage.clear();
      router.push("/login");
    },
    createNewColumn: ({ commit }, payload) => {
      try {
        if (payload.colTitle !== "") {
          commit("createNewColumn", payload);
          commit("updateLocalStorage");
          alert("New list created");
        }
      } catch (e) {
        alert("Something went wrong");
      }
    },
    removeColumn: ({ commit }, payload) => {
      commit("removeColumn", payload);
      commit("updateLocalStorage");
    }
  }
});
