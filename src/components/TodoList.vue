<template>
  <div class="todolist-container">
    <h1>ToDo List Component</h1>
    <hr>
    <div>
      <h2 v-if="todos.length===0">{{message}}</h2>

      <div class="layout" v-else>

        <div :key="todo.id" class="card" v-for="(todo, index) in todos">

          <div class="card-controls">
            <button @click="selectTodoItem(index)" class="button-icon"><i class="fa fa-pencil"></i></button>
            <button @click="removeTodo(index)" class="button-icon"><i class="fa fa-trash"></i></button>
          </div>

          <div class="card-content">
            <h3 class="title">{{ todo.title }}</h3>
            <p class="description">{{ todo.description }}</p>
          </div>

        </div>
      </div>
    </div>

    <button @click="toggleTodoForm" class="btn button-icon__add"><i class="fa fa-plus"></i></button>

    <TodoForm v-if="showTodoForm === true"></TodoForm>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import TodoForm from "@/components/TodoForm";

  export default {

    components: {
      TodoForm,
    },
    name: "TodoList",
    data() {
      return {
        message: '',
      };
    },
    beforeMount() {
      const data = localStorage.getItem("todos");
      if (data) {
        this.$store.dispatch("setTodosFromStorage", JSON.parse(data));
      }
    },

    mounted() {
      const todoList = this.todos;
      if (todoList.length === 0) {
        this.message = 'Add new Todo'
      }
    },
    computed: {
      ...mapGetters([
        'todos',
        'showTodoForm'
      ])
    },
    methods: {
      ...mapActions([
        'toggleTodoForm',
        'removeTodo',
        'selectTodoItem',
      ]),
    },
  };
</script>

<style lang="scss" scoped>
  .todolist-container {
    width: 90%;
    margin: 0 auto;
    padding: 0.5em 0;

  }

  .layout {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1em;
    margin: 0 auto;
    padding: 0;
  }

  .card {
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
      }

      .description {
        margin: 5px 0;
        flex: 0 1 100px;
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


  /* .todolist-container {
    width: 80%;
    margin: 0 auto;
  }

  .layout {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
    justify-content: center;
    flex: 0 0 auto;
  }

  .card {
    padding: 10px 15px;
    margin: 10px;
    background-color: #ccc;
    border: 1px solid #000;
  }
  h2 {
    margin: 40px 0 0;
  } */
</style>
