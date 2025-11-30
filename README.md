# 📚 도서관 OPAC 시스템

> 공공도서관/작은도서관용 SaaS 도서 검색 웹앱 MVP

[![Vercel](https://vercel.com/button)](https://grok-project-55-kcyh2zm5b-dongyeol-jungs-projects.vercel.app/)

## 🚀 빠른 시작

### 기술 스택
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS 3.4+
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **배포**: Vercel
- **PWA**: Service Worker 지원

### 주요 기능
- 🔍 실시간 도서 검색 (자동완성, 필터링)
- 📱 모바일/PWA 최적화
- 📖 도서 상세 정보 및 QR 공유
- 👨‍💼 관리자 도서 관리 시스템
- 📊 검색 통계 및 분석

## 🛠️ 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 미리보기
npm run preview
```

### 환경변수 설정 (.env.local)

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 컴포넌트
│   ├── BookCard.tsx    # 도서 카드
│   ├── SearchBar.tsx   # 검색바 (자동완성)
│   ├── FilterPanel.tsx # 필터 패널
│   └── QRShare.tsx     # QR 공유
├── pages/              # 페이지 컴포넌트
│   ├── Home.tsx        # 홈페이지
│   ├── SearchResult.tsx # 검색 결과
│   ├── BookDetail.tsx  # 도서 상세
│   └── Admin/          # 관리자 페이지
├── hooks/              # 커스텀 훅
│   └── useSearch.ts    # 검색 로직
├── data/               # 데이터 파일
│   └── mockBooks.ts    # 목업 데이터
├── types/              # TypeScript 타입 정의
│   └── book.ts         # 도서 관련 타입
├── lib/                # 유틸리티
│   └── firebase.ts     # Firebase 설정
└── styles/             # 스타일링

public/                 # 정적 파일
├── icons/              # PWA 아이콘
└── manifest.json       # PWA 설정

functions/              # Firebase Functions
├── processCSV.js       # CSV 처리
└── syncSearchIndex.js  # 검색 인덱스 동기화
```

## ✨ 주요 기능

### 👤 사용자 기능

#### 검색 및 탐색
- **실시간 검색**: 제목, 저자, 출판사, 키워드 검색
- **자동완성**: 최근 검색어 + 인기 키워드 추천
- **고급 필터**: 대출가능, 카테고리, 출간연도 필터링
- **정렬 옵션**: 최신순, 인기순, 제목순

#### 도서 정보
- **상세 정보**: 표지, 저자, 출판사, ISBN, 카테고리
- **소장 위치**: 층/실/구역/행/칸 상세 표시
- **대출 상태**: 실시간 대출 가능 여부 표시
- **QR 공유**: 도서 정보 모바일 공유

#### PWA 기능
- **홈화면 설치**: 모바일 앱처럼 설치 가능
- **오프라인 지원**: 캐싱된 콘텐츠 오프라인 접근

### 👨‍💼 관리자 기능

#### 도서 관리
- **CRUD 작업**: 도서 등록/수정/삭제
- **대량 업로드**: CSV 파일로 수백 권 동시 등록
- **이미지 업로드**: 표지 이미지 Firebase Storage 연동
- **카테고리 관리**: 도서 분류 체계 관리

#### 통계 및 모니터링
- **검색 통계**: 인기 검색어, 검색량 분석
- **대출 현황**: 실시간 대출 상태 모니터링

## 🗄️ 데이터베이스 구조

### Books 컬렉션
```typescript
interface Book {
  id: string;
  title: string;           // 도서 제목
  author: string;          // 저자
  publisher: string;       // 출판사
  isbn: string;           // ISBN13
  categories: string[];   // 카테고리
  keywords: string[];     // 검색 키워드
  publishYear: number;    // 출간연도
  shelfLocation: {        // 서가 위치
    floor: string;
    room: string;
    section: string;
    row: string;
    column: string;
  };
  coverImageUrl: string;  // 표지 URL
  isAvailable: boolean;   // 대출 가능 여부
  createdAt: Date;        // 생성일
  updatedAt: Date;        // 수정일
}
```

### Search Logs 컬렉션
```typescript
interface SearchLog {
  keyword: string;        // 검색어
  userId?: string;        // 사용자 ID
  timestamp: Date;        // 검색 시간
  resultCount: number;    // 결과 수
}
```

## 🚀 배포 가이드

### Vercel 자동 배포
프로젝트가 GitHub에 연결되어 자동 배포됩니다.

### 수동 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel --prod
```

### 환경변수 설정
Vercel Dashboard에서 다음 변수를 설정:
- `VITE_FIREBASE_*`: Firebase 설정 값들
- `VERCEL_ENV`: production

## 💻 개발 가이드

### 코드 스타일
- **TypeScript**: 엄격한 타입 체크
- **ESLint**: 코드 품질 유지
- **Prettier**: 일관된 코드 포맷팅

### 테스트 실행
```bash
# 빌드 테스트
npm run build
```

### Git 워크플로우
```bash
# 기능 브랜치 생성
git checkout -b feature/new-feature

# 커밋
git commit -m "feat: 새로운 기능 추가"

# 푸시
git push origin feature/new-feature

# PR 생성 후 main 병합
```

## 🔮 로드맵

### Phase 1 (현재) ✅
- 기본 검색 기능
- 관리자 도서 관리
- PWA 지원
- Vercel 배포

### Phase 2 (다음)
- AI 기반 추천 시스템
- 사용자 맞춤 큐레이션
- 음성 검색
- 대출/반납 연동

### Phase 3 (확장)
- 전자책 통합 검색
- 다중 도서관 연동
- 고급 분석 대시보드
- 모바일 앱 개발

## 📞 지원 및 문의

### 문서
- [상세 기술 문서](./PROJECT_DOCUMENTATION.md)
- [API 레퍼런스](./api/)
- [배포 가이드](./deployment/)

### 이슈 및 피드백
- **GitHub Issues**: 버그 리포트 및 기능 요청
- **Discussions**: 일반 토론 및 Q&A

### 라이선스
MIT License - 자유로운 사용 및 수정 가능

---

*개발: GitHub Copilot | 배포: Vercel | DB: Firebase*
