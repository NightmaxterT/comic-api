//Back to top
window.onscroll = function () {
    scrollFunction()
};

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
//Select Chappter

let dropdow=document.getElementById('dropdownMenuButton');
let area=document.getElementById('area');
area.addEventListener('mouseover',onclickEvent);

function onclickEvent(x){
   let select=document.getElementById(x);
   select.selected="selected";
}

// area.value="";




