import express from "express";
import client from "../express.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const result = await client.query(`SELECT * FROM "order";`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.get("/:id", async (req, res) => {
    try {
      const sql = `SELECT * FROM "order" WHERE "order"."id" = $1;`;
      const result = await client.query(sql, [ req.params.id ]);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.post("/", async (req, res) => {
    try {
      const sql = `INSERT INTO "order" ("user_id", "cost") VALUES ($1, $2)`;
      const result = await client.query(sql, [ req.body.user_id, req.body.cost ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.patch("/:id", async (req, res) => {
    try {
      const sql = `UPDATE "order" SET "cost" = $1 WHERE "order"."id" = $2`;
      const result = await client.query(sql, [  ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.delete("/:id", async (req, res) => {
    try {
      const sql = `DELETE FROM "order" WHERE "order"."id" = $1`;
      const result = await client.query(sql, [ req.params.id ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

export default router;