"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

export function ContactSourceLink({ source, onClick, ...props }: ComponentProps<typeof Link> & { source: string }) {
  return <Link {...props} onClick={(event) => { window.sessionStorage.setItem("bertaContactSource", source); onClick?.(event); }} />;
}
