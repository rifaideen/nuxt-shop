<template>
  <div>
    <h1 @click="$goBack">
      <i class="fa fa-chevron-left"></i>
      {{ collection.title }}
    </h1>
    <ListProduct
      :product="product"
      v-for="product in products"
      :key="product.id"
      @add-to-basket="onAddToBasket"
      @increase-quantity="onIncreaseQuantity"
      @decrease-quantity="onDecreaseQuantity"
      :ref="`ListProduct-${product.id}`"
    />
    <CartControls
      :item="selectedItem"
      :existing-item="existingItem"
      v-if="selectedItem !== null"
      @item-updated="onItemUpdated"
      @item-deleted="onItemUpdated"
      :key="'selected-item-' + selectedItem.product_id"
    />
  </div>
</template>

<script>

export default {
  name: 'Collection-Details',
  middleware: ['store-selection'],
  data() {
    return {
      selectedItem: null,
      existingItem: false,
    };
  },
  // eslint-disable-next-line consistent-return
  async asyncData({
    params, store, $axios, error,
  }) {
    try {
      const storeID = store.state.store.id;
      const collectionId = params.id;
      const collection = $axios.get(`collections/${collectionId}`);
      const products = $axios.get(`products/${storeID}/${collectionId}`);
      const items = [collection, products];

      if (store.getters['cart/created']) {
        const cart = store.dispatch('cart/get');
        items.push(cart);
      }

      const results = await Promise.all(items);

      return {
        id: collectionId,
        collection: results[0].data.data,
        products: results[1].data.data,
        links: results[1].data.links,
      };
    } catch (e) {
      error(e);
    }
  },
  methods: {
    /**
     * Make it non existing item, manually construct selected item
     * and display the modal.
     */
    onAddToBasket(product) {
      this.existingItem = false;
      const item = {
        name: product.title,
        product_id: product.id,
        ...product,
      };
      this.selectedItem = item;
      this.showModal();
    },
    // handles increase-quantity event from CartControls component.
    onIncreaseQuantity(item) {
      this.existingItem = true;
      this.selectedItem = item;
      this.showModal();
    },
    // handles decrease-quantity event from CartControls component.
    onDecreaseQuantity(item) {
      this.existingItem = true;
      this.selectedItem = item;
      this.showModal();
    },
    showModal() {
      this.$nextTick(function () {
        this.$bvModal.show('cart-controls');
      });
    },
    // handles item-updated and item-deleted event from CartControls component.
    async onItemUpdated(productId) {
      this.selectedItem = null;
      this.$bvModal.hide('cart-controls');
      // get updated cart details
      await this.$store.dispatch('cart/get');

      // We have added reference to each ListProduct with their product id.
      // call the component by the reference and ask it to refresh it's data.
      this.$refs[`ListProduct-${productId}`][0].refresh();
    },
  },
};
</script>

<style scoped>
</style>
