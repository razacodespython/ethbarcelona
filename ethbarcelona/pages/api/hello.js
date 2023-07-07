// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log("message received")
  const body = req.body;
  console.log(body)
  const response={"message":"hi back"}
  res.send(response)

}
