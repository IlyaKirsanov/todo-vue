<template>
  <div class="home">
    <Header :email="userData.email"></Header>
    <TodoList :defaultTodos="userData.todos"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from "@/components/TodoList.vue";
import Header from "@/components/Header.vue";

const userData = {
  email: "",
  todos: [
    {
      createDate: "2020-07-08T17:18:26.139Z",
      description: "Walk with dog!",
      id: 67612111115,
      isDone: false,
      title: "Default todo 1",
    },
    {
      createDate: "2020-07-08T17:18:26.139Z",
      description: "Finish styling",
      id: 6761215,
      isDone: false,
      title: "Default todo 2",
    },
  ],
};

export default {
  name: "Home",
  data() {
    return {
      userData,
    };
  },

  components: {
    TodoList,
    Header,
  },

  beforeRouteEnter(to, from, next) {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      userData.email = email;
      next();
      console.log("welcome home");
    } else {
      next({ name: "loginPage" });
    }
  },
};
</script>
