<template>
  <div class="mt-4">
    <ListProduct
      :product="item"
      v-for="item in items"
      :key="item.id"
      :ref="`ListProduct-${item.id}`"
      :has-favourite="false"
      title-attribute="name"
    >
      <template v-slot:price-and-controls="{ product }">
        <SavedItemControls
          :item="product"
          @move-saved-item="onMoveItem"
          @remove-saved-item="onRemoveItem"
        />
      </template>
    </ListProduct>
    <div class="min-height-container text-center" v-if="!items || items.length === 0">
      No saved items found. <br>
      <button class="btn btn-danger mt-2" @click="$router.push('/best-sellers')">
        Start Order
      </button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapActions, mapGetters } from 'vuex';

export default {
  middleware: ['store-selection', 'authenticated'],
  layout: 'navigationOnly',
  async asyncData({ store, $axios, error }) {
    try {
      store.commit('setNavigationTitle', 'Saved Items');
      const storeID = store.state.store.id;
      const { data } = await $axios.get(`/saved-items/${storeID}`);

      return {
        items: data.data,
      };
    } catch (e) {
      return error(e);
    }
  },
  computed: {
    ...mapGetters('cart', {
      cartId: 'id',
      created: 'created',
    }),
  },
  methods: {
    ...mapActions('cart', ['create', 'removeSavedItem', 'moveToCart']),
    async onMoveItem({ id }) {
      try {
        if (!this.created) {
          await this.create();
        }

        const { data } = await this.moveToCart({ item: id, cart: this.cartId });

        if (data.success) {
          this.$toast('success', 'Success', data.message);
          setTimeout(() => this.$nuxt.refresh(), 1500);
        } else {
          this.$toast('danger', 'Error', data.message);
        }
      } catch (e) {
        if (e.isAxiosError && e.response.status === 404) {
          this.$toast('danger', 'Error', 'This item no longer exists.');
        } else {
          this.$nuxt.error(e);
        }
      }
    },
    async onRemoveItem({ id }) {
      try {
        const { data } = await this.removeSavedItem(id);

        if (data.success) {
          this.$toast('success', 'Success', data.message);
          setTimeout(() => this.$nuxt.refresh(), 1500);
        } else {
          this.$toast('danger', 'Error', data.message);
        }
      } catch (e) {
        if (e.isAxiosError && e.response.status === 404) {
          this.$toast('danger', 'Error', 'This item no longer exists.');
        } else {
          this.$nuxt.error(e);
        }
      }
    },
  },
};
</script>

<style scoped>
.form-control:disabled {
  background: white;
}
.min-height-container {
  min-height: 500px;
}
</style>
