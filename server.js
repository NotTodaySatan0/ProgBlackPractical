const http = require('http')
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const commentData = require('./json/comments.json')

const port = process.env.port || 8080

fs.readFile('./json/posts.json', 'utf-8', (err, jsonPosts) => {
    if (err) {
        console.log(err);
    } else {
        try {
            posts = JSON.parse(jsonPosts);
        } catch (err) {
            console.log('JSON parse error posts: ', err);
            return;
        }
    }
})

fs.readFile('./json/comments.json', 'utf-8', (err, jsonComments) => {
    if (err) {
        console.log(err);
    } else {
        try {
            comments = JSON.parse(jsonComments);
        } catch (err) {
            console.log('JSON parse error comments: ', err);
            return;
        }
    }
})

app.use(require('body-parser').json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get("/posts", (req, res) => {
    res.json(posts)
})

app.get("/comments", (req, res) => {
    res.json(comments)
})

app.post("/api", (req, res) => {
    let commentInfo = req.body
    makeComment(commentInfo)
    res.console.log("test");
})

app.listen(port)

function makeComment(commentInfo) {
    fs.readFile('./json/comments.json', 'utf-8', (err, jsonComments) => {
        if (err) {
            console.log(err);
        } else {
            try {
                comments = JSON.parse(jsonComments);
                let IdNum = 1
                comments.comments.forEach(elementComment => {
                    IdNum += 1
                    commentInfo["commentId"] = IdNum
                    
                    console.log(parseInt(commentInfo["commentId"]))
                });
            } catch (err) {
                console.log('JSON parse error comments: ', err);
                return;
            }
        }
    })

    commentData["comments"].push(commentInfo)
    console.log("test success")
    let commentDataStr = JSON.stringify(commentData, null, 2)

    fs.writeFile('./json/comments.json', commentDataStr, err => {
        if (err) {
            console.log('Error adding new Comment:' + err)
        } else {
            console.log('Successfully added new comment')
            console.log(commentDataStr)
        }
    })
}