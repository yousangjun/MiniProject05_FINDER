(
        1,
        1,
        '저는 Java를 주 언어로 사용하며, Spring 프레임워크를 활용한 웹 애플리케이션 개발에 능숙합니다. Spring Boot를 이용해 RESTful API를 설계하고 구현한 경험이 있으며, 프로젝트의 효율성을 높이기 위해 Spring Security를 통한 인증 및 권한 부여 기능을 구현하였습니다.

React를 이용한 프론트엔드 개발에도 능숙하여, 사용자 친화적인 UI/UX를 구현할 수 있습니다. React Hooks와 Context API를 활용하여 상태 관리를 효율적으로 처리하며, 다양한 컴포넌트를 재사용 가능한 형태로 설계하여 코드의 유지보수성을 높였습니다.

데이터베이스는 MySQL을 주로 사용하며, 효율적인 데이터 모델링과 복잡한 쿼리 작성에 자신이 있습니다. 인덱스 최적화와 쿼리 튜닝을 통해 성능을 향상시키고, 데이터 무결성을 유지하는 데 주력하고 있습니다.',
        'Java 애플리케이션 개발 전문가 - 유상준',
        '2024-06-20 01:05:28',
        '2024-06-20 01:09:14'
    ),

(1, '더조은대학교', '컴퓨터공학과', '학사'),
(
        1,
        '삼성',
        '2020-01-01',
        '2021-12-31',
        '데이터베이스 관리자'
    ),

SELECT c.*, r.*, 
       (SELECT GROUP_CONCAT(rk.recruit_keyword SEPARATOR ', ')
        FROM recruit_keyword rk
        WHERE rk.recruit_no = r.recruit_no) AS recruit_keyword
FROM company c
INNER JOIN recruit r ON c.com_no = r.com_no
WHERE r.recruit_no = 33;
