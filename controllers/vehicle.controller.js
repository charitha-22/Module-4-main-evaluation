import { supabase } from "../config/supabase.config.js";

export const createVehicle = async (req, res)=>{
    const vehicle = req.body;

    const {data, error} = await supabase
    .from("vehicles")
    .insert([vehicle]);

    if(error) return res.status(400).json(error);
    res.status(201).json(data);
};

// export const assignDriver = async