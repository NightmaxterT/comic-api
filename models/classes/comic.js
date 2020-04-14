class Comic{

    constructor(Name,NameCommon,Summary,Author,Status,Avatar,Category,View=0,Chappter=[],Follow=0)
    {
        this.Name=Name;
        this.NameCommon=NameCommon;
        this.Summary=Summary;
        this.Author=Author;
        this.Status=Status;
        this.View=View;
        this.Chappter=Chappter;
        this.Follow=Follow;
        this.Avatar=Avatar;
        this.Category=Category;
    }
    
}

module.exports=Comic;