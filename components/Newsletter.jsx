"use client";

import { useState } from "react";
import { SocialIcon } from "./SocialIcon";

export function Newsletter({ compact = false }) {
  const [message, setMessage] = useState("");

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email")?.toString().trim();
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setMessage("Preview confirmed — no address was stored.");
    form.reset();
  }

  return (
    <div
      className={
        compact
          ? "block bg-[linear-gradient(120deg,#4f0b13,#8b1c28)] text-white p-[24px]"
          : "grid grid-cols-[auto_1fr_minmax(360px,.85fr)] max-[780px]:grid-cols-1 gap-[24px] items-center bg-[linear-gradient(120deg,#4f0b13,#8b1c28)] text-white px-[34px] py-[28px] max-[780px]:px-[26px] max-[780px]:py-[26px]"
      }
      id="subscribe"
    >
      <div
        className={
          compact
            ? "hidden"
            : "grid place-items-center w-[54px] h-[54px] border border-white/55"
        }
      >
        <SocialIcon name="mail" size={28} />
      </div>
      <div>
        <span className="text-[#e9c8cb] text-[13px] font-extrabold tracking-[.16em] uppercase font-['Arial','Helvetica',sans-serif]">
          Reading notes
        </span>
        <h2 className={`my-[5px] font-bold font-['Georgia','Times_New_Roman',serif] ${compact ? "text-[24px]" : "text-[22px]"}`}>
          Follow the blog by email
        </h2>
        <p className={`m-0 text-[#eadcdf] text-[13px] font-['Georgia','Times_New_Roman',serif] ${compact ? "leading-[1.5] mb-[18px]" : ""}`}>
          Preview the signup experience. This prototype validates the address locally and does not store or send it.
        </p>
      </div>
      <form
        onSubmit={submit}
        noValidate
        className={
          compact
            ? "block"
            : "relative grid grid-cols-[1fr_auto] max-[780px]:grid-cols-1 max-[780px]:gap-[8px]"
        }
      >
        <label className="sr-only" htmlFor={compact ? "sidebar-email" : "newsletter-email"}>Email address</label>
        <input
          id={compact ? "sidebar-email" : "newsletter-email"}
          name="email"
          type="email"
          placeholder="Your email address"
          className={`min-w-0 h-[46px] px-[14px] border border-white/65 bg-white text-[#171515] outline-none ${compact ? "w-full" : ""}`}
        />
        <button
          type="submit"
          className={`border border-white bg-transparent text-white px-[20px] cursor-pointer hover:bg-gray-700 hover:text-black ${
            compact ? "w-full h-[44px] mt-[8px]" : "h-[46px]"
          }`}
        >
          Check address
        </button>
        {message && (
          <small
            role="status"
            className={
              compact
                ? "block mt-[8px] text-[#f6dadd]"
                : "absolute top-[calc(100%+5px)] left-0 text-[#f6dadd]"
            }
          >
            {message}
          </small>
        )}
      </form>
    </div>
  );
}
