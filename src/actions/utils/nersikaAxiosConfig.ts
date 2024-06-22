"use client";
import axios from "axios";

const nersikaAxiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    "Access-Control-Allow-Credentials": true,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default nersikaAxiosConfig;
