<template>
  <div>
    <form @submit.prevent="submitUser()">

      <div class="field">
        <label for="">Email</label>
        <input
          type="text"
          v-model="userEmail"
          @blur="isEmailTouched = true"
          :class="{ error: isEmailError }"
        />
      </div>

      <div v-if="isEmailError">
        Please input valid email
      </div>

      <button type="submit" :disabled="!isEmailValid">
        Submit
      </button>

    </form>
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

<style scoped>
.field {
  margin-bottom: 24px;
}

.field > label {
  margin-right: 8px;
}

.error {
  border-color: red;
}
</style>
