const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile")["development"]);

router.get("/rooms", async function(req, res) {
    const page = !req.query.page ? 1 : req.query.page;
    const limit = 20;
    const offset = (page - 1) * limit;

    const rooms = await knex("rooms").select("*")
                    .orderBy("updated_at", "desc")
                    .limit(limit)
                    .offset(offset);
    
    const { total } = await knex("rooms")
                        .count("* as total")
                        .first();
    const totalPages = Math.ceil(total / limit);

    res.setHeader("Content-Type", "application/json");
    res.send({
        rooms,
        page,
        total_pages: totalPages
    });
});

module.exports = router;