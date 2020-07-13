<template>
  <div class="home">
    <Header :email="userData.email"></Header>
<!--    <TodoList :defaultTodos="userData.todos"/>-->
    <TodoList/>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
import Header from "@/components/Header.vue";

const userData = {
  email: "",
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
