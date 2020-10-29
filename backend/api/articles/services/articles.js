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

      const articleIds = await strapi.query('articles').model
        .find().where('tags').all(dbTags)

      return strapi.query('articles')
        .find({ id: articleIds, ...where, _sort: sort })
    }

    return strapi.query('articles')
      .find({ ...where, _sort: sort })
  },
};
