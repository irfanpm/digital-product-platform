# Storefront imagery and editorial sources

## Real product previews

The product PNG files in `public/images/savings/` are byte-for-byte copies of the three user-uploaded images. WebP versions are compressed display copies; the preview dialogs open the original PNGs.

- `dashboard.png`: `ChatGPT Image Sep 25, 2026, 10_00_09 PM.png`
- `challenges.png`: `02_Printable_Savings_Challenges_Preview.png`
- `guide.png`: `03_User_Guide_Cover_Preview.png`

The two September 27 tall website images were used as creative references, not as a flattened website or as replacement product imagery. Existing legacy images were left intact.

## Historical portrait and quotes

- Benjamin Franklin portrait: Library of Congress, https://www.loc.gov/pictures/item/90709839/ . Downloaded image: https://cdn.loc.gov/service/pnp/cph/3c00000/3c01000/3c01000/3c01098v.jpg . Saved as `public/images/savings/franklin.jpg`.
- “Beware of little expenses; a small leak will sink a great ship.” Benjamin Franklin, *The Way to Wealth*, reproduced in his *Memoirs*, volume II: https://www.gutenberg.org/files/40236/40236-h/40236-h.htm . Capitalization normalized; wording verified.
- “A man is rich in proportion to the number of things which he can afford to let alone.” Henry David Thoreau, *Walden*, “Where I Lived, and What I Lived For”: https://www.gutenberg.org/files/205/205-h/205-h.htm . Excerpt from a sentence; initial letter capitalized.
- Each quote has a source link and a no-endorsement statement on the page.

## Lifestyle imagery

Created with the built-in image-generation tool. These are illustrative lifestyle scenes, not customer testimonials or product screenshots. Full generated originals remain in the Codex generated-images directory; optimized project copies are in `public/images/savings/`. No product assets were generated or replaced.

### salary.webp (and salary-768.webp)

Prompt: Use case: photorealistic-natural. Asset type: cinematic editorial website hero photograph, landscape 1536x1024. A modern young Indian professional age 28 with wavy black hair, light beard, forest green casual shirt, seated at a walnut desk in his modest tasteful apartment at night, looking at his phone with a small hopeful smile on salary day. Place the man in the right half of the frame, face clearly visible, plenty of near-black negative space on the left for editorial typography. Warm practical table lamp, muted green walls, a real houseplant, faint apartment window reflections. Film still, 35mm photography, natural skin texture, believable hands, subtle grain, deep shadows, restrained warm brass highlights, sophisticated magazine art direction. No text, no numbers, no notifications, no graphics, no product mockups, no money, no luxury setting. A single full-bleed photographic scene.

### reflection.webp (and reflection-768.webp)

Input reference: generated salary scene. Prompt: Create a second cinematic photograph in this same story, preserving this exact Indian protagonist, green shirt, apartment and natural photographic art direction. End of the month: he is thoughtfully reviewing bills in an open notebook at his desk, one hand touching his temple, mildly concerned and reflective, not depressed. His phone lies on the desk. Same right-half composition, left half very dark negative space for text. A laptop seen from the back on the desk. Subdued near-black green color grading, faint warm lamp light, natural skin, editorial 35mm film still. Landscape 1536x1024. No text, UI, branding, or readable numbers.

### progress.webp (and progress-768.webp)

Input reference: generated salary scene. Prompt: Create a third cinematic lifestyle photograph of this exact same Indian man and apartment, green shirt, natural skin texture. He is calmly recording savings in a notebook beside an open laptop, laptop screen faces him and away from camera, expression gently focused and quietly content, believable small daily habit, no exaggerated celebration. Composition: man and desk on right half, left half dark green near-black wall with negative space for website type. Warm desk lamp, leafy plant, subtle morning window light. Magazine film still, landscape 1536x1024. No text, no UI, no charts, no branding. Preserve protagonist identity.

### goals.webp (and goals-768.webp)

Prompt: Use case photorealistic-natural. Asset: editorial photography grid for savings goals website. Landscape 1536x1024 with four equal rectangular photographs in a precise 2x2 grid with narrow warm ivory gutters, NO TEXT. Top left: sunlit entry of a modest beautiful contemporary Indian home with a leafy plant and wooden door, lived-in and attainable. Top right: close-up of young Indian woman studying at a desk with books and an unbranded laptop, real natural window light. Bottom left: candid Indian couple sitting together on a train journey through lush Western Ghats, looking out at scenery, intimate understated travel moment. Bottom right: close-up Indian wedding hands with restrained flowers and simple rings, sincere warm detail. Premium analog editorial photography, natural imperfect texture, palette warm ivory forest green and soft brass, no luxury mansion, no skyline, no dramatic wealth, no logos or watermarks, respectful relatable Indian context, completely realistic photographic treatment.
