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
      const createOrder = `INSERT INTO "order" ("user_id", "price", "state") VALUES ($1, $2, 'ordered') RETURNING id`;
      let result = await client.query(createOrder, [ req.body.user_id, req.body.price ]);
      const orderId = result.rows[0].id;
      for(let i = 0; i < req.body.items.length; i++){
        let orderItems = `INSERT INTO "order_items" ("order_id", "product_id") VALUES ($1, $2)`;
        result += await client.query(orderItems, [ orderId, req.body.items[i].id ]);
      }
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.patch("/:id", async (req, res) => {
    try {
      const sql = `UPDATE "order" SET "state" = $1 WHERE "order"."id" = $2`;
      const result = await client.query(sql, [ req.body.state, req.params.id ]);
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