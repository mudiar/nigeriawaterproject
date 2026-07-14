# Site recreation notes

## Public pages recreated

| Live URL | Status |
|---|---|
| `/` and `/home` | Recreated (`/home` redirects to `/`) |
| `/donate` | Recreated |
| `/photos` + 5 albums | Recreated |
| `/contact` | Recreated |
| `/urhokuosa` | Recreated |
| `/ebueneki-village` | Recreated |
| `/iguovbiobo` | Recreated |
| `/uvbevillage` | Recreated |
| `/new-dropdown` | Redirects to `/urhokuosa` |

## Broken on live site (still handled)

| URL | Notes |
|---|---|
| `/ebueneki-villaage` | 404/aborts on live; redirect to `/ebueneki-village` |
| `/general-5` | 404/aborts on live; redirect to `/urhokuosa` |

## Intentionally not mirrored as local files

1. **Squarespace HLS videos** — stream from Squarespace CDN playlists via `hls.js` (AES-encrypted segments cannot be saved as simple MP4s).
2. **Donorbox / Squarespace commerce checkout** — donation UI matches; submit opens Donorbox.
3. **Squarespace form backend + reCAPTCHA** — contact form is a client-side thank-you placeholder.
4. **`/cart`** — empty Squarespace cart chrome; not a content page.

## Visual comparison (local vs live)

Close match on structure, fonts (Anton/Epilogue), colors (`#e8e8e8` / `#fbfbfb` / `#342f2f`), copy (including typos), nav, footer, donation pills, and village/gallery pages.

Remaining deltas vs Squarespace fluid-engine pixel perfection:

- Header does not re-theme dark/light per section the way Squarespace does
- Exact fluid-engine grid cell sizing / micro-spacing differs in places
- Some album lightbox images beyond the server-rendered set may still be missing
