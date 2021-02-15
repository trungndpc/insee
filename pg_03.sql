--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Ubuntu 13.1-1.pgdg18.04+1)
-- Dumped by pg_dump version 13.1 (Ubuntu 13.1-1.pgdg18.04+1)

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
-- Name: promotion; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA promotion;


ALTER SCHEMA promotion OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bill; Type: TABLE; Schema: promotion; Owner: postgres
--

CREATE TABLE promotion.bill (
    id integer NOT NULL,
    link text,
    status smallint,
    construction_id integer,
    volume_ciment integer,
    label_id character varying(200)
);


ALTER TABLE promotion.bill OWNER TO postgres;

--
-- Name: bill_id_seq; Type: SEQUENCE; Schema: promotion; Owner: postgres
--

ALTER TABLE promotion.bill ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME promotion.bill_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: construction; Type: TABLE; Schema: promotion; Owner: postgres
--

CREATE TABLE promotion.construction (
    id integer NOT NULL,
    city integer,
    district character varying(50),
    name character varying(200),
    phone character varying(20),
    quantity integer,
    estimate_time_start integer,
    type_construction integer,
    type integer,
    status integer,
    bill_ids integer[],
    image_ids integer[],
    address character varying(1500),
    extra text,
    label_id smallint,
    promotion_id smallint,
    gift_id integer,
    customer_id integer,
    created_time timestamp without time zone,
    updated_time timestamp without time zone,
    note text
);


ALTER TABLE promotion.construction OWNER TO postgres;

--
-- Name: construction_id_seq; Type: SEQUENCE; Schema: promotion; Owner: postgres
--

ALTER TABLE promotion.construction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME promotion.construction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: customer; Type: TABLE; Schema: promotion; Owner: postgres
--

CREATE TABLE promotion.customer (
    id integer NOT NULL,
    birthday integer,
    main_area_id smallint,
    phone character varying(20),
    full_name character varying(50),
    avatar character varying(500),
    status smallint,
    user_id integer,
    is_linked_user boolean,
    created_time timestamp without time zone,
    updated_time timestamp without time zone,
    note text,
    volume_ciment smallint
);


ALTER TABLE promotion.customer OWNER TO postgres;

--
-- Name: customer_id_seq; Type: SEQUENCE; Schema: promotion; Owner: postgres
--

ALTER TABLE promotion.customer ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME promotion.customer_id_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    NO MAXVALUE
    CACHE 1
);


--
-- Name: gift; Type: TABLE; Schema: promotion; Owner: postgres
--

CREATE TABLE promotion.gift (
    id integer NOT NULL,
    type smallint,
    status smallint,
    construction_id integer,
    name character varying(200),
    customer_id integer,
    created_time timestamp without time zone,
    updated_time timestamp without time zone,
    data text
);


ALTER TABLE promotion.gift OWNER TO postgres;

--
-- Name: gift_id_seq; Type: SEQUENCE; Schema: promotion; Owner: postgres
--

ALTER TABLE promotion.gift ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME promotion.gift_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: history; Type: TABLE; Schema: promotion; Owner: postgres
--

CREATE TABLE promotion.history (
    id integer NOT NULL,
    user_id integer,
    type_promotion_id smallint,
    promotion_id integer,
    time_received integer,
    status smallint,
    description text
);


ALTER TABLE promotion.history OWNER TO postgres;

--
-- Name: history_id_seq; Type: SEQUENCE; Schema: promotion; Owner: postgres
--

ALTER TABLE promotion.history ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME promotion.history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: image; Type: TABLE; Schema: promotion; Owner: postgres
--

CREATE TABLE promotion.image (
    id integer NOT NULL,
    link text,
    status smallint,
    construction_id integer
);


ALTER TABLE promotion.image OWNER TO postgres;

--
-- Name: image_id_seq; Type: SEQUENCE; Schema: promotion; Owner: postgres
--

ALTER TABLE promotion.image ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME promotion.image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: label; Type: TABLE; Schema: promotion; Owner: postgres
--

CREATE TABLE promotion.label (
    id integer NOT NULL,
    name character varying(500),
    type smallint
);


