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

export interface Data {
  articles: Article[]
}

export function get(req, res) {
  request(
    `
        {
          articles(sort: "created_at:desc", where: {published: true}) {
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
        articles: response.articles.map(({ coverImage, ...article }) => ({
          ...article,
          ...(coverImage ? {
            coverImage: {
              url: coverImage?.formats?.medium?.url,
              alternativeText: coverImage?.alternativeText
            }
          } : {})
        }))
      }
      res.end(JSON.stringify(data));
    }
  });
}
