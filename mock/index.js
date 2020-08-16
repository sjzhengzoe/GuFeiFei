const express = require("express")
const app = express()

app.get("/api/info", (req, res) => {
  res.json({
    title: "sujie",
    content: "today is a good day",
  })
})
app.listen("8082")
