# Local review verification

This records verification of the cylinder-and-lever revision. The repository pull request and Pages deployment record identify its released commit.

- Nine familiar arrangements and their provenance are unchanged. Independent opening fixtures, rhythm/range/cadence checks and all465 pin/contact mappings pass.
- The lever replaces spring energy and all other visible playback controls. Steady-tempo scheduling was checked for five minutes, including repeated starts, fractional pause/resume without repeated audible events, and bounded stalled-scheduler skipping.
- Actual-neighbor pin widths pass non-overlap checks for all presets and the full18,944-note custom pattern. Pin height and pitch-to-tooth mapping are unchanged. Dark steel contrasts with brass; a higher camera shows the rear-upper contact.
- Chrome phone tests cover gesture audio, repeated lever toggles, all nine tunes switched while playing, protected copy/cancel/undo, saved custom patterns, direct barrel editing, drag without notes, and editing guards.28 closed/open/barrel/flat layout states cover320px through desktop and reduced browser heights.
- Chrome and WebKit timeline tests cover continuous scrolling, touch swipe (Chromium), drag-release cleanup, direct overview seek, pause on navigation, exact resume, persistence,44px grid cells and seven viewports. All interactive editor controls use44px targets and separated control groups.
- Phone-sized Chrome and WebKit sample72 phases per tune and verify all actual mesh contacts. These projection checks establish front-facing geometry, not pixel visibility or hardware realism. Normal-size screenshots across a full revolution and actual playback video are separately inspected.
- Independent read-only review verified lever phase preservation and pin mapping, and caught a stopped audition animation that now continues until its tooth settles.

Limits: no physical iPhone or silent-switch validation, no measured hardware dimensions, no complete accessibility audit. The pin rendering remains a readable, mechanically mapped illustration; custom notes on the back of the cylinder are naturally occluded, and an empty composition has no pins. Subjective musical balance still needs Dani's listening feedback.

Private screenshots, user references and evidence stay outside public source or in ignored evidence/. Never publish them.

## Focused rendered-contact audit

The follow-up audit uses test-only instrumentation around the actual WebGL render and actual Oscillator starts. It reads instance matrices and geometry bounds directly, finds cap positions and tooth underside edges in world/screen coordinates, and records normal-speed frames. It does not call contactProbe or infer contacts from shared timing arrays. Isolated single-pin and repeated-pitch patterns compare the exact normal listening view before/after; separate labelled overlays mark real cap/edge positions. A separate full Frère Jacques revolution matches the delivered demo view. Post-graph waveform onset is measured independently with OfflineAudioContext; raw Oscillator timestamps are not presented as measured speaker onset.

State checks inspect actual tooth transforms/materials after every preset switch and pause, and verify a pitch audition without a new pin causes no mechanical pluck. The pin mesh count is checked separately from tooth count. Private raw recordings and reports stay outside public source.

The full normal-speed rendered audit covered all nine complete preset revolutions:465 source onsets matched465 distinct rendered pin instances across11,049 sampled frames. The nearest sampled cap/edge separation was at most0.196 CSS pixels in the phone view, with source/presentation-frame differences up to17.45ms. All tooth roots stayed fixed within numerical precision, and no gold frames remained. These are browser-rendered measurements with the physical and timing limits above, not measured speaker/display synchronization.
