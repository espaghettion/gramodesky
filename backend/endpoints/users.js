import express from "express";
import client from "../express.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const result = await client.query(`SELECT * FROM "user";`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.get("/:id", async (req, res) => {
    try {
      const sql = `SELECT * FROM "user" WHERE "user"."id" = $1;`;
      const result = await client.query(sql, [ req.params.id ]);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.get("/:id/orders", async (req, res) => {
    try {
      const sql = `SELECT "order" FROM "user" JOIN "order" ON "user"."id" = "order"."user_id" WHERE "user"."id" = $1;`;
      const result = await client.query(sql, [ req.params.id ]);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.post("/", async (req, res) => {
    try {
      const sql = `INSERT INTO "user" ("username") VALUES ($1::text)`;
      const result = await client.query(sql, [ req.body.username ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.patch("/:id", async (req, res) => {
    try {
      const sql = `UPDATE "user" SET "username" = $1::text WHERE "user"."id" = $2`;
      const result = await client.query(sql, [ req.body.username, req.params.id ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.delete("/:id", async (req, res) => {
    try {
      const sql = `DELETE FROM "user" WHERE "user"."id" = $1`;
      const result = await client.query(sql, [ req.params.id ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

export default router;