import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  const NAVIGATE = useNavigate();
  localStorage.clear();
  sessionStorage.clear();
  useEffect(() => {
    setTimeout(NAVIGATE, 2000, "/");
  }, []);
  return <main className="bsMain error">Ooops, 404 error...</main>;
}
