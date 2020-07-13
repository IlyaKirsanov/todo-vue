<template>
  <div class="header">
    <div class="header-wrapper">
      <h2>Todo Application</h2>
      <div class="header__content">
        <span>{{ userEmail }}</span>
        <button @click="clearData" class="btn" v-if="userEmail">Log Out</button>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapActions} from "vuex";

  export default {
    computed: {
      userEmail() {
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
  .header {
    height: 100px;
    background-color: #273849;
    padding: 10px;
    color: #fff;
    box-shadow: 0 5px 5px rgba(0, 0, 0, .3);

    display: flex;
    width: 100%;
    justify-content: center;

    &__content {
      margin: 0 20px 0 20px;
      width: 85vmax;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: 20px;
        font-weight: bold;
      }
    }

    @media (max-width:700px) {
      .header__content {
        margin: 0 ;
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;

        .btn{
          align-self: center;
          position: absolute;
          font-size: 16px;
          top: 10px;
          right: 10px;
          padding: 4px 6px;
        }
      }

    }
  }


</style>
