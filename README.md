# 첫 자취 앱 - 프로젝트 구조 안내

## 폴더 구조
- `src/app/` : 라우터, 전체 레이아웃 설정
- `src/features/` : 도메인별 폴더 (home, house, checklist, admin, mypage)
  - 각 feature 안에 `pages/`, `components/`, (필요 시) `context/`를 둡니다.
- `src/components/` : 여러 feature에서 공용으로 쓰는 컴포넌트 (ui, layout)
- `src/hooks/` : 커스텀 훅
- `src/context/` : 앱 전역 Context (로그인 사용자 등)
- `src/utils/` : 순수 함수, 포맷터

## 설치 및 실행
아직 package.json 의존성은 설치되지 않았습니다. 아래 순서로 진행하세요.

```bash
npm install react react-dom react-router-dom
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
npm run dev
```

## 다음 단계 제안
1. `RegisterStep2/3` 폼 필드 실제 구현 (react-hook-form 고려)
2. `OnSiteCheckPage` 탭별 체크 항목 데이터 구조 설계
3. `MapView` 실제 지도 SDK(Kakao/Naver/Google Maps) 연동
4. 인증(AuthContext) 실제 로그인 플로우 연결
