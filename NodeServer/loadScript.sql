
create table if not exists uscoviddata (
Date date, 
County VARCHAR(100), 
State VARCHAR(100), 
Fips INTEGER, 
Cases INTEGER, 
Deaths INTEGER
);
COPY uscoviddata FROM '/home/adnan/Documents/Alturos Demo Project/us-counties.csv' delimiter ',' csv header;
