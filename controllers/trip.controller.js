import { supabase } from "../config/supabase.config.js";

export const createTrip = async (req, res) => {
    const {vehicle_id, passengers} = req.body;

    const {data:vehicle} = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicle_id)
    .single();

    if(!vehicle.isAvailable)
        return res.status(400).json({msg:"vehicle not available"});

    if(passengers > vehicle.allowed_passengers)
        return res.status(400).json({msg:"passenger limit exceeds"});

    await supabase.from("vehicles")
    .update({isAvailable : false})
    .eq("id", vehicle_id);

    const {data} = await supabase
    .from("trips")
    .insert([req.body]);

    res.status(201).json(data);
}