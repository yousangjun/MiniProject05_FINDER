-- Active: 1717080256825@@127.0.0.1@3306@joeun

--이미지 파일 경로 이름/임시이름/경로설정 해야함. 문법은 맞아요.


-- 사용자 (필요할 때 사용)
INSERT INTO user( user_name, user_id, user_pw, user_birth, user_phone, user_email, user_gender )
VALUES ('가회원', 'User', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '20001212', '01012341234', 'LadyGaGa@naver.com', '남자');
INSERT INTO user_auth (user_no, auth) VALUES (1, 'ROLE_USER');

INSERT INTO user( user_name, user_id, user_pw, user_birth, user_phone, user_email, user_gender )
VALUES ('나회원', 'Finder', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '20240101', '01012341234', 'Nada@naver.com', '여자');
INSERT INTO user_auth (user_no, auth) VALUES (2, 'ROLE_USER');

-- 기업 (필요할 때 사용)
INSERT INTO user( user_name, user_id, user_pw, user_birth, user_phone, user_email, user_gender, enabled) 
VALUES ('다기업', 'Com', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '20240101', '01012341234', 'bsh@naver.com', '남자', 2);
INSERT INTO user_auth (user_no, auth) VALUES (3, 'ROLE_COMPANY'); -- 기업권한
INSERT INTO user_auth (user_no, auth) VALUES (3, 'ROLE_USER'); -- 기업권한

-- 이력서 

--유저 1번 -1
INSERT INTO cv (user_no,cv_title,cover_letter,cv_reg_date)
VALUES(1, '이미 준비된 인재, 지금 지원합니다.','Spring Boot를 중심으로 6년간의 개발 경험을 통해 저는 Java 기반의 웹 애플리케이션 개발에 깊은 통찰력을 얻었습니다. Spring Boot는 제가 즐겨 사용하는 프레임워크로, 빠르고 효율적인 개발을 가능하게 합니다. 특히 MyBatis와의 조합에서는 데이터베이스 연동과 관리를 효율적으로 처리할 수 있어 제 프로젝트에 항상 중심적인 역할을 하였습니다.

저는 단순한 개발 능력을 넘어 사람들을 이끌어 나가는 데 자신감을 가지고 있습니다. 이는 제가 협업과 의사소통에 높은 가치를 부여하고 있기 때문입니다. 팀의 일원으로서 프로젝트를 성공적으로 이끌어가기 위해 항상 열린 마음으로 다양한 의견을 수렴하며, 동료들과의 긍정적인 관계를 유지하고 협력하는 것을 중요시합니다. 이러한 저의 접근 방식은 팀워크를 강화하고 프로젝트의 성과를 최대화하는 데 기여했습니다.

저는 Spring Boot와 MyBatis를 활용하여 다양한 규모의 프로젝트에서 성공적인 경험을 쌓았으며, 이를 통해 소프트웨어 개발에서의 품질과 효율성을 높이는 방법을 잘 알고 있습니다. 입사 후에도 항상 새로운 기술을 배우고 발전시키며, 동료들을 이끌어가는 리더십을 발휘하여 팀의 목표 달성에 기여할 것입니다.'
, now());

INSERT INTO education (cv_no, university, major, university_status)
VALUES(1, '인재대', '정보통신학과', '학사');

-- 문법은 맞음 근데 경로나 이런거 바꿔야합니다 *** 2번 이력서도 있긴한데 안 쓸거면 추가할 필요x
INSERT INTO file (parent_table, parent_no, file_name, origin_name, file_path, file_size, reg_date, file_code)
VALUES ('resume', 1, '임시 파일명', '임시 원본명', '/staic/img/경로', 0, NOW(), 1);



