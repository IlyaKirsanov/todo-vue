<template>
  <div class="header">
    <h2>ToDo Application</h2>
    <div class="header__content">
      <span >{{ email }}</span>
      <button class="button" @click="logout" v-if="email">Log Out</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["email"],
  methods: {
    logout() {
      localStorage.removeItem("email");
      localStorage.removeItem("todos");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.header{
  height: 80px;
  background-color: #273849;
  padding: 20px;
  color: #fff;
  box-shadow: 0 5px 5px rgba(0,0,0,.3);
  &__content{
    margin: -25px 20px 0 20px;
    display: flex;
    justify-content: space-between;

    span{
      font-size: 20px;
      font-weight: bold;
    }
  }
}


</style>
