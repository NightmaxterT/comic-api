
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
document.getElementById("myBtn").style.display = "block";
} else {
document.getElementById("myBtn").style.display = "none";
}
}
document.getElementById('myBtn').addEventListener("click", function () {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
});
//Pagination
let total=Math.ceil( document.getElementById('totalPage').innerHTML/12);
let pagination=new Pg(total);
pagination.setup({baseUrl:"/Comics/Pagination"});
pagination.HTMLRender(".pg");
//Select opption

function onclickOpption(e){
    var index=e.target.dataset.id;
    console.log(index);
}

let area=document.getElementById('area');
area.addEventListener('click',onclickOpption);

//logOut




