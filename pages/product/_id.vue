<template>
  <div>
    <ProductCarousel :items="product.images" image-key-attribute="original" />

    <div class="row product-container shadow mt-5 mb-4">
      <div class="col-12 mt-2 text-right">
        <FavouriteComponent
          :product-id="product.id"
          :is-favourite="product.is_favourite"
        />
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
      :see-all-link="`/related-items/${product.id}`"
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
  layout: 'navigationOnly',
  async asyncData({
    $axios, params, store, error,
  }) {
    try {
      store.commit('setNavigationTitle', null);
      const { data } = await $axios.get(`/product/${params.id}`, { params: { expand: 'images' } });

      return {
        product: data.data.product,
        related: data.data.relatedProducts,
      };
    } catch (e) {
      if (e.isAxiosError) {
        return error({
          statusCode: e.response.status,
          message: e.response.statusText,
        });
      }

      return error({
        statusCode: 400,
        message: 'Oops! It looks like the requested collection does not exists.',
      });
    }
  },
  computed: {
    favouriteClass() {
      return this.product.is_favourite ? 'is-favourite' : 'is-not-favourite';
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
