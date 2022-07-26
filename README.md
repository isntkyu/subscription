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
