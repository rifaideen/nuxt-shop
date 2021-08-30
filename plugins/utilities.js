/* eslint-disable no-mixed-operators */
export default (context, inject) => {
  const { router } = context.app;

  inject('goBack', () => {
    router.go(-1);
  });

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-bitwise
      const r = Math.random() * 16 | 0;
      // eslint-disable-next-line no-bitwise
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  inject('uid', uuidv4);

  function toast(variant, title, content) {
    this.$bvToast.toast(content, {
      title,
      variant,
      solid: true,
    });
  }

  inject('toast', toast);
};
