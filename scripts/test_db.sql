--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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
-- Name: status; Type: TYPE; Schema: public; Owner: mesh
--

CREATE TYPE public.status AS ENUM (
    'pending',
    'shipped',
    'delivered',
    'cancelled'
);


ALTER TYPE public.status OWNER TO mesh;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: buyers; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.buyers (
    first_name character varying(255),
    last_name character varying(255),
    password character varying(255),
    email character varying(255),
    buyer_id integer NOT NULL,
    refresh_token character varying(255)
);


ALTER TABLE public.buyers OWNER TO mesh;

--
-- Name: buyers_buyer_id_seq; Type: SEQUENCE; Schema: public; Owner: mesh
--

ALTER TABLE public.buyers ALTER COLUMN buyer_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.buyers_buyer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.cart_items (
    cart_item_id integer NOT NULL,
    cart_id integer,
    product_id integer,
    quantity integer NOT NULL
);


ALTER TABLE public.cart_items OWNER TO mesh;

--
-- Name: cart_items_cart_item_id_seq; Type: SEQUENCE; Schema: public; Owner: mesh
--

ALTER TABLE public.cart_items ALTER COLUMN cart_item_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cart_items_cart_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: carts; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.carts (
    cart_id integer NOT NULL,
    buyer_id integer
);


ALTER TABLE public.carts OWNER TO mesh;

--
-- Name: carts_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: mesh
--

ALTER TABLE public.carts ALTER COLUMN cart_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.carts_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: categories; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name character varying(100) NOT NULL,
    category_description text
);


ALTER TABLE public.categories OWNER TO mesh;

--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: mesh
--

ALTER TABLE public.categories ALTER COLUMN category_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.order_items (
    order_item_id integer NOT NULL,
    order_id integer,
    product_id integer,
    seller_id integer,
    quantity integer NOT NULL,
    price numeric(10,2),
    status public.status DEFAULT 'pending'::public.status NOT NULL
);


ALTER TABLE public.order_items OWNER TO mesh;

--
-- Name: order_items_order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: mesh
--

ALTER TABLE public.order_items ALTER COLUMN order_item_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_items_order_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: order_shipping_details; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.order_shipping_details (
    order_id integer NOT NULL,
    city character varying(25),
    county character varying(25),
    phone_number character varying(10),
    first_name character varying(25),
    last_name character varying(25),
    postal_code character varying(25),
    apartment character varying(255)
);


ALTER TABLE public.order_shipping_details OWNER TO mesh;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    buyer_id integer,
    order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status public.status DEFAULT 'pending'::public.status NOT NULL
);


ALTER TABLE public.orders OWNER TO mesh;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: mesh
--

