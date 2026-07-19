# PROMPTS.md — AI Prompt Variations Log

This documents the prompt variations tested for HimShakti's AI product
description generator, built in `server/services/promptBuilder.js`.

## System / Role Prompt Used

Every request sends this system role to the model:

> "You are a precise JSON-generating copywriter. Always return valid,
> parseable JSON only."

The user prompt (built dynamically by `promptBuilder.js`) frames the
model as: *"You are an expert e-commerce copywriter for HimShakti, a
Himalayan food processing brand,"* followed by the product details,
a tone instruction, platform-specific conventions, and a strict JSON
output schema.

---

## Variation 1 — Tone: Premium

**Input:** Ragi Chips, finger millet + rice bran oil + rock salt,
Snacks category, baked not fried / crunchy / no MSG, Amazon +
Instagram, tone = `premium`

**Prompt guidance injected:** *"sophisticated, aspirational language
emphasizing craftsmanship and quality"*

**Output (title + short description):**
> HimShakti Premium Baked Ragi Chips - Crunchy Himalayan Finger Millet Snacks
>
> Indulge in the sophisticated crunch of HimShakti Premium Baked Ragi
> Chips. Artfully crafted from nutrient-dense Himalayan finger millet
> and seasoned with pure rock salt, these exquisite, non-fried crisps
> offer a guilt-free gourmet snacking experience. Perfect for the
> health-conscious epicurean seeking uncompromised flavor and
> artisanal quality in every bite.

---

## Variation 2 — Tone: Traditional

**Input:** same product as above, tone = `traditional`

**Prompt guidance injected:** *"warm, heritage-focused language
emphasizing authenticity and Himalayan roots"*

**Output (title + short description):**
> HimShakti Himalayan Ragi Chips | Baked Finger Millet Crisps with Rock Salt
>
> Savour the authentic taste of the Himalayas with HimShakti Ragi
> Chips. Crafted from nutrient-rich finger millet and gently baked to
> perfection, these crunchy crisps are seasoned with pure rock salt.
> A wholesome, traditional snack that brings the heritage of pristine
> mountain valleys straight to your tea-time, completely free from
> MSG and artificial additives.

---

## Variation 3 — Tone: Health-focused

**Input:** same product as above, tone = `health`

**Prompt guidance injected:** *"clear, benefit-driven language
emphasizing nutrition and wellness"*

**Output (title + short description):**
> HimShakti Baked Ragi Chips - Crispy Finger Millet Snacks with Himalayan Rock Salt
>
> Discover the healthy, guilt-free crunch of HimShakti Ragi Chips.
> Made from nutrient-rich Himalayan finger millet and seasoned with
> pure rock salt, these baked chips offer a wholesome alternative to
> traditional snacks. Packed with calcium and dietary fiber, they are
> perfect for mindful snacking anytime, anywhere. Fuel your wellness
> journey with every crispy, flavorful bite.

---

## Bonus — Platform Variation Tested

Beyond tone, the prompt also injects platform-specific conventions
(e.g. Amazon → formal, SEO-dense, spec-driven; Instagram → punchy,
emoji-friendly, hook-driven opener). Tested on Amla Juice, tone =
`health`:

- **Amazon** (81 chars): "HimShakti Pure Cold-Pressed Amla Juice - 100%
  Natural Himalayan Indian Gooseberry" — clinical benefit list format.
- **Instagram** (72 chars): "HimShakti Pure Cold-Pressed Amla Juice -
  High Vitamin C Immunity Booster" — opens with an emoji hook, shorter
  and more conversational.

---

## Which Worked Best and Why

All three tone variations worked well and produced genuinely distinct
marketing angles rather than superficial synonym swaps — Premium
leaned into aspirational/luxury vocabulary ("artisanal," "epicurean"),
Traditional leaned into nostalgic/cultural framing ("heritage,"
"pristine mountain valleys"), and Health leaned into benefit-driven,
nutrition-first language ("guilt-free," "dietary fiber," "wellness
journey").

For HimShakti's actual target customers (rural food brand selling to
health-conscious urban buyers on Amazon/Instagram), the **Health**
tone performed best in practice — it balances approachability with
concrete nutritional claims that convert well in e-commerce contexts,
without sounding as niche/luxury-coded as Premium or as narrowly
nostalgic as Traditional. Health tone was set as the default in the
generator form for this reason.

---

## Model & Configuration Notes

- Model: `gemini-flash-latest` (Google Gemini, via the `@google/genai`
  SDK)
- `temperature: 0.8` for standard generation, bumped to `1.1` on
  regenerate requests to ensure meaningfully different output
- `thinkingBudget: 0` — disabled internal "thinking" tokens so the
  full `maxOutputTokens` budget goes to visible output (this was a
  real bug encountered during testing: with thinking enabled, output
  was silently truncated after the `title` field)
- Automatic fallback to a 10-template mock service
  (`mockAiService.js`) if the AI call fails for any reason (invalid
  key, malformed JSON, timeout, quota) — verified working under two
  different real failure conditions during testing.