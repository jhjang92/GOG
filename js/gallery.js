let galleryCheck = true;
let commonGalleryIndex = 3;

let galleryData;
let galleryBox;
let galleryUl;
let galleryImg;

window.addEventListener('DOMContentLoaded', function(){
    console.log("gallery");
    galleryBox = document.querySelector('.gallery_box');
    galleryUl = galleryBox.querySelector('.gallery_ul');
    galleryImg = galleryBox.querySelector('img');
    galleryUl.addEventListener('click', changeImg);
});

function changeImg(){
    var clickIndex = getIndex(event.target);
    galleryImg.src = galleryData[clickIndex].img;
}

function switchGallery(){
    if(galleryCheck == true){
        console.log("galleryCheck 첫 실행시에만 뜨는 로그");
        galleryCheck = false;
        galleryData = responseObject.menus[commonGalleryIndex].gallery;
        
        for(var i = 0; i < galleryData.length; i++){
            galleryAdd(galleryUl, i, galleryData);
        }
        galleryImg.src = galleryData[0].img;
    }

}

function galleryAdd(ul, index, galleryData){

    var li = document.createElement('li');

    // li.classList.add('slide_list');
    li.style.background = "url(" + galleryData[index].img + ") center center / cover";
    ul.append(li);
 
}