INSERT INTO employment_history(cv_no, organization, start_date, end_date,duties)
VALUES(1, '더좋아기관', '2021.04.03', '2024.03.04', '
ChatGPT
"저는 전 회사에서 Spring Boot와 MyBatis를 활용하여 웹 애플리케이션 개발을 주도했습니다. 데이터베이스 연동 및 관리, RESTful API 설계와 구현을 담당하였고, 특히 성능 최적화와 보안 강화에 기여했습니다. 동료들과의 원활한 협업을 통해 프로젝트 일정을 준수하며, 사용자 요구를 충족시키는 안정적인 서비스를 제공하였습니다."');


--이력서 유저2번
INSERT INTO cv (user_no,cv_title,cover_letter,cv_reg_date)
VALUES(2, '맡은 일에 진심을 담아, 함께 성장할 준비가 되어 있습니다', '
데이터의 세계에서의 여정은 나에게 무한한 자신감을 주는 소중한 여정입니다. 6년 전, 데이터베이스 대회에서 우승하며 시작한 이 경험은 저의 기술적 능력을 확인하는 계기가 되었습니다. 그 이후로 저는 데이터 엔지니어로서 다양한 프로젝트에 참여하며 실력을 쌓아왔습니다. 코드와 데이터가 조화를 이루는 그 순간마다 저는 새로운 도전에 자신감을 가지고 접근합니다. 문제를 해결하는 과정에서는 항상 창의적이고 효율적인 방법을 모색하며, 이를 통해 제 기술적 역량을 지속적으로 발전시키고 있습니다.

특히 Java와 관련된 능력에 있어서도 저는 높은 자신감을 가지고 있습니다. 객체지향 프로그래밍의 원리를 깊이 있게 이해하고, 이를 실제 시스템 구축에 적용하는 경험을 여러 차례 쌓아왔습니다. 대용량 데이터 처리와 관련된 복잡한 과제도 두려워하지 않고 도전했으며, 그 결과로 저의 기술적 역량을 한 단계 더 발전시킬 수 있었습니다.

앞으로도 저는 데이터 엔지니어로서의 자리를 더욱 견고히 다지고, 기술적 혁신을 이끌어가는 주역이 되기 위해 끊임없는 노력과 도전을 감행할 것입니다. 데이터의 힘을 믿고, 변화와 혁신을 선도하는 전문가로서의 존재감을 확고히 해 나갈 것입니다.'
, now());

INSERT INTO education (cv_no, university, major, university_status)
VALUES(2, '인하공전', '컴퓨터소프트웨어학과', '학사');


INSERT INTO employment_history(cv_no, organization, start_date, end_date,duties)
VALUES(2, '더조은기관', '2021.04.03', '2024.03.04', '
"더조은기관에서 데이터베이스 관리 및 최적화를 담당했습니다. 시스템 성능 개선과 데이터 보안 강화를 위해 주도적으로 작업하며, 복잡한 쿼리 작성과 데이터 모델링에도 기여했습니다."');

INSERT INTO file (parent_table, parent_no, file_name, origin_name, file_path, file_size, reg_date, file_code)
VALUES ('resume', 2, '임시 파일명', '임시 원본명', '/staic/img/경로', 0, NOW(), 1);



--기업 더미 데이터

INSERT INTO company (com_no,com_name, com_category, com_address, com_business, user_no)
       VALUES (1,'HJB 주식회사', '소프트웨어 및 기술', '서울특별시 강남구 역삼동 123번지', '소프트웨어 개발 및 컨설팅', 1);

INSERT INTO company_detail (com_info_no, com_no, com_represent, com_url, com_birth, com_size,
                            com_emp_count, com_sales, com_content, com_vision,
                            com_welfare, com_avg_salary)
VALUES (1, 1, '홍준범', 'www.HJBdea.com', '2011', '대기업',
        4000, 7000, '소프트웨어 기술 개발을 전문적으로 연구하는 회사입니다.', '전세계가 사용할 만큼 관리하기 쉬운 소프트웨어 개발 리더',
        '숙소 제공, 노트북 지원, 자격증 지원', 7000);


INSERT INTO company (com_no, com_name, com_category, com_address, com_business, user_no)
VALUES (2, 'BSH 주식회사', '정보기술 서비스', '서울특별시 영등포구 여의도동 456번지', 'IT 인프라 구축 및 관리', 2);

INSERT INTO company_detail (com_info_no, com_no, com_represent, com_url, com_birth, com_size,
                            com_emp_count, com_sales, com_content, com_vision,
                            com_welfare, com_avg_salary)
VALUES (2, 2, '백승헌', 'www.BSHcomcom.com', '2005', '중견기업',
        5000, 4000, '다양한 IT 솔루션과 서비스를 제공하는 기업입니다.', '고객 만족을 최우선으로 하는 글로벌 IT 리더',
        '휴가 지원, 헬스 클럽 멤버십 제공', 5500);

INSERT INTO company (com_no, com_name, com_category, com_address, com_business, user_no)
VALUES (3, 'USJ 주식회사', '통신 및 네트워킹', '서울특별시 송파구 잠실동 789번지', '통신 장비 제조 및 판매', 1);

INSERT INTO company_detail (com_info_no, com_no, com_represent, com_url, com_birth, com_size,
                            com_emp_count, com_sales, com_content, com_vision,
                            com_welfare, com_avg_salary)
VALUES (3, 3, '유상준', 'www.USJlllllll.com', '2008', '중소기업',
        3500, 3000, '고품질의 통신 장비를 생산하는 기업입니다.', '글로벌 시장에서 최고의 품질과 기술력을 인정받는 기업',
        '연말 보너스, 통신비 지원', 3800);

INSERT INTO company (com_no, com_name, com_category, com_address, com_business, user_no)
VALUES (4, 'JJB 주식회사', '디지털 마케팅 솔루션', '서울특별시 마포구 서교동 789-1번지', '디지털 마케팅 플랫폼 제공', 1);

INSERT INTO company_detail (com_info_no, com_no, com_represent, com_url, com_birth, com_size,
                            com_emp_count, com_sales, com_content, com_vision,
                            com_welfare, com_avg_salary)
VALUES (4, 4, 'JJB', 'www.JJBASD.com', '2013', '중소기업',
        1200, 800, '디지털 마케팅 솔루션 개발 및 제공하는 회사입니다.', '세계적으로 신뢰받는 디지털 마케팅 리더',
        '유연한 근무 시간, 원격 근무 지원', 5000);

INSERT INTO company (com_no, com_name, com_category, com_address, com_business, user_no)
VALUES (5, '더조은 주식회사', '피트니스 서비스 및 운동기구', '서울특별시 강서구 화곡동 567-2번지', '피트니스 운동기구 제조 및 판매', 1);

INSERT INTO company_detail (com_info_no, com_no, com_represent, com_url, com_birth, com_size,
                            com_emp_count, com_sales, com_content, com_vision,
                            com_welfare, com_avg_salary)
VALUES (5, 5, '더좋다', 'www.fitnessworks.com', '2007', '중소기업',
        900, 600, '다양한 피트니스 운동기구를 제조 및 공급하는 기업입니다.', '사람들의 건강 증진을 돕는 글로벌 피트니스 리더',
        '체육시설 이용 제공, 연차 휴가 추가 지원', 4500);


-- 채용공고 
INSERT INTO recruit (com_no, recruit_title, recruit_content, recruit_responsibilities, 
                     recruit_qualifications, recruit_preferred_qualifications, recruit_reg_date)
VALUES 
    (1, 'Spring Boot 경력직 구하고 있습니다.'
    , '
우리 회사는 소프트웨어 기술 개발을 전문적으로 연구하는 기업입니다.

우리는 혁신적인 기술을 통해 다양한 산업의 변화를 선도하며, 고객의 비즈니스 성과를 최대화하는 솔루션을 제공합니다.
특히 우리는 협력 툴과 언어 개발 분야에서 깊이 있는 전문 지식을 보유하고 있습니다. 이를 통해 고객사의 다양한 요구사항에 맞춤형 소프트웨어를 제작하며, 최신 기술과 방법론을 적용하여 탁월한 결과를 도출합니다.

우리 회사의 특징은 고객과의 긴밀한 협력을 통해 실현됩니다. 우리는 고객의 요구를 정확히 파악하고, 그에 맞춰 최적의 소프트웨어 솔루션을 개발하는 데 중점을 둡니다. 또한, 우리는 항상 고객의 입장에서 생각하며, 지속적인 피드백과 개선을 통해 고객 만족도를 높이는 데 주력합니다.

우리 회사의 장점은 개발한 소프트웨어 도구를 자주 외근에서도 설치하러 다니며 직접적인 지원을 제공하는 점입니다. 이는 우리의 제품이 고객의 업무 효율성을 극대화하고, 현장에서의 실시간 문제 해결을 지원할 수 있음을 의미합니다. 우리 팀은 항상 신속하고 유연한 서비스 제공을 목표로 하며, 고객의 요구를 적극적으로 듣고 반영하여 최고의 결과물을 보장합니다.

우리는 혁신적인 소프트웨어 개발을 통해 산업의 선두를 달리고 있으며, 인재로서의 성장과 기여를 원하시는 분들의 지원을 환영합니다.','소프트웨어 관련해 연구 및 개발을 하고 있습니다.', 
     '소프트웨어 관련 분야의 학사 학위','RESTful API 및 마이크로서비스 아키텍처 경험자 우대', '2024-06-20');

INSERT INTO recruit_keyword (recruit_keyword,recruit_no)
VALUES ('SpringBoot', 1), ('Java', 1);

-- 
INSERT INTO recruit (com_no, recruit_title, recruit_content, recruit_responsibilities, 
                     recruit_qualifications, recruit_preferred_qualifications, recruit_reg_date)
VALUES 
    (2, '데이터베이스 관리자 모집하고 있습니다.',
     '
우리 회사는 소프트웨어 기술 개발을 전문적으로 연구하는 기업입니다. 우리는 혁신적인 기술을 통해 다양한 산업의 변화를 선도하며, 고객의 비즈니스 성과를 최대화하는 솔루션을 제공합니다. 우리는 특히 TmaxTibero 데이터베이스를 다룰 줄 아는 전문가와 쿼리 최적화에 능숙한 개발자를 찾고 있습니다. 이를 통해 데이터베이스 관리 및 성능 최적화를 효과적으로 수행하며, 고객의 요구사항에 맞춘 솔루션을 제공합니다.

우리 회사의 특징은 고객과의 긴밀한 협력을 바탕으로 소프트웨어 개발에서의 우수성을 실현합니다. 우리는 고객의 비즈니스 요구를 정확히 이해하고, TmaxTibero 데이터베이스를 효율적으로 관리하며 최적화하는 경험을 통해 고객 만족도를 높이고 있습니다.

우리 회사의 장점은 최신 기술과 방법론을 적용하여 고객의 데이터 관리 및 분석 요구를 해결하는 데 중점을 둡니다. 우리는 TmaxTibero와 같은 데이터베이스 기술을 전문적으로 활용하며, 신속하고 정확한 쿼리 실행을 통해 고객의 비즈니스 프로세스를 지원합니다. 우리 팀은 항상 고객 중심의 개발을 목표로 하며, 고객의 업무 효율성을 극대화하는 데 앞장서고 있습니다.
우리는 데이터베이스 관리와 개발 분야에서 경험과 열정을 가진 인재들과 함께 성장하고자 합니다.
TmaxTibero 데이터베이스와 관련된 전문 지식을 활용하여 우리의 기술적 우수성을 더욱 강화할 수 있는 인재들의 지원을 기다립니다..'
     ,'데이터베이스 유지보수를 하고 있습니다.', 
     '컴퓨터공학 관련 분야의 학사 학위','관계형 및 Oracle 데이터베이스 관리 경험자 우대', '2024-06-19');


INSERT INTO recruit_keyword (recruit_keyword,recruit_no)
VALUES ('TmaxTibero', 2), ('Oracle', 2), ('Mysql', 2), ('MariaDB', 2);

--
INSERT INTO recruit (com_no, recruit_title, recruit_content, recruit_responsibilities, 
                     recruit_qualifications, recruit_preferred_qualifications, recruit_reg_date)
VALUES 
    (3, '임베디드 개발자를 모집하고 있습니다.', 'C언어를 다룰 줄 알며 절차적 문법에 강한 인재를 구합니다.','사람들에게 편의를 주는 IoT를 개발하고 있습니다.', 
     '컴퓨터공학 관련 분야의 학사 학위','하드웨어를 다룰 줄 아는 사람 우대', '2024-04-20');


INSERT INTO recruit_keyword (recruit_keyword,recruit_no)
VALUES ('C', 3), ('C++', 3), ('임베디드', 3);


--

INSERT INTO recruit (com_no, recruit_title, recruit_content, recruit_responsibilities, 
                     recruit_qualifications, recruit_preferred_qualifications, recruit_reg_date)
VALUES 
    (4, '프론트엔드 엔지니어를 모집하고 있습니다.', '리액트를 다룰 줄 알며 디자인에 감각이 있는 사람을 구합니다.','UI/UX관련 개발하고 있습니다.', 
     '컴퓨터공학 혹은 디자인 관련 분야의 학사 학위','포토샵을 다룰 줄 아는 사람 우대', '2024-08-01');


INSERT INTO recruit_keyword (recruit_keyword,recruit_no)
VALUES ('포토샵', 4), ('React', 4), ('HTML', 4), ('JavaScript', 4);

--

INSERT INTO recruit (com_no, recruit_title, recruit_content, recruit_responsibilities, 
                     recruit_qualifications, recruit_preferred_qualifications, recruit_reg_date)
VALUES 
    (5, '헬스 트레이너를 모집하고 있습니다.', '사람들을 다루는데 능한 사람을 구합니다.','여러 사람들의 건강을 책임지는 일을 하고 있습니다.', 
     '체육관련 학과 졸업자','물리치료 전공자 우대', '2024-06-22');


INSERT INTO recruit_keyword (recruit_keyword,recruit_no)
VALUES ('물리치료', 5);

