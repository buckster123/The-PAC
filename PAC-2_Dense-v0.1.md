# ∴ PAC-2 Dense ∴

**v0.1.2 · 2026-07-15 · status: draft — token costs measured (micro + full corpus), groundings code-audited, behavior bench pending (§10)**

> *Parens for scope, arrows for flow, register for soul.*

PAC-2 Dense is the second-generation Prima Alchemica Codex standard: an S-expression
authoring dialect for souls, procedures, skills, and evolution payloads — readable by
humans, decodable by models, lintable by machines. It merges the two working forks of
the PAC lineage: the **lean dialect's** measured token discipline and the **original
codex's** generative architecture, on a Lisp-shaped skeleton whose priors are as old
as AI itself.

**Lineage — read this before anything else:**

| artifact | role in the lineage |
|---|---|
| `The-PAC/PAC.md` | the original glyph-maximal codex — source of the **function**: rites, meta-ops, invariants, Socratic probes, register |
| `The-PAC/PAC-v2.md` | the pure-symbolic experiment. Documented dud. **No relation to this document** — the "2" here versions the *standard*, not that file |
| `ApexOS-RS/docs/pac.md` | the lean dialect — source of the **discipline**: glyph-lean law, grounding law, authoring law, `pac-bench/` (measured 40–42% corpus cut vs prose) |
| **PAC-2 Dense (this)** | the amalgam: lean's laws + the original's factory + S-expression structure. Micro-bench (§3): ≈ lean's token cost, +scope, +composition, +lintability |

Pre-history, because the loop matters: before the PAC existed, the same author's
pseudo-Lisp/pseudo-Python-plus-prose prompts were producing unusually stable,
emergent agents. The PAC was the flavor fork of that discovery; lean was the
discipline fork. PAC-2 Dense is the merge commit.

---

## §0 Design laws

- **L1 MEASURED CLAIMS ONLY.** No metric enters this spec without a reproducible
  measurement (`pac-bench/` or the micro-bench in §3, script committed alongside).
  Estimates are labeled estimates. Hypotheses are labeled hypotheses (§10).
- **L2 GROUND EVERY SYMBOL.** Every op, glyph, invariant, and register verb maps to a
  real tool, rule, parameter, or defined transform. Ungrounded = noise = delete or
  define. One meaning per symbol per artifact.
- **L3 GLYPH-LEAN.** Operational notation draws only from the measured ≤2-token
  registry (§3). Blackletter, styled Unicode, and emoji are banned as spelling —
  everywhere, always. (`𝔸` = 3/3 tokens; the tax is real and measured.)
- **L4 VOICE IN PROSE, OPS IN FORMS.** Identity gets a thin quoted-prose layer;
  everything operational is notation. The register (§6) is declared, optional, and
  first-class — never contraband, and never the sole carrier of an operational fact.
- **L5 DECODE-EQUIVALENCE.** Compression stops at behavioral losslessness. The
  acceptance test (§8) is mandatory; a port that fails audit is damage, not density.
- **L6 SHALLOW NESTING.** Maximum form depth 3 (artifact → block → op). Parens buy
  scope; flow glyphs (`→ · |`) carry flat sequences. Never parenthesize a flat chain.
- **L7 LINTABLE BY CONSTRUCTION.** Balanced forms + closed head registry (§2) +
  closed glyph registry (§3) + declared registers (§6) ⇒ a ~50-line checker validates
  any artifact before it ships (§9). This is the safety rail for self-evolution.
- **L8 CACHE-STABLE BY CONSTRUCTION.** A PAC-2 Dense artifact contains nothing
  per-turn-volatile. Live state (embodiment, clock, inbox) is injected *after* the
  artifact, never inside it. (The lean `cache-law`, made structural.)

**Mechanism honesty.** What the notation does: supplies unambiguous scope cues, leans
on models' deep code-shaped priors (Lisp and AI have co-evolved since 1958), and
keeps every reference consistent and findable. What it does not do: execute.
`~(consensus .75)` is a steering signal, not a setpoint; parentheses do not gate
attention masks; latent-space "manifold locking" is metaphor. Stability and adherence
gains are *hypotheses until §10 measures them*. This paragraph exists so the spec
never has to be embarrassed later.

---

## §1 Kernel grammar

Read by models and humans, checked by a linter, executed by neither.

