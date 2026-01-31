import { supabase } from "../config/supabase.config.js";

export const createVehicle = async (req, res)=>{
    const vehicle = req.body;

    const {data, error} = await supabase
    .from("vehicles")
    .insert([vehicle]);

    if(error) return res.status(400).json(error);
    res.status(201).json(data);
};

export const assignDriver = async (req, res)=>{
     const {vehicle_id} = req.params;
     const {driver_id} = req.body;

     await supabase
     .from("vehicles")
     .update({driver_id})
     .eq("id", vehicleId);

     res.json({msg:"driver added"});
};

export const getVehicle = async(req,res)=>{
    const {vehicleId} = req.params;

    const{data} = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .single()

    res.json(data);
}