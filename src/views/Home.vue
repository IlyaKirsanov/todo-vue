<template>
  <div class="home">
    <Header :email="userData.email"></Header>
    <ul class="home-nav">
      <li><h1>List of Todos</h1></li>
      <li>
        <form class="form">
          <input type="text" v-model="newColTitle" />
          <button class="btn" @click.prevent="createNewColumn">
            Create new List
          </button>
        </form>
      </li>
    </ul>
    <div class="columns-layout">
      <TodoList
        v-for="(column, index) in columns"
        :key="index"
        :column="column"
        :colIndex="index"
      />
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
import Header from "@/components/Header.vue";
import { mapGetters } from "vuex";

const userData = {
  email: ""
};

export default {
  name: "Home",
  data() {
    return {
      userData,
      newColTitle: ""
    };
  },
  components: {
    TodoList,
    Header
  },
  beforeMount() {
    const data = localStorage.getItem("columns");
    if (data) {
      this.$store.dispatch("setTodosFromStorage", JSON.parse(data));
    }
  },
  beforeRouteEnter(to, from, next) {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      userData.email = email;
      next();
    } else {
      next({ name: "loginPage" });
    }
  },
  computed: {
    ...mapGetters(["columns"])
  },
  methods: {
    createNewColumn() {
      this.$store.dispatch("createNewColumn", this.newColTitle);
      this.newColTitle = "";
    }
  }
};
</script>

<style lang="scss">
.home-nav {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;

  @media (max-width: 500px) {
    .li {
      flex-direction: column;
    }
  }

  input {
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 7px 10px;
    font-size: 20px;
    border-radius: 5px;
  }
}

.columns-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  justify-content: center;
  grid-gap: 0.5em;
  margin: 0 auto;
  padding: 0;
}

@media (max-width: 500px) {
  .columns-layout {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
