module.exports = {
  query: `
    articlesByTag(tags: [String], sort: String, where: JSON): [Articles]!
  `,
  resolver: {
    Query: {
      articlesByTag: {
        description: 'Return articles which are tagged with all provided tags',
        resolverOf: 'application::articles.articles.find',
        resolver: async (obj, options, ctx) => {
          const articles = await strapi.services.articles.findByTag(options)

          return articles
        },
      },
    },
  },
};