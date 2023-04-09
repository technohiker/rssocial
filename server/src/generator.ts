import { Pool } from "pg";
import { faker } from "@faker-js/faker";
import { pg_user, pg_database, pg_host, pg_password } from "./config";

const pool = new Pool({
  user: pg_user,
  password: pg_password,
  database: pg_database,
  host: pg_host,
  port: 5432,
});

export async function runGenerator() {
  console.log("Is this running?");
  let tableData = await getDatabaseInfo(pool);
  console.log({ tableData });
}
async function getDatabaseInfo(pool: Pool) {
  const res = await pool.query<ColumnData>(
    `SELECT table_name, column_name, data_type, is_nullable, column_default, character_maximum_length
     FROM information_schema.columns
     WHERE table_schema = 'public'`
  );

  const tableColumns: TableColumns<ColumnData> = {};
  res.rows.forEach((row) => {
    if (!tableColumns[row.table_name]) {
      tableColumns[row.table_name] = [];
    }
    tableColumns[row.table_name].push(row);
  });
  return tableColumns;
}

function generateSeedData(tableColumns: TableColumns<ColumnData>) {
  tableColumns;
  let seedData = "";
  for (let rows of tableColumns.keys) {
    let values = "";
    for (let row of rows) {
      let value;
      switch (row.data_type) {
        case "integer":
          value = faker.datatype.number();
          break;
        case "bigint":
          value = faker.datatype.number({
            min: -9223372036854775808,
            max: 9223372036854775807,
          });
          break;
        case "boolean":
          value = faker.datatype.boolean();
          break;
        case "character varying":
        case "text":
          value = faker.lorem.sentence();
          break;
        case "date":
          value = faker.date.past();
          break;
        case "timestamp without time zone":
          value = faker.date.past().toISOString();
          break;
        default:
          value = null;
          break;
      }
      if (value === null && row.is_nullable === "NO") {
        value = row.column_default || "";
      }
      values += `${JSON.stringify(value)},`;
    }
    values = values.slice(0, -1); // remove trailing comma
    seedData += `INSERT INTO ${rows.table_name} (${tableColumns.keys
      .map((row) => row.column_name)
      .join(",")}) VALUES (${values});\n`;
  }
}

//runGenerator();

interface ColumnData {
  table_name: string;
  column_name: string;
  data_type: string;
  is_nullable: "YES" | "NO";
  column_default: any | null;
  character_maximum_length: number | null;
}

interface TableColumns<T> {
  [key: string]: T[];
}
