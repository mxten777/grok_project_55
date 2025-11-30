# 📚 도서관 OPAC 시스템 - 프로젝트 문서

## 🎯 프로젝트 개요

**프로젝트명**: 도서관 OPAC (Online Public Access Catalog) 시스템  
**목적**: 공공도서관/작은도서관용 도서 검색 SaaS 플랫폼  
**대상 사용자**: 일반 이용자 (도서 검색/대출 확인), 사서 (도서 관리/통계)  
**기술 스택**: React 18 + TypeScript + TailwindCSS + Firebase + Vite + Vercel

---

## 🏗️ 시스템 아키텍처

### 기술 스택 상세
- **Frontend**: React 18.3.1, TypeScript 5.9.3, Vite 6.4.1
- **Styling**: TailwindCSS 3.4.18, Framer Motion 12.23.24
- **Backend**: Firebase (Firestore, Auth, Storage, Functions)
- **배포**: Vercel
- **PWA**: vite-plugin-pwa 1.2.0
- **기타**: PapaParse (CSV), QRCode.react, React Router 6.30.2

### 폴더 구조
```
src/
├── components/          # 재사용 컴포넌트
│   ├── BookCard.tsx    # 도서 카드 컴포넌트
│   ├── FilterPanel.tsx # 검색 필터 패널
│   ├── Header.tsx      # 네비게이션 헤더
│   ├── QRShare.tsx     # QR 공유 컴포넌트
│   └── SearchBar.tsx   # 검색바 (자동완성)
├── hooks/
│   └── useSearch.ts    # 검색 로직 훅
├── lib/
│   └── firebase.ts     # Firebase 설정
├── pages/              # 페이지 컴포넌트
│   ├── Home.tsx        # 홈페이지
│   ├── SearchResult.tsx # 검색 결과
│   ├── BookDetail.tsx  # 도서 상세
│   └── Admin/          # 관리자 페이지
│       ├── BookList.tsx    # 도서 목록
│       ├── BookEdit.tsx    # 도서 추가/수정
│       └── UploadCSV.tsx   # CSV 업로드
├── App.tsx             # 메인 앱 컴포넌트
├── main.tsx            # 앱 진입점
└── index.css           # 글로벌 스타일

functions/              # Firebase Functions
├── processCSV.js       # CSV 처리 함수
└── syncSearchIndex.js  # 검색 인덱스 동기화

public/                 # 정적 파일
├── icons/              # PWA 아이콘
├── manifest.json       # PWA 매니페스트
└── pwa-*.svg          # PWA 아이콘
```

---

## 📊 데이터베이스 설계

### Firestore 컬렉션 구조

#### `/books/{bookId}` - 도서 정보
```typescript
interface Book {
  id: string;
  title: string;           // 도서 제목
  author: string;          // 저자
  publisher: string;       // 출판사
  isbn: string;           // ISBN13
  categories: string[];   // 카테고리 배열
  keywords: string[];     // 검색 키워드
  publishYear: number;    // 출간연도
  shelfLocation: {        // 서가 위치
    floor: string;
    room: string;
    section: string;
    row: string;
    column: string;
  };
  coverImageUrl: string;  // 표지 이미지 URL
  isAvailable: boolean;   // 대출 가능 여부
  createdAt: Timestamp;   // 생성일
  updatedAt: Timestamp;   // 수정일
}
```

#### `/searchLogs/{logId}` - 검색 로그
```typescript
interface SearchLog {
  keyword: string;        // 검색어
  userId?: string;        // 사용자 ID (선택)
  timestamp: Timestamp;   // 검색 시간
}
```

#### `/admin/settings` - 관리자 설정
```typescript
interface AdminSettings {
  categoriesMaster: string[];     // 전체 카테고리 목록
  shelfMap: object;              // 서가 맵 설정
  importCSVConfig: object;       // CSV 임포트 설정
  autoSyncEnabled: boolean;      // 자동 동기화 활성화
}
```

---

## 🔍 검색 알고리즘 설계

