const userModel=require('../user.model');
const bcrypt=require('bcrypt');

class User{

    constructor(Name,User,Pass,comicFllow=[],History=[],role="user",Avatar="/images/avatar.png"){
        this.Name=Name;
        this.User=User;
        this.Pass=Pass;
        this.Avatar=Avatar;
        this.comicFllow=comicFllow;
        this.History=History;
        this.role=role;
    }

}

module.exports=User;