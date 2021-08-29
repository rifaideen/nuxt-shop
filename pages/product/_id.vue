<template>
  <div>
    <ProductCarousel :items="product.images" image-key-attribute="original" />

    <div class="row product-container shadow mt-5 mb-2">
      <div class="col-12 mt-2 text-success text-right">
        <i class="fa fa-star"></i>
      </div>
      <div class="col-12">
        <b class="orange-color">{{ product.title }}</b>
        <p>
          {{ product.description }}
        </p>
      </div>
    </div>

    <GridItemsRow
      :items="related"
      see-all-link="/related-items"
      base-url="product"
    >
      Related Items
    </GridItemsRow>

    <LayoutCartMenu :product="product" />
  </div>
</template>

<script>
export default {
  middleware: ['store-selection'],
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/product/${params.id}`, { params: { expand: 'images' } });

    return {
      product: data.data.product,
      related: data.data.relatedProducts,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
