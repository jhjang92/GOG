window.addEventListener('DOMContentLoaded', function(){
    var contentBox = document.querySelector('.cast_article_box');
    var contentBoxH3 = contentBox.querySelector('h3');
    var castUlBox = contentBox.querySelector('.cast_box');
    var castList = castUlBox.querySelectorAll('li');
    var castInfoBox = contentBox.querySelector('.cast_info');
    var castInfoBackBtn = castInfoBox.querySelector('button');

    var castActiveChk = true, castInfoChk = true;
    castUlBox.addEventListener('click', castInfoActive);
    castInfoBackBtn.addEventListener('click', castInfoBack);

    // cast_List 클릭 시
    function castInfoActive(){
        if(castActiveChk && castInfoChk){
            castActiveChk = false;

            var targetIdx = getIndex(event.target);
            console.log(event.target);
            for(let i = 0; i < castList.length; i++){
                if(i == targetIdx){
                    castList[i].className = "cast_active";
                }else{
                    castList[i].className = "cast_off";
                    setTimeout(function(){
                        castList[i].style.display = "none";
                    }, 1000);
                }
            }
            // 아래 setTimeOut 을 뒤로가기 버튼 눌렀을때 작동되게끔
            setTimeout(function(){
                castActiveChk= true;
            }, 1000);
            contentBoxH3.className = "h3_cast_active";
            castInfoBox.style.display = "block";
        }
    }

    // cast_List close
    function castInfoBack(){
        if(castInfoChk && castActiveChk){
            castInfoChk = false;

            for(let i = 0; i < castList.length; i++){
                console.log('castInfoBack');
                castList[i].style.display = "";
                setTimeout(function(){
                    castList[i].className = "";
                },100);
            }
            setTimeout(function(){
                castInfoChk= true;
            }, 1000);
            
            contentBoxH3.className = "";
            castInfoBox.style.display = "none";
        }
    }
});