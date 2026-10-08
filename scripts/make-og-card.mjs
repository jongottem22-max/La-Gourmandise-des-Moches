#!/usr/bin/env node
/**
 * Builds the link-preview card used by WhatsApp, Facebook, Messenger, iMessage,
 * LinkedIn and X: the brand logo centred on a 1200x630 white canvas.
 *
 * Deterministic — it reads public/images/brand-logo.png and writes
 * public/images/og-logo.jpg. Re-run it whenever the logo changes:
 *
 *   node scripts/make-og-card.mjs
 */
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO = 540;
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

const logo = await sharp("public/images/brand-logo.png")
  .resize(LOGO, LOGO, { fit: "contain", background: WHITE })
  .toBuffer();

const info = await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 3, background: WHITE },
})
  .composite([{ input: logo, top: Math.round((HEIGHT - LOGO) / 2), left: Math.round((WIDTH - LOGO) / 2) }])
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
  .toFile("public/images/og-logo.jpg");

console.log(`✓ public/images/og-logo.jpg — ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`);
