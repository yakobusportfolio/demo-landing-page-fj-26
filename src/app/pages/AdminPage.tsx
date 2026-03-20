import React, { useEffect } from "react";
import { AdminSubmissions } from "../components/AdminSubmissions";

export function AdminPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <AdminSubmissions />;
}
