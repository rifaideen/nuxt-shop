// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('cart', [
      'create', 'add', 'updateCustomProduct',
      'removeItem', 'removeCustomItem', 'saveForLater',
    ]),
    increaseQuantity() {
      const { unit_slug: unit } = this.item;
      const isKg = (['kg', 'kilogram'].indexOf(unit) > -1);
      let quantity = 0;

      if (this.quantity < 1) {
        quantity = isKg ? 0.1 : 1;
      } else {
        quantity = isKg ? 0.5 : 1;
      }

      this.quantity = parseFloat(Number(parseFloat(this.quantity) + quantity).toFixed(1));
    },
    decreaseQuantity() {
      const { unit_slug: unit } = this.item;
      const isKg = (['kg', 'kilogram'].indexOf(unit) > -1);
      let quantity = 0;

      if (this.quantity <= 1 && this.quantity > 0) {
        quantity = isKg ? 0.1 : 1;
      } else if (this.quantity > 1) {
        quantity = isKg ? 0.5 : 1;
      }

      this.quantity = parseFloat(Number(parseFloat(this.quantity) - quantity).toFixed(1));
    },
    async updateQuantity() {
      const { item, quantity } = this;

      if (quantity <= 0) {
        this.$toast('warning', 'Note', 'Please select the desired quantity');
        return;
      }

      try {
        let response = null;

        // handle different product type
        if (item.product_type !== 'product') {
          response = await this.updateCustomProduct({
            customized_product_id: item.customized_product_id,
            quantity,
            price: item.price * item.quantity,
          });
        } else {
          response = await this.add({
            product_id: item.product_id,
            quantity,
          });
        }

        if (response.data.success) {
          this.isNew = false;
          this.$toast('success', 'Success', response.data.message);
          this.$emit('item-updated');
        }
      } catch (error) {
        this.$nuxt.error(error);
      }
    },
    async addToCart() {
      if (this.quantity <= 0) {
        this.$toast('warning', 'Note', 'Please select the desired quantity');
        return;
      }

      try {
        if (!this.cartCreated) {
          await this.create();
        }

        // eslint-disable-next-line camelcase
        const { product_id } = this.item;

        const { data } = await this.add({
          product_id,
          quantity: this.quantity,
        });

        if (data.success) {
          this.isNew = false;
          this.$toast('success', 'Success', data.message);
          this.$emit('item-updated', product_id);
        }
      } catch (error) {
        this.$nuxt.error(error);
      }
    },
    async removeFromCart() {
      try {
        const { item } = this;
        // handle product and custom product deletion
        const { data } = item.product_id
          ? await this.removeItem(item.product_id)
          : await this.removeCustomItem(item.id);

        // reset item status
        if (data && data.success) {
          this.$toast('success', 'Success', data.message);
          this.$emit('item-deleted', item.product_id);
        } else {
          this.$toast('danger', 'Note', 'Unbale to remove item');
        }
      } catch (error) {
        this.$nuxt.error(error);
      }
    },
    async saveItem() {
      // check if the user is authenticated
      if (!this.$store.getters['auth/isAuthenticated']) {
        this.$toast('info', 'Info', 'Please login to perform this action.');

        return;
      }

      try {
        const { data } = await this.saveForLater(this.item.id);

        // reset item status
        if (data && data.success) {
          this.$toast('success', 'Success', data.message);
          setTimeout(() => this.$emit('item-saved-for-later'), 1500);
        } else {
          this.$toast('danger', 'Note', 'Unbale to save item');
        }
      } catch (error) {
        this.$nuxt.error(error);
      }
    },
  },
  computed: {
    ...mapGetters(
      {
        cartId: 'cart/id',
        cartCreated: 'cart/created',
      },
    ),
    total() {
      return (this.product.price * this.quantity).toFixed(2);
    },
  },
};
