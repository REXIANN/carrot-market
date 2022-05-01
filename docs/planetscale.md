# PlanetScale

planetscale 은 mysql 과 호환되는 서버리스 데이터베이스 플랫폼이다.
데이터 베이스 플랫폼이라 함은 데이터베이스를 제공해준다는 뜻이며, 서버리스라는 뜻은 서버가 없다는 것이 아니라 우리가 서버를 관리할 필요가 없다는 뜻이다. 

하지만 planetscale 은 AWS 의 RDS(관계형 데이터베이스 시스템) 같은 건 아니다. AWS에서는 서버를 만들어야 하고, 크기를 설정하는 등의 작업이 필요하기 떄문이다.
만약 백만명이 내 데이터베이스에 연결되면 확장(scaling)을 해주어야 한다. 하지만 서버리스 플랫폼을 사용하면 그런 작업을 대신 해준다. 안정성을 신뢰할 수 있고 좋은 일이다.

그리고 planetscale 은 mysql-compatible 이라고 적혀있는데, 이는 mysql 을 사용하는 것이 아니라 mysql 과 호환되는 무언가를 사용하기 때문이다.
그 덕분에 provider 를  mysql 로 설정할 수 있는 것이다.

planetscale 이 mysql 서버리스 플랫폼이 아닌 이유는 planetscale 이 vitess 를 가지고 있기 떄문이다.
vitess 는 가장 스케일링 기능이 뛰어난 오픈소스 데이터베이스 이다. vitess 는 유튜브를 scale 하기 위해 구글이 만들었다.
또한 다른 대기업들이 규모에 맞게 sclaing 하기 위해 사용한다. 

원래는 엄청나게 많은 요청이 들어오면 데이터베이스 scaling 도 해야하고, sharding 도 해야하고, 데이터베이스가 죽지 않게 하기 위해 수많은 작업이 필요하다.
vitess 는 이런 일을 대신하기 위해 만들어졌다. 

planetscale 이 좋은 이유 중 하나는 훌륭한 CLI 를 가지고 있다는 것이다. 덕분에 깃을 쓰는 것처럼 데이터베이스를 다룰 수 있다. 
또한 브랜치 기능이 있어서, 데이터베이스를 수정해보고 싶다면 모두가 사용하는 버전이 아니라 새로운 브랜치를 만들어서 거기서 실험을 해보고 괜찮으면 메인 버전에 마이그레이션 할 수 있다.

## start
```shell
pscale auth login
pscale region list # 사용할 리전을 고른다
pscale database create carrot-market --region ap-northeast
```

이제 관리자패널로 돌아가보면 데이터베이스가 만들어져 있다.

이제 URL 을 만들어야 한다. 왜냐하면 만들어진 이 데이터베이스를 prisma 에 연결해야 하기 떄문이다.

원래 데이터베이스를 만들면 암호를 준다. heroku 나 aws 같은 전통적인 회사들은 암호를 주고, 내가 그것을 관리해야 한다.
해당 암호를 환경파일에 넣고 사용하는 것이다. 하지만 이 방식은 암호가 로컬에 저장되어야 하고 이는 누군가 들어와서 볼 수 있기에 위험하다.

그래서 실제로는 두개의 데이터베이스를 사용한다. 컴퓨터에서 서버를 작동할 수 있도록 가짜 데이터베이스를 사용한다. 
그리고 실제 배포할때에는 aws 나 heroku 를 사용하는 것이다. 

planetscale 에서는 일종의 안전한 tunnel 을 사용한다. 컴퓨터와 planetscale 사이에 터널을 만들어서 암호를 알 필요가 없다. 

그럼 어떻게 암호없이 컴퓨터와 planetscale 을 연결할까? 답은 pscale 에 있다. `connect` 명령어가 있는데 이를 사용해 연결한다. 
`pscale connect carrot-market` 을 사용하면 planetscale 에 있는 carrot-market 과 연결된다.
원래 데이터베이스를 연결하는 일은 복잡하다. host와 port 를 복사하고, usename, password 등 모든것을 복사해야 한다. 

연결을 하면 url 이 하나 나오는데, 이 url 이 서버와 연결된 통로인 것이다. 
```shell
pscale auth login # if login needed
pscale connect carrot-market
```


.env 에 다음과 같이 써서 연결할 수 있다.
`DATABASE_URL="mysql:{your-address}/carrot-market"`