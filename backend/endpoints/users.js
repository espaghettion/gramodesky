import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
      const selectOrders = `SELECT "order".*
      FROM "order"
      WHERE "order"."user_id" = $1 AND "order"."deleted" = false;`;
      const selectProducts = `SELECT "product".*, "order_items"."order_id"
      FROM "order_items"
      JOIN "product"
      ON "order_items"."product_id" = "product"."id"
      WHERE "order_items"."order_id" IN (SELECT "order"."id" FROM "order" WHERE "order"."user_id" = $1 AND "order"."deleted" = false);`;

      const userOrders = (await client.query(selectOrders, [ req.params.id ])).rows;
      const products = (await client.query(selectProducts, [ req.params.id ])).rows;

      const orderProducts = userOrders.map(order => {
        return{
          ...order,
          products: products.filter(product => product.order_id == order.id)
        }
      })
      
      res.json(orderProducts);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.post("/", async (req, res) => {
    const select = `SELECT "username" FROM "user" WHERE "username" = $1::text`
    if((await client.query(select, [ req.body.username ])).rows.length > 0){
      return res.status(400).send('Username already exists');
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const sql = `INSERT INTO "user" ("name", "username", "password") VALUES ($1::text, $2::text, $3::text)`;
      const result = await client.query(sql, [ req.body.name, req.body.username, hashedPassword ]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
});


router.post("/login", async (req, res) => {
  const selectUser = `SELECT * FROM "user" WHERE "username" = $1::text`
  const user = await client.query(selectUser, [req.body.username]);
  if(user.rows.length == 0){
    return res.status(400).send('Cannot find user');
  }
  try {
    if(await bcrypt.compare(req.body.password, user.rows[0].password)){
      const accessToken = jwt.sign({id: user.rows[0].id}, "Yqqs8O4sr8auHlMnVbg2PAcTtB1lKLIh");
      res.json({ token: accessToken });
    }
    else return res.status(400).send('Wrong username or password');
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