### 기본 검색 원칙
1. **다중 필드 검색**: 제목, 저자, 출판사, ISBN, 카테고리, 키워드
2. **부분 일치**: 대소문자 구분 없이 부분 문자열 검색
3. **가중치 기반 정렬**: 제목 > 저자 > 키워드 > 카테고리
4. **실시간 필터링**: 대출가능, 카테고리, 출간연도

### 검색 구현 (useSearch.ts)
```typescript
const useSearch = (searchTerm: string, filters: SearchFilters) => {
  // 1. 기본 텍스트 검색
  const textMatches = books.filter(book =>
    book.title.toLowerCase().includes(term) ||
    book.author.toLowerCase().includes(term) ||
    book.keywords.some(kw => kw.toLowerCase().includes(term))
  );

  // 2. 필터 적용
  const filteredResults = textMatches.filter(book => {
    if (filters.availableOnly && !book.isAvailable) return false;
    if (filters.categories.length > 0 &&
        !filters.categories.some(cat => book.categories.includes(cat))) return false;
    if (filters.publishYear && book.publishYear !== filters.publishYear) return false;
    return true;
  });

  // 3. 정렬 (제목 우선, 그 다음 저자)
  return filteredResults.sort((a, b) => {
    if (a.title.includes(searchTerm) && !b.title.includes(searchTerm)) return -1;
    if (!a.title.includes(searchTerm) && b.title.includes(searchTerm)) return 1;
    return a.title.localeCompare(b.title);
  });
};
```

### Firebase 최적화 전략
```typescript
// 복합 인덱스 설정 필요
// 1. title, author, keywords (텍스트 검색용)
// 2. isAvailable, categories (필터용)
// 3. publishYear (범위 쿼리용)

// 검색 쿼리 예시
const searchBooks = async (term: string) => {
  const booksRef = collection(db, 'books');
  const q = query(
    booksRef,
    where('keywords', 'array-contains-any', term.split(' ')),
    where('isAvailable', '==', true),
    orderBy('title'),
    limit(50)
  );
  return getDocs(q);
};
```

---

## 🎨 UI/UX 디자인

### 페이지별 레이아웃

#### 1. 홈페이지 (Home.tsx)
```
┌─────────────────────────────────────┐
│ [헤더: 로고 + 네비게이션]           │
├─────────────────────────────────────┤
│ 검색바 (자동완성 + 최근검색)        │
├─────────────────────────────────────┤
│ 인기 도서 슬라이드 (가로 스크롤)   │
│ 신착 도서 슬라이드 (가로 스크롤)   │
└─────────────────────────────────────┘
```

#### 2. 검색 결과 (SearchResult.tsx)
```
┌─────────────────────────────────────┐
│ 헤더 + 검색바                       │
├─────────────────┬───────────────────┤
│ 필터 패널       │ 검색 결과 그리드   │
│ • 대출가능      │ 도서카드 목록      │
│ • 카테고리      │                   │
│ • 출간연도      │                   │
└─────────────────┴───────────────────┘
```

#### 3. 도서 상세 (BookDetail.tsx)
```
┌─────────────────────────────────────┐
│ 도서 표지          도서 정보        │
│ [이미지]          • 제목            │
│                   • 저자            │
│                   • 출판사/연도     │
│                   • ISBN            │
│                   • 카테고리        │
│                   • 서가 위치       │
│                   • 대출 상태       │
├─────────────────────────────────────┤
│ QR 공유 버튼                        │
└─────────────────────────────────────┘
```

### 컴포넌트 설계