ALTER TABLE promotion.label OWNER TO postgres;

--
-- Name: label_id_seq; Type: SEQUENCE; Schema: promotion; Owner: postgres
--

ALTER TABLE promotion.label ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME promotion.label_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: promotion; Type: TABLE; Schema: promotion; Owner: postgres
--

CREATE TABLE promotion.promotion (
    id integer NOT NULL,
    title character varying(2000),
    content text,
    type_promotion bigint,
    summary character varying(4000),
    status smallint,
    location smallint,
    time_start bigint,
    time_end bigint,
    created_time timestamp without time zone,
    updated_time timestamp without time zone,
    rule_quantily smallint
);


ALTER TABLE promotion.promotion OWNER TO postgres;

--
-- Name: post_id_seq; Type: SEQUENCE; Schema: promotion; Owner: postgres
--

ALTER TABLE promotion.promotion ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME promotion.post_id_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: promotion; Owner: postgres
--

CREATE TABLE promotion."user" (
    id integer NOT NULL,
    phone character varying(20),
    password character varying(50),
    is_enable boolean,
    lst_session character varying(200)[],
    customer_id integer,
    role_id integer,
    avatar character varying(300),
    name character varying(50),
    zalo_id character varying(50),
    status integer,
    created_time timestamp without time zone,
    updated_time timestamp without time zone,
    follower_zalo_id character varying(1000),
    note text,
    birthday integer
);


ALTER TABLE promotion."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: promotion; Owner: postgres
--

ALTER TABLE promotion."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME promotion.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: bill; Type: TABLE DATA; Schema: promotion; Owner: postgres
--

COPY promotion.bill (id, link, status, construction_id, volume_ciment, label_id) FROM stdin;
26	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/bill/25/1611591990893-0.png	3	0	0	\N
27	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/bill/25/1611595313484-0.png	2	0	0	\N
28	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/bill/25/1611596414645-0.png	1	0	\N	\N
29	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/bill/25/1611597309146-0.png	1	0	\N	\N
30	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/bill/25/1611650281886-0.jpg	3	0	-1	\N
32	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/bill/25/1611679599358-0.jpeg	1	0	\N	\N
31	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/bill/25/1611650532770-0.jpg	2	0	0	\N
34	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/bill/25/1611902320083-0.jpg	2	0	50	IPS-CHABC-2501-THD
33	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/bill/25/1611902439264-0.jpg	2	0	0	\N
35	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/bill/25/1612236883972-0.jpeg	2	0	0	\N
36	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/bill/25/1612237530734-0.jpg	3	0	0	\N
\.


--
-- Data for Name: construction; Type: TABLE DATA; Schema: promotion; Owner: postgres
--

COPY promotion.construction (id, city, district, name, phone, quantity, estimate_time_start, type_construction, type, status, bill_ids, image_ids, address, extra, label_id, promotion_id, gift_id, customer_id, created_time, updated_time, note) FROM stdin;
46	50	1559	Anh Anh	0906600337	100	0	0	2	5	{35}	{34}	11 Doan Van Bo	{"agree":[1]}	5	1007	26	1099	2021-02-02 10:34:52.605	2021-02-02 10:36:26.058	\N
48	50	1569	Toàn Trần	0914113227	0	1619715600	1	1	4	\N	\N	Số 7, Nguyễn Hữu Thọ	{"agree":[3]}	5	1009	27	1101	2021-02-02 10:49:20.689	2021-02-02 10:51:50.403	\N
47	50	1554	Út Tâm	0914113227	100	0	0	2	2	{36}	{35}	Số 1 Phan Đình Phùng	{"agree":[1]}	5	1007	\N	1101	2021-02-02 10:45:52.405	2021-02-02 13:18:28.086	\N
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: promotion; Owner: postgres
--

