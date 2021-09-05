<template>
  <div class="mb-2">
    <div class="row">
      <div class="col">
        <slot><h2>{{ title }}</h2></slot>
      </div>
      <div class="col text-right">
        <nuxt-link :to="seeAllLink">
          See All <i class="fa fa-chevron-right"></i>
        </nuxt-link>
      </div>
    </div>
    <div class="row">
      <div class="col-4 mb-2" v-for="item in items" :key="item[idAttribute]">
        <b-card class="best-seller" :img-src="item[imageAttribute]">
          <b-card-title>
            <div class="row">
              <div class="col-10">
                <nuxt-link :to="`/${baseUrl}/${item[idAttribute]}`">
                  {{ item[titleAttribute] }}
                </nuxt-link>
              </div>
              <div class="col-2" v-if="hasFavourites">
                <FavouriteComponent
                  :product-id="item[idAttribute]"
                  :is-favourite="item.is_favourite"
                />
              </div>
            </div>
          </b-card-title>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: [],
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    seeAllLink: {
      type: String,
      required: true,
    },
    idAttribute: {
      type: String,
      default: 'id',
    },
    imageAttribute: {
      type: String,
      default: 'image',
    },
    titleAttribute: {
      type: String,
      default: 'title',
    },
    baseUrl: {
      type: String,
      required: true,
    },
    hasFavourites: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
