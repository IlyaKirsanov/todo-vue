<template>
  <div class="todolist-container">
    <h1>List of Todos</h1>
    <hr>
    <div>
      <h2 v-if="todos.length===0">{{message}}</h2>

      <div class="layout" v-else>

        <div :key="todo.id" class="card" v-for="(todo, index) in todos">

          <div class="card-controls">
            <button @click="selectTodoItem(index)" class="btn button-icon button-icon__edit"><i class="fa fa-pencil"></i></button>
            <button @click="removeTodo(index)" class="btn button-icon button-icon__trash"><i class="fa fa-trash"></i></button>
          </div>

          <div class="card-content">
            <h3 class="title">{{ index+1 }}. {{ todo.title }}</h3>
            <p class="description">{{ todo.description }}</p>
            <span>{{todo.createDate}}</span>
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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));;
    justify-items: center;
    grid-gap: .5em;
    margin: 0 auto;
    padding: 0;
  }

  @media (max-width: 500px) {
    .layout {
      grid-template-columns: repeat(1, 1fr);

    }
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
        word-wrap: break-word;
      }

      .description {
        word-wrap: break-word;

        min-height: 150px;
        padding: 10px 0;
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

</style>
