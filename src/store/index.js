import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
// import user from "./modules/user";
// import todoItem from "./modules/todoItem";
// import columns from "./modules/columns";
// import utility from "./modules/utility";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userEmail: "",
    todoItem: {},
    columns: [
      { colTitle: "New Todos", todoList: [] },
      { colTitle: "Trash", todoList: [] }
    ],
    showTodoForm: false
  },
  getters: {
    userEmail: state => {
      return state.userEmail;
    },
    todoItem: state => {
      return state.todoItem;
    },
    columns: state => {
      return state.columns;
    },
    showTodoForm: state => {
      return state.showTodoForm;
    }
  },
  mutations: {
    SET_USER_EMAIL: (state, payload) => {
      state.userEmail = payload;
    },
    SET_TODO_ITEM: (state, payload) => {
      state.todoItem = payload;
    },
    ADD_NEW_TODO: (state, payload) => {
      state.columns[0].todoList.push({
        id: Math.floor(Math.random() * 100000000),
        title: payload.title,
        description: payload.description,
        imageUrl: payload.imageUrl,
        isDone: false,
        createDate: new Date().toLocaleDateString()
      });
    },
    REMOVE_TODO: (state, payload) => {
      state.columns[payload.colIndex].todoList.splice([payload.todoIndex], 1);
    },
    SELECT_TODO_ITEM: (state, payload) => {
      state.todoItem =
        state.columns[payload.colIndex].todoList[payload.todoIndex];
    },
    UPDATE_TODO_ITEM: (state, payload) => {
      for (let column of state.columns) {
        column.todoList.find(todo => {
          if (todo.id === payload.id) {
            todo.title = payload.title;
            todo.description = payload.description;
          }
        });
      }
    },
    SET_TODOS_TO_COLUMNS: (state, payload) => {
      state.columns = payload;
    },
    CREATE_NEW_COLUMN: (state, payload) => {
      state.columns.splice(1, 0, {
        colTitle: payload,
        todoList: []
      });
    },
    REMOVE_COLUMN: (state, payload) => {
      if (confirm("Do you really want to delete?")) {
        if (state.columns[payload].todoList.length !== 0) {
          alert(`This list is not empty, delete forbidden`);
        } else {
          state.columns.splice(payload, 1);
        }
      }
    },
    SHOW_TODO_FORM: state => {
      state.showTodoForm = !state.showTodoForm;
      state.todoItem = {};
    },
    UPDATE_LOCAL_STORAGE: state => {
      localStorage.setItem("columns", JSON.stringify(state.columns));
    },
    CLEAR_STATE: state => {
      state.columns = [
        { colTitle: "New Todos", todoList: [] },
        { colTitle: "Trash", todoList: [] }
      ];
      state.userEmail = "";
    }
  },
  actions: {
    setUserEmail: ({ commit }, payload) => {
      commit("SET_USER_EMAIL", payload);
    },
    setUserEmailToStorage: ({ commit }, payload) => {
      localStorage.setItem("email", JSON.stringify(payload));
      commit("SET_USER_EMAIL", payload);
    },
    setSingleTodoItem: ({ commit }, payload) => {
      commit("SET_TODO_ITEM", payload);
    },
    addNewTodo: ({ commit }, payload) => {
      try {
        if (payload.title !== "" && payload.description !== "") {
          commit("ADD_NEW_TODO", payload);
          commit("SHOW_TODO_FORM");
          commit("UPDATE_LOCAL_STORAGE");
          alert("New todo created");
        }
      } catch (e) {
        alert("Something went wrong");
      }
    },
    removeTodo: ({ commit }, payload) => {
      if (confirm("Do you really want to remove this todo?")) {
        commit("REMOVE_TODO", payload);
        commit("UPDATE_LOCAL_STORAGE");
      }
    },
    selectTodoItem: ({ commit }, payload) => {
      commit("SHOW_TODO_FORM");
      commit("SELECT_TODO_ITEM", payload);
    },
    updateTodoItem: ({ commit }, payload) => {
      commit("UPDATE_TODO_ITEM", payload);
      commit("UPDATE_LOCAL_STORAGE");
      commit("SHOW_TODO_FORM");
      alert("Your todo item has been updated");
    },
    createNewColumn: ({ commit }, payload) => {
      try {
        if (payload !== "") {
          console.log(payload);
          commit("CREATE_NEW_COLUMN", payload);
          commit("UPDATE_LOCAL_STORAGE");
          alert("New list created");
        }
      } catch (e) {
        alert("Something went wrong");
      }
    },
    removeColumn: ({ commit }, payload) => {
      commit("REMOVE_COLUMN", payload);
      commit("UPDATE_LOCAL_STORAGE");
    },
    setTodosFromStorage: ({ commit }, payload) => {
      commit("SET_TODOS_TO_COLUMNS", payload);
    },
    toggleTodoForm: ({ commit }) => {
      commit("SHOW_TODO_FORM");
    },
    updateLocalStorage: ({ commit }) => {
      commit("UPDATE_LOCAL_STORAGE");
    },
    clearState: ({ commit }) => {
      commit("CLEAR_STATE");
      localStorage.clear();
      router.push("/login");
    }
  }
});
