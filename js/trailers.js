let trailersMainSlide;
let trailersUl;
let trailersVideo;
let trailersMain;
let trailersIndecatorDiv;
let trailersIndecatorUl;
let trailersIndecatorLi;
let btnMainClose;
let trailersUlWidth = 0;
let leftValue = 0;
let trailersUlCheck = true;
let trailersCheck = true;
let MoveInterval;
let trailersData;
let commonTrailersIndex = 2;
let trailersMainIndex = 0;

window.addEventListener('DOMContentLoaded', function(){
    console.log("trailer");
    trailersMainSlide = document.querySelector('.main_slide');
    trailersUl = document.querySelector('.trailers_ul');
    trailersMain = document.querySelector('.main_video');
    trailersVideo = trailersMain.querySelector('video');
    trailersIndecatorDiv = document.querySelector('.trailers_indecator');
    trailersIndecatorUl = document.querySelector('.trailers_indecatorUl');
    btnMainClose = document.querySelector('.close_btn');
    trailersUlWidth = trailersUl.getBoundingClientRect().width;

    trailersUl.addEventListener('mouseenter', trailerUlStop);
    trailersUl.addEventListener('mouseleave', trailerUlMove);
    trailersUl.addEventListener('click', trailerMainOn);
    btnMainClose.addEventListener('click', trailerMainOff);
    trailersIndecatorDiv.addEventListener('click', trailerIndecatorChange);
});

function trailerMainOn(){
    console.log("호출호출클릭호출On");
    var mainIndex = getIndex(event.target);
    console.log(mainIndex);
    
    trailersUl.removeEventListener('mouseleave',trailerUlMove);
    trailersMainSlide.classList.add('main_slide_visible');
    trailersMain.classList.add('main_video_active');

    trailerIndecatorChange();
}

function trailerMainOff(){
    console.log("호출호출클릭호출Off");

    trailersUl.addEventListener('mouseleave',trailerUlMove);
    trailersMainSlide.classList.remove('main_slide_visible');
    trailersMain.classList.remove('main_video_active');
    trailerUlMove();
}

function trailerIndecatorChange(){
    var mainIndex = getIndex(event.target);

    trailersVideo.src = trailersData[mainIndex].video;
    trailersIndecatorLi[trailersMainIndex].classList.remove('trailers_indecator_active');
    trailersIndecatorLi[mainIndex].classList.add('trailers_indecator_active');
    trailersMainIndex = mainIndex;
}

 //영상페이지의 article이 활성화되면 같이 호출되어야함.

 // move stop 로직수정해야됨. 온오프를 딜레이없이 작동하게 하고, move 일때 자연스럽게 움직이게해야됨 
function trailerUlMove(){
    MoveInterval = setInterval(function(){
        console.log(leftValue);
        if(trailersUlCheck){
            leftValue += 400;
            if(trailersUlWidth <= leftValue){
                trailersUlCheck = false;
                leftValue = trailersUlWidth;
            }
        }else{
            leftValue -= 400;
            if(leftValue <= 0){
                trailersUlCheck = true;
                leftValue = 0;
            }
        }
        trailersUl.style.left = -leftValue + "px";
    }, 1000);
}

function trailerUlStop(){
    clearInterval(MoveInterval);
}

function switchTrailers(){
    if(trailersCheck == true){
        console.log("trailers 첫 실행시에만 뜨는 로그");
        trailersCheck = false;
        trailersData = responseObject.menus[commonTrailersIndex].trailers;
        
        for(var i = 0; i < trailersData.length; i++){
            trailersAdd(trailersUl, trailersIndecatorUl, i, trailersData);
        }
        trailersIndecatorLi = trailersIndecatorDiv.querySelectorAll('li');
        trailerUlMove();
    }

}

var trailersLiLeft = 0; //48씩 증가되는 상태
function trailersAdd(ul, indecatorUl, index, trailersData){

    //메인에서 이 함수를 호출합니다.
    //메인에서 index 값을 같이 넘겨줍니다. (json data 의 cast 길이값)
    //호출되면 하는 역할은 ul 안에 li를 만들어줍니다. (ok)
    //li 안에 json 데이터에서 필요한 이미지경로등을 꺼내와 넣어줍니다.
    //메인에서 json 데이터의 cast 길이만큼 호출을 하게되면 그만큼 li가 생성되는 구조 입니다.
    //퀵메뉴의 li 갯수도 cast li 의 갯수만큼 같이 생성해 줍니다.

    //ul 안에 li를 만들어줍니다.
    var li = document.createElement('li');
    li.classList.add('slide_list');
    li.style.left = trailersLiLeft + "%";
    li.style.background = "url(" + trailersData[index].img + ") center center / cover";
    ul.append(li);

    var indecatorLi = document.createElement('li');
    indecatorUl.append(indecatorLi);

    trailersLiLeft += 48;
 
}

function trailersOff(){
    //트레일러 아티클 display None 처리
    // trailerMainOff(); //move가 들어있어서 clear 해야함
}