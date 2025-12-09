--
-- PostgreSQL database dump
--

\restrict GYrOj5udMdIghm8aeuMwBHvxvwPGjV7ePIsLl4HCOsQuMjoYQCLlbNYdhDbUrax

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: solicitudes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitudes (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    correo character varying(150) NOT NULL,
    tipo character varying(50) NOT NULL,
    descripcion text NOT NULL,
    estado character varying(20) DEFAULT 'pendiente'::character varying,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.solicitudes OWNER TO postgres;

--
-- Name: solicitudes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitudes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solicitudes_id_seq OWNER TO postgres;

--
-- Name: solicitudes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitudes_id_seq OWNED BY public.solicitudes.id;


--
-- Name: solicitudes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes ALTER COLUMN id SET DEFAULT nextval('public.solicitudes_id_seq'::regclass);


--
-- Data for Name: solicitudes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitudes (id, nombre, correo, tipo, descripcion, estado, fecha) FROM stdin;
5	davos	davosjs@jajas.com	queja	Malaver no quiso hacer compartir y paila pa 	pendiente	2025-12-09 00:51:06.312349
4	davis	davis@jajas.com	peticion	Permiso pa no volver a clases hasta despues del 15 de enero porque joaaaa hp pereza no poder comer buñuelos parchado con la family	pendiente	2025-12-09 00:39:31.408474
6	Camelos	camelo@jspa.com	Aviso	Creo que este es mi ultimo registro de prueba jaja.	pendiente	2025-12-09 00:57:51.065222
\.


--
-- Name: solicitudes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitudes_id_seq', 6, true);


--
-- Name: solicitudes solicitudes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict GYrOj5udMdIghm8aeuMwBHvxvwPGjV7ePIsLl4HCOsQuMjoYQCLlbNYdhDbUrax

