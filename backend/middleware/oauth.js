import jwt from "jsonwebtoken";

export const authorize = () => {
    return(req, res, next) => {
        const token = req.headers["x-auth"];

        if(!token) {
            res.send({message:"blud nema token"});
            return;
        }
    
        try {
            const ttt = jwt.verify(token, "Yqqs8O4sr8auHlMnVbg2PAcTtB1lKLIh");
        
            req.authentication = ttt.id;
        } catch(e) {
            res.send({message:"blud ma mid token"});
            return;
        }

        if(req.authentication != 1){
            res.send({message: "blud NENI admin"})
            return;
        }

        next();
    }
}

export const authorizeUser = () => {
    return(req, res, next) => {
        const token = req.headers["x-auth"];

        if(!token) {
            res.send({message:"blud nema token"});
            return;
        }
    
        try {
            const ttt = jwt.verify(token, "Yqqs8O4sr8auHlMnVbg2PAcTtB1lKLIh");
        
            req.authentication = ttt.id;
        } catch(e) {
            res.send({message:"blud ma mid token"});
            return;
        }

        next();
    }
}