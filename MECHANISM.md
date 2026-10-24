# What the mechanism represents

The browser instrument is physically inspired and musically mapped. It is not a CAD replica or a claim of validated hardware dimensions.

## Counts during playback

The previous public release8ed377d rendered20 teeth but supported only6 pitch lanes;14 teeth were decoration. This revision renders37 teeth for37 playable chromatic pitches, C4 through C7 inclusive. Each axial lane has exactly one corresponding steel tooth. The nine presets use20 distinct pitches overall, from E4 to F6; individual tunes use6–12 teeth. The remaining17 pitches are available for custom composition, rather than adding teeth for repeated events. Thirty-seven is a deliberate three-octave keyboard range plus its upper tonic, not a measured tooth count from the reference photo or a standard manufacturer movement.

Every stored playback event creates one visible pin. Its pitch index selects the axial lane and the matching tooth. Its time position selects an angle around the barrel. Repeated occurrences of a pitch use separate angular pins in the same axial lane and pluck the same tooth. No playback events are omitted for appearance. Explicit editing auditions are previews and may sound before a pin is placed.

The same audio-clock phase drives the rotor, future note scheduling and comb animation. Changing melody length changes the angle per timing position; the lever starts or pauses that common phase at steady tempo. The permanent geometry therefore follows the played pattern, rather than decorative random pin placement.

## Geometry and bounded corrections

Model units are arbitrary and have no asserted conversion to millimetres. The barrel has radius.38 and length2.98, chosen for this cabinet. Pitch lanes are symmetrical about its axis and stop.1 units inside each end. Pin roots are embedded.003 into the surface; exposed projection is.032 (4.21% of barrel diameter), reduced from the previous.083. Dark steel pin diameter is capped at.024 and reduced according to the nearest actual note in the same pitch lane. Neighboring pins retain at least70% of their centre-to-centre chord as clearance. The earlier revision shrank every pin to the finest possible timing grid, making sparse patterns almost invisible on phones. This revision keeps the same short projection, gives isolated notes more visible width, and uses a raised camera to reveal the comb contact. This prevents the old oversized pins from intersecting during repeated notes, including Für Elise’s consecutive sixteenths.

The steel tooth’s front underside edge is positioned at the computed pin-tip contact. Browser geometry tests use the tooth mesh’s actual dimensions and world matrix in its resting pose. Contact animation is a small visual vibration, not a physical solver. The green editor ring and44px timeline targets are interaction aids; the ring is flat and does not represent a large musical pin.

## Remaining physical abstractions

Tooth lengths are visually graduated; sound is synthesized from the lane’s MIDI pitch, not calculated from steel length, mass, stiffness or damping. The lever and gears are simplified; no spring-energy simulation is used. Pattern replacement is immediate in software rather than physically removing or repinning a cylinder. Extreme custom timing densities can produce pins finer than practical hardware. The cabinet and horn are a deliberately simplified visual design. None of these dimensions has been validated against measured hardware, and no claim of exact tuning, manufacturability or dimensional fidelity is made.

## Manufacturer references

[Reuge’s manufacturing account](https://www.reuge.com/en/factory/nos-savoirs-faire/mouvements-a-musique-mecanique) describes fine steel-wire pins in brass cylinders, precision comb alignment, custom comb cutting and individual tooth tuning. It lists common36/72/144-tooth movements. [Nidec’s cylinder music-box line](https://www.nidec.com/en/products/other-products/music-boxes/cylinder-music-box/) lists30/50/72/100-note movements. These support the mechanism principle and show that tooth count varies; they do not validate this model’s exact dimensions or its37-tooth choice.
