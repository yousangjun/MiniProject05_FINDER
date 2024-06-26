-- Active: 1711633953173@@127.0.0.1@3306@joeun
SELECT c.*, r.*, rk.*
FROM
    company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    INNER JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no;

SELECT c.*, r.*
FROM company c
    INNER JOIN recruit r ON c.com_no = r.com_no;

SELECT c.*, r.*, rk.*
FROM
    company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    INNER JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no;

SELECT c.*, r.*, rk.*
FROM
    company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    INNER JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no
WHERE
    r.com_no = 1;

SELECT c.*, r.*
FROM company c
    INNER JOIN recruit r ON c.com_no = r.com_no
WHERE
    r.recruit_no = 28;

SELECT rk.recruit_keyword
FROM recruit r
    INNER JOIN recruit_keyword rk ON rk.recruit_no = r.recruit_no
WHERE
    r.recruit_no = 28;

SELECT c.*, r.*, rk.*, f.file_no AS file_no, f.file_name, f.file_path, f.file_code
FROM
    company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no
    LEFT JOIN (
        SELECT *
        FROM file
        WHERE
            parent_table = 'recruit'
            AND file_code = 1
    ) f ON r.recruit_no = f.parent_no

INSERT INTO
    user (
        user_name,
        user_id,
        user_pw,
        user_birth,
        user_phone,
        user_email,
        user_gender,
        enabled
    )
VALUES (
        '홍준범',
        'hjb',
        '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92',
        '20240101',
        '01012341234',
        'jjb@naver.com',
        '남자',
        1
    );

INSERT INTO user_auth (user_no, auth) VALUES (1, 'ROLE_COMPANY');

INSERT INTO user_auth (user_no, auth) VALUES (2, 'ROLE_USER');

## 기업 테이블
## 기업 상세 정보 테이블

INSERT INTO
    company (
        com_name,
        com_category,
        com_address,
        com_business,
        user_no
    )
VALUES (
        'ABC 주식회사',
        '소프트웨어 및 기술',
        '서울특별시 강남구 역삼동 123번지',
        '소프트웨어 개발 및 컨설팅',
        1
    );

INSERT INTO
    company (
        com_name,
        com_category,
        com_address,
        com_business,
        user_no
    )
VALUES (
        'XYZ 주식회사',
        '제조업',
        '경기도 성남시 분당구 정자동 456번지',
        '전자제품 제조 및 판매',
        2
    );

INSERT INTO
    `company_detail` (
        `com_represent`,
        `com_category`,
        `com_url`,
        `com_birth`,
        `com_size`,
        `com_emp_count`,
        `com_sales`,
        `com_content`,
        `com_address`,
        `com_vision`,
        `com_welfare`,
        `com_avg_salary`,
        `com_no`
    )
VALUES (
        '김철수',
        'IT',
        'http://www.abccorp.com',
        1995,
        '대기업',
        1000,
        500000000,
        'ABC Corporation은 소프트웨어 개발을 전문으로 하는 회사입니다.',
        '서울특별시 강남구 테헤란로 123',
        '글로벌 리더가 되겠습니다.',
        '식사 제공, 건강 검진',
        6000,
        1
    );

SELECT c.*, r.*, rk.*, f.file_no AS file_no, f.file_name, f.file_path, f.file_code
FROM
    company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_keyword_no
    LEFT JOIN (
        SELECT *
        FROM file
        WHERE
            parent_table = 'recruit'
            AND file_code = 1
    ) f ON r.recruit_no = f.parent_no
WHERE
    r.com_no = 1;

SELECT *
FROM file
WHERE
    parent_table = 'recruit'
    AND parent_no = 35
    AND file_code = 1
ORDER BY reg_date DESC

