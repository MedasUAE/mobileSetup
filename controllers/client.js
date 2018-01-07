var mongoose = require('mongoose');
var ClientModel = require('../models/Client');

function getInsurances(client, next){

    ClientModel.find({name:client},(err,result)=>{
        if(err) return next(err);
        return next(null,result);
    })
}

function getDoctors(client, next){
    ClientModel.findOne({name:client},(err,result)=>{
        if(err) return next(err);
        if(!result) return next(null,[]);
        return next(null,result.doctors);
    });
}

function getBaseUrl(client,next){
    ClientModel.findOne({ name: client },(err,result)=>{
        if(err) return next(err);
        if(!result) return next("NoClientPresent");
        if(!result.baseUrl) return next("NoURL");
        return next(null,result.baseUrl);
    })
}

function addClient(client, next){
    const data = { name: client };
    var client = new ClientModel(data);
    client.save(function(err, result) {
        if (err) return next(err)
        return next(null,result);
    })
}

function prepareInsulranceList(result){
    let insurances = [];
    const name_en = 0, name_ar = 1, description_en = 2, description_ar = 3, img = 4; 
    result.forEach(insurance => {
        insurances.push({
            name_en: insurance[name_en],
            name_ar: insurance[name_ar],
            description_en: insurance[description_en],
            description_ar: insurance[description_ar],
            img: insurance[img]
        }); 
    });
    return insurances;
}

exports.getInsurances = getInsurances;
exports.getDoctors = getDoctors;
exports.addClient = addClient;
exports.getBaseUrl = getBaseUrl;