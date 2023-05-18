\echo 'Delete and recreate capstone_2 db?'
\prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE deqbl8450smu2e;
-- CREATE DATABASE deqbl8450smu2e
 -- WITH ENCODING = 'UTF8';
\connect deqbl8450smu2e

\i src/sql/schema.sql
\i src/sql/seed.sql

\echo 'Delete and recreate capstone_2_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE capstone_2_test;
CREATE DATABASE capstone_2_test
  WITH ENCODING = 'UTF8';
\connect capstone_2_test

\i src/sql/schema.sql
\i src/sql/seed.sql