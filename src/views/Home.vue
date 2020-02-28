<template>
  <div class="home">
    <button @click="joinGame">Join a Game</button>
  </div>
</template>

<script>
export default {
  name: "Home",

  methods: {
    joinGame() {
      this.$router.push({
        path: "play",
        query: { sessionId: "test", clientId: "gideon" }
      });
    }
  }
};
</script>
