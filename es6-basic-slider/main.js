let panel = document.querySelector(".panel");
let panel_li = panel.querySelectorAll("li");
let btns = document.querySelectorAll(".btns li");
// 유사 배열로 li를 binding해서 반환한 값에 btns
btns.forEach(function(el, index) {
    el.addEventListener("click", function(e) {
        e.preventDefault();

        for(let el of btns) {
            el.classList.remove("on");
        }
        // 클릭한 순번의 
        btns[index].classList.add("on");

        panel.style.marginLeft = "-100" * index + "%";
    });
})