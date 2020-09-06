// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { crawlURL } from "../../lib/api";

/*
export default function handler(req, res) {
  const {
    body: { urlToCrawl },
    method,
  } = req
  const result = await fetch(urlToCrawl)
  res.statusCode = 200
  res.json(result)
}*/
async function handler(req, res) {
  const {
    body: { urlToCrawl },
    method,
  } = req;

  const data = await crawlURL(decodeURI(req.body.replace("\"",'')));
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

export default handler
