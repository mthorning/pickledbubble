import request from "../utils/request";


export async function put(req, res, next) {
  const { id, claps } = req.body
  request(
    `
      mutation AddClaps($id:ID!, $claps:Int) {
        updateArticle(input:{
          where:{id: $id},
          data:{claps: $claps} 
        }) {
          article {
            claps
          }
        }
      }
    `,
    res,
    { id, claps }
  ).then((response) => {
    if (response) {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify({ claps: response?.updateArticle?.article?.claps ?? 0 }));
    }
  });
}
