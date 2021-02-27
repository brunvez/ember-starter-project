import DS from 'ember-data';

export default class ApplicationSerializer extends DS.JSONAPISerializer {

  normalizeQueryResponse(store, clazz, payload) {
    const result = super.normalizeQueryResponse(...arguments);
    result.meta = result.meta || {};

    if (payload.links) {
      result.meta.pagination = this.createPageMeta(payload.links);
    }

    return result;
  }

  createPageMeta(data) {
    return Object.keys(data).reduce((meta, type) => {
      const link = data[type];
      meta[type] = {};
      let a = document.createElement('a');
      a.href = link;

      a.search.slice(1).split('&').forEach(pairs => {
        const [param, value] = pairs.split('=');

        if (param == 'page%5Bnumber%5D') {
          meta[type].number = parseInt(value);
        }
        if (param == 'page%5Bsize%5D') {
          meta[type].size = parseInt(value);
        }

      });
      a = null;

      return meta;
    }, {});
  }
}
