<template>
  <div class="about">
    <Header></Header>
    <h1>This is login page</h1>
    <LoginForm></LoginForm>
  </div>
</template>


<script>

import LoginForm from '@/components/LoginForm'
import Header from '@/components/Header'
export default {
  components: {
    LoginForm,
    Header
  }
}
</script>