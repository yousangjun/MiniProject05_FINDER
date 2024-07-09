
# FINDER REACT 프로젝트 발표 + 시연 영상
![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/98a09fd3-9397-4c57-bae6-df7a352ac844)


# **주요기능**

## 시연 영상

준비중입니다.

## **맡은 역할**

### **팀장**
- 팀장을 맡아 협업 과정에서 Git을 중심으로 팀의 코드 관리를 담당했습니다. 이 역할에는 팀원들이 작성한 코드를 리뷰하여 이해하고, 오류를 사전에 식별하여 수정하는 과정과, 커밋 전에 코드의 정확성을 확보하고, 필요한 경우 코드를 머지하는 작업도 수행하였습니다. 이 과정을 통해 프로젝트의 코드 품질을 유지하고, 개발 진행 상황을 원활하게 관리할 수 있었습니다.

### **기업 기능**

- **CRUD 기능 개발**: 기업이 채용공고를 생성, 읽기, 수정, 비동기 삭제 할 수 있는 기능을 구현했습니다.
- **상세 채용공고 조회**: 구직자가 채용공고의 상세 정보를 볼 수 있는 페이지를 개발했습니다.
- **이력서 평가 및 통보**: OPEN AI API를 활용해 제출된 이력서를 평가하고, 합격 또는 불합격 여부를 통보하는 기능을 구현했습니다.
- **파일 기능 개발:** 파일 등록과 삭제를 구현하였습니다.

### **구직자 기능**

- **이력서 제출**: 구직자가 원하는 채용공고에 원하는 이력서를 제출할 수 있는 기능을 개발했습니다.
- **합/불 여부 확인**: 구직자가 자신이 지원한 채용공고에 대한 합격 또는 불합격 여부를 확인할 수 있는 기능을 구현했습니다.

### **최근 본 채용공고 기능**

- **해쉬 맵 활용**: 현재 `useContext`에 있는 구직자 번호와 현재 보고 있는 채용공고 번호를 해쉬 맵에 저장했습니다.
- **리스트 응답**: 구직자가 최근 본 채용공고 페이지에 들어가면, 해쉬 맵의 키와 값을 확인해 리스트 형태로 최근 본 채용공고를 응답해주었습니다.

### **인피니티 스크롤**

