'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async findByTag(params, populate) {
    const { tags, where = {}, sort = [] } = params

    if (tags?.length) {
      const dbTags = await strapi.query('tags').model.find({ name: tags }, { _id: 1 })
      console.log(tags, dbTags)
      return strapi.query('articles').model
        .find(where).where('tags').all(dbTags)
        .sort(JSON.stringify(`{${sort}}`))
    }

    return strapi.query('articles')
      .find({ ...where, _sort: sort })
  },
};
