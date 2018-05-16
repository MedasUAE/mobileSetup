var restify = require('restify');
var plugins = require('restify').plugins;
const corsMiddleware = require('restify-cors-middleware');
var mongoose = require('mongoose');
require('dotenv').config() // Loads .env
var config = require('./config/config');
require('./config/global');
var client = require('./controllers/client');

var server = restify.createServer({
    name: 'mobileSetup',
    versions: ['1.0.0']
});

server.use(plugins.queryParser());

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['Authorization'],
    exposeHeaders: ['API-Token-Expiry']
});
  
server.pre(cors.preflight)
server.use(cors.actual)

server.pre((req,res,next)=>{
    let pieces = req.url.replace(/^\/+/, '').split('/');
    let version = pieces[0];
    
    version = version.replace(/v(\d{1})\.(\d{1})\.(\d{1})/, '$1.$2.$3');
    version = version.replace(/v(\d{1})\.(\d{1})/, '$1.$2.0');
    version = version.replace(/v(\d{1})/, '$1.0.0');

    if (server.versions.indexOf(version) > -1) {
        req.url = req.url.replace(pieces[0] + '/', '');
        req.headers = req.headers || [];
        req.headers['accept-version'] = version;
    }
    else if(server.versions.indexOf(version) == -1)
        return res.send(400, {DisplayMessage:"VERSION NOT SUPPORT"});

    return next();
   
    // const version = req.headers['accept-version'];
    // if(!version)
   
    //     req.headers['accept-version'] = '1.0.0';
    // else if(server.versions.indexOf(version) == -1)
    //     return res.json(400, {error: "version not supported"})
    // return next(null)

});

/**
 * Connect to MongoDB.
 */
mongoose.connect(config.db);
mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

server.get("/getbaseurl", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.getBaseUrl(req.query.client,(err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({url:result}); 
    });
});

server.get("/getinsurances", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.getInsurances(req.query.client,(err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({data:result});   
    });
});

server.get("/getdoctors", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.getDoctors(req.query.client,(err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({data:result});   
    });
});

server.get("/getdepartments", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.getDepartments(req.query.client,(err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({data:result});   
    });
});

server.get("/getnews", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.getNews(req.query.client,(err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({data:result});   
    });
});

server.get("/getfacilities", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.getFacilities(req.query.client,(err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({data:result});   
    });
});

server.get("/getaboutus", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.getAboutus(req.query.client,(err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({data:result});   
    });
});

server.get("/getpharmacies", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.getPharmacies(req.query.client,(err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({data:result});   
    });
});

server.get("/getclientdetails", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.getClientDetails(req.query.client,(err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({data:result});   
    });
});

server.get("/addclient", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.addClient(req.query.client, (err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({data:result});   
    });
});

server.get("/getlayouts", (req,res)=>{
    const next = (err,result)=>{
        if(err) return res.send(400,{error:err});
        return res.json({data:result});   
    }

    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.getLayouts(req.query.client, next);
});

server.get("/addlayout", (req,res)=>{
    if(!req.query.client) return res.send(400,{error:"NoClient"}); 
    client.addLayout(req.query.client, (err,result)=>{
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