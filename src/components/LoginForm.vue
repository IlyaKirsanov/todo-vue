<template>
  <div class="form-cotainer">

    <img src="../assets/129-wear-mask.png">
    <div class="from-wrapper">
      <form @submit.prevent="submitUser()">
        
        <div class="field" >
          <label for="">Email</label>
          <input 
            type="text"
            v-model="userEmail"
            @blur="isEmailTouched = true"
            :class="{ error: isEmailError }"
          />
        </div>

        <div class="error-message" v-show="isEmailError">
          Please input valid email
        </div>

        <button class="button" type="submit" :disabled="!isEmailValid">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
const emailCheckRegex = /^.+@.+\..+$/;

export default {
  data() {
    return {
      userEmail: "",
      isEmailTouched: false,
    };
  },
  beforeCreate() {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      alert("You already logedin Login Form");
      this.$router.push("/");
    }
    return;
  },

  computed: {
    isEmailValid() {
      return emailCheckRegex.test(this.userEmail);
    },

    isEmailError() {
      return !this.isEmailValid && this.isEmailTouched;
    },
  },
  methods: {
    submitUser() {
      if (!this.isEmailValid) {
        return;
      }

      alert("Email successful submitted");
      localStorage.setItem("email", JSON.stringify(this.userEmail));
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.form-cotainer {
  height: 400px;
  width: 30%;
  min-width: 300px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ccc;
  
  img{
    margin: 20px 0;
    width: 100px;
    border-radius: 50%;
  }

  form{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 0 0 auto;

    button{
      align-self: center;
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
}
.field > input {
  
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 5px;
}


.error {
  border-color: red;
}
.error-message{
  width: 50%;
  background-color: red;  
  padding: 5px;
  border-radius: 5px;
  font-weight:bold;
  margin:0 auto 20px auto ;
  box-shadow: 0 3px 3px rgba(0,0,0,.3);
}



</style>