ALTER TABLE public.orders ALTER COLUMN order_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: product_categories; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.product_categories (
    product_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.product_categories OWNER TO mesh;

--
-- Name: product_images; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.product_images (
    image_id integer NOT NULL,
    product_id integer,
    image_url character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.product_images OWNER TO mesh;

--
-- Name: product_images_image_id_seq; Type: SEQUENCE; Schema: public; Owner: mesh
--

ALTER TABLE public.product_images ALTER COLUMN image_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_images_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    seller_id integer,
    product_name character varying(100) NOT NULL,
    product_description text,
    price numeric(10,2) NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.products OWNER TO mesh;

--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: mesh
--

ALTER TABLE public.products ALTER COLUMN product_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sellers; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.sellers (
    first_name character varying(255),
    last_name character varying(255),
    password character varying(255),
    email character varying(255),
    store_name character varying(100),
    store_description text,
    seller_id integer NOT NULL,
    refresh_token character varying(255)
);


ALTER TABLE public.sellers OWNER TO mesh;

--
-- Name: sellers_seller_id_seq; Type: SEQUENCE; Schema: public; Owner: mesh
--

ALTER TABLE public.sellers ALTER COLUMN seller_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sellers_seller_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: shipping_prices; Type: TABLE; Schema: public; Owner: mesh
--

CREATE TABLE public.shipping_prices (
    city character varying(25) NOT NULL,
    price numeric(9,2)
);


ALTER TABLE public.shipping_prices OWNER TO mesh;

--
-- Data for Name: buyers; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.buyers (first_name, last_name, password, email, buyer_id, refresh_token) FROM stdin;
John	Updated Fowler	$2b$10$X0Zkc83I316VRD3YoO6Dh.ljoqQLxXsv2XmE3bYEzsmWg1wBjW52q	john@example.com	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNzI5NTQ0MjQ2LCJleHAiOjE3MzAxNDkwNDZ9.brQZSmkYRvOQyvWrtCT9u2a5zz_tE4ZCp7BQX8eLQR8
Gon	Freecss	$2b$10$yG7j9mwC1TarCS6bWcbkWeCZXTOajyE9A2pDZGxHitNsJqZYq4O0m	gonFreecs@gmail.com	17	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxN30sImlhdCI6MTcyOTcwOTY1OSwiZXhwIjoxNzMwMzE0NDU5fQ.ZAo_l49x3bIxieIoYi0dD9H8MyiPcLo8wvRynI5N9Lo
Gon	Freecs	$2b$10$DQZjc7TnpSAdedo6Qw96vOPsaeUIhLOSRod1sC.BLQLs3sii3DSza	gon@gmail.com	16	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNn0sImlhdCI6MTcyODc2NTYzMSwiZXhwIjoxNzI5MzcwNDMxfQ.KWoyz3wMVbM9ojs4JyQCTr-oHZR_RRN95Q6QrHllOLA
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.cart_items (cart_item_id, cart_id, product_id, quantity) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.carts (cart_id, buyer_id) FROM stdin;
1	1
15	17
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.categories (category_id, category_name, category_description) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.order_items (order_item_id, order_id, product_id, seller_id, quantity, price, status) FROM stdin;
2	3	1	1	3	250.00	pending
3	4	1	1	3	250.00	pending
7	6	2	1	1	13.00	delivered
6	6	1	1	1	250.00	delivered
1	2	1	1	3	250.00	shipped
8	7	2	1	3	13.00	shipped
9	7	12	1	2	250.00	shipped
\.


--
-- Data for Name: order_shipping_details; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.order_shipping_details (order_id, city, county, phone_number, first_name, last_name, postal_code, apartment) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.orders (order_id, buyer_id, order_date, status) FROM stdin;
2	1	2024-09-11 00:54:12.8202	pending
3	1	2024-09-11 00:56:36.115155	pending
4	1	2024-09-11 01:00:35.057953	pending
6	17	2024-10-17 19:37:43.416428	pending
7	17	2024-10-23 21:52:18.052319	pending
\.


--
-- Data for Name: product_categories; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.product_categories (product_id, category_id) FROM stdin;
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.product_images (image_id, product_id, image_url, created_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.products (product_id, seller_id, product_name, product_description, price, quantity, created_at, updated_at) FROM stdin;
1	1	A5 notebook	Put it down on paper	250.00	25	2024-09-08 19:16:34.341441	2024-10-21 21:55:30.521694
2	1	BIC Blue pen	Best ball point pen	13.00	50	2024-09-08 19:18:24.440121	2024-10-22 00:12:50.544008
12	1	Stapeler	 A reliable heavy-duty stapler designed for effortless stapling of large stacks of paper.	250.00	15	2024-10-22 15:50:44.718837	2024-10-22 15:50:44.718837
\.


--
-- Data for Name: sellers; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.sellers (first_name, last_name, password, email, store_name, store_description, seller_id, refresh_token) FROM stdin;
Killua	Zoldyck	$2b$10$/GSXshs42.c7exEMlxNuPevU2q6afhtjLxwXSVx0a0d6HKl5..g0a	killuazoldyck88@gmail.com	Visocin Stationery	Visocin Stationery is a Kenyan brand selling pens, notebooks, and other office supplies.	5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1fSwiaWF0IjoxNzI5NDI2MjYxLCJleHAiOjE3MzAwMzEwNjF9.XoVUvOknx2UNsJv95kqBDayPOpmZVkUnzgcUBnlmUto
jane	Doe	$2b$10$pT.6uJ8riuV5GX.R2Gv8l.GTAuDBgGUoUAn4J/CM2IZaYWqe.20QG	jane@example.com	jane selles	Jane selles offer a range of quality stationery.	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNzI5NzA5NTc1LCJleHAiOjE3MzAzMTQzNzV9.XEDaZGtwFjxxqkJh7DdoB_NZeku42XGzfePiNUHYfx4
\.


--
-- Data for Name: shipping_prices; Type: TABLE DATA; Schema: public; Owner: mesh
--

COPY public.shipping_prices (city, price) FROM stdin;
\.


--
-- Name: buyers_buyer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mesh
--

SELECT pg_catalog.setval('public.buyers_buyer_id_seq', 17, true);


--
-- Name: cart_items_cart_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mesh
--

SELECT pg_catalog.setval('public.cart_items_cart_item_id_seq', 119, true);


--
-- Name: carts_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mesh
--

SELECT pg_catalog.setval('public.carts_cart_id_seq', 16, true);


--
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mesh
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 1, false);


--
-- Name: order_items_order_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mesh
--

SELECT pg_catalog.setval('public.order_items_order_item_id_seq', 9, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mesh
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 7, true);


--
-- Name: product_images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mesh
--

SELECT pg_catalog.setval('public.product_images_image_id_seq', 1, false);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mesh
--

SELECT pg_catalog.setval('public.products_product_id_seq', 12, true);


--
-- Name: sellers_seller_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mesh
--

SELECT pg_catalog.setval('public.sellers_seller_id_seq', 5, true);


--
-- Name: buyers buyers_email_key; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.buyers
    ADD CONSTRAINT buyers_email_key UNIQUE (email);


--
-- Name: buyers buyers_pkey; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.buyers
    ADD CONSTRAINT buyers_pkey PRIMARY KEY (buyer_id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (cart_item_id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (cart_id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: order_shipping_details city_pk; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.order_shipping_details
    ADD CONSTRAINT city_pk PRIMARY KEY (order_id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_item_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: product_categories product_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_pkey PRIMARY KEY (product_id, category_id);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (image_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: sellers sellers_email_key; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT sellers_email_key UNIQUE (email);


--
-- Name: sellers sellers_pkey; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT sellers_pkey PRIMARY KEY (seller_id);


--
-- Name: shipping_prices shipping_prices_pkey; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.shipping_prices
    ADD CONSTRAINT shipping_prices_pkey PRIMARY KEY (city);


--
-- Name: cart_items unique_cart_product; Type: CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT unique_cart_product UNIQUE (cart_id, product_id);


--
-- Name: orders fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.buyers(buyer_id);


--
-- Name: carts fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.buyers(buyer_id);


--
-- Name: cart_items fk_cart; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_cart FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);


--
-- Name: product_categories fk_category; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.products(product_id);


--
-- Name: order_items fk_order; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- Name: order_shipping_details fk_order; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.order_shipping_details
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- Name: product_images fk_product; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: order_items fk_product; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: cart_items fk_product; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: product_categories fk_product; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: products fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.sellers(seller_id);


--
-- Name: order_items fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: mesh
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.sellers(seller_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO mesh;


--
-- PostgreSQL database dump complete
--
