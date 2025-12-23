# 💇 HIT - AI 헤어스타일 변환 서비스

<p align="center">
  <img src="src/assets/logo2.png" alt="HIT Logo" width="200"/>
</p>

AI 기술을 활용하여 사용자의 얼굴에 다양한 헤어스타일과 염색을 적용해볼 수 있는 웹 서비스입니다.

## ✨ 주요 기능

- 🎥 **실시간 웹캠 캡처** - 웹캠으로 얼굴 사진 촬영 또는 이미지 업로드
- 💇 **헤어스타일 변환** - AI(HairFastGAN)를 활용한 헤어스타일 적용
- 🎨 **염색 시뮬레이션** - 다양한 헤어 컬러 미리보기
- 📱 **인스타그램 공유** - 결과 이미지를 인스타그램에 바로 공유
- 💾 **히스토리 관리** - 이전 변환 결과 저장 및 조회

## 🛠️ 기술 스택

### Frontend
- **Vue.js 2** - 프론트엔드 프레임워크
- **Vuetify** - Material Design 컴포넌트 라이브러리
- **Vuex** - 상태 관리
- **Vue Router** - 라우팅
- **Axios** - HTTP 클라이언트
- **IndexedDB** - 클라이언트 사이드 이미지 캐싱

### Backend (별도 서버)
- **Flask** - Python 웹 프레임워크
- **HairFastGAN** - AI 헤어스타일 변환 모델
- **MySQL** - 데이터베이스
- **Selenium** - 인스타그램 자동화

## 📁 프로젝트 구조

```
HIT/
├── public/                 # 정적 파일
├── src/
│   ├── assets/            # 이미지, 폰트 등 리소스
│   ├── components/        # Vue 컴포넌트
│   │   ├── Header.vue     # 헤더 네비게이션
│   │   ├── Webcam.vue     # 웹캠 캡처
│   │   ├── Compose.vue    # 결과 이미지 표시
│   │   ├── Slide.vue      # 스타일/색상 선택
│   │   └── Frame.vue      # 히스토리 프레임
│   ├── views/             # 페이지 컴포넌트
│   │   ├── main.vue       # 메인 페이지
│   │   ├── usage.vue      # 사용 페이지
│   │   ├── introduce.vue  # 개발자 소개
│   │   └── History.vue    # 히스토리
│   ├── store/             # Vuex 스토어
│   ├── router/            # Vue Router 설정
│   ├── utils/             # 유틸리티 함수
│   │   ├── api.js         # API 서비스
│   │   ├── helpers.js     # 헬퍼 함수
│   │   └── indexedDB.js   # IndexedDB 유틸
│   ├── plugins/           # Vuetify 플러그인
│   ├── App.vue            # 루트 컴포넌트
│   └── main.js            # 엔트리 포인트
├── package.json
└── vue.config.js
```

## 🚀 시작하기

### 요구사항
- Node.js 14+
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/needitem/HIT.git
cd HIT

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run serve
```

브라우저에서 `http://localhost:8080` 접속

### 프로덕션 빌드

```bash
npm run build
```

## 📸 스크린샷

### 메인 페이지
AI 헤어스타일 변환 서비스 소개 및 시작 버튼

### 사용 페이지
웹캠 캡처, 스타일/색상 선택, 결과 확인

### 개발자 소개
프로젝트 팀원 소개

## 👥 개발팀

| 이름 | 역할 |
|------|------|
| 추영호 | 총괄 책임자, DB 설계, HairFastGAN 연동 |
| 김태호 | Flask 백엔드, 인스타그램 자동화 |
| 이승표 | Vue.js 프론트엔드, API 연동 |
| 여민호 | 데이터 수집, DB 관리, 프론트엔드 |
| 오소희 | UI/UX 디자인, 프론트엔드 |

## 📄 라이선스

This project is open source.

## 🤝 기여하기

이슈와 풀 리퀘스트를 환영합니다!
