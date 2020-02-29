<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span class="pipe">|</span>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding-top: 1rem;
  padding-bottom: 2rem;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #425eb9;
}

.pipe {
  margin-left: 1ch;
  margin-right: 1ch;
}
</style>
