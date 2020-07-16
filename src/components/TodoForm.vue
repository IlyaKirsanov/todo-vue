<template>
  <div id="form">
    <transition appear name="fade">
      <div @click.prevent="toggleTodoForm" class="modal-overlay" v-if="showTodoForm"></div>
    </transition>

    <transition appear name="slide">
      <div class="modal" v-if="showTodoForm">
        <form>
          <span @click.prevent="toggleTodoForm" class="button-icon__times"><i class="fa fa-times"></i></span>
          <h2 class="form-header">Todo form</h2>

          <div class="field">
            <label for="title">Title</label>
            <input id="title" type="text" v-model="todoItem.title"/>
          </div>

          <div class="field">
            <label for="description">Description</label>
            <textarea id="description" v-model="todoItem.description"/>
          </div>

          <div class="form-footer">
            <button @click.prevent="updateTodoItem(todoItem)" class="btn" type="submit" v-if="todoItem.id">Update
              todo
            </button>
            <button @click.prevent="addNewTodo(todoItem)" class="btn" type="submit" v-else>Add new todo</button>
          </div>
        </form>
      </div>
    </transition>

  </div>

</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    props: ["todos", "selectedTodo",],
    computed: {
      ...mapGetters(
        ['todoItem', 'showTodoForm']
      )
    },
    methods: {
      ...mapActions([
        'addNewTodo',
        'updateTodoItem',
        'toggleTodoForm'
      ])
    }
  }
  ;
</script>


<style lang="scss">
  form {
    height: 100vh;
    padding: 20px ;
    width: 100%;

  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .modal {
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid black;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;

    max-width: 400px;
    background-color: #FFF;

    span{
      font-size: 24px;
      padding: 20px;
    }

    textarea{
      height: 30vh;
    }
  }

  .form-header {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #42b983;
  }

  .form-input {
    padding: 10px;
    margin: 10px 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform .5s;
  }

  .slide-enter {
    transform: translateX(-50%);
  }

  .slide-leave-to {
    transform: translateX(50%);
  }


</style>
