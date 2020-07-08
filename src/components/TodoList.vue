<template>
  <!-- <div class="hello">
   <h3>ToDo List Component</h3>
    <ul>
      <li v-for="todo in todos" :key="todo" >{{todo}}</li>
    </ul>

    <button @click="showTodoForm = !showTodoForm">Add Todo</button>
    <TodoForm v-if="showTodoForm === true" @saveTodo="todos.push($event)" :showForm="showTodoForm" />
    
  </div> -->
  <div>
    <h3>ToDo List Component</h3>

    <div class="wrap">
      <hr />

      <div v-for="(todo, index) in todos" :key="todo.id">
        <span>{{ index + 1 }} / </span>
        <span>{{ todo.title }} /</span>
        <span>{{ todo.description }}</span>
        <button @click="removeTodo(index)">Remove</button>
        <button @click="editTodo(index)">Edit</button>
        <input type="checkbox" v-model="todo.isComplete" />
      </div>

      <button @click="showTodoForm = !showTodoForm">Add Todo</button>

      <TodoForm
        :showTodoForm="showTodoForm"
        :todos="todos"
        :selectedTodo="selectedTodo"
        @hideForm="showTodoForm = $event"
        v-if="showTodoForm === true"
      ></TodoForm>
    </div>
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm";
export default {
  props:['defaultTodos'],
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
    } else{
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
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
