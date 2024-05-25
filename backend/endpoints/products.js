import express from "express";
import client from "../express.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const result = await client.query(`SELECT * FROM "product";`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.get("/:id", async (req, res) => {
    try {
      const sql = `SELECT * FROM "product" WHERE "product"."id" = $1;`;
      const result = await client.query(sql, [ req.params.id ]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.post("/", async (req, res) => {
    try {
      const sql = `INSERT INTO "product" ("name", "available", "cost", "type") VALUES ($1::text, $2, $3, $4)`;
      const result = await client.query(sql, [  ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.patch("/:id", async (req, res) => {
    try {
      const sql = `UPDATE "product" SET "name" = $1::text, "available" = $2, "cost" = $3 WHERE "product"."id" = $4`;
      const result = await client.query(sql, [  ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.delete("/:id", async (req, res) => {
    try {
      const sql = `DELETE FROM "product" WHERE "product"."id" = $1`;
      const result = await client.query(sql, [ req.params.id ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

export default router;