- 채용공고 목록을 효율적으로 제공하기 위해 페이징을 기본으로 하면서도, 스크롤 이벤트를 활용해 조건이 확인되면 Axios를 사용하여 추가 데이터를 로드하는 무한 스크롤 기능을 구현했습니다.
    1. **페이징 기능**
        - **기본 페이징**: 초기 페이지 로드 시, 기본적으로 일정 수의 채용공고를 표시합니다.
        - **페이지 번호**: 페이지 번호를 통해 사용자가 직접 다음 페이지로 이동할 수 있습니다.
    2. **무한 스크롤 기능**
        - **스크롤 이벤트 감지**: 사용자가 페이지를 아래로 스크롤할 때 스크롤 위치를 감지합니다.
        - **조건 확인 및 Axios 요청**: 스크롤 위치가 페이지 하단에 도달하면, Axios를 사용하여 서버에 추가 데이터를 요청합니다.
        - **응답 처리**: `card.jsx` `component` 를 사용하여 채용공고 상태를 관리하고, 추가 채용공고 카드를 현재 페이지에 동적으로 추가합니다.
    3. **구현 방법**
        - **HTML 및 CSS**: 기본 페이징 구조와 카드 레이아웃을 작성했습니다.
        - **API**: Intersection Observer API를 활용한 스크롤 이벤트와 Axios 요청을 처리했습니다.
    4. **오류 노트**
        
        [OPEN AI API Troubleshooting](https://www.notion.so/OPEN-AI-API-Troubleshooting-edb6e47fb9ab4db4b8475ec18a66128c?pvs=21)
        

### **실시간 검색 기능 구현**

- 채용공고 검색 기능을 개선하기 위해 Bootstrap과 Axios를 활용하여 실시간 검색 기능을 구현했습니다. 사용자가 입력한 검색어에 맞는 기업명을 보여주고, 기업명에 마우스를 올리면 해당 기업의 채용공고를 표시하는 방식으로 개발했습니다.
    1. **실시간 검색 기능**
        - **검색어 입력**: 사용자가 검색어를 input 요소에 입력하면, Axios를 사용하여 서버에 요청을 보냅니다.
        - **응답 처리**: `keyword.jsx` `component`를 사용하여 서버에서 응답한 데이터를 관리하며, 검색어와 일치하는 기업명을 실시간으로 표시합니다.
    2. **기업명에 마우스 오버 이벤트**
        - **이벤트 처리**: 기업명에 마우스를 올리면, Axios를 사용하여 서버에 해당 기업명의 채용공고를 요청합니다.
        - **응답 처리**: 서버에서 `searchRecruit` `component`를 사용하여 응답 받은 데이터를 관리해 해당 기업의 채용공고를 표시합니다.
    3. **구현 방법**
        - **Bootstrap 사용**: 깔끔한 디자인과 사용자 경험을 향상시키기 위해 Bootstrap을 사용하여 UI를 구성했습니다.
        - **Axios 사용**: 실시간으로 데이터를 주고받기 위해 Axios 기능을 활용했습니다.

### **OPEN AI API 이력서 평가**

- 구직자의 이력서 평가를 자동화하기 위해 OPEN AI API를 활용했습니다. API의 앱 키를 생성하고, API 설명에 따라 데이터를 초기화한 후, 미리 정의한 프롬프트와 기업의 키워드, 구직자의 자기소개서를 기반으로 평가 결과를 Axios로 요청해 기업에게 표시하는 기능을 구현했습니다.
    1. **OPEN AI API 설정**
        - **API 키 생성**: OPEN AI API의 앱 키를 생성하여 인증 및 데이터 초기화를 수행했습니다.
        - **프롬프트 정의**: 기업의 키워드와 구직자의 자기소개서를 평가할 수 있도록 프롬프트를 미리 정의했습니다.
    2. **Axios 요청 및 응답 처리**
        - **Axios 요청**: 기업의 키워드와 구직자의 자기소개서를 포함한 데이터를 Axios를 사용하여 OPEN AI API에 요청했습니다.
        - **응답 처리**: OPEN AI API로부터 받은 평가 결과를 처리하여, 이를 SweetAlert를 활용해 기업에게 표시했습니다.
    3. **구현 방법**
        - **HTML 및 JavaScript**: 사용자 인터페이스를 구성하고, Axios 요청 및 응답 처리를 구현했습니다.
        - **SweetAlert**: 평가 결과를 사용자에게 깔끔하고 직관적으로 표시하기 위해 SweetAlert를 사용했습니다.
    4. **오류 노트**
        
        [OPEN AI API Troubleshooting](https://www.notion.so/OPEN-AI-API-Troubleshooting-dc64b849298b4913b4c50075c2a13b38?pvs=21)


## 목차
### 1. 프로젝트 개요
  - 프로젝트 주제
  - 주제 선정 배경
  - 기획 의도
  - 활용방안 및 기대효과
### 2. 프로젝트 구조
  - 주요 기능 요약
  - 메뉴 구조도
### 3. 프로젝트 팀 구성 및 역할
### 4. 프로젝트 수행절차 및 방법
  - 수행 절차
  - 수행 방법
### 5. 프로젝트 수행 경과
  - 요구사항 정의서
  - 기능 정의서
  - ERD
  - 테이블 정의서
  - 화면 설계서
  - MVC ⚙ REST
  - JWT ⚙ SPRING SECURITY
  - 실제 화면 UI
### 6. 자체 평가 의견
  - 개별 평가
  - 종합 평가


# 1. 프로젝트 개요
## 1-1. 프로젝트 주제
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/9bc0d384-969a-4862-9e72-8ecece3c78f0)


## 1-2. 주제 선정 배경
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/84df17d6-6acf-469a-9e07-7c33e05f6316)


