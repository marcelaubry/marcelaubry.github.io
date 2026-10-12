# marcelaubry.github.io

Personal website for Marcel Aubry, served by GitHub Pages at https://marcelaubry.github.io.

Scroll to dive: the page is a pixel-art descent from the surface to Challenger Deep (10,935 m). The water colour, fish and lighting change with depth.

Plain HTML, CSS and JavaScript with no build step:

- `index.html`: content; each `<section class="zone">` has a `data-depth` (metres at its top) and a `data-zone` that picks its fish.
- `styles.css`: layout and animation.
- `js/sprites.js`: pixel-art sprites as character grids.
- `js/main.js`: hero/seabed scenes, fish, depth gauge, diving dachshund, bubbles and marine snow.
- `images/marcel-pixel.png`: pixelated portrait.

Preview locally with `python3 -m http.server 8000`, then open http://localhost:8000.
