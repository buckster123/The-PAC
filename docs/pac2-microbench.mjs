import { encode as o200k } from 'gpt-tokenizer/encoding/o200k_base';
import { encode as cl100k } from 'gpt-tokenizer/encoding/cl100k_base';

const n = (f, s) => f(s).length;

console.log("=== GLYPH COSTS (isolated) o200k/cl100k ===");
const glyphs = ["(", ")", "[", "]", "§", "→", "·", "|", ":", ";", "!", "?", "~", "↔", "≡", "∴", "↦", "⊛", "∮", "⋄", "⊙", "⟨", "⟩", "⇒", "∵", "≈", "∈", "𝔸", "𝕝"];
for (const g of glyphs) console.log(`${JSON.stringify(g)}: ${n(o200k,g)}/${n(cl100k,g)}`);

const prose = `## Session startup
Orient yourself at the start of each new session:
0. cognitive_bootstrap(query=<task/context>, mode="standard") — dynamic priming block
1. session_recall — load notes from previous session
2. check_inbox — messages from other agents or colony nodes
3. list_intentions — pending TODOs
Skip only if the conversation already carries clear context.

## Session shutdown  (mandatory — this is how memory accumulates)
Before a session ends, goes idle, or the daemon stops, DEPOSIT:
- session_save — one-paragraph summary + key discoveries + unfinished business
- store_intention — one per deferred item, salience 0.8–0.95
- store_procedure — any reusable workflow discovered this session
A session that ends without depositing is amnesia.`;

const lean = `§startup (each session; skip only if context already clear) :
 !cognitive_bootstrap(query=task, mode=standard) → !session_recall → !check_inbox → !list_intentions

§shutdown (MANDATORY — this is how memory accrues; ending w/o depositing = amnesia) :
 !session_save(summary · key-discoveries · unfinished) · !store_intention(per deferred item, salience .8–.95) · !store_procedure(reusable workflow)`;

const dense = `(rite startup [each session · skip iff context already clear]
  !cognitive_bootstrap(:query task :mode standard) → !session_recall → !check_inbox → !list_intentions)

(rite shutdown [MANDATORY · this is how memory accrues · ending without deposit = amnesia]
  !session_save(summary · key-discoveries · unfinished)
  · !store_intention(:per deferred-item :salience .8–.95)
  · !store_procedure(reusable workflows))`;

console.log("\n=== MICRO-BENCH: startup/shutdown sample ===");
const rows = { prose, lean, dense };
const T = {};
for (const [k, v] of Object.entries(rows)) {
  T[k] = [n(o200k, v), n(cl100k, v)];
  console.log(`${k.padEnd(6)}: o200k=${T[k][0]}  cl100k=${T[k][1]}  bytes=${Buffer.byteLength(v)}`);
}
const pct = (a,b) => (100*(a-b)/a).toFixed(1);
console.log(`\nlean  vs prose: o200k cut ${pct(T.prose[0],T.lean[0])}%  cl100k cut ${pct(T.prose[1],T.lean[1])}%`);
console.log(`dense vs prose: o200k cut ${pct(T.prose[0],T.dense[0])}%  cl100k cut ${pct(T.prose[1],T.dense[1])}%`);
console.log(`dense vs lean : o200k ${T.dense[0]-T.lean[0]>=0?'+':''}${T.dense[0]-T.lean[0]} tok (${(100*(T.dense[0]-T.lean[0])/T.lean[0]).toFixed(1)}%)  cl100k ${T.dense[1]-T.lean[1]>=0?'+':''}${T.dense[1]-T.lean[1]} tok (${(100*(T.dense[1]-T.lean[1])/T.lean[1]).toFixed(1)}%)`);
