\echo 'Delete and recreate capstone_2 db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE capstone_2;
CREATE DATABASE capstone_2;
\connect react_jobly

\i src/sql/jobly-schema.sql
\i src/sql/jobly-seed.sql

\echo 'Delete and recreate capstone_2_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE capstone_2_test;
CREATE DATABASE capstone_2_test;
\connect capstone_2_test

\i src/sql/jobly-schema.sql
