<template>
  <div class="todolist-container">
    <h2>ToDo List Component</h2>

    <div class="layout">
      <div class="card" v-for="(todo, index) in todos" :key="todo.id">
        <div class="card-controls">
          <button class="button-icon" @click="editTodo(index)"><i class="fa fa-pencil"></i></button>
          <button class="button-icon" @click="removeTodo(index)"><i class="fa fa-trash"></i></button>
          
        </div>
        <div class="card-content">
          <h3 class="title">{{ todo.title }}</h3>
          <p class="description">{{ todo.description }}</p>
        </div>
      </div>
    </div>

    <button class="button-icon button-icon__add" @click="showTodoForm = !showTodoForm"><i class="fa fa-plus"></i></button>

    <TodoForm
      :showTodoForm="showTodoForm"
      :todos="todos"
      :selectedTodo="selectedTodo"
      @hideForm="showTodoForm = $event"
      @clearSelected="selectedTodo=$event"
      v-if="showTodoForm === true"
    ></TodoForm>
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm";
export default {
  props: ["defaultTodos"],
  components: {
    TodoForm,
  },
  name: "TodoList",
  data() {
    return {
      todos: [],
      showTodoForm: false,
      selectedTodo: "",
    };
  },

  async mounted() {
    const data = await localStorage.getItem("todos");
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = this.defaultTodos;
    }
  },
  methods: {
    removeTodo(index) {
      this.todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    editTodo(index) {
      this.selectedTodo = this.todos[index];
      this.showTodoForm = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

  .card-controls{
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

    .title{
      margin-top: 10px;
    }

    .description{
      margin: 5px 0;
      flex: 0 1 100px;
    }
  }

  &:last-of-type{
    flex-grow: 0; 
  }
}
h2 {
  margin: 40px 0 0;
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
