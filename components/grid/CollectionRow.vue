<template>
  <div class="mb-2">
    <div class="row">
      <div class="col">
        <h2>{{ title }}</h2>
      </div>
      <div class="col text-right">
        <nuxt-link :to="seeAllLink">
          See All <i class="fa fa-chevron-right"></i>
        </nuxt-link>
      </div>
    </div>
    <div class="row">
      <div class="col-4 mb-2" v-for="collection in collections" :key="collection[idAttribute]">
        <nuxt-link :to="`/collections/${collection.id}`">
          <b-card class="best-seller" :img-src="collection[imageAttribute]">
            <b-card-title>
              <div class="row">
                <div class="col-10">{{ collection[titleAttribute] }}</div>
                <div class="col-2 text-success">
                  <i class="fa fa-star"></i> &nbsp;
                </div>
              </div>
            </b-card-title>
          </b-card>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    seeAllLink: {
      type: String,
      required: true,
    },
    collections: {
      type: [],
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
  },
};
</script>

<style lang="scss" scoped>
</style>
