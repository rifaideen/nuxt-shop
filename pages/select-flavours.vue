<template>
  <div class="mt-2">
    <!-- summary -->
    <div class="row mt-2 mb-2">
      <div class="col-lg-9">
        <span v-if="flavoursCount">
          {{ flavoursCount }} {{ flavoursCount > 1 ? "items" : "item" }}
        </span>
        <span v-else>No items</span>
        added to the box
      </div>
      <div class="col-lg-3 text-lg-right">
        Select All
        <input
          type="checkbox"
          :checked="flavoursCount === products.length"
          @click="selectAllFlavours($event.target.checked)"
        />
      </div>
    </div>
    <!-- flavours list -->
    <div class="row mb-2" v-for="product in products" :key="product.id">
      <div class="col-4">
        <img class="img-thumbnail" :src="product.image" />
      </div>
      <div class="col-7">
        <b>{{ product.title }}</b>
        <p>{{ product.description }}</p>
      </div>
      <div class="col-1 text-right">
        <input
          type="checkbox"
          :checked="product.selected"
          @click="toggleProductSelection(product)"
        />
      </div>
    </div>

    <div class="row p-4 light-bg-container fixed-bottom" v-show="flavoursCount > 0">
      <div class="offset-lg-3 col-lg-2 col-sm-6 text-center mb-2">
        <button
          type="button"
          class="btn btn-block golden-bg"
          @click="$router.go(-1)"
        >
          Cancel
        </button>
      </div>
      <div class="col-lg-2 col-sm-6 text-center">
        <button
          type="submit"
          class="btn btn-block orange-bg"
          @click="$router.push('/create-box')"
        >
          Save ({{ flavoursCount }})
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  mapState, mapMutations, mapGetters, mapActions,
} from 'vuex';

export default {
  layout: 'navigationOnly',
  middleware: ['store-selection'],
  computed: {
    ...mapState('box', ['products']),
    ...mapGetters('box', ['flavoursCount']),
  },
  asyncData({ store }) {
    let title = 'Select Flavours';

    if (store.getters['box/hasState'] && store.state.box.currentState.box) {
      title = store.state.box.currentState.box.name;
    }

    store.commit('setNavigationTitle', title);
  },
  methods: {
    ...mapMutations('box', ['toggleProductSelection']),
    ...mapActions('box', ['selectAllFlavours']),
  },
};
</script>

<style lang="scss" scoped>
</style>
