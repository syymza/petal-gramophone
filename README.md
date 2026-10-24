# Petal — mechanical music box

A static, browser-only gramophone music box. The musical mechanism is a pinned brass cylinder and a steel comb inside the cabinet. The exposed cylinder and comb are the centrepiece beneath a sculptural horn; there is no record or platter.

[Play Petal](https://syymza.github.io/petal-gramophone/) in your browser. All synthesis, editing and saved notes stay on your device.

## Playing

Select one of nine familiar classics from the dial immediately beside the tune name below the object. Flip the physical lever beside the cylinder to play; flip it back to pause in place. Turning it on resumes the same position. This is the single playback control in listening and composing views, accessible by touch, pointer, keyboard and screen reader. Playback opens the tray so the pins and comb stay in view, then loops at a steady tempo without winding, energy or an expiry timer. Open box brings the mechanism tray forward without changing tunes.


## Composing

Yours opens the cylinder editor. Pick a chromatic pitch C4–C7, tap the lit socket to toggle a pin and hear it immediately, and drag vertically to turn the barrel without adding notes. Back/Next move one position in the barrel view. Unwrap pins temporarily shows that same pattern as labelled pitch rows and time columns. Higher/Lower change the pitch bank. Swipe or drag the continuous strip horizontally; use the whole-melody overview to jump directly anywhere, with elapsed/total time and a visible playhead. The amber column maps to the current barrel position. Accidentals are spelled out, such as G sharp 5. Wrap onto barrel returns to the same position. The same physical lever previews the composition. All phone grid cells are44px high; fewer pitch rows appear when browser bars reduce available height.

Copy to Yours protects existing notes with a replacement dialog. Cancel leaves them intact; Undo restores the complete prior pattern, tempo and timing resolution after replacement. Undo also covers pin edits and Clear. Done returns to the whole instrument; Edit pins reopens it. Presets are immutable. Playback in the editor begins promptly at the current position; a pin sounds only when it reaches the comb.

Compositions and selected tune are saved only in this browser’s localStorage. The earlier six-pitch format migrates without altering its timing or pitch. Empty patterns remain empty. Storage failure is visible. No data leaves the device.

## Local development and verification

Serve this directory with any static HTTP server. All runtime assets are relative and bundled, compatible with GitHub Pages. No build, installation, API key or paid service is required.

`npm test` checks source melody contours, chromatic notes, variable lengths, cadence/duration, capacity, contact angles and exact constant-tempo scheduling and pause/resume timing. Browser and WebKit tests require an existing Playwright installation via PLAYWRIGHT_PATH and optional WEBKIT_PATH. Source/license/privacy checks remain in tests/release.mjs. See PROVENANCE.md for tune sources.

Audio starts only after a gesture. The playback audio-session route is requested when available, following the previously verified Orbit approach. Chromium/WebKit phone emulation is not a physical iPhone test. Silent switch, real Safari browser chrome, interruptions, low-power hardware and subjective musical balance still need on-device/user validation.

The visible mechanism is a physically inspired browser model, not a dimensioned replica. MECHANISM.md documents tooth counts, all-note pin mapping, clearances and the remaining hardware abstractions. All37 sounding pitches retain their previous frequencies; the octave labels now match them.
