const state = {
  columns: [
    { colTitle: "New Todos", todoList: [] },
    { colTitle: "Trash", todoList: [] }
  ]
};

const getters = {
  columns: state => {
    return state.columns;
  }
};

const mutations = {
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
  }
};

const actions = {
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
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
