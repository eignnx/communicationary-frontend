<template>
  <div class="home">
    <h1>COMMUNICATIONARY LOBBY</h1>
    <JoinGame @join="joinGame" />
  </div>
</template>

<script>
import JoinGame from "@/components/JoinGame.vue";
import { BACKEND_HOST_HTTP } from "@/utils/env.js";

export default {
  name: "Home",

  methods: {
    async getSessionId(clientId) {
      const addr = `${BACKEND_HOST_HTTP}/find-session/${clientId}`;
      const resp = await fetch(addr, { method: "POST" });
      const { sessionId } = await resp.json();
      return sessionId;
    },

    async joinGame(username) {
      const clientId = username;
      const sessionId = await this.getSessionId(username);
      this.$router.push({
        path: "play",
        query: { sessionId, clientId }
      });
    }
  },

  components: {
    JoinGame
  }
};
</script>

<style scoped>
</style>
