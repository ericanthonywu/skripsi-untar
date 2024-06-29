--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Homebrew)
-- Dumped by pg_dump version 14.11 (Homebrew)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: ericanthony
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO ericanthony;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: ericanthony
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: ericanthony
--

CREATE TABLE public.admin (
    id bigint NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'admin'::character varying NOT NULL
);


ALTER TABLE public.admin OWNER TO ericanthony;

--
-- Name: COLUMN admin.role; Type: COMMENT; Schema: public; Owner: ericanthony
--

COMMENT ON COLUMN public.admin.role IS 'admin, viewer';


--
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: ericanthony
--

CREATE SEQUENCE public.admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_id_seq OWNER TO ericanthony;

--
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ericanthony
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- Name: anggota_penelitian; Type: TABLE; Schema: public; Owner: ericanthony
--

CREATE TABLE public.anggota_penelitian (
    id bigint NOT NULL,
    id_penelitian bigint NOT NULL,
    id_dosen bigint,
    id_mahasiswa bigint
);


ALTER TABLE public.anggota_penelitian OWNER TO ericanthony;

--
-- Name: dokumen_penelitian; Type: TABLE; Schema: public; Owner: ericanthony
--

CREATE TABLE public.dokumen_penelitian (
    id bigint NOT NULL,
    id_penelitian bigint NOT NULL,
    tipe_dokumen bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone,
    file character varying NOT NULL,
    original_filename character varying NOT NULL
);


ALTER TABLE public.dokumen_penelitian OWNER TO ericanthony;

--
-- Name: dosen; Type: TABLE; Schema: public; Owner: ericanthony
--

CREATE TABLE public.dosen (
    id bigint NOT NULL,
    nama_dosen character varying NOT NULL,
    nomor_induk_dosen_nasional character varying NOT NULL,
    password character varying NOT NULL,
    nomor_induk_pegawai character varying,
    email character varying,
    fakultas character varying
);


ALTER TABLE public.dosen OWNER TO ericanthony;

--
-- Name: COLUMN dosen.nomor_induk_dosen_nasional; Type: COMMENT; Schema: public; Owner: ericanthony
--

COMMENT ON COLUMN public.dosen.nomor_induk_dosen_nasional IS 'nisn';


--
-- Name: dosen_id_seq; Type: SEQUENCE; Schema: public; Owner: ericanthony
--

CREATE SEQUENCE public.dosen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dosen_id_seq OWNER TO ericanthony;

--
-- Name: dosen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ericanthony
--

ALTER SEQUENCE public.dosen_id_seq OWNED BY public.dosen.id;


--
-- Name: mahasiswa; Type: TABLE; Schema: public; Owner: ericanthony
--

CREATE TABLE public.mahasiswa (
    id bigint NOT NULL,
    nama_mahasiswa character varying NOT NULL,
    nomor_induk_mahasiswa character varying
);


ALTER TABLE public.mahasiswa OWNER TO ericanthony;

--
-- Name: mahasiswa_id_seq; Type: SEQUENCE; Schema: public; Owner: ericanthony
--

CREATE SEQUENCE public.mahasiswa_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mahasiswa_id_seq OWNER TO ericanthony;

--
-- Name: mahasiswa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ericanthony
--

ALTER SEQUENCE public.mahasiswa_id_seq OWNED BY public.mahasiswa.id;


--
-- Name: master_kategori_penelitian; Type: TABLE; Schema: public; Owner: ericanthony
--

CREATE TABLE public.master_kategori_penelitian (
    id bigint NOT NULL,
    nama character varying NOT NULL
);


ALTER TABLE public.master_kategori_penelitian OWNER TO ericanthony;

--
-- Name: TABLE master_kategori_penelitian; Type: COMMENT; Schema: public; Owner: ericanthony
--

COMMENT ON TABLE public.master_kategori_penelitian IS 'internal, national, international';


--
-- Name: master_kategori_proposal_id_seq; Type: SEQUENCE; Schema: public; Owner: ericanthony
--

CREATE SEQUENCE public.master_kategori_proposal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.master_kategori_proposal_id_seq OWNER TO ericanthony;

--
-- Name: master_kategori_proposal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ericanthony
--

ALTER SEQUENCE public.master_kategori_proposal_id_seq OWNED BY public.master_kategori_penelitian.id;


--
-- Name: master_tipe_penelitian_dokumen; Type: TABLE; Schema: public; Owner: ericanthony
--

CREATE TABLE public.master_tipe_penelitian_dokumen (
    id bigint NOT NULL,
    nama character varying NOT NULL
);


ALTER TABLE public.master_tipe_penelitian_dokumen OWNER TO ericanthony;

--
-- Name: COLUMN master_tipe_penelitian_dokumen.nama; Type: COMMENT; Schema: public; Owner: ericanthony
--

COMMENT ON COLUMN public.master_tipe_penelitian_dokumen.nama IS 'proposal, dokumen evaluasi, laporan akhir, luaran (paper), spk, hki';


--
-- Name: master_proposal_dokumen_id_seq; Type: SEQUENCE; Schema: public; Owner: ericanthony
--

CREATE SEQUENCE public.master_proposal_dokumen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.master_proposal_dokumen_id_seq OWNER TO ericanthony;

--
-- Name: master_proposal_dokumen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ericanthony
--

ALTER SEQUENCE public.master_proposal_dokumen_id_seq OWNED BY public.master_tipe_penelitian_dokumen.id;


--
-- Name: master_subkategori_penelitian; Type: TABLE; Schema: public; Owner: ericanthony
--

CREATE TABLE public.master_subkategori_penelitian (
    id bigint NOT NULL,
    id_master_kategori_penelitian bigint NOT NULL,
    nama character varying NOT NULL
);


ALTER TABLE public.master_subkategori_penelitian OWNER TO ericanthony;

--
-- Name: master_subkategori_proposal_id_seq; Type: SEQUENCE; Schema: public; Owner: ericanthony
--

CREATE SEQUENCE public.master_subkategori_proposal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.master_subkategori_proposal_id_seq OWNER TO ericanthony;

--
-- Name: master_subkategori_proposal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ericanthony
--

ALTER SEQUENCE public.master_subkategori_proposal_id_seq OWNED BY public.master_subkategori_penelitian.id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: ericanthony
--

