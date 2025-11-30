# 📚 도서관 OPAC 시스템 기획서

## 🎯 프로젝트 개요
공공도서관/작은도서관용 SaaS 도서 검색(OPAC) 웹앱 MVP

### 기술 스택 (절대 변경 금지)
- ✅ Vite + React 18/19 + TypeScript
- ✅ TailwindCSS 3.4+
- ✅ Firebase (Auth, Firestore, Storage, Functions)
- ✅ Vercel 배포
- ✅ Framer Motion 활용
- ✅ PWA 지원

---

## 🗂️ 목차
- [프로젝트 목표](#프로젝트-목표)
- [사용자 기능](#사용자-기능)
- [관리자 기능](#관리자-기능)
- [Firestore DB 구조](#firestore-db-구조)
- [UI/UX 구조](#uiux-구조)
- [OPAC 기능 상세](#opac-기능-상세)
- [검색 알고리즘](#검색-알고리즘)
- [React 페이지 구조](#react-페이지-구조)
- [API 의사코드](#api-의사코드)
- [도서 상세 UI 컴포넌트](#도서-상세-ui-컴포넌트)
- [코드 폴더 구조](#코드-폴더-구조)
- [확장 기능 로드맵](#확장-기능-로드맵)
- [Vercel 배포 가이드](#vercel-배포-가이드)

---

## 🎯 프로젝트 목표
- 모바일/PWA 최적화 도서 검색
- Firestore Index 기반 즉시 반응형 검색
- 실시간 대출 가능 여부 표시
- QR 공유 기능
- 관리자용 도서 관리 시스템

---

## 👤 사용자 기능
- [x] 검색창: 자동완성, 최근 검색
- [x] 필터: 대출가능/불가, 분야별 카테고리, 출간연도
- [x] 도서 상세: 표지, 소개, ISBN, 소장위치, 재고
- [x] QR 공유 (도서 상세 페이지)
- [x] 인기 도서 / 신착 도서 / 테마 큐레이션 (슬라이드 구현)
- [x] PWA 홈화면 설치 가능 (manifest.json 추가)

---

## 🛠️ 관리자 기능
- [x] 도서 등록/수정/삭제 (표지 업로드 포함)
- [x] CSV 업로드로 대량 등록
- [x] 장서 점검(Inventory)
- [x] 대출 가능/불가 상태 수동 변경
- [x] 분류/카테고리 관리
- [x] 통계(검색량, 인기 검색어, 대출연동 대비 가능)

---

## 🗃️ Firestore DB 구조

### 📚 /books/{bookId}
| 필드 | 타입 | 설명 |
|------|------|------|
| title | string | 도서 제목 |
| author | string | 저자 |
| publisher | string | 출판사 |
| isbn | string | ISBN13 |
| categories | array | 예: ["문학", "소설", "한국문학"] |
| keywords | array | 검색 키워드 |
| publishYear | number | 출간연도 |
| shelfLocation | map | 층/열람실/서가/행/칸 정보 |
| coverImageUrl | string | 표지 이미지 URL |
| isAvailable | boolean | 대출 가능 여부 |
| createdAt | timestamp | 최초 등록일 |
| updatedAt | timestamp | 수정일 |

### 🧾 /searchLogs/{logId}
- keyword: string
- userId: string
- timestamp: timestamp
- → 인기 검색어 기반 통계 가능

### ⚙️ /admin/settings
- categoriesMaster: array
- shelfMap: map
- importCSVConfig: map
- autoSyncEnabled: boolean

---

## 🎨 UI/UX 구조 (모바일 최적화 + PWA)

### 사용자 화면
1. **홈**
   - 검색창
   - 인기 검색어
   - 신착도서 슬라이드
   - 테마 큐레이션

2. **검색 결과**
   - 표지 이미지
   - 제목/저자/출판사
   - 대출 가능 여부
   - 필터: 신착/가능한 책/카테고리

3. **도서 상세**
   - 표지
   - 서가 위치 지도(텍스트 또는 미니맵)
   - 대출 여부
   - 유사 도서 추천
   - QR 공유

### 관리자 화면
1. 도서 목록
2. 도서 등록/수정
3. 책 표지 업로드(Storage)
4. CSV 업로드
5. 카테고리/서가 설정
6. 검색 통계

---

## 🔍 OPAC 기능 상세 정의

### 검색 기능
- 제목, 저자, 출판사, ISBN
- 자동완성 (검색로그 기반)
- 정렬: 최신순, 인기순

### 도서 상세
- 표지 이미지
- 책 설명/소개문
- 저자 정보
- 서가 위치: 2층 열람실 → A구역 → 3번 선반 → 4번째 칸
- 대출 여부 표시
- QR 공유

### 필터 기능
- 대출가능 도서만 보기
- 신착(최근 60일)
- 카테고리(문학/과학/IT/아동 등)
- 출간연도

---

## ⚡ 검색 알고리즘 설계 (속도↑ 정확도↑)

### 기본 원칙
- Firestore 단독 검색의 한계 → 인덱스 기반 구조 + keywords 최적화
- 제목/저자/키워드 세 필드 중심 검색

### 데이터 예시
```json
keywords: [
  "김영하",
  "살인자의기억법",
  "스릴러",
  "한국문학",
  "범죄소설",
  "베스트셀러"
]
```

### 추천 검색 알고리즘
1. title, author에서 시작
2. keywords 배열에 매칭
3. 인기 검색어 기반 가중치 조정
4. Firestore 복합 인덱스 사용

### 성능 향상 필요 시
- Firebase Functions + Algolia 검색엔진 연동(고급 버전)

---

## 🖥️ React 페이지 구조

### 사용자 페이지
- `Home.tsx` - 메인 검색 페이지 (인기 도서 슬라이드 포함)
- `SearchResult.tsx` - 검색 결과 및 필터 (URL 쿼리 파라미터 지원)
- `BookDetail.tsx` - 도서 상세 정보 (QR 공유 포함)

### 관리자 페이지
- `Admin/BookList.tsx` - 도서 목록 관리 (네비게이션 링크 추가)
- `Admin/BookEdit.tsx` - 도서 등록/수정 (폼 검증 및 mock 저장)
- `Admin/UploadCSV.tsx` - CSV 대량 업로드 (PapaParse로 파싱 및 미리보기)

### 컴포넌트
- `BookCard.tsx` - 도서 카드 (클릭 시 상세 페이지 이동)
- `SearchBar.tsx` - 검색창 (홈에서는 검색 결과 페이지로 이동)
- `FilterPanel.tsx` - 필터 옵션
- `QRShare.tsx` - QR 코드 공유

---

## 🔧 API 의사코드

### 검색 API
```javascript
async function searchBooks(query, filters) {
  const q = query(collection(db, 'books'),
    where('keywords', 'array-contains-any', query.split(' ')),
    where('isAvailable', '==', filters.availableOnly ? true : any),
    orderBy('createdAt', 'desc'),
    limit(50)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

### 도서 등록 API
```javascript
async function addBook(bookData) {
  const docRef = await addDoc(collection(db, 'books'), {
    ...bookData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
}
```

### CSV 업로드 API (Firebase Functions)
```javascript
exports.processCSV = functions.https.onCall(async (data, context) => {
  const csvData = parseCSV(data.csvContent);
  const batch = db.batch();
  csvData.forEach(book => {
    const docRef = db.collection('books').doc();
    batch.set(docRef, { ...book, createdAt: admin.firestore.FieldValue.serverTimestamp() });
  });
  await batch.commit();
  return { success: true, count: csvData.length };
});
```

---

## 🎨 도서 상세 UI 컴포넌트 설계

```tsx
<BookDetail book={book}>
  <BookCover image={book.coverImageUrl} />
  <BookInfo title={book.title} author={book.author} />
  <ShelfLocation location={book.shelfLocation} />
  <AvailabilityStatus isAvailable={book.isAvailable} />
  <QRShare url={window.location.href} />
  <RelatedBooks books={relatedBooks} />
</BookDetail>
```

### 주요 컴포넌트
- BookCard: 검색 결과 아이템
- SearchBar: 자동완성 검색창
- FilterPanel: 필터 옵션
- BookDetail: 상세 정보 레이아웃

---

## 📁 코드 폴더 구조

```
src/
  pages/
    Home.tsx
    SearchResult.tsx
    BookDetail.tsx
    Admin/
      BookList.tsx
      BookEdit.tsx
      UploadCSV.tsx
  components/
    BookCard.tsx
    SearchBar.tsx
    FilterPanel.tsx
  hooks/
    useSearch.ts
  lib/
    firebase.ts
  styles/
    globals.css
public/
  icons/
functions/
  processCSV.js
  syncSearchIndex.js
```

---

## 🚀 확장 기능 로드맵

### 1차 확장
- [ ] AI 기반 도서 추천
- [ ] 맞춤형 큐레이션
- [ ] 음성검색

### 2차 확장
- [ ] 대출/반납 연계
- [ ] 전자책 통합검색

### 3차 확장 (지자체용)
- [ ] 분관 통합 도서 검색
- [ ] 도서관 전체 인기 도서 TOP100 자동 생성

---

## ☁️ Vercel 배포 가이드

### 1. Vercel 계정 생성
- vercel.com 접속
- GitHub 연동

### 2. 프로젝트 배포
```bash
npm install -g vercel
vercel --prod
```

### 3. 환경변수 설정
- VERCEL_ENV: production
- FIREBASE_CONFIG: your-firebase-config-json

### 4. PWA 설정 확인
- manifest.json 생성
- Service Worker 등록 확인

### 5. 도메인 연결 (선택)
- vercel.com에서 커스텀 도메인 설정

---

## 📝 개발 노트
- Firestore 보안 규칙 설정 필수
- Firebase Functions 배포 필요
- 모바일 테스트 필수
- SEO 최적화 고려

---

*이 기획서는 Notion에서 작성되었으며, 실제 구현 시 세부 사항 조정 가능*