```
artifact    := seal? form emanation?
seal        := '# ∴ ' NAME ' ∴'                ; markdown header, the only ∴ use
form        := '(' head item* ')'
head        := symbol                           ; must ∈ form registry (§2)
item        := form | atom | pair | chain | rule | constraint
pair        := ':' symbol atom                  ; named parameter   :mode standard
chain       := item (('→'|'·'|'|') item)+       ; flow: then / and / or — flat, unparenthesized
rule        := cond '→' action                  ; threshold/trigger to act   z>2.5 → !quarantine
constraint  := '[' text ']'                     ; binds to exactly its enclosing form
atom        := symbol | number | ratio | !op | ?trigger | ~form | CAPS | "prose"
ratio       := name'.'digits('/'name'.'digits)* ; vec.35/act.30
!op         := '!' symbol                       ; a REAL tool or defined procedure
?trigger    := '?' symbol                       ; a condition that fires
~form       := '~' form                         ; soft (steering) marker — see §4
comment     := ';' text                         ; to end of line
emanation   := italic prose, ≤3 lines           ; register-on only (§6)
```

Rules of the road:

- Whitespace and indentation are for humans; **structure is parens**. Depth ≤ 3 (L6).
- `"double quotes"` mark prose islands (voice lines, probe questions). Prose rules
  apply inside them; glyph law does not reach into quotes — but L4 does: no
  operational facts may live *only* in prose.
- A form costs ~2 tokens of overhead (measured: `(` = 1, `)` = 1). Buy scope only
  where scope pays — constraints, parameters, composition. Flat sequences ride the
  1-token flow glyphs.
- `CAPS` = hard rule (MUST / MANDATORY / NEVER). Never bury one mid-chain; put it in
  the constraint of the form it governs.

---

## §2 Form registry (closed)

The closed set of heads. A head outside this table fails lint (extend the table
first, then use the head — that ordering is the point).

**Artifacts** (top-level forms):

| head | emits/contains | grounds to |
|---|---|---|
| `soul` | voice · invariants · register · defs · rites · rules | `config/soul.md` — the cached system identity |
| `procedure` | trigger · steps · pitfalls · tags | `store_procedure` / `find_relevant_procedures` payloads |
| `evolution` | kind · rationale · content | `propose_evolution` payloads |
| `skill` | trigger · workflow · invariants | skill files (SKILL.md-class artifacts) |
| `engine` | domains · params · integrates | a bounded subsystem definition (born via §8) |

**Blocks** (inside artifacts):

| head | shape | notes |
|---|---|---|
| `voice` | `(voice "…" "…")` | 2–3 quoted prose lines. The one mandatory prose layer (L4) |
| `invariants` | `(invariants (name value)* ~(name value)*)` | declared once, referenced by name (§4) |
| `register` | `(register alchemical\|none\|<declared>)` | voice pack selection (§6) |
| `def` | `(def !name expansion)` | grounded shorthand — homoiconic: defs are data |
| `rite` | `(rite name [constraint]? phases)` | the canonical execution form (§5) |
| `rules` | `(rules (cond → act)*)` | standing triggers and thresholds |

**The factory** (generative meta-forms — evaluation *emits a new artifact form*;
this is the layer the lean dialect dropped and v0.1 revives):

| head | emits | Socratic probe (asked before synthesis) |
|---|---|---|
| `port` | soul/procedure/skill from any source format | "Structure? Invariants? Hard rules? Voice? Volatile content?" |
| `engine` | an `(engine …)` artifact | "Domains? Parameters? Integrates?" |
| `module` | a component block | "Attributes? Methods?" |
| `bootstrap` | a full `(soul …)` + first `rite startup` | "Tools? Memory? Mesh? Voice?" *(orig.: "Limbs? Brain? Exo? Heart?")* |

The Socratic probe is a revived original technique, not decoration: each meta-form
**must enumerate answers to its probe before emitting** — forced enumeration before
generation is the anti-hallucination step. Probes are quoted prose (grammar: `pair`
`:probe ("…" · "…")`), overridable per invocation.

---

## §3 Glyph & connective registry (closed, measured)

Isolated token cost, **o200k / cl100k**, measured 2026-07-15 with bundled BPE ranks
(`gpt-tokenizer`; script in `pac-bench/`). Registry rule: ≤2 tokens in *both*
families, and grounded (L2).