CREATE TABLE public.notification (
    id bigint NOT NULL,
    message character varying NOT NULL,
    dosen_id bigint NOT NULL,
    penelitian_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    read_dosen boolean DEFAULT false NOT NULL,
    read_admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.notification OWNER TO ericanthony;

--
-- Name: notification_id_seq; Type: SEQUENCE; Schema: public; Owner: ericanthony
--

CREATE SEQUENCE public.notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notification_id_seq OWNER TO ericanthony;

--
-- Name: notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ericanthony
--

ALTER SEQUENCE public.notification_id_seq OWNED BY public.notification.id;


--
-- Name: penelitian; Type: TABLE; Schema: public; Owner: ericanthony
--

CREATE TABLE public.penelitian (
    id bigint NOT NULL,
    nama_proposal character varying NOT NULL,
    biaya_yang_disetujui integer NOT NULL,
    periode_awal date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_subkategori_penelitian bigint NOT NULL,
    periode_akhir date,
    status character varying DEFAULT 'Sedang Berlanjut'::character varying NOT NULL,
    status_updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ketua_dosen_penelitian bigint NOT NULL,
    biaya_yang_diajukan integer DEFAULT 0 NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.penelitian OWNER TO ericanthony;

--
-- Name: COLUMN penelitian.status; Type: COMMENT; Schema: public; Owner: ericanthony
--

COMMENT ON COLUMN public.penelitian.status IS 'sedang berlanjut, selesai, batal';


--
-- Name: proposal_anggota_id_seq; Type: SEQUENCE; Schema: public; Owner: ericanthony
--

CREATE SEQUENCE public.proposal_anggota_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proposal_anggota_id_seq OWNER TO ericanthony;

--
-- Name: proposal_anggota_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ericanthony
--

ALTER SEQUENCE public.proposal_anggota_id_seq OWNED BY public.anggota_penelitian.id;


--
-- Name: proposal_dokumen_id_seq; Type: SEQUENCE; Schema: public; Owner: ericanthony
--

CREATE SEQUENCE public.proposal_dokumen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proposal_dokumen_id_seq OWNER TO ericanthony;

--
-- Name: proposal_dokumen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ericanthony
--

ALTER SEQUENCE public.proposal_dokumen_id_seq OWNED BY public.dokumen_penelitian.id;


--
-- Name: proposal_id_seq; Type: SEQUENCE; Schema: public; Owner: ericanthony
--

CREATE SEQUENCE public.proposal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proposal_id_seq OWNER TO ericanthony;

--
-- Name: proposal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ericanthony
--

ALTER SEQUENCE public.proposal_id_seq OWNED BY public.penelitian.id;


--
-- Name: session_table; Type: TABLE; Schema: public; Owner: ericanthony
--

CREATE TABLE public.session_table (
    sid character varying(255) NOT NULL,
    sess json NOT NULL,
    expired timestamp with time zone NOT NULL
);


ALTER TABLE public.session_table OWNER TO ericanthony;

--
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- Name: anggota_penelitian id; Type: DEFAULT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.anggota_penelitian ALTER COLUMN id SET DEFAULT nextval('public.proposal_anggota_id_seq'::regclass);


--
-- Name: dokumen_penelitian id; Type: DEFAULT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.dokumen_penelitian ALTER COLUMN id SET DEFAULT nextval('public.proposal_dokumen_id_seq'::regclass);


--
-- Name: dosen id; Type: DEFAULT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.dosen ALTER COLUMN id SET DEFAULT nextval('public.dosen_id_seq'::regclass);


--
-- Name: mahasiswa id; Type: DEFAULT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.mahasiswa ALTER COLUMN id SET DEFAULT nextval('public.mahasiswa_id_seq'::regclass);


--
-- Name: master_kategori_penelitian id; Type: DEFAULT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.master_kategori_penelitian ALTER COLUMN id SET DEFAULT nextval('public.master_kategori_proposal_id_seq'::regclass);


--
-- Name: master_subkategori_penelitian id; Type: DEFAULT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.master_subkategori_penelitian ALTER COLUMN id SET DEFAULT nextval('public.master_subkategori_proposal_id_seq'::regclass);


--
-- Name: master_tipe_penelitian_dokumen id; Type: DEFAULT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.master_tipe_penelitian_dokumen ALTER COLUMN id SET DEFAULT nextval('public.master_proposal_dokumen_id_seq'::regclass);


--
-- Name: notification id; Type: DEFAULT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.notification ALTER COLUMN id SET DEFAULT nextval('public.notification_id_seq'::regclass);


--
-- Name: penelitian id; Type: DEFAULT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.penelitian ALTER COLUMN id SET DEFAULT nextval('public.proposal_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.admin (id, username, password, role) FROM stdin;
3	adminviewer1	$2b$10$d02tS90rTQqmjhbGQxgYze7a6g1LgL1pptcV0eWV9mQzkVHAOWzgy	viewer
2	admin	$2b$10$e7zI4UyoAlYjqEfGu9OAbe1GA97RRN6Al2m5E2PprK0Y6F0V0/mHK	admin
5	adminviewer2	$2b$10$bydGd6XC.7ByUgXmopNTo.0ZgfY/KnWdcGbA7NO7Rt71aehbN9T3K	viewer
\.


--
-- Data for Name: anggota_penelitian; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.anggota_penelitian (id, id_penelitian, id_dosen, id_mahasiswa) FROM stdin;
147	45	964	\N
148	45	\N	\N
233	62	\N	\N
234	62	\N	\N
235	57	\N	\N
236	57	\N	\N
181	46	\N	\N
182	46	993	\N
259	61	\N	65
260	61	964	\N
261	60	\N	65
262	60	\N	66
263	60	993	\N
264	59	998	\N
268	63	\N	65
269	63	\N	66
270	63	639	\N
271	64	968	\N
272	64	\N	65
273	66	993	\N
274	66	624	\N
275	66	\N	65
276	66	\N	66
283	50	\N	65
284	50	\N	66
285	50	993	\N
288	44	\N	65
289	44	\N	66
291	47	\N	66
292	47	991	\N
\.


--
-- Data for Name: dokumen_penelitian; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.dokumen_penelitian (id, id_penelitian, tipe_dokumen, created_at, updated_at, file, original_filename) FROM stdin;
52	44	2	2024-05-02 01:30:01.083551	\N	/uploads/surat_perjanjian_kerjasama/be64d373-b653-4604-8219-11e82f4daf10.pdf	2465-Article Text-13366-1-10-20231011.pdf
53	44	3	2024-05-02 01:30:01.083551	\N	/uploads/file_monev/3971f3c7-dc99-46ed-9a2c-0761af497c16.pdf	2465-Article Text-13366-1-10-20231011.pdf
55	45	1	2024-05-02 01:53:45.115044	\N	/uploads/file_proposal/b4845e71-8d8a-4e03-9ed5-8a0a1ba6c4d0.pdf	2465-Article Text-13366-1-10-20231011.pdf
56	45	2	2024-05-02 01:53:45.115044	\N	/uploads/surat_perjanjian_kerjasama/cea61238-9e94-4587-8b4c-f2dde264ed62.PDF	10005438.PDF
57	46	1	2024-05-02 01:54:59.400772	\N	/uploads/file_proposal/1a046229-d4b4-4da5-a2dc-f6eabb5226c8.pdf	825200057_Frencent Kinselton_Proposal_Skripsi 1.pdf
58	46	2	2024-05-02 14:45:50.733609	\N	/uploads/surat_perjanjian_kerjasama/b8f37bff-a360-4b0d-be9e-3d349a198f6d.pdf	CV Eric Anthony 2023.pdf
59	46	3	2024-05-02 14:45:58.203005	\N	/uploads/file_monev/5b3ba05e-29a9-400d-9093-dfc2f0746ef9.docx	Perancangan Aplikasi Manajemen Data Publikasi dan Penelitian.docx
61	46	5	2024-05-02 14:46:59.477039	\N	/uploads/file_laporan_akhir/863f63f0-b748-4bd0-a9d6-3f8176c13f9b.pdf	2465-Article Text-13366-1-10-20231011.pdf
60	46	4	2024-05-02 14:46:34.66961	\N	/uploads/file_laporan_kemajuan/0062afae-dfd0-4f5a-b767-50f3d8eb1ee6.pdf	825200057_Frencent Kinselton_Proposal_Skripsi 1.pdf
51	44	1	2024-05-02 01:30:01.083551	\N	/uploads/file_proposal/121464fb-3d14-457a-adce-72fa6a445d9d.pdf	825200057_Frencent Kinselton_Proposal_Skripsi 1.pdf
54	44	4	2024-05-02 01:30:01.083551	\N	/uploads/file_laporan_kemajuan/e060332e-13ad-4fad-a388-1249192b38d9.PDF	10005438.PDF
62	47	1	2024-05-06 17:23:50.805568	\N	/uploads/file_proposal/5fddffa2-cca2-4103-987e-e8313a13fd34.pdf	2465-Article Text-13366-1-10-20231011.pdf
63	56	1	2024-05-07 20:25:59.112989	\N	/uploads/file_proposal/46980194-4ab3-4355-86a9-2157a7e8bb09.docx	Perancangan Aplikasi Manajemen Data Publikasi dan Penelitian.docx
64	56	2	2024-05-07 20:29:39.183047	\N	/uploads/surat_perjanjian_kerjasama/14d77d09-932c-458d-8851-5e97412ac6bf.pdf	CV Eric Anthony 2023.pdf
65	61	1	2024-05-17 14:29:18.611883	\N	/uploads/file_proposal/adfbea09-73fb-4f17-99c9-1f0bdd238207.pdf	2465-Article Text-13366-1-10-20231011.pdf
66	62	1	2024-05-17 15:49:49.656198	\N	/uploads/file_proposal/76223fa0-e9c4-4a6d-bf85-6532b5206f29.pdf	825200050-Eric Anthony.pdf
67	62	2	2024-05-17 15:50:14.862668	\N	/uploads/surat_perjanjian_kerjasama/56bc6605-a6a9-40d2-b10c-30d292939c32.pdf	CV Eric Anthony 2023.pdf
68	57	1	2024-05-29 12:10:10.03867	\N	/uploads/file_proposal/7233aed9-ea54-4c82-8017-e03554a60d5e.pdf	825200050-Eric Anthony.pdf
69	57	2	2024-05-29 12:10:10.03867	\N	/uploads/surat_perjanjian_kerjasama/6e2b27c3-7422-4d2d-bbb2-552302d23361.pdf	825200050-Eric Anthony.pdf
70	57	3	2024-05-29 12:10:10.03867	\N	/uploads/file_monev/c89ea001-67bd-4456-8033-6097d4d46d9f.docx	Perancangan Aplikasi Manajemen Data Publikasi dan Penelitian.docx
71	57	4	2024-05-29 12:10:10.03867	\N	/uploads/file_laporan_kemajuan/bf477cd4-cc12-41b9-ba4d-0892d7f011e7.pdf	825200050-Eric Anthony.pdf
72	57	5	2024-05-29 12:10:10.03867	\N	/uploads/file_laporan_akhir/c323c129-379f-4042-8c5a-7d602cd71e88.pdf	CV Eric Anthony 2024.pdf
73	47	2	2024-05-29 15:15:53.971792	\N	/uploads/surat_perjanjian_kerjasama/2db8b731-f73c-40cb-a00c-4de9d9e778ce.docx	Perancangan Aplikasi Manajemen Data Publikasi dan Penelitian.docx
74	63	1	2024-05-31 00:38:51.612318	\N	/uploads/file_proposal/0c1acd2e-b894-4e6f-8726-10e6430e82d2.pdf	CV Eric Anthony 2024.pdf
75	63	2	2024-05-31 01:43:25.906316	\N	/uploads/surat_perjanjian_kerjasama/5f9e3133-8f46-4a9f-95eb-6f42c0871fa0.pdf	CV Eric Anthony 2024.pdf
76	61	2	2024-05-31 01:43:40.455976	\N	/uploads/surat_perjanjian_kerjasama/154bc49e-7e7e-4a9a-9477-d2aa5d3c679c.docx	User Acceptance Testing.docx
77	60	1	2024-05-31 01:55:58.833005	\N	/uploads/file_proposal/8a9f63e1-6fc5-4945-852c-e4926bd2ab9c.pdf	CV Eric Anthony 2024.pdf
78	60	2	2024-05-31 01:55:58.833005	\N	/uploads/surat_perjanjian_kerjasama/b7117820-52e3-4219-8351-4427d52583ae.pdf	825200050-Eric Anthony.pdf
79	60	3	2024-05-31 01:55:58.833005	\N	/uploads/file_monev/01e4a811-48cd-4af4-819d-dcd17ea25c18.pdf	CV Eric Anthony 2024.pdf
80	60	4	2024-05-31 01:55:58.833005	\N	/uploads/file_laporan_kemajuan/56a65b74-1f85-4ddb-91fa-a5f94fc8618c.pdf	825200050-Eric Anthony.pdf
81	60	5	2024-05-31 01:55:58.833005	\N	/uploads/file_laporan_akhir/1a25cdf1-3812-4985-b14c-ca6da718217e.pdf	825200050-Eric Anthony.pdf
82	58	1	2024-05-31 01:56:48.181972	\N	/uploads/file_proposal/260a9164-68a6-4c91-ba89-d2f1cb110d0f.docx	Perancangan Aplikasi Manajemen Data Publikasi dan Penelitian.docx
83	58	2	2024-05-31 01:56:48.181972	\N	/uploads/surat_perjanjian_kerjasama/efa3d8ea-0577-4c18-83a2-cee9e087c50a.pdf	825200050-Eric Anthony.pdf
84	58	3	2024-05-31 01:56:48.181972	\N	/uploads/file_monev/2947612a-9ed8-420c-9043-cd054ba1d648.pdf	CV Eric Anthony 2024.pdf
85	58	4	2024-05-31 01:56:48.181972	\N	/uploads/file_laporan_kemajuan/f1372a33-708c-482e-b26f-b66eed9d890b.pdf	825200050-Eric Anthony.pdf
86	58	5	2024-05-31 01:56:48.181972	\N	/uploads/file_laporan_akhir/58fc7dfb-93cc-4114-bd22-a9b42ae196c9.docx	Perancangan Aplikasi Manajemen Data Publikasi dan Penelitian.docx
87	59	1	2024-05-31 01:57:19.420022	\N	/uploads/file_proposal/bbd49df7-a44b-4f61-babd-64768fe7270b.pdf	825200050-Eric Anthony.pdf
88	59	2	2024-05-31 01:57:19.420022	\N	/uploads/surat_perjanjian_kerjasama/283569a9-11f1-4141-97a6-0cdc7b3a9bbd.pdf	CV Eric Anthony 2024.pdf
89	64	1	2024-06-02 23:30:00.208514	\N	/uploads/file_proposal/32b3e99e-eb95-4786-9f37-82c6c3f032fd.pdf	825200050-Eric Anthony.pdf
90	64	2	2024-06-02 23:30:00.208514	\N	/uploads/surat_perjanjian_kerjasama/88ced03f-cb9f-4cda-a2f4-7a11abff5568.docx	Perancangan Aplikasi Manajemen Data Publikasi dan Penelitian copy.docx
91	64	3	2024-06-02 23:30:00.208514	\N	/uploads/file_monev/c8e5187e-456a-4719-bfcc-35bc57fa277d.docx	User Acceptance Testing.docx
92	64	4	2024-06-02 23:30:00.208514	\N	/uploads/file_laporan_kemajuan/46270244-47ed-424c-b372-1e5535e6c907.pdf	825200050-Eric Anthony.pdf
93	64	5	2024-06-02 23:30:00.208514	\N	/uploads/file_laporan_akhir/e403327c-3ba1-4de8-8254-b70cde023cd3.pdf	CV Eric Anthony 2024.pdf
95	50	2	2024-06-03 01:06:11.570369	\N	/uploads/surat_perjanjian_kerjasama/132e02b8-5d03-4191-aada-36095970fbc8.pdf	825200057_Frencent Kinselton_Proposal_Skripsi 1.pdf
96	50	3	2024-06-03 01:06:11.570369	\N	/uploads/file_monev/6e976732-3d08-430a-8dfa-26f8d8f92c56.docx	46980194-4ab3-4355-86a9-2157a7e8bb09.docx
97	50	4	2024-06-03 01:06:11.570369	\N	/uploads/file_laporan_kemajuan/c9cdf12c-4af9-4799-b357-2677db1a9560.pdf	825200057_Frencent Kinselton_Proposal_Skripsi 1.pdf
94	50	1	2024-06-03 01:06:11.570369	\N	/uploads/file_proposal/855e0266-7423-422a-85ff-ffa639552c54.PDF	10005438.PDF
98	50	5	2024-06-03 01:07:18.414838	\N	/uploads/file_laporan_akhir/4e6a4e38-ed23-4f83-af8a-a2d54a7e6ddc.pdf	825200057_Frencent Kinselton_Proposal_Skripsi 1.pdf
\.


--
-- Data for Name: dosen; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.dosen (id, nama_dosen, nomor_induk_dosen_nasional, password, nomor_induk_pegawai, email, fakultas) FROM stdin;
625	SANDY KARTASASMITA	0322117501	$2b$10$EzbbGv65c8F.sCGZPzw7rORqJfGzfkTF2lgwiXeAm5otXKgog/rU6	0002	sandik@fpsi.untar.ac.id	Pendidikan Profesi Psikologi
626	DENRICH SURYADI	0317067901	$2b$10$rVH0suIk9H2K6ryVN5CKo.g7c6xr/yeUFxTUio97s/eK2fWMiZHSO	0003	denrichs@fpsi.untar.ac.id	Pendidikan Profesi Psikologi
628	KIKY DWI HAPSARI SARASWATI	0301037903	$2b$10$tGIPv7VmuYAYihPBxQo/D.miRmNnrNCgn5qNdEx98060w1U7ORYO.	0005	kikys@fpsi.untar.ac.id	Pendidikan Profesi Psikologi
629	RICHARD ANDREW	0313028405	$2b$10$feberHVvrV249C1YDVC6e.HzNb7xsHaQ995jd.pNyIvPRhdmzXPoG	0006	richarda@fe.untar.ac.id	Profesi Akuntan
630	PURNAMAWATI HELEN WIDJAJA	0311066302	$2b$10$vZGioVW19RO.eyR2bPeZQuSIj4wXy.eqe.t47wizzrPIwgv6/HLqa	0007	purnamawatiw@fe.untar.ac.id	Profesi Akuntan
631	PURNAMA DHARMAWAN	0315095901	$2b$10$dJBF9Tu3mTBenHAKNHYYF.ekFvNuBVZcfB.aSXbTKQ/D3BGYik/T.	0008	purnamad@fe.untar.ac.id	Profesi Akuntan
632	RORLEN	0316077902	$2b$10$m1vXSojtthl/8Q/dZMYLQeffE.agfdNzwk6gNe/xSvpvhNppfdz8S	0009	rorlen@fe.untar.ac.id	Profesi Akuntan
633	ARDIANSYAH	0326096601	$2b$10$AN2aImNTbdYTP7oJRubtx.EyCAhjRbjMnLT5pC5qoy69mayrrKtaG	0010	ardiansyahr@fe.untar.ac.id	Profesi Akuntan
635	ELVI ANGGRAENI TJANDRA	0320047002	$2b$10$m/HhkQ6Od0tBTm74YEpGYuz3vCi9LGsbPy/kT51nmWkvEAzIskVFq	0012	elvit@fe.untar.ac.id	Profesi Akuntan
636	SRIWATI	0306048901	$2b$10$YGKvm4dBWMnkKLSIXhwYpu3X5qYtpY6lfeKXBL.FSciScp3o0p8W2	0013	sriwati@fe.untar.ac.id	Profesi Akuntan
637	HENNY	0318097902	$2b$10$4TT.lNjM/9LpsOvThw9X/e6Z1RurpTXqkkuhKbk3bXf4m2rjwh1lu	0014	henny@fe.untar.ac.id	Profesi Akuntan
638	HERNI KURNIAWATI	0318048305	$2b$10$yYBNAx93U.NUy.FCmnjQ9..Lnx17IjH5ovojfkmlkPAfqGjrz4rZ6	0015	hernik@fe.untar.ac.id	Profesi Akuntan
639	TONY SUDIRGO	0308126802	$2b$10$zeoTvsHc5d4eABaqb7.eje9hhFPa/BkjCLls22Y7yHCBWylwGiYxa	0016	tonys@fe.untar.ac.id	Profesi Akuntan
640	WIDYASARI	0303078302	$2b$10$68BuiDQzcHb5Ir6zGPD1pOqWMLD.H93TnBN.uGHSdPfC4TvlUOPN6	0017	widyasari@fe.untar.ac.id	Profesi Akuntan
641	CHELSYA	0327108005	$2b$10$fu2FQZoqu35XxdHbHHCkneJyccEFwkpqZIlRyLxAhhKpz/9GfUrcO	0018	chelsya@fe.untar.ac.id	Profesi Akuntan
642	DJENI INDRAJATI WIDJAJA	0305066001	$2b$10$dksRJ6DxIOUx4f0hGOjK4.uUI.Jhm5hEkbuDO2hCqoW4bzITkqsFm	0019	djenii@fe.untar.ac.id	Profesi Akuntan
644	SYANTI DEWI	0302107902	$2b$10$AacYOE.tFI24VIWWUudvoObyTK9SdgsNGZqvX7XkFWMXCGDzcNvEy	0021	syantid@fe.untar.ac.id	Profesi Akuntan
645	FERRY ADANG	0321118903	$2b$10$cLIBitv5N3aIzD6IY8qeeuFkOqVVxOg2uSLxE47FUHudpJ.3dLpsy	0022	ferrya@fe.untar.ac.id	Profesi Akuntan
646	URBANUS URA WERUIN	0324066501	$2b$10$ZNyAmtvMHfKmj7SnK3GMWuRnoUQShYcAeZ.jZN4/k9FR/7NqFhMQi	0023	urbanusw@mku.untar.ac.id	Profesi Akuntan
647	NATAHERWIN	0305078102	$2b$10$XGnQNXBNy0L4TdMPkSQQce3Zqe6GwCfB90pazZkdAuuIOF7G1SiVa	0024	nataherwin@fe.untar.ac.id	Profesi Akuntan
648	VIDYARTO NUGROHO	0314056202	$2b$10$C.UUSstgBNtOF9rT812uEO.BSnRuXeuVLh2SMWS6eoz1ZHck4eTMi	0025	vidyarton@fe.untar.ac.id	Profesi Akuntan
649	YUSTINA PENIYANTI 	0317086504	$2b$10$3xbr0QB8DBbYKhdm6i31yexJaafY3/Zg9ArmMVweRsY5XSXoAN7Wm	0026	yustinap@fe.untar.ac.id	Profesi Akuntan
650	SURYANI	0326077701	$2b$10$zoXocAP0FBRkjJtRRhJx9unrF4ZjZsexC3yQ.HvMZQ1emWmTeZ8Fy	0027	suryani@fe.untar.ac.id	Profesi Akuntan
651	EMILLIA S	0302018202	$2b$10$qshXDL261nY/yHVOeA0OvufLoWEbZ3XXH4n5ZMWr0zWKlFiN0rJWO	0028	emillias@fe.untar.ac.id	Profesi Akuntan
653	AMIN WIJOYO	0301118503	$2b$10$PxJk4aDbMf3JvTURACjj2OgTI62uwgqLoVFS6BFf/DdHvF4yWns/G	0030	aminw@fe.untar.ac.id	Profesi Akuntan
654	FANNY ANDRIANI SETIAWAN	0327106405	$2b$10$iWuiFRYtyJeIJTo4K52g5uaCx8KqiGdq8ZyTcv70EPcISY850ZAry	0031	fannys@fe.untar.ac.id	Profesi Akuntan
655	JUNI SIMINA	0306016501	$2b$10$tnZov6fpeRBCa3Dx1dH88ObWD/7yHFHbXS99o4nejbl0RIr0grYs.	0032	junis@fe.untar.ac.id	Profesi Akuntan
656	NASTASYA CINDY HIDAJAT	0322119102	$2b$10$SJoZxtbWIpk0LCuPoUpswenRA/GlTqBjA9E23/mosF5nV59WduDnG	0033	natasyah@fe.untar.ac.id	Profesi Akuntan
657	TJIAUW CHIAT PENG	8837980018	$2b$10$57YnpsaFBvyLSjb0DTnZqeZmrh58vooZQaTipi70D8ldST2FqiceS	0034	tjiauwc@fe.untar.ac.id	Profesi Akuntan
658	FANNY MAGDALENA K	8807980018	$2b$10$sPtKDUp0s9sbu0XgcVJoneY14u.mLyW8vWzG12E.TX/NPC5DVOR4S	0035	fannym@fe.untar.ac.id	Profesi Akuntan
659	MEDRI DARAN	0325056001	$2b$10$wXvOYu6oPAn3GY2EOuNuP.3xyhgBCgJOuKG6gsYEHQOSsnSnoPq/q	0036	medrid@fe.untar.ac.id	Profesi Akuntan
662	ARIEF DARMAWAN SUKIANTO	8875980018	$2b$10$g2NTXIlPmeabKNPGrcBCJe4ZJB47SufouQxuWG5R9Is2g1a/CxPOe	0039	ariefd@fe.untar.ac.id	Profesi Akuntan
660	THEN TJHUNG KWONG	8826980018	$2b$10$cf/hkXBvWrSpKN/SgpdPKOiRA8OqOof3KLg4ZI4EJP211PxInPxTS	0037	tjhungk@fe.untar.ac.id	Profesi Akuntan
663	NAOMI ESTHERNITA FAUZIA DEWANTO	8885250017	$2b$10$BSCWiqdbViDWI7m699iJmOQhdpTGSTBkykdD0uR4kWIOrKUQuY.Fq	0040	dosen39@untar.ac.id	Profesi Dokter
664	HARDIANTO SETIAWAN	8823650017	$2b$10$JbhoGy5ZCzoY/VqNur647.7Xc7G7Te6CRtT7Wm1tbHszupPkQZPbm	0041	hardianto@fk.untar.ac.id	Profesi Dokter
666	ERNIODY	8886980018	$2b$10$j3KKvmXcY4b.fDbQrSWTceM9diLvy92BElHRglylz4l3JlJD0jW9S	0043	dosen42@untar.ac.id	Profesi Dokter
670	JOYCE BRATANATA	0317117608	$2b$10$MFF.cD9o2LEP7UBHUifotedfW6BN6QNSPi5UnU0kxAV7HwWWqJeBa	0047	Joyceb@fk.untar.ac.id	Profesi Dokter
671	HERWANTO	0307118305	$2b$10$azwDxMnmeKBd.4bBQc14huCAVDLutJm1ltRX/H7jmMll0rrpxyOjq	0048	herwanto@fk.untar.ac.id	Profesi Dokter
672	WIYARNI	0316057304	$2b$10$hVzd7pLXVE8gFZ2g/yprQeHNJk1GbcxxAZjmBlg4IjtfyMSKbqeBe	0049	wiyarni@fk.untar.ac.id	Profesi Dokter
673	DAVID DWI ARIWIBOWO	0317107401	$2b$10$.eqVS4zLoje9K.L43ttBKO.xI57P7ipWw3RTX8q8C9kpdzbaSDK2O	0050	davida@fk.untar.ac.id	Profesi Dokter
674	INGE FRISKA WIDJAYA	0305018302	$2b$10$grZvluQch1tJvFkFsgRWS.qQCmBZAYe4d9/OCzUbiialdjJIQEyIK	0051	ingew@fk.untar.ac.id	Profesi Dokter
667	ANDRIANA KUMALA DEWI	0331128006	$2b$10$xWkzW7XBiIYktFJSB7hVYOFzxvz7hKVShi7REctNEjkn7rFCm.1fy	0044	andrianad@fk.untar.ac.id	Profesi Dokter
669	MIRA AMALIAH	0328027802	$2b$10$R/FzJ9gAaGenjrNb5YuZROVYWrv6/1euubHvI4zEf2n67PdGzLP4W	0046	miraa@fk.untar.ac.id	Profesi Dokter
665	FREDDY DINATA	8831701019	$2b$10$45g5iewhHsmqML/vOHCpKedQJfF5vAo2.sJlLh28dFc51Uxp9q60y	0042	freddyd@fk.untar.ac.id	Profesi Dokter
668	VELMA HERWANTO	0317048306	$2b$10$vXdXtsJLlXDLm2/283ijWecJkpge0FNHHI4AhKlofqZUtiH1/qdW6	0045	velmah@fk.untar.ac.id	Profesi Dokter
694	HARI SUTANTO	8828970018	$2b$10$EFCdKHTVkDwXpfqXH0prHOiIpXgfQWNXXUNcQX5qTpZFRKnRIvd/6	0071	haris@fk.untar.ac.id	Profesi Dokter
693	SJAIFUL BACHRI	8813501019	$2b$10$6W5wLJx3bWGlLkkvkgPGsucci/DNtAYbjJRJuKRSRX0cWqkAMT5I.	0070	sjaiful@fk.untar.ac.id	Profesi Dokter
705	ITY SULAWATI	8806311019	$2b$10$ajomT79WvPwIpnl1HtV8GummaFbWHTaG4UczgLVkQmPJ61wyS61yG	0082	itys@fk.untar.ac.id	Profesi Dokter
703	ALFRED SUTRISNO SIM	8866970018	$2b$10$uYAn9KlsceLhT8b1SZtO..u4mj6q64DonN8gI7HLXR.FogkxIthKa	0080	alfred@fk.untar.ac.id	Profesi Dokter
702	TENTY	8892501019	$2b$10$.jooDJ7DHKatfbZTDf4tNOxITePX.9XeAbt5Sz8UVVR/rgCZ8d4K2	0079	tenty@fk.untar.ac.id	Profesi Dokter
696	NANDA LESSI HAFNI EKA PUTRI	8841701019	$2b$10$gh0YFcTiAwaFGZWb/fyX1uRZY4MJcVGW1zkoTHeliffWD/wN1a9x.	0073	dosen72@untar.ac.id	Profesi Dokter
698	EMILDA	8885980018	$2b$10$jB9V5qDfrPd3QDy8ysrXz.MKk5UYT.FmJWBh8296RiVC8hung0pFC	0075	emilda@fk.untar.ac.id	Profesi Dokter
700	JOHAN LUCAS HARJONO	8816980018	$2b$10$XYLvJ.cC6azDW9Y7pWHxpuSGJkvBs8hG7BckdQ3AQ69yMXSk2Ckrq	0077	jharjono@fk.untar.ac.id	Profesi Dokter
701	SYAMSU RIJAL	8803501019	$2b$10$ZM.Td1RMsTt2.9EDhr.gBO3Cjq62FpsUVoPAVDyGLlmFXbmF9Br5e	0078	syamsu@fk.untar.ac.id	Profesi Dokter
704	YULFITRA SONI	8882501019	$2b$10$16/98t682OGmtpK4pNXGDemef/uMORuXQQDXV35qaMx8kiN0cCFy6	0081	yulfitra@fk.untar.ac.id	Profesi Dokter
706	TJONDRO SETIAWAN	8827070018	$2b$10$jU0qy9BzeHoR2oQoaxP8m.26revOSwrgsjw5vXTTpgEZCGeweCJcW	0083	tjondro@fk.untar.ac.id	Profesi Dokter
707	OOKI NICO JUNIOR	8866490019	$2b$10$t1ufrCsf9kGcAXNETw7O9.n1FgprT5ivX2BGHiFt0KvCoDrsX2SV6	0084	ooki@fk.untar.ac.id	Profesi Dokter
709	NOVIA YUDHITIARA	8896490019	$2b$10$S5Zbm1mPrJr8jTeOhd1heOXm9mXQ3NYM.N/5ifbDKz3MVYKuEuMQG	0086	novia@fk.untar.ac.id	Profesi Dokter
708	RADIAN TUNJUNG BAROTO	8874423419	$2b$10$SQVZXVpPvlT6mEADXPiUf.R4XQIuWSVuHWWJ3PGL8CQbiy8KIOnPO	0085	dosen84@untar.ac.id	Profesi Dokter
680	NOER SAELAN TADJUDIN	0316106103	$2b$10$Q5qMB2m7dgUrKu3QdOaUOOxPCXjk4HOQE2czpOX5x5v9/ksQ1rpD2	0057	noert@fk.untar.ac.id	Profesi Dokter
681	MERIANA RASYID	0314118003	$2b$10$KV6KIfzYDyFWjnhct.40b.7GXYHG7zucZBx3UTD.jEHYhwz3huIKm	0058	merianar@fk.untar.ac.id	Profesi Dokter
682	YUWONO	0302017605	$2b$10$38e1QRf7YuSaaS2G8AZyJe3.D7qPccRttf6bkUq/K3aGrFtYX3Gpi	0059	yuwono@fk.untar.ac.id	Profesi Dokter
683	MELANI RAKHMI MANTU	0320057805	$2b$10$KVcFZwEL2XBl6711dkwIOee5yC9JLg0Vzz4X.S.bfHocCA0q04Eau	0060	melanim@fk.untar.ac.id	Profesi Dokter
684	HADISONO	0307128504	$2b$10$ezTsjwMZ7LE8gWYRruxB3eEG4URORIPVN5d4S3vn7ku4RJsYmQHMS	0061	hadisono@fk.untar.ac.id	Profesi Dokter
685	PASKALIS ANDREW GUNAWAN	0303048603	$2b$10$8ojTTUZWEeFrEWwOzLdVIepvZ/96EUcpqrFAKMKyngqk47eY0Pf3C	0062	paskalisg@fk.untar.ac.id	Profesi Dokter
687	SUKMAWATI TANSIL TAN	0314076402	$2b$10$1VXZY011mQPY83dxxwErbevxxlJ8q2sYOhh6T66Al4SVlOybC5A82	0064	sukmawati@fk.untar.ac.id	Profesi Dokter
688	ERNAWATI	0328057003	$2b$10$gq9TgBbr3FkE.JfA/M2opeCX9yAZpaONSSBBTJzcLRvH6M8sW7hJW	0065	ernawati@fk.untar.ac.id	Profesi Dokter
689	YONATHAN ADI PURNOMO	0302028304	$2b$10$pVYWYIVqKpmC7NzdeGINk.n7NNsJYzyE7/NI89oTcnT002MiaeQYC	0066	yonathana@fk.untar.ac.id	Profesi Dokter
676	CHRISTIAN WIJAYA	0316088504	$2b$10$vPr39e/LGerCykqdaQVzhOD/CnZPfO5GRwh1/ScXFCxFFvoKsohdO	0053	christianw@fk.untar.ac.id	Profesi Dokter
677	IRAWATY HAWARI	0303126804	$2b$10$JC1nZTVadDlAU7Ewm25hs.wy/nDRi0.r0bbPUDGWu7j8lGX5uvm9S	0054	irawatih@fk.untar.ac.id	Profesi Dokter
678	NENCY MARTARIA	0306108205	$2b$10$f1uDBHVMHcN29h6wfzatFOQybPCul1yu/1tuFCJ/DpIPP5z8G9M42	0055	nencym@fk.untar.ac.id	Profesi Dokter
679	NORBERT TANTO HARJADI	0327126904	$2b$10$NqbCGEqbb8SMNXIi1o4CC.4Zu/NiwEdA20pMFAiz9DhixsYO2tlO.	0056	norberth@fk.untar.ac.id	Profesi Dokter
690	AJENG NORMALA	8817980018	$2b$10$xD3oHQ0TC.1ey/d8smTZCebR.rLplXpOzYhC3OpXcYrI2Bx.ZcHUK	0067	ajengnormala@fk.untar.ac.id	Profesi Dokter
692	A. BAMBANG DARWONO	8826120018	$2b$10$T4a6wstg5jxdJ.xKVOszIuya9gccWCsOAfye7xJxvBIB.ZUn6xW1i	0069	bambang@fk.untar.ac.id	Profesi Dokter
695	DEVI ASTRI RIVERA AMELIA	8876490019	$2b$10$FGKNQfNlU7tzheB8qNSqbOz7J8cSD5xJMgua25hv9JGhsvMITmDgy	0072	deviastrira@fk.untar.ac.id	Profesi Dokter
712	LINDA JULIANTI WIBOWO	0319066504	$2b$10$3pLJItbeMUuEBt/4I3iuQOIVp.Rnv2JFgWxExHewrGY0dDhURFnye	0089	lindaj@fk.untar.ac.id	Profesi Dokter
711	RINI ANDRIANI	0329106502	$2b$10$72Qr8Rqw8KIWNL/RV11CsuRX.P8YZLDLJ4si8q32AvJ0aQYFcsIbC	0088	rinia@fk.untar.ac.id	Profesi Dokter
715	TOM SURJADI	8843650017	$2b$10$vtgmHG7wy8MkHda6UQzsgOJ3mhiMVDJ9nvJbV8.YSl1ry2B.ya7am	0092	dosen91@untar.ac.id	Profesi Dokter
713	NOVENDY	0321118204	$2b$10$E3dl4Mrua2lyiS7NmKJB6.Lt7/DDr10SL9aECD4m1zUjfYsX9EDNa	0090	novendy@fk.untar.ac.id	Profesi Dokter
714	ALFIANTO MARTIN	0306018602	$2b$10$AJ21feUqg7IeMEmje69sNeU6Uc7GtbKkJGTrecG702sObJ94LX.ha	0091	alfiantom@fk.untar.ac.id	Profesi Dokter
716	HERLIN TUNDJUNG SETIJANINGSIH	0310117005	$2b$10$2FG3V2ZuMXvviTfw6lhZkOSw6XLuHNmT9bzSk2Z8a2p4YAENhqcZq	0093	dosen92@untar.ac.id	Akuntansi
718	HENDRO LUKMAN	0301066304	$2b$10$gN9GMxKFnxGIZF00Urv4tOsU0HByqJcmvhiqUDGAkws9kuM0Eh5Ve	0095	hendrol@fe.untar.ac.id	Akuntansi
719	SUKRISNO AGOES	8820360017	$2b$10$Q1CQHK9G.I1uDTFJn1jQT.sWRygfKcnPwynDPmzBaDIduP771Kpyy	0096	sukrisnoa@fe.untar.ac.id	Akuntansi
720	ISHAK RAMLI	8810360017	$2b$10$24AKe6P/y2lbsLv.qH.A.uzt9hZGMvr/Ci5Nw1M0P94LWmv7eTSRe	0097	ishakr@fe.untar.ac.id	Akuntansi
721	I CENIK ARDANA	8800360017	$2b$10$0RbX8d5vWrcMIvawc3U.lumBhKTTHXLG9Lj6K1nZvXTWs9JihoaOi	0098	cenika@fe.untar.ac.id	Akuntansi
722	KHAIRINA NATSIR	0307115901	$2b$10$Lf/Am3ZkiE7nKET5nKVM9O0UHqYvCgjbW0kxhQSLJqjebeW8QSxOS	0099	dosen98@untar.ac.id	Akuntansi
723	SOFIA PRIMA DEWI D	0327097502	$2b$10$gir93VFU2TG.hrIizSJeyewxbYXJcCucpnmsJfLhZ8U/QuZKfKr1i	0100	dosen99@untar.ac.id	Akuntansi
724	AGUSTIN EKADJAJA	0318087402	$2b$10$W2KBLgMCboRiRDNITRJDyeK0A3g3IOt8cvG98eWuz3vE3ke3pcVCW	0101	agustine@fe.untar.ac.id	Akuntansi
725	VIRIANY	0326087602	$2b$10$kbDj62Rms7Ops7m0qgtEJOjgXgFEwYNEJ60/dIS91rzmV26VcfSFC	0102	viriany@fe.untar.ac.id	Akuntansi
726	YANTI	0313047501	$2b$10$Y07jIuBEuc4ijyXzyh2SCecsem3gLvFjxsTrGIoYTz7E83mKVKpRG	0103	yanti@fe.untar.ac.id	Akuntansi
727	RINI TRI HASTUTI	0306117201	$2b$10$nkFGlTNizn3ob71idUi/ieNODpBcyfvuZFKXB1HC6widCUFC6Bknm	0104	rinih@fe.untar.ac.id	Akuntansi
729	ROUSILITA SUHENDAH	0302107101	$2b$10$fS6FceGjuiv/5x0sflrjBuWbAmHyBKsxiyCOHcpd0qqrkB4c5C0AS	0106	rousilitas@fe.untar.ac.id	Akuntansi
730	NURAINUN BANGUN	0317086601	$2b$10$Oo7GfzbNR2HiaeJpHcTWGuOWtkkXsE80dQ0yHcNN7cWHyjNaS52zS	0107	nurainunb@fe.untar.ac.id	Akuntansi
731	HENRYANTO WIJAYA	0315068204	$2b$10$81KZt4aNla8edGo6n21aauJIWDORoGd3SjnhS0bS3ZpbTg98TJhy2	0108	henryantow@fe.untar.ac.id	Akuntansi
732	MERRY SUSANTI ANG	0327097505	$2b$10$qn.mQhEA3OoGchlWtBuJc.gTA8UJpDU8O/qDQ0m4bxHVX0SbIZVM2	0109	merrys@fe.untar.ac.id	Akuntansi
733	ELSA IMELDA	0308077703	$2b$10$NJwZ2drJB/mpPxuJmIHeXuualN8Whr1a9K4lctIlogwevKa/UjrQS	0110	elsai@fe.untar.ac.id	Akuntansi
734	LINDA SANTIOSO	0326077301	$2b$10$ETFVv3UMufkQ1Pp.2SFJwOrMjAImr8k2.bVMvd6ZcoW1KUn72QzQK	0111	lindas@fe.untar.ac.id	Akuntansi
735	AUGUSTPAOSA	0312087206	$2b$10$vLKPJDNk4P.BYFsolkwuqeko8hdjKCDuIYK8h7GTMsCyt2vw8So5G	0112	augustpaosa@fe.untar.ac.id	Akuntansi
738	FX KURNIAWAN TJAKRAWALA	0331017002	$2b$10$ifZ7ihof0pTHxGGCDA9CT.KPcWvPl1q2lhf2YfEsdXukl8dw3M4.O	0115	kurniawant@fe.untar.ac.id	Akuntansi
739	SUFIYATI	0306107302	$2b$10$HOYa1uJ1DNOEP/X13RKFRerZIUYhrJ7sDZRa/sjQAqbh53hQjpu8u	0116	sufiyati@fe.untar.ac.id	Akuntansi
740	ROSMITA RASYID	0710056503	$2b$10$VEDqWn.ikFKIRB1PJVRVVuecJfYu8mF.LlTJDrivUm2Rh9E/RC5p2	0117	rosmitar@fe.untar.ac.id	Akuntansi
741	LIANA SUSANTO	0323097401	$2b$10$ErT12Lz.zN1PxZ7rqgAPjO9cVyhoNHsD2pQTkW1A/wd9Hko3meGPG	0118	lianas@fe.untar.ac.id	Akuntansi
737	YUNIARWATI	0323067101	$2b$10$mmw9pS4orRbTU/3tDDa5K.RPfxwesxW1oJD3GOmq09p6kqle/ejmS	0114	yuniarwati@fe.untar.ac.id	Akuntansi
742	SUSANTO	0316067002	$2b$10$dL3Myy0rduwgdfmgbTSCYew/5A2mNCwLb6t4FBKvGv6aCqyq1bDeu	0119	susantos@fe.untar.ac.id	Akuntansi
743	HENNY WIRIANATA	0321067701	$2b$10$VeuDPPBasvX9nN9IwCtbZe8FsQ.plL2lsaME4BBtI/xCmhckXkXKi	0120	hennyw@fe.untar.ac.id	Akuntansi
744	SIDHI WIGUNA TEH	0312036505	$2b$10$4hZjZUpZvePDkuDcDe63FuRfDLy3Iv8y5BhnQU0wKfxSGhtaZRCRW	0121	sidhi@ft.untar.ac.id	Arsitektur
745	HARSITI	8818510016	$2b$10$J7DMbk6Fqi2QcmEYD76iTO1nJLpDE.cxWIQf5ZWrFHnmQyVkRMFne	0122	harsiti@ft.untar.ac.id	Arsitektur
747	PETRUS RUDI KASIMUN	8876330017	$2b$10$yVpv62sVXbk8kFdOf7nLYOdJIHqWkU7M.7zT1D7qv88PfU1oJnYei	0124	petrusk@ft.untar.ac.id	Arsitektur
748	MARTIN HALIM	8859530017	$2b$10$kiC7KPu1uWRSldpoKtT0/uJ43qbrTI3PiQDcTT0h.L1RYcyWMWp3i	0125	martinh@ft.untar.ac.id	Arsitektur
753	SUTRISNOWATI MACHDIJAR	8830360017	$2b$10$/Rs7U3CTIDhZnh5G.Og/1ONzISuTcLDpF/f5UoPr97iGdbqgO25VC	0130	sutrisnowatim@ft.untar.ac.id	Arsitektur
749	YUNITA ARDIANTI SABTALISTIA	0319068203	$2b$10$7rELNn8yWhOVE1ZSKs1oSujvpEa/WHFENShBW3YhrI7vS0tz3Ayue	0126	yunitas@ft.untar.ac.id	Arsitektur
750	NAFIAH SOLIKHAH	0302048503	$2b$10$nztA.FbQz3xHF0aJEJzfdOJ3Ui5e3ZXam6IoSZ62m2yNQvm1NBiyy	0127	nafiahs@ft.untar.ac.id	Arsitektur
751	TONY WINATA	0324096002	$2b$10$NY/q61Tb8S4oCgoT.azQaO1fnxOEDi8DhFd/XIrbJeTEOIDfoZiBq	0128	tonywinata@ft.untar.ac.id	Arsitektur
746	CHIN JONI	8820930017	$2b$10$vHB37jBku6zaHCL7nTzFmOF6hv/ibaxlklQtztALVZVPebHo7QdZ6	0123	jonic@ft.untar.ac.id	Arsitektur
754	LUCIA INDAH PRAMANTI	0318098602	$2b$10$6.1A2Bhyp6f/SU/C7sVbYObJnuGjd81ryoFQI1p5kREEYKHIo3Kj6	0131	luciap@ft.untar.ac.id	Arsitektur
755	KLARA PUSPA INDRAWATI	0315049001	$2b$10$vsKiQRWXNZSKlRu3QEZicupbu8Guvph6mfcXA4lsRfc2vL6PGwh1K	0132	klarai@ft.untar.ac.id	Arsitektur
756	THERESIA BUDI JAYANTI	0302108502	$2b$10$6fqAbgwDpkuZAhjJ4UbZ1ubZGwud.lQCBt68rJrGdmfd3wcFqqz8u	0133	theresiaj@ft.untar.ac.id	Arsitektur
757	IRENE SYONA DARMADY	0312118903	$2b$10$Vv6vpOu5zRczmZvktY7tgeh/IWSP9o3etFDPMMtwu2UEaHznEqEfe	0134	irenes@ft.untar.ac.id	Arsitektur
758	IMMA SOFI ANINDYTA	0315118003	$2b$10$G.Oba8OmyZg09eBV0DvCbuSoLk53eqCmAoV1FJfjIZZHan8O4i3Di	0135	immaa@ft.untar.ac.id	Arsitektur
759	ISWANTO GUNAWAN HARTONO	0306127203	$2b$10$oZ6IeBuZU70qmJzuQVNx8.idPHqHjUEDKNsl5iXJn59Xoojww.NB2	0136	dosen135@untar.ac.id	Arsitektur
760	SINTIA DEWI WULANNINGRUM	0326048902	$2b$10$ASH0gJdet7QuKqds/LsX4.lNAj6W/ZFE4yVVn5W7Kcx0HRVOhXVTq	0137	sintiaw@ft.untar.ac.id	Arsitektur
761	ALVIN HADIWONO	0324087801	$2b$10$f6r5ZeyZidXhm8J9qD5nTeR4OsHO4qO0BBxqdNK7UDmhX7li8OxX.	0138	alvinh@ft.untar.ac.id	Arsitektur
762	J M JOKO PRIYONO SANTOSA	0317076002	$2b$10$grk52wxU/nrDvqdTuEE.EuGAlxEhPM60ESuY20mzhvNN63HGz92lC	0139	dosen138@untar.ac.id	Arsitektur
763	ANDI SURYA KURNIA	0317017903	$2b$10$wggobezJZfRnMfjWx/fIpueZZt8h9YbC0L/vB1cWnA9Xg3k2D7pqi	0140	dosen139@untar.ac.id	Arsitektur
765	NINA CARINA	0313117101	$2b$10$56LPXjkF2zVkCU5ifIkk6O3Vk8BuJtLgAKRe04CggPMEFULCGTz4S	0142	ninac@ft.untar.ac.id	Arsitektur
766	PRISCILLA EPIFANIA ARIAJI	0304117801	$2b$10$ueI2hROBvtQMgU0VxnzVzOUAOHA0qF5TRba1DjDiT1Igtr96n.c62	0143	priscillae@ft.untar.ac.id	Arsitektur
767	DODDY YUONO	0330097301	$2b$10$KV6oTICVt0j.nYJLDFBbdepUfzO29hXkjGnr/84l29E4t4SGDAJ2y	0144	doddyy@ft.untar.ac.id	Arsitektur
768	MARIA VERONICA GANDHA	0313097901	$2b$10$1BjQPHY8SviIjhx9lMdcW.af3HCw05Q2/4iZyYtF7seCQHnRZJA7e	0145	mariag@ft.untar.ac.id	Arsitektur
769	AGNATASYA LISTIANTI MUSTARAM	0313088203	$2b$10$74/779oW9sGM.DWJzqSIZe5Agwef2UnBqmmuy8.qY61y4XiAJES9a	0146	agnatasyal@ft.untar.ac.id	Arsitektur
770	AGHASTYA WIYOSO	0301066804	$2b$10$RAG.ApYpXo3amWpxnnOnPO.DYYsuZMxc8aXY5.IbVGx3Pvbh6tqTC	0147	dosen146@untar.ac.id	Desain Interior
771	HARTINI	0301096902	$2b$10$sbb8//XByaoGJPS9ukZ0G.L0dTsMxLSoZk/F8EfWYTUMUuCodwEOu	0148	hartini@fsrd.untar.ac.id	Desain Interior
772	EDDY SUPRIYATNA MZ	8924450022	$2b$10$FF.NuHwoc0WZNauB4hS4Tez.QuMy6VnktnbMQYzpLtX5XjKtGhXru	0149	eddys@fsrd.untar.ac.id	Desain Interior
773	DWI SULISTYAWATI	0301016906	$2b$10$45akuKzCmmh8tdQfIlTtWeqGU3hqSDXC7HrA7.FPkXU9ZU092Cnc2	0150	dwis@fsrd.untar.ac.id	Desain Interior
775	M NASHIR SETIAWAN	0311016701	$2b$10$JrjncDooC.S/UBRPs4o2x.w14CDS3HRwjTKf12SkpBA.2Dt/NIn.q	0152	nashirs@fsrd.untar.ac.id	Desain Interior
776	AUGUSTINA IKA WIDYANI	0321087601	$2b$10$XI4TohyxEKlJrIqHPRPVN.wsGRF21mF5s1GpConfa8d0RJJLh4.pW	0153	augustinaw@fsrd.untar.ac.id	Desain Interior
777	HERU BUDI KUSUMA	0329116804	$2b$10$1qXr0/vIaiIexlIEJMK2N.Tlurw45Fq4XQxB.rloWsyq87EUkMm2G	0154	heruk@fsrd.untar.ac.id	Desain Interior
778	ADI ISMANTO	0308097906	$2b$10$nFqEYGDHCxMuhHRyGQ0FKeMlpslbZzbrMPbtJXyjgyP7obBZyB7oi	0155	adii@fsrd.untar.ac.id	Desain Interior
780	FIVANDA	0315118402	$2b$10$RR6v87k2qKeGQiZbUGUBIeOPF/EwkW01JvrTKZRL2QYm0cqVDhLkS	0157	fivanda@fsrd.untar.ac.id	Desain Interior
781	MAITRI WIDYA MUTIARA	0331058304	$2b$10$cKeH8Re2hisrH0i9Q4s6UewFX2PvBHLUX7a3gwwAGOGrS3ugxEY/K	0158	dosen157@untar.ac.id	Desain Interior
782	NIKKI INDAH ANDRAINI	0305098307	$2b$10$T30WCbqfdmbg34KOI.8Cau9OVBkOOw0ZvsEPfKKCASHX9E2Nf4GCO	0159	nikki@fsrd.untar.ac.id	Desain Interior
783	SITI NURANNISAA PARAMA	0325017901	$2b$10$c81nAwpWoXCK1zGKWGGQY.d.4wXm6MG2qMp.or/BsTcpJ.1pVS9Hy	0160	sitip@fsrd.untar.ac.id	Desain Komunikasi Visual
784	KURNIA SETIAWAN	0303057303	$2b$10$I2.ggUbVz/m3rYp.RT2xfe/NeN0R6g1.p.Xst56T.UUVwSMzEHWV6	0161	kurnias@fsrd.untar.ac.id	Desain Komunikasi Visual
785	EDY CHANDRA	0305087504	$2b$10$U6Om0TwjN1xC59b9ofZ2FOcR2Vq6AM1FJtzqRavjjBcy/05gtWH/u	0162	edyc@fsrd.untar.ac.id	Desain Komunikasi Visual
787	BUDI DARMO	0331037806	$2b$10$uvd0cMAADgl7CvSiFBDGHuR/3L6aJ/yxNsbyNu2Ur/4YczW5S.ln6	0164	budid@fsrd.untar.ac.id	Desain Komunikasi Visual
788	ARIEF ADITYAWAN	0304056504	$2b$10$bUTXusMAmSt7dtLR78jnIeT7ZTdJJcLQiaLISt/Bb.LbJL6G8/m5O	0165	ariefs@fsrd.untar.ac.id	Desain Komunikasi Visual
789	JAYANTO GINON WARJOYO	0323086702	$2b$10$g.0xwAWf1zkFXq6Jki.NLuscyYpN7fGV70QUV.8Aps.uXsMKZ/LRi	0166	jayantog@fsrd.untar.ac.id	Desain Komunikasi Visual
790	TRI HADI WAHYUDI	0331016401	$2b$10$d.UTxjAvAz/hsuOdOmEvJOmKjjTGaDj7oecCDGYAVlW5EIk.vVrDG	0167	triw@fsrd.untar.ac.id	Desain Komunikasi Visual
791	FERDY TANUMIHARDJO	0318068206	$2b$10$aBq/RSpDBGI2aDfm1DaKNeuKbLftQRwmDPAruUgCAkr0wTdnfhAyO	0168	ferdit@fsrd.untar.ac.id	Desain Komunikasi Visual
793	ANNY VALENTINA	0320077702	$2b$10$bA8R1l9kapg2g0BVbigoTOVkPCIA7/Kt5UrSatAO3nseNwjOjs9AK	0170	annyv@fsrd.untar.ac.id	Desain Komunikasi Visual
794	ANDREAS	0309107802	$2b$10$VgWeJTjky5//wEur3q3.NuN0k.WlciI6HlZYRIz8Hrvev0T5v2eWC	0171	dosen170@untar.ac.id	Desain Komunikasi Visual
795	TOTO MUJIO MUKMIN	0317056701	$2b$10$F1SzNZA33wU1OKBniXSBAukHYNd7oz2/R5Lz6t2VySWP1.GsPCMZi	0172	totom@fsrd.untar.ac.id	Desain Komunikasi Visual
796	JULIUS ANDI	0331077101	$2b$10$hbYqUngA0RSXbgp725r3juBuTuhz3Hi.29uQK1VU04p2tUE/.AXxK	0173	juliusn@fsrd.untar.ac.id	Desain Komunikasi Visual
797	MARIATI	0320028903	$2b$10$LPyIClQyp4jCPGUuKAMngevQXeqrodboR4gvDqk4szbGKskR9cWnu	0174	sarid@fk.untar.ac.id	Desain Komunikasi Visual
810	ADE ADHARI	0312078904	$2b$10$9ajngr7uEyg.y/Bu/jwqUudYpYRRMG7qqHmBxuEA4PejPKsDSZyt2	0187	adea@fh.untar.ac.id	Ilmu Hukum
798	R RAHADITYA	0409056702	$2b$10$yonat6q2vgoB4h3JQYmbfO6fZvEpBlzRBPPauA/4/b5lyRp8P3jTS	0175	rahaditya@fh.untar.ac.id	Ilmu Hukum
800	WILMA SILALAHI	8994630021	$2b$10$xbm5oDsLkVvVdS3DIKqdh.U11j3NksG3IGtUL25J0nK8rSCTDXoOG	0177	wilmasilalahi@fh.untar.ac.id	Ilmu Hukum
801	MIA HADIATI	0317066001	$2b$10$H946YV12BwExdFwNEhIMT.zIkzDPke6vFGudIFqxBkNzwsROuSmLe	0178	miah@fh.untar.ac.id	Ilmu Hukum
802	LEWIANDY	0327029401	$2b$10$XBMHWFVHqvHvHXZ4cNQokOjDX2ZPM1JvZUOOFGi1B9NKffgRF/Ski	0179	lewiandy@fh.untar.ac.id	Ilmu Hukum
803	YUWONO PRIANTO	0308056302	$2b$10$fj1De1hwsbhCWQJbhQ7R9e73xVJwBYpi4GsP33cLCPS45FMKdgz0C	0180	yuwonop@fh.untar.ac.id	Ilmu Hukum
804	ANDRYAWAN	0320059003	$2b$10$3W9JUkgEqLUBnvETFMtMKeMLB7WPqIAjX0Y1uyfOa1JlCx7RDnJIS	0181	andryawan@fh.untar.ac.id	Ilmu Hukum
805	CHRISTINE S T KANSIL	0305117002	$2b$10$9PDB8pI7rm5LrkUkPNvvOORDPa3AclYveuyYOgGVTWCS7uTkpziT.	0182	dosen181@untar.ac.id	Ilmu Hukum
806	VERA WHENI SETIJAWATI	0007067007	$2b$10$y5RTu0OSDOOWuvLwD5ohcOZjix/PepV34s0sys9b4RtPeknjnsYfa	0183	dosen182@untar.ac.id	Ilmu Hukum
807	IMELDA MARTINELLI	0306036801	$2b$10$wFjxK3RZBryvojQ60O7kp.NSieSjatubn8r9sE/cfzeAG5kAIeQl6	0184	imeldam@fh.untar.ac.id	Ilmu Hukum
808	MOODY RIZQY SYAILENDRA P	0315049502	$2b$10$u6gB6SVeTTj8k3/D1t1hiucQCr1cYB8k2u2/RCXltTu370tqmCkRK	0185	moodys@fh.untar.ac.id	Ilmu Hukum
811	RIRIS LOISA	0323016805	$2b$10$F3UEG1UqXNwDudmPKgPmmul3zcZBxgPZvoEhNYcGfrCQBtAkiAjAa	0188	ririsl@fikom.untar.ac.id	Ilmu Komunikasi
812	MOEHAMMAD GAFAR YOEDTADI	0325106403	$2b$10$xU1fZKHRifbupC1VzyW2y.0vqw0MJ8ErPnn/pR.Bdhertx2XaqWD6	0189	gafary@fikom.untar.ac.id	Ilmu Komunikasi
825	YUGIH SETYANTO	0320117403	$2b$10$yB60i/9ua0llEEO4o9ntVuKOGZ8Qyf6oxw7Pl5EuPteJgI7fYxRa6	0202	yugihs@fikom.untar.ac.id	Ilmu Komunikasi
813	MUHAMMAD ADI PRIBADI	0311047602	$2b$10$0XzD3SCH7..x4tYIQCDzgeaSrivbkiiu3/wj2pd0ZcVLBFuc8qMAG	0190	adip@fikom.untar.ac.id	Ilmu Komunikasi
814	SINTA PARAMITA	0313108801	$2b$10$uzS2Q9ihVTlKWvr/JPUsBO6CKK3p.TQnuJefKsiQWkb.JzegMUEuW	0191	sintap@fikom.untar.ac.id	Ilmu Komunikasi
815	WULAN PURNAMA SARI	0306049001	$2b$10$M3tYBYHBbh8CdtMRDUSCpec3tOVQt9J06tEWC6naRuNI6vCtAYOHG	0192	wulanp@fikom.untar.ac.id	Ilmu Komunikasi
816	AHMAD JUNAIDI	0019024803	$2b$10$m2tgTV0/EefyrTQciKABL.0CAhBiet9jzEX7UYZlzJ5GE7j433lYi	0193	ahmadd@fikom.untar.ac.id	Ilmu Komunikasi
817	LUSIA SAVITRI SETYO UTAMI	0319058701	$2b$10$w.bxYCLtnldoAmrdMGM5GOyzQyVMeXDBmRzMon.eX8.q3R2PhEsZC	0194	lusias@fikom.untar.ac.id	Ilmu Komunikasi
818	FARID	0327057602	$2b$10$Xz0GAT6FZfNiOAOqo2u7aOvv.lDduVUvEFfuKXiKlpAA0GtHoDAZa	0195	farid@fikom.untar.ac.id	Ilmu Komunikasi
820	BUDI UTAMI 	0319077107	$2b$10$13MnpUQRS7mPN8GqA9mTBulI24TLkQVv1iHrjYeR.AJXbbi3Mj.Tm	0197	budiu@fikom.untar.ac.id	Ilmu Komunikasi
821	SISCA AULIA	0322108801	$2b$10$GpR0kDz5aD.rDhlN9RTrduZdlztKXc7IIJKfCwF16/k21pDSbH2Fq	0198	siscaa@fikom.untar.ac.id	Ilmu Komunikasi
822	ROSWITA OKTAVIANTI	0330108602	$2b$10$B/W8JbWR5QF5cx0hJJxDpO/H4IywCorv1nWk78gyOou5gPuAyqbKy	0199	roswitao@fikom.untar.ac.id	Ilmu Komunikasi
823	SUZY SUZANNA AZAHARIE	0008115909	$2b$10$w8AwUcW4/VB2qTzSjHobiOrYgGMZiBTS1e8.fJNyrgU/yWoMH.xHS	0200	suzya@fikom.untar.ac.id	Ilmu Komunikasi
824	SEPTIA WINDUWATI	0319098803	$2b$10$1Jy2rOCjBF1dYsWiYyaDcO.KjjtqzoHURm5ForBOGNsZQFGOjmHZK	0201	septiaw@fikom.untar.ac.id	Ilmu Komunikasi
826	DIAH AYU CANDRANINGRUM	0323017802	$2b$10$3uqTplfFnq7ZlI0hrTWBQ.QfdCG8.dsR/79grcVDXYtTiMjfK.3c6	0203	diahc@fikom.untar.ac.id	Ilmu Komunikasi
828	GREGORIUS GENEP SUKENDRO	0324047202	$2b$10$kkWO5/CeCvIz2LK7cDM6QuqQyBXBkSieDjykpeOgOYI259Cl9OFIG	0205	geneps@fikom.untar.ac.id	Ilmu Komunikasi
829	HERLINA BUDIONO	0328067301	$2b$10$IxSz1yhQMj0DVkGjTKqCh.RgEVTA/YS6qP48YWExYtp930hGWspJu	0206	herlinab@fe.untar.ac.id	Ilmu Komunikasi
831	ZITA RETNO HAPSARI	0324047006	$2b$10$VJsGSYUGWhwdYc6ABtEYB.IDEmsHLSTaGdtQPdgPx6/alA4W9rXVS	0208	zitah@fikom.untar.ac.id	Ilmu Komunikasi
832	NIGAR PANDRIANTO	0304067101	$2b$10$HhHe4.1F4NiDkC12wXr7juU3HyRQX7Z5ihl0WtFc3LsGpY69DAEnG	0209	nigarp@fikom.untar.ac.id	Ilmu Komunikasi
833	RONNIE RESDIANTO MASMAN	0306067201	$2b$10$/5xyYfKeWSvYhW6FhrbEH.y7wk5q0aaJU8FA79ENJNrvNpicmqkSa	0210	ronniem@fe.untar.ac.id	Manajemen
834	I GEDE ADI PUTRA	0315066201	$2b$10$n7PKXTQLpybrtkbNKp19Xul5DA/8/fu2YQuTGbB2TeC7yAbvpDCsC	0211	dosen210@untar.ac.id	Manajemen
835	GALUH MIRA SAKTIANA	0330098504	$2b$10$GETKG6ZZEjpShywoxZG1tOA1/U4SyEaeUXZjx.Qv2BWu/AHlHDS3O	0212	galuhs@fe.untar.ac.id	Manajemen
836	KENI	0308117502	$2b$10$nNW46xuydt6QMSn59HTcgeaCVgP6JjtUeImj9NBfKVWH8FuLyIrTW	0213	keni@fe.untar.ac.id	Manajemen
837	NURYASMAN MN	0325036701	$2b$10$qf6MkvcnhqSjfSeXz0DB/.VsbbFgw5wf3Epg4.n0MdUpxMcHVLkjG	0214	dosen213@untar.ac.id	Manajemen
839	BUDI RACHMAT	8849680018	$2b$10$8SoEKNIyY8PdL1oBmm5zkuqaHTIppElTeZhqDZUpmRw6gDm0Kf6/e	0216	budir@fe.untar.ac.id	Manajemen
851	LOUIS UTAMA	0316077804	$2b$10$8/i9yNFOgIU9ol1NAwC02e99GWS3PJlKbjjmi44lnp0yj6AnzwfQi	0228	louisu@fe.untar.ac.id	Manajemen
852	LYDIAWATI SOELAIMAN	0330017901	$2b$10$G2QWyt5w5pqBGKfWo98LQuUfb5ClGLkf1m2mbbHerBXvfT4Jhae3i	0229	lydiawatis@fe.untar.ac.id	Manajemen
853	KURNIATI W ANDANI	0317016601	$2b$10$dPYoQooRmnHDmyIhWxti5u0LeGpq9BTsBX5wBln8scJe4FsBngXBS	0230	kurniatia@fe.untar.ac.id	Manajemen
854	CAROL DANIEL KADANG	0311076303	$2b$10$gPIke2iglWHlzizeG8R4muNGo8M7X5r3O17Wxd5gq15tSDBr/w3KS	0231	carolk@fe.untar.ac.id	Manajemen
855	HENDRA WIYANTO	0328057104	$2b$10$z/FCoTROjJWuJqKozL7cwOYID24.KIawtt4zPjTZe54KwxxFxuezi	0232	hendraw@fe.untar.ac.id	Manajemen
844	EDALMEN	0327106801	$2b$10$arjA8pVQDRxpGE/dA30OMuVsu8QUw1c7neRZVFVNzYUZcFWFE2aWS	0221	edalmen@fe.untar.ac.id	Manajemen
845	TOMMY SETIAWAN RUSLIM	0317078602	$2b$10$uaq3o7DWIZ24w5f/kgF9YO0XRqDbq772iiGG133kbz2PbP6v3vlNa	0222	dosen221@untar.ac.id	Manajemen
846	HALIM PUTERA SISWANTO	0325077901	$2b$10$9m6NRYh8MjsD1STwxCGbPu1QLk6tlUDWTdaNUDLkJp4ThpPy3Idvu	0223	dosen222@untar.ac.id	Manajemen
847	YUSI YUSIANTO	0313126402	$2b$10$gI.tiXOYOSJdO62DxMB/re1k1fVpqRd9KZVSFSyiF2XH/gJH/xn76	0224	yusiy@fe.untar.ac.id	Manajemen
849	HANNES WIDJAJA	0306027407	$2b$10$p0490x.xXXMLlTOimdhM3uFdwLNDO1kz/Gq/yJMtm2FxH36NV9rrO	0226	hannesw@fe.untar.ac.id	Manajemen
850	ANDI WIJAYA	0326097403	$2b$10$U8gHw7sRN5hcV4c7Zf4zu.ubvEZ8fyIklO.KhanE8VIk0WnS3PP.y	0227	andiw@fe.untar.ac.id	Manajemen
858	RODHIAH	0311106603	$2b$10$Lxbjj/OPdQJOWXkZHbggke7B0D.VEX5HMDivgefUA36hgglI36nnC	0235	rodhiah@fe.untar.ac.id	Manajemen
859	ARIFIN DJAKASAPUTRA	0328116805	$2b$10$kX9o6timnIAsebF0qL1KMe0hBPSKmYbkOgMPBTio076t9lBFN2NKa	0236	arifind@fe.untar.ac.id	Manajemen
860	MUHAMMAD TONY NAWAWI	0321036301	$2b$10$A45rmU0fZYL.DBTipTcCfeJgOC600eKJB7uvUfs.LQJHdReZ0OCsS	0237	tonyn@fe.untar.ac.id	Manajemen
861	MEI IE	0313047803	$2b$10$9KJkO2exaiTJg93twBdcbeEz773iiffo28atRbrXU7/DEPI/G57vW	0238	meii@fe.untar.ac.id	Manajemen
862	YENNY LEGO	0307017602	$2b$10$eMNPQWoIKOppZqIuA.3WC.zNzd/U/m5ycry1cJ0OYNN36lJQf4Krq	0239	yennyl@fe.untar.ac.id	Manajemen
863	JOYCE ANGELIQUE TURANGAN	0308127502	$2b$10$souipvT9nE6plWUemMLElO.P65oQv8bO/CeKDixb2/AdGOXshGIcO	0240	joycet@fe.untar.ac.id	Manajemen
864	PAULA TJATOERWIDYA A.	0330067002	$2b$10$Wd4qlmW.qEKN5gcLU0ijJ.yF/SEtREIFAwesr11FdSrjomsPOjktG	0241	dosen240@untar.ac.id	Manajemen
865	IDA PUSPITOWATI	0314046701	$2b$10$iaMqoJULA9aYtFdQNxMIDuCYm8IoAKukJbHM9KJOZB/ZNjaHSFQcm	0242	idap@fe.untar.ac.id	Manajemen
867	NUR HIDAYAH	0306026801	$2b$10$lSHCdYpA64qJR39TDdUYcep0xPa/0SV8019yv7koTLT59b4cFtrXy	0244	nurh@fe.untar.ac.id	Manajemen
868	MARGARITA EKADJAJA	0311037801	$2b$10$W53l6oZUxqT.A.HF8luiC.yNh9L2d5yBaP9ulnFSTAWLhQ3iP1/h2	0245	margaritae@fe.untar.ac.id	Manajemen
869	KARTIKA NURINGSIH	0318087201	$2b$10$VoufQiWxPhlyflFBEUhEEOxjVFJ8qdJX8xvIIYzDn.n2Ovgrws1Y2	0246	kartikan@fe.untar.ac.id	Manajemen
870	FRANGKY SELAMAT	0314107401	$2b$10$xKBWahSHrMLuJtw4F5S9UeIAJ.MXK72iCJhO8oV4nKukdsJ9lzmL6	0247	frangkys@fe.untar.ac.id	Manajemen
841	ZUS INDRAWATI PRAMONO	8890680018	$2b$10$DhBJCTqTHgf881k94ZCYhuS7JWqjOGYt1K3XD8qh0vCANF0uA6.ny	0218	dosen217@untar.ac.id	Manajemen
842	SUHARTONO CHANDRA	8837650017	$2b$10$a146EWIiFpmwFWUI5nooVu5VrtJ3P7uh8dkTJ7V2Km9tJ4V.zKRty	0219	suhartonochandra@fe.untar.ac.id	Manajemen
838	PURWANTO	8837070018	$2b$10$GgV1NZZG5ob9Q68lPW.qOew9vjAbwY.nkStQkD3974YFW0AqGVtpW	0215	purwantop@fe.untar.ac.id	Manajemen
857	JOHN HAN	8827980018	$2b$10$O3PDIehgBuIhZh1I/rQ1yu8izY4n/2mp5fb28BPKni5vLrWYxoEyu	0234	dosen233@untar.ac.id	Manajemen
856	ERICK SAPUTRA HIDAYAT	8895980018	$2b$10$beHNU19irzrsFfo5rgbeR.KgPgmGcONGMTGS82veIrKsOjFjOij2q	0233	ericksh@fe.untar.ac.id	Manajemen
843	MIMI SA	8857980018	$2b$10$guiu78WzCEt3oDdiLi1yg.UFmGWZ17nlBeoc5lrUOLJ33MxULshWK	0220	mimis@fe.untar.ac.id	Manajemen
872	DJOKO MICNI MIJAATA	0323046402	$2b$10$/6dpTbcIGiLaxK.6vBZTiekLbnNQ/fUYHD5TC4VrPsElcfpGwTWfy	0249	djokom@fk.untar.ac.id	Pendidikan Dokter
873	OLIVIA CHARISSA	0304088703	$2b$10$wGo.4W8Igo4l.4Z5SwH/WOzV5W7IPGY99vWBPz3pMPkFw.QTLLSje	0250	oliviac@fk.untar.ac.id	Pendidikan Dokter
874	ANDRIA PRIYANA	0318087806	$2b$10$SCsjujvpzvgA3BCJaOOj6ukFszN/k0bn3t7/JQjqj9Gpar9Z5PmUC	0251	andriap@fk.untar.ac.id	Pendidikan Dokter
875	LYDIA	0321058506	$2b$10$GqGYDa5nn/ZXmOMsVgVpVOWWyFGh4GfnPVo0YP0wUlA6PNeCwyn/O	0252	dosen251@untar.ac.id	Pendidikan Dokter
876	ANASTASIA RATNAWATI B	0311078301	$2b$10$CqzO7oaFipNCosxjAX9OYeMyOokHaHFbqtTOoTGmcH2Be0JTEzw5G	0253	anastasiaratnawati@fk.untar.ac.id	Pendidikan Dokter
877	SHIRLY GUNAWAN	0302057902	$2b$10$5nPdVEGGZWkm2qvr5ZnvouNx34sTFBFrExJ.P9aEgOjNmrzARHnDy	0254	shirlyg@fk.untar.ac.id	Pendidikan Dokter
878	JEFFREY	0328118302	$2b$10$mAUeg3Gqjz6qHP2/XgKQRecdHarnYSbBbayuiDWYPL7Cm8JKt68Eu	0255	jeffrey@fk.untar.ac.id	Pendidikan Dokter
880	NICHOLAS ALBERT TAMBUNAN	0315098401	$2b$10$v4pKZ1fuE14XzhDiH4/LkOKASzC3Ujna/WSruIm8u.Gbxqj3uHujq	0257	nicholast@fk.untar.ac.id	Pendidikan Dokter
881	EKO KRISTANTO KUNTA ADJIE	0327128206	$2b$10$FTYFNXNMvqlGInPpTFELQeBS9Bd7pmhvFUNGyVWJcZw53jpkbDMEe	0258	ekokk@fk.untar.ac.id	Pendidikan Dokter
883	FREDDY CIPTONO	0326127601	$2b$10$jujud1akCTMm3aDmCBtGcuoAELVnjaLNNTXc.M.76Attzd9oR1MTO	0260	freddyc@fk.untar.ac.id	Pendidikan Dokter
884	JULIA HERDIMAN	0304027807	$2b$10$I9uM5ay4lOTENjRW7icrxuaCxBpoXhnNTN1nojNTi8kFcSJkTmrZu	0261	juliah@fk.untar.ac.id	Pendidikan Dokter
885	FADIL HIDAYAT	0302098604	$2b$10$Pl3IgYn9ALQiZmoGboJDEucKae1ARaQ66J.KZScZ0UWiNMlAuPDba	0262	fadilhidayat@fk.untar.ac.id	Pendidikan Dokter
886	SONY SUGIHARTO	0322126601	$2b$10$Vfscdsq/cdr7eJCCj.NOyeIWDt0ne4CDClPjyFS4XtpXaDm0efwga	0263	marias@fk.untar.ac.id	Pendidikan Dokter
887	MOCHAMAT HELMI	0324058102	$2b$10$TZXu7zz72Uf1nr8547q1AurL2Hgyh.HzELuWmo0GjA00dEYMP21aO	0264	m.helmi@fk.untar.ac.id	Pendidikan Dokter
888	ARWINDER SINGH	8807490019	$2b$10$GlUcOzp8V/Z4eDdmHCR9c./hqRn5J44x7jaYT3ZtgMiVLgdO/xSdm	0265	arwinder@fk.untar.ac.id	Pendidikan Dokter
890	ROBERT	8831050017	$2b$10$tuNaDTqQDtNi6UMccmOIiu2Nv8QLx4fg0qirlONszrYKSfF7K7RZS	0267	dosen266@untar.ac.id	Pendidikan Dokter
893	FRANSISKA FARAH	8820190018	$2b$10$pGeZDE.L/b1.mfv4Rgi0VOVU7tRy30HxJl6uW1nmFc/si7yiwNK4C	0270	fransiskafarah@fk.untar.ac.id	Pendidikan Dokter
892	RAHAYUNINGSIH DHARMA	8850550017	$2b$10$0BlxjvGhuHghD.kRYytLzuyT6L2mXOfmNU0SMWPhFNJQ2BZnz5d.O	0269	rahajuningsih@fk.untar.ac.id	Pendidikan Dokter
891	WELLY HARTONO RUSLIM	8894940017	$2b$10$p5fSWPf9n/K4nTy5w4MCVeZieGoj3adjs97cLi6qS.F31xw3.5gda	0268	welly@fk.untar.ac.id	Pendidikan Dokter
894	GRACE SHALMONT	8875250017	$2b$10$3m3snp8tVwGk2Re.JAr4TuSxRPCZyDpo3FVuhIlutMCWVLfDrFAd.	0271	graceshalmont@fk.untar.ac.id	Pendidikan Dokter
895	FRANS FERDINAL	8841530017	$2b$10$S2s7wZJrYGfGJvaUQjGgC.K8UrAxmCOdJeAvIkOo6w/gpoz6aDR4u	0272	fransf@fk.untar.ac.id	Pendidikan Dokter
896	MARCELLA ERWINA RUMAWAS	0305107205	$2b$10$oUSr3RJueb1iR8nLm1oaSep.Qgh0YNPc.hegjmeKlgqFelPjUSKRC	0273	marcellar@fk.untar.ac.id	Pendidikan Dokter
897	FENNY YUNITA	0302067804	$2b$10$nRIdp7LpOaq96tG7m0BWJePymcTOUbgZc/LLKZOfb.8dnYgitOc4y	0274	fenny@fk.untar.ac.id	Pendidikan Dokter
899	SIUFUI HENDRAWAN	0311047204	$2b$10$Uxl1IKGBHzmK/pNuyWcapeoc.ukE7avrvMPG5sl.WhhPthrpzVkyO	0276	dosen275@untar.ac.id	Pendidikan Dokter
900	ZITA ATZMARDINA	0328048302	$2b$10$kH4y.V7H98Q7M8ARnGqXAe56hWC9dNxy3vnRZnRKwcNNgyaGDYbMi	0277	zitaa@fk.untar.ac.id	Pendidikan Dokter
901	DANIEL RUSLIN	0318068205	$2b$10$7uUGUJ6tyjoIjpn9KimV8u9neVkRbpwgH5tRrjAooM3MLG/lvKZRW	0278	danielr@fk.untar.ac.id	Pendidikan Dokter
902	TWIDY TARCISIA	0308038302	$2b$10$xYhP1pKnu84eEZ5gDvvzX.xDvUqnf2v38PEW1uFxoTsA8.lkV.W26	0279	twidyt@fk.untar.ac.id	Pendidikan Dokter
903	DEWI INDAH LESTARI	0312068302	$2b$10$KsMJb963yala5RMn5Z5uRe3U41Iw3CT9ktzmacHLCqdqMSjK2CIQy	0280	dewil@fk.untar.ac.id	Pendidikan Dokter
904	OCTAVIA DWI WAHYUNI	0320108401	$2b$10$tVeBZ0cHq1lEV3BCOHjih.Kct3NVa9F9Vb66vyFtExO5iADt5zcDu	0281	octaviaw@fk.untar.ac.id	Pendidikan Dokter
905	ENNY IRAWATY	0307058004	$2b$10$MhXPFY3N.1KHCJcryr2IeekPQ47RX0bSdshWAuUyVQ.MOz6UrXdLS	0282	ennyi@fk.untar.ac.id	Pendidikan Dokter
907	FIA FIA	0323118102	$2b$10$GJ6QxeYcgAm.rmmAeSdSROlpGDow2o4l1xrckMpXhRbykxaZ8c3l.	0284	fiaf@fk.untar.ac.id	Pendidikan Dokter
908	SARI MARIYATI DEWI NATAPRAWIRA	0319037301	$2b$10$Hy2Wf.n/79XWwmcRVOWrvOApWZuOFTQlXxeN3n5XFvlOCqrJSaTHO	0285	dosen284@untar.ac.id	Pendidikan Dokter
912	SUSY OLIVIA	0325107504	$2b$10$nEoz3x2c/0PRyPH2ZqNeyOOQQ8vf80BELiYj2rdBgQNgbX62MYX.y	0289	susyo@fk.untar.ac.id	Pendidikan Dokter
913	CLEMENT DREW	0325078906	$2b$10$Tjl0fumo4CwLUYvQR7bBJOOOC1U50GiMp8X/eSTKTgEfs3TfIGY2u	0290	clementdrew@fk.untar.ac.id	Pendidikan Dokter
914	ALEXANDER HALIM SANTOSO 	0316097004	$2b$10$mII03pFOkXZvvXMVPk3Qk.nLPopybVfXUAUJWqpTF7y1g3KSuCyX2	0291	alexanders@fk.untar.ac.id	Pendidikan Dokter
909	SILVIANA TIRTASARI	0315048903	$2b$10$6jldttTg.DOe2wrcita5COlidTKqfLt6q.FANGYE.uvuH2JImwzAK	0286	silvianat@fk.untar.ac.id	Pendidikan Dokter
910	TRIYANA SARI	0325018401	$2b$10$KdRRRrlrOYgGUJL3hQPhge9S1qQE/9FGJH/F9nDlBQ3pPAQ3Fpmsq	0287	triyanas@fk.untar.ac.id	Pendidikan Dokter
915	RIA BUANA	0325118202	$2b$10$14mrXNMR6shW7HDIg/gBf.Y4/QBeOKt.nxkkVs2WCphbuNLHbAJTi	0292	riab@fk.untar.ac.id	Pendidikan Dokter
916	DAVID LIMANAN	0314058303	$2b$10$dtzBerFySzkakyVc9KVH7em2XTD27cqr6ECUMqToXlQEjD2cqjchK	0293	davidl@fk.untar.ac.id	Pendidikan Dokter
917	ALYA DWIANA	0312058105	$2b$10$LTSG37wLQHB5UJ/dRsDpI.Kp9DH6jJHdp0xB1tuD7RQjB8bC99Wli	0294	alyad@fk.untar.ac.id	Pendidikan Dokter
918	FRISCA	0310128405	$2b$10$er3IxAfZlQ56LS3QFPILgeJAUh.FzM/jYzoiheh6rqvjjp4Z2DK5i	0295	frisca@fk.untar.ac.id	Pendidikan Dokter
919	CHRISMERRY SONG	0326127501	$2b$10$Clz4LBjvdNKkFhWiomh.weaucTRjZ0zpO3JXICHf20N.H6PwEp/te	0296	chrismerrys@fk.untar.ac.id	Pendidikan Dokter
921	OENTARINI TJANDRA	0328026003	$2b$10$ygmyH45iQ3hQ9wfqXwkduOo265KQB6yfrjN/E74iI4bbYimaSArsq	0298	oentarinit@fk.untar.ac.id	Pendidikan Dokter
922	SUSILODINATA HALIM	8931650022	$2b$10$M9qO1kJOk1iDSML/4HSoteNiORt.qcxK0ESwxwQ8TmNYA/Eti9Sci	0299	susilodinatah@fk.untar.ac.id	Pendidikan Dokter
923	ERICK	0301048504	$2b$10$A/i4AQsM6OtOgI/zd6uB3.ZLNotM8dnju7hDH4ba88VW0SdeNL0f2	0300	dosen299@untar.ac.id	Pendidikan Dokter
924	REBEKAH MALIK	8993650022	$2b$10$x7VBdX80H1drNDzuu23vYeZ4uyIKPEG2c3bjt62zxR9KP30oUIhjS	0301	rebekahm@fk.untar.ac.id	Pendidikan Dokter
925	JULIUS CHANDRA YAPRI	8863190018	$2b$10$m2Zxi5gDTyWwzHnBiUAiWuULHDWYzquIy6AXoUuaZZnHgc0R7HXr.	0302	juliusy@fk.untar.ac.id	Pendidikan Dokter
928	INDAH SUSILOWATI	0330107502	$2b$10$0qjuKxTp.YmbBOr6Ct07w.XIgjZzUSwW7LMxSDv7EAEVzcHX3i4vq	0305	dosen304@untar.ac.id	Perencanaan Wilayah Dan Kota
929	SOERJONO HERLAMBANG	0315036702	$2b$10$z3cDkPdOMmD5y3Bsx0p2L.x4l1I0P0h9OYFF1wmNdemA6qd7TQJde	0306	dosen305@untar.ac.id	Perencanaan Wilayah Dan Kota
930	SUSANTI WIDIASTUTI	0303057704	$2b$10$wLePS8ddhijFUlSSd7MZ.OINgWFewMCz6beh976NGPH5lZA81bL2O	0307	swidiastuti@ft.untar.ac.id	Perencanaan Wilayah Dan Kota
932	MEYRIANA KESUMA	0316058504	$2b$10$oBdK15jqfUdyctI9EDfi5OaDiAydL8vR2LH5OoTthjkbWIBoXlCaC	0309	meyrianak@ft.untar.ac.id	Perencanaan Wilayah Dan Kota
933	NADIA AYU RAHMA LESTARI	0302089301	$2b$10$CwRu.SCMoubqJl5U9cxA9uPZB0DLFM.5Hpvumnp9sf41s/9mq7YqK	0310	dosen309@untar.ac.id	Perencanaan Wilayah Dan Kota
920	DEWI NOVIANTI	0328118101	$2b$10$yaK8TGg1Z5Z0M68MEOHBLuscurZMC9i0Ibn39huUmMrl8vyONavb2	0297	dosen296@untar.ac.id	Pendidikan Dokter
934	REGINA SURYADJAYA	0303048601	$2b$10$0RpIrqSyQQDY8dTQHLxjE.SbV2Z7zqYPcNAgrtwlVZwSY8LcYNy5a	0311	reginas@ft.untar.ac.id	Perencanaan Wilayah Dan Kota
935	WAHYU KUSUMA ASTUTI	0309059301	$2b$10$AsdskAPKocPji6uEnnPzBOpxu4Kmd1nfWYzkmcPEjR52ol/.IivwC	0312	wahyua@ft.untar.ac.id	Perencanaan Wilayah Dan Kota
936	SYLVIA WIRAWATI T	8852470018	$2b$10$Pv3cfYSsNOtIt0BNuwsEeOUi7GOW5mYUgsZfVWFl6.lWfQob3VkwK	0313	sylview@ft.untar.ac.id	Perencanaan Wilayah Dan Kota
938	B IRWAN WIPRANATA	8811050017	$2b$10$feobD1.uckpQdgEmMRALyOqoMLsvKS3e75mKFBtypn1qM4jaI0Mbq	0315	irwanw@ft.untar.ac.id	Perencanaan Wilayah Dan Kota
939	HERYANTI SATYADI	8860680018	$2b$10$4CAOZnVA38FHfHonAQZRReo/78sa1LOK7FsY.RzldPsJJfANoR99C	0316	heryantis@fpsi.untar.ac.id	Psikologi
959	SANTY YANUAR PRANAWATI	8877980018	$2b$10$7Dy0tIwLXeLlvONWgt8q4eEOPjETcrORo2xZJZdxmBEuqfLkxOQh.	0336	santyyanuar@fpsi.untar.ac.id	Psikologi
958	WILLY TASDIN	8845980018	$2b$10$R3Mrx2qqInZwKuPrqQsdz.PZFPvf8Wfd2a38G3NSGN/iXjwMsuWY.	0335	willyt@fpsi.untar.ac.id	Psikologi
953	NIKEN WIDI ASTUTI	0310106602	$2b$10$ZAM.YCLD1CmtH1h9yC1Ta.l7tUluEq2gwoFF58SqGM90kVWAF7gdS	0330	nikenw@fpsi.untar.ac.id	Psikologi
954	UNTUNG SUBROTO	0302037104	$2b$10$FjfLVeYagM1z0zSW3n9t5O6eqbPjs7OMt7IhTOVSu3uU32H4dEyMe	0331	dosen330@untar.ac.id	Psikologi
955	JESSICA	0305038802	$2b$10$8GnkkNhU3.aWYZU15/BhG.m12ssQ7dur1EUczd.0KGrtvMKoxXCpO	0332	dosen331@untar.ac.id	Psikologi
956	BONAR HUTAPEA	0312017202	$2b$10$I.4B0PrKzL7XzDWm6yhC3e/mcxJ6h8IhCfC4FjRIh8kVw2RrVl3F.	0333	bonarh@fpsi.untar.ac.id	Psikologi
957	ERIK WIJAYA	0306128306	$2b$10$ZVZRxDu6xXNYrK3wpADGXOWzRCarLA5oJu/fBdC1c7eYHbNxlS.sy	0334	erikw@fpsi.untar.ac.id	Psikologi
944	RAHMAH HASTUTI	0318048101	$2b$10$WsoQgWmBTCG1.Wsm3OdLautJADGvZvTkQoIUf0CdG0ZCC0ujRwtaG	0321	rahmahh@fpsi.untar.ac.id	Psikologi
945	MEIKE KURNIAWATI	0309058102	$2b$10$2/FswinKAL7CXPAe1xBQY.TJI54TbWB/XX2nVcQm6aeIqr8H6ymha	0322	meikek@fpsi.untar.ac.id	Psikologi
947	MEYLISA PERMATA SARI	0303059202	$2b$10$aP9m42cmyiSmhQRRPJg9aexIYQLG2Pcm/rQ3nvweurQ8DjH2I94ve	0324	meylisa.sari@fpsi.untar.ac.id	Psikologi
948	NINAWATI	0312106101	$2b$10$.Vtd/9zetfqpUyU2Nl7i/uIHKjtYPTAHBO/KZzkmHtfC9pfGaXTWe	0325	ninawati@fpsi.untar.ac.id	Psikologi
949	MEISKE YUNITHREE	0329067603	$2b$10$j9ggWwLEufU9j7qZUyENKuBlQypxJUEmwRMFQI5iZ2B6nAsWadUuC	0326	meiskey@fpsi.untar.ac.id	Psikologi
950	AGOES DARIYO	0306076803	$2b$10$CSoUaXxe4hb.8GlgoM4W7.7WflxowC2udy3ICk/hhersXkejIqpUq	0327	agoesd@fpsi.untar.ac.id	Psikologi
951	WIDYA RISNAWATY	0325077602	$2b$10$J48E6J0F1bey3Bb1glwW7enR19qHO4dLQ/uAI4Xk240kqG62gzmL6	0328	widyar@fpsi.untar.ac.id	Psikologi
952	DEBORA BASARIA YULIANTI	0327077903	$2b$10$slBSeESicP9pXgfaHbkjFuX.qtcw/izzXtnCnVHA.AYk60OpuWiFq	0329	deborab@fpsi.untar.ac.id	Psikologi
941	BIANCA MARELLA	8839680018	$2b$10$Phx0XUZqCo9k54tIlSgI6udnitLX/gp8iavyyF4at9FEaKItUM0x.	0318	biancam@fpsi.untar.ac.id	Psikologi
942	DANIEL LIE	8876980018	$2b$10$fB8wVRMKiL/8j4dQ1iNZDe2F.NRKndoFk1.R9NOaVle/lwcd1Seaq	0319	daniell@fpsi.untar.ac.id	Psikologi
960	DEDI TRISNAWARMAN	0309077202	$2b$10$6FW/rYOCPTJmKl8sUmIzAuDgNfg2SZ44dDWTjdme0HROiCiwy1Iti	0337	dedit@fti.untar.ac.id	Sistem Informasi
962	JAP TJI BENG	8943220021	$2b$10$BUpgIIl0IHboYk1Pi/ncNuYKYTkq.AQb2SdVVWuKQH3OIvkBz18p6	0339	t.jap@untar.ac.id	Sistem Informasi
963	DESI ARISANDI	0308128101	$2b$10$D5FPAL5JkZWsDtDCXU8LU.DHbQZ83mZf9uZjTMm0EgC74QPQDxQrW	0340	desia@fti.untar.ac.id	Sistem Informasi
964	NOVARIO JAYA PERDANA	8856970018	$2b$10$4p.uXnukbf2Q.ugjh.uxcuAq/aeyjB5FRta1iO28EX46/zE60yhTi	0341	novariojp@fti.untar.ac.id	Sistem Informasi
965	ZYAD RUSDI	0315066602	$2b$10$jkR1BwPO8U/yf0LrHkAbRuCDEUDRzLEZnwi1XfkUmPfitkeVi74fC	0342	zyadr@fti.untar.ac.id	Sistem Informasi
966	TRI SUTRISNO	0320018801	$2b$10$d0jqKOLZ0QzoQ5Vl4Ru9cuZPqFgXS4VaFhDSRt0iC60zysxZ6lsnu	0343	tris@fti.untar.ac.id	Sistem Informasi
967	WASINO	0317036802	$2b$10$Cd7cLtbp6.JgqkDPqNVT..dGAsamwegj.uFG2awMpeUC9MR3AIlOG	0344	wasino@fti.untar.ac.id	Sistem Informasi
969	ENDAH SETYANINGSIH	0317076105	$2b$10$Em.y.DIRTQsrAcSinMQDh.ddP2zGarTVA/5Cm1XfgNq270WAqu3xW	0346	endahs@ft.untar.ac.id	Teknik Elektro
970	HUGENG	0306097301	$2b$10$siJlzVCzS03oEnEOV9K/T.c.NogwJQcw.WzUMJ7jb55BvbEaPBJGi	0347	hugeng@ft.untar.ac.id	Teknik Elektro
971	MEIRISTA WULANDARI	0331058802	$2b$10$F/4v0m//uJ.WD0vMxbYQL.joCrV51TghC4H6v2oVF54sHf2DuKs/O	0348	meiristaw@ft.untar.ac.id	Teknik Elektro
972	SURAIDI	0318127301	$2b$10$A7BbS8zsrtlkzdZf30kOeuOVwKuVNVUqYKVRV1fNbFGYl.KP8WQHC	0349	suraidi@ft.untar.ac.id	Teknik Elektro
973	JONI FAT	0311017902	$2b$10$SjIIs5fiVn6SSxqOsmxFVeLzjtt0JjGI45SJEELCdY7zyq6clkVqO	0350	jonif@ft.untar.ac.id	Teknik Elektro
974	HADIAN SATRIA UTAMA	0322026001	$2b$10$P0S5500Hd//GPj0eXOVhHe3qCbj3H6yQycNSFryv0JNaAj.zdTbrW	0351	hadianu@ft.untar.ac.id	Teknik Elektro
975	YOHANES CALVINUS	0316098505	$2b$10$9QaFS.SIRbGkSXxIR58U1eF1qs5Wiq6maht9840UoB2Df/aUCd7dK	0352	yohanesc@ft.untar.ac.id	Teknik Elektro
976	LINA GOZALI	0315066902	$2b$10$PvQy3GZLzjUG1EX00N/aYu1/Dci0Kl4r9nyYrt0XcllMaYTSg5owS	0353	linag@ft.untar.ac.id	Teknik Industri
977	LAMTO WIDODO	0320126804	$2b$10$vJymDBeLbEMOP76K/WF6buEzf3b09UwBQyDLS/ZLUtrkdsYI0QDoy	0354	lamtow@ft.untar.ac.id	Teknik Industri
980	FRANS JUSUF DAYWIN	8833650017	$2b$10$lsT/1qJBB1sgxJYsqxTV.uB0SHVEqIdm.6Yhur.DuJz4Lhbnpm.sm	0357	fransd@ft.untar.ac.id	Teknik Industri
981	ANDRES	8828640017	$2b$10$gehov9udtte5svs4n2dhdOouWJsSS3U2ZPvGb/pPt0PrEFD4blnSK	0358	andres@ft.untar.ac.id	Teknik Industri
982	KHOMENI SUNTOSO	0318068001	$2b$10$CQhwVYGDigL34WGa2y5fc.jtuBbRH5jxP0ApYJZsQJXa9greEI3ma	0359	dosen358@untar.ac.id	Teknik Industri
983	LITHRONE LARICHA SALOMON	0321078301	$2b$10$R5bnnpx/0UlyN1JPNKLX7upH8Q5dMHyr.3ZoU/nGwKlwtqw1VgCsG	0360	dosen359@untar.ac.id	Teknik Industri
984	CARLA OLYVIA DOALY	0913078203	$2b$10$fvtnszOel6K0b.bwk.Hgjua5QDAgCsrtTYnEoOlv0pOG.07qCn3fC	0361	carlaol@ft.untar.ac.id	Teknik Industri
985	I WAYAN SUKANIA	0327026904	$2b$10$bmblBXzoVoEGdz9UWmKJhOJnznWY54NT6CSKzxwXRhPUoXJaOMiYe	0362	dosen361@untar.ac.id	Teknik Industri
946	YOHANES BUDIARTO	0315097404	$2b$10$jzvnbByjQe0ifg5MkTYMAeVbUFyLMF5Wg8H37q45BoT9CrzG8yxZq	0323	yohanesb@fpsi.untar.ac.id	Psikologi
979	ADIANTO	8963450022	$2b$10$.VNOKuGveMZvn6W1zpLaueXYKQQPBrjQtUK9VVJN4To14GGARAoQa	0356	adianto@ft.untar.ac.id	Teknik Industri
986	AHMAD	0301117001	$2b$10$0RnRQSFBpUVL432/PtWbu.Ga2pnRyxd2t4TfqmrI/9CHMe4EuG3.O	0363	dosen362@untar.ac.id	Teknik Industri
988	LELY HIRYANTO	0321027901	$2b$10$tOCTst/0hugquFM/cdwlB.bUbj6D4JF0T07ZNPcPAOvaTTEnPy/H2	0365	lelyh@fti.untar.ac.id	Teknik Informatika
989	LINA	0320027901	$2b$10$jeBwLHlO/0Z.cV4lA8nZZOzTC5HeNjaUCJDiAJOe2VwTaq9va1Dr6	0366	lina@fti.untar.ac.id	Teknik Informatika
990	RR DYAH ERNY HERWINDIATI	0306046301	$2b$10$Gk3IKrpQwQTHiGo64OsMiu0Dax7c.N8jWnDoFNsQwSRonvMblSsVa	0367	dosen366@untar.ac.id	Teknik Informatika
991	TENY HANDHAYANI	0320088501	$2b$10$t9VTF6fAyfFMdgTZroogu.QST/Y6icBRzod9um0T21zPBw.esExWa	0368	tenyh@fti.untar.ac.id	Teknik Informatika
993	JEANNY PRAGANTHA	0309096204	$2b$10$GwnvsNowQ/IWu45N8FEyWuuerp.K0Oj3QaVs9iUvwRlDhY1aKNfLC	0370	jeannyp@fti.untar.ac.id	Teknik Informatika
994	JANSON HENDRYLI	0331019102	$2b$10$q3nz2w.1Y0eIbpL/wfq9NeWCUvSceaoCTGLz4FcNRhqYREAKpc7/q	0371	jansonh@fti.untar.ac.id	Teknik Informatika
995	CHAIRISNI LUBIS	0307096301	$2b$10$H/qHksTwgu2c9pmP3IY16eQCeLDAiVagGqoEbTtfJ/Epi6RXG0H2a	0372	chairisnil@fti.untar.ac.id	Teknik Informatika
996	AGUS BUDI DHARMAWAN	0326088401	$2b$10$Upujy6hjWqrH/scabhNoy.vCODGTFwU5myEw37ngpbCptl8tAS19O	0373	agusd@fti.untar.ac.id	Teknik Informatika
997	DARIUS ANDANA HARIS	0305118702	$2b$10$LHKNjaZWGERy.PHZVGqfE.7Cfogkw0eEsqwcEpVHEMNmpOB1QG3Sq	0374	dariush@fti.untar.ac.id	Teknik Informatika
998	VINY CHRISTANTI MAWARDI	0317088203	$2b$10$dB0OZuJFkrNP92MYZ7Afket1D4eKEqwDzLw/cxXdwE7PrCtTNv9b2	0375	vinym@fti.untar.ac.id	Teknik Informatika
1000	ABRAR RIZA	0326046801	$2b$10$Mu9gR9AG5vulfe8OzQUC0uO8FN9Nl3QbOUkGRTQk4yWCyL.VIcWem	0377	abrarr@ft.untar.ac.id	Teknik Mesin
1001	DIDI WIDYA UTAMA	0317027801	$2b$10$Tf3wbT3L5BZ4EL9gKioRiO2yJGe/v3QSfg.3gVS4EZqsW5iVw8GuG	0378	didiu@ft.untar.ac.id	Teknik Mesin
1002	MUHAMMAD SOBRON YAMIN LUBIS	0114056705	$2b$10$K5p0IxPyGnl66W/0CRTC6.EGxHnaZA1eC.DXUCjV/WSQBcx2fE/CO	0379	dosen378@untar.ac.id	Teknik Mesin
1003	HARTO TANUJAYA	0318057201	$2b$10$AKaktSRbP6gsGicewoBPnepMO5T9RTbfBZmjJysMQSclGyVO3MhS6	0380	hartotan@ft.untar.ac.id	Teknik Mesin
1004	AGUS HALIM	8890220016	$2b$10$JF7W6Sb2P6.MQeJ8MtU2kur.T7DRl2mATqTLRk6JcKxA0YzXwl9GC	0381	agush@ft.untar.ac.id	Teknik Mesin
1005	ROSEHAN	0304076207	$2b$10$IIomJBA6UdvnL1Zi3h6QOebkngL4SaCXzC.pczZQeQGuFTcwhTGpe	0382	rosehan@ft.untar.ac.id	Teknik Mesin
1006	HENNY WIYANTO	0316106907	$2b$10$L83G.YfYsw4iy01N0fto4ejvFHFF5a0rUIJRyF45XlU91yhWWzgey	0383	hennyw@ft.untar.ac.id	Teknik Sipil
1009	ANDY PRABOWO PHO	0329098601	$2b$10$6iQToxZGkR/BTg9NMb6vuuvlQJmWYmO9/EM4pNYB1twDjJ5zAUnWK	0386	andyp@ft.untar.ac.id	Teknik Sipil
1007	DANIEL CHRISTIANTO	0304066904	$2b$10$v7VArOkTwNMZ8UIU9GusjeWvK4z4sj0KpM6OAh/QPnR2Yf4WsLLi.	0384	danielc@ft.untar.ac.id	Teknik Sipil
1011	LEO S TEDIANTO	8870220016	$2b$10$/DHqyVmLd2q5nhgBDWHv0uEQFP5J96ocgvMgmd2wTlbpZP6vjMx3S	0388	leotedi@ft.untar.ac.id	Teknik Sipil
1010	INDA SUMARLI	8848923420	$2b$10$twy.KYtScEcIwoljegcBMOqCEKc0/Jp.sf5uqxaCPlSSmh/Wq2nje	0387	indas@ft.untar.ac.id	Teknik Sipil
1012	HENDY WIJAYA	0323019101	$2b$10$pajZtBYaVdy6p/avPA/jme1h2cNDsQlxqwqdv4nSty/35rMPgR7eS	0389	hendyw@ft.untar.ac.id	Teknik Sipil
1013	ARIANTI SUTANDI	0316046302	$2b$10$KK.xMjPwksOw5IFyujreceTj7LhNZOrCro4jAdgNx6YnEzX3Kww/e	0390	ariantis@ft.untar.ac.id	Teknik Sipil
1014	VITTORIO KURNIAWAN	0319058904	$2b$10$l38F4k.EYa8FwOB16TJg6OFDAZZd3znwnNONQHul2FW0P9gprqO26	0391	vkurniawan@ft.untar.ac.id	Teknik Sipil
1015	EDISON LEO	0310107904	$2b$10$3Od/pHH3V5eZVcGo5Wi8neQvzsE8npE.2ExKCVwdrriba27M9mh7i	0392	edisonl@ft.untar.ac.id	Teknik Sipil
1016	NI LUH PUTU SHINTA EKA SETYARINI	0303116301	$2b$10$uWAy0NboLmJSpMXzbAhz3.URSAMzullkpoYEy7/NWMjZz6fr.OXiy	0393	dosen392@untar.ac.id	Teknik Sipil
1017	SUNARJO	0319106502	$2b$10$QW8cVDRpgyJ86XXUiB51e.FT.XVYcpIEsY9dZlu1963tnGdwoA0mq	0394	sunarjo@ft.untar.ac.id	Teknik Sipil
1018	ANIEK PRIHATININGSIH	0321096001	$2b$10$WJYlIxkW9uZ0N.xCDGukmuTeRcGV6tXmQdTJhp51sdC47Zd1BWz4y	0395	aniekp@ft.untar.ac.id	Teknik Sipil
1020	GIOVANNI PRANATA	0303018602	$2b$10$BP8nqasI6QGzUyYE2azlguWf2sUg1DMjL1S2HVur/JvIe2DoUA4ZO	0397	giovannip@ft.untar.ac.id	Teknik Sipil
1021	ARIF SANDJAYA	0309098904	$2b$10$2SCFAucFKBWtMn7GGFpNAO9.F3w6QVTt7KsUAmTIPRWRyq/R6GUL.	0398	arifs@ft.untar.ac.id	Teknik Sipil
1022	IGNATIUS HARJANTO	8897510016	$2b$10$oFszYAeg61p75G1tEkEJquvEcD9kn9vuDyozoavLYID8w9XYzHao6	0399	ignatiush@staff.untar.ac.id	Teknik Sipil
1023	NGADIMAN	0319117003	$2b$10$/NwMJ7tT3CAFxJIyZmAqEumiAdImKZqil/BLG9sJbWjUd3BbYN5.O	0400	ngadiman@fe.untar.ac.id	Akuntansi
1024	VERAWATI	0317018602	$2b$10$Ze/qKCJ99QEFchDRcipkoOHRAWT7DYQDSDpnUKfeZTKyUlVzxM3AC	0401	verawati@fe.untar.ac.id	Akuntansi
1025	HERMAN RUSLIM	0310026503	$2b$10$WzSQftjWiPbt4.pa/iIBTeGmtm583pUDS7V1ry6a1AT684hRopgSm	0402	hermanr@fe.untar.ac.id	Akuntansi
1026	HADI CAHYADI	0302076601	$2b$10$uKWr8S.Af0XqLvNqCQB77OA3OwIJRqI2Im3Iflx1cB7o14ohB.FQC	0403	hadic@fe.untar.ac.id	Akuntansi
1027	JONNARDI	0324016401	$2b$10$Mt3JmMKmr3l3ZMeGA2UCLeZSm9ekO1uQYDfw8/5cADuhY7YPzWrum	0404	jonnardi@fe.untar.ac.id	Akuntansi
1028	ESTRALITA TRISNAWATI	0318127001	$2b$10$gmEbVO6LjPoNzB0vcFTUmeHR1j/tM6jEr0orBFRTuriKZk/WtQmZq	0405	estralitat@fe.untar.ac.id	Akuntansi
1029	NANIEK WIDAYATI	0024085702	$2b$10$CBs3zMIqhJYC0Fg.M1QY5.Yfd31T/tWC4fIcIOhFynAR7djzGbgzq	0406	naniekw@ft.untar.ac.id	Arsitektur
1030	SAMSU HENDRA SIWI	0301096502	$2b$10$ArIGxlVxqqqvd.NBoYBLmu4Dm8aF.gSVMzjlyCBORuEcw9Vtrz1gm	0407	samsus@ft.untar.ac.id	Arsitektur
1032	HENRY KUSNADI	0305116703	$2b$10$6tmWy9VfUP8Zr/lRuAovPuZtB865O3NHXeEjApM5WBZn11jelCSTq	0409	henryk@ft.untar.ac.id	Arsitektur
1033	TITIN FATIMAH	0327077906	$2b$10$Hi0Xg703FCZJBTGyj09KoeVuy/YryLIrkGXST07vEM79mLzK3LKd6	0410	titinf@ft.untar.ac.id	Arsitektur
1034	FERMANTO LIANTO	0305076401	$2b$10$1x7lo3EBSdbyQLQu9oAooOCCMTpm9uRhEKuQ4lfyLH4qcAPt42HMC	0411	fermantol@ft.untar.ac.id	Arsitektur
1035	RUDY TRISNO	8899260017	$2b$10$Rp7BOsqOdcP8dh9IfOaleecLHAhI/szkHlQ0yGjkxdwYKxaZYglx2	0412	rudyt@ft.untar.ac.id	Arsitektur
1037	YENITA	0317078002	$2b$10$RGERyQYIxrSQ2K.12iVvjuttB.dh.LS7rBhMZJ6HHklmoY6ZGnrwG	0414	dosen413@untar.ac.id	Ilmu Hukum
1036	TUNDJUNG HERNING SITABUANA	0607095801	$2b$10$FhJIdJwkASYwV6QlfI07UOLD5dWXnWPFaoOCGyyzf0BtCsNCE.zDm	0413	tundjung@fh.untar.ac.id	Ilmu Hukum
1039	ANITA DEWI ANGGRAENI	0328096304	$2b$10$MUAnXAR/vmL.OWQVhAk.buqntYCFtYFcY8SwvyQ82MA5N6VDbyL8u	0416	anitaa@fh.untar.ac.id	Ilmu Hukum
1040	REFLY HARUN	0426017010	$2b$10$I40jTM.La6LUtAzMgGEab.1toSuWPpZky1VV6Gy.vjsqpxsh/gFx.	0417	refly@fh.untar.ac.id	Ilmu Hukum
1042	K MARTONO	8808650017	$2b$10$I6XDby1xfWXHwUQNaOt8eudyPgawqv6O32k4Ceqooa3TS3B559.MG	0419	dosen418@untar.ac.id	Ilmu Hukum
1043	BENEDICTUS BAMBANG	8821050017	$2b$10$yWT5oIsrbVmFG7IlgLjibOsJUD8DpAmrk0eQytvXyH7kvOuh/1TaK	0420	dosen419@untar.ac.id	Ilmu Hukum
1044	MARTA SRI WAHJUNI	0303106907	$2b$10$6EHzLvyRC9UDBMt2BzpRyObxDSFOE0/TFAhwDBh2qK/bZz0PaRV0i	0421	martasw@fh.untar.ac.id	Kenotariatan
1045	URBANISASI	0403067203	$2b$10$KMIVc7nyCzhwmS8iiVuXiu7fDvKgRWY.XZbGpfhTodZqZhcGNxupG	0422	urbanisasi@fh.untar.ac.id	Kenotariatan
1046	BENNY DJAJA	0322086307	$2b$10$fgUJkZxsBHOX/dOhEL8uBujAm4Nf4eli2dl1ortkSnsABoOkzhTDq	0423	bennyd@fh.untar.ac.id	Kenotariatan
1047	GUNAWAN DJAYAPUTRA	0303066201	$2b$10$FSl.cO82002W2HgdddzUUeow429HwkfI2c/NmrhfcmUOetIMerhOq	0424	gunawand@fh.untar.ac.id	Kenotariatan
1048	TJEMPAKA	0229087003	$2b$10$hYn.WwV5ImSNPsJA3Om1tey2emzoFX34v8sR4yCiMFPxs5BNLF0Ma	0425	tjempaka@fh.untar.ac.id	Kenotariatan
1049	RICHARD CHANDRA ADAM	8876870018	$2b$10$mPCqCeucqYqUqObBZYPE2umM3fwh.0VvEUklFkBWVd2xmUFm7rV7i	0426	richardc@fh.untar.ac.id	Kenotariatan
1050	AGUS ZAINUL ARIFIN	0318086301	$2b$10$2grsG0./Q6AN2F5gvpLgq.9i0eDFeGUc1qnA/BpCA1Ej9rWDXzMCu	0427	agusz@fe.untar.ac.id	Manajemen
1052	HETTY KARUNIA TUNJUNGSARI	0316017903	$2b$10$UfLsuTIu91xsOscIHqRhWuviIA0x9QXMm6KcZGN6MNP59eHEs2F1q	0429	hetty@fe.untar.ac.id	Manajemen
1054	SAWIDJI WIDOATMODJO	0301126203	$2b$10$x71KTv1vDrNePJ0YQ/iJdOax3Bg.CT2u3zAMLWxdWtwiCGBk/I2j2	0431	sawidjiw@pps.untar.ac.id	Manajemen
1055	YANUAR	0305016201	$2b$10$C1ZjTZP4sxqD8BYmwVHFheDiywqtGVcPcZmWau6BUonX4e5rN4Jr6	0432	yanuar@fe.untar.ac.id	Manajemen
1056	REZI ERDIANSYAH	0301056202	$2b$10$OrDHadmuw8XSKlAnJTwSzOEUGdS1lkuFIonyq.kWULJSnIssRmLza	0433	rezie@fikom.untar.ac.id	Manajemen
1057	MUKTI RAHARDJO	8867980018	$2b$10$a..bkqQj/yN2TbC7n45nsOoLO6fdasWFDcVbXxHWQvTLdaF35/T6C	0434	muktir@fe.untar.ac.id	Manajemen
1058	HANDI CHANDRA PUTRA	0314118101	$2b$10$CKe09z3/9nuxJMffRxzgTuzn1IgHR9yjbUV0yqDCo9ruO4R9TwPDK	0435	handic@pps.untar.ac.id	Perencanaan Wilayah Dan Kota
1059	OLGA NAULI KOMALA	0317058101	$2b$10$Fi4sRCaX0eH/BuvloPLROuSxMeMWJdgTRLB4N4YDuXXZie/TK8VyS	0436	olgak@ft.untar.ac.id	Perencanaan Wilayah Dan Kota
1060	DENNY HUSIN	0326108302	$2b$10$snvTsoEU5Y/nLHCGMX9cJOH8t3Rv3/tvDuu/jZH/5.NE9m7TwINoG	0437	denny@ft.untar.ac.id	Perencanaan Wilayah Dan Kota
1062	ERWIN FAHMI	0328095901	$2b$10$IzaXyPsvkPJFNnC/FnjnuOL8au8kKm.euHU0BJTkJfd3zzQGssZWG	0439	erwinf@ft.untar.ac.id	Perencanaan Wilayah Dan Kota
1063	ING SURYADI SANTOSO	8808510016	$2b$10$pCJELgxOEwwiYNxLy7AYreyKndpJaJX22b0jjSG8P88x2BCnelQ3m	0440	surjadis@pps.untar.ac.id	Perencanaan Wilayah Dan Kota
1064	WITA PERMATASARI	0329077703	$2b$10$slcDnpQjzmVxdxc4IxACnu5NVilOsWFCLZV/7Tn0elK/445/GRVuq	0441	witap@pps.untar.ac.id	Perencanaan Wilayah Dan Kota
1065	ROSTIANA D	0324065901	$2b$10$bzmDbqLEJBeVV6OZo4oKYOWaQsjInwQPwKEPp07suHJoXbEYxBoAi	0442	dosen441@untar.ac.id	Psikologi
1066	P. TOMMY Y. S. SUYASA	0320037403	$2b$10$kgwK1OdBG6dI9POQSVRL8OqV/XyqCbT6gdkqb0/fv0dPGr4N2D1Ga	0443	dosen442@untar.ac.id	Psikologi
1067	RAJA OLOAN TUMANGGOR	0314046703	$2b$10$17vmaxjQE.lfNfpowDkKquc3loML8K2sV0Gi.ldrXV3oPkPOkbN2e	0444	rajat@fpsi.untar.ac.id	Psikologi
1069	PAMELA HENDRA HENG	2325116201	$2b$10$H8cNHMm98R3JfSEJgraWm.3WC2BQ8ryCQXTzNyQbQ2KD3oxjXsE0K	0446	pamelah@fpsi.untar.ac.id	Psikologi
1070	NAOMI SUTIKNO	0305107303	$2b$10$xBwnWcKh/YZV9S1QXk4X6.wC65qEEU1BX.0tVGzTcAGQwCTpoAFBC	0447	naomis@fpsi.untar.ac.id	Psikologi Profesi
1071	SRI TIATRI	0324106902	$2b$10$gWSTxLFdd30L/UDYoCiSeewzzbmAF/mMlTUrDC8hqCTfo.fUw9GxS	0448	sri.tiatri@untar.ac.id	Psikologi Profesi
1072	ROSWIYANI	0316118001	$2b$10$L9FPGG2K46PZA58ftnK8mu2cOJh5sqB4rGRucm4gzV1hRwxMF96/.	0449	roswiyani@fpsi.untar.ac.id	Psikologi Profesi
1073	ZAMRALITA	0324076803	$2b$10$27E30b3PV5R1UJUAbimss.CHPD0RilX3kzcqMYBKKpoTHUKUTAVTq	0450	zamralita@fpsi.untar.ac.id	Psikologi Profesi
1074	RIANA SAHRANI	0308016902	$2b$10$jSaCDbP16PVD5XgdX46TTul.XM/ZV4vxC7AR7FV8EyiPqMzVpkno2	0451	rianas@fpsi.untar.ac.id	Psikologi Profesi
1076	OEI FUK JIN	0325126708	$2b$10$bE8PUI2gYiBhfmQ2qMOP3eVVoEWe5SIDGgx78sVlC4XFgJXWfuJNi	0453	fukjin@ft.untar.ac.id	Teknik Sipil
1077	WAHYU INDRA	0324106201	$2b$10$MB/ni/DWTCnRWJ1ALus3VeXQR7JakkUTd2rHwNfrOtXvyRez86tYC	0454	wahyui@ft.untar.ac.id	Teknik Sipil
1078	WATI ASRININGSIH PRANOTO	0303106501	$2b$10$ar4ITqDXqJmXqKPikc.OnOiwYvuatpW3fq5AgCi0bk6FF/JMtQO5W	0455	watip@ft.untar.ac.id	Teknik Sipil
1079	MEGA WATY	1123126702	$2b$10$A6.IPQ5NssBgQWitYKGQyOkEE4YrxIP4MzilyTMI0muaAW67TuwaK	0456	mega@ft.untar.ac.id	Teknik Sipil
1081	CHAIDIR ANWAR MAKARIM	8885060017	$2b$10$2JPQSS3j2qndTbhU0Y/ewuXZX//vVDknAfQNbpldvMshPPOG3wPRW	0458	chaidirm@pps.untar.ac.id	Teknik Sipil
1082	AMAD SUDIRO	0307026701	$2b$10$lEkbaGPNb/W2yIGh/Uuns.7QfSaowiNnsdRZq2cZaJI/tCx0T38H2	0459	ahmads@fh.untar.ac.id	Ilmu Hukum
1083	JEANE NELTJE SALY D	0301115503	$2b$10$azlIwez2/eN9Fw0yZ6wEHON78Lwzsd3.LMy26bj1M6C2pvnjxU0tq	0460	dosen459@untar.ac.id	Ilmu Hukum
1084	MELLA ISMELINA FARMA RAHAYU	0409026901	$2b$10$oUVzbY2.ANDnBDm6DDT0WuXUKlqFPgdHf.Dna1zDXe9ukStoo.y0u	0461	dosen460@untar.ac.id	Ilmu Hukum
1085	DR. GATOT P. SOEMARTONO, SH., LLM	0321036102	$2b$10$XQwtuMEjzqEqqvvmhVwoy.h6/GlHNdbUk9BVgMLQJosP4uK43d5Xa	0462	dosen461@untar.ac.id	Ilmu Hukum
1086	ARIAWAN	0319038501	$2b$10$eVmyV9cviJ52dYVYQQs7L.uAGVIKag/ghcrDg5IW9YGzMi9FPeL4G	0463	ariawang@fh.untar.ac.id	Ilmu Hukum
1087	GUNARDI	0325035901	$2b$10$kGYStYNN3in768XZ7GcpouQ6WtontLPGMuFKzIxsqlujgWhyUB2DG	0464	gunardi@fh.untar.ac.id	Ilmu Hukum
1088	INDRA WIDJAJA	0320126304	$2b$10$xyusiu5uOVida/SOQ6MhDOXDStZCYxGHXP64LB8ExxgGneVcOaNvC	0465	indraw@pps.untar.ac.id	Ilmu Manajemen
1089	IGNATIUS RONI SETYAWAN	0318037301	$2b$10$fXXxMvHQwgvbDUY45tYjUOONBSISdiB7gZiCgYte5rQjJhUQ2JjvS	0466	dosen465@untar.ac.id	Ilmu Manajemen
1051	COKKI	0303088002	$2b$10$z9tT5T9.5yk/YGcrM/DrI.sgewuFlJ2gVBtgoaGpKVr1SK/CG/BMG	0428	cokki@fe.untar.ac.id	Ilmu Manajemen
961	TONY	0310088201	$2b$10$WbMBGYxIhXSIeGxK8dw5iOAP9HRYSdn3OtYrvmi7qrj2y5WWQrp.S	0338	tony@fti.untar.ac.id	Sistem Informasi
1092	RASJI	0319046402	$2b$10$OT66853vBTD5Y.hVz4wsveQZGHgL8NyEg5lBkJRKzk2mnvOjDR1Uu	0469	rasji@fh.untar.ac.id	Ilmu Hukum
1090	CARUNIA MULYA FIRDAUSY	0330125701	$2b$10$LugTj8kWkbimGZbu8K7C4eyKIq9RC.ZDZnJ9cvWf7pRz/yA67IKEW	0467	caruniaf@pps.untar.ac.id	Ilmu Manajemen
1091	SARWO EDY HANDOYO	0312036701	$2b$10$SlSmqpDq0qxkA4yOUmMaceoxClRqmWgjNUYA5aijbRryy9TkhpG4O	0468	sarwoh@fe.untar.ac.id	Ilmu Manajemen
1093	LEKSMONO SURYO PUTRANTO	0304036601	$2b$10$PJ07n2uwKY3iAu96wvUetO7BOFpzNn4gYVZ20uTJEbf9ooBslmdei	0470	leksmonop@ft.untar.ac.id	Ilmu Teknik Sipil
1094	PRIJATMADI TJIPTOBROTO	0311125903	$2b$10$9x6OFAQR3ciBdhQRuBQVgORQIxJSvfqqlf23r93Hl50SvLev8B7zi	0471	dosen470@untar.ac.id	Ilmu Teknik Sipil
1095	NAJID	0322056402	$2b$10$.1L1TXWr4LW1DCzAIWS9n.jA5CaZDol2AmNTPRCxPS47AeFmnHlPm	0472	najid@ft.untar.ac.id	Ilmu Teknik Sipil
1096	WIDODO KUSHARTOMO	0309126902	$2b$10$dDZHttFFlHKrjWNAqImd0eLsEwbuc6z7syGLAZ0q3CiFk5rnslNGS	0473	widodok@ft.untar.ac.id	Ilmu Teknik Sipil
1097	HENDRIK SULISTIO	1112066404	$2b$10$nB3qPmNhxLhWbuRiQz/R8OyoA99/r9FHUibroCHHbhEj2JGh0cKQe	0474	hendriks@ft.untar.ac.id	Ilmu Teknik Sipil
1098	SOEGIHARTO ALWI	0322066303	$2b$10$BWBmGY9iRWc68uPNKVZG7.awOu4fST4Lt//wF3Ljvl8Y9tBbPQFJe	0475	dosen474@untar.ac.id	Ilmu Teknik Sipil
1099	AGUSTINUS PURNA IRAWAN	0328087102	$2b$10$al11HsduxnqQpb38.aaoSe0SeikcFdmHzKkZkhWUU9fwAwdJWIEzK	0476	agustinus@untar.ac.id	Ilmu Teknik Sipil
1100	ALFRED JONATHAN SUSILO	0323068304	$2b$10$y2JE0NLuhvyB/67HR.AD1ON3FBILhWsp.t7wIf83/4760dvetXTQi	0477	alfred@ft.untar.ac.id	Ilmu Teknik Sipil
1101	ROESDIMAN SOEGIARSO	8841050017	$2b$10$tPAEei7LX11ErEf1Emnw2.cO2NKeOOSHmf6/TSQNCOupx0skNUS9m	0478	roesdimans@pps.untar.ac.id	Ilmu Teknik Sipil
624	AGUSTINA	0331088203	$2b$10$EW48lFZ/Wh2PGq9H..YfLOShhBjNxp.Yo895fd7bQK.JSc7VMLN4i	0001	agustina@fpsi.untar.ac.id	Pendidikan Profesi Psikologi
627	MONIKA	0326037902	$2b$10$QyW3bO46FX2dW32Z9LVqAeBI5.HDZXbImhWBuW0SUa/pnOYuGbav2	0004	dosen3@untar.ac.id	Pendidikan Profesi Psikologi
634	MICHELLE KRISTIAN TJHIN	0308107502	$2b$10$9xeclJDwZ2CeIoHJx/F4oOv8kcCQBNhczI4UCUgHCCnANoflz7M56	0011	michellek@fe.untar.ac.id	Profesi Akuntan
643	ANDREAS BAMBANG DARYATNO	0316106909	$2b$10$01ffXymG04aTkS4ziktGq.5dooo88FbaIQoaTITkPmhjFnk.Lq/Pa	0020	andreasb@fe.untar.ac.id	Profesi Akuntan
652	LUKMAN SURJADI	0305106003	$2b$10$cKKxpgiFxVn6XB8MKZ3RDu.R4JFud9l83.IEvQ3AqJItiNY.CXxhO	0029	lukmans@fe.untar.ac.id	Profesi Akuntan
661	FRANSISKA NATALIA KOSASIH	8806980018	$2b$10$bVf.vtbyljZqFE54RCjCt.cRaNpMdlMU3wZ6aA1gXDOWtmoCGz8H2	0038	fransiskanatalia@fe.untar.ac.id	Profesi Akuntan
697	SHIERA SEPTRISYA	8817070018	$2b$10$.70/J8Lqpi1NKJ39PyJ9neM92qUtieTOa7X2Idusmng6qZHbqhLaC	0074	shieraseptrisya@fk.untar.ac.id	Profesi Dokter
699	LUH PUTU ENDYAH SANTI MARYANI	8886490019	$2b$10$GpX3v3J6/VT9MxKqTTwND.qfcjKHmMR4aaWyGHHrpDUIv9WqAi48y	0076	dosen75@untar.ac.id	Profesi Dokter
710	JONAS NARA BARINGBING	8892701019	$2b$10$hG8wR0ENSfd8gS7CgjDXm.31lQo4Of5kegcMGNzCt9863D64/vehK	0087	dosen86@untar.ac.id	Profesi Dokter
686	SAMUEL HALIM	0329078202	$2b$10$5lZSyHsHcQiIeqM5j.JGL.yt8mr5uIQ.M6bXpPgu4NGujl7ItqPxK	0063	samuelh@fk.untar.ac.id	Profesi Dokter
675	PETER IAN LIMAS	0327116806	$2b$10$pfrNs.lGCSKCGIX3nQodKu3DAtpOqgDoIOkmIZfVex888SYtacXTq	0052	peterl@fk.untar.ac.id	Profesi Dokter
691	GINA TRIANA SUTEDJA	8825980018	$2b$10$uYywb1oNCfDYEc24BP9gCu8ij5dcgqCiR.lDTSalOpDfO5AI4S7Q.	0068	ginatrianas@fk.untar.ac.id	Profesi Dokter
717	JAMALUDIN ISKAK	0302086208	$2b$10$4M6EO59RyQEnCZUCvFpszOHaVqtwi0nAD/0p75MXKsxz1nTy9ZfXO	0094	jamaludini@fe.untar.ac.id	Akuntansi
728	IWAN PUDJANEGARA	8835980018	$2b$10$f51LhPOL9Np83zfO8CRueOB/ZoklIT7MyVgJUS294BvJULGq7M3hu	0105	iwanpudjanegara@fe.untar.ac.id	Akuntansi
736	ELIZABETH SUGIARTO DERMAWAN	0326107003	$2b$10$7lWYUYkdbnxng31ywPMz/uxE6CFyajlEuZ4miGpLoW5/0jHFmFz0W	0113	elizabethsugiarto@fe.untar.ac.id	Akuntansi
752	STEPHANUS HUWAE	8870680018	$2b$10$5GaIKryqQnl9AstiXsvQ/.HXaRdeU8vyokY6Rtv7Vjimc8o2RyiMe	0129	stephanush@ft.untar.ac.id	Arsitektur
764	MEKAR SARI SUTEJA	0304128602	$2b$10$195grlawLcRovpQwjVdHoeABl86ZjD22CkPO8QfU.4Fo0FXbqBivu	0141	dosen140@untar.ac.id	Arsitektur
774	NOERATRI ANDANWERTI	0327077402	$2b$10$ll078VCvQh/FrzYtjXgNz.koVquu5pKW5eIUV3v0shZ0QWHM6.woC	0151	noeratria@fsrd.untar.ac.id	Desain Interior
779	SRI SULISTYO PURNOMO	0310056806	$2b$10$2oazZtTI212PjTP80tXT5eikgPGlUciQOX06rspm0hGJaKyuLtLs2	0156	sulistyopurnomo@fsrd.untar.ac.id	Desain Interior
786	RUBY CHRISSANDY	0317077602	$2b$10$d5h3LT6cgiwjpWDEUdAeseOW9Pd2RerGBlxa5UnZWD2ChArB4GuNi	0163	rubyc@fsrd.untar.ac.id	Desain Komunikasi Visual
792	AGUS DANARTO	0311086802	$2b$10$AyKIPnFaAq5IqG8jpWMPHeVKf.kB7hkEWbH6xn63yUkj7GynCpXi2	0169	agusd@fsrd.untar.ac.id	Desain Komunikasi Visual
799	ABDUL GANI ABDULLAH	8821890019	$2b$10$AoNLuGxD6aBzbe90hM9ku.2QD5JbARaXoiB1bRjSkfEEsW1bvT4W2	0176	abdulg@fh.untar.ac.id	Ilmu Hukum
809	RUGUN ROMAIDA HUTABARAT	0328059001	$2b$10$lL5Ox9ijmPjgXY4odZm8Oudrsx/LsN1NLbC4Y7ynaYZ5Ft2Qw1nsm	0186	rugun@fh.untar.ac.id	Ilmu Hukum
819	DODDY SALMAN	0307077004	$2b$10$DSqX.V0xFjVmN6iR5kD0TeUNQolju5MsshTKeck9IqQGYITRMMV/q	0196	doddys@fikom.untar.ac.id	Ilmu Komunikasi
827	KURNIAWAN HARI SISWOKO	0317067104	$2b$10$QhhOGZfxzWHuzCD0qvFyBOWp2GWOJ09kF0V26o3nC8o8Bei.IUVem	0204	kurniawans@fikom.untar.ac.id	Ilmu Komunikasi
830	SANNY EKAWATI	0324077602	$2b$10$9bdy2RxGgohi1HP8yR4xg..1x0vABbuo4bUNXGWjzVCq44V.XaBVm	0207	sannye@fe.untar.ac.id	Ilmu Komunikasi
840	HERU HENDRAWIJAYA	8896980018	$2b$10$dVksgrqwnU5XxGcbJn.7p.7uhp42D9o3.Ilkw1K1mS5BT.ZJwoNvW	0217	heruh@fe.untar.ac.id	Manajemen
848	ARY SATRIA PAMUNGKAS	0322028401	$2b$10$dtcMb4UktVXe6yEDwRHjhug/U7RFTj6TBRcUl9pHOUGTYPdj2uGmK	0225	dosen224@untar.ac.id	Manajemen
866	YUSBARDINI	0309056401	$2b$10$T/t/2T.IZvxZtA4AeV21yuDPP229FZIHlhD/BUMZZ2rPetBpxIoSW	0243	yusbardini@fe.untar.ac.id	Manajemen
871	TJIE HAMING SETIADI	0301087201	$2b$10$asd52Pvq.p0kSgz4tSAubO/A8mNiTcD12RChzxNjJPfYM70NZNeTa	0248	tjies@fk.untar.ac.id	Pendidikan Dokter
879	JOHAN	0323068507	$2b$10$1pHdd6/8ChqX5B5hhGuj7e1fXQfDl3hQrdvWRdM4uo4wBiPTQM2L6	0256	dosen255@untar.ac.id	Pendidikan Dokter
927	DONATILA MANO S	0303058503	$2b$10$oojvjEdRfyGFhUTbqAuZ4OHg9MaWdo5gruXeSd30O5JxUFWJYjCfa	0304	donatilas@fk.untar.ac.id	Pendidikan Dokter
882	DJUNG LILYA WATI	0308118402	$2b$10$xBg7U9rRRKvRnIeEOyHo5eVxTqqW9/tOzEVQoTYDIx/2dae5iNSc6	0259	djungw@fk.untar.ac.id	Pendidikan Dokter
889	LAMHOT ASNIR LUMBANTOBING	8866980018	$2b$10$jt.fH8MWGQfzmvat3jJZ4uJCPS4gAoiaOgFk3EiukVbJM5k6ncGhW	0266	lamhot@fk.untar.ac.id	Pendidikan Dokter
898	ARLENDS CHRIS	0321037701	$2b$10$g3AiHbdryquhNv14SHbv9.ROhv5kzDez3zaa4TxzBfIXRDdDP1Opi	0275	arlendsc@fk.untar.ac.id	Pendidikan Dokter
906	YOANITA WIDJAJA	0307108302	$2b$10$lBWME/JJFIAp4e1Qhuj4r.Ub2xNxugARkDR/Oq25mocID8xCH6Xz2	0283	yoanitaw@fk.untar.ac.id	Pendidikan Dokter
911	KUMALA DEWI DARMAWI	0308056101	$2b$10$zXaic4ETpVM4Ax8oBmSZyuyydoT55POtzRQW36F6epdG5IMJz0J9C	0288	kumalad@fk.untar.ac.id	Pendidikan Dokter
926	DORNA YANTI LOLA SILABAN	8974100020	$2b$10$uiMGEnKhjGOVbNpaUKUEhel9zpRWAgWGPu1tLwJXj6b.tXSQmQ/ri	0303	dosen302@untar.ac.id	Pendidikan Dokter
931	PRIYENDISWARA AGUSTINA	0313086001	$2b$10$H/nnv3TUhknoKOZ64HFoc.EXmB/r5fIhdQV0dlPzl7hEfaZeJDXyO	0308	priyendiswaraa@ft.untar.ac.id	Perencanaan Wilayah Dan Kota
937	DIPO YUDHTAMA	8824033420	$2b$10$3aRXp7epS20zKQ2tzZqx2u27gSuOXJ2qcVT6FeOiPWioJdJ9NcS5i	0314	dipoy@ft.untar.ac.id	Perencanaan Wilayah Dan Kota
943	LINDA WATI	0323038202	$2b$10$Jkm0aEa/oOU9MQKO3SHYU.nXBEwD7TXgLwH0AIwm0/b8H0lJmGDie	0320	lindaw@fpsi.untar.ac.id	Psikologi
940	ROSLINA VERAULI	8840190018	$2b$10$xADu4Ykq7rHDCt8.Sd9cRuY9ovCKXuoYmrMufIXUU7HH9Tl1r5uFO	0317	roslinav@fpsi.untar.ac.id	Psikologi
968	BAGUS MULYAWAN	0313106201	$2b$10$2PaAorvJR6IZjjzOy9zC0eWZuUSphSNDca2YAjV8CXNC70v06Ks.K	0345	bagusm@fti.untar.ac.id	Sistem Informasi
987	WILSON KOSASIH	0302128201	$2b$10$D/oFCz6mtRcwCkjHGYplCeA/ZtyrG/s7zwmLJw.F/YlitwecQPTWa	0364	wilsonk@ft.untar.ac.id	Teknik Industri
978	MOHAMMAD AGUNG SARYATMO	0310108006	$2b$10$H3yCKPsX5BH1x00ykBzu6e.1qBxYC5XwxSdKf5MNnSua49B7Ak/La	0355	mohammads@ft.untar.ac.id	Teknik Industri
999	STEVEN DARMAWAN	0324108702	$2b$10$6t6OPB1YoiZCaBIhZDWLaOztJDHxp4bsKzkLfelfPkN.Ikro0yPd.	0376	stevend@ft.untar.ac.id	Teknik Mesin
1008	R BASUKI ANONDHO	8858923420	$2b$10$Dg5mJpOQypUlLRC23yIxWOHsMAIkhhEyWQJrFbkMdk2AU6e7sSAfy	0385	basukia@ft.untar.ac.id	Teknik Sipil
1019	YENNY UNTARI LIUCIUS	0331089402	$2b$10$mta8dMcKBnQWQklvAy/VGeOh8KleWUd200uj6vdFcEyTPh1jsZqIy	0396	yenny@ft.untar.ac.id	Teknik Sipil
1031	AGUSTINUS SUTANTO	0310086802	$2b$10$76ZrvRHT0Qt/Y4CnMvP/t.FD2.qY10tgLVoPUuKTKNe9nR9yxKZ8a	0408	agustinuss@ft.untar.ac.id	Arsitektur
1038	IDA KURNIA	0320106101	$2b$10$zxykn1CspRu1NlH4bA0gnuNW1C5mP86LM/804jyGOcOHDBWNUZTfy	0415	dosen414@untar.ac.id	Ilmu Hukum
1041	HERY FIRMANSYAH	0018018403	$2b$10$/Ae8Z/hiLwyXfxYCMlAJDOIwt2WrGLzCNRxSE3qrVsp.t05QL/Ahi	0418	heryf@fh.untar.ac.id	Ilmu Hukum
1053	MIHARNI TJOKROSAPUTRO	0308086802	$2b$10$SlCPnTh64j5NYMzq3b4j/.SrCgQv.Mn7kM5ghUBoamZpB5uLKsEsG	0430	miharnit@fe.untar.ac.id	Manajemen
1061	RITA PADAWANGI	0319017907	$2b$10$jtYl3kFzLYN3/rH9lVc/..dwSzV3lQBLrkFE8smcgdc19mtydtgHW	0438	ritap@pps.untar.ac.id	Perencanaan Wilayah Dan Kota
1068	FRANSISCA IRIANI ROESMALA DEWI	0307046206	$2b$10$5ZFCArBjeRd7Ctn4rsDPsO9A9VlnO1wE4V0Kgt.sEi3AHkaYRG24K	0445	dosen444@untar.ac.id	Psikologi
1080	ONNYXIFORUS GONDOKUSUMO	0320116401	$2b$10$gGVJXuRi0.bsyxVp7B8eEueYYYevgDtv.QKwPCBTD19j/yihxvtwS	0457	onnyxiforusg@ft.untar.ac.id	Teknik Sipil
1075	EDIASRI T ATMODIWIRJO	8847980018	$2b$10$UJu5Hbi4gl6N/Frir0CFp.1HKIfB1oLqyZR0KYgyqZ2ol7HjP5oSm	0452	ediasria@fpsi.untar.ac.id	Psikologi Profesi
992	MANATAP DOLOK LAURO	8818650017	$2b$10$jMAQ2I8X9NclzU10PLYoWuORLAc1lCy7DQfSEi9hLvkapb798ZYLK	0369	manataps@fti.untar.ac.id	Teknik Informatika
\.


--
-- Data for Name: mahasiswa; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.mahasiswa (id, nama_mahasiswa, nomor_induk_mahasiswa) FROM stdin;
66	Afina Putri	825200049
65	Eric Anthony	825200050
81	mahasiswa 1	MHS-0001
82	mahasiswa 2	MHS-0002
83	mahasiswa 3	MHS-0003
85	mahasiswa 5	MHS-0005
86	mahasiswa 6	MHS-0006
87	mahasiswa 7	MHS-0007
88	mahasiswa 8	MHS-0008
89	mahasiswa 9	MHS-0009
90	mahasiswa 10	MHS-0010
91	mahasiswa 11	MHS-0011
92	mahasiswa baru	MHS-1313
93	mahasiswa baru 2	MHS-1212
84	mahasiswa 100	MHS-0004
\.


--
-- Data for Name: master_kategori_penelitian; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.master_kategori_penelitian (id, nama) FROM stdin;
1	Internal
2	External
\.


--
-- Data for Name: master_subkategori_penelitian; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.master_subkategori_penelitian (id, id_master_kategori_penelitian, nama) FROM stdin;
1	1	subkategori kategori - 1
3	1	Subkategori 6
7	1	subkategori baru
8	2	subkategori external baru
9	2	kategori baru yang diubah
4	2	subkategori penelitian baru yang diubah lagi
\.


--
-- Data for Name: master_tipe_penelitian_dokumen; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.master_tipe_penelitian_dokumen (id, nama) FROM stdin;
3	file_monev
1	file_proposal
2	surat_perjanjian_kerjasama
4	file_laporan_kemajuan
5	file_laporan_akhir
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.notification (id, message, dosen_id, penelitian_id, created_at, read_dosen, read_admin) FROM stdin;
1	Jangan lupa untuk mengupdate penelitian "Pengembangan Model Business Intelligence untuk Evaluasi Kinerja Perguruan Tinggi"	968	56	2024-06-27 04:29:41.566441	f	t
\.


--
-- Data for Name: penelitian; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.penelitian (id, nama_proposal, biaya_yang_disetujui, periode_awal, created_at, id_subkategori_penelitian, periode_akhir, status, status_updated_at, ketua_dosen_penelitian, biaya_yang_diajukan, updated_at) FROM stdin;
56	Pengembangan Model Business Intelligence untuk Evaluasi Kinerja Perguruan Tinggi	115096000	2022-02-01	2024-05-07 19:12:34.57821	4	2022-06-01	Disetujui	2024-05-31 01:55:20.819762	968	115096000	2024-05-31 01:55:20.819762
46	Pembuatan Game Adventure “Detective Adventure”Menggunakan Unity Virtual Reality	8000000	2020-02-01	2024-05-02 01:54:59.400772	1	2020-06-01	Selesai	2024-05-06 16:54:40.036002	997	10000000	2024-05-06 16:54:40.036002
60	Test Penelitian	133860000	2022-02-01	2024-05-17 14:28:34.356202	4	2022-06-01	Selesai	2024-05-31 01:55:58.833005	968	133860000	2024-05-31 01:55:58.833005
58	Aplikasi Penyelesaian Numerik Pencarian Akar Persamaan Non Linier Dan Penerapannya Dalam Menyelesaikan Analisis Break Even	6500000	2023-02-01	2024-05-07 19:12:34.587533	3	2023-06-01	Selesai	2024-05-31 01:56:48.181972	968	6500000	2024-05-31 01:56:48.181972
47	Perancangan Dashboard Untuk Monitor Jumlah Mahasiswa Fakultas Teknologi Informasi Universitas Tarumanagara	6000000	2019-02-01	2024-05-06 17:23:50.805568	1	2019-06-01	Disetujui	2024-06-26 19:46:02.681288	961	6000000	2024-06-26 19:46:02.681288
59	Impelementasi Educational Data Mining Untuk Evaluasi Kinerja Perguruan Tinggi: Sebuah Studi Pendahuluan	9000000	2022-02-01	2024-05-07 19:12:34.589543	3	2022-06-01	Disetujui	2024-05-31 01:57:19.420022	968	9000000	2024-05-31 01:57:19.420022
45	Sistem Pendeteksian Dan Pengenalan Ekspresi Wajah Dengan Algoritma Yolo Dan Convolutional Neural Network	10500000	2020-02-01	2024-05-02 01:53:45.115044	1	2020-06-01	Disetujui	2024-05-02 01:53:45.115044	995	11000000	\N
64	Proposal Jurnal Ilmiah 1	10500000	2024-02-01	2024-06-02 23:30:00.208514	7	2024-06-01	Selesai	2024-06-02 23:30:00.208514	961	30000000	\N
62	Proposal Jurnal Ilmiah Baru UAT	2000000	2024-02-01	2024-05-17 15:49:49.656198	1	2024-06-01	Batal	2024-05-17 15:54:34.648395	995	10000000	2024-05-17 15:54:01.23648
57	Pengembangan Educational Data Warehouse Architecture Berbasis Business Intelligence Technology	24000000	2022-08-01	2024-05-07 19:12:34.582463	1	2023-01-01	Selesai	2024-05-29 12:10:10.03867	968	24000000	2024-05-29 12:10:10.03867
66	Segmentasi Area Sel Darah Putih Secara Otomatis Melalui Citra Preparat Tanpa Pewarnaan.	133860000	2021-02-01	2024-06-02 23:39:11.260332	4	2021-06-01	Draft	2024-06-02 23:39:11.260332	989	133860000	\N
50	Segmentasi Area Sel Darah Putih Secara Otomatis Melalui Citra Preparat Tanpa Pewarnaan.	133860000	2021-02-01	2024-05-07 17:37:58.192715	4	2021-06-01	Batal	2024-06-03 01:07:39.179267	989	133860000	2024-06-03 01:07:18.414838
63	test	5000000	2023-08-01	2024-05-31 00:38:51.612318	4	2024-01-01	Batal	2024-06-10 19:03:09.231375	968	7000000	2024-05-31 03:01:44.375467
61	Test proposal 2 file	10500000	2023-02-01	2024-05-17 14:29:18.611883	3	2023-06-01	Disetujui	2024-05-31 01:43:40.455976	968	7000000	2024-05-31 01:43:40.455976
44	Pengenalan Karakter LED pada Alat Ukur Grip Analyzer menggunakan Connected Component Labeling dan KNN.	29950000	2019-02-01	2024-05-02 01:30:01.083551	1	2019-06-01	Disetujui	2024-06-26 19:44:39.620156	989	30000000	2024-06-26 19:44:39.620156
\.


--
-- Data for Name: session_table; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.session_table (sid, sess, expired) FROM stdin;
W5Iah7xsnlVt9GPJZUvXo2cl8yycnE7X	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T03:57:55.677Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 10:57:55.677+07
2VoA7dDL8T54QLDMYHK3K-WF4fytEics	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-06-30T05:26:27.388Z","secure":false,"httpOnly":true,"path":"/"}}	2024-06-30 12:26:27.388+07
ezndUa1Z65M0hN76nL_PxgepRMzzbd-t	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T03:57:55.680Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 10:57:55.68+07
kk6jsfLCgehoBA1JhAuLomTv_g-fXtty	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-10T12:03:58.873Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-10 19:03:58.873+07
aoterOmpJo12qB8TUqU0R1ULlGE3VOKM	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:21:09.425Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:21:09.425+07
1gMKvAD_ohrYIlflY1rNaBVxewf-G2u1	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:22:38.245Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:22:38.245+07
j3sBRP2-p3cJ9yzs82Fc-Era1J-U-vDf	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-10T12:03:58.876Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-10 19:03:58.876+07
h-XjJ0CpQwPA1Dxj4Y_T2w6JRhlj4koH	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:22:38.248Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:22:38.276+07
pXYu7wFhJFSrb-AGiR50Bcj5nsFj5zuO	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:22:38.245Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:22:38.269+07
qM8p_2gYdu4Gvpy-eUgzDwj_YwqBzKEu	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:22:38.248Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:22:38.269+07
zsRiSttOnf6nGhhgtpqm1WNBRF2yXY9r	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-10T12:03:58.874Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-10 19:03:58.908+07
Ia5pCkmczl3VsE8rYWndpbxR0Zfb0ZaG	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-06-30T05:26:27.391Z","secure":false,"httpOnly":true,"path":"/"}}	2024-06-30 12:26:27.405+07
mXga4Uj_5U3yHyYKHChDUXDzjIbIbUSm	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-06-30T05:26:27.392Z","secure":false,"httpOnly":true,"path":"/"}}	2024-06-30 12:26:27.407+07
WMb3SjB-F9JS8I9aIIaRsCUNlGuBlR0E	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-06-30T05:26:27.395Z","secure":false,"httpOnly":true,"path":"/"}}	2024-06-30 12:26:27.412+07
cOXaNAJc5nrse81O9CnYwWavSLcgzEh0	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-06-30T05:26:27.394Z","secure":false,"httpOnly":true,"path":"/"}}	2024-06-30 12:26:27.413+07
BK_4fmstIE92WcP8PA8ULB9rcB_tOgTX	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T13:46:54.830Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"2","username":"admin","role":"admin","admin_role":"admin"}}	2024-07-27 11:54:26.329+07
W7TGXIgmdPVXuwiyxjOnlQXPhiEkQmW6	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T16:49:54.938Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-02 23:49:54.938+07
HwGNXD0WHoBRMImUf7fqEOThN5A7VPrs	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T16:49:54.938Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-02 23:49:54.938+07
Tpud1i2lJnBwEmMcSOfvbmnovydFfEF1	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T16:49:54.940Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-02 23:49:54.94+07
zGiNdQvxLVPxoa-zelxsHvkinxyeFybM	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T13:46:11.581Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 20:46:11.581+07
OqSUTmVs8EpmP2Zlgiq_5xHSmM3Q8473	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T13:46:11.584Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 20:46:11.584+07
QlJSn7Sl-Qmh-bu4ciCXyZoLacqxzvGg	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T13:46:11.589Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 20:46:11.604+07
TRdQ_5aV_O7GiVcNXK_En2Z5Ws2XilGb	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T13:46:11.583Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 20:46:11.601+07
5LEkW1YwsH6eJBM-eUxOOOoW0ZQ9PGcZ	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T13:46:11.582Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 20:46:11.582+07
FL_hGH6-f4BNJaBlKI1nYZFQr_SRt8t_	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-06-30T05:26:27.392Z","secure":false,"httpOnly":true,"path":"/"}}	2024-06-30 12:26:27.412+07
pwsOEZ6DQhgiyPYcT7ng4Uglv092p-Ll	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:21:09.434Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:21:09.434+07
pjm4fGS6phr-3I8lfA6jUq0MMWdXiNJI	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T16:49:54.937Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-02 23:49:54.948+07
feZhgs69UVgNMCsGrv4rdE3Pz4U3jlCU	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T16:49:54.941Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-02 23:49:54.956+07
V0UzGZx56KERqGtklGqWvjS3PTHOxkzC	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:21:09.427Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:21:09.436+07
14Ywvmxc_ShT71sqkl30-PASOlFwDYiv	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:21:09.427Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:21:09.439+07
BZDJDeqw2zyZm3ATTVE2sLbIDVhpYqBQ	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:22:38.246Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:22:38.271+07
z_kKoMuDDbGmlW_fiuYTvzVRpCdyMi2H	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T04:12:26.138Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"2","username":"admin","role":"admin","admin_role":"admin"}}	2024-07-26 11:23:37.094+07
oYoYsuR-1oH6rQtj9Pnw3Wyz3KusUTUC	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:22:38.254Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:22:38.292+07
a9NTGYHc7ghlh6RlSBTgD_eQ0a3IA9nO	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T03:57:55.687Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 10:57:55.687+07
Ivp5vCIIXX9kHNMy0lLV1EoAiEQUg-GZ	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T03:57:55.677Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 10:57:55.687+07
2zXizGs-5ziV2EsD5PTC_jUpireCd9H1	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-10T12:03:58.872Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-10 19:03:58.872+07
Tbqcs1cAQK_hbuwfBpGVpXNQWa3CaJni	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-10T12:03:58.875Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-10 19:03:58.918+07
1QQpswj2vwk4Z9t6yotfyUmWNOGtXjiK	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T13:46:11.579Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 20:46:11.579+07
Q82zlqge3pwCfHj4-P5I7u2Dc2I7K3m0	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-10T12:03:58.872Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-10 19:03:58.904+07
Qw3bKJb90w9rb1TeLS-SBMA8cq9Q0uiS	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T13:46:11.600Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 20:46:11.6+07
3DdrW9Ge9jF_bIJ2Kfd0EeLv_rkRo5M_	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T03:57:55.678Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 10:57:55.69+07
heQmwzVqH6DI5msfx79VyH04p7OtaKXO	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T03:57:55.682Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 10:57:55.693+07
oTL-ENd1ngdeXRFHuOhSumYxd8D9wpBi	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T16:49:54.940Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-02 23:49:54.951+07
4lKJuSS_8TibXwRl9ZXMVlWLYThhDU_Z	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T13:46:11.594Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 20:46:11.62+07
wVIhsRq4iv3dHylv3v4weGXy5sAlJdVf	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-26T13:46:11.600Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-26 20:46:11.644+07
mWIjE-aBi7cL83omMXTU37gxIwuhaKSE	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:21:09.425Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:21:09.425+07
kAagbrRw1ODdTX9ZaR6YszH94eUVU0QF	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-07-02T18:21:09.427Z","secure":false,"httpOnly":true,"path":"/"}}	2024-07-03 01:21:09.439+07
\.


