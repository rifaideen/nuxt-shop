<template>
  <div>
    <!-- Price and Quantity -->
    <div class="row mb-2">
      <div class="col-3 offset-lg-7">
        <input
          type="text"
          class="form-control text-center"
          disabled
          :value="item.quantity"
        />
      </div>
      <div class="col-2">
        <input
          type="text"
          class="form-control text-center"
          disabled
          :value="item.unit"
        />
      </div>
    </div>
    <!-- Controls -->
    <div class="row mb-2">
      <div class="col-lg-6 col-sm-12">
        <b> {{ item.price }} {{ item.currency }} </b>
      </div>
      <div class="col-lg-6 text-right col-sm-12">
        <button class="btn golden-bg" @click="$emit('remove-saved-item', item)">
          <i class="fa fa-trash-alt"></i> Remove
        </button>
        <button class="btn btn-danger" @click="$emit('move-saved-item', item)">
          <i class="fa fa-plus-circle"></i> Move to Basket
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

<style scoped>
</style>