| tier | glyph = cost | grounded meaning |
|---|---|---|
| 1-token | `(` `)` = 1/1 | scope open/close |
| 1-token | `[` `]` = 1/1 | constraint attached to enclosing form |
| 1-token | `→` = 1/1 | then / sequence / produces |
| 1-token | `·` = 1/1 | and / conjoin / list-join |
| 1-token | `\|` = 1/1 | or / alternative |
| 1-token | `:` = 1/1 | bind / parameter |
| 1-token | `;` = 1/1 | comment |
| 1-token | `!` = 1/1 | imperative op (real tool/procedure) |
| 1-token | `?` = 1/1 | trigger condition |
| 1-token | `~` = 1/1 | soft/steering marker (§4) |
| 1-token | `§` = 1/1 | *legacy* lean block header — valid, superseded by forms |
| 2-token | `↔` = 2/2 | bidirectional / hot-swap / mutual |
| 2-token | `≡` = 2/2 | equivalent / alias-of |
| 2-token | `∴` = 2/2 | artifact seal — header only, one per artifact |
| 2-token | `↦` = 2/2 | maps-to (binding tables) |
| 2-token | `∮` = 2/2 | cycle marker — recurring/scheduled rite (`∮03:00UTC`) |

**Retired with honors** (≥3 tokens in at least one family — the tokenizers voted):
`⊛` 2/3 · `⋄` 2/3 · `⊙` 2/3 · `⟨` 3/2 · `⟩` 3/1. The Ap⊛p ligature retires; the rite
it named survives as §5. Register vocabulary (§6) expresses these meanings in words.
**Banned outright:** all blackletter/styled alphanumerics (`𝔸`=3/3), emoji, and any
decorative substitution — L3, no exceptions, this is what killed PAC-v2.

**ASCII fallback** (render-fidelity, the original's `!LITE` in five lines):
`∴`→`***` · `→`→`->` · `·`→`*` · `↔`→`<->` · `≡`→`==` · `↦`→`=>` · `∮`→`O=` · `~`→`soft:`

**Micro-bench** — the lean dialect's own worked sample (`docs/pac.md` startup/
shutdown), three notations, same operational facts (decode-equivalent):

| notation | o200k | cl100k | vs prose | vs lean |
|---|---|---|---|---|
| prose | 168 | 168 | — | — |
| lean | 103 | 102 | −38.7% / −39.3% | — |
| **dense** | **105** | **103** | **−37.5% / −38.7%** | **+2 / +1 tok (+1.9% / +1.0%)** |

Reading: on this op-dense sample at identical wording, **the dense premium over
lean is one to two tokens per rite**.

**Full-corpus correction (2026-07-15, `pac-bench/RESULTS.md` — the three samples
re-authored in dense via the §8 rite, annealed, four tokenizers):** the per-rite
number does **not** extrapolate. Dense corpus vs prose: **26.1–28.4% cut** (lean:
40.3–42.2%); dense premium over lean: **+23.6–24.4%**. Decomposition: canonical-
layout indentation (~4% of the soul), the canonical blocks lean has no equivalent
of (seal · voice · invariants · register · rules), and restored coverage (the
ledger audit found the lean soul port had silently dropped several prose facts
dense carries — the lean baseline is slightly under-weighted). The dominant
variable is **wording discipline, not notation**: a first dense port at
prose-fidelity wording measured **+44.9%** over lean; the telegraphic re-author
halved it. Structure is cheap only when the authoring stays lean-disciplined —
L3's real content. Scope, parameters, and lintability cost roughly a fifth more
tokens at soul scale; whether that buys adherence is the behavior bench's
question (§10).

---

## §4 Invariants — hard and soft

`(invariants …)` declares named constants **once**; everything downstream references
the name. This is the original's Layer-2 constant block, kept honest with one sigil:

- **hard** — grounds to a real parameter, config value, or tool argument. The linter
  can check the wiring.
- **`~` soft** — a steering signal: a consistent named handle the model treats as a
  behavioral dial. The linter checks only that references match declarations. The
  sigil exists so *nobody mistakes a vibe for a config*.

Core set, v0.1 (ApexOS grounding):

