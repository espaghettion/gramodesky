import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import fileUpload from 'express-fileupload';
import path from 'path';

import userRouter from './endpoints/users.js';
import orderRouter from './endpoints/orders.js';
import genreRouter from './endpoints/genres.js';
import artistRouter from './endpoints/artists.js';
import productRouter from './endpoints/products.js';

const { Client } = pkg;
const app = express();
const client = new Client({
	user: 'kremecek_krystof_64d3f_sxegp',
	password: 'uf4q7DKOql9VKg8xNwtIHHJF6AZCFFbb',
	host: 'hosting.ssps.cajthaml.eu',
	port: '3337',
	database: 'kremecek_krystof_64d3f_sxegp_db',
});
await client.connect();

app.use(cors({
    origin: "*"
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join('./tmp'),
}));
app.use(bodyParser.json());

app.use("/uploads", express.static('uploads'));
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/genres", genreRouter);
app.use("/artists", artistRouter);
app.use("/products", productRouter);

app.listen(3000, () => {
    console.log(`Server loaded.`);
})

export default client;