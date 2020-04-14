let button_addon2=document.getElementById('button-addon2');
let searchComic=document.getElementById('searchComic');

button_addon2.addEventListener('click',search);

function search(e){
    var name=searchComic.value;
    window.location.href=('/Comics/'+name);
    if(e.keyCode==13)
    window.location.href=('/Comics/'+name);
}
$('button-addon2').keyup(function(e) {
    if (e.keyCode == 13) {var name=searchComic.value;
        window.location.href=('/Comics/'+name); }     // enter
    
  });
