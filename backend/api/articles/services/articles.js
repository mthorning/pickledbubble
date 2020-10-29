'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async findByTag(params, populate) {
    const { tags: name, where = {}, sort = [] } = params

    const tags = name?.length ? await strapi.query('tags').find({ name }) : []
    return strapi.query('articles')
      .find({ ...(tags.length ? { tags } : {}), ...where, _sort: sort })
  },
};
