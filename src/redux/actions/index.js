import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getFlights = createAsyncThunk("flight/getFlight", async () => {
  // parametreleri belirliyoruz
  const params = {
    bl_lat: "34.685961",
    bl_lng: "25.08302",
    tr_lat: "42.951078",
    tr_lng: "45.18281",
    speed: "1,99999",
  };
  // api isteğini atıyoruz
  const res = await api.get("/flights/list-in-boundary", { params });

  // api'dan gelen veri dizi içerisinde olduğundan projede kullanımı daha kolay olsun diye dizinin içerisindeki dizileri nesneye çevirelim.
  const formatted = res.data.aircraft.map((i) => ({
    id: i[0],
    code: i[1],
    lat: i[2],
    lng: i[3],
    deg: i[4],
  }));

  // slice'a aktarılacak payload'ı belirleyeceğiz.
  return formatted;
});

export const getDetails = createAsyncThunk("detail/getDetails", async (id) => {
  const params = { flight: id };

  const res = await api.get("/flights/detail", { params });

  return res.data;
});
