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


## Prisma
```shell
npm i -D prisma

# use
npx prisma init
Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb (Preview).
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

```

프리즈마가 schema 파일을 보는 이유는 두가지이다. 

1. 모델들을 데이터베이스에 푸시하고 SQL 마이그레이션을 자동으로 처리하기 위해서
2. 데이터베이스와 상호작용하기 위해 client 를 생성하고, client 에 자동완성으로 타입들을 추가함

프리즈마는 엄연히 말하면 mysql 을 쓰지 않는다. mysql-compatible 하다고 설명하는 이유는 mysql 에는 없는 몇가지가 있기 때문이다.
그 중 하나는 foreign key 제약이다.  

실제 데이터베이스의 경우 어떤 항목이 foreign key 이면, 해당 데이터를 데이터베이스에 저장하기 전에 foreign key 에 해당하는  테이블로 가서
그 데이터가 실제로 존재하는지 찾아본다. 그리고 해당 foreign key 는 반드시 존재해야 한다.
이는 당연한데, 댓글을 저장하려면 그 작성자가 존재하는지 확인하는 것과 같다고 할 수 있다.

하지만 프리즈마는 vitess 를 사용하므로 가능하다. vitess 는 데이터베이스를 잘게 쪼개서 여러 서버에 분산시키는 데에 특화되어 있다. 그래서 vitess 는
해당 foreign key 에 해당하는 항목이 존재하는지 확인하지 않는다. 이것을 vitess 가 foreign key constarints 를 지원하지 않는 다고 한다.

그래서 이 역할을 프리즈마에게 위임한다. 이를 위해 코드 두 줄을 추가 해야 한다.
```shell
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["referentialIntegrity"] # this
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  referentialIntegrity = "prisma" # this
}
```

만들어진 스키마를 데이터베이스에 푸시하면 생성된 스키마를 planetscale 에서 볼 수 있다.

```shell
npx prisma db push
npx prisma studio # to run prisma studio

```

## Prisma Client
```shell
 npm i @prisma/client   
```