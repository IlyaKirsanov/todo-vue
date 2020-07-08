<template>
  <div>
    <form
      v-if="selectedTodo"
      @submit.prevent.stop="saveTodo(selectedTodo.id, $event)"
    >
      <div>
        <label for="">Title</label>
        <input v-model="selectedTodo.title" type="text" />
      </div>

      <div>
        <label for="">Title</label>
        <textarea v-model="selectedTodo.description" type="text" />
      </div>

      <button>Save</button>
    </form>

    <form v-else @submit.prevent.stop="addTodo(id++)">
      <div>
        <label for="">Title</label>
        <input type="text" v-model="title" />
      </div>

      <div>
        <label for="">Title</label>
        <textarea v-model="description" type="text" />
      </div>

      <button>Add new todo</button>
    </form>

    <button @click="closeForm">Close form</button>
  </div>
</template>

<script>
export default {
  props: ["todos", "selectedTodo", "showTodoForm"],
  data() {
    return {
      id: 0,
      title: "",
      description: "",
      isDone: false,
    };
  },

  methods: {
    addTodo() {
      if (this.title != "" && this.description != "") {
        this.todos.push({
          id: Math.floor(Math.random() * 100000000 + this.id),
          title: this.title,
          description: this.description,
          isDone: this.isDone,
          createDate: new Date(),
        });
        localStorage.setItem("todos", JSON.stringify(this.todos));
      }
      this.todo = "";
      this.closeForm();
    },

    saveTodo(id, ev) {
      const todos = JSON.parse(localStorage.getItem("todos"));
      const todo = todos.find((todo) => {
        return todo.id === id;
      });
      todo.title = ev.target[0].value;
      todo.description = ev.target[1].value;
      localStorage.setItem("todos", JSON.stringify(todos));

      this.closeForm();
    },

    closeForm() {
      this.$emit("hideForm", this.showForm);
    },
  },
};
</script>
