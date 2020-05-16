function initTrailer(){
    
    var trailerPageBox = document.querySelector('.trailers_page');
    var trailerInnerBox = trailerPageBox.querySelector('.trailer_video');
    var trailerPlayBtn = trailerInnerBox.querySelector('.trailer_play_btn');
    var trailerImg = trailerPlayBtn.querySelector('img');
    var trailerVideo = trailerInnerBox.querySelector('video');
    var trailerFigCaption = trailerPageBox.querySelector('figcaption');
    var trailerBtn = trailerPageBox.querySelector('.controller_trail_btn');

    var trailerVideoIdx = 0, trailerVideoCheck = true;
    trailerPlayBtn.addEventListener('click', clickPlayVideo);
    trailerBtn.addEventListener('click', clickVideoBtn);

    changeTrailerResVideo(0);
    function clickPlayVideo(){
        if(trailerVideoCheck){
            trailerVideoCheck = false;
            trailerPlayBtn.className = "active";
            trailerImg.className = "active";
            trailerImg.src = "img/main/pause.png";
            trailerVideo.play();
        }else{
            trailerVideoCheck = true;
            trailerPlayBtn.className = "";
            trailerImg.className = "";
            trailerImg.src = "img/main/playing.png";
            trailerVideo.pause();

        }
    }
    function changeTrailerResVideo(idx){
        trailerImg.className = "";
        trailerPageBox.style.background = "url('"+ mainData.menus[2].trailers[idx].img + "') no-repeat center center / cover" 
        trailerVideo.src = mainData.menus[2].trailers[idx].video;
        trailerFigCaption.innerText = mainData.menus[2].trailers[idx].name;
    }

    function clickVideoBtn(){
        console.log(event.target);
        if(event.target.id == "tarilerBtnLeft"){
            changeTrailerVideo(--trailerVideoIdx);
        }else if(event.target.id == "tarilerBtnRight"){
            changeTrailerVideo(++trailerVideoIdx);
        }
    }

    function changeTrailerVideo(idx){
        console.log(mainData.menus[2].trailers.length);
        if(idx <= 0){
            trailerVideoIdx = 0;
        }else if(idx >= mainData.menus[2].trailers.length-1){
            trailerVideoIdx = mainData.menus[2].trailers.length-1;
        }
        if(!trailerVideoCheck){
            clickPlayVideo();
        }
        changeTrailerResVideo(trailerVideoIdx);
        console.log(trailerVideoIdx);
        
    }
};