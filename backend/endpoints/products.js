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
      const createProduct = `INSERT INTO "product" ("name", "available", "price", "type", "image") VALUES ($1::text, $2, $3, $4, $5) RETURNING id`;
      let result = await client.query(createProduct, [ req.body.name, req.body.available, req.body.price, req.body.type, "" ]);
      const productId = result.rows[0].id;
      for(let i = 0; i < req.body.artists.length; i++){
        let productArtists = `INSERT INTO "product_artists" ("product_id", "artist_id") VALUES ($1, $2)`;
        result += await client.query(productArtists, [ productId, req.body.artists[i] ]);
      }
      for(let i = 0; i < req.body.genres.length; i++){
        let productGenres = `INSERT INTO "product_genres" ("product_id", "genre_id") VALUES ($1, $2)`;
        result += await client.query(productGenres, [ productId, req.body.genres[i] ]);
      }
      res.json({id: productId});
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


  router.patch("/:id", async (req, res) => {
    try {
      const sql = `UPDATE "product" SET "name" = $1::text, "available" = $2, "price" = $3 WHERE "product"."id" = $4`;
      const result = await client.query(sql, [ req.body.name, req.body.available, req.body.price, req.params.id ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  router.patch("/:id/image", async (req, res) => {
    try {
      const imageName = `product${req.params.id}image.png`;
      console.log(req.files);
      req.files.file.mv('../uploads/' + imageName);
      const sql = `UPDATE "product" SET "image" = $1::text WHERE "product"."id" = $2`;
      const result = await client.query(sql, [ imageName, req.params.id ]);
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
      res.status(400).send('Product is in an order');
    }
  });

export default router;