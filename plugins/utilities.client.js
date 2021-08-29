export default (context, inject) => {
  const { router } = context.app;

  inject('goBack', () => {
    router.go(-1);
  });
};
