import request from "../../utils/request";
import marked from "marked";

export function get(req, res, next) {
  // // the `slug` parameter is available because
  // // this file is called [slug].json.js
  const { slug } = req.params;
  request(
    `
        articles(where: { slug: "${slug}" }) {
          title
          body
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

      res.end(JSON.stringify({ ...article, body: marked(article.body) }));
    }
  });
}
