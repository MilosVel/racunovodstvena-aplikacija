u redis ts commented code: // import { env } from "@/data/env/server"

- TO DO:

1. Dokcer sa lokalnim postgresom:
   const Pool = require("pg").Pool;
   const pool = new Pool({
   user: "postgres",
   password: "sifra",
   host: "localhost",
   port: 5433, // See description below
   database: "perntodo"
   });
