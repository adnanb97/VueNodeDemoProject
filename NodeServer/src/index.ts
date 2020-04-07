import express from "express";
import { Client } from "pg";

const PORT = process.env.PORT || 3000;

const client = new Client({
  password: "postgres",
  user: "postgres",
  host: "postgres",
});
const bootScript = "create table if not exists uscoviddata (Date date, County VARCHAR(100),State VARCHAR(100), Fips INTEGER, Cases INTEGER,Deaths INTEGER); COPY uscoviddata FROM '/home/adnan/Documents/Alturos Demo Project/NodeServer/us-counties.csv' delimiter ',' csv header;"

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/ping", async (req, res) => {
  const database = await client.query(bootScript).then(() => "up").catch(() => "down");

  res.send({
    environment: process.env.NODE_ENV,
    database,
  });
});

app.get("/all", (req, res) => {
  
  client.query('SELECT * FROM uscoviddata WHERE Cases > 0').then(queryRes => {
    var resultOfQuery = queryRes.rows;
    //console.log(resultOfQuery);
    res.end(JSON.stringify(resultOfQuery));
  }).catch(e => console.error(e.stack))
});

app.get("/dbSize", async(req, res) => {
  client.query("SELECT COUNT(*) FROM uscoviddata").then(queryRes => {
    var resultOfQuery = queryRes.rows;
    res.end(JSON.stringify(resultOfQuery));
  }).catch(e => console.error(e.stack));
});

(async () => {
  await client.connect();

  app.listen(PORT, () => {
    console.log("Started at http://localhost:%d", PORT);
  });
})();
