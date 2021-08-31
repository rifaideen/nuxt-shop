/**
 * This is useful if we are displaying the item quantity controls in modal popup.
 *
 * This mixin expects the implemented component data to contain the below keys
 * { selectedItem: null, existingItem: false}
 *
 * This is used internall by this mixin.
 */
export default {
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
