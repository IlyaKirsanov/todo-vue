<template>
  <div class="form-cotainer">
    <img src="../assets/129-wear-mask.png" />
    <div class="from-wrapper">
      <form>
        <div class="field">
          <label for="login">Email</label>
          <input
            :class="{ error: isEmailError }"
            @blur="isEmailTouched = true"
            id="login"
            type="email"
            v-model="userEmail"
          />
        </div>

        <div class="error-message" v-show="isEmailError">
          Please input valid email
        </div>

        <button
          :disabled="!isEmailValid"
          @click.prevent="submitUser()"
          class="btn"
          type="submit"
        >
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
      isEmailTouched: false
    };
  },
  beforeCreate() {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      alert("You are already submit Login Form");
      this.$router.push("/");
    }
  },

  computed: {
    userEmail: {
      get() {
        return this.$store.getters.userEmail;
      },
      set(userEmail) {
        this.$store.dispatch("setUserEmail", userEmail);
      }
    },

    isEmailValid() {
      return emailCheckRegex.test(this.$store.getters.userEmail);
    },

    isEmailError() {
      return !this.isEmailValid && this.isEmailTouched;
    }
  },

  methods: {
    submitUser() {
      if (!this.isEmailValid) {
        return;
      }
      this.$store.dispatch("setUserEmailToStorage", this.userEmail);
      alert("Email successful submitted");
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.form-cotainer {
  height: 400px;
  width: 30%;
  min-width: 300px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ccc;

  img {
    margin: 20px 0;
    width: 100px;
    border-radius: 50%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 0 0 auto;

    button {
      align-self: center;
    }
  }
}

.error {
  border-color: red;
}

.error-message {
  width: 50%;
  background-color: red;
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
  margin: 0 auto 20px auto;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
}
</style>
