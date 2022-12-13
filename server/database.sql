
CREATE TABLE author (
    author_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) PRIMARY KEY,
    likes SMALLINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    provider VARCHAR NOT NULL,
    subject VARCHAR NOT NULL,
    UNIQUE (provider, subject),
    role VARCHAR(10) DEFAULT 'user'
);

CREATE TABLE work (
    work_name VARCHAR(50) PRIMARY KEY,
    work_rate SMALLINT
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    review_title VARCHAR(50) NOT NULL,
    content VARCHAR NOT NULL,
    category VARCHAR(50) NOT NULL,
    rate SMALLINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(50),
    FOREIGN KEY (email) REFERENCES author (email),
    work_name VARCHAR(50) NOT NULL,
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
    email VARCHAR(30),
    FOREIGN KEY (email) REFERENCES author (email),
    review_id SMALLINT,
    FOREIGN KEY (review_id) REFERENCES review (review_id)
);