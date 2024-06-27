-- Active: 1711633953173@@127.0.0.1@3306@joeun
-- cv 테이블에 임시 값 삽입
INSERT INTO cv (user_no, cover_letter, cv_title, cv_reg_date, cv_upd_date) VALUES
(1, '자기소개서입니다', '이력서 제목입니다1', NOW(), NOW()),
(2, '자기소개서입니다2', '이력서 제목입니다.2', NOW(), NOW());

-- employment_history 테이블에 임시 값 삽입
INSERT INTO employment_history (organization, start_date, end_date, duties, cv_no) VALUES
('기관명1', NOW(), NOW(), '담당업무 1입니다.', 1),
('기관명2', NOW(), NOW(), '담당업무 2입니다', 2);

-- education 테이블에 임시 값 삽입
INSERT INTO education (cv_no, university, major, university_status) VALUES
(1, '대학 1입니다', '전공 1입니다', '학사 1입니다.'),
(2, '대학 2이다.', '전공 2입니다.', '학사 2입니다');

SELECT * FROM cv;

SELECT * FROM `cv` WHERE user_no = 1;

    SELECT c.*, eh.*, ed.*
      FROM cv c
      INNER JOIN employment_history eh ON c.cv_no = eh.cv_no
      INNER JOIN education ed ON c.cv_no = ed.cv_no
    WHERE user_no = 1;


     SELECT c.*, u.*
        FROM cv c
        INNER JOIN user u ON c.user_no = u.user_no
    WHERE u.user_no = 1;


    SELECT c.*, u.*
      FROM cv c
        INNER JOIN user u ON c.user_no = u.user_no
    WHERE c.cv_no = 51



--문법 확인
    INSERT INTO employment_history (organization, start_date, end_date, duties, cv_no)
    VALUES ('조은기관', 20240101, 20240801, '학생', 7)

-- 문법 확인2
    UPDATE employment_history
    SET organization = '강제등록기관',
        start_date = 20240101,
        end_date = 20240802,
        duties = '백수'
    WHERE employment_history_no = 1


SELECT c.*, u.*
      FROM cv c
        INNER JOIN user u ON c.user_no = u.user_no
    WHERE c.cv_no = 1;

    DELETE FROM file
        WHERE parent_table = 'resume'
          AND parent_no = 49;