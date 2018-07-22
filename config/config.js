module.exports = {
    name: "mobileAPI",
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || "http://localhost:3000",
    db:process.env.MONGODB || 'mongodb://test:test123@ds219000.mlab.com:19000/test-mobile-setup'
}