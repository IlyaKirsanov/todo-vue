const state = {
  todoItem: {}
};

const getters = {
  todoItem: state => {
    return state.todoItem;
  }
};

const mutations = {
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
  }
};

const actions = {
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
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
