/* eslint-disable func-names */
// eslint-disable-next-line consistent-return
export default function (context) {
  const {
    store, redirect,
  } = context;

  if (!store.getters['auth/isAuthenticated']) {
    store.commit('auth/setMessage', {
      variant: 'success',
      title: 'Success',
      description: 'Please login to continue.',
    });

    return redirect('/login');
  }
}
