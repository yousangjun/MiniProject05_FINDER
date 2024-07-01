# 1. REST 전환
1일
**준범**
채용 도메인

**승헌**
기업,메인 도메인

**상준**
회원 도메인

**주빈**
이력 도메인



# 2. JWT 토큰 인증 전환
2일


# 3. React 전환
4일

CSS이름 = jsx이름 이랑 같은 이름으로 만들어야함 ( className = 겹치지 않게 만들어서 스타일 입히기! )

컴포넌트 --------------------------------------------------------------
더 남은 것들 ( 최근 본 이력서 , 내 이력서 , 비밀 번호 찾기 (회원/기업) ) 


➡ 승헌
⭕헤더 
⭕푸터
⭕com_detail_user
⭕credit 전체
❌detail_jobs_user (상세채용공고)



➡ 준범
⭕컨텐츠헤더
⭕컨텐츠사이드바
⭕컨텐츠리스트아이템 (키워드까지 하면됨)
⭕카드 (키워드까지 하면됨)
⭕app~
⭕new~
⭕list
❌post_jobs_com
❌post_jobs_read_com 비슷함 알아서 하면됨

⭕버튼 숏 in숏 롱 
⭕index



➡ 상준
⭕페이징 (Company Component 에 있다)
⭕login
❌find_com, ❌find_user
⭕join_com, ⭕join_user, ❌social
❌update_user




➡ 주빈
⭕컨텐츠 타이틀
⭕에러
⭕introduce_com
❌cv_create_user
❌cv_read_user
