<template>
  <div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <b>Enter Card Details:</b>
      </div>
      <div class="col-6">
        <div class="form-group">
          <div id="payment-form"></div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12 offset-lg-4 text-danger">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
    };
  },
  mounted() {
    if (this.$stripe) {
      const elements = this.$stripe.elements();
      const card = elements.create('card', {
        style: {
          base: {
            iconColor: '#c4f0ff',
            color: '#141414',
            fontWeight: '500',
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
              color: '#141414',
            },
            '::placeholder': {
              color: '#f85806',
              fontWeight: 'bold',
            },
          },
          invalid: {
            iconColor: '#f85806',
            color: '#f85806',
          },
        },
      });
      // Add an instance of the card Element into the `card-element` <div>
      card.mount('#payment-form');
      const vm = this;
      card.on('change', (event) => {
        if (event.error) {
          vm.error = event.error.message;
          console.log(event.error.message);
        } else {
          vm.error = '';
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
