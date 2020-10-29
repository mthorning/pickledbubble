import request from "../../utils/request";

interface Article {
  category: string,
  slug: string,
  title: string,
  difficulty: number,
  tags: string[]
  claps: number,
  coverImage: {
    url: string,
    alternativeText: string
  }
}

export interface Tag {
  name: string,
  category: string
}

export interface Data {
  articles: Article[],
  categorisedTags: Tag[][]
}

export function get(req, res) {
  const tags = req.query?.tags?.split(',') ?? []

  request(
    `
        {
          typeTags: tags(where:{ category: "type" }, sort: "name:asc") {
            name
            category
          }
          themeTags: tags(where:{ category: "theme" }, sort: "name:asc") {
            name
            category
          }
          articlesByTag(${tags.length ? `tags: ${JSON.stringify(tags)}, ` : ''} sort: "created_at:desc", where: {published: true}) {
              slug
              title
              difficulty
              claps
              tags {
                name
              }
              coverImage {
                formats
                alternativeText
              }
          }
        }
    `,
    res
  ).then(response => {
    if (response) {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      const data: Data = {
        articles: response.articlesByTag.map(({ coverImage, ...article }) => ({
          ...article,
          ...(coverImage ? {
            coverImage: {
              url: coverImage?.formats?.medium?.url,
              alternativeText: coverImage?.alternativeText
            }
          } : {})
        })),
        categorisedTags: [response.typeTags, response.themeTags]
      }
      res.end(JSON.stringify(data));
    }
  });
}
