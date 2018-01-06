var restify = require('restify');
var plugins = require('restify').plugins;
const corsMiddleware = require('restify-cors-middleware')

var config = require('./config/config')
require('./config/global');
var insurance = require('./controllers/insurance')

var server = restify.createServer();
server.use(plugins.queryParser());

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['Authorization'],
    exposeHeaders: ['API-Token-Expiry']
})
  
server.pre(cors.preflight)
server.use(cors.actual)

server.get("/getbaseurl", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    const url = global.baseURL[req.query.client];
    
    if(!url) {
        sendEmail(req.query.client);
        return res.send(400,{error:"NoURL"});
    }
    return res.json({url:url});   
});

server.get("/getinsurance", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    insurance.getInsurance((err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({data:result});   
    });
});

function sendEmail(client){
    console.log("SendEmail:",client);
}

server.listen(config.port,()=>{
    console.log("server connected: ", config.port);
});