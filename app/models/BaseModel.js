/**
* BaseModel with methods for each table
*/
let BaseModel = {
    modelObj:null,
    viewObj:null,



    findById:function(id,callback){

        this.modelObj.findOne({id_user:id}).then(result=>{
            callback(result);
        }).catch(err=>{
            callback(err);
        });
    },

    findOne:function(parameters,callback){

        this.modelObj.findOne(parameters).then((result) => {
            callback(result);
        }).catch(err=>{
            callback(err);
        });
    },
    save: function(model){
        return this.modelObj.save(model);
    },
    delete: function(selector){
        return this.modelObj.destroy(selector);
    }
    ,
    update: function(selector,data){
        return  this.modelObj.update(selector,data);
    }
    ,

    run:function(sql, params){
       return database.query(sql, params)
    },

    count: function(selector){
        return this.modelObj.count(selector).then((result) =>{
            return new Promise((resolve,reject)=>{
                resolve(result);
            });
        })
    },
    find: function(selector,options){
       return this.modelObj.findOne(selector,options);
    },
    findAll: function (selector,options) {
        return this.modelObj.find(selector,options);
    }
};

module.exports = BaseModel;
