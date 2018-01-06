
var gsheet = require('../googlesheet');

function getInsurance(next){
    gsheet.gsheetAccess('insurance!A2:E', (err,result)=>{
        return next(null, prepareInsulranceList(result))
    });
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

exports.getInsurance = getInsurance;