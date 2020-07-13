<template>
  <transition class="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <form>
            <h2 class="modal-header">Todo form</h2>
            <div class="modal-body">
              <label for="title">Title</label>
              <input id="title" type="text" v-model="todoItem.title"/>
            </div>

            <div class="modal-body">
              <label for="description">Description</label>
              <textarea id="description" v-model="todoItem.description"/>
            </div>

            <div class="modal-footer">
              <button @click.prevent="updateTodoItem(todoItem)" type="submit" v-if="todoItem.id">Update todo</button>
              <button @click.prevent="addNewTodo(todoItem)" type="submit" v-else>Add new todo</button>
              <button @click.prevent="toggleTodoForm">Close form</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  //!todo
  window.addEventListener("click", ()=>{
      document.getElementsByClassName('.modal-mask').classList.add('opacity: 0')
    }
  );

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
      ]),

      // saveTodo(id, ev) {
      //   const todos = JSON.parse(localStorage.getItem("todos"));
      //   const todo = todos.find((todo) => {
      //     return todo.id === id;
      //   });
      //   todo.title = ev.target[0].value;
      //   todo.description = ev.target[1].value;
      //   localStorage.setItem("todos", JSON.stringify(todos));
      //
      //   this.todo = "";
      //   this.clearSelectedTodo();
      //   this.closeForm();
      // },
      // clearSelectedTodo() {
      //   this.$emit("clearSelected", null);
      // },
    }
    ,
  }
  ;
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>

<!--<style>-->
<!--  .modal {-->
<!--    position: fixed;-->
<!--    left: 0;-->
<!--    top: 0;-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--    background-color: rgba(0, 0, 0, 0.5);-->
<!--    opacity: 0;-->
<!--    visibility: hidden;-->
<!--    transform: scale(1.1);-->
<!--    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;-->
<!--  }-->
<!--  .modal-content {-->
<!--    position: absolute;-->
<!--    top: 50%;-->
<!--    left: 50%;-->
<!--    transform: translate(-50%, -50%);-->
<!--    background-color: white;-->
<!--    padding: 1rem 1.5rem;-->
<!--    width: 24rem;-->
<!--    border-radius: 0.5rem;-->
<!--  }-->
<!--  .close-button {-->
<!--    float: right;-->
<!--    width: 1.5rem;-->
<!--    line-height: 1.5rem;-->
<!--    text-align: center;-->
<!--    cursor: pointer;-->
<!--    border-radius: 0.25rem;-->
<!--    background-color: lightgray;-->
<!--  }-->
<!--  .close-button:hover {-->
<!--    background-color: darkgray;-->
<!--  }-->
<!--  .show-modal {-->
<!--    opacity: 1;-->
<!--    visibility: visible;-->
<!--    transform: scale(1.0);-->
<!--    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;-->
<!--  }-->

<!--</style>-->
