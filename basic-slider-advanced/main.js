let panel = document.querySelector(".panel");
let btns = document.querySelectorAll(".btns li");
let ring = document.querySelector("#ring");
// 유사 배열로 li를 binding해서 반환한 값에 btns
btns.forEach((el, index) => {
    el.addEventListener("click", e => {
        e.preventDefault();
        movePanel(index);
        actClass(index);
        rotRing(index);
        // 재이벤트 방지 1: 활성화 클래스가 있다면
        // return으로 중지시키는 방법

        // 재이벤트 방지 2: 활성화 되어 이벤트가
        // 발생하면, 이벤트 지속시간동안
        // 클릭 자체를 불가능하게 하여
        // 재이벤트가 부여되지 않도록 하는 방법,
        // 이벤트 지속시간이 끝나면 클릭이
        // 되게끔 복구 (동기적 수행)
    });
})
/*
함수 패키징: 기능 단위로 함수를 만드는 방법
단점 - 기능이 세부적으로 나누어지는 경우
기능 단위의 함수 패키징을 하게 되면
너무 많은 함수로 쪼개져서 오히려 코드가 복잡해진다

그렇다고, 세부적이 아니라 매개변수별 혹은
다른 방법 중에 좀 더 큰 덩어리로 쪼개지는
함수 패키징을 하게되면 패키징의 의미가 퇴색된다

따라서 함수 패키징은 함수 자체가 복잡한 경우
기능이 뒤섞여서 가독성이 좋지 않은 경우에만
하는 것이 일반적이다

혹은 유지보스 차원에서 패키징을 하게되면 이득을
보는 경우 번잡한 코드가 되더라도 패키징을
하게 될 때가 있다

결론: 함수 패키징은 단점이 존재하고 이것을
극복하려면 객체 지향을 해야한다
*/
function movePanel(idx) {
    panel.style.marginLeft = "-100" * idx + "%";
    panel.style.transition = "0.5s"; // 동적 접근
}
function actClass(idx) {
    for(let el of btns) el.classList.remove("on");
     btns[idx].classList.add("on");
}
function rotRing(idx) {
    // ring.style.rotate = "60" * index + "deg";
    ring.style.transition = "0.5s";
    ring.className = "";
    ring.classList.add("rot" + idx);
}