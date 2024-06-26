


INSERT INTO user( user_name, user_id, user_pw, user_birth, user_phone, user_email, user_gender, enabled) 
VALUES ('백승헌', 'bsh', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '20240101', '01012341234', 'bsh@naver.com', '남자', 2);
INSERT INTO user( user_name, user_id, user_pw, user_birth, user_phone, user_email, user_gender, enabled) 
VALUES ('홍길동', 'hgd', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '20240101', '01012341234', 'bsh@naver.com', '남자', 2);


INSERT INTO user_auth (user_no, auth) VALUES (2, 'ROLE_COMPANY'); -- 기업권한
INSERT INTO user_auth (user_no, auth) VALUES (1, 'ROLE_USER'); -- 기업권한
INSERT INTO user_auth (user_no, auth) VALUES (2, 'ROLE_USER'); -- 기업권한


INSERT INTO company (com_name, com_category, com_address, com_business, user_no) VALUES
('ABC 주식회사', '소프트웨어 및 기술', '서울특별시 강남구 역삼동 123번지', '소프트웨어 개발 및 컨설팅', 6);
INSERT INTO company (com_name, com_category, com_address, com_business, user_no) VALUES
('XYZ 주식회사', '제조업', '경기도 성남시 분당구 정자동 456번지', '전자제품 제조 및 판매', 2);
INSERT INTO company (com_name, com_category, com_address, com_business, user_no) VALUES
('FINDER 구인구직', '서비스업', '인천광역시 부평구 십정동 789번지', '구인구직 플랫폼', 4);




INSERT INTO `product` (`product_name`, `product_count`, `product_price`, `product_duration`)
VALUES 
('10만원', 30, 100000, 2),
('30만원', 80, 300000, 3),
('50만원', 150, 500000, 5);



SELECT *
        FROM company
        WHERE com_name  'X';

-- recruit_list_com 에서 보여줄 거 채용공고 / 이력서 / 지원내역 테이블 임시데이터
-- 채용공고 게시글 테이블
INSERT INTO `recruit` (`recruit_no`, `com_no`, `recruit_title`, `recruit_content`, `recruit_responsibilities`, `recruit_qualifications`, `recruit_preferred_qualifications`, `recruit_reg_date`, `com_reg_date`, `com_upd_date`) VALUES
(1, 1, 'Recruit Title 1', 'Recruit Content 1', 'Responsibilities 1', 'Qualifications 1', 'Preferred Qualifications 1', '2024-06-01', now(), now()),
(2, 1, 'Recruit Title 2', 'Recruit Content 2', 'Responsibilities 2', 'Qualifications 2', 'Preferred Qualifications 2', '2024-06-02', now(), now()),
(3, 1, 'Recruit Title 3', 'Recruit Content 3', 'Responsibilities 3', 'Qualifications 3', 'Preferred Qualifications 3', '2024-06-03', now(), now());

-- 이력서 테이블
INSERT INTO `cv` (`cv_no`, `user_no`, `cover_letter`, `cv_title`, `cv_reg_date`, `cv_upd_date`) VALUES
(1, 2, 'Cover Letter 1', 'CV Title 1', now(), now()),
(2, 2, 'Cover Letter 2', 'CV Title 2', now(), now()),
(3, 2, 'Cover Letter 3', 'CV Title 3', now(), now());

-- 지원내역 테이블
INSERT INTO `apply_employee` (`apply_no`, `cv_no`, `recruit_no`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);
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
           ae.apply_no As applyNo
    FROM cv c
    JOIN apply_employee ae ON c.cv_no = ae.cv_no
    JOIN recruit r ON ae.recruit_no = r.recruit_no
    JOIN user u ON c.user_no = u.user_no
    WHERE r.com_no = 1
    ORDER BY c.cv_reg_date DESC;




