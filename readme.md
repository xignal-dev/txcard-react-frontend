# order-node-frontend
order-node-frontend

## 프로젝트
* node Version : `16.17.0`
* The project name is **order-node-frontend**.

## 실행 환경 설정

* Git 설치

* 참조: [https://git-scm.com/book/ko/v2/시작하기-Git-설치](https://git-scm.com/book/ko/v2/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-Git-%EC%84%A4%EC%B9%98)

* Ubuntu
    
```bash
# git 패키지 설치
$ sudo apt install git
```
    
* IOS
    
```bash
# 아래 사이트에서 다운로드
https://git-scm.com/download/mac
```
    
* Windows
    
```bash
# 아래 사이트에서 다운로드
https://git-scm.com/download/win
```

* 깃허브 원격 저장소에서 클론
    
```bash
# 깃허브에서 발행한 access-key와 사용자 ID를 사용하여 clone
$ git clone https://{GIT_HUB_USER_ID:GIT_HUB_ACCESS_KEY}@github.com/xignal-dev/txcard-react-frontend.git
```

* nvm(node version manager) 설치
```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
$ source .bashrc
```

* node, npm 설치
```bash
$ nvm install 16.17.0
```

* 설치된 버전 사용
```bash
$ nvm use 16.17.0
```

* 현재 버전 확인
```bash
$ nvm current
```

* yarn 설치

```bash
$ npm install -g yarn 
```

* pm2 (project manager) 설치

```bash
$ npm install -g pm2
```

## 개발/테스트 환경 실행 명령어
### 실행
#### mobile
```bash
$ pm2 start yarn --name "order-node-frontend" -- devm
```

#### tablet
```bash
$ pm2 start yarn --name "order-node-frontend" -- devt
```

## 프로덕트 환경 실행 명령어
### 빌드
```bash
$ yarn build
```

### 실행
#### mobile
```bash
$ pm2 start yarn --name "order-node-frontend" -- mobile
```

#### tablet
```bash
$ pm2 start yarn --name "order-node-frontend" -- tablet
```

