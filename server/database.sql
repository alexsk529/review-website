
CREATE TABLE author (
    author_name VARCHAR(50) PRIMARY KEY,
    likes SMALLINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    provider VARCHAR NOT NULL,
    subject VARCHAR NOT NULL,
    UNIQUE (provider, subject)
);

--CREATE TABLE federated_credential (
--    id SERIAL PRIMARY KEY,
--    author_name VARCHAR(50),
--    FOREIGN KEY (author_name) REFERENCES author (author_name),
--    provider VARCHAR NOT NULL,
--    subject VARCHAR NOT NULL,
--    UNIQUE (subject)
--);

CREATE TABLE work (
    work_name VARCHAR(50) PRIMARY KEY,
    work_rate SMALLINT
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    review_title VARCHAR(50),
    content VARCHAR,
    category VARCHAR(50),
    rate SMALLINT,
    created_at TIMESTAMP,
    author_name VARCHAR(50),
    FOREIGN KEY (author_name) REFERENCES author (author_name),
    work_name VARCHAR(50),
    FOREIGN KEY (work_name) REFERENCES work (work_name)
);


CREATE TABLE tag (
    tag_name VARCHAR(50) PRIMARY KEY
);

CREATE TABLE review_tags (
    review_id SMALLINT,
    FOREIGN KEY (review_id) REFERENCES review (review_id),
    tag_name VARCHAR(50),
    FOREIGN KEY (tag_name) REFERENCES tag (tag_name)
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP,
    comment VARCHAR,
    author_name VARCHAR(30),
    FOREIGN KEY (author_name) REFERENCES author (author_name),
    review_id SMALLINT,
    FOREIGN KEY (review_id) REFERENCES review (review_id)
);