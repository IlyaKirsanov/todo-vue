<template>
  <div>
    <h2>Welcome to Todo App</h2>
    <div id="nav">
      <span>{{ email }}</span>
      <button @click="logout" v-if="email">Log Out</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["email"],
  methods: {
    logout() {
      localStorage.removeItem("email");
      this.$router.push("/login");
    },
  },
};
</script>
