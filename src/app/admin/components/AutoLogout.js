"use client";
import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AutoLogout({ timeout = 15 }) {
  const router = useRouter();
  const timerRef = useRef(null);

  function resetTimer() {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      await supabase.auth.signOut();
      router.push("/admin/login");
    }, timeout * 60 * 1000);
  }

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}