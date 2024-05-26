import express from "express";
import client from "../express.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const result = await client.query(`SELECT * FROM "artist";`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.get("/:id", async (req, res) => {
    try {
      const sql = `SELECT * FROM "artist" WHERE "artist"."id" = $1;`;
      const result = await client.query(sql, [ req.params.id ]);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.get("/:id/products", async (req, res) => {
    try {
      const sql = `SELECT "product" FROM "artist" JOIN "product" ON "artist"."id" = "product"."artist_id" WHERE "artist"."id" = $1;`;
      const result = await client.query(sql, [ req.params.id ]);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.post("/", async (req, res) => {
  const select = `SELECT "name" FROM "artist" WHERE "name" = $1::text`
  if((await client.query(select, [ req.body.name ])).rows.length > 0){
    return res.status(400).send('Artist already exists');
  }
    try {
      const sql = `INSERT INTO "artist" ("name") VALUES ($1::text)`;
      const result = await client.query(sql, [ req.body.name ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.patch("/:id", async (req, res) => {
  const select = `SELECT "name" FROM "artist" WHERE "name" = $1::text`
  if((await client.query(select, [ req.body.name ])).rows.length > 0){
    return res.status(400).send('Artist already exists');
  }
    try {
      const sql = `UPDATE "artist" SET "name" = $1::text WHERE "artist"."id" = $2`;
      const result = await client.query(sql, [ req.body.name, req.params.id ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.delete("/:id", async (req, res) => {
    try {
      const sql = `DELETE FROM "artist" WHERE "artist"."id" = $1`;
      const result = await client.query(sql, [ req.params.id ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


export default router;