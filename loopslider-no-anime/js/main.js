const ul = document.querySelector("ul");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const lis = ul.querySelectorAll("li");
let len = lis.length; // li의 개수 자동계산
let enableClick = true;

init();
// prev 슬라이더
prev.addEventListener("click", (e) => {
    e.preventDefault();
    if (enableClick) {
        enableClick = false;
        prevSlide();
    }
})
// next 슬라이더
next.addEventListener("click", (e) => {
    e.preventDefault();
    if (enableClick) {
        enableClick = false;
        nextSlide();
    }
})
/*
let start = new Date().getTime();
let callback = function () {
    let ts = new Date().getTime();
    if (ts - 1000 > start) {
        // console.log("End");
    }
    else {
        console.log(ts);
        requestAnimationFrame(callback);
    } // 반복 호출
}
requestAnimationFrame(callback);
*/
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
    });
}
function prevSlide() {
    const duration = 1000;
    // 지정한 지속시간 (슬라이드가 이동하는 시간) 고정
    const initialValue = parseInt(ul.style.left) || 0;
    // 현재 패널의 위치를 초기화값으로 지정해서 넣되,
    // 정수값으로 반환
    // default는 0
    const targetValue = 0; // 목표 위치값 -100 => 0
    const unit = "%";
    const startTime = performance.now();
    // 초기 페이지 로딩 시각부터 함수가 실행되는 시간
    // console.log(startTime);

    function animate(time) {
        // console.log(time);
        // requestAnimationFrame이 메소드가 호출되면서
        // 반환되는 시간값으로, 최종 종료된 시점의 시간이 time
        const timeElapsed = time - startTime;
        // console.log(timeElapsed);
        // timeElapsed가 실제 진행 시간
        // (전체 시간) - (함수가 실행되는 시점의 시간)
        const progress = timeElapsed / duration;
        // 정한 시간을 분모로 해서 함수가 진행되는 시간이 분자가 되는,
        // 진행상황을 0과 1 사이의 값으로 반환 (0 < progress < 1)

        const currentValue = initialValue + ((targetValue - initialValue) * progress);
        ul.style.left = `${currentValue}${unit}`;
        // 0으로 가도록 하는 코드로 수학적 공식과 default 값이 적용된 내용

        // progress의 값을 기준으로 1보다 작으면 해당 animate를 계속 호출하고
        // => 종료지점까지 진행시키고 그 과정들도 볼 수 있도록 한다
        // (transition이 적용되는 것처럼)

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 최종 1이 되었을 때 기본로직처럼 초기화하는 코드
            ul.style.left = "-100%";
            ul.prepend(ul.lastElementChild);
            // 다시 되돌려서 animate 함수(callback)를 사용할 수 있도록 하는 코드
            if (typeof callback === "function") callback();
        }
    }
    requestAnimationFrame(animate);
    enableClick = true;
    /*
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
    */
}
function nextSlide() {
    const duration = 1000;
    const initialValue = parseInt(ul.style.left) || 0;
    const targetValue = -200;
    const unit = "%";
    const startTime = performance.now();
    // 초기 페이지 로딩 시각부터 함수가 실행되는 시간
    // console.log(startTime);

    function animate(time) {
        // console.log(time);
        const timeElapsed = time - startTime;
        const progress = timeElapsed / duration;

        const currentValue = initialValue + ((targetValue - initialValue) * progress);
        ul.style.left = `${currentValue}${unit}`;

        if(progress < 1) {
            requestAnimationFrame(animate);
        } else {
            ul.style.left = "-100%";
            ul.append(ul.firstElementChild);
            if (typeof callback === "function") callback();
        }
    }
    requestAnimationFrame(animate);
    enableClick = true;
    /*
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
    */
}