# CDN 캐시 전파 확인 가이드

## 1. 브라우저 개발자 도구 활용

### Safari:
1. Safari에서 `https://dev-journey77.github.io/rabbit-dancing-page/` 접속
2. `Option + Command + I` (개발자 도구 열기)
3. **Network 탭** 클릭
4. `Command + R` (새로고침)
5. HTML 파일 클릭해서 **Response Headers** 확인:
   - `last-modified`: 최신 수정 시간인지 확인
   - `etag`: 값이 변경되었는지 확인

### 캐시 강제 새로고침:
- **Safari**: `Shift + Command + R`
- **Chrome**: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
- **Firefox**: `Ctrl + F5` (Windows) / `Cmd + Shift + R` (Mac)

## 2. 온라인 도구 활용

### 다중 지역 테스트:
1. **GTmetrix** (https://gtmetrix.com/)
   - URL 입력하여 글로벌 성능 테스트
   - 캐시 상태 확인 가능

2. **Global DNS Checker** (https://www.whatsmydns.net/)
   - DNS 전파 상태 확인
   - `dev-journey77.github.io` 입력

3. **Website Response Headers Checker**
   - `https://httpstatus.io/`
   - URL 입력하여 헤더 정보 확인

## 3. 터미널 명령어

### 현재 캐시 상태 확인:
```bash
# 캐시 정보 확인
curl -I https://dev-journey77.github.io/rabbit-dancing-page/

# Age 헤더 확인 (0에 가까우면 최신)
curl -I https://dev-journey77.github.io/rabbit-dancing-page/ | grep age

# 실제 컨텐츠 확인
curl -s https://dev-journey77.github.io/rabbit-dancing-page/ | grep assets
```

### 다른 지역 서버에서 확인:
```bash
# 다른 DNS 서버를 통해 확인
nslookup dev-journey77.github.io 8.8.8.8
nslookup dev-journey77.github.io 1.1.1.1
```

## 4. 전파 완료 확인 지표

### ✅ 캐시 전파 완료 신호:
- `age: 0` 또는 낮은 값
- `last-modified`가 최신 커밋 시간과 일치
- HTML에서 `./assets/` 경로 확인됨
- 브라우저에서 CSS/JS 파일이 정상 로딩됨

### ⏳ 대기 중 신호:
- `age: 높은 값` (600초 = 10분)
- 여전히 `/assets/` 절대 경로 표시
- 브라우저에서 404 에러 발생

## 5. 즉시 확인하는 꿀팁

### 시크릿 모드 사용:
1. **Safari 시크릿 윈도우**: `Shift + Command + N`
2. 새 탭에서 `https://dev-journey77.github.io/rabbit-dancing-page/` 접속
3. 로컬 캐시 없이 최신 버전 확인 가능

### 모바일에서 확인:
- 스마트폰에서 접속하여 토끼 애니메이션이 정상 작동하는지 확인
- 모바일은 데스크탑과 다른 캐시 서버를 사용할 수 있음

## 예상 전파 시간
- **GitHub Pages CDN (Fastly)**: 5-10분
- **전 세계 엣지 서버**: 최대 15분
- **브라우저 캐시**: 즉시 (강제 새로고침 시)

---
**현재 상태**: 캐시 전파 대기 중 (age: 130초, max-age: 600초)
**예상 완료 시간**: 약 8분 후 (16:28 KST)