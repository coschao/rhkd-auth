
 React/Next.js 프레임워크를 사용한 프론트엔드 프로젝트 RHKD 샘플

## 주요목표

- React 학습 ( +fastapi )
- React 프로젝트 FW/공통 구성
    -- 기본 배치 아키텍처 구성
    -- 로그인/아웃 및 사용자관리 간단한 샘플
    -- 공통컴포넌트 도출, 화면분할 등 엔터프라이즈 프로젝트 대비

- 엔터프라이즈 아키텍처 대비
    -- 1차 : React내 직접 DB접근 (DAL)
    -- 2차 : DAL 부분을 fastapi 백엔드로 처리 (fastapi 프로젝트 이미 구현)


## 구현환경(프론트)

2026.04 기준 최신 버전 사용

1. React (19.2.x)
2. Next.js (16.2.x)
3. Next Auth (5.0.0-beta, v5 사용) (참고) better-auth 고려
4. jsonwebtoken (9.0.x)
5. prisma (7.8.x)
6. ag-grid (35.x)

기타
- tailwindcss
- bcrypt
- ...


## 구현환경(백엔드)

1. sqlite3 (로컬DB)
2. Redis (추후)
3. Oracle : fastapi를 통한 백엔드 API


## TODO



