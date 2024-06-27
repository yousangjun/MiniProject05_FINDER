-- Active: 1716771409910@@127.0.0.1@3306@joeun


SELECT u.user_no
        ,u.user_id
        ,u.user_pw
        ,u.user_name
        ,u.user_email
        ,u.ENABLED
        ,u.user_reg_date
        ,u.user_upd_date
        ,auth.auth
        FROM user u 
        LEFT OUTER JOIN user_auth auth ON u.user_no = auth.user_no
        WHERE u.user_id = (
                    SELECT username
                    FROM user_social
                    WHERE provider = 'kakao'
                    AND social_id = 3519236325
                    )