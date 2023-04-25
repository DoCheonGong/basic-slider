let panel = document.querySelector(".panel");
let btns = document.querySelectorAll(".btns li");
let ring = document.querySelector("#ring");
// 유사 배열로 li를 binding해서 반환한 값에 btns
btns.forEach((el, index) => {
    el.addEventListener("click", e => {
        e.preventDefault();

        panel.style.marginLeft = "-100" * index + "%";
        panel.style.transition = "0.5s"; // 동적 접근
        ring.style.transition = "0.5s";
        // ring.style.rotate = "60" * index + "deg";
        for(let el of btns) el.classList.remove("on");
        btns[index].classList.add("on");

        ring.className = "";
        ring.classList.add("rot" + index);
    });
})