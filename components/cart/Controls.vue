<template>
  <div>
    <b-modal id="cart-controls" size="lg" hide-footer hide-header>
      <div class="">
        <div class="row mb-2">
          <div class="col-4">
            <img :src="item.image" :alt="item.name" class="img-fluid" />
          </div>
          <div class="col">
            <b class="orange-color">{{ item.name }}</b>
            <p>{{ item.description }}</p>
          </div>
          <div class="col-1" style="margin-top: -20px">
            <button class="btn" @click="$bvModal.hide('cart-controls')">
              <i class="fa fa-times-circle fa-2x"></i>
            </button>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col">
            <b> {{ item.price }} {{ item.currency }} / {{ item.unit }} </b>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col">
            <div class="input-group">
              <div class="input-group-prepend">
                <button class="btn btn-sm golden-bg" @click="decreaseQuantity">
                  <i class="fa fa-minus-circle"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control"
                disabled
                :value="quantity"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-sm golden-bg rounded-right"
                  @click="increaseQuantity"
                >
                  <i class="fa fa-plus-circle"></i>
                </button>
                <div class="col text-left mt-1 rounded-0">
                  <b>{{ item.unit }}</b>
                </div>
              </div>
              <button
                class="btn golden-bg"
                v-if="!isNew"
                @click="removeFromCart"
              >
                <i class="fa fa-trash-alt"></i> Remove
              </button>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-6">
            <b>
              Total:
              <span class="orange-color">
                {{ total }} {{ item.currency }}
              </span>
            </b>
          </div>
          <div class="col text-right">
            <button class="btn btn-primary orange-bg" @click="addToCart">
              <i class="fa fa-plus-circle"></i>
              {{ isNew ? "Add to Basket" : "Update Basket" }}
            </button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import itemMixin from '~/mixins/item';

export default {
  name: 'CartControls',
  mixins: [itemMixin],
  props: {
    item: Object,
    existingItem: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      quantity: this.existingItem ? this.item.quantity : 1,
      isNew: !this.existingItem,
    };
  },
  computed: {
    total() {
      return (this.item.price * this.quantity).toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