--
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.admin_id_seq', 6, true);


--
-- Name: dosen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.dosen_id_seq', 1105, true);


--
-- Name: mahasiswa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.mahasiswa_id_seq', 94, true);


--
-- Name: master_kategori_proposal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.master_kategori_proposal_id_seq', 9, true);


--
-- Name: master_proposal_dokumen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.master_proposal_dokumen_id_seq', 5, true);


--
-- Name: master_subkategori_proposal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.master_subkategori_proposal_id_seq', 9, true);


--
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.notification_id_seq', 1, true);


--
-- Name: proposal_anggota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.proposal_anggota_id_seq', 292, true);


--
-- Name: proposal_dokumen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.proposal_dokumen_id_seq', 98, true);


--
-- Name: proposal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.proposal_id_seq', 66, true);


--
-- Name: anggota_penelitian anggota_penelitian_pk; Type: CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.anggota_penelitian
    ADD CONSTRAINT anggota_penelitian_pk PRIMARY KEY (id);


--
-- Name: dokumen_penelitian dokumen_penelitian_pk; Type: CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.dokumen_penelitian
    ADD CONSTRAINT dokumen_penelitian_pk PRIMARY KEY (id);


--
-- Name: dosen dosen_pk; Type: CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.dosen
    ADD CONSTRAINT dosen_pk PRIMARY KEY (id);


