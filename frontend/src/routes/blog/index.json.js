import request from "../../utils/request";

export function get(req, res) {
  request(
    `
        articles(sort: "created_at:desc", where: {published: true}) {
            slug
            title
            description
        }
    `,
    res
  ).then((response) => {
    if (response) {
      const { articles } = response;
      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(articles));
    }
  });
}
