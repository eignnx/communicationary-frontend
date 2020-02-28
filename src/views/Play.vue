<template>
  <section>
    <h1>PLAY PAGE</h1>
    <div class="messages">
      <div class="message-row" v-for="(row, idx) in rows" :key="idx">
        <span v-for="(word, idx) in row" :key="idx" class="word-span">
          {{ word }}
        </span>
      </div>
    </div>
    <div class="button-array">
      <button v-for="word in words" :key="word" @click="sendMessage(word)">
        {{ word }}
      </button>
      <button @click="sendMessage('↩️')">RETURN ↩️</button>
    </div>
  </section>
</template>

<script>
import { generateWords } from "@/words.js";

export default {
  data: () => ({
    ws: null,
    rows: [[]],
    words: null
  }),

  created() {
    this.words = generateWords(0.1);

    const sid = this.$route.query.sessionId;
    const cid = this.$route.query.clientId;
    const address =
      process.env.NODE_ENV !== "production"
        ? `ws://localhost:3000/session/${sid}/${cid}`
        : `wss://${document.location.host}/session/${sid}/${cid}`;

    const ws = new WebSocket(address);

    ws.onmessage = event => {
      const word = event.data;
      this.rows[this.rows.length - 1].push(word);
      if (word == "↩️") {
        this.rows.push([]);
      }
    };

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
  display: flex;
  justify-content: space-around;
}

.button-array > button {
  margin: 0.1rem;
}
</style>