COPY promotion.customer (id, birthday, main_area_id, phone, full_name, avatar, status, user_id, is_linked_user, created_time, updated_time, note, volume_ciment) FROM stdin;
1097	\N	50	84363020318	Lê Hoàng Vy	https://s120-ava-talk.zadn.vn/b/a/8/3/13/120/14f987ff2a04246eaa6669e16e1b53a7.jpg	2	143	t	2021-02-02 10:20:59.062	2021-02-02 10:21:42.169		\N
1098	\N	50	84765406277	Lan Hương	https://s120-ava-talk.zadn.vn/1/f/d/8/11/120/26bc0d09b243b50881a6b551ad47f442.jpg	2	145	t	2021-02-02 10:26:22.824	2021-02-02 10:26:56.118		\N
1099	\N	50	84784879171	Nguyen Hoang Viet Ngan	https://s120-ava-talk.zadn.vn/0/e/1/c/47/120/c7b8896cdb7a97d0b107a6a88b4bb3f8.jpg	2	146	t	2021-02-02 10:31:44.971	2021-02-02 10:35:54.183		0
1100	\N	50	84386900055	Hoàng Thị Khánh Hòa	https://s120-ava-talk.zadn.vn/4/9/3/8/5/120/6dc3e1a311c80e30120cb37955a66f60.jpg	2	147	t	2021-02-02 10:41:24.476	2021-02-02 10:41:50.13	HÒA BÀ RỊA	\N
1101	\N	50	84353292697	Tiên Nguyễn	https://s120-ava-talk.zadn.vn/0/4/5/2/13/120/6d6dde9f1e296255385416d7d470cdb6.jpg	2	148	t	2021-02-02 10:42:07.459	2021-02-02 13:18:27.965	TIÊN BẦU	0
1105	\N	50	84963529024	Nắng Xinh Đẹp	https://s120-ava-talk.zadn.vn/8/5/4/0/87/120/6b452675ef6b6de4e11db6aa6950c5a0.jpg	1	153	t	2021-02-02 17:37:27.655	2021-02-02 17:37:27.655	\N	\N
1106	\N	57	84972797184	Đình Trung	https://s120-ava-talk.zadn.vn/f/f/a/9/10/120/87069ccaa43702ad56ec93fe5a75f24f.jpg	1	154	t	2021-02-03 00:40:24.624	2021-02-03 00:40:24.624	\N	\N
1104	\N	50	84906600337	Nguyễn Thanh Khiết	https://s120-ava-talk.zadn.vn/4/a/6/f/18/120/9e142aabb58a5aa6c14a85d128c57168.jpg	2	144	t	2021-02-02 11:44:01.374	2021-02-03 09:08:00.746		\N
\.


--
-- Data for Name: gift; Type: TABLE DATA; Schema: promotion; Owner: postgres
--

COPY promotion.gift (id, type, status, construction_id, name, customer_id, created_time, updated_time, data) FROM stdin;
26	1	2	46	Thẻ cào 50k	1099	2021-02-02 10:36:18.567	2021-02-02 10:36:26.048	[{"network":0,"seri":"123456","code":"123456","name":"Thẻ Viettel"}]
27	1	1	48	Thẻ cào trị giá 50 triệu	1101	2021-02-02 10:51:50.395	2021-02-02 10:51:50.395	[{"network":0,"seri":"123","code":"123","name":"Thẻ cào viettel"}]
23	1	2	36	Thẻ cào viettel 500	1036	2021-01-25 23:21:27.73	2021-01-25 23:22:50.325	[{"network":0,"seri":"10003395125761","code":"314688440422676","name":"Thẻ cào viettel 500"}]
24	1	1	44	Thẻ cao 500k	1080	2021-01-29 13:53:54.95	2021-01-29 13:53:54.95	[{"network":0,"seri":"123","code":"123","name":"av"}]
25	1	2	43	Thẻ cao 500k	1078	2021-01-29 13:54:49.598	2021-01-29 13:55:08.48	[{"network":0,"seri":"Mobile phone","code":"1","name":"Thẻ cao 500k"}]
\.


--
-- Data for Name: history; Type: TABLE DATA; Schema: promotion; Owner: postgres
--

COPY promotion.history (id, user_id, type_promotion_id, promotion_id, time_received, status, description) FROM stdin;
\.


--
-- Data for Name: image; Type: TABLE DATA; Schema: promotion; Owner: postgres
--

