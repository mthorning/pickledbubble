import request from "../../utils/request";
import marked from "marked";

export interface Data {
  article: {
    id: string,
    title: string,
    body: string,
    claps: number
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

      const data: Data = { article: { ...article, body: marked(article.body) } }

      res.end(JSON.stringify(data));
    }
  });
}
