<template>
  <div>
    <Header></Header>
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