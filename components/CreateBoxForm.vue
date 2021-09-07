<template>
  <div class="mt-4 light-bg-container rounded">
    <div class="p-4">
      <div v-if="errors">
        <b class="text-danger">Please clear the below errors:</b>
        <ul class="text-danger">
          <li v-for="(e, index) in errors" :key="index">{{ e }}</li>
        </ul>
      </div>

      <ValidationObserver ref="validator" v-slot="{ passes }">
        <form novalidate @submit.prevent="passes(onFormValid)" ref="form">
          <div class="form-group row">
            <b class="col col-form-label orange-color"> Choose The Box: </b>
          </div>
          <ValidationProvider
            name="Box Type"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="form-group row">
              <label class="col-2 col-form-label">Box Type:</label>
              <div class="col-10">
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="form.box_id"
                >
                  <option value="">Choose The Type</option>
                  <option
                    v-for="box in boxes"
                    :key="box.id"
                    :value="`${box.id}-${box.collection_id}`"
                  >
                    {{ box.name }}
                  </option>
                </select>
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider
            name="Flavor Type"
            rules="required|min:3"
            v-slot="{ errors }"
          >
            <div class="form-group row">
              <label class="col-2 col-form-label">Flavor Type:</label>
              <div class="col-10">
                <textarea
                  type="text"
                  class="form-control"
                  v-model="flavours_text"
                  placeholder="Choose The Flavor"
                  rows="2"
                  cols="30"
                  disabled
                >
                </textarea>
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider
            name="Extra Details"
            rules="string"
            v-slot="{ errors }"
          >
            <div class="form-group row">
              <label class="col-2 col-form-label">Extra Details:</label>
              <div class="col-10">
                <textarea
                  class="form-control"
                  v-model="form.notes"
                  cols="30"
                  rows="10"
                  placeholder="Extra Details"
                ></textarea>
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </div>
            </div>
          </ValidationProvider>
          <div class="row mb-4">
            <div class="col offset-6">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-sm golden-bg"
                    type="button"
                    @click="decreaseQuantity"
                  >
                    <i class="fa fa-minus-circle"></i>
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  :value="form.quantity"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-sm golden-bg rounded-right"
                    type="button"
                    @click="increaseQuantity"
                  >
                    <i class="fa fa-plus-circle"></i>
                  </button>
                  <div class="col text-left mt-1 rounded-0">
                    <b>Box</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing and Add button -->
          <div class="row">
            <div class="col-lg-6 offset-lg-6">
              <div class="row mb-2">
                <div class="col-6" v-if="box">
                  <b>
                    {{ cart.currency }} {{ box.price }} / Box
                  </b>
                </div>
                <div
                  class="text-right"
                  :class="box ? 'col-6' : 'offset-6 col-6'"
                >
                  <button type="submit" class="btn orange-bg">
                    <i class="fa fa-plus-circle"></i> Add to Basket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters, mapMutations } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters('cart', ['cart']),
    ...mapGetters('box', ['hasState', 'flavours', 'currentState']),
  },
  data() {
    return {
      form: {
        collection_id: '',
        box_id: '',
        price: '',
        quantity: 1,
        product_id: [],
        notes: '',
      },
      // non form attributes
      boxes: [],
      box: false,
      flavours_text: '',
      errors: null,
      skipWatch: false,
    };
  },
  watch: {
    'form.box_id': async function watchBoxId(value) {
      if (value !== '') {
        if (this.skipWatch) {
          this.skipWatch = false;
          return;
        }

        const [box, collection] = value.split('-');
        // eslint-disable-next-line prefer-destructuring
        this.box = this.boxes.filter((b) => b.id === parseInt(box))[0];
        this.form.collection_id = collection;
        const store = this.$store.state.store.id;
        const { data } = await this.$axios.get(`/products/${store}/${collection}`, {
          params: {
            fields: 'id,title,description,image',
          },
        });
        const products = data.data.map((p) => {
          const product = {
            ...p,
            selected: this.form.product_id.indexOf(p.id) > -1,
          };

          return product;
        });
        this.setProducts(products);
        const state = {
          box_id: this.form.box_id,
          notes: this.form.notes,
          boxes: this.boxes,
          box: this.box,
        };
        this.setCurrentState(state);
        setTimeout(() => {
          this.$router.push('/select-flavours');
        }, 1000);
      } else {
        this.setProducts([]);
        this.flavours_text = '';
      }
    },
  },
  async fetch() {
    // If we have state already, populate the values from state. Otherwise, fetch the data.
    if (this.hasState) {
      this.skipWatch = true;
      const { currentState } = this;
      this.form.notes = currentState.notes;
      this.form.box_id = currentState.box_id;
      this.boxes = currentState.boxes;
      this.box = currentState.box;
    } else {
      const { data } = await this.$axios.get('/boxes');
      this.boxes = data;
    }

    // set selected flavour ids and flavours_text
    if (this.flavours.length > 0) {
      const flavours = [];
      const ids = this.flavours.map((flavour) => {
        flavours.push(flavour.title);

        return flavour.id;
      });

      this.form.product_id = ids;
      this.flavours_text = `Collection of ${flavours.join(', ')}`;
    } else {
      this.form.product_id = [];
      this.flavours_text = '';
    }
  },
  methods: {
    ...mapMutations('box', ['setProducts', 'setCurrentState']),
    increaseQuantity() {
      this.form.quantity += 1;
    },
    decreaseQuantity() {
      // Min 1
      if (this.form.quantity > 1) {
        this.form.quantity -= 1;
      }
    },
    async onFormValid() {
      try {
        if (this.form.quantity < 1) {
          this.$toast('warning', 'Note', 'Please select the desired quantity');
          return;
        }

        // Prepare payload
        // eslint-disable-next-line camelcase
        const [box_id, collection_id] = this.form.box_id.split('-');
        const payload = {
          ...this.form,
          box_id,
          collection_id,
          price: this.box.price * this.form.quantity,
          cart_id: this.cart.id,
          device_id: this.$store.state.device_id,
        };
        this.errors = null;
        const { data } = await this.$axios.post('/add-custom-product-to-cart', payload);

        if (data.success) {
          // reset the store states
          this.setProducts([]);
          this.setCurrentState(false);

          this.$refs.validator.reset();
          this.$toast('success', 'Success', data.message);
          const router = this.$router;
          setTimeout(() => {
            router.push('/basket');
          }, 2000);
        } else {
          this.$toast('error', 'Error', data.message);
        }
      } catch (error) {
        // // handle server validation error
        if (error.isAxiosError && error.response.status === 400 && error.response.data.errors) {
          this.errors = error.response.data.errors;
          this.$toast('error', 'Error', 'Please clear the errors above.');
        } else {
          this.$nuxt.error(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
