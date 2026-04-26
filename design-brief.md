# Design brief — Lucas Sayeg site

> Output of `/impeccable shape`. Hand to `/impeccable craft` to begin implementation.
> Read alongside `.impeccable.md` (audience, brand, anti-references, principles) and `CLAUDE.md` (architecture + language rules).

## 1. Feature summary

A **single-domain practice site** for Lucas Sayeg, **psicólogo clínico e orientador profissional** (USP), atendendo **online** e **presencial em Vila Leopoldina, São Paulo**. The site exists to convert anxious first-time visitors into first-contact inquiries via a calm, type-led, light-themed experience. Two pages: a long-scroll home that runs the full funnel, and a dedicated `/sobre` for visitors who need to read more before deciding. The `/sobre` page's scope is deferred to a separate `/impeccable shape` pass.

## 2. Primary user action

**Submit the contact form on the home page** (or, secondarily, open WhatsApp). Every layout decision should reduce friction and emotional cost at that moment. Anything that makes the form feel more visible, more reassuring, or lower-stakes earns its place; anything that delays or obscures it should be cut.

## 3. Design direction

Pulls directly from `.impeccable.md` — **considered, grounded, literate; editorial-warm; type-led; lightly handmade.** Light theme. Warm neutrals (bone, parchment, putty, soft clay) carry the page; the teal-sage from the existing logo is **deferred** (Lucas decides tomorrow) and, if it survives, lives only as a quiet accent.

How this brief expresses that:

- The **hero leads with face and voice** — Lucas's portrait paired with a question in the visitor's own emotional language. The portrait is treated as a real photograph, not a glossy headshot — generous crop, considered placement, no rounded card-frame.
- "Como a terapia pode ajudar" and "Serviços" are **prose-led**, not icon-led. Six labeled paragraphs, not six rounded-corner icon cards. Hierarchy comes from type weight and rhythm, not from a card grid.
- The site **earns its quiet** through whitespace and one or two careful handmade gestures (a hand-drawn underline, an off-grid pull-quote in Sobre, a single asymmetric divider). Restraint is the point.
- **Two type families maximum.** A distinctive serif for display + a quiet, slightly mechanical sans for body and UI. Avoid Fraunces, Cormorant, Inter, DM Sans (see `.impeccable.md` font reflex list). Candidates worth auditing in implementation: PP Editorial New, GT Sectra, Reckless, Söhne, Tiempos, ABC Diatype.

### CMS posture

Lucas will edit content via Payload after launch. **The design is the priority** — we make it impeccable first, then extract to the CMS as a follow-up. Do not let "this will be CMS-editable later" shape layout decisions. Sections may be hardcoded for now; copy may even be inline. Beauty first; extraction later.

## 4. Layout strategy

### Information architecture (2 pages)

- `/` — long-scroll home with the full funnel
- `/sobre` — extended bio page; target of the "Saiba mais" CTA in the home's Sobre section. **Scope deferred** to a separate shape pass.

### Header

Per Lucas's mock: **logo on the left, with "Lucas S." set quietly beneath it** (small, restrained — almost a label rather than a wordmark). The slogan **"Psicólogo clínico e orientador profissional"** is justified to the right, on the same horizontal axis as the logo. Open to revisiting if the visual weight feels off in implementation — but start there.

Persistent navigation lives within the header on desktop. Recommended anchor links: `Como ajuda · Serviços · Sobre · FAQ · Contato`. A quiet primary "Agendar" CTA sits at the far right and scrolls to the contact form. On mobile, the nav collapses to a hamburger but the "Agendar" CTA stays visible.

### Home page section order (emotional funnel)

1. **Header** — as above.
2. **Hero** — portrait + question heading (_"Sentindo-se com um vazio, perdido ou sobrecarregado?"_) + reassuring sub (_"A psicoterapia pode te ajudar a entender o que você está vivendo com mais clareza e profundidade."_) + primary CTA _"Agendar uma conversa"_ (scrolls to contact). Below: a quiet **modality strip** that **emphasizes online and lists presencial second**, e.g. _"Atendimento online · também presencial em Vila Leopoldina, São Paulo."_ Both modalities are mandatory in the strip; online comes first.
3. **Como a terapia pode ajudar** — the six prose blocks. Numbered with **typographic numerals** (not bullet circles), each block treated as a small editorial pair: bold short heading + supporting sentence. Two-column on desktop, single column on mobile. **No icons.**
4. **Sobre mim** — secondary photograph (placeholder for now — environment, books, hands; to be sourced) + the bio paragraph + the "Saiba mais" link → `/sobre`. The trust beat. Bio gender agreement uses **masculine** throughout (_psicólogo formado_, _também sou formado_).
5. **Serviços** — two columns: **Psicoterapia (Clínica)** and **Orientação Profissional**, each with a short framing sentence and the topic list rendered as tight, punctuated text (not pill-shaped tags).
6. **FAQ** — accordion list, eight items (questions confirmed; answers are placeholders). Default-collapsed, single-open-at-a-time, generous tap targets.
7. **Contato** — form (form primary) + a quiet secondary line: _"Prefere WhatsApp? [link]"_. A small note above the form — _"Mensagens são confidenciais e respondidas pessoalmente por Lucas."_ — and a placeholder slot for the crisis disclaimer Lucas will write later.
8. **Footer** — address (Vila Leopoldina, full street TBD), email (placeholder), WhatsApp (placeholder), social handles (slot reserved — may or may not exist), logo, **CRP registration number** (placeholder — regulatory requirement), copyright. Crisis-resource line lives here as the persistent ethical baseline (placeholder copy until Lucas writes the final).

