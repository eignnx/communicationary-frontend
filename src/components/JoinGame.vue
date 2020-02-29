<template>
  <form @submit.prevent>
    <div>
      <input
        type="text"
        name="username"
        id="username-field"
        placeholder="Choose a username..."
        v-model="username"
        @keyup.enter.prevent="tryJoinGame"
      />
    </div>
    <div>
      <button :disabled="invalidUsername" @click.prevent="tryJoinGame">Join a Game</button>
    </div>
    <div
      v-if="invalidUsername && !emptyUsername"
      class="warning"
    >Only alphanumeric characters and _ are allowed in usernames!</div>
  </form>
</template>

<script>
export default {
  name: "JoinGame",

  data: () => ({
    username: ""
  }),

  computed: {
    emptyUsername() {
      return this.username === "";
    },

    invalidUsername() {
      const USERNAME_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
      return this.username.match(USERNAME_RE) === null;
    }
  },

  methods: {
    tryJoinGame() {
      if (!this.invalidUsername) {
        this.$emit("join", this.username);
      }
    }
  }
};
</script>

<style scoped>
.warning {
  color: #a00;
  background-color: #faa;
  border-radius: 3px;
  border: 2px solid #a00;
  margin: 1rem;
  padding: 0.3rem;
}
</style>
