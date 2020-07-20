<template>
  <div id="form">
    <transition appear name="fade">
      <div
        @click.prevent="toggleTodoForm"
        class="modal-overlay"
        v-if="showTodoForm"
      ></div>
    </transition>

    <transition appear name="slide">
      <div class="modal" v-if="showTodoForm">
        <form>
          <span @click.prevent="toggleTodoForm" class="button-icon__times"
            ><i class="fa fa-times"></i
          ></span>
          <h2 class="form-header">Todo form</h2>

          <div class="field">
            <label for="title">Title</label>
            <input id="title" type="text" v-model="todoItem.title" />
          </div>

          <div class="field">
            <label for="description">Description</label>
            <textarea id="description" v-model="todoItem.description" />
          </div>

          <div class="field image-container">
            <img :src="todoItem.id ? todoItem.imageUrl : image" alt="img" />
          </div>

          <div class="form-footer">
            <button
              v-if="!todoItem.id"
              @click.prevent="getRandomImage"
              class="btn"
            >
              Next image
            </button>

            <button
              @click.prevent="updateTodoItem(todoItem)"
              class="btn"
              type="submit"
              v-if="todoItem.id"
            >
              Update todo
            </button>

            <button
              @click.prevent="addNewTodo(todoItem)"
              class="btn"
              type="submit"
              v-else
            >
              Add new todo
            </button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  props: ["selectedTodo"],
  data() {
    return {
      image: ""
    };
  },
  created() {
    axios.get("https://dog.ceo/api/breeds/image/random").then(res => {
      console.log(res);
      this.image = res.data.message;
    });
  },
  computed: {
    ...mapGetters({
      todoItem: "todoItem",
      showTodoForm: "showTodoForm"
    })
  },
  methods: {
    ...mapActions({
      creteNewTodo: "addNewTodo",
      updateTodoItem: "updateTodoItem",
      toggleTodoForm: "toggleTodoForm"
    }),
    addNewTodo() {
      const payload = {
        title: this.todoItem.title,
        description: this.todoItem.description,
        imageUrl: this.image
      };
      this.creteNewTodo(payload);
    },
    getRandomImage() {
      axios.get("https://dog.ceo/api/breeds/image/random").then(res => {
        console.log(res);
        this.image = res.data.message;
      });
    }
  }
};
</script>

<style lang="scss">
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  border: 1px solid black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  max-width: 400px;
  background-color: #fff;

  form {
    height: 80vh;
    padding: 10px;
    width: 100%;
  }

  span {
    font-size: 24px;
    padding: 20px;
  }

  textarea {
    height: 20vh;
  }

  .image-container {
    display: block;
    width: 100%;
    height: 30vh;

    & > img {
      object-fit: contain;

      width: 100%;
      height: 100%;

      max-height: 100%;
      max-width: 100%;
    }
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
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter {
  transform: translateX(-50%);
}

.slide-leave-to {
  transform: translateX(50%);
}
</style>
