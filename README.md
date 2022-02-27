# Carrot Market by REXIANN

```shell
task install-all
task dev
```

## installation

read [this](./docs/installation.md)

## Tailwind css

유틸리티 CSS framework -> utility 란 아주 크고 뚱뚱한 css 파일들을 많이 가지고 있으며 이 css 파일들은 미리 선언된
클래스네임들을 (엄청나게 많이) 가지고 있다.

tailwind 는 JIT compiler 를 사용해서 사용되는 클래스네임만을 골라내어 번들링하기 때문에 사이즈가 작다. 다시말해
production 에서 사용되는 css 파일들이 가능한 가장 작은(smallest) 크기라고 생각할 수 있다.

vscode 의 경우 tailwind css intellisense plugin 을 설치해주면 좋다. 클래스이름들이 실제로 가지는 클래스를
마우스를 호버해서 확인해볼 수 있다.

### JIT compiler

tailwind 3.0 이전에는 모든 클래스파일을 들고 있다가 빌드할 때 purge 작업이 필요했다. 하지만 3.0 부터는 JIT
compiler 를 통해서 사용되는 클래스만을 실시간으로 생성한다.

처음에 보면 reset css 들만 가져온다. 왜냐하면 global.css 의 tailwind 속성들 때문이다.

그리고 실제로 우리가 사용하는 클래스명들만 즉시 가져온다. 변경사항을 저장하면 바로 가져와서 head 의 style 항목에 추가한다.
