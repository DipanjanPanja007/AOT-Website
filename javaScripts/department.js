//search funcitons
let searches = document.querySelectorAll('.search');
let para = document.querySelectorAll('p');
let a = document.querySelectorAll('a');
function goSearch(val) {
    if (val == '') return;
    sessionStorage.setItem('res', val);
    window.location.href = "../pages/search.html";
}
searches.forEach(search => {
    search.childNodes[3].addEventListener('click', () => {
        let val = search.childNodes[1].value.trim();
        goSearch(val);
    })
})
let searchAny = document.querySelectorAll('.search input');
searchAny.forEach(val => {
    val.addEventListener('keydown', e => {
        if (e.keyCode === 13) {
            goSearch(val.value.trim());
        }
    })
})


// =============================== club details sliding logic  ==============================
//   Initialize Swiper
var swiper;

function autosliding() {
    swiper = new Swiper(".my_Swiper", {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 30,
        speed: 1000,
        autoplay: {
            delay: 2000,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            750: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1246: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
        },
    });

}
autosliding();

document.querySelector('.my_Swiper').addEventListener('mouseover', () => {
    swiper.autoplay.stop();
});

document.querySelector('.my_Swiper').addEventListener('mouseout', () => {
    swiper.autoplay.start();
});



//event slider
let secondSwiper = document.querySelector('.mySwiper2 .swiper-wrapper');
async function getFutureEventData() {
    let res = await fetch('../assets/upcomingEvent/futureEvent.json');
    let data = await res.json();
    data.forEach((val) => {
        let h3 = val.eventName, span = val.shortInfo, srcImg = "../assets/upcomingEvent/eventImage/" + val.link;
        let newNode = document.createElement('div');
        newNode.classList.add('swiper-slide');
        newNode.innerHTML =
        `
        <img src='${srcImg}' loading='lazy' class="eventBox" decoding="async">
        `;
        secondSwiper.appendChild(newNode);
    })
}
getFutureEventData().then(() => {
    requestAnimationFrame(() => {
        var swiper2 = new Swiper(".mySwiper2", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 500,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 2000,
            },
        });
    })
    document.querySelectorAll('.eventBox').forEach(val => {
        val.addEventListener('click', () => {
            window.open("./pages/event.html", '_blank');
        });
    })
})

//copy text
let copyAddress = document.querySelector('.copyAddress');
let addressText = document.querySelector('.addressText');
copyAddress.addEventListener('click', () => {
    let text = addressText.textContent;
    navigator.clipboard.writeText(text);
    copyAddress.style.scale = '0';
    setTimeout(()=>{
        copyAddress.setAttribute('src','../assets/images/icons8-double-tick-24.png');
        copyAddress.style.scale = '1';
    },100)
})