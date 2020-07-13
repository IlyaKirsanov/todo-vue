<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    position: relative;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    background: url('./assets/background.png') 0 0/cover no-repeat fixed;
    height: 100vh;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .field {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
  }

  .field > label {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: left
  }

  .field > input,
  .field > textarea {

    padding: 5px 10px;
    font-size: 20px;
    border-radius: 5px;
  }

  .button {
    font-size: 20px;
    display: inline-block;
    width: 150px;
    border-radius: 10px;
    padding: 5px 20px;
    cursor: pointer;

    &:active {
      transform: translateY(5px) scale(0.95);
    }
  }

  .btn {
    background-color: DodgerBlue;
    border: none;
    color: white;
    padding: 12px 16px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: all .2s;

    &:hover {
      background-color: RoyalBlue;
    }
    &:active {
      transform: translateY(5px) scale(0.95);
    }

  }

  .button-icon {
    background-color: #001221;
    margin-right: 10px;
    border: none;
    color: #ccc;
    width: 50px;
    height: 50px;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      transform: translateY(5px) scale(0.95);
    }
  }

  .button-icon__add {
    position: absolute;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;

  }

  .button-icon__times {
    position: absolute;
    bottom: 10px;
    right: 50%;
    transform: translateX(50%);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.1s;

    &:hover {
      color: #e14141;
    }
  }
</style>