SELECT c.*, r.*, rk.*, f.file_no AS file_no, f.file_name, f.file_path, f.file_code
FROM
    company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no
    LEFT JOIN (
        SELECT *
        FROM file
        WHERE
            parent_table = 'recruit'
            AND file_code = 1
    ) f ON r.recruit_no = f.parent_no
    --     SELECT c.*, r.*, rk.*
    -- FROM company c
    -- INNER JOIN recruit r ON c.com_no = r.com_no
    -- LEFT JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no
SELECT *
FROM file
WHERE
    parent_table = 'recruit'
    AND parent_no = 42
    AND file_code = 1

SELECT * FROM file WHERE file_no = 40;

-- user 테이블 예제 데이터 삽입
-- 비밀번호는 미리 암호화하여 저장
INSERT INTO
    user (
        user_name,
        user_id,
        user_pw,
        user_before_pw,
        user_birth,
        user_phone,
        user_email,
        user_reg_date,
        user_upd_date,
        user_gender,
        ENABLED
    )
VALUES (
        '사용자1',
        'user1',
        '$2a$10$0FfQj7wfxEe.IhG5HLPvhO/p6hQRnT2lpLqgCrJiD6dJbC1dXoQf2',
        null,
        '1990-01-01',
        '010-1111-1111',
        'user1@example.com',
        now(),
        now(),
        '남자',
        1
    ),
    (
        '사용자2',
        'user2',
        '$2a$10$0FfQj7wfxEe.IhG5HLPvhO/p6hQRnT2lpLqgCrJiD6dJbC1dXoQf2',
        null,
        '1990-01-02',
        '010-2222-2222',
        'user2@example.com',
        now(),
        now(),
        '여자',
        1
    ),
    (
        '사용자3',
        'user3',
        '$2a$10$0FfQj7wfxEe.IhG5HLPvhO/p6hQRnT2lpLqgCrJiD6dJbC1dXoQf2',
        null,
        '1990-01-03',
        '010-3333-3333',
        'user3@example.com',
        now(),
        now(),
        '남자',
        1
    ),
    (
        '사용자4',
        'user4',
        '$2a$10$0FfQj7wfxEe.IhG5HLPvhO/p6hQRnT2lpLqgCrJiD6dJbC1dXoQf2',
        null,
        '1990-01-04',
        '010-4444-4444',
        'user4@example.com',
        now(),
        now(),
        '여자',
        1
    ),
    (
        '사용자5',
        'user5',
        '$2a$10$0FfQj7wfxEe.IhG5HLPvhO/p6hQRnT2lpLqgCrJiD6dJbC1dXoQf2',
        null,
        '1990-01-05',
        '010-5555-5555',
        'user5@example.com',
        now(),
        now(),
        '남자',
        1
    ),
    (
        '사용자6',
        'user6',
        '$2a$10$0FfQj7wfxEe.IhG5HLPvhO/p6hQRnT2lpLqgCrJiD6dJbC1dXoQf2',
        null,
        '1990-01-06',
        '010-6666-6666',
        'user6@example.com',
        now(),
        now(),
        '여자',
        1
    ),
    (
        '사용자7',
        'user7',
        '$2a$10$0FfQj7wfxEe.IhG5HLPvhO/p6hQRnT2lpLqgCrJiD6dJbC1dXoQf2',
        null,
        '1990-01-07',
        '010-7777-7777',
        'user7@example.com',
        now(),
        now(),
        '남자',
        1
    ),
    (
        '사용자8',
        'user8',
        '$2a$10$0FfQj7wfxEe.IhG5HLPvhO/p6hQRnT2lpLqgCrJiD6dJbC1dXoQf2',
        null,
        '1990-01-08',
        '010-8888-8888',
        'user8@example.com',
        now(),
        now(),
        '여자',
        1
    ),
    (
        '사용자9',
        'user9',
        '$2a$10$0FfQj7wfxEe.IhG5HLPvhO/p6hQRnT2lpLqgCrJiD6dJbC1dXoQf2',
        null,
        '1990-01-09',
        '010-9999-9999',
        'user9@example.com',
        now(),
        now(),
        '남자',
        1
    ),
    (
        '사용자10',
        'user10',
        '$2a$10$0FfQj7wfxEe.IhG5HLPvhO/p6hQRnT2lpLqgCrJiD6dJbC1dXoQf2',
        null,
        '1990-01-10',
        '010-1010-1010',
        'user10@example.com',
        now(),
        now(),
        '여자',
        1
    );

