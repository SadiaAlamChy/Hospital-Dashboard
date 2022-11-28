--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-08-24 13:57:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 16439)
-- Name: ecomdb_star_schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA ecomdb_star_schema;


ALTER SCHEMA ecomdb_star_schema OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16610)
-- Name: customer_dim; Type: TABLE; Schema: ecomdb_star_schema; Owner: postgres
--

CREATE TABLE ecomdb_star_schema.customer_dim (
    customer_key character varying(50) NOT NULL,
    name text,
    contact_no numeric,
    nid numeric NOT NULL
);


ALTER TABLE ecomdb_star_schema.customer_dim OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16617)
-- Name: fact_table; Type: TABLE; Schema: ecomdb_star_schema; Owner: postgres
--

CREATE TABLE ecomdb_star_schema.fact_table (
    quantity integer NOT NULL,
    payment_key character varying(50) NOT NULL,
    time_key character varying(50) NOT NULL,
    store_key character varying(50) NOT NULL,
    item_key character varying(50) NOT NULL,
    customer_key character varying(50) NOT NULL,
    unit text NOT NULL,
    unit_price numeric NOT NULL,
    total_price numeric NOT NULL
);


ALTER TABLE ecomdb_star_schema.fact_table OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16469)
-- Name: item_dim; Type: TABLE; Schema: ecomdb_star_schema; Owner: postgres
--

CREATE TABLE ecomdb_star_schema.item_dim (
    item_key character varying NOT NULL,
    item_name text NOT NULL,
    description text NOT NULL,
    unit_price numeric NOT NULL,
    man_country character varying NOT NULL,
    supplier character varying NOT NULL,
    unit character varying NOT NULL
);


ALTER TABLE ecomdb_star_schema.item_dim OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16533)
-- Name: store_dim; Type: TABLE; Schema: ecomdb_star_schema; Owner: postgres
--

CREATE TABLE ecomdb_star_schema.store_dim (
    store_key character varying NOT NULL,
    division character varying NOT NULL,
    upazila character varying NOT NULL,
    district character varying NOT NULL
);


ALTER TABLE ecomdb_star_schema.store_dim OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16540)
-- Name: time_dim; Type: TABLE; Schema: ecomdb_star_schema; Owner: postgres
--

CREATE TABLE ecomdb_star_schema.time_dim (
    time_key character varying NOT NULL,
    date date NOT NULL,
    hour integer NOT NULL,
    day integer NOT NULL,
    week character varying NOT NULL,
    month integer NOT NULL,
    quarter character varying NOT NULL,
    year integer NOT NULL
);


ALTER TABLE ecomdb_star_schema.time_dim OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16548)
-- Name: trans_dim; Type: TABLE; Schema: ecomdb_star_schema; Owner: postgres
--

CREATE TABLE ecomdb_star_schema.trans_dim (
    trans_type character varying(10) NOT NULL,
    bank_name text NOT NULL,
    payment_key character varying(10) NOT NULL
);


ALTER TABLE ecomdb_star_schema.trans_dim OWNER TO postgres;

--
-- TOC entry 3211 (class 2606 OID 16616)
-- Name: customer_dim customer_dim_pkey1; Type: CONSTRAINT; Schema: ecomdb_star_schema; Owner: postgres
--

ALTER TABLE ONLY ecomdb_star_schema.customer_dim
    ADD CONSTRAINT customer_dim_pkey1 PRIMARY KEY (customer_key);


--
-- TOC entry 3203 (class 2606 OID 16493)
-- Name: item_dim item_dim_pkey; Type: CONSTRAINT; Schema: ecomdb_star_schema; Owner: postgres
--

ALTER TABLE ONLY ecomdb_star_schema.item_dim
    ADD CONSTRAINT item_dim_pkey PRIMARY KEY (item_key);


--
-- TOC entry 3205 (class 2606 OID 16539)
-- Name: store_dim store_dim_pkey; Type: CONSTRAINT; Schema: ecomdb_star_schema; Owner: postgres
--

ALTER TABLE ONLY ecomdb_star_schema.store_dim
    ADD CONSTRAINT store_dim_pkey PRIMARY KEY (store_key);


