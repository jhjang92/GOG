
window.addEventListener('DOMContentLoaded',function(){
    
    let itemsCheck = true;

    let clickEventIndex;
    let pageIndex = 0;
    let startandCheck = true;
    var timeout;

    // let topMenu = document.querySelectorAll('.top_menu li');
    let topMenus = document.querySelector('.top_menu');
    let commonPages = document.querySelectorAll('.common_page');

    topMenus.addEventListener('click', fullPageClick);
    // [].forEach.call(topMenu, function (headerMenu){
    //     headerMenu.addEventListener('click', fullPageClick);
    // });

    [].forEach.call(commonPages, function (call){
        call.addEventListener('wheel', fullPageScroll);
    });
    commonPages = document.querySelectorAll('.common_page');
    zIndexAdd(commonPages);

    function fullPageClick(){
        console.log("풀페이지클릭 시작");
    
        //클릭한 객체의 인덱스
        clickEventIndex = getIndex(event.target);
        console.log(clickEventIndex + " click ||| pageindex : " + pageIndex);

        //클릭한 객체 인덱스 가 현재 선택되어있는 페이지 인덱스와 같은지
        if(clickEventIndex == pageIndex){
        // console.log("현재페이지 입니다.");
        }else if(clickEventIndex > pageIndex){
            eventTargetIndex = clickEventIndex;
            
            for(pageIndex; pageIndex < clickEventIndex;){
                scrollDown(clickEventIndex);
            }

        }else if(clickEventIndex < pageIndex){
            eventTargetIndex = clickEventIndex;
            
            for(pageIndex; pageIndex > clickEventIndex; pageIndex){
                scrollUp();
            }
        }else {console.log("error");};
        console.log("click : " + clickEventIndex + " ||| eventindex : " + eventTargetIndex + " || pageindex : " + pageIndex);
    }

    function fullPageScroll(e){

        console.log("스크롤");
        if(startandCheck == true){
            startandCheck = false;

            let eventDeltaY = event.deltaY;
            eventTargetIndex = getIndex(event.target);

            if(eventDeltaY >= 0){
                if(eventTargetIndex < commonPages.length-1 && pageIndex < commonPages.length-1){
                    console.log(event.target);
                    console.log(event.target.parentNode.parentNode);
                    let fullpagescrollTarget = event.target;
                    //if문 나중에 로직수정예정 -> 타겟이 전체페이지 일때만 스크롤링하게끔
                    if(fullpagescrollTarget.className == "quick_menu" || fullpagescrollTarget.parentNode.className == "gallery_ul" ||
                       fullpagescrollTarget.parentNode.className == "quick_menu" || fullpagescrollTarget.parentNode.parentNode.className == "gallery_box" ||
                       fullpagescrollTarget.parentNode.parentNode.className == "quick_cast_menu"){
                        console.log("quick_menu 구나2222?");
                        
                    }else{
                        scrollDown((pageIndex+1));
                    }
                }
            }else{
                if(eventTargetIndex != 0 && pageIndex > 0){
                    if(event.target.parentNode.className == "quick_menu" ||  event.target.parentNode.className == "gallery_ul" ||
                       event.target.parentNode.parentNode.className == "quick_cast_menu" || event.target.parentNode.parentNode.className == "gallery_box"){
                        console.log("quick_menu 구나11111?");
                    }else{
                        scrollUp();
                    }
                }
            }
            clearTimeout(timeout);
            timeout = setTimeout(function(){startandCheck = true;}, 1000);
        }
    }
    function scrollUp(){
        pageIndex--;
        commonPages[pageIndex].classList.add("page_active");
   
    }

    function scrollDown(idx){
        commonPages[pageIndex].classList.remove("page_active");
        pageIndex++;

        console.log(idx);
       
    }

});

