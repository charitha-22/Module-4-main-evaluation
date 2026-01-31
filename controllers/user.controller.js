import { supabase } from "../config/supabase.config.js";

export const signup = async (req, res) => {
    const {name, email, password, role} = req.body;

    if(!["customer", "owner", "driver"].includes(role)){
        return res.status(400).json({msg:"Inavlid role"});
    }

    const {data, error} = await supabase
    .from("users")
    .insert([{name,email,password,role}]);

    if(error) return res.status(400).json(error);

    res.status(201).json({msg:"user registered",data});
}