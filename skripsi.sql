toc.dat                                                                                             0000600 0004000 0002000 00000066662 14613764550 0014472 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       "    '                |            skripsi    14.11 (Homebrew)    14.11 (Homebrew) Y    x           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         y           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         z           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         {           1262    16386    skripsi    DATABASE     R   CREATE DATABASE skripsi WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE skripsi;
                ericanthony    false         �            1259    16406    admin    TABLE     �   CREATE TABLE public.admin (
    id bigint NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'admin'::character varying NOT NULL
);
    DROP TABLE public.admin;
       public         heap    ericanthony    false         |           0    0    COLUMN admin.role    COMMENT     8   COMMENT ON COLUMN public.admin.role IS 'admin, viewer';
          public          ericanthony    false    214         �            1259    16405    admin_id_seq    SEQUENCE     u   CREATE SEQUENCE public.admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.admin_id_seq;
       public          ericanthony    false    214         }           0    0    admin_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;
          public          ericanthony    false    213         �            1259    16465    anggota_penelitian    TABLE     �   CREATE TABLE public.anggota_penelitian (
    id bigint NOT NULL,
    id_penelitian bigint NOT NULL,
    id_dosen bigint,
    id_mahasiswa bigint
);
 &   DROP TABLE public.anggota_penelitian;
       public         heap    ericanthony    false         �            1259    16451    dokumen_penelitian    TABLE     Q  CREATE TABLE public.dokumen_penelitian (
    id bigint NOT NULL,
    id_penelitian bigint NOT NULL,
    tipe_dokumen bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone,
    file character varying NOT NULL,
    original_filename character varying NOT NULL
);
 &   DROP TABLE public.dokumen_penelitian;
       public         heap    ericanthony    false         �            1259    16388    dosen    TABLE       CREATE TABLE public.dosen (
    id bigint NOT NULL,
    nama_dosen character varying NOT NULL,
    nomor_induk_dosen_nasional character varying NOT NULL,
    password character varying NOT NULL,
    nomor_induk_pegawai character varying,
    email character varying
);
    DROP TABLE public.dosen;
       public         heap    ericanthony    false         ~           0    0 '   COLUMN dosen.nomor_induk_dosen_nasional    COMMENT     E   COMMENT ON COLUMN public.dosen.nomor_induk_dosen_nasional IS 'nisn';
          public          ericanthony    false    210         �            1259    16387    dosen_id_seq    SEQUENCE     u   CREATE SEQUENCE public.dosen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.dosen_id_seq;
       public          ericanthony    false    210                    0    0    dosen_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.dosen_id_seq OWNED BY public.dosen.id;
          public          ericanthony    false    209         �            1259    16397 	   mahasiswa    TABLE     �   CREATE TABLE public.mahasiswa (
    id bigint NOT NULL,
    nama_mahasiswa character varying NOT NULL,
    nomor_induk_mahasiswa character varying
);
    DROP TABLE public.mahasiswa;
       public         heap    ericanthony    false         �            1259    16396    mahasiswa_id_seq    SEQUENCE     y   CREATE SEQUENCE public.mahasiswa_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.mahasiswa_id_seq;
       public          ericanthony    false    212         �           0    0    mahasiswa_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.mahasiswa_id_seq OWNED BY public.mahasiswa.id;
          public          ericanthony    false    211         �            1259    16419    master_kategori_penelitian    TABLE     p   CREATE TABLE public.master_kategori_penelitian (
    id bigint NOT NULL,
    nama character varying NOT NULL
);
 .   DROP TABLE public.master_kategori_penelitian;
       public         heap    ericanthony    false         �           0    0     TABLE master_kategori_penelitian    COMMENT     [   COMMENT ON TABLE public.master_kategori_penelitian IS 'internal, national, international';
          public          ericanthony    false    216         �            1259    16418    master_kategori_proposal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.master_kategori_proposal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.master_kategori_proposal_id_seq;
       public          ericanthony    false    216         �           0    0    master_kategori_proposal_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.master_kategori_proposal_id_seq OWNED BY public.master_kategori_penelitian.id;
          public          ericanthony    false    215         �            1259    16488    master_tipe_penelitian_dokumen    TABLE     t   CREATE TABLE public.master_tipe_penelitian_dokumen (
    id bigint NOT NULL,
    nama character varying NOT NULL
);
 2   DROP TABLE public.master_tipe_penelitian_dokumen;
       public         heap    ericanthony    false         �           0    0 *   COLUMN master_tipe_penelitian_dokumen.nama    COMMENT     �   COMMENT ON COLUMN public.master_tipe_penelitian_dokumen.nama IS 'proposal, dokumen evaluasi, laporan akhir, luaran (paper), spk, hki';
          public          ericanthony    false    226         �            1259    16487    master_proposal_dokumen_id_seq    SEQUENCE     �   CREATE SEQUENCE public.master_proposal_dokumen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.master_proposal_dokumen_id_seq;
       public          ericanthony    false    226         �           0    0    master_proposal_dokumen_id_seq    SEQUENCE OWNED BY     h   ALTER SEQUENCE public.master_proposal_dokumen_id_seq OWNED BY public.master_tipe_penelitian_dokumen.id;
          public          ericanthony    false    225         �            1259    16428    master_subkategori_penelitian    TABLE     �   CREATE TABLE public.master_subkategori_penelitian (
    id bigint NOT NULL,
    id_master_kategori_penelitian bigint NOT NULL,
    nama character varying NOT NULL
);
 1   DROP TABLE public.master_subkategori_penelitian;
       public         heap    ericanthony    false         �            1259    16427 "   master_subkategori_proposal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.master_subkategori_proposal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.master_subkategori_proposal_id_seq;
       public          ericanthony    false    218         �           0    0 "   master_subkategori_proposal_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.master_subkategori_proposal_id_seq OWNED BY public.master_subkategori_penelitian.id;
          public          ericanthony    false    217         �            1259    16442 
   penelitian    TABLE     C  CREATE TABLE public.penelitian (
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
    biaya_yang_diajukan integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.penelitian;
       public         heap    ericanthony    false         �           0    0    COLUMN penelitian.status    COMMENT     R   COMMENT ON COLUMN public.penelitian.status IS 'sedang berlanjut, selesai, batal';
          public          ericanthony    false    220         �            1259    16464    proposal_anggota_id_seq    SEQUENCE     �   CREATE SEQUENCE public.proposal_anggota_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.proposal_anggota_id_seq;
       public          ericanthony    false    224         �           0    0    proposal_anggota_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.proposal_anggota_id_seq OWNED BY public.anggota_penelitian.id;
          public          ericanthony    false    223         �            1259    16450    proposal_dokumen_id_seq    SEQUENCE     �   CREATE SEQUENCE public.proposal_dokumen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.proposal_dokumen_id_seq;
       public          ericanthony    false    222         �           0    0    proposal_dokumen_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.proposal_dokumen_id_seq OWNED BY public.dokumen_penelitian.id;
          public          ericanthony    false    221         �            1259    16441    proposal_id_seq    SEQUENCE     x   CREATE SEQUENCE public.proposal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.proposal_id_seq;
       public          ericanthony    false    220         �           0    0    proposal_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.proposal_id_seq OWNED BY public.penelitian.id;
          public          ericanthony    false    219         �            1259    16540    session_table    TABLE     �   CREATE TABLE public.session_table (
    sid character varying(255) NOT NULL,
    sess json NOT NULL,
    expired timestamp with time zone NOT NULL
);
 !   DROP TABLE public.session_table;
       public         heap    ericanthony    false         �           2604    16409    admin id    DEFAULT     d   ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);
 7   ALTER TABLE public.admin ALTER COLUMN id DROP DEFAULT;
       public          ericanthony    false    213    214    214         �           2604    16468    anggota_penelitian id    DEFAULT     |   ALTER TABLE ONLY public.anggota_penelitian ALTER COLUMN id SET DEFAULT nextval('public.proposal_anggota_id_seq'::regclass);
 D   ALTER TABLE public.anggota_penelitian ALTER COLUMN id DROP DEFAULT;
       public          ericanthony    false    224    223    224         �           2604    16454    dokumen_penelitian id    DEFAULT     |   ALTER TABLE ONLY public.dokumen_penelitian ALTER COLUMN id SET DEFAULT nextval('public.proposal_dokumen_id_seq'::regclass);
 D   ALTER TABLE public.dokumen_penelitian ALTER COLUMN id DROP DEFAULT;
       public          ericanthony    false    222    221    222         �           2604    16391    dosen id    DEFAULT     d   ALTER TABLE ONLY public.dosen ALTER COLUMN id SET DEFAULT nextval('public.dosen_id_seq'::regclass);
 7   ALTER TABLE public.dosen ALTER COLUMN id DROP DEFAULT;
       public          ericanthony    false    210    209    210         �           2604    16400    mahasiswa id    DEFAULT     l   ALTER TABLE ONLY public.mahasiswa ALTER COLUMN id SET DEFAULT nextval('public.mahasiswa_id_seq'::regclass);
 ;   ALTER TABLE public.mahasiswa ALTER COLUMN id DROP DEFAULT;
       public          ericanthony    false    211    212    212         �           2604    16422    master_kategori_penelitian id    DEFAULT     �   ALTER TABLE ONLY public.master_kategori_penelitian ALTER COLUMN id SET DEFAULT nextval('public.master_kategori_proposal_id_seq'::regclass);
 L   ALTER TABLE public.master_kategori_penelitian ALTER COLUMN id DROP DEFAULT;
       public          ericanthony    false    216    215    216         �           2604    16431     master_subkategori_penelitian id    DEFAULT     �   ALTER TABLE ONLY public.master_subkategori_penelitian ALTER COLUMN id SET DEFAULT nextval('public.master_subkategori_proposal_id_seq'::regclass);
 O   ALTER TABLE public.master_subkategori_penelitian ALTER COLUMN id DROP DEFAULT;
       public          ericanthony    false    218    217    218         �           2604    16491 !   master_tipe_penelitian_dokumen id    DEFAULT     �   ALTER TABLE ONLY public.master_tipe_penelitian_dokumen ALTER COLUMN id SET DEFAULT nextval('public.master_proposal_dokumen_id_seq'::regclass);
 P   ALTER TABLE public.master_tipe_penelitian_dokumen ALTER COLUMN id DROP DEFAULT;
       public          ericanthony    false    226    225    226         �           2604    16445    penelitian id    DEFAULT     l   ALTER TABLE ONLY public.penelitian ALTER COLUMN id SET DEFAULT nextval('public.proposal_id_seq'::regclass);
 <   ALTER TABLE public.penelitian ALTER COLUMN id DROP DEFAULT;
       public          ericanthony    false    220    219    220         h          0    16406    admin 
   TABLE DATA           =   COPY public.admin (id, username, password, role) FROM stdin;
    public          ericanthony    false    214       3688.dat r          0    16465    anggota_penelitian 
   TABLE DATA           W   COPY public.anggota_penelitian (id, id_penelitian, id_dosen, id_mahasiswa) FROM stdin;
    public          ericanthony    false    224       3698.dat p          0    16451    dokumen_penelitian 
   TABLE DATA           ~   COPY public.dokumen_penelitian (id, id_penelitian, tipe_dokumen, created_at, updated_at, file, original_filename) FROM stdin;
    public          ericanthony    false    222       3696.dat d          0    16388    dosen 
   TABLE DATA           q   COPY public.dosen (id, nama_dosen, nomor_induk_dosen_nasional, password, nomor_induk_pegawai, email) FROM stdin;
    public          ericanthony    false    210       3684.dat f          0    16397 	   mahasiswa 
   TABLE DATA           N   COPY public.mahasiswa (id, nama_mahasiswa, nomor_induk_mahasiswa) FROM stdin;
    public          ericanthony    false    212       3686.dat j          0    16419    master_kategori_penelitian 
   TABLE DATA           >   COPY public.master_kategori_penelitian (id, nama) FROM stdin;
    public          ericanthony    false    216       3690.dat l          0    16428    master_subkategori_penelitian 
   TABLE DATA           `   COPY public.master_subkategori_penelitian (id, id_master_kategori_penelitian, nama) FROM stdin;
    public          ericanthony    false    218       3692.dat t          0    16488    master_tipe_penelitian_dokumen 
   TABLE DATA           B   COPY public.master_tipe_penelitian_dokumen (id, nama) FROM stdin;
    public          ericanthony    false    226       3700.dat n          0    16442 
   penelitian 
   TABLE DATA           �   COPY public.penelitian (id, nama_proposal, biaya_yang_disetujui, periode_awal, created_at, id_subkategori_penelitian, periode_akhir, status, status_updated_at, ketua_dosen_penelitian, biaya_yang_diajukan) FROM stdin;
    public          ericanthony    false    220       3694.dat u          0    16540    session_table 
   TABLE DATA           ;   COPY public.session_table (sid, sess, expired) FROM stdin;
    public          ericanthony    false    227       3701.dat �           0    0    admin_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.admin_id_seq', 4, true);
          public          ericanthony    false    213         �           0    0    dosen_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.dosen_id_seq', 145, true);
          public          ericanthony    false    209         �           0    0    mahasiswa_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.mahasiswa_id_seq', 64, true);
          public          ericanthony    false    211         �           0    0    master_kategori_proposal_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.master_kategori_proposal_id_seq', 7, true);
          public          ericanthony    false    215         �           0    0    master_proposal_dokumen_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.master_proposal_dokumen_id_seq', 4, true);
          public          ericanthony    false    225         �           0    0 "   master_subkategori_proposal_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.master_subkategori_proposal_id_seq', 6, true);
          public          ericanthony    false    217         �           0    0    proposal_anggota_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.proposal_anggota_id_seq', 134, true);
          public          ericanthony    false    223         �           0    0    proposal_dokumen_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.proposal_dokumen_id_seq', 50, true);
          public          ericanthony    false    221         �           0    0    proposal_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.proposal_id_seq', 43, true);
          public          ericanthony    false    219         �           2606    16470 (   anggota_penelitian anggota_penelitian_pk 
   CONSTRAINT     f   ALTER TABLE ONLY public.anggota_penelitian
    ADD CONSTRAINT anggota_penelitian_pk PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.anggota_penelitian DROP CONSTRAINT anggota_penelitian_pk;
       public            ericanthony    false    224         �           2606    16458 (   dokumen_penelitian dokumen_penelitian_pk 
   CONSTRAINT     f   ALTER TABLE ONLY public.dokumen_penelitian
    ADD CONSTRAINT dokumen_penelitian_pk PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.dokumen_penelitian DROP CONSTRAINT dokumen_penelitian_pk;
       public            ericanthony    false    222         �           2606    16395    dosen dosen_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public.dosen
    ADD CONSTRAINT dosen_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.dosen DROP CONSTRAINT dosen_pk;
       public            ericanthony    false    210         �           2606    16404    mahasiswa mahasiswa_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.mahasiswa
    ADD CONSTRAINT mahasiswa_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.mahasiswa DROP CONSTRAINT mahasiswa_pk;
       public            ericanthony    false    212         �           2606    16426 8   master_kategori_penelitian master_kategori_penelitian_pk 
   CONSTRAINT     v   ALTER TABLE ONLY public.master_kategori_penelitian
    ADD CONSTRAINT master_kategori_penelitian_pk PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.master_kategori_penelitian DROP CONSTRAINT master_kategori_penelitian_pk;
       public            ericanthony    false    216         �           2606    16435 >   master_subkategori_penelitian master_subkategori_penelitian_pk 
   CONSTRAINT     |   ALTER TABLE ONLY public.master_subkategori_penelitian
    ADD CONSTRAINT master_subkategori_penelitian_pk PRIMARY KEY (id);
 h   ALTER TABLE ONLY public.master_subkategori_penelitian DROP CONSTRAINT master_subkategori_penelitian_pk;
       public            ericanthony    false    218         �           2606    16495 @   master_tipe_penelitian_dokumen master_tipe_penelitian_dokumen_pk 
   CONSTRAINT     ~   ALTER TABLE ONLY public.master_tipe_penelitian_dokumen
    ADD CONSTRAINT master_tipe_penelitian_dokumen_pk PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.master_tipe_penelitian_dokumen DROP CONSTRAINT master_tipe_penelitian_dokumen_pk;
       public            ericanthony    false    226         �           2606    16449    penelitian penelitian_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.penelitian
    ADD CONSTRAINT penelitian_pk PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.penelitian DROP CONSTRAINT penelitian_pk;
       public            ericanthony    false    220         �           2606    16546     session_table session_table_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.session_table
    ADD CONSTRAINT session_table_pkey PRIMARY KEY (sid);
 J   ALTER TABLE ONLY public.session_table DROP CONSTRAINT session_table_pkey;
       public            ericanthony    false    227         �           1259    16557    dokumen_penelitian_file_uindex    INDEX     d   CREATE UNIQUE INDEX dokumen_penelitian_file_uindex ON public.dokumen_penelitian USING btree (file);
 2   DROP INDEX public.dokumen_penelitian_file_uindex;
       public            ericanthony    false    222         �           1259    16578    dosen_email_uindex    INDEX     L   CREATE UNIQUE INDEX dosen_email_uindex ON public.dosen USING btree (email);
 &   DROP INDEX public.dosen_email_uindex;
       public            ericanthony    false    210         �           1259    16550 '   dosen_nomor_induk_dosen_nasional_uindex    INDEX     v   CREATE UNIQUE INDEX dosen_nomor_induk_dosen_nasional_uindex ON public.dosen USING btree (nomor_induk_dosen_nasional);
 ;   DROP INDEX public.dosen_nomor_induk_dosen_nasional_uindex;
       public            ericanthony    false    210         �           1259    16579     dosen_nomor_induk_pegawai_uindex    INDEX     h   CREATE UNIQUE INDEX dosen_nomor_induk_pegawai_uindex ON public.dosen USING btree (nomor_induk_pegawai);
 4   DROP INDEX public.dosen_nomor_induk_pegawai_uindex;
       public            ericanthony    false    210         �           1259    16556 &   mahasiswa_nomor_induk_mahasiswa_uindex    INDEX     t   CREATE UNIQUE INDEX mahasiswa_nomor_induk_mahasiswa_uindex ON public.mahasiswa USING btree (nomor_induk_mahasiswa);
 :   DROP INDEX public.mahasiswa_nomor_induk_mahasiswa_uindex;
       public            ericanthony    false    212         �           1259    24808    penelitian_nama_proposal_uindex    INDEX     f   CREATE UNIQUE INDEX penelitian_nama_proposal_uindex ON public.penelitian USING btree (nama_proposal);
 3   DROP INDEX public.penelitian_nama_proposal_uindex;
       public            ericanthony    false    220         �           1259    16547    session_table_expired_index    INDEX     X   CREATE INDEX session_table_expired_index ON public.session_table USING btree (expired);
 /   DROP INDEX public.session_table_expired_index;
       public            ericanthony    false    227         �           2606    24767 1   anggota_penelitian anggota_penelitian_dosen_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.anggota_penelitian
    ADD CONSTRAINT anggota_penelitian_dosen_id_fk FOREIGN KEY (id_dosen) REFERENCES public.dosen(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.anggota_penelitian DROP CONSTRAINT anggota_penelitian_dosen_id_fk;
       public          ericanthony    false    210    3515    224         �           2606    24772 5   anggota_penelitian anggota_penelitian_mahasiswa_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.anggota_penelitian
    ADD CONSTRAINT anggota_penelitian_mahasiswa_id_fk FOREIGN KEY (id_mahasiswa) REFERENCES public.mahasiswa(id) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.anggota_penelitian DROP CONSTRAINT anggota_penelitian_mahasiswa_id_fk;
       public          ericanthony    false    3518    224    212         �           2606    16573 \   master_subkategori_penelitian master_subkategori_penelitian_master_kategori_penelitian_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.master_subkategori_penelitian
    ADD CONSTRAINT master_subkategori_penelitian_master_kategori_penelitian_id_fk FOREIGN KEY (id_master_kategori_penelitian) REFERENCES public.master_kategori_penelitian(id) ON DELETE CASCADE;
 �   ALTER TABLE ONLY public.master_subkategori_penelitian DROP CONSTRAINT master_subkategori_penelitian_master_kategori_penelitian_id_fk;
       public          ericanthony    false    3520    218    216         �           2606    32957 !   penelitian penelitian_dosen_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.penelitian
    ADD CONSTRAINT penelitian_dosen_id_fk FOREIGN KEY (ketua_dosen_penelitian) REFERENCES public.dosen(id);
 K   ALTER TABLE ONLY public.penelitian DROP CONSTRAINT penelitian_dosen_id_fk;
       public          ericanthony    false    3515    210    220         �           2606    16558 9   penelitian penelitian_master_subkategori_penelitian_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.penelitian
    ADD CONSTRAINT penelitian_master_subkategori_penelitian_id_fk FOREIGN KEY (id_subkategori_penelitian) REFERENCES public.master_subkategori_penelitian(id);
 c   ALTER TABLE ONLY public.penelitian DROP CONSTRAINT penelitian_master_subkategori_penelitian_id_fk;
       public          ericanthony    false    220    3522    218         �           2606    16563 2   anggota_penelitian proposal_anggota_proposal_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.anggota_penelitian
    ADD CONSTRAINT proposal_anggota_proposal_id_fk FOREIGN KEY (id_penelitian) REFERENCES public.penelitian(id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.anggota_penelitian DROP CONSTRAINT proposal_anggota_proposal_id_fk;
       public          ericanthony    false    3525    224    220         �           2606    16497 A   dokumen_penelitian proposal_dokumen_master_proposal_dokumen_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.dokumen_penelitian
    ADD CONSTRAINT proposal_dokumen_master_proposal_dokumen_id_fk FOREIGN KEY (tipe_dokumen) REFERENCES public.master_tipe_penelitian_dokumen(id);
 k   ALTER TABLE ONLY public.dokumen_penelitian DROP CONSTRAINT proposal_dokumen_master_proposal_dokumen_id_fk;
       public          ericanthony    false    3532    226    222         �           2606    16568 2   dokumen_penelitian proposal_dokumen_proposal_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.dokumen_penelitian
    ADD CONSTRAINT proposal_dokumen_proposal_id_fk FOREIGN KEY (id_penelitian) REFERENCES public.penelitian(id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.dokumen_penelitian DROP CONSTRAINT proposal_dokumen_proposal_id_fk;
       public          ericanthony    false    220    222    3525                                                                                      3688.dat                                                                                            0000600 0004000 0002000 00000000243 14613764550 0014274 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	admin	$2b$10$w0G8l2KMpgJhLDXApU6NWupJE4bPzdwOAf0eyg/Jy1h1TnVuPKSPG	admin
3	adminviewer1	$2b$10$UHXkQv.SKGnUJjx61XK7WOtEiWhOgGgB52OYXPXDd7spLi/pIO4PO	viewer
\.


                                                                                                                                                                                                                                                                                                                                                             3698.dat                                                                                            0000600 0004000 0002000 00000000327 14613764550 0014300 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        119	36	139	\N
120	36	\N	30
121	37	\N	\N
122	37	\N	\N
123	38	\N	\N
124	38	\N	\N
125	35	\N	\N
126	35	\N	\N
127	39	\N	\N
128	39	\N	\N
129	40	\N	\N
130	40	\N	\N
131	41	\N	\N
132	41	\N	\N
133	43	130	\N
134	43	\N	30
\.


                                                                                                                                                                                                                                                                                                         3696.dat                                                                                            0000600 0004000 0002000 00000003477 14613764550 0014307 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        36	35	1	2024-04-24 22:41:30.787573	\N	/uploads/file_proposal/47763d2c-ee1a-43f9-a025-4bdfaffd22de.pdf	825200050-Eric Anthony.pdf
37	36	1	2024-04-24 22:55:04.40972	\N	/uploads/file_proposal/805e273c-34d4-4f0d-a769-1c72167e610c.pdf	Document1.pdf
38	37	1	2024-04-24 23:47:20.535687	\N	/uploads/file_proposal/b66d4e56-d788-47c4-a71a-add5f1e6036e.docx	Soal Logic.docx
39	38	1	2024-04-24 23:49:37.041909	\N	/uploads/file_proposal/4068b9d1-31c6-464b-843a-bc37dee90a6e.png	Sketch.png
40	38	2	2024-04-24 23:49:37.041909	\N	/uploads/surat_perjanjian_kerjasama/937b2955-a575-41eb-aeac-cec6ed6c836a.png	Sketch.png
41	38	3	2024-04-24 23:49:37.041909	\N	/uploads/file_monef/9e3f9310-8d0f-40fe-9931-388703251c49.png	Sketch.png
42	38	4	2024-04-24 23:49:37.041909	\N	/uploads/file_laporan_akhir/5965c65b-6365-4e52-8512-10969885c45c.png	Screenshot 2024-04-18 at 10.09.57.png
43	39	1	2024-04-25 00:48:40.523948	\N	/uploads/file_proposal/1c7587aa-35b2-4563-a137-a2d7097733fc.png	Sketch.png
44	40	1	2024-04-25 00:49:10.424816	\N	/uploads/file_proposal/b925d5b1-b39b-458a-a94b-9d83bb27609f.docx	Soal Logic.docx
45	41	1	2024-04-25 09:44:54.196494	\N	/uploads/file_proposal/1f56115c-bb44-4305-b5ab-be33f09ad61c.pdf	825200050-Eric Anthony.pdf
46	41	2	2024-04-25 09:44:54.196494	\N	/uploads/surat_perjanjian_kerjasama/6a7b191d-d3d4-481f-bf7a-8cc09591e767.pdf	Document1.pdf
47	41	3	2024-04-25 09:44:54.196494	\N	/uploads/file_monef/586f4273-64ea-4aad-863b-137e2b5a9a4c.png	Sketch.png
48	41	4	2024-04-25 09:44:54.196494	\N	/uploads/file_laporan_akhir/7613e68d-08d9-48c8-ac83-20eb70299332.pdf	Document1.pdf
49	43	1	2024-04-30 01:31:52.339612	\N	/uploads/file_proposal/19a02dbf-5e44-40b6-8aa1-327a51847356.pdf	2465-Article Text-13366-1-10-20231011.pdf
50	43	2	2024-04-30 01:31:52.339612	\N	/uploads/surat_perjanjian_kerjasama/3642fceb-6182-4806-96da-351a8ff3ea45.PDF	10005438.PDF
\.


                                                                                                                                                                                                 3684.dat                                                                                            0000600 0004000 0002000 00000003407 14613764550 0014275 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        131	Dosen 2	DIDN-0002	$2b$10$zKa/YCFoeJWWK78pPH9yH.M7y1mAZEv7Om23lFrbw.2crHtv41NoW	NIP-0002	dosen2@stu.untar.ac.id
132	Dosen 3	DIDN-0003	$2b$10$GYQKOLPiY9n3HUX9pMm6X.p9/c709o67ewECRj8um67QU2p46Nr5m	NIP-0003	dosen3@stu.untar.ac.id
133	Dosen 4	DIDN-0004	$2b$10$Z7izAv4TShYtJXDsjVXn9OKYl5aZbi8/Nwwempy5NHA6Z36fw1ime	NIP-0004	dosen4@stu.untar.ac.id
134	Dosen 5	DIDN-0005	$2b$10$PTDKsmCGWXdbbdjOFYnxRuHZCzJ8ScpvHPV6ig9Ya6D5RsxyaFHHG	NIP-0005	dosen5@stu.untar.ac.id
135	Dosen 6	DIDN-0006	$2b$10$Bq0sEfou.jU2Ep1a8Ke99eM5HOlI5VcjoUnSxe8sKM9BFoo/pmcWe	NIP-0006	dosen6@stu.untar.ac.id
136	Dosen 7	DIDN-0007	$2b$10$tM.8N9eEXlDykH5DBZHLveCgFUgbNO4l1aLMj65DPEU4e4SgDChU6	NIP-0007	dosen7@stu.untar.ac.id
137	Dosen 8	DIDN-0008	$2b$10$55wQKB7TOPu5C/pYVQI6duZCQy7lnspHaoXwaYp.ZTN.1TzrzkPT6	NIP-0008	dosen8@stu.untar.ac.id
138	Dosen 9	DIDN-0009	$2b$10$pRYffqD5l10MEaKbZxyZ0Ow6J8Thhnp557Oo4zyXxS1uLzu7T23Aa	NIP-0009	dosen9@stu.untar.ac.id
139	Dosen 10	DIDN-0010	$2b$10$.CxDZgnpGj7/FU5nhJU1W.rLKIgK2okbQCJZVluI/lw1gjejlfVmC	NIP-0010	dosen10@stu.untar.ac.id
140	Dosen 11	DIDN-0011	$2b$10$KPxxxrnXZ2GS7lg2DoQ/x.xRbzrv8rM7HZBHJlXLC5EY7jdGtuOwy	NIP-0011	dosen11@stu.untar.ac.id
141	Dosen 12	DIDN-0012	$2b$10$0htUUCx6FRlybhbtIdokSOtkGrHrfDwvD8Z58W9e6ulmGqg7H1./K	NIP-0012	dosen12@stu.untar.ac.id
142	Dosen 13	DIDN-0013	$2b$10$YJF8w9WuvPhdk09z..rCL.z/m3csZkcvr0qGxW8G.UQ7MX09jqPme	NIP-0013	dosen13@stu.untar.ac.id
143	Dosen 14	DIDN-0014	$2b$10$biNIl2TvgJxC9KnPd5ue3uyAVD2LW44SORjNmVJFYhZf86J1wE1ii	NIP-0014	dosen14@stu.untar.ac.id
144	Dosen 15	DIDN-0015	$2b$10$inRE0qqDBVrxL0/jwftAFeombWwEh6xnYiqdbuddNloitaI2JsP5i	NIP-0015	dosen15@stu.untar.ac.id
145	Dosen 16	DIDN-0016	$2b$10$8x.wNjnZTh0I6XHxqmanW.yU408em2M0OKRmIIngLf6uvcS/oL8d2	NIP-0016	dosen16@stu.untar.ac.id
130	Dosen 1	DIDN-0001		NIP-0001	dosen1@stu.untar.ac.id
\.


                                                                                                                                                                                                                                                         3686.dat                                                                                            0000600 0004000 0002000 00000002431 14613764550 0014273 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	John Doe	12345
2	Jane Smith	67890
4	Amanda Johnson	98765
5	Budi Santoso	11111
6	Citra Wijaya	22222
7	David Tan	33333
8	Eva Kurniawan	44444
9	Faisal Rahman	55555
10	Grace Lim	66666
43	Nadia Khan	99999
20	Quincy Jones	78901
38	Ibrahim Ahmed	12378
35	Freya Singh	15432
14	Katie Lee	16788
26	Walter Davis	98423
44	Omar Ali	67891
17	Nina Kim	34561
22	Samuel Chang	12356
28	Yuki Yamamoto	57967
23	Tina Rodriguez	45786
40	Kevin Nguyen	24573
31	Bella Rossi	24565
19	Pamela White	42567
37	Holly Wilson	24578
49	Tara Sharma	78903
46	Qasim Ahmed	56789
25	Vera Gonzales	45678
13	Joko Susanto	23466
12	Ika Sari	66663
15	Leo Wang	46678
18	Oscar Martinez	63190
21	Rita Patel	74492
24	Umar Ali	70497
27	Xiao Chen	14920
30	Alex Turner	30089
33	Diana Lopez	39387
36	George Miller	75567
39	Jasmine Patel	71911
42	Milo Johnson	75603
45	Penny Davis	69295
48	Sven Svensson	53845
47	Rosa Rodriguez	75232
34	Eli Kim	23694
16	Maya Tanaka	66907
11	Hendra Gunawan	76360
29	Zara Khan	13032
32	Charlie Brown	51074
41	Lily Wang	64806
50	Eric Anthony Wu	82520050
51	mahasiswa 1	MHS-0001
52	mahasiswa 2	MHS-0002
53	mahasiswa 3	MHS-0003
54	mahasiswa 4	MHS-0004
55	mahasiswa 5	MHS-0005
56	mahasiswa 6	MHS-0006
57	mahasiswa 7	MHS-0007
58	mahasiswa 8	MHS-0008
59	mahasiswa 9	MHS-0009
60	mahasiswa 10	MHS-0010
61	mahasiswa 11	MHS-0011
\.


                                                                                                                                                                                                                                       3690.dat                                                                                            0000600 0004000 0002000 00000000033 14613764550 0014262 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Internal
2	External
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     3692.dat                                                                                            0000600 0004000 0002000 00000000121 14613764550 0014262 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	subkategori kategori - 1
4	2	subkategori penelitian 2
3	1	Subkategori 6
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                               3700.dat                                                                                            0000600 0004000 0002000 00000000124 14613764550 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        3	file_monef
4	file_laporan_akhir
1	file_proposal
2	surat_perjanjian_kerjasama
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                            3694.dat                                                                                            0000600 0004000 0002000 00000002041 14613764550 0014267 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        38	Proposal Jurnal Ilmiah 3	5000000	2024-08-01	2024-04-24 23:49:37.041909	1	2025-01-01	Selesai	2024-04-24 23:49:37.041909	131	7000000
39	Penelitian Batal	5000000	2024-02-01	2024-04-25 00:48:40.523948	1	2024-06-01	Batal	2024-04-25 00:48:40.523948	130	7000000
40	Penelitian Batal 2	5000000	2024-08-01	2024-04-25 00:49:10.424816	1	2025-01-01	Batal	2024-04-25 00:49:10.424816	130	7000000
41	Pengenalan Karakter LED	29750000	2024-02-01	2024-04-25 09:44:54.196494	1	2024-06-01	Selesai	2024-04-25 09:44:54.196494	130	30000000
36	Test proposal 2 file	5000000	2024-02-01	2024-04-24 22:55:04.40972	4	2024-06-01	Di Setujui	2024-04-24 22:55:04.40972	131	7000000
37	Proposal Jurnal Ilmiah 2	5000000	2024-02-01	2024-04-24 23:47:20.535687	1	2024-06-01	Di Setujui	2024-04-24 23:47:20.535687	130	7000000
35	Proposal Jurnal Ilmiah 1	5000000	2024-08-01	2024-04-24 22:41:30.787573	1	2025-01-01	Di Setujui	2024-04-24 22:41:30.787573	130	7000000
43	Penelitian ABCD	5000000	2024-08-01	2024-04-30 01:31:52.339612	1	2025-01-01	Di Setujui	2024-04-30 01:31:52.339612	132	7000000
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               3701.dat                                                                                            0000600 0004000 0002000 00000016375 14613764550 0014273 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        Vyim_d3Pr7OhEOtQMcUaallYX37Ijy7m	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-12T11:24:13.643Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-12 18:24:13.643+07
eIdXhUwtcWOFE35Xz3IDRsmmcqLyAZgF	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-24T06:02:39.342Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-24 13:02:39.342+07
SvQcynakUrfpz-xpgigCDE7rdD9YjB7H	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-10T14:43:11.604Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-10 21:43:11.604+07
rsWxe4uONKWXRtCuDOzk2TrCKA1Q37TF	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-08T10:59:20.880Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-08 18:14:42.273+07
W594I6MaQKrjBTdb1RVu6rY2Tu5kRIiu	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-08T11:16:21.688Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-08 18:16:21.688+07
D7_9yXfSw_S9q4L0x9RwxVi5_5SviuAn	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-08T11:16:21.692Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-08 18:16:21.692+07
YZZ1UpZ5pV2t6U0808ULLHaODQwJFVWC	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-08T11:16:21.694Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-08 18:16:21.694+07
KrNL2ycGDkGT46ntFpDO1lYSxDuL0P-5	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-10T14:43:11.607Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-10 21:43:11.607+07
-pkx4nzmP0QF003pbbnG2-N9rgSP2_Pn	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-04T10:06:06.495Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-04 17:06:14.552+07
P3Pyd6cLyna9VZE-s-K9N7P7JYFRqjgg	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-10T14:43:11.605Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-10 21:43:11.605+07
iA0L1w0gAoQh1uldOQkhXOP9VSYXM-HT	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-10T14:43:11.610Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-10 21:43:11.61+07
N0CLw_I4owDSc529Ro-Xjmxprah5-tBr	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-10T14:43:11.611Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-10 21:43:11.611+07
ysHnKQpF-RsOnrbWEo6_Gl_0K87MTTdv	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-10T14:43:11.612Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-10 21:43:11.612+07
l10wZfLle4fEEeaVsY9DcBvtH78kD6id	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-29T13:46:43.349Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-29 20:46:43.349+07
DcA7amKML_OLAAMqrWPt9h8AXEO4mBwc	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-24T06:02:39.354Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-24 15:27:43.895+07
kRnZX8JK6b9Q2BAxe1PweVn75xijwmCG	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-12T11:24:13.643Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-12 18:24:13.667+07
7NePwsQKDOPt_wHqAhijVoYVPI8Ka1qi	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-12T11:24:13.648Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-12 18:24:13.669+07
VISgLrrlwwd_W4o5LEs7OW1iAxwvSvJd	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-29T14:06:14.809Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-29 21:06:24.503+07
_wR9PDnXBzGQdCaEgxm2dvA93lBOqqot	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-29T14:06:11.089Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-29 23:52:23.013+07
7RVvzEZsAp6TMu2D-DLBBUzvb3hftFTC	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-04T08:32:17.218Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-04 15:32:17.218+07
WOa7HS3A17Zwlxf0w34BPG15XN63kiWa	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-04T08:32:17.217Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-04 15:32:17.217+07
3UH5dhjyDi8dVWzZuhmHa0Qxo0U4LAtb	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-29T16:24:47.730Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-29 23:24:50.253+07
2mRdK5YHYZsnxWp_JDJEZGZ45pv3t2hJ	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-04T08:32:17.219Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-04 15:32:17.219+07
Mm8A_pIXiR7drtHWVMN9koUJ-ONPD_Z1	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-04T08:32:17.217Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-04 15:32:17.217+07
-7IKRG-vf7g7K6WXf9DiEdqMo5FE77Cd	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-29T13:40:48.645Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-29 20:40:48.645+07
sV6hRZK3O-fx72n1sqkepkoDHUGdXKyb	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-04T08:32:17.216Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-04 15:32:17.231+07
L8TfUU30gyUz8ouQ4YsSURCs8-5vYQxZ	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-29T13:40:50.876Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-29 20:40:50.876+07
Zwhj3qwpFzu-D5zu6jF6Nkd7IXwoWSIi	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-08T11:06:44.856Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-08 18:06:44.874+07
iuqo52JgRcdSd0-EgYBIviCZTlNNHV-S	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-10T14:43:09.958Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-10 21:46:38.873+07
ZtTxTJT7wsUiBIwC1RhhZXfbjJtYBZtm	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-08T11:06:44.855Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-08 18:06:44.855+07
ucgHDYkpBYEDbQL6dIeCHsTlcaI2qTRI	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-08T11:06:44.863Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-08 18:06:44.863+07
-pRxEHwKMmWt_PsFnHL7iEQGr_qmXhTa	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-08T11:06:44.840Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-08 18:06:44.868+07
84fpaOeTGyNaZdzyfSd9IC2v2e38Dakg	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-08T11:06:44.858Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-08 18:06:44.885+07
-dTXpTTbwK3IA7v-sl3LtE9Ze7WOPuBs	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-12T11:24:13.648Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-12 18:24:13.648+07
uKTdlBvtpiAOOZSugjzZ5wV-wEH4_8UR	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-12T11:24:13.643Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-12 18:24:13.666+07
w5LpRAVgRWIaWkyfWpnMf7_OkiNAKBHX	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-12T11:24:13.645Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-12 18:24:13.667+07
2-4TQBGnJ3J0-ef1FWF3GZ3e4cw7om2v	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-29T13:47:20.666Z","secure":false,"httpOnly":true,"path":"/"}}	2024-05-29 20:47:21.283+07
pNW1JpVzniN57rqpeE1QDpeiTFkJ76w4	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-24T05:53:50.634Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"2","username":"admin","role":"admin","admin_role":"admin"}}	2024-05-28 10:53:33.345+07
lKQtQOs_lU9XjUC9ZpmNy_Q2Erk_GiJl	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-29T17:45:12.483Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"132","username":"dosen3@stu.untar.ac.id","role":"dosen"}}	2024-05-30 01:34:49.604+07
WZOHjiCQjNmR8IdbxkAFQTKNtrURBwz5	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-15T09:52:03.131Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"2","username":"admin","role":"admin","admin_role":"admin"}}	2024-05-30 01:00:09.778+07
\.


                                                                                                                                                                                                                                                                   restore.sql                                                                                         0000600 0004000 0002000 00000053657 14613764550 0015417 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
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

DROP DATABASE skripsi;
--
-- Name: skripsi; Type: DATABASE; Schema: -; Owner: ericanthony
--

CREATE DATABASE skripsi WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


ALTER DATABASE skripsi OWNER TO ericanthony;

\connect skripsi

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
    email character varying
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
    biaya_yang_diajukan integer DEFAULT 0 NOT NULL
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
-- Name: penelitian id; Type: DEFAULT; Schema: public; Owner: ericanthony
--

ALTER TABLE ONLY public.penelitian ALTER COLUMN id SET DEFAULT nextval('public.proposal_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.admin (id, username, password, role) FROM stdin;
\.
COPY public.admin (id, username, password, role) FROM '$$PATH$$/3688.dat';

--
-- Data for Name: anggota_penelitian; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.anggota_penelitian (id, id_penelitian, id_dosen, id_mahasiswa) FROM stdin;
\.
COPY public.anggota_penelitian (id, id_penelitian, id_dosen, id_mahasiswa) FROM '$$PATH$$/3698.dat';

--
-- Data for Name: dokumen_penelitian; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.dokumen_penelitian (id, id_penelitian, tipe_dokumen, created_at, updated_at, file, original_filename) FROM stdin;
\.
COPY public.dokumen_penelitian (id, id_penelitian, tipe_dokumen, created_at, updated_at, file, original_filename) FROM '$$PATH$$/3696.dat';

--
-- Data for Name: dosen; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.dosen (id, nama_dosen, nomor_induk_dosen_nasional, password, nomor_induk_pegawai, email) FROM stdin;
\.
COPY public.dosen (id, nama_dosen, nomor_induk_dosen_nasional, password, nomor_induk_pegawai, email) FROM '$$PATH$$/3684.dat';

--
-- Data for Name: mahasiswa; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.mahasiswa (id, nama_mahasiswa, nomor_induk_mahasiswa) FROM stdin;
\.
COPY public.mahasiswa (id, nama_mahasiswa, nomor_induk_mahasiswa) FROM '$$PATH$$/3686.dat';

--
-- Data for Name: master_kategori_penelitian; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.master_kategori_penelitian (id, nama) FROM stdin;
\.
COPY public.master_kategori_penelitian (id, nama) FROM '$$PATH$$/3690.dat';

--
-- Data for Name: master_subkategori_penelitian; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.master_subkategori_penelitian (id, id_master_kategori_penelitian, nama) FROM stdin;
\.
COPY public.master_subkategori_penelitian (id, id_master_kategori_penelitian, nama) FROM '$$PATH$$/3692.dat';

--
-- Data for Name: master_tipe_penelitian_dokumen; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.master_tipe_penelitian_dokumen (id, nama) FROM stdin;
\.
COPY public.master_tipe_penelitian_dokumen (id, nama) FROM '$$PATH$$/3700.dat';

--
-- Data for Name: penelitian; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.penelitian (id, nama_proposal, biaya_yang_disetujui, periode_awal, created_at, id_subkategori_penelitian, periode_akhir, status, status_updated_at, ketua_dosen_penelitian, biaya_yang_diajukan) FROM stdin;
\.
COPY public.penelitian (id, nama_proposal, biaya_yang_disetujui, periode_awal, created_at, id_subkategori_penelitian, periode_akhir, status, status_updated_at, ketua_dosen_penelitian, biaya_yang_diajukan) FROM '$$PATH$$/3694.dat';

--
-- Data for Name: session_table; Type: TABLE DATA; Schema: public; Owner: ericanthony
--

COPY public.session_table (sid, sess, expired) FROM stdin;
\.
COPY public.session_table (sid, sess, expired) FROM '$$PATH$$/3701.dat';

--
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.admin_id_seq', 4, true);


--
-- Name: dosen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.dosen_id_seq', 145, true);


--
-- Name: mahasiswa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.mahasiswa_id_seq', 64, true);


--
-- Name: master_kategori_proposal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.master_kategori_proposal_id_seq', 7, true);


--
-- Name: master_proposal_dokumen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.master_proposal_dokumen_id_seq', 4, true);


--
-- Name: master_subkategori_proposal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.master_subkategori_proposal_id_seq', 6, true);


--
-- Name: proposal_anggota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.proposal_anggota_id_seq', 134, true);


--
-- Name: proposal_dokumen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.proposal_dokumen_id_seq', 50, true);


--
-- Name: proposal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ericanthony
--

SELECT pg_catalog.setval('public.proposal_id_seq', 43, true);


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
-- Name: penelitian_nama_proposal_uindex; Type: INDEX; Schema: public; Owner: ericanthony
--

CREATE UNIQUE INDEX penelitian_nama_proposal_uindex ON public.penelitian USING btree (nama_proposal);


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

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 