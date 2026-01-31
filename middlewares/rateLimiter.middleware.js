const ipStore = {};
export const rateLimiter = (req,res,next)=>{
    const ip = req.ip;
    const currentTime = Date.now();

    if(!ipStore[ip]){
        ipStore[ip] = [];
    }

    ipStore[ip] = ipStore[ip].filter(time => currentTime - time<6000);

    if(ipStore[ip].length >= 3){
        return res.status(429).json({msg:'too many requests'});
    }

    ipStore[ip].push(currentTime);
    next();
}