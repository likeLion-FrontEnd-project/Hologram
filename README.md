# 🟣 Hologram 

<img src="https://user-images.githubusercontent.com/76831344/182030827-f8aec420-333a-476d-95c5-9515a9a5f08e.png" width=1200 />

- **URL**: [https://hologram-pi.vercel.app/](https://hologram-pi.vercel.app/)
- **테스트 계정**
  - ID: `hologram-test@hologram.com`
  - PassWord: `hologram1234`

<br>

## 프로젝트 소개
- Hologram은 혼자 사는 사람들의 일상 공유, 자신만의 팁, 고민거리 찬반투표 등 다양한 커뮤니티 활동을 할 수 있는 SNS입니다.
- **Hologram의 주요기능**
  - 일상 공유, 자신만의 팁, 고민거리 찬반투표 등 게시글을 작성하여 유저들간의 소통을 할 수 있습니다.
  - 마음에 드는 게시물이 있다면 상대방을 팔로우하여 소식을 받고 게시글에 댓글을 달고 좋아요를 할 수 있습니다.
  - 상품 판매를 할 수 있으며 판매자의 상품을 확인하고 채팅으로 이동할 수 있습니다.
<br>


## 팀원 소개

|주다빈|서가희|남위정|신현우|
|:---:|:---:|:---:|:---:|
|![image](https://user-images.githubusercontent.com/96808980/179510502-492f3247-fd55-4dea-8d36-97f059c91ca4.png)|![image](https://user-images.githubusercontent.com/96808980/179510353-2a8144c1-f98d-4aed-9b73-ed6447380f80.png)|![image](https://user-images.githubusercontent.com/96808980/179510638-de0e4859-46c5-434c-b637-4dd0609f02a7.png)|![image](https://user-images.githubusercontent.com/96808980/179510712-d3573bee-aee3-4e79-999d-9ddf7f696e98.png)|
|<a href="https://github.com/joodb">🔗 joodb</a>|<a href="https://github.com/seokahi">🔗 seokahi</a>|<a href="https://github.com/Nam-Wijeong">🔗 Nam-Wijeong</a>|<a href="https://github.com/GitHWS">🔗 GitHWS</a>|

<br>


### 기술 및 개발 환경
**1. 기술**
- FrontEnd: HTML, CSS, Vanilla JS
- BackEnd: 제공된 API 사용
  
<br>

**❓ Vanilla JS를 사용한 이유** 
- 처음 진행하는 프로젝트이기에 리팩토링도 경험해보고싶어 먼저 Vanilla JS로 구현 후 React로 리팩토링 할 예정입니다. 
  
<br>

**2. 개발환경** 
  - 브랜치 전략: git-flow
  - 이슈 관리: 🔗[github-Issues](https://github.com/likeLion-FrontEnd-project/Hologram/issues)
  - Prettier
  - Coding Convention: ⚙️[코딩 컨벤션](https://www.notion.so/commit-github-dca83956c8a642e5a4a53359b347755b)
  - Conference: 💬 [진행한 회의록](https://www.notion.so/4e3a8e3e572348f69768a8b7f1464f87?v=64186d1993784fc8b9282109471b3a77)

<br>

**3. 제작 기간**: 2022.6.29 ~ 2022.07.31

<br>


### 역할 분담
**공통 UI**
- 상단바: 팀원 전부
- 하단 탭 메뉴: 남위정
- 유저 목록(팔로워,팔로잉,검색 목록): 주다빈
- 이미지 버튼(프로필, 게시글, 상품): 서가희
- 인풋(회원, 상품): 신현우 
- 모달: 남위정

**주다빈**
- 프로젝트 리드 
- 마이 프로필, 유저 프로필 페이지 구현 및 회원 정보 렌더링
- 팔로워, 팔로잉 리스트 구현 및 렌더링
- 팔로우 기능
- 상품 등록, 수정, 삭제 기능 구현 / 상품 모달 
- 전반적인 프로젝트 UI 디자인

**서가희** 
- 게시글 작성, 수정, 삭제, 신고 기능 구현
- 게시글 상세 페이지 렌더링
- 댓글 작성, 삭제, 신고 기능 구현 
- 채팅 목록 / 채팅방 UI 구현
- 로그아웃

**남위정**
- 피드 페이지 구현 및 팔로워 게시글 렌더링
- 검색 기능 구현
- 좋아요 기능 구현
- 프로필 페이지 게시글 렌더링

**신현우**
- splash
- 로그인 유효성 검사
- 회원가입 유효성 검사, 비밀번호 확인 기능 구현
- 프로필 수정 기능 구현
- 전반적인 프로젝트 UI 디자인
- 프로젝트 배포(Vercel)
- 에러 페이지 구현

<br>

### UI
<img src="https://user-images.githubusercontent.com/76831344/182031996-f37cb0c1-9742-4447-b602-22e44631e044.png" width=1200 />

<br>

### 기능 구현
🔗[기능 상세 설명](https://github.com/likeLion-FrontEnd-project/Hologram/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85)

<div>

|0. Splash|1. 회원가입|2. 로그인|
|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/76831344/182029520-bc2d63b1-bbe6-402a-bfab-29fadb69ed65.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182029555-a76980b9-d70b-42d4-97eb-073a54c98f8c.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182029631-805261fe-ed01-435a-bddb-827f14364a2d.gif" width=245 /> 

<br>


|3. 홈 피드|4. 계정 검색|5. 마이 프로필|
|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/76831344/182029657-29aab0e7-d7ab-4497-a796-7e543833581a.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182029414-20576bb9-1f88-475e-9582-baec0a1b44d4.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182029864-4ae722bd-84f7-48c9-8a5c-509817d92d09.gif" width=245 /> 


<br>

|5-1. 마이 프로필 수정|6. 상품 등록|6-1. 상품 수정, 삭제
|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/76831344/182029776-c0ad77b7-1ede-426d-a132-fd8badb98ac1.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182029791-5ab93c8b-8a3b-49fa-9add-129f545f0454.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182029812-449905f1-6cd2-489d-9447-c4f59c9d8b7d.gif" width=245 /> 

<br>

|6-2. 상품 상세|7. 게시글 등록|7-1. 게시글 수정, 삭제|
|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/76831344/182029949-719250c5-19ed-4039-9e7d-ddfd73bd8ff6.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182030005-13caeb50-8bd0-454b-a9b8-bc816244c767.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182030034-4c30f21b-e5b5-4a7b-8981-f5d3173d8f25.gif" width=245 /> 

<br>

|8.팔로잉, 팔로워 리스트|9. 팔로우 기능|10. 유저 프로필|
|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/76831344/182030082-e3491999-0bf0-49e4-ad36-38970b6cdd89.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182030117-d23ebb4a-e6fa-41cc-a69d-a4fe39245973.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182030337-eff4b3b4-430d-4097-bf77-05a4305b41c5.gif" width=245 /> 
	
<br>

|11. 댓글 생성, 삭제|11-1. 댓글 신고|12. 좋아요, 찬반투표 기능|
|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/76831344/182030194-e4db600d-2dfc-4846-b161-9b6ddf47e7ab.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182030225-f589a818-91aa-40c3-8157-70ccb0f41af2.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182030296-f67ed800-c4a7-4d99-8eb2-e920bca41396.gif" width=245 /> 

<br>

|13. 게시글 신고|14. 채팅 목록 UI, 모달|15. 로그아웃|
|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/76831344/182030365-b5f3c91c-9cd2-46d0-bdd4-ad1a83528371.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182030459-2909c5a5-3ce1-415d-9072-8af8ebb7cfba.gif" width=245 />|<img src="https://user-images.githubusercontent.com/76831344/182030569-1edd1d83-d93f-401a-82f0-b1c8cb1b1100.gif" width=245 /> 

<br>

|16. 에러페이지|
|:---:|
|<img src="https://user-images.githubusercontent.com/76831344/182051625-95bceb51-3d8d-4e4e-aff1-7a63c9f9bd7a.gif" width=245 />|

</div>

<br>

### 폴더 구조
```
- assets/ : 이미지, 아이콘 등 이미지 소스를 저장한 디렉토리 
- favicon/ : favicon을 위한 디렉토리 
- font/ : 공통으로 사용되는 font 적용
- images/ : 웹에서 사용되는 icon, images 디렉토리
- css/ : pages와 html에 연결되는 CSS 디렉토리, default.css는 공통으로 사용되는 CSS파일을 import하여 사용
- html/ : 공통된 UI를 위한 html 디렉토리
- pages/ : 서비스용 html 디렉토리
- js/ : pages와 html과 연결되는 JS 디렉토리. common.js는 pages 공통으로 사용되는 함수가 등록된 파일

🟣Hologram 
├─📂assets
│  ├─📂favicon
│  ├─📂font
│  ├─📂images
├─📂css
├─📂html
├─📂js
└─📂pages

```

<br>

### 핵심기능
- 🔗 [핵심기능에 대한 설명](https://github.com/likeLion-FrontEnd-project/Hologram/wiki/%ED%95%B5%EC%8B%AC-%EA%B8%B0%EB%8A%A5) 에 대한 자세한 내용은 링크 연결해두었습니다.

### 트러블슈팅
- 프로젝트를 진행하는 과정에서 생겼던 트러블슈팅에 대해 정리하였습니다. 
- 🔗 [트러블 슈팅](https://github.com/likeLion-FrontEnd-project/Hologram/wiki/%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85) 에 대한 자세한 내용은 링크 연결해두었습니다.


### 프로젝트를 마치며

<hr>

### 배운점

- 프로젝트 시작 전 코드, 이슈, PR, 커밋 등 컨벤션을 설정
    - 팀원 간의 진행과정을 원활하고 명확하게 보여줄 수 있었습니다.
- 처음 사용해보는 기능들
- 문제 상황에 부딪혔을 때, 혼자 해결하는 것보다 팀원들/멘토분들에게 도움 요청
    - 팀원 간의 신속한 피드백으로 문제를 해결한 경험이 많았습니다.
    - 팀원마다 개인적으로 진행과정 중 실시간으로 기능을 테스트해서 발견한 에러를 신속하게 공유하여 수정할 수 있었습니다.
- QA(Quality Assurance)에 대한 고찰
    - 공백, 글자 수 제한을 두지 않아서 레이아웃이 변경되는 등의 사용자 변수를 다시 한번 생각할 수 있었습니다.
    - 배포 후 테스터를 통해 사용자 경험(UX)에 대해서 한번 더 고민할 수 있었습니다.

### 어려웠던 점

- 깃플로우 브랜치 전략으로 협업
    - 처음 진행하는 팀 프로젝트에서 깃플로우 브랜치 전략을 사용하며 어려움을 겪었습니다.
    - 커밋, 이슈, PR 컨벤션 맞추기, merge 충돌 등의 문제점이 있었습니다.
- 프로젝트 역할분담
    - 프로젝트 초반 고르지 못한 역할 분담으로 중반에 역할을 재분담하여 진행하였습니다.
- 프로젝트 진행과정 중간에 공통 UI 통합
- 생소한 API 명세 사용
    - 처음 다뤄보는 API 명세를 사용하는 방법이 익숙치 않아 프로젝트 초반 어려움이 있었습니다.

### Hologram팀의 스페셜 포인트

- 매일 수업 시작 10분 전에 회의하며 진행상황 공유 및 체크(8시 50분 ~ 9시)
    - 팀 오전 회의를 하루의 루틴으로 정해놓고 온전히 회의에 집중할 수 있었습니다.
    - 팀 노션 [To Do List 페이지](https://www.notion.so/To-Do-List-1479649122df4ecebbe0d769bb594ee9)에 하루 목표 설정해 놓았습니다.
    - 각자 맡은 파트에 마감기한을 정하여 더 책임감 있게 프로젝트를 진행했습니다.

### 아쉬운 점

- 코드의 가독성을 높이기 위한 클린 코드를 작성하지 못한 점이 아쉬웠습니다.
- 에러가 발생할 수 있는 부분을 미리 예상해서 처리하지 못하고 테스트를 통해서만 발견하였습니다.
- 기간내에 Vanilla JS에서 React 리팩토링까지 하고싶었으나 기능 구현에서 시간이 걸려 Vanilla JS로만 구현하였습니다.

