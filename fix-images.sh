#!/bin/bash

# Copy placeholder to all missing images
for img in ml-rec.jpg churn.jpg warehouse.jpg nlp.jpg dashboard.jpg neon-runner.jpg dungeon.jpg rhythm.jpg voxel.jpg terminal-quest.jpg synthesizer.jpg visualizer.jpg lofi.jpg midi.jpg samples.jpg chords.jpg vinyl.jpg jazz.jpg design-system.jpg portfolio-v1.jpg brand.jpg ui-exp.jpg icons.jpg motion.jpg ctf.jpg password.jpg scanner.jpg stego.jpg; do
  cp public/images/projects/placeholder-generic.svg "public/images/projects/$img"
done

echo "✅ All placeholder images created"
