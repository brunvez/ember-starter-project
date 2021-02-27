import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    },
  },

  model(params) {
    return this.store.query('question', { page: {
        number: params.page,
        size: params.size
      }
    });
  },
});
