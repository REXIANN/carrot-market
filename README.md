# Carrot Market by REXIANN

```shell
yarn dev
```

## installation

read [this](./docs/installation.md)

## TailwinCss

유틸리티 CSS framework -> utility 란 아주 크고 뚱뚱한 css 파일들을 많이 가지고 있으며 이 css 파일들은 미리 선언된 클래스네임들을 (엄청나게 많이) 가지고 있다.

tailwind는 JIT compiler를 사용해서 사용되는 클래스네임만을 골라내어 번들링하기 때문에 사이즈가 작다.
다시말해 production 에서 사용되는 css파일들이 가능한 가장 작은(smallest) 크기라고 생각할 수 있다.

vscode 의 경우 tailwind css intellisense plugin을 설치해주면 좋다. 클래스이름들이 실제로 가지는 클래스를 마우스를 호버해서 확인해볼 수 있다.
