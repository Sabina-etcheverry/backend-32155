const { Router } = require('express')
const path = require('path')
const filePath = path.resolve(__dirname, '../../public/index.html');

const router = Router();
console.log(filePath)

router.get("/", (req, res) => {
    res.sendFile(filePath)
})

module.exports = router