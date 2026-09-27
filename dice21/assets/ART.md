# Графика стола «21 в кости»

`table.png` подготовлен встроенным инструментом image_gen на основе первого референса пользователя. Фон, персонаж и композиция сохранены; HUD, фишки и кнопки освобождены для живого интерфейса.

`chip-reference.png` — исходный пользовательский референс. Фишки берутся из него через SVG viewBox и контур отсечения, номиналы отображаются кодом.

`button.png` — уже утверждённая растровая кнопка из assets/bandit/button-background.png, используется участок без текста.

Кубики — **общие 3D-модели главного поля**: src/board/dice.js, physics.js, materials.js; растровые кубики в игре не используются.

Звуки переиспользованы из assets/bandit/audio. Исходники и сведения: assets/bandit/audio-source/README.md.

## Промпт для table.png (built-in image_gen)

Use case: precise-object-edit. Input image is the edit target and exact style reference. Prepare a production game background for an interactive mobile dice blackjack game. Preserve this composition, the same happy cartoon croupier face and outstretched hand, rich worn hand-painted ink, wooden table, green felt, warm lamp and huge "21 В КОСТИ" title. Portrait 9:16.
Make these precise changes only:
Remove the entire top HUD with avatar, money panels and gear; fill its region with the existing dark bar wall naturally. Keep the croupier and title intact.
Keep the two large EMPTY felt play areas and their dealer/player labels "ДИЛЕР" and "ТЫ". Do not put dice, chips, numbers or instructions inside them.
Remove all five chips from the bottom chip tray so it is an EMPTY dark wooden recessed tray.
Remove "БРОСИТЬ" text and the large red button entirely from bottom wooden area; fill with matching worn dark wood. Remove the small information button.
Remove the small cursive advertising slogan to the right of the croupier; keep understated dark wall there.
Maintain exactly the physical hand-drawn materiality, illustrated lighting, warm paper-and-ink texture, high quality art and readable clean open felt. No extra controls, no UI overlays, no new decorative text. Preserve the original geometry and generous usable table.

## Croupier blink cel — 2026-09-26
`croupier-blink.png`: built-in image_gen precise edit of `table.png`. Only eye regions are sampled at runtime; the original table remains the base texture.
Generated source: `/Users/andreysudarikov/.codex/generated_images/01a0d99f-80df-7b00-b650-bb4e317ffe86/exec-49510f4f-ef15-43c8-9f1e-a0364942c27b.png`.
Prompt: “Precise animation cel edit of attached image. Preserve entire illustration exactly: same composition, same 941:1672 aspect ratio, same character identity and exact pose, face outline, nose, mouth, hairstyle, all text, all background, all colors. Change ONLY the croupier's TWO EYES to CLOSED for a natural blink animation cel. His eyelids are warm skin colored, each closed eye has a curved black ink eyelash line, in exactly the original eye positions. Do not move eyebrows. No other edits. Output full original frame matching exact original placement, not a crop. This is a registration-matched blink cel for an existing game raster character.”