## 1-3. 기획의도
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/87d9328c-2652-493e-8a25-0a85d458491f)


## 1-4. 활용 방안 및 기대효과
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/4f347318-04d9-4af9-ad58-ceb6201f7ef2)


# 2. 프로젝트 구조
## 2-1. 주요기능

#### - 공통 ( 회원가입 / 로그인 / 로그아웃 / 마이페이지 / 채용공고 조회 )
#### - 구직자 ( 이력서 작성 / 채용공고 지원 / 합불 여부 확인 )
#### - 기업 ( 결제 / 채용공고 작성 / 제출된 이력서 조회 / AI 간편 평가 / 합불 평가 )


![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/f38e061a-ec14-4522-b9cc-59ec80d511cc)


## 2-2. 메뉴 구조도
<details>
<summary><h3>Site Map 👆</h3></summary>

![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/2053216c-af3c-4e67-b7aa-8c00db307e63)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/01fa1cf7-4013-4daa-a5ec-77089715afe4)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/a57221e7-51d5-4570-b3d0-1bfd022bcc61)
</details>


# 3.프로젝트 팀 구성 및 역할
#### 인원 : 4명

![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/8b56d78a-29d8-4032-aca4-a7ff405b50fd)
![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/bf0b6e71-1610-411c-9734-11e49ca6d26e)
 
# 4. 프로젝트 수행절차 및 방법
## 4-1. 프로젝트 수행 절차
#### 2024-06-14 ~ 2024-07-05
![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/96521eb9-29f6-44f9-8564-4989654fac1c)



## 4-2. 수행 방법
#### 사용 언어와 협업툴
![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/19b6e0ec-dfd2-4ba0-8ea5-dc89c5fd24e3)



# 5. 프로젝트 수행 경과
## 5-1. 요구사항 정의서
<details>
<summary><h3>요구사항 정의서 👆</h3></summary>
 
![image](https://github.com/JJB03/Project05_FINDER/assets/160222162/3e10d519-e56a-4d52-812a-7e3defede2b0)
</details>

 ## 5-2. 기능 정의서
<details>
<summary><h3>기능 정의서 👆</h3></summary>
<h5>사용자</h5>
 
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/01b59191-e05c-4da9-8014-a8feda3a20dd)
<h5>기업</h5>

![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/82e00c87-1da4-449c-b27f-ca8e4067e6d5)
<h5>API</h5>

![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/859d57ce-e0f7-43bc-86ee-3619ffa03896)
</details>

## 5-3. ERD
<details>
<summary><h3>ERD 👆</h3></summary>
 
![image](https://github.com/JJB03/Project05_FINDER/assets/160222162/815f99ba-d9fe-478b-8ae2-639c9e94b3d5)
</details>

## 5-4. 테이블 정의서
<details>
<summary><h3>테이블 정의서 👆</h3></summary>

![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/31a7412e-0f66-4470-afab-b0f07994ec8e)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/37a1656b-2859-4b15-b6aa-d4e3b80e1ca3)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/a70d0d8f-fca5-4a9a-9bbb-a559486b80d5)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/bff034bf-5ad9-4358-964b-719bffe974d9)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/abc1ba28-978e-4272-92f2-f0a0d35b4ebb)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/0216cf0a-22f1-408a-bcb7-7bb49f256f3f)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/4e5fddf9-200b-4785-bb54-8130a7b395d3)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/5e887227-8312-4fb3-aa22-b206cffe0c71)
 
</details>

## 5-5. 화면 설계서
<details>
<summary><h3>공통 👆</h3></summary>
<div markdown="1">

![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/7378756a-c5af-418f-82dc-dbe51868cec7)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/abffdb86-3b0e-40d8-b6bc-2ccb1d4bdf6c)

</div>
</details>

----