--
-- TOC entry 3207 (class 2606 OID 16546)
-- Name: time_dim time_dim_pkey; Type: CONSTRAINT; Schema: ecomdb_star_schema; Owner: postgres
--

ALTER TABLE ONLY ecomdb_star_schema.time_dim
    ADD CONSTRAINT time_dim_pkey PRIMARY KEY (time_key);


--
-- TOC entry 3209 (class 2606 OID 16554)
-- Name: trans_dim trans_dim_pkey; Type: CONSTRAINT; Schema: ecomdb_star_schema; Owner: postgres
--

ALTER TABLE ONLY ecomdb_star_schema.trans_dim
    ADD CONSTRAINT trans_dim_pkey PRIMARY KEY (payment_key);


--
-- TOC entry 3212 (class 1259 OID 16647)
-- Name: fk_1; Type: INDEX; Schema: ecomdb_star_schema; Owner: postgres
--

CREATE INDEX fk_1 ON ecomdb_star_schema.fact_table USING btree (customer_key);


--
-- TOC entry 3213 (class 1259 OID 16648)
-- Name: fk_2; Type: INDEX; Schema: ecomdb_star_schema; Owner: postgres
--

CREATE INDEX fk_2 ON ecomdb_star_schema.fact_table USING btree (item_key);


--
-- TOC entry 3214 (class 1259 OID 16649)
-- Name: fk_3; Type: INDEX; Schema: ecomdb_star_schema; Owner: postgres
--

CREATE INDEX fk_3 ON ecomdb_star_schema.fact_table USING btree (store_key);


--
-- TOC entry 3215 (class 1259 OID 16650)
-- Name: fk_4; Type: INDEX; Schema: ecomdb_star_schema; Owner: postgres
--

CREATE INDEX fk_4 ON ecomdb_star_schema.fact_table USING btree (time_key);


--
-- TOC entry 3216 (class 1259 OID 16651)
-- Name: fk_5; Type: INDEX; Schema: ecomdb_star_schema; Owner: postgres
--

CREATE INDEX fk_5 ON ecomdb_star_schema.fact_table USING btree (payment_key);


--
-- TOC entry 3217 (class 2606 OID 16622)
-- Name: fact_table fk_1; Type: FK CONSTRAINT; Schema: ecomdb_star_schema; Owner: postgres
--

ALTER TABLE ONLY ecomdb_star_schema.fact_table
    ADD CONSTRAINT fk_1 FOREIGN KEY (customer_key) REFERENCES ecomdb_star_schema.customer_dim(customer_key);


--
-- TOC entry 3218 (class 2606 OID 16627)
-- Name: fact_table fk_2; Type: FK CONSTRAINT; Schema: ecomdb_star_schema; Owner: postgres
--

ALTER TABLE ONLY ecomdb_star_schema.fact_table
    ADD CONSTRAINT fk_2 FOREIGN KEY (item_key) REFERENCES ecomdb_star_schema.item_dim(item_key);


--
-- TOC entry 3219 (class 2606 OID 16632)
-- Name: fact_table fk_3; Type: FK CONSTRAINT; Schema: ecomdb_star_schema; Owner: postgres
--

ALTER TABLE ONLY ecomdb_star_schema.fact_table
    ADD CONSTRAINT fk_3 FOREIGN KEY (store_key) REFERENCES ecomdb_star_schema.store_dim(store_key);


--
-- TOC entry 3220 (class 2606 OID 16637)
-- Name: fact_table fk_4; Type: FK CONSTRAINT; Schema: ecomdb_star_schema; Owner: postgres
--

ALTER TABLE ONLY ecomdb_star_schema.fact_table
    ADD CONSTRAINT fk_4 FOREIGN KEY (time_key) REFERENCES ecomdb_star_schema.time_dim(time_key);


--
-- TOC entry 3221 (class 2606 OID 16642)
-- Name: fact_table fk_5; Type: FK CONSTRAINT; Schema: ecomdb_star_schema; Owner: postgres
--

ALTER TABLE ONLY ecomdb_star_schema.fact_table
    ADD CONSTRAINT fk_5 FOREIGN KEY (payment_key) REFERENCES ecomdb_star_schema.trans_dim(payment_key);


-- Completed on 2022-08-24 13:57:40

--
-- PostgreSQL database dump complete
--

