<template>
  <section>
    <h1>PLAY COMMUNICATIONARY</h1>
    <section class="info-section">
      <p>Session: {{ $route.query.sessionId }}</p>
      <p>Username: {{ $route.query.clientId }}</p>
    </section>
    <section class="button-array">
      <button v-for="word in words" :key="word" @click="sendMessage(word)">
        {{ word }}
      </button>
      <button @click="sendMessage('↩️')">RETURN ↩️</button>
    </section>
    <section class="messages">
      <div class="message-row" v-for="(row, idx) in rows" :key="idx">
        <span v-for="(word, idx) in row" :key="idx" class="word-span">{{
          word
        }}</span>
      </div>
    </section>
  </section>
</template>

<script>
import { generateWords } from "@/utils/words.js";
import { BACKEND_HOST_WS } from "@/utils/env.js";

export default {
  data: () => ({
    ws: null,
    rows: [[]],
    words: null
  }),

  created() {
    const sid = this.$route.query.sessionId;
    const cid = this.$route.query.clientId;
    const address = `${BACKEND_HOST_WS}/session/${sid}/${cid}`;
    const ws = new WebSocket(address);

    ws.onmessage = event => {
      const word = event.data;
      const lastRow = this.rows[this.rows.length - 1];
      lastRow.push(word);
      if (word == "↩️") {
        this.rows.push([]);
      }
    };

    const seed = sid;
    this.words = generateWords(0.1, seed);
    this.ws = ws;
  },

  methods: {
    sendMessage(msg) {
      this.ws.send(msg);
    }
  }
};
</script>

<style>
.info-section {
  font-weight: bolder;
  font-style: italic;
  font-variant-caps: all-small-caps;
}

.word-span {
  border: 0.3ch solid rgb(215, 187, 226);
  border-radius: 0.5ch;
  margin-right: 0.6ch;
  padding: 0.2ch 1.2ch 0.2ch 1.2ch;
  font-weight: bolder;
  color: rgb(103, 51, 138);
  background: #b390e0;
  text-align: center;
}

.message-row {
  margin: 1rem;
}

.messages {
  padding: 1rem;
}

.button-array {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  grid-gap: 1.5rem;
}

.button-array > button {
  padding: 0.5rem;
}
</style>