COPY promotion.image (id, link, status, construction_id) FROM stdin;
27	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/img-insee/25/1611595316085-0.png	2	0
28	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/img-insee/25/1611596415950-0.png	1	0
29	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/img-insee/25/1611597311819-0.png	1	0
30	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/img-insee/25/1611650287609-0.jpg	3	0
31	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/img-insee/25/1611679601160-0.jpeg	1	0
33	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/img-insee/25/1611902330324-0.jpg	2	0
32	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/img-insee/25/1611902443934-0.jpg	2	0
34	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/img-insee/25/1612236891451-0.jpeg	2	0
35	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/img-insee/25/1612237541515-0.jpg	3	0
26	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/img-insee/25/1611591993581-0.png	3	0
\.


--
-- Data for Name: label; Type: TABLE DATA; Schema: promotion; Owner: postgres
--

COPY promotion.label (id, name, type) FROM stdin;
5	24phunhuan	1
6	98levanquoi	1
7	Thieu hoa don	1
8	100bao	1
\.


--
-- Data for Name: promotion; Type: TABLE DATA; Schema: promotion; Owner: postgres
--

COPY promotion.promotion (id, title, content, type_promotion, summary, status, location, time_start, time_end, created_time, updated_time, rule_quantily) FROM stdin;
1007	Chương trình khuyến mãi INSEE Wall Pro	<p style="text-align:center;"><span style="color:hsl(0,0%,0%);font-size:24px;"><strong>CHƯƠNG TRÌNH KHUYẾN MÃI INSEE WALL PRO</strong></span></p><ul><li><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Khu vực áp dụng:</strong> Hồ Chí Minh</span></li><li><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Thời gian</strong>: &nbsp;01/01/2021 - 27/02/2021</span></li><li><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Đối tượng áp dụng</strong>: Dành cho các nhà thầu ở Cần Thơ đã đăng ký thành viên nhà thầu INSEE nhà thầu ngoại hạng.</span></li><li><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Sản phẩm áp dụng:</strong> INSEE WALL PRO</span></li></ul><p><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Tặng thẻ cào 100.000 VND khi mua 30 bao INSEE WALL PRO,</strong> và gửi thông tin đơn hàng, hình ảnh công trình qua ứng dụng INSEE nhà thầu ngoại hạng.</span></p><p><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Đặc biệt:</strong> Tặng 50 áo khoác dành cho 50 nhà thầu đầu tiên gửi thông tin sớm nhất.</span></p><p><span style="color:hsl(0,75%,60%);font-size:15px;"><strong>Lưu ý:&nbsp;</strong></span></p><ul><li><span style="color:hsl(0,0%,0%);font-size:15px;">Quà tặng chỉ áp dụng cho nhà thầu đã đăng ký thành viên trên ứng dụng NHÀ THẦU NGOẠI HẠNG</span></li><li><span style="color:hsl(0,0%,0%);font-size:15px;">Nhà thầu gửi thông tin hình ảnh hóa đơn công trình để được nhận thưởng. Bấm vào đây để gửi thông tin.</span></li></ul><p>&nbsp;</p>	2	Chương trình khuyến mãi độc quyền dành cho hội viên	3	50	1609459200	1614384000	2021-01-15 22:29:41.731	2021-01-15 23:21:56.494	5
1009	Giới thiệu công trình tiếp theo	<p style="text-align:center;"><span style="color:hsl(0,0%,0%);font-size:24px;"><strong>Giới thiệu công trình tiếp theo</strong></span></p><ul><li><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Khu vực áp dụng:</strong> Hồ Chí Minh</span></li><li><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Thời gian</strong>: &nbsp;01/01/2021 - 27/02/2021</span></li><li><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Đối tượng áp dụng</strong>: Dành cho các nhà thầu ở Cần Thơ đã đăng ký thành viên nhà thầu INSEE nhà thầu ngoại hạng.</span></li><li><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Sản phẩm áp dụng:</strong> INSEE WALL PRO</span></li></ul><p><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Tặng thẻ cào 100.000 VND khi mua 30 bao INSEE WALL PRO,</strong> và gửi thông tin đơn hàng, hình ảnh công trình qua ứng dụng INSEE nhà thầu ngoại hạng.</span></p><p><span style="color:hsl(0,0%,0%);font-size:15px;"><strong>Đặc biệt:</strong> Tặng 50 áo khoác dành cho 50 nhà thầu đầu tiên gửi thông tin sớm nhất.</span></p><p><span style="color:hsl(0,75%,60%);font-size:15px;"><strong>Lưu ý:&nbsp;</strong></span></p><ul><li><span style="color:hsl(0,0%,0%);font-size:15px;">Quà tặng chỉ áp dụng cho nhà thầu đã đăng ký thành viên trên ứng dụng NHÀ THẦU NGOẠI HẠNG</span></li><li><span style="color:hsl(0,0%,0%);font-size:15px;">Nhà thầu gửi thông tin hình ảnh hóa đơn công trình để được nhận thưởng. Bấm vào đây để gửi thông tin.</span></li></ul><p>&nbsp;</p>	1	Chương trình độc quyền dành cho hội viên INSEE, giới thiệu công trình tiếp theo để được nhận phần thưởng hấp dẫn	3	50	1610582400	1611964800	2021-01-16 09:30:01.432	2021-01-16 09:30:24.177	10
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: promotion; Owner: postgres
--

