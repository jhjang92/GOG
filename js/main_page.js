var mainData;

fetch("json/main.json")
    .then(response => response.json())
    .then(function(response){
        mainData = response;
        initMainPage();
        initTrailer();
    })

function initMainPage(){
    var mainPage = document.querySelector('.main_page');
    var mainPageH3 = mainPage.querySelector('h3');
    var playVideoBtn = mainPage.querySelector('button');
    var mainPageVideo = mainPage.querySelector('.main_video');
    var mainVideoCloseBtn = mainPageVideo.querySelector('img');

    playVideoBtn.addEventListener('click', goStopVideo);
    mainVideoCloseBtn.addEventListener('click', closeVideo);

    // pageClick & Scroll
    var topMent = document.querySelectorAll('header nav ul');
    var commonPages = document.querySelectorAll('.common_page');
    var pageCheck = true, pageIndex = 0, clickIndex, targetIndex, scrollActive;

    topMent.forEach(function(topmenu){
        topmenu.addEventListener('click',clickFullPage);
    });

    zIndexAdd(commonPages);

    [].forEach.call(commonPages, function(call){
        call.addEventListener('wheel', scrollFullPage);
    });

    mainPageH3.className = "active";
    // function - InterRaction - PageClick & Scroll
    function clickFullPage(){
        clickIndex = getIndex(event.target);

        if(event.target.tagName == "UL"){
            return;
        }
        if(event.currentTarget.className == "top_menu02"){
            clickIndex += 3;
        }

        if(clickIndex == pageIndex){
            
        }else if(clickIndex > pageIndex){
            targetIndex = clickIndex;

            for(pageIndex; pageIndex < clickIndex;){
                downScroll();
            }
        }else if(clickIndex < pageIndex){
            targetIndex = clickIndex;

            for(pageIndex; pageIndex > clickIndex;){
                upScroll();
            }
        }else{
            console.log("error");
        }
    }
    function scrollFullPage(){
        
        if(event.target.tagName == "P"){ return; }

        if(pageCheck){
            pageCheck = false;
            console.log(event.target);
            var eventDeltaY = event.deltaY;
            targetIndex = getIndex(event.target);

            if(eventDeltaY >= 0){
                if(targetIndex < commonPages.length-1 && pageIndex < commonPages.length-1){
                    scrollPageTarget = event.target;
                    downScroll();
                }
            }else{
                if(targetIndex != 0 && pageIndex > 0){
                    upScroll();
                }
            }
            clearTimeout(scrollActive);
            scrollActive = setTimeout(function(){
                pageCheck = true;
            }, 1000);
        }
    }
    function downScroll(){
        commonPages[pageIndex].classList.remove("page_active");
        pageIndex++;
    }
    function upScroll(){
        pageIndex--;
        commonPages[pageIndex].classList.add("page_active");
    }
    // function - InterRaction - mainPage
    function goStopVideo(){
        if(playVideoBtn.className == ""){
            playVideoBtn.querySelector('img').src = "img/main/pause.png";

            playVideoBtn.className = "playMovie";
            mainPageVideo.classList.add('main_video_active');
            mainPageVideo.querySelector('video').play();
        }else{
            playVideoBtn.querySelector('img').src = "img/main/playing.png";

            playVideoBtn.className = "";
            mainPageVideo.querySelector('video').pause();
        }
    } 
    function closeVideo(){
        mainPageVideo.classList.remove('main_video_active');
        playVideoBtn.querySelector('img').src = "img/main/playing.png";
        playVideoBtn.className = "";
        mainPageVideo.querySelector('video').pause();
        mainPageVideo.querySelector('video').load();
    }
    
}