### Visual hierarchy

The hero owns the first viewport; section headings establish a slow rhythm down the page with consistent vertical generosity; the contact form is the only destination that _interrupts_ the rhythm (slightly larger surface, calmer color shift) so a visitor scrolling fast can't miss it.

## 5. Key states

- **Default** — fully populated home with portrait + bio + services. The design must hold up at this state without ornament.
- **`PAYLOAD_ENABLED=false`** — site renders with all hardcoded copy intact; any Payload-editable fields (e.g., social links once added) silently absent. No broken sections.
- **Form: idle** — calm, low-noise. **Labels render above inputs** (the current `ContactForm.tsx` has empty `<label>` elements — that's a bug to fix in implementation).
- **Form: validating** — inline pt-BR error messages, single line under the field. Validation triggers on blur, not on every keystroke.
- **Form: submitting** — button shows quiet loading state; fields lock. No skeleton, no spinner-takeover.
- **Form: success** — replaces the form area with a calm message: _"Obrigado pela sua mensagem. Lucas responderá pessoalmente em até [X] horas úteis. Se preferir uma conversa mais imediata, você também pode enviar uma mensagem pelo WhatsApp [link]."_ Same surface, no redirect. Crisis-resource line stays visible nearby.
- **Form: server error** — soft, non-alarmist: _"Algo deu errado ao enviar sua mensagem. Você pode tentar novamente, ou enviar diretamente pelo WhatsApp."_ Form stays populated.
- **FAQ: collapsed (default)** — only the question is visible; clear caret/indicator.
- **FAQ: expanded** — answer reveals via `grid-template-rows` transition (not `height` — see motion reference).
- **Mobile (≤640px)** — single column throughout; hero portrait sits above the heading; Serviços becomes two stacked sections; nav collapses but "Agendar" CTA stays visible.
- **Reduced-motion (`prefers-reduced-motion`)** — all reveal-on-scroll animations disable; FAQ accordions snap open instead of animate; portrait crossfades become instant. **Mandatory** for this audience.
- **High-contrast / forced-colors** — body, headings, links, form fields all remain legible without relying on subtle warm-neutral background tints.

## 6. Interaction model

- **Header scroll behavior** — sticky on desktop, with a single threshold transition (slight vertical condense + soft shadow appears) once the user scrolls past the hero. No per-pixel animation.
- **Anchor nav** — clicking section links smooth-scrolls + updates the URL hash. Active section is subtly highlighted (sliding underline or a small filled mark — restrained).
- **Primary CTA ("Agendar")** — scrolls to the contact section and focuses the first form field after scroll completes. Respects `prefers-reduced-motion` by jumping directly.
- **Hero portrait** — static. No parallax, no Ken Burns, no hover effect.
- **Como a terapia pode ajudar** — items reveal with a single staggered fade-up on first scroll into view (~80ms stagger, 400–500ms duration, ease-out-quart). Once only, no repeat.
- **Sobre's "Saiba mais"** — Next.js `<Link prefetch>` to `/sobre`; feels instant.
- **Serviços** — fully static. No accordions, no tabs. Side-by-side desktop, stacked mobile. Topic items are inline punctuated text, not interactive.
- **FAQ** — single-open accordion; opening one closes the previous. Full-width hit target on the question row. ARIA `aria-expanded` / `aria-controls`. Keyboard: `Enter`/`Space` toggles, `Tab` moves between items.
- **Contact form** — react-hook-form + zod. Validation on blur. Labels above inputs (fix the empty `<label>` bug). Required-field indicator is a quiet `*` in the label, not red.
- **WhatsApp secondary link** — `wa.me/<placeholder>` deep link with a pre-filled pt-BR message: _"Olá, Lucas. Vim pelo seu site e gostaria de conversar."_ Opens in a new tab.
- **Footer** — static; no newsletter signup, no social-icon-grid wallpaper.

## 7. Content requirements

### Confirmed copy (Lucas's drafts; refine in implementation)

- **Slogan**: "Psicólogo clínico e orientador profissional"
- **Hero heading**: "Sentindo-se com um vazio, perdido ou sobrecarregado?"
- **Hero sub**: "A psicoterapia pode te ajudar a entender o que você está vivendo com mais clareza e profundidade."
- **Modality line**: "Atendimento online · também presencial em Vila Leopoldina, São Paulo" (online emphasized first)
- **Six "Como a terapia pode ajudar" blocks**: titles and supporting sentences as drafted
- **Serviços content**:
  - Psicoterapia (Clínica): ansiedade · depressão · luto (morte ou término) · estresse · sensação de vazio / falta de sentido · medo, insegurança, baixa autoestima
  - Orientação Profissional: dúvida de carreira · escolha de profissão · transição profissional · insatisfação com trabalho atual · falta de sentido no que faz
- **Sobre paragraph** (gender-corrected to masculine throughout):
  > Meu trabalho é te acompanhar nesse processo, para que você possa construir uma relação mais consciente com seus sentimentos, suas escolhas e sua própria vida.
  >
  > Sou **psicólogo formado** pela Universidade de São Paulo (USP), com atuação clínica desde a graduação. Tenho experiência em plantão psicológico, incluindo atuação como supervisor clínico, acompanhando pessoas em momentos de crise, angústia intensa e situações de luto.
  >
  > Minha prática é voltada para um trabalho cuidadoso e aprofundado, respeitando o tempo de cada pessoa e buscando compreender o sentido das experiências vividas.
  >
  > Além da Psicologia, **também sou formado** em Administração pela Universidade de São Paulo, o que contribui para o trabalho com orientação profissional e processos de decisão de carreira.
- **Eight FAQ questions**: Quanto tempo dura cada sessão? · Como funciona o agendamento? · Com que frequência ocorrem as sessões? · Quanto tempo leva para ver resultados? · Qual o valor da consulta? · Você atende por plano de saúde? · Qual público você atende? · Você atende presencial? — _answers are placeholder lorem-pt for now._

### Microcopy I will write in pt-BR during craft

- **Form labels**: `Nome` · `E-mail` · `Mensagem` (current English placeholders — _"Your name"_, _"Tell me about your project..."_ — must all be replaced).
- **Form submit CTA**: `Enviar mensagem`
- **Form privacy note**: _"Sua mensagem é confidencial e respondida pessoalmente por Lucas."_
- **Form success state**: _"Obrigado pela sua mensagem. Lucas responderá pessoalmente em até [X] horas úteis."_
- **WhatsApp prompt**: _"Prefere conversar pelo WhatsApp?"_
- Empty / error states phrased as suggestions, never as blame.

### Placeholders the site will ship with (Lucas to fill later)

- **CRP registration number** — required by Brazilian law (CFP Resolução 010/2005). Footer slot, placeholder format `CRP 00/00000`.
- **Crisis-resource copy** — placeholder line (_"Em caso de emergência, ligue 188 (CVV) ou 192 (SAMU)."_) lives in the footer; final wording is Lucas's clinical decision.
- **FAQ answers** — lorem-pt placeholder paragraphs sized realistically (1–3 short paragraphs per question).
- **WhatsApp number** — placeholder `wa.me/55XXXXXXXXXXX`.
- **Email address** — placeholder `contato@example.com`.
- **Social handles** — design includes a slot in the footer; if no socials exist, the slot collapses cleanly.
- **Full Vila Leopoldina address** — placeholder neighborhood-only mention until Lucas confirms.
- **Secondary photograph** for Sobre — placeholder image until sourced.
- **Logo asset + final brand color** — Lucas decides tomorrow. Build with a neutral placeholder logo and warm-neutral palette; fold in the teal-sage as a quiet accent only if/when confirmed.

## 8. Recommended references

When implementing, the most valuable impeccable reference files (loaded automatically by the skill from the plugin cache — you do not need to create them in the project):

- **typography** — the brief is type-led; font selection and pairing decisions will define the brand.
- **spatial-design** — the long-scroll home depends on rhythm and asymmetry to avoid feeling like a generic landing template.
- **color-and-contrast** — the warm-neutrals palette must hold up at WCAG AA minimum (AAA preferred for body text, given the audience).
- **interaction-design** — the contact form's states determine whether the conversion goal is met.
- **motion-design** — restrained reveal-on-scroll + accordion timing; reduced-motion support is mandatory.
- **ux-writing** — pt-BR microcopy for an emotionally vulnerable audience needs care beyond translation.

## 9. Open questions (carrying into craft)

The brief is complete; these are the items the placeholders depend on, listed so the implementer remembers to revisit each as Lucas decides:

1. **Logo asset + final brand color** — decided with Lucas tomorrow. Until then, neutral-only palette.
2. **CRP registration number** — to be filled in footer.
3. **Crisis disclaimer wording + prominence** — Lucas's clinical decision. Footer placeholder lives there now.
4. **FAQ answers** — Lucas to provide.
5. **Contact details** — WhatsApp number, email, social handles (if any), full Vila Leopoldina address.
6. **Secondary photograph** for Sobre — Lucas to source or confirm none.
7. **`/sobre` page scope** — separate `/impeccable shape` pass before crafting that page.
8. **Header layout audit** — start with Lucas's mock (logo + "Lucas S." beneath, slogan justified right). Revisit after first build if the visual weight feels off.
9. **Service-area emphasis** — modality strip leads with online and lists presencial Vila Leopoldina second; both mandatory.
10. **CMS extraction** — hardcode for now; extract to Payload after the design is locked.
