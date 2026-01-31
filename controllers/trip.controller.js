import { supabase } from "../config/supabase.config.js";


export const createTrip = async (req, res) => {
  try {
    const {
      customer_id,
      vehicle_id,
      distance_km,
      passengers,
      start_date,
      end_date,
      location
    } = req.body;

    const { data: vehicle, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicle_id)
      .single();

    if (error || !vehicle) {
      return res.status(404).json({ msg: "Vehicle not found" });
    }

    if (!vehicle.isAvailable) {
      return res.status(400).json({ msg: "Vehicle is not available" });
    }

    if (passengers > vehicle.allowed_passengers) {
      return res.status(400).json({
        msg: "Passengers exceed allowed limit"
      });
    }

    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .insert([{
        customer_id,
        vehicle_id,
        distance_km,
        passengers,
        start_date,
        end_date,
        location
      }])
      .select()
      .single();

    if (tripError) {
      return res.status(400).json(tripError);
    }

    await supabase
      .from("vehicles")
      .update({ isAvailable: false })
      .eq("id", vehicle_id);

    res.status(201).json({
      msg: "Trip created successfully",
      trip
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getTripById = async (req, res) => {
  const { tripId } = req.params;

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .single();

  if (error || !data) {
    return res.status(404).json({ msg: "Trip not found" });
  }

  res.json(data);
};

export const updateTrip = async (req, res) => {
  const { tripId } = req.params;

  const { data, error } = await supabase
    .from("trips")
    .update(req.body)
    .eq("id", tripId)
    .select()
    .single();

  if (error || !data) {
    return res.status(404).json({ msg: "Trip not found" });
  }

  res.json({
    msg: "Trip updated successfully",
    trip: data
  });
};

export const deleteTrip = async (req, res) => {
  const { tripId } = req.params;

  const { data: trip } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .single();

  if (!trip) {
    return res.status(404).json({ msg: "Trip not found" });
  }

  await supabase
    .from("trips")
    .delete()
    .eq("id", tripId);

  await supabase
    .from("vehicles")
    .update({ isAvailable: true })
    .eq("id", trip.vehicle_id);

  res.json({ msg: "Trip deleted successfully" });
};

export const endTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .select("*")
      .eq("id", tripId)
      .single();

    if (tripError || !trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", trip.vehicle_id)
      .single();

    if (vehicleError || !vehicle) {
      return res.status(404).json({ msg: "Vehicle not found" });
    }
    const tripCost = trip.distance_km * vehicle.rate_per_km;
    await supabase
      .from("trips")
      .update({
        isCompleted: true,
        tripCost: tripCost
      })
      .eq("id", tripId);
    await supabase
      .from("vehicles")
      .update({ isAvailable: true })
      .eq("id", vehicle.id);

    res.json({
      msg: "Trip ended successfully",
      tripCost
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};