var mongoose = require('mongoose');
var ClientModel = require('../models/Client');

function getInsurances(client, next){

    ClientModel.findOne({name:client},(err,result)=>{
        if(err) return next(err);
        if(!result) return next(null,[]);
        // console.log(result,result.insurances);
        return next(null,result.insurances);
    })
}

function getDoctors(client, next){
    ClientModel.findOne({name:client},(err,result)=>{
        if(err) return next(err);
        if(!result) return next(null,[]);
        return next(null,result.doctors);
    });
}

function getNews(client, next){
    ClientModel.findOne({name:client},(err,result)=>{
        if(err) return next(err);
        if(!result) return next(null,[]);
        return next(null,result.news);
    });
}

function getDepartments(client, next){
    ClientModel.findOne({name:client},(err,result)=>{
        if(err) return next(err);
        if(!result) return next(null,[]);
        return next(null,result.departments);
    });
}

function getPharmacies(client, next){
    ClientModel.findOne({name:client},(err,result)=>{
        if(err) return next(err);
        if(!result) return next(null,[]);
        return next(null,result.pharmacies);
    });
}

function getAboutus(client, next){
    ClientModel.findOne({name:client},(err,result)=>{
        if(err) return next(err);
        if(!result) return next(null,[]);
        return next(null,result.aboutus);
    });
}

function getFacilities(client, next){
    ClientModel.findOne({name:client},(err,result)=>{
        if(err) return next(err);
        if(!result) return next(null,[]);
        return next(null,result.facilities);
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

function getClientDetails(client,next){
    ClientModel.findOne({ name: client },(err,result)=>{
        if(err) return next(err);
        if(!result) return next("NoClientPresent");
        let response = {
            address: result.address,
            call:result.call,
            layout: result.layout
        }
        return next(null,response);
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

function getLayouts(client,next){
    ClientModel.findOne({ name: client },(err,result)=>{
        if(err) return next(err);
        if(!result) return next("NoClientPresent");
        let response = {
            layout: result.layout
        }
        return next(null,response);
    })
}

function editLayout(client, layout, next){
    ClientModel.updateOne({name:client}, {layout:layout}, (err, result)=>{
        if(err) return next(err);
        return next(null, "Update done");
    })
}


// function prepareInsulranceList(result){
//     let insurances = [];
//     const name_en = 0, name_ar = 1, description_en = 2, description_ar = 3, img = 4; 
//     result.forEach(insurance => {
//         insurances.push({
//             name_en: insurance[name_en],
//             name_ar: insurance[name_ar],
//             description_en: insurance[description_en],
//             description_ar: insurance[description_ar],
//             img: insurance[img]
//         }); 
//     });
//     return insurances;
// }

exports.getInsurances = getInsurances;
exports.getDoctors = getDoctors;
exports.addClient = addClient;
exports.getBaseUrl = getBaseUrl;
exports.getNews = getNews;
exports.getDepartments = getDepartments;
exports.getPharmacies = getPharmacies;
exports.getFacilities = getFacilities;
exports.getAboutus = getAboutus;
exports.getClientDetails = getClientDetails;
exports.getLayouts = getLayouts;
exports.editLayout = editLayout;