--
-- Name: mahasiswa mahasiswa_pk; Type: CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.mahasiswa
    ADD CONSTRAINT mahasiswa_pk PRIMARY KEY (id);


--
-- Name: master_kategori_penelitian master_kategori_penelitian_pk; Type: CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.master_kategori_penelitian
    ADD CONSTRAINT master_kategori_penelitian_pk PRIMARY KEY (id);


--
-- Name: master_subkategori_penelitian master_subkategori_penelitian_pk; Type: CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.master_subkategori_penelitian
    ADD CONSTRAINT master_subkategori_penelitian_pk PRIMARY KEY (id);


--
-- Name: master_tipe_penelitian_dokumen master_tipe_penelitian_dokumen_pk; Type: CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.master_tipe_penelitian_dokumen
    ADD CONSTRAINT master_tipe_penelitian_dokumen_pk PRIMARY KEY (id);


--
-- Name: notification notification_pk; Type: CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pk PRIMARY KEY (id);


--
-- Name: penelitian penelitian_pk; Type: CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.penelitian
    ADD CONSTRAINT penelitian_pk PRIMARY KEY (id);


--
-- Name: session_table session_table_pkey; Type: CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.session_table
    ADD CONSTRAINT session_table_pkey PRIMARY KEY (sid);


--
-- Name: dokumen_penelitian_file_uindex; Type: INDEX; Schema: public; Owner: ericanthony
--

