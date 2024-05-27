import express from "express";
import client from "../express.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const result = await client.query(`SELECT * FROM "genre" WHERE "deleted" = false;`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.get("/:id", async (req, res) => {
    try {
      const sql = `SELECT * FROM "genre" WHERE "id" = $1 "deleted" = false;`;
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
  const select = `SELECT "name" FROM "genre" WHERE "name" = $1::text`
  if((await client.query(select, [ req.body.name ])).rows.length > 0){
    return res.status(400).send('Genre already exists');
  }
    try {
      const sql = `INSERT INTO "genre" ("name", "deleted") VALUES ($1::text, false)`;
      const result = await client.query(sql, [ req.body.name ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.patch("/:id", async (req, res) => {
  const select = `SELECT "name" FROM "genre" WHERE "name" = $1::text`
  if((await client.query(select, [ req.body.name ])).rows.length > 0){
    return res.status(400).send('Genre already exists');
  }
    try {
      const sql = `UPDATE "genre" SET "name" = $1::text WHERE "id" = $2`;
      const result = await client.query(sql, [ req.body.name, req.params.id ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.delete("/:id", async (req, res) => {
    try {
      const sql = `UPDATE "genre" SET "deleted" = true WHERE "id" = $1`;
      const result = await client.query(sql, [ req.params.id ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


export default router;