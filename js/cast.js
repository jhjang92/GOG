window.addEventListener('DOMContentLoaded', function(){
    console.log("cast");
    let quickUl = document.querySelector('.quick_menu');

    quickUl.addEventListener('click', function(){
        quickBtn(event.target);
    });
    quickUl.addEventListener('mousewheel', function(){
        quickMenuScroll();
    });
});

let castPageIndex = 0;
let castLiCheck = true;
let castQuickUlCheck = true;
    let castCheck = true;

var tops = 0;
var quickHeight;
let topPlusHeight = 100;
let eventDeltaY;

let commonCastIndex = 1;
    
let castUl;
let castLl = [];

function quickMenuAdd(ul, index, responseCast){
    var li = document.createElement('li');
    li.style.background = "url('"+ responseCast[index].photo + "') no-repeat center center / cover";
    ul.append(li);
    
}
//처음 한번만 호출되며, json에 담긴 cast 갯수만큼 li 생성해주는 함수
function castAdd(ul, index, responseCast){
    
    //메인에서 이 함수를 호출합니다.
    //메인에서 index 값을 같이 넘겨줍니다. (json data 의 cast 길이값)
    //호출되면 하는 역할은 ul 안에 li를 만들어줍니다. (ok)
    //li 안에 json 데이터에서 필요한 이미지경로등을 꺼내와 넣어줍니다.
    //메인에서 json 데이터의 cast 길이만큼 호출을 하게되면 그만큼 li가 생성되는 구조 입니다.
    //퀵메뉴의 li 갯수도 cast li 의 갯수만큼 같이 생성해 줍니다.

    //ul 안에 li를 만들어줍니다.
    var li = document.createElement('li');
    li.classList.add('cast_page_active');
    ul.append(li);
    
    var img = document.createElement('img');
    img.src = responseCast[index].photo;
    li.append(img);
}


function quickBtn(e){
    //quick 메뉴 클릭시 인덱스뽑는용도
    var targetIndex = getIndex(e);
    console.log(castLiCheck);

    if(castLiCheck == true){
        castLiCheck = false;
        castUl = document.querySelector('.slider');
        castLi = document.querySelectorAll('.slider li');
        console.log(castLi);
    }

    //같은페이지인지 체크
    if(castPageIndex == targetIndex){
        console.log("현재페이지 입니다.");
        return;
    }else if(castPageIndex < targetIndex){
        for(castPageIndex; castPageIndex < targetIndex;){
            leftSlide();
        }
    }else if(castPageIndex > targetIndex){
        for(castPageIndex; castPageIndex > targetIndex;){
            rightSlide();
        }
    }
}
let jsCastDom;

function leftSlide(){
    jsCastDom = document.querySelector('.text_content');
    console.log(jsCastDom);
    console.log("leftSlide" + castPageIndex);
    castLi[castPageIndex].classList.remove("cast_page_active");
    castPageIndex++;
    
    jsCastDom.children[0].innerHTML = responseObject.menus[commonCastIndex].cast[castPageIndex].movieName;
    jsCastDom.children[1].innerHTML = responseObject.menus[commonCastIndex].cast[castPageIndex].name;
    jsCastDom.children[2].innerHTML = responseObject.menus[commonCastIndex].cast[castPageIndex].content;

}

//왼쪽버튼을 눌렀을때 오른쪽으로 이동되는 슬라이드
function rightSlide(){
    --castPageIndex;
    castLi[castPageIndex].classList.add("cast_page_active");
    jsCastDom.children[0].innerHTML = responseObject.menus[commonCastIndex].cast[castPageIndex].movieName;
    jsCastDom.children[1].innerHTML = responseObject.menus[commonCastIndex].cast[castPageIndex].name;
    jsCastDom.children[2].innerHTML = responseObject.menus[commonCastIndex].cast[castPageIndex].content;
}

function quickMenuScroll(){
    if(castQuickUlCheck == true){
        castQuickUlCheck = false;
        quickUl = document.querySelector('.quick_menu');
        quickBox = document.querySelector('.quick_cast_menu');
        console.log(quickUl);
        quickHeight = quickUl.getBoundingClientRect().height - quickBox.getBoundingClientRect().height;
        console.log(quickHeight + ":::");
    }
    eventDeltaY = event.deltaY;
    if(eventDeltaY >= 0){
        if(tops >= quickHeight){
            tops = quickHeight;
        }else{
            tops += topPlusHeight;
            console.log(tops + ":::");
        }
    }else{
        if(tops <= 0){
            tops = 0;
        }else{
            tops -= topPlusHeight;
            console.log(tops + ":::");
        }
    }
    quickUl.style.top = -tops + "px";
}

function switchCast(pageIndex){
    if(castCheck == true){
        console.log("castCheck True 첫실행에만 뜨는 로그");
        //첫 1회만 실행되게 true false 로 막음.
        castCheck = false;
        let ul = document.querySelector('.slider');
        let quickUl = document.querySelector('.quick_menu');
        //이 부분에서 반복문을 돌려서 컨텐츠 태그 캐릭터별로 만들면서 데이터 넣어줘야함.
        let responseCast = responseObject.menus[pageIndex].cast;
        for(var i = 0; i < responseCast.length; i++){
            castAdd(ul, i, responseCast);
            quickMenuAdd(quickUl, i, responseCast);
        }
        castPages = document.querySelectorAll('.cast_page_active');

        zIndexAdd(castPages);

        //cast 도큐먼트 자식중의 이름에 접근하여 json 데이터에 있는 내용으로 교체
        let castDom = document.querySelector('.text_content');
        console.log(castDom.children[0].innerHTML);
        castDom.children[0].innerHTML = responseObject.menus[pageIndex].cast[0].movieName;
        castDom.children[1].innerHTML = responseObject.menus[pageIndex].cast[0].name;
        castDom.children[2].innerHTML = responseObject.menus[pageIndex].cast[0].content;

    }
}