CREATE UNIQUE INDEX dokumen_penelitian_file_uindex ON public.dokumen_penelitian USING btree (file);


--
-- Name: dosen_email_uindex; Type: INDEX; Schema: public; Owner: ericanthony
--

CREATE UNIQUE INDEX dosen_email_uindex ON public.dosen USING btree (email);


--
-- Name: dosen_nomor_induk_dosen_nasional_uindex; Type: INDEX; Schema: public; Owner: ericanthony
--

CREATE UNIQUE INDEX dosen_nomor_induk_dosen_nasional_uindex ON public.dosen USING btree (nomor_induk_dosen_nasional);


--
-- Name: dosen_nomor_induk_pegawai_uindex; Type: INDEX; Schema: public; Owner: ericanthony
--

CREATE UNIQUE INDEX dosen_nomor_induk_pegawai_uindex ON public.dosen USING btree (nomor_induk_pegawai);


--
-- Name: mahasiswa_nomor_induk_mahasiswa_uindex; Type: INDEX; Schema: public; Owner: ericanthony
--

CREATE UNIQUE INDEX mahasiswa_nomor_induk_mahasiswa_uindex ON public.mahasiswa USING btree (nomor_induk_mahasiswa);


--
-- Name: session_table_expired_index; Type: INDEX; Schema: public; Owner: ericanthony
--

