SET timezone='America/Sao_Paulo';

CREATE TABLE IF NOT EXISTS planos (
    id_plano INT PRIMARY KEY,
    nome_plano VARCHAR(255),
    valor_plano DECIMAL(10, 2),
    desc_plano TEXT,
    data_inicio DATE,
    data_fim DATE
    );

CREATE TABLE IF NOT EXISTS historico_cirurgias (
    id_cirurgia INT PRIMARY KEY,
    Nome_cir VARCHAR(255),
    Descricao_cir TEXT,
    Complicacoes_cir TEXT,
    Recomendacoes_cir TEXT,
    tipo_cir VARCHAR(50),
    data_cir DATE
    );

CREATE TABLE IF NOT EXISTS enderecos_responsavel (
    endereco_res_id INT PRIMARY KEY,
    cep VARCHAR(8),
    rua VARCHAR(255),
    numero VARCHAR(10),
    complemento VARCHAR(255),
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(255),
    pais VARCHAR(255)
    );

CREATE TABLE IF NOT EXISTS enderecos_terceiro (
    endereco_ter_id INT PRIMARY KEY,
    cep VARCHAR(8),
    rua VARCHAR(255),
    numero VARCHAR(10),
    complemento VARCHAR(255),
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(255),
    pais VARCHAR(255)
    );


CREATE TABLE IF NOT EXISTS historico_scan (
    id_scan INT PRIMARY key,
    coordenada_scan VARCHAR(255),
    data_scan DATE,
    id_dispositivo INT,
    nome_dispositivo VARCHAR(255)
    );

CREATE TABLE IF NOT EXISTS responsavel (
    cpf_res VARCHAR(11) PRIMARY KEY,
    nome_res VARCHAR(255),
    idade_res INT,
    contato1_res VARCHAR(20),
    contato2_res VARCHAR(20),
    contato3_res VARCHAR(20),
    plano_assinado INT REFERENCES planos(id_plano) on delete cascade,
    email_res VARCHAR(255),
    endereco_id_res INT REFERENCES enderecos_responsavel(endereco_res_id) on delete cascade,
    rg_res VARCHAR(20)
    );

CREATE TABLE IF NOT EXISTS pips (
    pip_tag_id INT PRIMARY KEY,
    cpf_res_pip VARCHAR(11) REFERENCES responsavel(cpf_res) on delete cascade
    );

CREATE TABLE IF NOT EXISTS terceiro (
    cpf_ter VARCHAR(11) PRIMARY KEY,
    Nome_ter VARCHAR(255),
    Contato_ter VARCHAR(20),
    endereco_id_ter INT REFERENCES enderecos_terceiro(endereco_ter_id) on delete cascade
    );


CREATE TABLE IF NOT EXISTS dependente (
    cpf_dep VARCHAR(11) PRIMARY KEY,
    nome_dep VARCHAR(255),
    idade_dep INT,
    tipo_sanguineo VARCHAR(5),
    laudo TEXT,
    genero_dep VARCHAR(10),
    rg_dep VARCHAR(20),
    cpf_res_dep VARCHAR(11) REFERENCES responsavel(cpf_res) on delete cascade,
    pip_tag_id_dep INT REFERENCES pips(pip_tag_id) on delete cascade,
    cpf_ter_dep VARCHAR(11) REFERENCES terceiro(cpf_ter) on delete cascade,
    id_cirurgia_dep INT REFERENCES historico_cirurgias(id_cirurgia) on delete cascade,
    id_scan_dep INT references historico_scan(id_scan) on delete cascade
    );

CREATE TABLE IF NOT EXISTS sms_handler (
    sms_code INT CHECK (sms_code >= 0 AND sms_code <= 99999999),
    send_date TIMESTAMP,
    return_date TIMESTAMP,
    phone_user VARCHAR(14) NOT NULL,
    PRIMARY KEY (sms_code),
    cpf_dep VARCHAR(11) REFERENCES dependente(cpf_dep) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS scanhistory (
    scan_id SERIAL PRIMARY KEY,
    scan_name VARCHAR(255) NOT NULL,
    scan_email VARCHAR(255) NOT NULL,
    scan_phone VARCHAR(11) NOT NULL,
    dep_cpf VARCHAR(11),
    scan_date_time TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo'),
    FOREIGN KEY (dep_cpf) REFERENCES dependente(cpf_dep),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
    );