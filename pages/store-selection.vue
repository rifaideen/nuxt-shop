<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>Store Selection</h1>
        <code>Please select a store to continue.</code>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <!-- countries -->
        <div class="form-group">
          <label for="exampleFormControlSelect1">Select Country:</label>
          <select
            class="form-control"
            id="exampleFormControlSelect1"
            v-model="country"
          >
            <option value="">Select Country</option>
            <option
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
            >
              {{ country.name }}
            </option>
          </select>
        </div>

        <!-- cities  -->
        <div class="form-group" v-if="cities.length > 0">
          <label for="exampleFormControlSelect1">Select City:</label>
          <select
            class="form-control"
            id="exampleFormControlSelect1"
            v-model="city"
          >
            <option value="">Select City</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>

        <!-- stores -->
        <template v-if="stores.length > 0">
          <h3>Stores:</h3>
          <div class="row">
            <div class="col-lg-6 col-md-12 mb-2" v-for="store in stores" :key="store.id">
              <b-card
                :title="store.name"
                :img-src="store.image"
                :img-alt="store.image + ' Image'"
                img-top
                class="store"
              >
                <b-card-text>
                  {{ store.description }}
                </b-card-text>
                <b-button href="#" variant="primary" @click="selectStore(store)"
                  >Select store</b-button
                >
              </b-card>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    const { country, city } = this.$store.state;
    return {
      country: country || '',
      city: city || '',
    };
  },
  computed: {
    ...mapState(['countries', 'cities', 'stores']),
    ...mapGetters('cart', {
      cartCreated: 'created',
    }),
  },
  methods: {
    ...mapMutations(['setCities', 'setStores', 'setStore', 'setCountry', 'setCity']),
    ...mapActions(['getCities', 'getStores']),
    ...mapActions('cart', {
      deleteCart: 'delete',
    }),
    async selectStore(store) {
      this.setStore(store);

      // clear cart before redirect
      if (this.cartCreated) {
        await this.deleteCart();
      }

      this.$router.push('/');
    },
  },
  async asyncData({ store }) {
    if (store.state.countries.length === 0) {
      await store.dispatch('getCountries');
    }

    return {};
  },
  watch: {
    country(value) {
      if (value !== '') {
        this.getCities(value);
      } else {
        this.setCities([]);
      }

      this.city = '';
      this.setCountry(value);
    },
    city(value) {
      if (value !== '') {
        this.getStores(value);
      } else {
        this.setStores([]);
      }

      this.setCity(value);
      this.setStore(null);
    },
  },
};
</script>

<style scoped>
.card {
  color: #141414;
}
.store {
  max-height: 600px;
}
.store img {
  height: 300px;
}
</style>