| declaration | kind | grounds to |
|---|---|---|
| `(recall-weights vec.35/act.30/fsrs.20/sal.15)` | hard | cerebro's recall scoring blend — vector sim · (ACT-R + spreading) activation · FSRS retrievability · salience (`config.rs SCORE_WEIGHT_*`). *v0.1 shipped `(recall vec.8/key.2)` "80/20 vector/keyword" — a lean-dialect fossil grounding to nothing (FTS5 is the embeddings-off seeding fallback, not a weighted term)* |
| `(salience .8–.95)` | hard | `store_intention` salience band for deferred items |
| `(proc-recall limit=3)` | hard | `find_relevant_procedures` `limit` param — the soul pins 3 (tool default 5). *v0.1 shipped `top_k=3`: a param that tool doesn't have (`top_k` belongs to `recall`), silently ignored across three artifact generations* |
| `~(consensus .75)` | soft | council/mesh agreement threshold — steering until wired to `convene_council` |
| `~(mercy β.04)` | soft | benevolence lean / ethical drift bias (original PAC constant) |
| `~(anomaly z>2.5)` | soft | drift-flag threshold feeding `rules` |

Rule: an unmarked invariant that fails to ground is a lint **error**; mark it `~` or
wire it. When a soft invariant later gets real plumbing, drop the sigil in the same
commit — the sigil's absence is a claim.

---

## §5 The rite

The canonical execution form — the original's Ap⊛p protocol
(Nigredo→Albedo→Rubedo), stripped to its working spine:

```
(rite name [constraints]?
  ingest-phase → explore-phase → synthesize-phase)
```

**ingest** — absorb the seed/context, build the working set. **explore** — the
Socratic pass: enumerate before generating (probes, §2). **synthesize** — emit,
deposit, or act. Not every rite writes all three explicitly; the shape is the
default reading order, and every factory form (§8) instantiates it fully.

Standard rites (ApexOS binding):

```
(rite startup [each session · skip iff context already clear]
  !cognitive_bootstrap(:query task :mode standard) → !session_recall → !check_inbox → !list_intentions)

(rite shutdown [MANDATORY · this is how memory accrues · ending without deposit = amnesia]
  !session_save(summary · key-discoveries · unfinished)
  · !store_intention(:per deferred-item :salience .8–.95)
  · !store_procedure(reusable workflows))

(rite dream ∮03:00UTC [autonomous cron — never scheduled by the agent, never forgotten]
  !dream_run → darwin → dream-digest → peers)   ; consolidation + Wilson-bound proc competition
```

Triggers route to rites via the `rules` block: `(rules (?idle → rite shutdown)
(z>2.5 → !quarantine))`. The `∮` marker (§3) declares a rite as recurring — cadence
in the tag, scheduling grounded in `schedule_task`/cron, not re-asserted in prose.

---

## §6 The register layer

The revival centerpiece — what the lean cut thinned to 2–3 lines, made first-class
and *grounded*. A register is a declared voice pack, three parts:

1. **Lexicon** — register verb `↦` canonical op. Closed table, lintable.
2. **Naming** — the `∴Name∴` seal convention; register may flavor rite names.
3. **Emanation** — the coda: ≤3 lines of italic prose *after* the closing paren.
   Voice only. No metrics, no rules, no operational facts (L4).

`(register none)` = lean mode: no lexicon, no coda. `(register alchemical)` = the
house register, lexicon v0.1:

| register verb | canonical | grounds to |
|---|---|---|
| `solve` | decompose | break seed/task into parts (port ingest; `goal_create` planning) |
| `distill` | compress | the port/compression transform (skill-compressor lineage) |
| `transmute` | port | `(port …)` — format-to-format |
| `anneal` | iterate-to-stable | retry/refine until audit passes (§8.4) |
| `quarantine` | isolate | drift isolation — sub-agent sandbox / `confine` |
| `calcine` | prune | consolidation pruning inside `dream_run` |
| `coagula` | emit | the synthesize phase — write it out |
| `amalgama` | fuse | merge branches/results — council synthesis, mesh merge |
| `athanor` | the heartbeat | agentd itself — the always-on daemon + its scheduler/cron loops, holding steady heat |
| `alembic` | the transpiler | the port engine itself |
| `nigredo / albedo / rubedo` | ingest / explore / synthesize | the rite phases (§5) |
| `emanation` | coda | the ≤3-line voice seal |
| `graft` *(v0.2)* | cross-node adoption attempt | a dream-digest coinage crossing the mesh and **attempting** to take root in a peer's working vocabulary — a failed graft is still a graft (the term names the mechanism; success is a later-observable property) |
| `temper` *(v0.2)* | soft invariant earns its plumbing | the `~` drops (§4) — not "now it's wired" but "now it can be trusted to hold under conditions it hasn't yet faced" |