COPY promotion."user" (id, phone, password, is_enable, lst_session, customer_id, role_id, avatar, name, zalo_id, status, created_time, updated_time, follower_zalo_id, note, birthday) FROM stdin;
155	\N		t	{eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNTUiLCJhdWQiOiIxNTUiLCJleHAiOjI2MTI0OTA0MTJ9.0IAHKuDFB_HDkyzY8A1D3Jn8sqDPIkvWjSsUaEn1sHc,eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNTUiLCJhdWQiOiIxNTUiLCJleHAiOjI2MTI0OTA0NTF9.KoHGx6kh012g84OIQqBsaIkIYkl05Ri9kJ-WO-oLm-0}	\N	0	https://s120-ava-talk.zadn.vn/d/d/2/4/19/120/980c8f9bf2dea14abd14ec525d204864.jpg	Linh	2912321974392943763	1	2021-02-05 09:00:07.215	2021-02-05 09:00:51.209	8187829573583875332	\N	942080400
145	84765406277	\N	t	{eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNDUiLCJhdWQiOiIxNDUiLCJleHAiOjI2MTIyMzYyMzF9.TXlszmDrh52HuB88djqvLe4sNG8JvA-re5bXUFha-ic}	1098	2	https://s120-ava-talk.zadn.vn/1/f/d/8/11/120/26bc0d09b243b50881a6b551ad47f442.jpg	Lan Hương	1389247133555122878	1	2021-02-02 10:23:46.266	2021-02-02 10:26:22.836	5371736703137397545	\N	785437200
146	84784879171	\N	t	{eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNDYiLCJhdWQiOiIxNDYiLCJleHAiOjI2MTIyMzY2NTd9.Sd3l2WiJQySEcLr2rTfu7Db-EvqQs-vKgfV4nZWPE0g}	1099	2	https://s120-ava-talk.zadn.vn/0/e/1/c/47/120/c7b8896cdb7a97d0b107a6a88b4bb3f8.jpg	Nguyen Hoang Viet Ngan	2246620651600807124	1	2021-02-02 10:30:53.215	2021-02-02 10:31:44.988	5108840569885416771	\N	771354000
144	84906600337	\N	t	{eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNDQiLCJhdWQiOiIxNDQiLCJleHAiOjI2MTIyNDA5OTN9.ZYvsfxav-WE61UL5H7xx9gFSQXQ4NN5z-JCKGck2hRs}	1104	2	https://s120-ava-talk.zadn.vn/4/a/6/f/18/120/9e142aabb58a5aa6c14a85d128c57168.jpg	Nguyễn Thanh Khiết	2452392439676280049	1	2021-02-02 10:22:07.503	2021-02-02 11:44:01.385	8917975072990610790	\N	715885200
151	\N	\N	f	\N	\N	\N	\N	\N	4224865149541231960	\N	2021-02-02 12:48:46.581	2021-02-02 12:48:46.581	7163567304879633615	\N	\N
152	\N		t	{eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNTIiLCJhdWQiOiIxNTIiLCJleHAiOjI2MTIyNDQ5ODN9.FJN-actZ55YTd30FQ-safCG4F5EcTSZZdiE4YKWP7TI}	\N	0	https://s120-ava-talk.zadn.vn/a/9/5/2/51/120/3351ef15ce9689887cebdba72154ab12.jpg	Tân Lê	6381973508132929384	1	2021-02-02 12:49:10.278	2021-02-02 12:49:43.258	97660743479043839	\N	860778000
147	84386900055	\N	t	{eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNDciLCJhdWQiOiIxNDciLCJleHAiOjI2MTIyMzcxNzZ9.k1BTUq6_pfqKDb2JzI9clHHI52TYmSB1xCmm5SEXTAk,eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNDciLCJhdWQiOiIxNDciLCJleHAiOjI2MTIyMzcxNzZ9.k1BTUq6_pfqKDb2JzI9clHHI52TYmSB1xCmm5SEXTAk}	1100	2	https://s120-ava-talk.zadn.vn/4/9/3/8/5/120/6dc3e1a311c80e30120cb37955a66f60.jpg	Hoàng Thị Khánh Hòa	4958409936094641462	1	2021-02-02 10:38:29.573	2021-02-02 10:41:24.491	2090912033243849889	\N	912704400
153	84963529024	\N	t	{eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNTMiLCJhdWQiOiIxNTMiLCJleHAiOjI2MTIyNjIxNjB9.NLbirlXKVs0udsZejXeJSGQ-gWpRe8P-ohOpo20PE1M}	1105	2	https://s120-ava-talk.zadn.vn/8/5/4/0/87/120/6b452675ef6b6de4e11db6aa6950c5a0.jpg	Nắng	723674716877961202	1	2021-02-02 17:35:45.509	2021-02-02 17:37:27.666	6035004543443922533	\N	917888400
140	84972797200	123	t	{eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNDAiLCJhdWQiOiIxNDAiLCJleHAiOjI2MTIyMDM1MDR9.C60mvO5aGBkY9v-iyvyemgJUfLUqcNwQIJVcfaNHeaI,eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNDAiLCJhdWQiOiIxNDAiLCJleHAiOjI2MTIyMzUyMDV9.w8mce0a5trlkCoKLa80gNp4jW1mWcnVPLYAOpn-1KVU}	\N	1	https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/log-admin.png	INSEE Admin	\N	1	2021-02-02 01:16:54.133	2021-02-02 10:06:45.263	\N	\N	\N
154	84972797184	\N	t	{eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNTQiLCJhdWQiOiIxNTQiLCJleHAiOjI2MTIyODYxOTl9.NgKZX0LTtZ7YvONmwU96LJdC6RTbLcvG2RkscLTCfEo,eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNTQiLCJhdWQiOiIxNTQiLCJleHAiOjI2MTIyODYzNTN9.4RXDS3QQzNbmYrx9D9i4xVHzLqqUDwW8Kym8qqycIgM,eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNTQiLCJhdWQiOiIxNTQiLCJleHAiOjI2MTIzNDc5MjZ9.0VmLw_4QebgrjTxzJY1VJHgmtkRe8JV5OiEzrLakJQY}	1106	2	https://s120-ava-talk.zadn.vn/f/f/a/9/10/120/87069ccaa43702ad56ec93fe5a75f24f.jpg	Đình Trung	2375410621537804558	1	2021-02-03 00:16:39.669	2021-02-03 17:25:26.98	8735999925442427033	\N	711478800
148	84353292697	\N	t	{eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNDgiLCJhdWQiOiIxNDgiLCJleHAiOjI2MTIyMzcyOTV9.XhQtstEAyfGoEkF6V0K6lqR6GL-R-VUEqOdzJKOCn3E}	1101	2	https://s120-ava-talk.zadn.vn/0/4/5/2/13/120/6d6dde9f1e296255385416d7d470cdb6.jpg	Tiên Nguyễn	3904267219432517335	1	2021-02-02 10:41:31.203	2021-02-02 10:42:07.47	8062877799991277376	\N	612378000
143	84363020318	\N	t	{eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNDMiLCJhdWQiOiIxNDMiLCJleHAiOjI2MTIyMzU5NzV9.DH1Rni9SMuNVXP0eRBnt0DEZKGo7FlBAiAEdZGAF-AM,eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNDMiLCJhdWQiOiIxNDMiLCJleHAiOjI2MTIyMzYwMDV9.drYpmc4Nz3Rf6M68wrssW08KwtXRxn5xYpRRIc-1kwY}	1097	2	https://s120-ava-talk.zadn.vn/b/a/8/3/13/120/14f987ff2a04246eaa6669e16e1b53a7.jpg	Lê Hoàng Vy	6572395637409929420	1	2021-02-02 10:18:31.182	2021-02-02 10:20:59.081	215735146262004059	\N	877280400
\.