-- user_auth 테이블 예제 데이터 삽입
INSERT INTO
    `user_auth` (`auth`, `user_no`)
SELECT 'ROLE_COMPANY', `user_no`
FROM `user`;

INSERT INTO
    `company` (
        `user_no`,
        `com_name`,
        `com_category`,
        `com_address`,
        `com_business`
    )
VALUES (
        1,
        '삼성전자',
        '전자제품',
        '서울 강남구 테헤란로',
        '스마트폰, TV, 가전제품 제조 및 판매'
    ),
    (
        2,
        'LG전자',
        '전자제품',
        '서울 영등포구 여의대로',
        '스마트폰, TV, 가전제품 제조 및 판매'
    ),
    (
        3,
        '현대자동차',
        '자동차',
        '서울 영등포구 여의대로',
        '자동차 제조 및 판매'
    ),
    (
        4,
        '기아자동차',
        '자동차',
        '서울 영등포구 여의대로',
        '자동차 제조 및 판매'
    ),
    (
        5,
        'SK텔레콤',
        '통신',
        '서울 강남구 역삼로',
        '이동통신, 브로드밴드 서비스 제공'
    ),
    (
        6,
        'KT',
        '통신',
        '서울 중구 종로',
        '이동통신, 브로드밴드 서비스 제공'
    ),
    (
        7,
        '네이버',
        '인터넷',
        '경기 성남시 판교로',
        '포털 서비스, 온라인 광고, 인터넷 서비스'
    ),
    (
        8,
        '카카오',
        '인터넷',
        '경기 성남시 분당구 대왕판교로',
        '모바일 메신저, 인터넷 서비스'
    ),
    (
        9,
        '포스코',
        '철강',
        '경기 구리시 아차산로',
        '철강 제조 및 판매'
    ),
    (
        10,
        'LG화학',
        '화학',
        '서울 종로구 종로',
        '화학 제품 제조 및 판매'
    );

INSERT INTO
    `recruit` (
        `com_no`,
        `recruit_title`,
        `recruit_content`,
        `recruit_responsibilities`,
        `recruit_qualifications`,
        `recruit_preferred_qualifications`,
        `recruit_reg_date`
    )
