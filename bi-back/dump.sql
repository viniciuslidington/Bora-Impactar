SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET CONSTRAINTS ALL DEFERRED;

PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);

-- Inserção de dados na tabela _prisma_migrations
INSERT INTO _prisma_migrations VALUES
('933b3f59-69f2-4c76-8d7a-8e36f4f13002', 'ca03374d91071d03f2529bcbedeaeb39b65ab782f766cf14addd29c8138211f1', 1739401211667, '20250212230011_init', NULL, NULL, 1739401211666, 1),
('691576c7-109c-46c5-971e-305cf736459a', '08ac4f1d0db2c6a9b5a503a372eb49031e34dd2e1e31c9c07381ab7bf06740c0', 1739411489318, '20250213015129_remove_unique_number', NULL, NULL, 1739411489317, 1),
('7b708894-cb97-44d9-b006-4e4a8b66c52e', '55f3b94055ec40e51cdd6e852d2131c42fb7b3084dc2c4c710a56c5eb0833f70', 1739484848308, '20250213221408_adicionando_quantidade', NULL, NULL, 1739484848291, 1),
('c33397a5-436b-45bc-a637-bca9ba63fe12', 'a40a4c9b8d0849aebfb95fdcf3c8f7fea44c3a4a73597c86e83d939245429f12', 1740093090936, '20250220231130_add_ong', NULL, NULL, 1740093090934, 1),
('6ab50952-cf9e-479f-bcd1-9d075e1e6be9', 'd27812c75146ef494001de983e0f2fe501f16adb3d4d7f9ae34e9685a02caab8', 1740093966359, '20250220232606_dados_variaveis', NULL, NULL, 1740093966353, 1),
('aed578f4-a78a-43a8-9be7-0ece79523000', 'd2adcbf151ce5fd9614f2f062e998624f09b5a1d37358842bbbe17c13e175ef6', 1740438411521, '20250224230651_alteracaodecolunas', NULL, NULL, 1740438411518, 1),
('def0b385-07ab-4ea7-8832-48ba9c539067', '0b43fca7b508926d16039f0f92fe2b1b7efd552d489c21d280b2884f607a5691', 1742155665028, '20250316200745_add_quantity', NULL, NULL, 1742155665015, 1),
('091cffaf-b1a4-4539-b9c0-a615e25366c9', '0a95be691e781a89532c6534d421d35f92a72fa9018d7d2bcff3552e23a09392', 1742419272017, '20250318234950_add_ond_id', NULL, NULL, 1742419272003, 1),
('d0bf71ce-15af-4ea7-a962-22d1afe775d6', '693984af1e4aa5b6389940c33667cb5c0df48d342657d5417b7dd1d7a1bd9279', 1742419272031, '20250319001228_add_ong_id_to_relocation_product', NULL, NULL, 1742419272020, 1),
('c44c9597-1523-491f-8e4d-cd4e6631c95c', '73a7317a0f8347286982d5021178fa99b9075024f031246d29ed7c54c7d2726c', 1742419272059, '20250319003815_rm_number', NULL, NULL, 1742419272036, 1);

CREATE TABLE IF NOT EXISTS "ONGdata" (
    "id_bd" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" INTEGER,
    "name" TEXT,
    "description" TEXT,
    "is_formalized" BOOLEAN,
    "start_year" INTEGER,
    "contact_phone" TEXT,
    "instagram_link" TEXT,
    "x_link" TEXT,
    "facebook_link" TEXT,
    "pix_qr_code_link" TEXT,
    "gallery_images_url" TEXT,
    "skills" TEXT,
    "causes" TEXT,
    "sustainable_development_goals" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Inserção de dados na tabela ONGdata
INSERT INTO ONGdata VALUES
(1, 21, 'ONG TESTE 01 - NÃO APAGAR', 'Descrição da ONG Teste 01', 1, 2018, '8199999999', 'www.instagram.com.br', 'www.x.com', 'www.facebook.com.br', 'wwlkadaodkaodaodaoda', 'https://link.com/image1.jpg, https://link.com/image2.jpg', 'Artes', 'Advocacy- Políticas Públicas', 'Indústria, inovação e infraestrutura', 1740093161895, 1742418789313),
(2, 22, 'PROJETO TESTE - NÃO APAGAR', 'Descrição do Projeto Teste', 0, NULL, '', '', '', '', '', '', 'Artes', 'Arte e Cultura', 'Vida terrestre', 1740094020142, 1740516606909);

CREATE TABLE IF NOT EXISTS "Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "description" TEXT,
    "requestTime" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" INTEGER,
    "ong_Id" INTEGER
);

-- Inserção de dados na tabela Request
INSERT INTO Request VALUES
(2, 'Toalhas', 'UTENSÍLIOS', 'LOW', 'As toalhas têm que estar em bom estado', NULL, 1739486161161, 1742419330654, NULL, 21),
(3, 'Bananas', 'ALIMENTO', 'HIGH', NULL, NULL, 1739486186694, 1742419335299, NULL, 21),
(6, 'Boneca', 'BRINQUEDOS_LIVROS', 'MEDIUM', 'As bonecas têm que estar em bom estado', NULL, 1742157593366, 1742157722233, 5, NULL),
(7, 'Mouse', 'BRINQUEDOS_LIVROS', 'HIGH', 'Os mouses têm que vir com pilha', NULL, 1742157651286, 1742157651286, NULL, NULL);

CREATE TABLE IF NOT EXISTS "RelocationProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "ong_Id" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Inserção de dados na tabela RelocationProduct
INSERT INTO RelocationProduct VALUES
(1, 'Arroz', 'ALIMENTO', '4 sacos de arroz prestes a vencer', NULL, 1739410802616, 1739410802616),
(2, 'Feijão', 'ALIMENTO', 'Prestes a vencer', NULL, 1739411031845, 1739411031845),
(3, 'Dentista', 'SERVIÇOS', 'Dentista querendo ajudar, porém não tem pessoas para tratamento', NULL, 1739411177710, 1739411177710),
(4, 'AirFryer', 'UTENSÍLIOS', 'Já possuo uma', NULL, 1739411512102, 1739411512102),
(5, 'Cotonete', 'MEDICAMENTOS_HIGIENE', 'Pacotes sobrando', NULL, 1739411554129, 1739411554129),
(6, 'Cavalo de balanço', 'BRINQUEDOS_LIVROS', 'Não tenho necessidade de brinquedo de criança', NULL, 1739411608861, 1739411608861),
(7, 'Mesa sala de estar', 'MÓVEIS', 'Não tenho espaço para por a mesa, não tenho necessidade', NULL, 1739411669557, 1739411669557),
(8, 'Ração para gato', 'ITEMPET', 'Não tenho gatos aqui na ONG', NULL, 1739411701109, 1739411701109),
(9, '', 'AJUDAFINANCEIRA', 'Não tenho gatos aqui na ONG', NULL, 1739411722611, 1739411722611),
(10, 'Ferramentas', 'OUTRA', 'Sem utilidade aqui na ONG', NULL, 1739411851005, 1739411851005),
(11, 'Pepita de Ouro', 'OUTRA', 'Um mago deixou aqui e tenho muitas', NULL, 1739412410320, 1739412410320);

DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES
('ONGdata', 12),
('Request', 7),
('RelocationProduct', 11);

CREATE UNIQUE INDEX "ONGdata_id_key" ON "ONGdata"("id");
CREATE UNIQUE INDEX "ONGdata_name_key" ON "ONGdata"("name");

COMMIT;
