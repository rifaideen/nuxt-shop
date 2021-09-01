import { extend } from 'vee-validate';

import {
  // eslint-disable-next-line camelcase
  confirmed,
  email,
  min,
  required,
} from 'vee-validate/dist/rules';

extend('confirmed', {
  ...confirmed,
});

extend('email', {
  ...email,
});

extend('min', {
  ...min,
});

extend('required', {
  ...required,
});

extend('string', {
  validate: (value) => /^[a-zA-Z0-9\s,+-]+$/.test(value),
});
