<template>
  <div id="main">
    <div class="fof">
      <h1>Error {{ error.statusCode }}</h1>
      <p v-if="error.statusCode !== 404">
        {{ error.message || "Sorry, We don't have this with us yet." }}
      </p>
      <p v-else>The requested page does not exists.</p>
      <nuxt-link to="/" class="btn btn-md btn-danger">Go Home</nuxt-link><br />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.error.statusCode === 404 ? 'Page Not Found' : 'Invalid Request',
    };
  },
  props: ['error'],
};
</script>
<style scoped>
* {
  transition: all 0.6s;
}

html {
  height: 100%;
}

body {
  font-family: "Lato", sans-serif;
  color: #888;
  margin: 0;
}

#main {
  display: table;
  width: 100%;
  height: 100vh;
  text-align: center;
}

.fof {
  display: table-cell;
  vertical-align: middle;
}

.fof h1 {
  font-size: 50px;
  display: inline-block;
  padding-right: 12px;
  animation: type 0.5s alternate infinite;
}

@keyframes type {
  from {
    box-shadow: inset -3px 0px 0px #888;
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
}
</style>
