<template>
  <div class="todolist-container">
    <div>
      <div>
        <ul class="list-nav">
          <li>
            <h3>{{ column.colTitle }}</h3>
          </li>
          <li>
            <button
              :disabled="column.todoList.length !== 0"
              v-show="
                column.colTitle !== 'Trash' && column.colTitle !== 'New Todos'
              "
              @click="removeColumn"
              class="btn button-icon "
            >
              <i class="fa fa-trash"></i>
            </button>
          </li>
        </ul>
        <p
          v-show="
            column.colTitle === 'New Todos' && column.todoList.length === 0
          "
        >
          Create New Todo
        </p>
        <draggable
          ghost-class="ghost-card"
          :animation="200"
          :list="column.todoList"
          @end="updateLocalStorage"
          class="layout"
          group="todoList"
          tag="ul"
        >
          <li
            :key="todo.id"
            class="card"
            v-for="(todo, index) in column.todoList"
          >
            <div class="card-controls">
              <button
                @click="selectTodoItem(index)"
                class="btn button-icon button-icon__edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
              <button
                @click="removeTodo(index)"
                class="btn button-icon button-icon__trash"
              >
                <i class="fa fa-trash"></i>
              </button>
            </div>
            <div class="card-content">
              <h3 class="title" :class="{ trash: column.colTitle === 'Trash' }">
                {{ todo.title }}
              </h3>
              <div v-if="column.colTitle !== 'Trash'">
                <p class="description">{{ todo.description }}</p>
                <div class="image-container">
                  <img :src="todo.imageUrl" alt="img" />
                </div>
                <span>{{ todo.createDate }}</span>
              </div>
            </div>
          </li>
        </draggable>
      </div>
    </div>
    <button @click="toggleTodoForm" class="btn button-icon__add">
      <i class="fa fa-plus"></i>
    </button>
    <TodoForm v-if="showTodoForm === true"></TodoForm>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TodoForm from "@/components/TodoForm";
import draggable from "vuedraggable";

export default {
  props: ["column", "colIndex"],
  components: {
    TodoForm,
    draggable
  },
  name: "TodoList",
  computed: {
    ...mapGetters(["todos", "showTodoForm", "columns"])
  },
  methods: {
    ...mapActions({
      toggleTodoForm: "toggleTodoForm",
      selectTodoItemToUpdate: "selectTodoItem",
      removeTodoFromColumn: "removeTodo",
      updateLocalStorage: "updateLocalStorage",
      removeColumn: "removeColumn"
    }),
    removeTodo(index) {
      const payload = {
        colIndex: this.colIndex,
        todoIndex: index
      };
      this.removeTodoFromColumn(payload);
    },
    selectTodoItem(index) {
      const payload = {
        colIndex: this.colIndex,
        todoIndex: index
      };
      this.selectTodoItemToUpdate(payload);
    },
    removeColumn() {
      this.$store.dispatch("removeColumn", this.colIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-nav {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;

  li {
    margin-right: 10px;
  }
}

draggable {
  margin: 0 auto;
}
.todolist-container {
  width: 90%;
  margin: 0 auto;
  padding: 0.5em 0;
}
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  justify-content: center;
  grid-gap: 0.5em;
  margin: 0 auto;
  padding: 0;
}
@media (max-width: 500px) {
  .layout {
    grid-template-columns: repeat(1, 1fr);
  }
}
.card {
  cursor: move;
  margin: 1%;
  width: 90%;
  background-color: #ccc;
  border: 2px solid rgb(173, 223, 169);
  display: flex;
  flex-direction: column;

  .card-controls {
    background-color: #516275;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-bottom: 1px solid #000;
  }

  .card-content {
    text-align: left;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .title {
      margin-top: 10px;
      word-wrap: break-word;
    }

    .description {
      word-wrap: break-word;
      min-height: 50px;
      padding: 10px 0;
    }

    .image-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 20vh;
      justify-content: flex-start;
      margin-bottom: 10px;

      & > img {
        object-fit: scale-down;
        max-width: 100%;
        max-height: 100%;
        display: block;
      }
    }
    .trash {
      color: rgba(0, 0, 0, 0.5);
      opacity: 0.7;
      text-decoration: line-through;
    }
  }

  &:last-of-type {
    flex-grow: 0;
  }
}

h1 {
  margin: 40px 0 0;
}

h2 {
  margin: 20px 0 0;
}

.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>
