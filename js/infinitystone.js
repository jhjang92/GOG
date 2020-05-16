
window.addEventListener('DOMContentLoaded', function(){
        var stoneContent = document.querySelector('.infinitystone_content');
        var stoneUl = stoneContent.querySelector('ul');
        var stoneLi = stoneUl.querySelectorAll('li');
        var stoneBtn = stoneUl.querySelectorAll('li p button');
        var popupModalBg = document.querySelector('.popup_bg');
        var popupModal = popupModalBg.querySelector('.popup_stone');

        stoneContent.addEventListener('click', btnPopupOnoff);

        function btnPopupOnoff(){
                if(event.target.className == 'btn'){
                        popupModalBg.classList.add('popup_bg_on');
                        popupModal.classList.remove('popup_stone_off');
                        popupModal.classList.add('popup_stone_on');
                }else if(popupModal.className.includes('popup_stone_on')){
                        popupModal.classList.remove('popup_stone_on');
                        popupModal.classList.add('popup_stone_off');
                        setTimeout(function(){
                                popupModalBg.classList.remove('popup_bg_on');
                        }, 1200);
                }
        }


        function popupUpdate(){

        }

});