--
-- Name: bill_id_seq; Type: SEQUENCE SET; Schema: promotion; Owner: postgres
--

SELECT pg_catalog.setval('promotion.bill_id_seq', 36, true);


--
-- Name: construction_id_seq; Type: SEQUENCE SET; Schema: promotion; Owner: postgres
--

SELECT pg_catalog.setval('promotion.construction_id_seq', 48, true);


--
-- Name: customer_id_seq; Type: SEQUENCE SET; Schema: promotion; Owner: postgres
--

SELECT pg_catalog.setval('promotion.customer_id_seq', 1106, true);


--
-- Name: gift_id_seq; Type: SEQUENCE SET; Schema: promotion; Owner: postgres
--

SELECT pg_catalog.setval('promotion.gift_id_seq', 27, true);


--
-- Name: history_id_seq; Type: SEQUENCE SET; Schema: promotion; Owner: postgres
--

SELECT pg_catalog.setval('promotion.history_id_seq', 1, false);


--
-- Name: image_id_seq; Type: SEQUENCE SET; Schema: promotion; Owner: postgres
--

SELECT pg_catalog.setval('promotion.image_id_seq', 35, true);


--
-- Name: label_id_seq; Type: SEQUENCE SET; Schema: promotion; Owner: postgres
--

SELECT pg_catalog.setval('promotion.label_id_seq', 8, true);


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: promotion; Owner: postgres
--

