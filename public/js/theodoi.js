let total=Math.ceil( document.getElementById('totalPage').innerHTML/12);
let pagination=new Pg(total);
pagination.setup({baseUrl:"/Comics/Follow"});
pagination.HTMLRender(".pg");