<details>
<summary><h3>구직자 👆</h3></summary>
<div markdown="1">

 
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/60542067-4706-48ca-a2e3-2b8962e7a3dd)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/7176da0b-2038-47ed-b007-22ebd232a2d5)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/be792f3e-a8d9-47c3-a2df-2518fa8cab71)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/9e1e615d-2f54-400a-a804-99f1da70c210)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/cf6eb543-19ad-472d-adf3-9b7b13b83711)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/d8ca99ac-29fc-49cd-b4d0-e1e8f2e2e67d)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/bda63248-7923-46c9-9278-e064d25774ac)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/e357d61d-2cef-4ab1-9bc4-4abbb4be0387)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/ae862e3c-9841-4a51-9080-71ca142c96b9)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/e68b6367-85cd-4087-a22c-9d72ac9ede59)

</div>
</details>

----

<details>
<summary><h3>기업 👆</h3></summary>
<div markdown="1">

![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/190682c8-9509-4b16-87e7-93adcfa7d50c)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/c3ea4e01-ab96-4cf7-9ad0-dc7fcc1e7a49)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/2c62c422-f38f-40d9-a3d8-c2fc0c54e8f8)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/a83da684-a31b-4afa-901d-4008f44c6a63)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/dfb6224a-475a-425c-9afb-d2101f9abd3b)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/fa3b9345-518a-4df9-a995-b4a7e89c1172)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/6356e49b-ce1a-4a92-bbc9-6de2037ed44f)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/f6377004-f722-4102-9909-67cc648fa2aa)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/b3b03898-6358-44c5-a043-b7a737c1a35a)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/ef3c3920-1d57-4d34-8149-790db53d4b01)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/099276d3-2ef0-4076-925d-d0cb9f02349b)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/6e9ace38-664b-4cb9-b7b7-fee6c3c0a98c)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/0bd3e934-5d7a-4968-a751-3df17df705da)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/a5c81ef4-1fef-4b5b-951d-1dba98137e1c)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/11420e42-b374-451e-8254-b751bc1c4698)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/630f037e-3c73-44d6-809a-b6b2cf3fdad8)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/5c998135-90af-45e8-a28a-5db7fb6007a1)
![image](https://github.com/JJB03/Project05_FINDER/assets/121448554/30023528-ca1c-472e-9921-b9b79fb4c4c8)


</div>
</details>

----
## 5-6. MVC ⚙ REST
### MVC와 REST 방식 중 저희는 REST 방식을 채택하였습니다.
#### REST는 state 관리, 다양한 데이터 형식 지원, 서버단과 클라이언트단을 구분하여 개발할 수 있습니다. 서버에서 데이터를 보내면 클라이언트에서 데이터를 받아 라우팅하는 방식으로 개발의 확장성과 유연성을 높일 수 있습니다.
![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/e89009d3-1c21-4643-aa0d-ec342c6edb6b)
![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/e5227883-e2d0-43a7-8059-91ae794554a8)



## 5-7. JWT SPRING ⚙ SECURITY
### JWT는 무상태성으로 서버 확장에 유리하며, 자체적으로 정보를 포함해 세션 관리 없이도 인가와 인증을 간편하게 합니다.
![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/1b96a462-2a17-47bb-8586-fb05f6021b46)


## 5-8. 프로젝트 실제 화면 UI
<details>
<summary><h3>공통 👆</h3></summary>
<div markdown="1">


</div>
</details>

----

<details>
<summary><h3>구직자 👆</h3></summary>
<div markdown="1">


</div>
</details>

----

<details>
<summary><h3>기업 👆</h3></summary>
<div markdown="1">


</div>
</details>

----


# 6. 자체 평가 의견
## 6-1. 개별 평가

### 유상준
![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/eb1c8dec-181a-4633-85d6-367b6ae2d290)

### 정주빈
![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/8bdc12b4-b78e-45be-9924-d05fff8b4df9)

### 홍준범
![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/525d6419-4227-4bac-b012-453767a95025)
   
### 백승헌
![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/b8c7dfe6-f40b-494d-8c8c-4f0f23d97e46)



  

## 6-2. 종합 평가

![image](https://github.com/yousangjun/MiniProject05_FINDER/assets/121448554/9d8f5acb-565a-4941-8857-c2ee860a41c1)






## 참조
- 
- 