SELECT pg_catalog.setval('promotion.post_id_seq', 1010, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: promotion; Owner: postgres
--

SELECT pg_catalog.setval('promotion.user_id_seq', 155, true);


--
-- Name: bill bill_pkey; Type: CONSTRAINT; Schema: promotion; Owner: postgres
--

ALTER TABLE ONLY promotion.bill
    ADD CONSTRAINT bill_pkey PRIMARY KEY (id);


--
-- Name: construction construction2_pkey; Type: CONSTRAINT; Schema: promotion; Owner: postgres
--

ALTER TABLE ONLY promotion.construction
    ADD CONSTRAINT construction2_pkey PRIMARY KEY (id);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: promotion; Owner: postgres
--

ALTER TABLE ONLY promotion.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- Name: gift gift_pkey; Type: CONSTRAINT; Schema: promotion; Owner: postgres
--

ALTER TABLE ONLY promotion.gift
    ADD CONSTRAINT gift_pkey PRIMARY KEY (id);


--
-- Name: history history_pkey; Type: CONSTRAINT; Schema: promotion; Owner: postgres
--

ALTER TABLE ONLY promotion.history
    ADD CONSTRAINT history_pkey PRIMARY KEY (id);


--
-- Name: image image_pkey; Type: CONSTRAINT; Schema: promotion; Owner: postgres
--

ALTER TABLE ONLY promotion.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- Name: label label_pkey; Type: CONSTRAINT; Schema: promotion; Owner: postgres
--

ALTER TABLE ONLY promotion.label
    ADD CONSTRAINT label_pkey PRIMARY KEY (id);


--
-- Name: promotion post_pkey; Type: CONSTRAINT; Schema: promotion; Owner: postgres
--

ALTER TABLE ONLY promotion.promotion
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: promotion; Owner: postgres
--

ALTER TABLE ONLY promotion."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

