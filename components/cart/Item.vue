<template>
  <div>
    <div class="row">
      <div class="col-3">
        <img :src="item.image" :alt="item.name" class="img-fluid">
      </div>
      <div class="col-9 mt-2">
        <nuxt-link :to="`/product/${item.product_id}`" v-if="item.product_type === 'product'">
          <b>{{ item.name }}</b>
        </nuxt-link>
        <b v-else>{{ item.name }}</b>
        <p>{{ item.description }}</p>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-lg-6 offset-lg-6 col-sm-12">
        <div class="input-group">
          <div class="input-group-prepend">
            <button class="btn btn-sm golden-bg">
              <i class="fa fa-minus-circle"></i>
            </button>
          </div>
          <input type="text" class="form-control" disabled :value="item.quantity" />
          <div class="input-group-append">
            <button
              class="btn btn-sm golden-bg rounded-right"
            >
              <i class="fa fa-plus-circle"></i>
            </button>
            <div class="col text-left mt-1 rounded-0">
              <b> {{ item.unit }} </b>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-lg-6">
        {{ item.price }} AED
      </div>
      <div class="col-lg-6 text-center">
        <button class="btn golden-bg" >
          <i class="fa fa-trash-alt"></i> Remove
        </button>

        <button class="btn golden-bg" >
          <i class="fa fa-trash-alt"></i> Save For Later
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
};
</script>

<style lang="scss" scoped>
</style>
