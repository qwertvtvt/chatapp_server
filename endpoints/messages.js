const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile")["development"]);

router.get("/messages/:roomId", async function(req, res) {
    const page = !req.query.page ? 1 : req.query.page;
    const limit = 20;
    const offset = (page - 1) * limit;
    const roomId = req.params.roomId;
    
    const messages = await knex("chats").select("*")
                        .where("roomId", roomId)
                        .orderBy("post_at", "desc")
                        .limit(limit)
                        .offset(offset);
    const { total } = await knex("chats")
                        .count("* as total")
                        .where("roomId", roomId)
                        .first();
    const totalPages = Math.ceil(total / limit);    
    
    res.setHeader("Content-Type", "application/json");
    res.send({
        messages,
        page,
        total_pages: totalPages
    });
});

module.exports = router;