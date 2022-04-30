# Prisma

prisma 는 노드와 타입스크립트를 위한 ORM 이다. 데이터베이스와 타입스크립트(또는 자바스크립트) 사이에 다리를 놓아주는 역할을 한다.
prisma는 ORM 이다. 

먼저 prisma 에게 데이터베이스가 어떻게 생겼는지 schema.prisma 파일에 설명을 해주어야 한다.

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        Int @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User? @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

설명을 해주고 나면 prisma 는 데이터베이스를 이해하고 이를 바탕으로 client 를 생성한다. 
client 에는 모든 모델이 들어있다. 이 client 를 사용해 다양한 모델을 조작할 수 있다. 그리고 함수와 객체를 사용할 수 있고 타입스크립트를 이용한 보호도 받을 수 있다.

prisma 는 자동완성도 지원하므로 더욱 편리하다. 이는 prisma 가 이미 모델을 알고 있기 때문이다.

prisma studio 라는 것도 지원한다. 이는 Visual Database Browser 로, 데이터베이스를 위한 관리자 패널과 같은 역할을 한다.
MySQL, SQL Server, SQLite, MongoDB and CockroachDB 에 사용할 수 있다.

우리는 MySQL 을 사용할건데 그 이유는 MySQL 이 planetscale 과 호환되기 때문이다.