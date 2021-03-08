module.exports = (config, env) => {
    if(env==="production"){
        config.output.publicPath="/projects/clock/"
    }
    return config;
};