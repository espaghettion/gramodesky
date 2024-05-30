import express from "express";
import client from "../express.js";
import {authorize} from "../middleware/oauth.js";

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
      const sql = `SELECT * FROM "genre" WHERE "id" = $1 AND "deleted" = false;`;
      const result = await client.query(sql, [ req.params.id ]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.get("/:id/products", async (req, res) => {
    try {
      const sql = `
      SELECT DISTINCT "product".* FROM "product" 
      JOIN "product_artists" 
      ON "product"."id" = "product_artists"."product_id" 
      JOIN "artist" 
      ON "product_artists"."artist_id" = "artist"."id"
      JOIN "product_genres"
      ON "product"."id" = "product_genres"."product_id"
      JOIN "genre"
      ON "product_genres"."genre_id" = "genre"."id"
      WHERE "product"."deleted" = false AND "artist"."deleted" = false AND "genre"."deleted" = false AND "genre"."id" = $1;`;
      const result = await client.query(sql, [ req.params.id ]);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.post("/", authorize(), async (req, res) => {
  const select = `SELECT "name" FROM "genre" WHERE "name" = $1::text`
  if((await client.query(select, [ req.body.name ])).rows.length > 0){
    return res.status(400).send('Genre already exists');
  }
    try {
      const sql = `INSERT INTO "genre" ("name", "description", "deleted") VALUES ($1::text, $2::text, false)`;
      const result = await client.query(sql, [ req.body.name, req.body.description ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.patch("/:id", authorize(), async (req, res) => {
  const select = `SELECT "name" FROM "genre" WHERE "name" = $1::text`
  if((await client.query(select, [ req.body.name ])).rows.length > 0){
    return res.status(400).send('Genre already exists');
  }
    try {
      const sql = `UPDATE "genre" SET "name" = $1::text, "description" = $2::text WHERE "id" = $3`;
      const result = await client.query(sql, [ req.body.name, req.body.description, req.params.id ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.delete("/:id", authorize(), async (req, res) => {
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