CREATE INDEX session_table_expired_index ON public.session_table USING btree (expired);


--
-- Name: anggota_penelitian anggota_penelitian_dosen_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.anggota_penelitian
    ADD CONSTRAINT anggota_penelitian_dosen_id_fk FOREIGN KEY (id_dosen) REFERENCES public.dosen(id) ON DELETE CASCADE;


--
-- Name: anggota_penelitian anggota_penelitian_mahasiswa_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.anggota_penelitian
    ADD CONSTRAINT anggota_penelitian_mahasiswa_id_fk FOREIGN KEY (id_mahasiswa) REFERENCES public.mahasiswa(id) ON DELETE CASCADE;


--
-- Name: master_subkategori_penelitian master_subkategori_penelitian_master_kategori_penelitian_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.master_subkategori_penelitian
    ADD CONSTRAINT master_subkategori_penelitian_master_kategori_penelitian_id_fk FOREIGN KEY (id_master_kategori_penelitian) REFERENCES public.master_kategori_penelitian(id) ON DELETE CASCADE;


--
-- Name: notification notification_dosen_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_dosen_id_fk FOREIGN KEY (dosen_id) REFERENCES public.dosen(id) ON DELETE CASCADE;


--
-- Name: notification notification_penelitian_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_penelitian_id_fk FOREIGN KEY (penelitian_id) REFERENCES public.penelitian(id) ON DELETE CASCADE;


