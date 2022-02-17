const express = require('express')

const Transaction=require("../controllers/Transactions.controller")

const router = express.Router()

router.post("/buyToken",Transaction.makingTransactions)
router.get("/getAllTokens",Transaction.getTokens)
router.get("/tokenById/:_id",Transaction.getTokenById)
router.delete("/deleteToken/:_id",Transaction.deleteToken)

module.exports = router