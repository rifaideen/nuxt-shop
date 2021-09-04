<template>
  <div class="delivery-location rounded">
    <div class="row mb-2" @click="navigate">
      <div class="col-12 mt-2 mb-2">
        <div class="row">
          <div class="col-11">
            <b class="title">{{ isGiftRecipient ? location.full_name : location.name }}</b>
          </div>
          <div class="col-1 text-center">
            <b class="title"><i class="fa fa-chevron-right"></i></b>
          </div>
        </div>
      </div>
      <div class="col-12 mt-2 mb-1">
        <b>Country:</b> {{ location.country.name }}
      </div>
      <div class="col-12 mt-2 mb-1"><b>City:</b> {{ location.city }}</div>
      <div class="col-12 mt-2 mb-1"><b>Address:</b> {{ location.address }}</div>
    </div>
    <div class="row">
      <div class="offset-11 col-1 mb-2 text-center">
        <button class="btn btn-sm btn-danger" @click="confirmDelete">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapMutations } from 'vuex';

export default {
  props: ['location', 'action', 'isGiftRecipient'],
  methods: {
    ...mapMutations('cart', ['setDeliveryLocation', 'setGiftRecipient']),
    navigate() {
      if (this.action === 'edit') {
        const route = this.isGiftRecipient ? 'gift-recipients' : 'delivery-locations';
        this.$router.push(`/${route}/edit/${this.location.id}`);
      } else {
        if (this.isGiftRecipient) {
          this.setGiftRecipient(this.location);
        } else {
          this.setDeliveryLocation(this.location);
        }

        this.$router.push('/checkout');
      }
    },
    confirmDelete() {
      this.$bvModal.msgBoxConfirm('Are you sure?')
        .then((value) => {
          if (value === true) {
            this.$emit('delete', this.location);
          }
        });
    },
  },
};
</script>

<style scoped>
</style>