VALUES (
        1,
        '소프트웨어 엔지니어 포지션',
        '우리는 Java 및 Spring Boot 경험이 있는 소프트웨어 엔지니어를 찾고 있습니다.',
        '소프트웨어 응용 프로그램을 개발하고 유지 관리합니다.',
        '컴퓨터 과학 또는 관련 분야의 학사 학위.',
        'RESTful API 및 마이크로서비스 아키텍처 경험.',
        '2024-06-03'
    ),
    (
        2,
        '데이터 과학자 포지션',
        '우리 팀에 합류할 데이터 과학자를 찾고 있습니다.',
        '복잡한 데이터 세트를 분석하고 해석합니다.',
        '데이터 과학 또는 관련 분야의 석사 학위.',
        '머신러닝 알고리즘 경험.',
        '2024-06-03'
    ),
    (
        3,
        '웹 개발자 모집',
        '저희 회사에서는 웹 개발자를 모집합니다. HTML, CSS 및 JavaScript에 능숙한 분을 찾고 있습니다.',
        '웹 사이트 및 웹 애플리케이션 개발',
        '웹 개발 관련 학위 또는 자격증',
        '프론트엔드 및 백엔드 프레임워크 경험',
        '2024-06-03'
    ),
    (
        4,
        '데이터베이스 관리자 모집',
        '데이터베이스 관리자를 채용합니다. SQL 쿼리 및 데이터베이스 성능 최적화에 능숙한 분을 찾습니다.',
        '데이터베이스 설치, 구성 및 유지 관리',
        '컴퓨터 과학 또는 관련 분야의 학사 학위',
        '관계형 및 NoSQL 데이터베이스 관리 경험',
        '2024-06-03'
    ),
    (
        5,
        '프로젝트 매니저 채용',
        '프로젝트 매니저를 모집합니다. 프로젝트 일정 및 예산 관리에 능숙한 분을 찾습니다.',
        '프로젝트 팀 관리 및 리소스 할당',
        '프로젝트 관리 관련 자격증',
        '소프트웨어 개발 및 배포 프로세스 이해',
        '2024-06-03'
    ),
    (
        6,
        'UI/UX 디자이너 채용',
        'UI/UX 디자이너를 모집합니다. 사용자 경험에 초점을 둔 디자인을 만들 수 있는 분을 찾습니다.',
        '웹 및 모바일 애플리케이션 디자인',
        'UI/UX 디자인 관련 학위 또는 자격증',
        'Adobe Creative Suite 및 Sketch 등의 디자인 도구 경험',
        '2024-06-03'
    ),
    (
        7,
        '시스템 엔지니어 채용',
        '시스템 엔지니어를 모집합니다. 서버 및 네트워크 인프라를 구성하고 유지 관리할 수 있는 분을 찾습니다.',
        '시스템 아키텍처 설계 및 구현',
        '컴퓨터 과학 또는 관련 분야의 학사 학위',
        '클라우드 플랫폼 및 가상화 기술 경험',
        '2024-06-03'
    ),
    (
        8,
        '보안 엔지니어 채용',
        '보안 엔지니어를 모집합니다. 정보 보안 시스템을 설계하고 구현할 수 있는 분을 찾습니다.',
        '네트워크 보안 및 데이터 보호',
        '정보 보안 관련 자격증',
        'SIEM 및 IDS/IPS 시스템 관리 경험',
        '2024-06-03'
    ),
    (
        9,
        'QA 엔지니어 채용',
        '품질 보증 엔지니어를 모집합니다. 제품 및 서비스의 품질을 확인하는 역할을 수행할 수 있는 분을 찾습니다.',
        '소프트웨어 테스트 계획 및 실행',
        '소프트웨어 테스팅 관련 자격증',
        '자동화 테스트 도구 사용 경험',
        '2024-06-03'
    ),
    (
        10,
        '데이터 엔지니어 채용',
        '데이터 엔지니어를 모집합니다. 대규모 데이터 처리 및 분석 시스템을 구축할 수 있는 분을 찾습니다.',
        '데이터 파이프라인 설계 및 구현',
        '데이터 엔지니어링 또는 관련 분야의 학사 학위',
        '빅데이터 및 데이터베이스 기술 경험',
        '2024-06-03'
    );

INSERT INTO
    `recruit_keyword` (
        `recruit_keyword`,
        `recruit_no`
    )
VALUES ('Java', 1),
    ('Spring Boot', 1),
    ('데이터 과학자', 2),
    ('데이터 분석', 2),
    ('머신러닝', 2),
    ('웹 개발자', 3),
    ('HTML', 3),
    ('CSS', 3),
    ('JavaScript', 3),
    ('데이터베이스 관리자', 4),
    ('SQL', 4),
    ('데이터베이스 성능 최적화', 4),
    ('프로젝트 매니저', 5),
    ('프로젝트 일정 관리', 5),
    ('UI/UX 디자이너', 6),
    ('사용자 경험', 6),
    ('디자인 도구', 6),
    ('시스템 엔지니어', 7),
    ('서버 인프라', 7),
    ('네트워크 구성', 7),
    ('보안 엔지니어', 8),
    ('정보 보안', 8),
    ('보안 시스템 설계', 8),
    ('QA 엔지니어', 9),
    ('소프트웨어 테스트', 9),
    ('자동화 테스트', 9),
    ('데이터 엔지니어', 10),
    ('대규모 데이터 처리', 10),
    ('데이터 분석 시스템', 10);

