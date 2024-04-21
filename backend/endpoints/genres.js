import express from "express";
import client from "../express.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const result = await client.query(`SELECT * FROM "genre";`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.get("/:id", async (req, res) => {
    try {
      const sql = `SELECT * FROM "genre" WHERE "genre"."id" = $1;`;
      const result = await client.query(sql, [ req.params.id ]);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.get("/:id/products", async (req, res) => {
    try {
      const sql = `SELECT "product" FROM "genre" JOIN "product" ON "genre"."id" = "product"."genre_id" WHERE "genre"."id" = $1;`;
      const result = await client.query(sql, [ req.params.id ]);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.post("/", async (req, res) => {
    try {
      const sql = `INSERT INTO "genre" ("name") VALUES ($1::text)`;
      const result = await client.query(sql, [  ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.patch("/:id", async (req, res) => {
    try {
      const sql = `UPDATE "genre" SET "name" = $1::text WHERE "genre"."id" = $2`;
      const result = await client.query(sql, [  ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
router.delete("/:id", async (req, res) => {
    try {
      const sql = `DELETE FROM "genre" WHERE "genre"."id" = $1`;
      const result = await client.query(sql, [ req.params.id ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

export default router;