module.exports = {
    name: "mobileSetupAPI",
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || "http://localhost:3000",
    HOME:"/Users/talatmahmood/",
    db: process.env.MONGODB || 'mongodb://medasuae:medas123@ds143907.mlab.com:43907/medas-mobile',
    
}