import request from "../../utils/request";

export interface Tag {
  name: string,
  category: string
}

export interface Article {
  category: string,
  slug: string,
  title: string,
  difficulty: number,
  claps: number,
  coverImage: {
    url: string,
    alternativeText: string
  }
}

export interface Data {
  articles: Article[],
  tags: {
    [category: string]: Tag[]
  }
}

export function get(req, res) {
  const tags = req.query?.tags?.split(',') ?? []

  request(
    `
        {
          articlesByTag(${tags.length ? `tags: ${JSON.stringify(tags)}, ` : ''} sort: "created_at:desc", where: {published: true}) {
              slug
              title
              difficulty
              claps
              themeTags: tags(where: { category: "theme" }, sort: "name:asc") {
                name
              }
              typeTags: tags(where: { category: "type" }, sort: "name:asc") {
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

      const byCategory = category => response.articlesByTag.reduce((tags: Tag[], article: Article) => {
        const result = [...tags, ...article[category]]
        return result
      }, [])

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
        tags: {
          type: byCategory('typeTags'),
          theme: byCategory('themeTags')
        }
      }
      res.end(JSON.stringify(data));
    }
  });
}
