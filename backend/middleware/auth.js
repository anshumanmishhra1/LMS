export const auth = (req,res,next)=>{
    console.log('teri ma ki chut');
    const token = req.cookies.token;  

    if(!token){
        return res.status(400).send("Please Login First!");
    }

    next();
}