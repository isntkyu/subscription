node -v: v16.14.0  
npm -v: 8.3.1

## Installation

```bash
$ npm install
```

## .env 파일 작성

```
NODE_PORT= nodejs 실행 포트
MONGODB_URI= 몽고디비 주소
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

---

## API 명세 (SWAGGER)

- 앱 실행 후 http://localhost:{PORT}/api-docs

---

## MongoDB SCHEMA

### Notices

| key         | type       | required | description        |
| ----------- | ---------- | -------- | ------------------ |
| \_id        | ObjectId   | auto     |
| message     | string     | true     | 소식 제목          |
| messageText | string     | true     | 소식 본문          |
| owner       | Owners     | true     | 소식을 갖는 페이지 |
| writer      | Users      | true     | 작성자             |
| createdAt   | timestamps | auto     | 생성일             |
| updatedAt   | timestamps | auto     | 수정일             |

### Owners

| key         | type            | required | description              |
| ----------- | --------------- | -------- | ------------------------ |
| \_id        | ObjectId        | auto     |
| name        | string          | true     | 페이지 명                |
| city        | string          | false    | 도시 (학교 등 일 경우)   |
| type        | enum(OwnerType) | true     | 페이지의 타입 ex)school  |
| notices     | Notices[]       | false    | 페이지의 소식            |
| subscribers | ObjectId[]      | false    | 페이지의 구독자 Users Id |
| createdAt   | timestamps      | auto     | 생성일                   |
| updatedAt   | timestamps      | auto     | 수정일                   |

### Users

| key              | type           | required | description                          |
| ---------------- | -------------- | -------- | ------------------------------------ |
| \_id             | ObjectId       | auto     |
| name             | string         | true     | 유저명                               |
| type             | enum(UserType) | true     | 유저의 타입 student, parent, teacher |
| subscribingOwner | Owners[]       | false    | 구독중인 페이지                      |
| newsFeed         | ObjectId[]     | false    | 구독중인 페이지의 소식 ObjectId 배열 |
| createdAt        | timestamps     | auto     | 생성일                               |
| updatedAt        | timestamps     | auto     | 수정일                               |

---

## API Testing With Postman

- 학교페이지 생성

```curl
curl --location --request POST 'http://localhost:8092/api/owners' \
--header 'Content-Type: application/json' \
--data-raw '{
    "city": "수원",
    "name": "조원고등학교",
    "type": "school"
}'
```

- 학생 생성

```curl
curl --location --request POST 'http://localhost:8092/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "이준규",
    "type": "student"
}'
```

- 선생 생성

```curl
curl --location --request POST 'http://localhost:8092/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "관리자",
    "type": "teacher"
}'
```

- 구독

```curl
curl --location --request POST 'http://localhost:8092/api/subscriptions' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "62df6ef099b5d0caa56df581",
    "ownerId": "62df6e1599b5d0caa56df57d",
    "ownerType": "school"
}'
```

- 소식 작성

```curl
curl --location --request POST 'http://localhost:8092/api/notices?owner_id=62df6e1599b5d0caa56df57d&user_id=62df6ee599b5d0caa56df57f' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "test title",
    "messageText": "test body"
}'
```

- 소식 수정

```curl
curl --location --request PUT 'http://localhost:8092/api/notices/62df6f9b99b5d0caa56df58a' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "test title edit",
    "messageText": "test body edit"
}'
```

- 구독중인 학교 리스트

```curl
curl --location --request GET 'http://localhost:8092/api/users/62df6ef099b5d0caa56df581/subscribing?owner_type=school'
```

- 페이지의 소식 리스트

```curl
curl --location --request GET 'http://localhost:8092/api/owners/62df6e1599b5d0caa56df57d/notices'
```

- 구독 해지

```curl
curl --location --request DELETE 'http://localhost:8092/api/subscriptions/62df6e1599b5d0caa56df57d?user_id=62df6ef099b5d0caa56df581'
```

- 뉴스피드

```curl
curl --location --request GET 'http://localhost:8092/api/users/62df6ef099b5d0caa56df581/newsfeed'
```

- 소식 삭제

```curl
curl --location --request DELETE 'http://localhost:8092/api/notices/62df6f9b99b5d0caa56df58a?owner_id=62df6e1599b5d0caa56df57d'
```