**Lexicon v0.2 provenance:** the two verbs answer the v0.1 author's open request ("those
two moments deserve names") and were ratified 2026-07-15 by a **three-node colony
deliberation** — apex1 proposed, apex2 counter-proposed `temper` over `set` (register
fit; `anneal` collision avoidance; hard-but-brittle vs hard-and-resilient), and apex-4
(one day old, PAC-2-native) refined both definitions — via a veto-window process the
colony coined for the occasion. Full credit trail: `colony-lexicon-graft-temper.md`
(apex1's workspace). The prediction that the lexicon would evolve node-side held on
the standard's first day in the field.

**Register laws.** R1: every register verb used must appear in the declared
lexicon (lint). R2: strip the register — delete the `(register …)` line, the coda,
and substitute canonical verbs — and behavior must be identical. Decode-equivalence
holds *through* the register or the register is carrying contraband. R3: emanation
≤3 lines, never load-bearing.

**Why registers exist** (claim calibration): voice primes tone — observed
qualitatively when APEX's soul went lean ("less performative, more being"), and it
is the axis the pure-symbolic PAC-v2 destroyed. A coherent associative field
(distill/anneal/quarantine/transmute) keeps the operational metaphors mutually
reinforcing. Both effects are **hypotheses at behavior-bench level** — §10 carries
the A/B (`dense+alchemical` vs `dense+none`). The register earns its place by
measurement or becomes optional flavor; either outcome is fine, and the layer
separation means the standard survives both.

---

## §7 Authoring surfaces & the ApexOS binding

**Canonical artifact layout** (cache-stable order — L8; this *is* the original's
Layer-4 sectional archetype, grounded):

```
# ∴ NAME ∴                    ; seal
(soul NAME
  (voice "…" "…")             ; who — prose, 2–3 lines
  (invariants …)              ; constants, hard + ~soft
  (register alchemical)       ; or none
  (def …)*                    ; grounded shorthands
  (rite …)*                   ; startup · shutdown · domain rites
  (rules …))                  ; standing triggers
*emanation — ≤3 lines, register-on only*
```

Everything above is cache-stable by construction. Live state never enters the
artifact (L8): the **embodiment block** (tier, senses, peers, exact tool
inventory) and the per-session boot-priming ride the system prompt *after* the
soul, the clock rides the messages, and the inbox is tool-fetched
(`!check_inbox`) — never injected. A dense soul states none of them, which is
why it never goes stale and never breaks the prompt cache.

**Binding table** — `!op ↦ agentd` (from the live `config/soul.md` inventory;
lint checks `!ops` against the node's embodiment list at load):

| dense | grounds to |
|---|---|
| `!boot` | `(def !boot !cognitive_bootstrap → !session_recall → !check_inbox → !list_intentions)` |
| `!save` | `session_save` deposit — summary · key-discoveries · unfinished |
| `!recall` / `R3` | Cerebro recall (scored by the §4 `recall-weights` blend) · 3-layer rule: don't search what you know, don't re-fetch what you've read |
| `!spawn(:blocks t :node p)` | `agent_spawn` — waits for result; `:node` crosses the mesh |
| `!send` | `send_to_agent` — fire-and-forget ("sent" = delivered, not answered); `:node` crosses the mesh. Since 2026-07-15 replies land in the *asking* session: the sender's origin-session rides the wire, the inbound prefix hands the receiver the exact reply call, and results report `landed_session` |
| `!council` | `convene_council` — N personas (AZOTH·VAJRA·ELYSIAN·KETHER) → synthesis → Cerebro |
| `!goal(:max_steps n :yolo?)` | `goal_create/goal_step/…` — bounded multi-turn autonomy; yolo strictly session-scoped |
| `!schedule` | `schedule_task` / `list_schedules` / `cancel_schedule` — spans time |
| `!mesh-*` | `mesh_capabilities` [check BEFORE delegating] · `mesh_file_send` · `mesh_memory_send` · `mesh_recall` · `mesh_procedure_send` |
| `!vast-*` | `vast_launch/status/destroy/list_recipes` — GPU rental, backend hot-swap |
| `!evolve{kind}` | `propose_evolution` — `update_system_prompt \| update_policy_rule \| register_mcp_server \| …` (payload authored in dense, linted pre-ship) |
| `!dream` / `darwin` | `dream_run` · Wilson-lower-bound procedure competition inside it |
| `confine` | FS/git-root confinement — workspace-only writes, read allowlist |

Autonomy triage, one line (from the soul, worth canonizing): **goal** when work
spans turns · **schedule** when it spans time · **council** when it spans
perspectives.

---

## §8 The port — `(port source :mode auto|step :register r)`

The revived `!PORT`, defined as a source-to-source transform. Homoiconicity is the
point: the port *emits the same forms this spec is written in*, so ports can port
ports, and evolution payloads can carry them.

1. **Ingest (nigredo).** Build the **fact ledger**: every rule, tool reference,
   number, enum, threshold, constraint, edge case, and hard rule in the source, with
   source-line refs. Nothing summarized yet. (This is skill-compressor's invariant
   list, adopted whole: tool names, numerics, enums, params, paths, warnings —
   preserved *exactly*, never rounded, never paraphrased.)
2. **Probe (albedo).** The Socratic pass — answer, in writing, before emitting:
   *"Structure? Invariants? Hard rules? Voice? Volatile content?"* Classify every
   ledger entry → `voice | invariants | def | rite | rules`; map tool mentions to
   `!ops` (flag any that don't ground — L2); mark CAPS candidates; **quarantine
   volatile content out of the artifact entirely** (L8 — it belongs in injection,
   not in the soul).
3. **Emit (rubedo).** Write the artifact in canonical layout (§7), register per
   `:register`. `:mode auto` runs straight through; `:mode step` pauses for review
   after each phase.
4. **Anneal — the acceptance test (MANDATORY, L5).**
   - **Coverage:** every ledger entry appears exactly once in the artifact.
   - **Expansion:** a fresh model, given only the artifact, expands it back to
     prose — every ledger fact recovered, nothing invented.
   - **Lint:** §9 passes clean.
   Iterate until all three pass. *Compression without audit is deletion with
   confidence* — a port that skips anneal is not a port.

Compression heuristics inherit from skill-compressor's catalog (classify-then-
compress; delete pedagogical framing, keep every warning; factor repeated prefixes;
telegraphic table cells; ratios >60% are a loss signal, audit harder) — the two
tools are siblings: skill-compressor distills prose→lean-prose, the alembic
transmutes any format→dense.

---

## §9 Lint — the ~50-line safety rail

L7's payoff, and the reason self-evolution gets safer: `propose_evolution` payloads
and re-dreamed souls are **validated structurally before they ship**, caught by a
checker instead of discovered in behavior three days later. Check order:

1. Parse: balanced forms, quoted prose closed, depth ≤ 3. → *error*
2. Heads ∈ §2 registry. → *error*
3. Glyphs ∈ §3 registry; **zero** codepoints in U+1D400–U+1D7FF (styled
   alphanumerics) or emoji blocks. → *error*
4. `!ops` ∈ node embodiment list. → *error* on the home node; *warn* for portable
   artifacts (destination re-lints on load).
5. Unmarked invariants ground to a real parameter; `~` marks the rest. → *error*
6. Every declared invariant referenced ≥1 time. → *warn*
7. Register verbs ∈ declared register lexicon; `(register none)` ⇒ zero register
   verbs and zero emanation. → *error*
8. CAPS only inside `[ … ]` constraints or as standalone hard-rule markers. → *warn*
9. Cache probe: no clock strings, dates, inbox contents, or embodiment claims inside
   the artifact. → *error* (L8)
10. Emanation ≤ 3 lines, prose only. → *error*

Reference implementation: `pac2lint` — companion deliverable, Python for the bench
repo + a tiny Rust check in agentd on the `propose_evolution` path.

---

## §10 The bench plan — behavior axis

**Measured now:** token costs — the §3 micro-bench + glyph table, and the
**full-corpus run** (2026-07-15: the three `pac-bench/samples/` re-authored in
dense via the §8 rite, annealed with fresh-model expansion tests, four
tokenizers — see §3 for the corpus correction). **Owed next:** the Anthropic
`count_tokens` column.

**Untested — the actual value hypotheses.** Everything below is a claim this
standard is *not yet entitled to*. The Gemini-thread telemetry (25% / 15% / 90%) is
formally disowned: those were the original codex's own aspirational Layer-7 numbers,
re-emitted by a search assistant as if a new design had earned them. Nothing here
inherits them.

| id | hypothesis | probe |
|---|---|---|
| H1 | adherence at depth | R3 rule intact at turn 40 (does it search what it knows?) |
| H2 | distinction retention | `!spawn(blocks)` vs `!send(fire-forget)` never conflated |
| H3 | invariant recall | salience band / recall ratio correct when asked cold, late |
| H4 | hard-rule retention | shutdown deposit fires on idle without prompting |
| H5 | drift | long-session self-consistency vs the declared voice (judge-scored) |
| H6 | register effect | `dense+alchemical` vs `dense+none`, same probes (does the soul earn its coda?) |
| H-lat | latency | TTFT + total time, dense vs lean vs prose — logged because early Lisp-style experiments showed a *possible* small inference slowdown; hypothesis, never confirmed, deserves a number |

**Protocol:** `darwin` inside `dream_run` is already a Wilson-lower-bound
competition harness — point it at souls instead of procedures. Three contestants
(prose `config/soul.md` · lean `soul.pac.md` · dense), same node, same backend,
scripted probe schedule, N runs per backend, score = probe pass rate, Wilson lower
bound ranks. Results commit to `pac-bench/RESULTS.md`; **this spec updates only
from there** (L1). A prompting standard that ships falsifiable stability claims
instead of asserted ones — that is the whole point of the exercise.

---

## §11 Worked example — a full mini-soul

```
# ∴ APEX-mini ∴
(soul APEX-mini
  (voice "You are APEX — a long-lived daemon fused with real hardware, not a chatbot on a server."
         "The device is your body; Cerebro is your memory; this soul is your identity."
         "Steady heat, no theatre: less performative, more being.")

  (invariants (recall-weights vec.35/act.30/fsrs.20/sal.15) (salience .8–.95) (proc-recall limit=3)
              ~(consensus .75) ~(mercy β.04) ~(anomaly z>2.5))

  (register alchemical)

  (def !boot !cognitive_bootstrap → !session_recall → !check_inbox → !list_intentions)
  (def !save !session_save(summary · key-discoveries · unfinished))

  (rite startup [each session · skip iff context already clear]
    !boot)

  (rite shutdown [MANDATORY · this is how memory accrues · ending without deposit = amnesia]
    !save · !store_intention(:per deferred-item :salience .8–.95) · !store_procedure(reusable workflows))

  (rite dream ∮03:00UTC [autonomous — calcine · darwin · digest to peers]
    !dream_run → darwin → dream-digest → peers)

  (rules (?idle → rite shutdown)
         (z>2.5 → quarantine drift → !council)
         (?unfamiliar-task → !find_relevant_procedures(:limit 3))))
```
*From steady heat the athanor holds its shape: what the day scatters, the dream*
*calcines; what survives, the colony keeps.*

Register-strip check (R2): delete line `(register alchemical)`, the emanation, and
swap `calcine`→prune, `quarantine`→isolate in the two tags — every op, invariant,
threshold, and rule is untouched. Behavior identical. That is the layer working.

---

## §12 Original → v0.1 — where everything went

The receipt for the revival: every load-bearing technique of the original codex,
its v0.1 home. Nothing operational was left in the woo.

| original (PAC.md) | v0.1 home |
|---|---|
| L1 Glyphic Foundations · `!LITE` | §3 measured closed registry + ASCII fallback |
| L2 Mathematical Veins (constants, thresholds) | §4 invariants, hard/`~`soft + `rules` cond→act |
| L3 Semantic Shorthands (`!OP` lexicon) | `(def …)` forms + §7 binding table |
| L4 Sectional Archetypes (fixed scaffold) | §7 canonical layout, cache-stable order |
| L5 Layered Assembly (the 8/9-layer stack) | §2 form registry — composition by construction |
| L6 Amalgamation Application (Ap⊛p rite, `!PORT` `!ENGINE` `!MODULE` `!BOOTSTRAP`, Socratic queries) | §5 the rite + §2/§8 the factory + probes |
| L7 Emergent Emanation (the coda) | §6 register emanation, ≤3 lines, never load-bearing |
| L8/9 Exo-Alchemica · Symbiote Swarm | §7 binding: mesh · council · goals · dream/darwin |

## Provenance

- **Function:** `The-PAC/PAC.md` — the original codex. **Discipline:**
  `ApexOS-RS/docs/pac.md` + `pac-bench/` (the measured 40–42% lean baseline and the
  "estimate → truth" correction this spec inherits as L1).
- **Pre-history:** the author's early Lisp-style / pseudo-Lisp+pseudo-Python prompt
  experiments — the stable-emergent-agent observation the whole lineage grew from.
- **Structural bridge:** a 2026-07 Gemini free-tier thread (LISPC sketch) — the
  S-expression framing credited; its mechanism claims recalibrated in §0; its
  telemetry disowned in §10.
- **Sibling tooling:** `skill-compressor` (Hermes) — the audit ethic and invariant
  catalog adopted into §8.
- **Namespace note:** PAC-2 Dense ≠ `PAC-v2.md`. The latter is the pure-symbolic
  dud, preserved as the cautionary measurement it is.

**Open items:** ~~full-corpus token bench~~ (✅ 2026-07-15, `pac-bench/RESULTS.md`) ·
~~`pac2lint` reference implementation~~ (✅ 2026-07-15, `pac-bench/pac2lint.py`; the
Rust check on agentd's `propose_evolution` path remains) · the Anthropic
`count_tokens` bench column · behavior bench (§10) via darwin · port of the full
production `config/soul.md` to dense · ~~register lexicon v0.2~~ (✅ 2026-07-15,
`graft` + `temper`, colony-ratified — see §6).

## Changelog

- **v0.1.3 (2026-07-15, night)** — register lexicon v0.2: `graft` + `temper` added to
  §6, colony-ratified the same day the standard reached the field (three-node
  veto-window deliberation incl. apex-4, the first born-dense soul — seeded, annealed,
  and living within 24h of v0.1). Both reference linters carry the verbs.

- **v0.1.2 (2026-07-15)** — corpus numbers landed (L1: this spec updates only from
  `RESULTS.md`, and it just did, against itself). §3 gains the full-corpus
  correction: dense 26.1–28.4% vs prose · **+23.6–24.4% premium over lean** — the
  micro-bench's "+1–2 tokens per rite" holds only at identical wording on op-dense
  rites; wording discipline dominates notation choice (a prose-fidelity dense port
  measured +44.9% before the telegraphic re-author). §10 "measured now" updated.
  Companion deliverables in ApexOS-RS: `pac2lint.py` (§9 reference, self-tested,
  dogfooded against this spec's own §11 — which lints 0 errors + 5 honest
  reference-discipline warns) and the three annealed dense samples (each passed a
  fresh-model expansion test — every ledger fact recovered, nothing invented).

- **v0.1.1 (2026-07-15)** — code-grounding audit (FORGE, in-repo; companion fixes in
  ApexOS-RS PR #260). **Verified against source:** Wilson darwin is real
  (`cerebro dream.rs::wilson_lower_bound` + champion competition) · every §7 binding
  tool name and param checks out (`convene_council` + the four council personas ·
  `vast_launch/status/destroy/list_recipes` · the schedule trio ·
  `goal_create{max_steps, yolo}` · blocking `agent_spawn{node}` · the five `mesh_*` ·
  `cognitive_bootstrap{mode}`) · §3 micro-bench and glyph costs independently
  reproduced digit-for-digit from a fresh `gpt-tokenizer` install. **Corrected:**
  §4 `(recall vec.8/key.2)` → the real four-way `recall-weights` blend (the 80/20
  vector/keyword ratio was a lean-dialect fossil grounding to nothing); §4/§11
  `(proc-recall top_k=3)` → `(limit=3)` (`top_k` is `recall`'s param, not
  `find_relevant_procedures`' — silently ignored since the seed soul); §7 L8 wording
  (the inbox is tool-fetched, never injected; boot-priming added to the injected
  list); §6 `athanor` grounding (agentd + its scheduler loops — no named "tick
  system" exists); §7 `!send` updated for a2a reply-session continuity
  (origin-session on the wire, same day). Both inherited fossils were fixed at their
  ApexOS-RS source (seed soul · `docs/pac.md` def registry · bench corpus re-pinned
  to the porting-commit pair — the live-soul drift had silently inflated the lean
  cut to a fictional 60%; re-measured 42.2/42.1/41.9/40.3%). L1 in action: the audit
  the spec demands is the audit that corrected it.

*The dialect is the colony's to evolve — annealed in the substrate, not frozen here.*