#### BookCard 컴포넌트
```tsx
interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

const BookCard = ({ book, onClick }: BookCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    <img src={book.coverImageUrl} alt={book.title} className="w-full h-48 object-cover rounded" />
    <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
    <p className="text-gray-600">{book.author}</p>
    <span className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
      book.isAvailable ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
    }`}>
      {book.isAvailable ? '대출가능' : '대출불가'}
    </span>
  </div>
);
```

#### SearchBar 컴포넌트 (자동완성)
```tsx
const SearchBar = () => {
  const [term, setTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches] = useState(() => 
    JSON.parse(localStorage.getItem('recentSearches') || '[]')
  );

  // 인기 키워드 (하드코딩 또는 DB에서 가져옴)
  const popularKeywords = ['김영하', '한강', '조남주', '정세랑'];

  const filteredSuggestions = popularKeywords.filter(kw =>
    kw.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        className="w-full px-4 py-2 border rounded-lg"
        placeholder="제목, 저자, 출판사, 키워드 검색..."
      />
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg z-10">
          {/* 최근 검색어 */}
          {/* 추천 검색어 */}
        </div>
      )}
    </div>
  );
};
```

---

## 👨‍💼 관리자 기능

### 관리자 페이지 구조

#### 도서 목록 (BookList.tsx)
- **기능**: 도서 목록 조회, 추가, 수정, 삭제
- **UI**: 테이블 형태 + 액션 버튼
- **권한**: 관리자 인증 필요

#### 도서 등록/수정 (BookEdit.tsx)
```tsx
const BookEdit = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    categories: '',
    keywords: '',
    publishYear: '',
    floor: '',
    room: '',
    section: '',
    row: '',
    column: '',
    isAvailable: true
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Firebase에 저장
    const bookData = {
      ...form,
      categories: form.categories.split(',').map(s => s.trim()),
      keywords: form.keywords.split(',').map(s => s.trim()),
      shelfLocation: {
        floor: form.floor,
        room: form.room,
        section: form.section,
        row: form.row,
        column: form.column
      }
    };
    // await addDoc(collection(db, 'books'), bookData);
  };
};
```

#### CSV 업로드 (UploadCSV.tsx)
```tsx
const UploadCSV = () => {
  const [parsedData, setParsedData] = useState<BookData[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse<BookData>(file, {
        header: true,
        complete: (results) => setParsedData(results.data)
      });
    }
  };

  const handleUpload = async () => {
    // Firebase Functions 호출
    // const result = await functions().httpsCallable('processCSV')(parsedData);
  };
};
```

---

## 🔧 API 설계 (의사코드)

### 도서 검색 API
```typescript
// GET /api/books/search
interface SearchRequest {
  q: string;              // 검색어
  availableOnly?: boolean; // 대출가능만
  categories?: string[];   // 카테고리 필터
  publishYear?: number;    // 출간연도
  limit?: number;          // 결과 제한
  offset?: number;         // 페이지네이션
}

interface SearchResponse {
  books: Book[];
  total: number;
  hasMore: boolean;
}

// Firebase Functions 구현
exports.searchBooks = functions.https.onCall(async (data: SearchRequest, context) => {
  const { q, availableOnly, categories, publishYear, limit = 20 } = data;
  
  let query = collection(db, 'books');
  
  // 검색어 처리
  if (q) {
    const searchTerms = q.toLowerCase().split(' ');
    query = query.where('keywords', 'array-contains-any', searchTerms);
  }
  
  // 필터 적용
  if (availableOnly) {
    query = query.where('isAvailable', '==', true);
  }
  
  if (categories?.length) {
    query = query.where('categories', 'array-contains-any', categories);
  }
  
  const snapshot = await getDocs(query);
  const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return { books: books.slice(0, limit), total: books.length };
});
```

### 도서 CRUD API
```typescript
// POST /api/books - 도서 생성
exports.createBook = functions.https.onCall(async (data, context) => {
  // 관리자 권한 확인
  if (!context.auth?.token.admin) throw new Error('Unauthorized');
  
  const bookData = { ...data, createdAt: Timestamp.now(), updatedAt: Timestamp.now() };
  const docRef = await addDoc(collection(db, 'books'), bookData);
  return { id: docRef.id };
});

// PUT /api/books/{id} - 도서 수정
exports.updateBook = functions.https.onCall(async ({ id, data }, context) => {
  await updateDoc(doc(db, 'books', id), { 
    ...data, 
    updatedAt: Timestamp.now() 
  });
  return { success: true };
});

