const ul = document.querySelector("ul");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const lis = ul.querySelectorAll("li");
let len = lis.length; // li의 개수 자동계산
let enableClick = true;

init();

// next 슬라이더
next.addEventListener("click", (e) => {
    e.preventDefault();
    if (enableClick) {
        nextSlide();
        enableClick = false;
    }
})
// prev 슬라이더
prev.addEventListener("click", (e) => {
    e.preventDefault();
    if (enableClick) {
        prevSlide();
        enableClick = false;
    }
})
/*
console.log(1);
requestAnimationFrame(() => {
    console.log(2);
})
console.log(1);
*/
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

loop 슬라이더의 기본 방식
1. 초기 ul의 위차값 left, margin-left를 -100% 설정
=> loop가 되려면 반드시 보여지는 패널의 앞뒤에 최소 1개의 패널이 존재해야한다
2. 슬라이드의 기본 모션
prev버튼 클릭시 -100% -> 0%
next버튼 클릭시 -100% -> -200%
3. 이동이 끝나고 나서는
앞이나 뒤에 쌓인 패널을 다시 앞이나 뒤로 재배치를 해줘야한다 (loop 조건)
하지만 -200%, 0%상태이기 때문에 다시 -100%인 상태로 변경을 해주어야
우리가 보려는 패널이 정상적으로 보이게된다
4. ul의 초기위치를 항상 다시 -100%로 초기화 한다
*/
// 함수 정의 구간
function init() {
    // 순환형으로 만들기 위한 코드
    ul.style.left = "-100%"; // ul의 초기 위치값 지정
    ul.prepend(ul.lastElementChild); // 로딩 후 첫 번째 li가 frame에 보이도록 한다

    // ul의 너비값을 li의 개수에 맞춰서 자동계산
    ul.style.width = `${100 * len}%`;
    // 각 li의 너비값을 자동계산
    lis.forEach((el) => {
        el.style.width = `${100 / len}%`;
    })
}
function nextSlide() {
    // 다음 슬라이더로 이동시키는 코드
    // ul.style.marginLeft = "-200%";
    // ul.append(ul.firstElementChild);
    // ul.style.marginLeft = "-100%";
    new Anim(ul, {
        prop : "left",
        value : "-200%",
        duration : 1000,
        callback : () => {
            ul.style.left = "-100%"; // 초기 위치 복귀
            ul.append(ul.firstElementChild); // 첫 번째 li를 맨 뒤로
            enableClick = true;
        }
    });
}
function prevSlide() {
    // 이전 슬라이더로 이동시키는 코드
    // ul.style.marginLeft = "0%";
    // ul.prepend(ul.lastElementChild);
    // ul.style.marginLeft = "-100%";
    new Anim(ul, {
        prop : "left",
        value : "0%",
        duration : 1000,
        callback : () => {
            ul.style.left = "-100%"; // 초기 위치 복귀
            ul.prepend(ul.lastElementChild); // 마지막 li를 맨 앞으로
            enableClick = true;
        }
    });
}