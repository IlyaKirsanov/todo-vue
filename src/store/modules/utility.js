import router from "../../router/index";

const state = {
  showTodoForm: false
};

const getters = {
  showTodoForm: state => {
    return state.showTodoForm;
  }
};

const mutations = {
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
};

const actions = {
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
};

export default {
  state,
  mutations,
  actions,
  getters
};
