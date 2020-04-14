//check mat khau dang ki

let mk1=document.getElementById('mk1');
let mk2=document.getElementById('mk2');
let note1=document.getElementById('note1');
let note2=document.getElementById('note2');
let summit=document.getElementById('summit');
function check(){
    if(mk1.value!=mk2.value){
        note1.style.display="block";
        note2.style.display="block";
    return false;
    }
}
summit.addEventListener('click',check);