// DELETE /api/books/{id} - 도서 삭제
exports.deleteBook = functions.https.onCall(async ({ id }, context) => {
  await deleteDoc(doc(db, 'books', id));
  return { success: true };
});
```

### 통계 API
```typescript
// GET /api/stats/search - 검색 통계
exports.getSearchStats = functions.https.onCall(async (data, context) => {
  const logs = await getDocs(collection(db, 'searchLogs'));
  const stats = logs.docs.reduce((acc, doc) => {
    const keyword = doc.data().keyword;
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(stats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
});
```

---

## 📱 PWA 및 모바일 최적화

### PWA 설정 (vite.config.ts)
```typescript
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '도서관 OPAC 시스템',
        short_name: 'OPAC',
        description: '도서 검색 및 대출 확인 시스템',
        theme_color: '#3B82F6',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: 'pwa-512x512.svg', sizes: '512x512', type: 'image/svg+xml' }
        ]
      }
    })
  ]
});
```

### 모바일 UX 고려사항
1. **터치 친화적**: 버튼 크기 최소 44px
2. **수직 스크롤**: 긴 목록은 수직 스크롤
3. **QR 공유**: 모바일 네이티브 공유 API 활용
4. **오프라인 지원**: Service Worker 캐싱

---

## 🚀 배포 가이드

### Vercel 배포 절차

#### 1. 프로젝트 준비
```bash
# 환경변수 설정
echo "VITE_FIREBASE_API_KEY=your_api_key" > .env.local
echo "VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com" >> .env.local
# ... 다른 Firebase 설정

# 빌드 테스트
npm run build
```

#### 2. Firebase 설정
```bash
# Firebase 프로젝트 생성
firebase init

# Firestore 보안 규칙 설정
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자 읽기 권한
    match /books/{bookId} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // 검색 로그 (인증된 사용자만)
    match /searchLogs/{logId} {
      allow read, write: if request.auth != null;
    }
    
    // 관리자 설정 (관리자만)
    match /admin/{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
  }
}
```

#### 3. Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 연결
vercel

# 환경변수 설정
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
# ... 다른 변수들

# 배포
vercel --prod
```

### 배포 후 확인사항
- [ ] PWA 설치 가능 여부
- [ ] HTTPS 적용 확인
- [ ] Firebase 연결 정상
- [ ] 모바일 반응성 테스트
- [ ] 검색 기능 작동 확인

---

## 📈 확장 로드맵

### 1차 확장 (3개월)
- [ ] AI 기반 도서 추천 시스템
- [ ] 맞춤형 큐레이션 (사용자별)
- [ ] 음성 검색 기능
- [ ] 대출 연동 API

### 2차 확장 (6개월)
- [ ] 전자책 통합 검색
- [ ] 도서 예약 시스템
- [ ] 리뷰 및 평점 기능
- [ ] 소셜 공유 기능

### 3차 확장 (1년)
- [ ] 지자체 연계 시스템
- [ ] 분관 통합 검색
- [ ] 통계 대시보드 고도화
- [ ] 모바일 앱 개발

---

## 🐛 트러블슈팅

### 자주 발생하는 문제

#### 1. 검색이 느린 경우
```typescript
// 해결: Firestore 인덱스 추가
// Firebase Console > Firestore > 인덱스
// 복합 인덱스 생성: keywords(배열), isAvailable(오름차순)
```

#### 2. PWA가 설치되지 않는 경우
```json
// manifest.json 확인
{
  "name": "도서관 OPAC 시스템",
  "short_name": "OPAC",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    {
      "src": "/pwa-192x192.svg",
      "sizes": "192x192",
      "type": "image/svg+xml"
    }
  ]
}
```

#### 3. Firebase 권한 오류
```javascript
// Firebase Console > Authentication > 사용자
// 관리자 권한 부여 (커스텀 클레임)
{
  "admin": true
}
```

---

## 📞 지원 및 유지보수

### 모니터링 포인트
- **성능**: 검색 응답 시간 (< 2초)
- **사용성**: 모바일 친화성 점수 (> 90)
- **안정성**: uptime (> 99.5%)
- **보안**: Firebase 보안 규칙 준수

### 유지보수 일정
- **주간**: 로그 모니터링 및 이상 감지
- **월간**: 성능 최적화 및 보안 패치
- **분기**: 기능 업데이트 및 사용자 피드백 반영

---

*문서 버전: 1.0*  
*최종 업데이트: 2025년 11월 30일*  
*작성자: GitHub Copilot*