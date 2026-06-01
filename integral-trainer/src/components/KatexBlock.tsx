"use client";

import katex from "katex";
import { useMemo } from "react";
import clsx from "clsx";

interface KatexProps {
  latex: string;
  display?: boolean; // block-режим (по центру, великий) vs inline
  className?: string;
}

export function KatexBlock({ latex, display = false, className }: KatexProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return latex;
    }
  }, [latex, display]);

  return (
    <span
      className={clsx(display && "block text-center", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