SELECT cv.*, u.*
FROM
    cv
    JOIN apply_employee a ON cv.cv_no = a.cv_no
    JOIN user u ON cv.user_no = u.user_no
    JOIN company c ON u.user_no = c.user_no
WHERE
    c.user_no = 1;

SELECT recruit.*
FROM
    recruit
    JOIN apply_employee ON recruit.recruit_no = apply_employee.recruit_no
    JOIN cv ON apply_employee.cv_no = cv.cv_no
WHERE
    cv.user_no = 1;

SELECT c.*, r.*, rk.*
FROM
    company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no
    JOIN apply_employee a ON r.recruit_no = a.recruit_no
    JOIN cv ON a.cv_no = cv.cv_no
WHERE
    cv.user_no = 1;

SELECT c.*, u.*
FROM
    cv c
    JOIN apply_employee ae ON c.cv_no = ae.cv_no
    JOIN recruit r ON ae.recruit_no = r.recruit_no
    JOIN user u ON c.user_no = u.user_no
WHERE
    r.com_no = 31;

SELECT c.*
FROM
    cv c
    JOIN apply_employee ae ON c.cv_no = ae.cv_no
    JOIN recruit r ON ae.recruit_no = r.recruit_no
WHERE
    r.com_no = #{com_No};

SELECT * FROM company WHERE user_no = 1;

SELECT *
FROM company
WHERE
    user_no = #{userNo};

SELECT c.*, u.*
FROM
    cv c
    JOIN apply_employee ae ON c.cv_no = ae.cv_no
    JOIN recruit r ON ae.recruit_no = r.recruit_no
    JOIN user u ON c.user_no = u.user_no
WHERE
    r.com_no = 1;

SELECT cv.*, user.*
FROM
    recruit
    JOIN apply_employee ON recruit.recruit_no = apply_employee.recruit_no
    JOIN cv ON apply_employee.cv_no = cv.cv_no
    JOIN user ON cv.user_no = user.user_no
WHERE
    recruit.com_no = 1;

SELECT cv.*, user.*
FROM
    recruit
    JOIN apply_employee ON recruit.recruit_no = apply_employee.recruit_no
    JOIN cv ON apply_employee.cv_no = cv.cv_no
    JOIN user ON cv.user_no = user.user_no
WHERE
    recruit.com_no = 31;

SELECT
    c.com_no,
    c.com_name,
    c.com_category,
    c.com_address,
    c.com_business,
    cd.com_info_no,
    cd.com_represent,
    cd.com_url,
    cd.com_birth,
    cd.com_size,
    cd.com_emp_count,
    cd.com_sales,
    cd.com_content,
    cd.com_vision,
    cd.com_welfare,
    cd.com_avg_salary
FROM
    recruit r
    JOIN company c ON r.com_no = c.com_no
    JOIN company_detail cd ON cd.com_no = 3;

SELECT c.* FROM company c JOIN recruit r ON c.com_no = 3;

----
SELECT c.*, r.*, rk.*
FROM
    company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no
WHERE
    r.recruit_no = 1;

-- <select id="countApplicationsByUserNo" parameterType="int" resultType="int">
SELECT COUNT(*) AS apply_count
    FROM apply_employee ae
    JOIN cv c ON ae.cv_no = c.cv_no
    WHERE c.user_no = 13 AND ae.recruit_no = 105;
SELECT COUNT(DISTINCT r.recruit_no)
    FROM recruit r
    JOIN company c ON r.com_no = c.com_no
    LEFT JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no
    
    -- </select>


    SELECT c.*
        ,r.*
        ,rk.*
        ,f.file_no AS file_no
        ,f.file_name
        ,f.file_path
        ,f.file_code
    FROM company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no
    LEFT JOIN (
        SELECT *
        FROM file
        WHERE parent_table = 'recruit'
          AND file_code = 1
    ) f ON r.recruit_no = f.parent_no
    ORDER BY r.com_reg_date DESC;

    SELECT 
    c.*,
    r.*,
    f.file_no AS file_no,
    f.file_name,
    f.file_path,
    f.file_code
