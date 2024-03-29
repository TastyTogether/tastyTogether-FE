# Tasty Together : 맛집에 진심인 당신을 위한 솔직 리뷰 사이트

## 서비스 소개

- 가짜 맛집 리뷰에 지친 사람들을 위한 정직한 식당 리뷰 사이트
- 사용자가 직접 맛집을 등록해 공유해 주는 사용자 중심 커뮤니티 사이트 
- 혼밥이 두려운 사람을 위한 혼밥 메이트 찾기 게시판 서비스 제공

## 페르소나

![김구름](https://github.com/TastyTogether/tastyTogether-FE/assets/128280275/2b70b87c-6eb9-473c-8ef6-d4cfec93b222)


<br />

<!--
## 데모 사이트
 - URL : http://kdt-sw-5-2-team08.elicecoding.com/
    - Test ID : test1@naver.com
    - Test PW : qwer1234 
 <div>
-->

![타이틀](https://github.com/TastyTogether/tastyTogether-FE/assets/128280275/87b16762-d343-44df-8036-3973974e2712)



<br />

 ### 세부 기능

 <details><summary>회원가입</summary>

- 이메일 및 닉네임 중복 검사 기능
- 입력 양식 유효성 검사 및 실시간 결과 안내
    - 프론트: 정규표현식(RegExp) 활용
    - 백: express-validator와RegExp 활용
    - 입력 양식을 모두 충족해야 제출 가능
- 비밀번호 해쉬 기능 (bcrypt 활용)
    - salt 작업
    - 비밀번호 해쉬 with salt
</details>

 <details><summary>로그인</summary>

- 이메일 및 닉네임 중복 검사 기능
- 입력 양식 및 입력 값 유효성 검사
- 로그인 상태 관리를 위한 Token 지급
    - Refresh token -> HTTP cookie에 담기
    - Access token -JSON body에 담기
- 보안을 고려한 Token 생성
    - Refresh token -> Node.js 모듈 crypto 활용
    - Access token -> JWT 활용
- 로그인 후 자동 페이지 이동 기능
    - 원래 이동하고자 했던 페이지로 이동 기능
    - 없는 경우 메인 페이지로 이동

</details>

 <details><summary>마이페이지</summary>

  - 게시글, 리뷰, 북마크 버튼을 통해 내가 작성하거나 북마크한 정보 확인 가능
  - 각 게시물에 마우스 hover 시 상세 정보 Text로 확인 가능
  - 프로필 수정 버튼 클릭 시 프로필 수정이 가능한 모달 창 출력
  - 중복 확인 버튼 클릭 시 닉네임 중복 확인 가능

</details>

 <details><summary>가게 등록</summary>

- 다음 주소 api를 활용한 주소 검색 기능
- 카카오 지도 api를 활용한 주소 검색 결과의 위치가 지도에 표시되는 기능
- 업체명과 업체 주소를 기반으로 가게 중복에 대한 확인 문구 출력 기능
- fileReader를 활용한 이미지 업로드 기능

</details>

 <details><summary>가게 상세 페이지</summary>

- 가게 정보 조회 및 조회수 카운트 기능
    - DB에 저장된 가게 정보 조회 
    - 조회에 따른 조회수 증가 기능
- 북마크 기능
    - 로그인된 유저의 경우 북마크 여부에 따라 북마크 버튼 활성화 및 비활성화 기능
    - 북마크 버튼을 누를 경우 바로 북마크 수 증감 카운트 반영 기능
- 리뷰 작성, 게시물 작성 기능
    - 로그인된 유저의 경우 리뷰 작성과 게시물 작성 링크로 이동 가능
- 가게 정보 수정 기능
- 해당 가게 길찾기 기능
    - 카카오 API를 이용해 해당 가게가 도착지로 설정된 카카오 길찾기로 이동
- 게시물 확인 기능
    - 해당 가게와 같은 지역의 메이트 게시물이 있을 경우에 게시물의 내용을 간략하게 보여주고 
      로그인 유저의 경우 클릭 시 게시물로 이동 가능.

</details>

 <details><summary>가게 정보 수정</summary>

 - 가게 정보 수정 페이지 입력 폼을 모두 작성하면 가게 정보가 수정되고 해당 가게 상세페이지로 이동.

</details>

 <details><summary>리뷰</summary>

 - 조회 기능
    - 가게 상세페이지 하단에서 해당 가게의 리뷰들을 조회.
- 삭제 기능
    - 현재 로그인한 유저와 리뷰 작성자의 id 값을 비교하여 값이 같은 경우에만 리뷰 삭제 버튼이 보이며 삭제 가능.


</details>

 <details><summary>가게 검색 페이지</summary>

- 검색 기능(mongoDB full-text search)
    - 공백도 인식하여 키워드를 반환하기 때문에 검색창의 키워드가 없으면 아무것도 뜨지 않고, 여러 키워드를 동시에 입력하면 공백을 이용하여 분리할 수 있다.
    - 글자의 일치도가 높은 순서대로 반환된다.
- 지도기능
    - 카카오맵 API 와 연동되어 있으며, 검색된 가게 정보에 저장되어 있는 주소를 이용하여 위도, 경도로 변환해 지도에 가게 위치 마커 표시 가능,
    - 한 페이지당 5개의 아이템을 출력하여 현재 페이지의 아이템들에 대한 위치 정보를 다중마커로 표시.
    - 한 페이지에 있는 가게 위치 정보를 지도의 한 페이지에 담기 위해 확대/축소 기능이 자동으로 조정되며, 사용자 임의로 확대와 축소가 가능함.
- 정렬기능
    - 카테고리: 평점순, 리뷰순, 찜한순 검색기 결과를 오름차순으로 정렬 가능.
    - 기본적으로 검색 키워드 및 설정한 필터값에 유사한 아이템이 우선순위로 검색되도록 구현.
- 검색 결과 출력 기능 카테고리
    - 배너이미지, 가게명, 간단한 참고사항(가격대, 주차여부, 휴무일) 평균별점, 찜순 각 카테고리의 요소는 가게정보에 저장된 정보를 받아와서 사용.
    - 검색 결과 페이지에는 중요한 정보만 간략하게 전달하고 각 가게를 클릭하면 해당 가게의 상세 페이지로 이동 가능하도록 기능 추가.

</details>

 <details><summary>게시판 기능 구현</summary>

- Mongo DB search index 기능을 활용하여 지역명을 req.query.value로 사용하여 유저가 지역 별로 게시글을 찾을 수 있도록 검색기능 구현.
- 페이지네이션 기능 구현을 통해 페이지별 게시물의 갯수를 10개로 고정하여 유저가 게시글을 단시간에 파악 할 수 있도록 설정.
- DB sort 기능을 역순으로 적용하여 최신순으로 정렬.

</details>

 <details><summary>개별 포스트/댓글기능</summary>

- form data를 req.body에 post api로 전달하여 음식 이미지를 담은 혼밥메이트 찾기 게시글 작성이 가능하도록 구현.
- 회원가입을 해야만 개별 페이지 조회가 가능하고, 포스트에서 댓글 기능을 통해 메이트 매치가 가능하도록 구현.
- 포스트/댓글 삭제는 현재 로그인한 userld data를 확인하여, 해당글의 작성자인 경우에만 삭제가 가능하도록 삭제 기능 추가.

</details>

 <br/>

 ## 기술 스택

![기술스택](https://github.com/TastyTogether/tastyTogether-FE/assets/128280275/9790bc3c-e440-4b69-bc90-5777c3cc8ed9)


 <br/>

## 👪 구성원 역할
<br />

| 이름 | 포지션 | 담당 업무 |  
| ------ | ------ | ------ |  
|  고윤렬   |  FE,BE   |  회원가입, 로그인, 유저정보   |
|  김수연   |  FE,BE  |  가게상세페이지, 가게정보수정페이지, 가게등록페이지, 가게검색페이지(BE)  |
|  김진규   |  FE   |  공통 헤더&푸터, 메인페이지, 마이페이지, 리뷰작성페이지, 가게검색페이지(FE)  |
|  유환욱   |  BE   |  메인페이지, 마이페이지, 리뷰작성페이지, 리뷰   |
|  소화경   |  FE,BE   |  혼밥메이트게시판, 혼밥메이트개별포스트, 혼밥메이트작성페이지 |


### 폴더 구조
![폴더구조](https://github.com/TastyTogether/tastyTogether-FE/assets/128280275/7da31ec7-1d7d-4d17-8368-762f269447cd)



## 트러블 슈팅
![트러블1](https://github.com/TastyTogether/tastyTogether-FE/assets/128280275/b9870a5e-c047-40ac-803a-aa6f1c54b1fa)
![트러블2](https://github.com/TastyTogether/tastyTogether-FE/assets/128280275/b24ff035-a2f1-499a-8960-4e148902502e)
![트러블3](https://github.com/TastyTogether/tastyTogether-FE/assets/128280275/5f1927ce-472c-4cdd-ad50-69559d28c5c5)
![트러블4](https://github.com/TastyTogether/tastyTogether-FE/assets/128280275/40419b90-5fb7-43fa-81e7-803d7d5b4e0d)




<br />



## 협업 도구

- Notion : 회의록, 진행 상황 및 계획
- gether : 음성 채팅방 활용 의견 제시
- Gitlab : Code Repository
- Gitlab Issue : 오피스아워 질문
- Postman : API 테스트 진행


## 코드 컨벤션
- 변수 : camelCase(lower) 소문자
- 함수 : camelCase(lower) 소문자
- 상수 : UPPERCASE (대문자)
- 선택자 : snake_case(spinal) 소문자
- 파일 : kebab-case(spinal) 소문자
- 컴포넌트 파일 : PascalCase
- 폴더 : lowercase (소문자)
- 스키마 : camelCase(lower) 소문자
- Restful URL : camelCase(lower) 소문자


## 커밋 컨벤션
- Feat : 새로운 기능 추가
- Fix : 버그 수정 또는 typo
- Refactor : 코드 리팩토링
- Style : CSS 등 사용자 UI 변경
- Test : 테스트(테스트 코드 추가, 수정, 삭제, 비즈니스 로직에 변경이 없는 경우)
- Chore : 위에 걸리지 않는 기타 변경사항(빌드 스크립트 수정, assets image, 패키지 매니저 등)
- Init : 프로젝트 초기 생성
- Rename: 파일 혹은 폴더명 수정하거나 옮기는 경우
- Remove : 파일을 삭제하는 작업만 수행하는 경우
- Docs: Documentation만 바뀌는 경우


## 브랜치 전략
- master
- develop
- feature-FE-기능



본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2023 엘리스 Inc. All rights reserved.