--
-- Name: penelitian penelitian_dosen_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.penelitian
    ADD CONSTRAINT penelitian_dosen_id_fk FOREIGN KEY (ketua_dosen_penelitian) REFERENCES public.dosen(id);


--
-- Name: penelitian penelitian_master_subkategori_penelitian_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.penelitian
    ADD CONSTRAINT penelitian_master_subkategori_penelitian_id_fk FOREIGN KEY (id_subkategori_penelitian) REFERENCES public.master_subkategori_penelitian(id);


--
-- Name: anggota_penelitian proposal_anggota_proposal_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.anggota_penelitian
    ADD CONSTRAINT proposal_anggota_proposal_id_fk FOREIGN KEY (id_penelitian) REFERENCES public.penelitian(id) ON DELETE CASCADE;


--
-- Name: dokumen_penelitian proposal_dokumen_master_proposal_dokumen_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.dokumen_penelitian
    ADD CONSTRAINT proposal_dokumen_master_proposal_dokumen_id_fk FOREIGN KEY (tipe_dokumen) REFERENCES public.master_tipe_penelitian_dokumen(id);


--
-- Name: dokumen_penelitian proposal_dokumen_proposal_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.dokumen_penelitian
    ADD CONSTRAINT proposal_dokumen_proposal_id_fk FOREIGN KEY (id_penelitian) REFERENCES public.penelitian(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