FROM 
    company c
INNER JOIN 
    recruit r ON c.com_no = r.com_no
LEFT JOIN 
    (
        SELECT *
        FROM file
        WHERE parent_table = 'recruit'
          AND file_code = 1
    ) f ON r.recruit_no = f.parent_no
ORDER BY 
    r.com_reg_date DESC;
    

    SELECT c.*, r.*, f.file_no AS file_no, f.file_name, f.file_path, f.file_code, keywords.recruit_keyword
    FROM company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN (
        SELECT rk.recruit_no, GROUP_CONCAT(rk.recruit_keyword SEPARATOR ', ') AS keywords
        FROM recruit_keyword rk
        GROUP BY rk.recruit_no
    ) rk ON r.recruit_no = rk.recruit_no
    LEFT JOIN (
        SELECT *
        FROM file
        WHERE parent_table = 'recruit'
          AND file_code = 1
    ) f ON r.recruit_no = f.parent_no;
    
 
    SELECT c.cv_no AS cvNo,
           c.user_no AS userNo,
           c.cover_letter AS coverLetter,
           c.cv_title AS cvTitle,
           c.cv_reg_date AS cvRegDate,
           c.cv_upd_date AS cvUpdDate,
           u.user_no AS user_userNo,
           u.user_name AS user_userName,
           u.user_id AS user_userId,
           u.user_pw AS user_userPw,
           u.user_before_pw AS user_userBeforePw,
           u.user_birth AS user_userBirth,
           u.user_phone AS user_userPhone,
           u.user_email AS user_userEmail,
           u.user_reg_date AS user_userRegDate,
           u.user_upd_date AS user_userUpdDate,
           u.user_gender AS user_userGender,
           u.ENABLED AS user_enabled,
           ae.apply_no AS applyNo, 
           r.recruit_title AS recruitTitle, 
           r.recruit_reg_date AS recruitRegDate 
    FROM cv c
    JOIN apply_employee ae ON c.cv_no = ae.cv_no
    JOIN recruit r ON ae.recruit_no = r.recruit_no
    JOIN user u ON c.user_no = u.user_no
    WHERE r.com_no = 1
    ORDER BY c.cv_reg_date DESC
    LIMIT 0, 5;

    SELECT c.cv_no AS cvNo,
           c.user_no AS userNo,
           c.cover_letter AS coverLetter,
           c.cv_title AS cvTitle,
           c.cv_reg_date AS cvRegDate,
           c.cv_upd_date AS cvUpdDate,
           u.user_no AS user_userNo,
           u.user_name AS user_userName,
           u.user_id AS user_userId,
           u.user_pw AS user_userPw,
           u.user_before_pw AS user_userBeforePw,
           u.user_birth AS user_userBirth,
           u.user_phone AS user_userPhone,
           u.user_email AS user_userEmail,
           u.user_reg_date AS user_userRegDate,
           u.user_upd_date AS user_userUpdDate,
           u.user_gender AS user_userGender,
           u.ENABLED AS user_enabled,
           ae.apply_no AS applyNo, 
           r.recruit_title AS recruitTitle, 
           r.recruit_reg_date AS recruitRegDate 
    FROM cv c
    JOIN apply_employee ae ON c.cv_no = ae.cv_no
    JOIN recruit r ON ae.recruit_no = r.recruit_no
    JOIN user u ON c.user_no = u.user_no
    WHERE r.com_no = 1

    SELECT COUNT(*) AS apply_count
    FROM apply_employee ae
    JOIN cv c ON ae.cv_no = c.cv_no
    WHERE c.user_no = 2 AND ae.recruit_no = 24;

    SELECT c.*, r.*, f.file_no AS file_no, f.file_name, f.file_path, f.file_code, rk.recruit_keyword
    FROM company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN (
        SELECT rk.recruit_no, GROUP_CONCAT(rk.recruit_keyword SEPARATOR ', ') AS recruit_keyword
        FROM recruit_keyword rk
        GROUP BY rk.recruit_no
    ) rk ON r.recruit_no = rk.recruit_no
    LEFT JOIN (
        SELECT *
        FROM file
        WHERE parent_table = 'recruit'
          AND file_code = 1
    ) f ON r.recruit_no = f.parent_no
    
    ORDER BY r.com_reg_date DESC
    -- LIMIT 0, 12;

    SELECT *
    FROM `order` o
    WHERE o.user_no = 1;

    SELECT DISTINCT r.recruit_name, c.*, r.*, rk.*
    FROM company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no
    WHERE r.com_no = 1;

    SELECT
            c.com_no,
            c.com_name,
            c.com_category,
            c.com_address,
            c.com_business,
            cd.com_info_no,
            cd.com_represent,
            cd.com_url,
            cd.com_birth,
            cd.com_size,
            cd.com_emp_count,
            cd.com_sales,
            cd.com_content,
            cd.com_vision,
            cd.com_welfare,
            cd.com_avg_salary
        FROM
            recruit r
        JOIN
            company c ON r.com_no = c.com_no
        JOIN
            company_detail cd ON 5 = cd.com_no;


            SELECT *
    FROM `order` o
    WHERE o.user_no = 2;

    SELECT c.*, r.*, rk.*
    FROM company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no
    WHERE r.com_no = 3;
    LIMIT 0,5;


    SELECT c.*, r.*, f.file_no AS file_no, f.file_name, f.file_path, f.file_code, rk.recruit_keyword
    FROM company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN (
        SELECT rk.recruit_no, GROUP_CONCAT(rk.recruit_keyword SEPARATOR ', ') AS recruit_keyword
        FROM recruit_keyword rk
        GROUP BY rk.recruit_no
    ) rk ON r.recruit_no = rk.recruit_no
    LEFT JOIN (
        SELECT *
        FROM file
        WHERE parent_table = 'recruit'
          AND file_code = 1
    ) f ON r.recruit_no = f.parent_no
    WHERE c.com_no = 3;


    SELECT c.*, r.*, rk.*
    FROM company c
    INNER JOIN recruit r ON c.com_no = r.com_no
    LEFT JOIN recruit_keyword rk ON r.recruit_no = rk.recruit_no
    JOIN apply_employee a ON r.recruit_no = a.recruit_no
    JOIN cv ON a.cv_no = cv.cv_no
    WHERE cv.user_no = 1;

    SELECT c.*, u.*
      FROM cv c
        INNER JOIN user u ON c.user_no = u.user_no
    WHERE c.cv_no = 1;
  

  UPDATE apply_employee
    SET `check` = 1
  WHERE cv_no = 1;

  SELECT *
        FROM file
        WHERE parent_no = 1 AND
        parent_table = 'resume';


SELECT COALESCE(`check`, -1) AS `check`
      FROM apply_employee
      WHERE recruit_no = 1;

      <select id="getCheckByRecruitNoAndUserNo" resultType="int">
  SELECT COALESCE(ae.`check`, -1) AS `check`
  FROM apply_employee ae
  JOIN cv c ON ae.cv_no = c.cv_no
  JOIN `user` u ON c.user_no = u.user_no
  JOIN recruit r ON ae.recruit_no = r.recruit_no
  WHERE r.recruit_no = #{recruitNo} AND u.user_no = #{userNo}
</select>

--  <select id="getCheckByRecruitNo" resultType="int">
      SELECT COALESCE(`check`, -1) AS `check`
      FROM apply_employee
      WHERE recruit_no = 26;
--   </select>
