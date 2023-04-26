let ul = document.querySelector("ul");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let lis = ul.querySelectorAll("li");

ul.style.marginLeft = "-100%";

next.addEventListener("click", (e) => {
    e.preventDefault();

    ul.style.marginLeft = "-200%";
    ul.append(ul.lastElementChild);
})
prev.addEventListener("click", (e) => {
    e.preventDefault();

    ul.style.marginLeft = "0%";
})
/*
DOM 구조 변경
부모 요소의 안쪽 - 가장 뒤에 자식요소 삽입
부모요소명.append(자식요소)

부모 요소의 안쪽 - 가장 앞에 자식요소 삽입
부모요소명.prepend(자식요소)

loop 슬라이더의 경우
프레임을 기준으로 양쪽에 적어도 하나 이상의
패널이 있어야 하므로 최소 3개의 패널이 있어야
loop를 할 수 있다

loop를 시키려면 DOM 구조를 변경시켜서
앞의 요소가 뒤로, 뒤의 요소가 앞으로 변경되어야
loop가 가능한데, 이렇게 하였을 때 DOM의
구조순서를 따라 설정하는 nth의 CSS코드는
적용할 수 없다. nth로 적용할 경우 DOM 구조가
변경되면 순서도 변경되어 고유한 스타일이
입혀지는 게 아니라, 변경된 순서가 입혀진대로
CSS가 입혀지는 결과가 발생한다

해결방법 1: 클래스를 매 프레임마다 적용해서 하는 방법
2. data 속성을 부여하여 적용시키는 방법

data 속성이란?
개발자가 속성값으로 특정 정보를 은닉하는 방법이다
DOM 요소에는 영향을 주지 않는다
data-이름 = "";
data 속성으로 지정하고, 값은 개발자가 자유롭게
활용할 수 있다
*/