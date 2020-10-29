import request from "../../utils/request";
import marked from "marked";

export interface Data {
  article: {
    id: string,
    title: string,
    body: string,
    claps: number,
    difficulty: string,
    timeToComplete: number,
    requiredItems: string
  }
}

export function get(req, res, next) {
  const { slug } = req.params;
  request(
    `
        {
            articles(where: { slug: "${slug}" }) {
            id
            title
            body
            claps
            difficulty
            timeToComplete
            requiredItems
          }
        }
    `,
    res
  ).then((response) => {
    if (response) {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      const {
        articles: [article],
      } = response;

      const data: Data = { article: { ...article, requiredItems: marked(article.requiredItems), body: marked(article.body) } }

      res.end(JSON.stringify(data));
    }
  });
}
