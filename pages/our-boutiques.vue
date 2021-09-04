<template>
  <div class="mt-4">
    <div class="row rounded mb-4" v-for="boutique in boutiques" :key="boutique.id">
      <div class="col-lg-12 col-md-12">
        <b-card
          :img-src="boutique.image"
          :img-alt="boutique.image + ' Image'"
          img-top
          class="boutique"
        >
        <div class="cover rounded text-center">
          <b>{{ boutique.name }}</b>
        </div>
          <b-card-text>
            <div class="orange-color mt-2 mb-2">
              {{ boutique.address }}
            </div>
            Opening Hours <br />
            <div class="timing mt-2">
              {{ boutique.store_timing }}
            </div>
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'navigationOnly',
  async asyncData({ $axios, store }) {
    store.commit('setNavigationTitle', 'Our Boutiques');
    const { data } = await $axios.get('/boutiques');
    return {
      boutiques: data,
    };
  },
};
</script>

<style scoped>
.cover {
  margin:0 auto;
  margin-top:-50px;
  width:auto;
  background: #efe9dd;
  width: 80%;
  height: 50px;
  font-size: 22px;
  font-weight: bold;
  padding: 5px;
  opacity: 0.95;
}
.cover b {
  opacity: 1;
}

.timing {
  color: gray;
}

.card-img-top {
  height: 400px;
}
</style>
