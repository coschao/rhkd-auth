
-- (공통코드) '그룹' 테이블 생성
CREATE TABLE IF NOT EXISTS cgroups (
    gcode      TEXT     NOT NULL PRIMARY KEY,
    gname      TEXT     NOT NULL,
    remark     TEXT     ,
    use_yn     TEXT     NOT NULL DEFAULT 'Y',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME
);

-- (공통코드) '코드' 테이블 생성
CREATE TABLE IF NOT EXISTS ccodes (
    gcode      TEXT     NOT NULL,
    ccode      TEXT     NOT NULL,
    cname      TEXT     NOT NULL,
    sort       INTEGER  NOT NULL DEFAULT 1,
    attr1      TEXT     ,
    attr2      TEXT     ,
    attr3      TEXT     ,
    attr4      TEXT     ,
    attr5      TEXT     ,
    remark     TEXT     ,
    use_yn     TEXT     NOT NULL DEFAULT 'Y',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ,

    PRIMARY KEY (gcode, ccode)
    CONSTRAINT "ccodes_gcode_fkey" FOREIGN KEY ("gcode") REFERENCES "cgroups" ("gcode") ON DELETE RESTRICT ON UPDATE CASCADE
);


-- 인덱스 생성
-- CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);