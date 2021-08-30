<template>
  <div>
    <div
      class="row product-container shadow mb-4"
      v-for="product in products"
      :key="product.id"
    >
      <div class="col-12 text-success text-right">
        <i class="fa fa-star"></i>
      </div>
      <div class="col-lg-3 col-sm-4">
        <img
          :src="product.image"
          :alt="product.title"
          class="rounded-lg img-fluid"
        />
      </div>
      <div class="col-lg-9 col-sm-8">
        <nuxt-link :to="`/product/${product.id}`">
          <b>{{ product.title }}</b>
        </nuxt-link>
        <p>{{ product.description }}</p>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-lg-9 col-sm-12">
            <b>
              {{ product.price }} {{ product.currency }} / {{ product.unit }}
            </b>
          </div>
          <div class="col-lg-3 text-center col-sm-12">
            <button class="btn btn-primary add-to-cart-btn">
              <i class="fa fa-plus-circle"></i> Add to Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products-List',
  props: ['products'],
};
</script>

<style lang="scss" scoped>
</style>
