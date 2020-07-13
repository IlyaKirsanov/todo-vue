<template>
  <div class="header">
    <h2>ToDo Application</h2>
    <div class="header__content">
      <span >{{ userEmail }}</span>
      <button class="button" @click="clearData" v-if="userEmail">Log Out</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  computed:{
    userEmail(){
      return JSON.parse(localStorage.getItem("email"))
    }
  },
  methods: {
    ...mapActions([
      'clearData'
    ])
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
