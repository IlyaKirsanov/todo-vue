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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background:url('./assets/background.png') 0 0/cover no-repeat fixed;
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
  background-color: DodgerBlue; /* Blue background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 12px 16px; /* Some padding */
  font-size: 16px; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
}

/* Darker background on mouse-over */
.btn:hover {
  background-color: RoyalBlue;
}

.button-icon {
  background-color: #001221;
  margin-right:10px ;
  border: none; /* Remove borders */
  color: #ccc; /* White text */
  width: 50px;
  height: 50px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  &:active {
    transform: translateY(5px) scale(0.95);
  } 
}

.button-icon__add {
  
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius:50%;

  
}
</style>
