-- Active: 1716771409910@@127.0.0.1@3306@joeun


# 회원 컬럼 나열
-- user_no, user_name, user_id, user_pw, user_before_pw, user_birth, user_phone, user_email, user_like_job, user_reg_date, user_upd_date, user_gender, enabled


-- user_name, user_id, user_pw, user_birth, user_phone, user_email, user_like_job, user_gender


TRUNCATE user;
TRUNCATE user_auth;


## 회원
INSERT INTO user( user_name, user_id, user_pw, user_birth, user_phone, user_email, user_gender )
VALUES ('정주빈', 'jjb', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '20240101', '01012341234', 'jjb@naver.com', '여자');
INSERT INTO user_auth (user_no, auth) VALUES (3, 'ROLE_USER');



## mail 샘플 데이터 ~!~!~!
INSERT INTO `mail` (`mail_key`, `user_no`) VALUES ('mailkeyvalue', 26);
