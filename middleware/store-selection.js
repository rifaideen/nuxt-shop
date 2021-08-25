/* eslint-disable func-names */
// eslint-disable-next-line consistent-return
export default function (context) {
  const { store, redirect } = context;

  if (!store.state.store) {
    return redirect('/store-selection');
  }
}
