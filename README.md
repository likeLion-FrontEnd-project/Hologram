# Hologram


- **URL**: [https://hologram-pi.vercel.app/](https://hologram-pi.vercel.app/)
- **테스트 계정**
  - ID: `hologram-test@hologram.com`
  - PassWord: `hologram1234`

## 프로젝트 소개
- Hologram은 혼자 사는 사람들의 일상 공유, 자신만의 팁, 고민거리 찬반투표 등 다양한 커뮤니티 활동을 할 수 있는 SNS입니다.
- Hologram의 주요기능
  - 일상 공유, 자신만의 팁, 고민거리 찬반투표 등 다양한 커뮤니티 활동을 할 수 있습니다.
  - 마음에 드는 게시물이 있다면 상대방을 팔로우하여 소식을 받고 게시글에 댓글을 달고 좋아요를 할 수 있습니다.
  - 상품 등록을 통해 판매자의 상품을 확인하고 채팅으로 이동할 수 있습니다.


<br>


### 팀원 소개

|주다빈|서가희|남위정|신현우|
|:---:|:---:|:---:|:---:|
|![image](https://user-images.githubusercontent.com/96808980/179510502-492f3247-fd55-4dea-8d36-97f059c91ca4.png)|![image](https://user-images.githubusercontent.com/96808980/179510353-2a8144c1-f98d-4aed-9b73-ed6447380f80.png)|![image](https://user-images.githubusercontent.com/96808980/179510638-de0e4859-46c5-434c-b637-4dd0609f02a7.png)|![image](https://user-images.githubusercontent.com/96808980/179510712-d3573bee-aee3-4e79-999d-9ddf7f696e98.png)|
|<a href="https://github.com/joodb">🔗 joodb</a>|<a href="https://github.com/seokahi">🔗 seokahi</a>|<a href="https://github.com/Nam-Wijeong">🔗 Nam-Wijeong</a>|<a href="https://github.com/GitHWS">🔗 GitHWS</a>|

<br>


### 기술 및 개발 환경
**1. 기술**
- FrontEnd: HTML, CSS, Vanilla JS
- BackEnd: 제공된 API 사용
  
  ```
  ❓ Vanilla JS를 사용한 이유
  : 처음 진행하는 프로젝트에 라이브러리 사용이 아닌 Vanilla JS를 이용해 JavaScript만으로 제작하였습니다.
  ```
<br>

**2. 개발환경** 
  - 브랜치 전략: git-flow
  - 이슈 관리: 🔗[github-Issues](https://github.com/likeLion-FrontEnd-project/Hologram/issues)
  - Prettier
  - Coding Convention: ⚙️[함께 정한 코딩 컨벤션](https://www.notion.so/commit-github-dca83956c8a642e5a4a53359b347755b)
  - Conference: 💬 [함께 진행한 회의록](https://www.notion.so/4e3a8e3e572348f69768a8b7f1464f87?v=64186d1993784fc8b9282109471b3a77)


### 역할 분담
**공통 UI**
- 상단바: 팀원 전부
- 하단 탭 메뉴: 남위정
- 유저 목록(팔로워,팔로잉,검색 목록): 주다빈
- 이미지 버튼(프로필, 게시글, 상품): 서가희
- 인풋(회원, 상품): 신현우 

**주다빈** 
- 마이 프로필, 유저 프로필 페이지 구현 및 회원 정보 렌더링
- 팔로워, 팔로잉 리스트 구현 및 렌더링
- 팔로우 기능
- 상품 등록, 수정, 삭제 기능 구현 / 상품 모달 
- 전반적인 프로젝트 UI 디자인

**서가희** 
- 게시글 작성, 수정, 삭제 기능 구현
- 게시글 상세 페이지 렌더링
- 댓글 작성, 삭제 기능 구현 
- 채팅 목록 / 채팅방 
- 로그아웃

**남위정**
- 피드 페이지 구현 및 팔로워 게시글 랜더링
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

<br>

## 기능 구현
|0. Splash|1. 회원가입|2. 로그인|
|:---:|:---:|:---:|
|<img src="" width=250 />|<img src="" width=250 />|<img src="" width=250 /> 

<br>

|3. 홈 피드|4. 게시글 신고|5. 계정 검색|
|:---:|:---:|:---:|
|<img src="" width=250 />|<img src="" width=250 />|<img src="" width=250 /> 


<br>

|6. 마이 프로필 수정|6. 상품 등록|6-1. 상품 수정|
|:---:|:---:|:---:|
|<img src="" width=250 />|<img src="" width=250 />|<img src="" width=250 /> 

<br>

|7. 게시글 등록|7-1. 게시글 수정| 매칭 & SNS 게시글 삭제|
|:---:|:---:|:---:|
|<img src="" width=250 />|<img src="" width=250 />|<img src="" width=250 />

<br>

|팔로우 기능|좋아요 기능|댓글 기능|
|:---:|:---:|:---:|
|<img src="" width=250 />|<img src="" width=250 />|<img src="" width=250 /> 

<br>

|검색 기능|채팅 UI & 404|로그아웃|
|:---:|:---:|:---:|
|<img src="" width=250 />|<img src="" width=250 />|<img src="" width=250 /> 
	
</div>

<br><br>

### 폴더 구조
```
- assets/ : 이미지, 아이콘 등 이미지 소스를 저장한 디렉토리 
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
│  ├─📂animalBox
├─📂html
├─📂js
└─📂pages

```
