# Petal

A small browser-only gramophone music box. A pinned brass cylinder plucks a steel comb: nine original miniatures, plus a short melody of your own.

Turn the side crank once to start. The needle plays and pauses. Open the cabinet to watch the mechanism; use the tune dial to select a miniature or **Yours**.

In Yours, tap a cylinder socket to place or remove a pin. Drag the barrel, or use **Turn back / Turn next**, to reach another of its sixteen positions. Six pentatonic pitch tracks keep the loop musical. Erase, Undo, Clear and Play appear only while composing. Your melody saves in this browser, including an empty cylinder. Nothing is uploaded. Keyboard users can tab to six pitch buttons for the current position; Space toggles playback outside focused controls.

## Run locally

Serve the repository root over HTTP:

```sh
npm start
```

Open `http://127.0.0.1:4189`. Production is static HTML, CSS and JavaScript with a bundled Three.js renderer. There is no build, backend, runtime AI, external asset request or package installation needed to play.

## Verification

```sh
npm test
node tests/release.mjs
```

Optional browser checks require Playwright and an installed Chrome browser. `PLAYWRIGHT_PATH` can select an existing Playwright module. `PETAL_URL` selects a served local or published URL. WebKit checks also accept `WEBKIT_PATH`.

```sh
node tests/browser.cjs
node tests/webkit.cjs
```

The cylinder and its pins rotate from the audio clock. Scheduled notes coincide with the physical pin contact angle; the steel teeth flex at plucks. One guarded scheduler handles timing, fractional pause/resume, switching and interruptions. Sound requires an explicit gesture. Where available, the browser's Audio Session is set to playback; physical iPhone silent-switch and route behavior still require device testing.

Custom data stays in localStorage and is browser/device-specific. The loop has six pitches and sixteen positions. A hidden tab or interrupted audio session pauses the mechanism and requires an explicit resume. Low-power-device rendering performance and subjective listening have not been formally validated.

See [music and asset provenance](PROVENANCE.md) for the original arrangements and bundled renderer license.
