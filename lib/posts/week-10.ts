import type { DayPlan } from "../types";

const CORE = ["#RAG", "#LLM", "#AI", "#VectorSearch", "#100DaysOfCode"];

export const week10: DayPlan[] = [
  /* DAY 64 */
  {
    day: 64, theme: "Hybrid search — BM25 + dense, the right way", pillar: "rag",
    posts: [
      { id: "d64-p1", day: 64, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "BM25 isn't legacy. It's complementary.",
        copy: "Dense vector search captures meaning. BM25 captures exact terms. They miss different things.\n\nDense misses: product codes, names, abbreviations, rare technical terms.\nBM25 misses: paraphrases, synonyms, typos, conceptual matches.\n\nUse both. Score each independently. Combine with Reciprocal Rank Fusion (RRF):\n\nRRF(d) = sum over methods of 1 / (k + rank_method(d))\n\nk is a small constant (60). Higher rank in either method → bigger score. Simple, robust, works.",
        hashtags: [...CORE, "#HybridSearch"],
        image: { template: "stat", headline: "BM25 + dense", subhead: "Combined with RRF (k=60)", stat: { number: "RRF", label: "the simplest blend that works" }, accent: "cyan", aiPrompt: "Stat poster, cyan, 1:1", canvaBrief: "Cyan-violet gradient. Big RRF."
        }
      },
      { id: "d64-p2", day: 64, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "When hybrid gives the biggest lift",
        copy: "Hybrid helps most when:\n- Your domain has many proper nouns / IDs / codes\n- Users mix natural language and exact terms\n- The corpus has duplicate content with different phrasings\n\nIt helps less when:\n- All queries are short, vague, conceptual\n- BM25 over the corpus already returns garbage (poor full-text index)\n- Latency budget is razor-thin (you're now running 2 searches)\n\nMeasure on YOUR eval set. 5-15% recall@5 lift is typical when hybrid wins.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "list", headline: "Hybrid wins big when...",
          bullets: ["Many proper nouns / IDs", "Mixed query styles", "Synonyms in corpus", "Latency budget allows"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d64-p3", day: 64, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "RRF in 8 lines",
        copy: "Run dense and BM25 separately. Each returns a ranked list. Combine. The k constant flattens early ranks; 60 is the published default that works almost everywhere.",
        hashtags: [...CORE, "#Python"],
        image: { template: "code", headline: "Reciprocal Rank Fusion",
          code: { language: "python", snippet: "def rrf(rankings: list[list[str]], k: int = 60) -> list[str]:\n    scores: dict[str, float] = {}\n    for ranking in rankings:\n        for rank, doc_id in enumerate(ranking):\n            scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank)\n    return sorted(scores, key=scores.get, reverse=True)\n\nfinal = rrf([dense_ids, bm25_ids])[:10]" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d64-p4", day: 64, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Use the same chunks for both indexes",
        copy: "Common bug: BM25 indexed at the document level, dense at the chunk level. RRF then combines results pointing at different units. Mismatch.\n\nFix: index both at the chunk level. Same chunks, two methods.\n\nQdrant 1.10+, Weaviate, OpenSearch all let you store BM25 + vector on the same chunk. One source of truth for IDs. Cleaner RRF.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "tip", headline: "Same chunks for both indexes",
          bullets: ["Index unit must match", "BM25 + vector per chunk", "One ID space", "Clean RRF combination"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d64-p5", day: 64, postNumber: 5, slot: "night", type: "recap", pillar: "rag",
        title: "Day 64 — hybrid search, demystified",
        copy: "Day 64 done.\n\n- BM25 + dense are complementary\n- RRF blends ranks robustly\n- 8-line implementation\n- Index both at the chunk level\n\nTomorrow (Day 65): rerankers — the small models that often double your retrieval quality.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "quote", headline: "Hybrid > vector alone.", subhead: "RRF for free.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 65 */
  {
    day: 65, theme: "Rerankers — the second pass that fixes everything", pillar: "rag",
    posts: [
      { id: "d65-p1", day: 65, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "Retrieve fast → rerank slow",
        copy: "Two-stage retrieval is the modern default:\n\n1. Retrieve top-50 with cheap embedding similarity (millisecond, scalable)\n2. Rerank to top-5 with a cross-encoder (slower, more accurate)\n\nA cross-encoder reads query + document together and outputs a relevance score. Way more accurate than separate embedding cosine. Too slow for the full corpus, perfect for the top-50.\n\nNet: 5-30% relevance improvement, often more than switching the LLM. Most underrated upgrade in 2026 RAG.",
        hashtags: [...CORE, "#Reranker"],
        image: { template: "stat", headline: "5-30%", subhead: "relevance lift from a reranker", stat: { number: "+20%", label: "typical recall@5 lift adding a reranker" }, accent: "cyan", aiPrompt: "Stat poster, cyan, 1:1", canvaBrief: "Cyan-violet gradient. Big +20%."
        }
      },
      { id: "d65-p2", day: 65, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "Pick a reranker — open vs API",
        copy: "Open:\n- BAAI/bge-reranker-v2-m3 — multilingual, strong default\n- mixedbread-ai/mxbai-rerank-large-v1\n- jina-reranker-v2\n\nAPI:\n- cohere rerank-3.5 — fastest, paid by query\n- voyage rerank-2 — strong English\n\nFor self-hosted: bge-reranker-v2-m3 is hard to beat for the cost. Runs on a 8GB GPU. ~50ms per query at top-50.\n\nFor speed: cohere. For privacy + cost: open self-hosted.",
        hashtags: [...CORE, "#Reranker"],
        image: { template: "list", headline: "Rerankers in 2026",
          bullets: ["bge-reranker-v2-m3 (open)", "mxbai-rerank-large", "cohere rerank-3.5 (API)", "voyage rerank-2 (API)"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d65-p3", day: 65, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "Add a reranker in 12 lines",
        copy: "Use sentence-transformers' CrossEncoder for an open reranker. Pass (query, doc) pairs; get scores. Sort; take top-5. That's the second pass.",
        hashtags: [...CORE, "#sentencetransformers"],
        image: { template: "code", headline: "Two-stage retrieve + rerank",
          code: { language: "python", snippet: "from sentence_transformers import CrossEncoder\n\nreranker = CrossEncoder('BAAI/bge-reranker-v2-m3', max_length=512)\n\ndef retrieve_and_rerank(q, top_n=50, top_k=5):\n    # stage 1: cheap retrieval\n    candidates = vector_db.search(q, k=top_n)\n    # stage 2: rerank\n    pairs = [(q, c.text) for c in candidates]\n    scores = reranker.predict(pairs)\n    ranked = sorted(zip(candidates, scores), key=lambda x: -x[1])\n    return [c for c, _ in ranked[:top_k]]" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d65-p4", day: 65, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Cap the reranker at 50 candidates",
        copy: "Reranking 1000 candidates is wasteful. Past ~50, gains plateau and latency explodes (cross-encoder is O(n × seq_len²)).\n\nSweet spot:\n- Retrieve top-50 cheaply\n- Rerank → top-5\n- 30-150ms total reranker time on a small GPU\n\nIf your reranker is too slow, reduce candidates first, optimise model second. 50 is a great default; tune from your latency budget.",
        hashtags: [...CORE, "#Performance"],
        image: { template: "tip", headline: "Rerank ≤ 50 candidates",
          bullets: ["Past 50, gains flatten", "Latency scales linearly", "Sweet spot 30-150ms", "Tune from latency budget"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d65-p5", day: 65, postNumber: 5, slot: "night", type: "recap", pillar: "rag",
        title: "Day 65 — the second pass that pays for itself",
        copy: "Day 65 done.\n\n- Two-stage retrieve + rerank is default\n- Open and API rerankers\n- 12-line implementation\n- Cap at 50 candidates\n\nTomorrow (Day 66): query rewriting. Most retrieval failures are query failures, not retrieval failures.",
        hashtags: [...CORE, "#Reranker"],
        image: { template: "quote", headline: "Retrieve cheap. Rerank smart.", subhead: "The 2-stage pattern that won.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 66 */
  {
    day: 66, theme: "Query rewriting — fix the input before the search", pillar: "rag",
    posts: [
      { id: "d66-p1", day: 66, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "Bad queries can't be fixed by good retrievers",
        copy: "User says 'how do i' (truncated, lowercase, vague). Embedding similarity to a doc titled 'Onboarding Procedure for New Employees' is weak.\n\nFix: rewrite the query before searching. An LLM call (or a fine-tuned tiny model) produces a fuller, more search-friendly version.\n\nApproaches:\n- Expansion — add likely synonyms\n- HyDE — generate a hypothetical answer; embed THAT for retrieval\n- Multi-query — generate N rewrites, retrieve each, union\n\nNon-trivial gains, especially for sparse/conversational queries.",
        hashtags: [...CORE, "#QueryRewriting"],
        image: { template: "list", headline: "Query rewriting — 3 patterns",
          bullets: ["Expansion — add synonyms", "HyDE — generate hypothetical answer", "Multi-query — N rewrites", "Pick by latency budget"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d66-p2", day: 66, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "HyDE — the trick that surprised everyone",
        copy: "HyDE = Hypothetical Document Embeddings.\n\nIdea: instead of embedding the user's question, ask the LLM to generate a hypothetical answer. Embed THAT. Search.\n\nWhy it works: the answer is more similar in shape to documents than the question is. The embedding space loves answer-shaped text.\n\nCost: 1 LLM call. Latency: ~500ms. Use cheap models for the rewrite (gpt-4o-mini, claude-haiku) — quality of the rewrite isn't the bottleneck.",
        hashtags: [...CORE, "#HyDE"],
        image: { template: "stat", headline: "HyDE", subhead: "Embed a hypothetical answer, not the question.", stat: { number: "HyDE", label: "the rewrite trick that surprises every team" }, accent: "cyan", aiPrompt: "Stat poster, cyan, 1:1", canvaBrief: "Cyan-violet gradient. Big HyDE."
        }
      },
      { id: "d66-p3", day: 66, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "Multi-query rewrite + union",
        copy: "Generate 3 rewrites of the query. Retrieve top-k for each. RRF the union. Often better than HyDE for ambiguous queries.\n\nKeep the rewrites diverse — explicit, specific, abstract. The LLM can do this in one call returning a JSON array.",
        hashtags: [...CORE, "#PromptEngineering"],
        image: { template: "code", headline: "Multi-query rewrite",
          code: { language: "python", snippet: "from openai import OpenAI\nimport json\n\nclient = OpenAI()\n\ndef rewrite(q: str, n: int = 3) -> list[str]:\n    prompt = (\n        f'Rewrite the user question {n} different ways for retrieval. '\n        'Vary explicit/specific/abstract phrasings. Return JSON array of strings.\\n\\n'\n        f'Question: {q}'\n    )\n    r = client.chat.completions.create(\n        model='gpt-4o-mini',\n        messages=[{'role': 'user', 'content': prompt}],\n        response_format={'type': 'json_object'},\n    )\n    return json.loads(r.choices[0].message.content)['queries']" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d66-p4", day: 66, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Cache rewrites — they repeat",
        copy: "User questions cluster. 'How do I reset my password' is the same query 1000 times.\n\nCache rewrites by hash(query). LRU cache or Redis with TTL. Avoid burning LLM tokens on the same rewrite.\n\nFor production: log every rewrite + outcome. The cache becomes a map of 'queries seen' to retrieval traces — gold for debugging.",
        hashtags: [...CORE, "#MLOps"],
        image: { template: "tip", headline: "Cache rewrites by hash",
          bullets: ["Same query asked 1000x", "LRU or Redis TTL", "Save tokens", "Cache becomes debug log"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d66-p5", day: 66, postNumber: 5, slot: "night", type: "recap", pillar: "rag",
        title: "Day 66 — fix the input first",
        copy: "Day 66 done.\n\n- Bad query = bad retrieval\n- HyDE: embed hypothetical answer\n- Multi-query rewrites + RRF\n- Cache rewrites\n\nTomorrow (Day 67): multi-step retrieval. When one query isn't enough.",
        hashtags: [...CORE, "#QueryRewriting"],
        image: { template: "quote", headline: "Most retrieval bugs are query bugs.", subhead: "Rewrite first.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 67 */
  {
    day: 67, theme: "Multi-step retrieval — when one query isn't enough", pillar: "rag",
    posts: [
      { id: "d67-p1", day: 67, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "Some questions need multi-hop retrieval",
        copy: "Question: 'How does X compare to Y?'\nNo single chunk has the answer. You need:\n1. Retrieve about X\n2. Retrieve about Y\n3. Synthesise.\n\nQuestion: 'In the 2024 annual report, what's the YoY growth in segment Z?'\n1. Retrieve the 2024 report.\n2. Retrieve the 2023 report.\n3. Compute.\n\nMulti-hop or 'iterative retrieval' splits a query into sub-queries, retrieves for each, and synthesises. The LLM orchestrates the loop.",
        hashtags: [...CORE, "#MultiHop"],
        image: { template: "list", headline: "Multi-hop signals",
          bullets: ["Compare X to Y", "Aggregate across docs", "Multi-year / cross-section", "Multi-entity questions"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d67-p2", day: 67, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "Sub-question decomposition",
        copy: "The pattern:\n\n1. Send the user query to an LLM with a 'decompose this into sub-questions' prompt.\n2. For each sub-question, run normal RAG.\n3. Return all retrieved chunks + sub-questions to a final LLM with the original question.\n4. Final LLM synthesises.\n\nLatency: 2x normal RAG. Quality: dramatic on multi-entity questions.\n\nCheap when sub-questions can run in parallel (asyncio.gather). Don't sequence what you can fan out.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "stat", headline: "decompose → fan out → synthesise", subhead: "The multi-hop pattern.", stat: { number: "3", label: "stages of multi-step RAG" }, accent: "cyan", aiPrompt: "Stat poster, cyan, 1:1", canvaBrief: "Cyan gradient. Big 3."
        }
      },
      { id: "d67-p3", day: 67, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "Async sub-question RAG",
        copy: "Decompose, fan out with asyncio.gather, synthesise. Save round-trips by parallelising. The LLM is the only sequential step at the end.",
        hashtags: [...CORE, "#asyncio"],
        image: { template: "code", headline: "Async sub-question RAG",
          code: { language: "python", snippet: "import asyncio\nfrom openai import AsyncOpenAI\n\nclient = AsyncOpenAI()\n\nasync def answer_subq(sq: str) -> str:\n    chunks = await retrieve_async(sq)\n    return await llm_async(build_rag_prompt(sq, chunks))\n\nasync def multi_hop(q: str) -> str:\n    subs = await decompose(q)                            # list[str]\n    subqs = await asyncio.gather(*(answer_subq(s) for s in subs))\n    return await synthesise(q, list(zip(subs, subqs)))\n\nprint(asyncio.run(multi_hop('Compare RAG and fine-tuning costs.')))" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d67-p4", day: 67, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Don't multi-hop everything",
        copy: "Multi-hop is 2-3x more expensive than vanilla RAG. Don't apply it to every query.\n\nA cheap classifier (LLM call, prompt-only) decides 'is this multi-hop'. If yes, decompose. If no, single-shot. Keeps your average cost down while handling the hard ones.\n\nOr expose two endpoints: '/quick' and '/research'. Let the user pick. Latency expectations differ.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "tip", headline: "Multi-hop on demand only",
          bullets: ["Cheap classifier first", "Single-shot for simple", "Or two endpoints", "Latency budget matters"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d67-p5", day: 67, postNumber: 5, slot: "night", type: "recap", pillar: "rag",
        title: "Day 67 — multi-hop, used wisely",
        copy: "Day 67 done.\n\n- Some questions need multi-step\n- Decompose → fan out → synthesise\n- Async parallelisation\n- Apply selectively\n\nTomorrow (Day 68): agentic RAG — letting the LLM decide what to retrieve.",
        hashtags: [...CORE, "#MultiHop"],
        image: { template: "quote", headline: "Decompose. Fan out. Synthesise.", subhead: "Hard questions, three steps.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 68 */
  {
    day: 68, theme: "Agentic RAG — let the LLM decide", pillar: "agents",
    posts: [
      { id: "d68-p1", day: 68, postNumber: 1, slot: "morning", type: "concept", pillar: "agents",
        title: "Agentic RAG = retrieval as a tool",
        copy: "Vanilla RAG: retrieve, then prompt. Always retrieves, even when not needed.\n\nAgentic RAG: the LLM decides whether to retrieve, what to query, and when to stop.\n\nMechanism: the LLM is given a 'search' tool. On each turn, it can call search(query) or answer directly. Loop until it answers.\n\nWhen this wins:\n- Mixed queries (some need docs, some don't)\n- Iterative research questions\n- Comparisons that span multiple retrievals\n\nCost: variable per query. Worst case 5-10 LLM calls. Worth it for hard questions; overkill for easy ones.",
        hashtags: [...CORE, "#AgenticRAG"],
        image: { template: "stat", headline: "RAG as tool, not pipeline", subhead: "LLM decides when to retrieve.", stat: { number: "1", label: "tool: search()" }, accent: "cyan", aiPrompt: "Stat poster with agent + tool glyph, 1:1", canvaBrief: "Cyan-violet gradient. Big 1."
        }
      },
      { id: "d68-p2", day: 68, postNumber: 2, slot: "midday", type: "deepdive", pillar: "agents",
        title: "Tool-calling makes agentic RAG trivial",
        copy: "OpenAI, Anthropic, Mistral, and most open models support tool / function calling natively. You define a JSON schema for the tool; the model calls it; you execute; return result; loop.\n\nThe loop:\n1. Send messages + tools to LLM.\n2. If response has tool_call, run the tool, append result to messages.\n3. Repeat until response has final answer.\n\nAgentic RAG = tool-calling LLM + a retrieve(query) tool. 30 lines of Python. We'll write it tomorrow during agents week.",
        hashtags: [...CORE, "#ToolUse"],
        image: { template: "list", headline: "Agentic RAG ingredients",
          bullets: ["Tool-calling LLM", "retrieve(query) function", "Loop until final answer", "30 lines of glue"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d68-p3", day: 68, postNumber: 3, slot: "afternoon", type: "code", pillar: "agents",
        title: "Tool-calling RAG with OpenAI",
        copy: "Define a search tool with a JSON schema. Pass to chat.completions.create. The model decides when to call. We loop until done.\n\nThis pattern works identically in Anthropic / Mistral / open models — only the API surface changes.",
        hashtags: [...CORE, "#OpenAI"],
        image: { template: "code", headline: "Tool-calling RAG loop",
          code: { language: "python", snippet: "from openai import OpenAI\nimport json\n\nclient = OpenAI()\n\ntools = [{\n    'type': 'function',\n    'function': {\n        'name': 'search',\n        'description': 'Search internal docs for a query.',\n        'parameters': {'type': 'object', 'properties': {'q': {'type': 'string'}}, 'required': ['q']},\n    },\n}]\n\nmsgs = [{'role': 'user', 'content': 'Compare RAG and fine-tuning costs.'}]\nwhile True:\n    r = client.chat.completions.create(model='gpt-4o-mini', messages=msgs, tools=tools)\n    m = r.choices[0].message\n    msgs.append(m)\n    if not m.tool_calls:\n        print(m.content); break\n    for tc in m.tool_calls:\n        out = retrieve(json.loads(tc.function.arguments)['q'])\n        msgs.append({'role': 'tool', 'tool_call_id': tc.id, 'content': out})" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d68-p4", day: 68, postNumber: 4, slot: "evening", type: "tip", pillar: "agents",
        title: "Cap tool calls — agents will spin",
        copy: "Without a cap, an agent can call search() 50 times on a confusing question.\n\nMy default: max 5-8 tool calls per session. After cap, force the model to answer with what it has.\n\nAlso log every tool call — query + result. When debugging 'why did the agent give a weird answer', the tool log tells you exactly which retrievals it saw.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "tip", headline: "Cap tool calls; log them all",
          bullets: ["Max 5-8 calls / session", "Force answer at cap", "Log every call + result", "Debug from the log"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d68-p5", day: 68, postNumber: 5, slot: "night", type: "recap", pillar: "agents",
        title: "Day 68 — agentic RAG, demystified",
        copy: "Day 68 done.\n\n- Agentic RAG = retrieval as tool\n- Tool-calling makes it trivial\n- 30-line implementation\n- Cap calls; log everything\n\nTomorrow (Day 69): GraphRAG — when entities and relationships matter more than chunks.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "quote", headline: "Don't always retrieve.", subhead: "Let the model decide when.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 69 */
  {
    day: 69, theme: "GraphRAG — when relationships matter", pillar: "rag",
    posts: [
      { id: "d69-p1", day: 69, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "GraphRAG models entities + relationships",
        copy: "Standard RAG returns chunks. Some questions need a graph.\n\nGraphRAG flow (Microsoft popularised):\n1. Extract entities + relationships from chunks (LLM extraction)\n2. Build a knowledge graph (nodes = entities, edges = relationships)\n3. Cluster the graph; summarise each cluster\n4. Retrieve via the graph (entity + neighbourhood) plus chunks\n\nWins on: 'tell me about X and everyone connected to X', 'summarise themes across the corpus', 'who else does Y'.\n\nLoses on: 'cost more compute upfront, often 5-10x indexing time'. Not free.",
        hashtags: [...CORE, "#GraphRAG"],
        image: { template: "list", headline: "GraphRAG — when worth it",
          bullets: ["Entity-rich corpora", "Relationship questions", "Theme summarisation", "5-10x more indexing cost"],
          accent: "cyan", aiPrompt: "Network-graph glyph poster, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d69-p2", day: 69, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "GraphRAG isn't always the answer",
        copy: "When standard RAG suffices:\n- Q&A over docs without complex entity webs\n- Customer support, product docs, code search\n- Any 'find the right paragraph' task\n\nWhen GraphRAG earns its cost:\n- Investigations across many connected entities\n- Research across a knowledge corpus\n- 'who else, when, with whom' questions\n\nCost matrix: LLM tokens for extraction (one-time), graph storage, more complex retrieval. Try standard RAG + reranker first. Switch to GraphRAG when those plateau.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "compare", headline: "Standard RAG vs GraphRAG",
          compare: { leftLabel: "Standard RAG", leftItems: ["Cheaper indexing", "Chunk-level", "Most Q&A", "Faster to ship"], rightLabel: "GraphRAG", rightItems: ["Expensive indexing", "Entity + relationship", "Investigations", "Theme questions"] },
          accent: "cyan", aiPrompt: "Compare poster, 1:1", canvaBrief: "Split. Grey vs cyan."
        }
      },
      { id: "d69-p3", day: 69, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "Tiny entity-graph extraction in 18 lines",
        copy: "Ask the LLM to extract triples (subject, relation, object) from a chunk. Store as edges. Query later with neighbourhood expansion.\n\nThe full GraphRAG flow has community summaries on top of this — but the triple extraction is the foundation.",
        hashtags: [...CORE, "#GraphRAG"],
        image: { template: "code", headline: "Triple extraction — minimum",
          code: { language: "python", snippet: "from openai import OpenAI\nimport json\n\nclient = OpenAI()\n\ndef extract_triples(text: str) -> list[tuple[str, str, str]]:\n    prompt = (\n        'Extract entities and relationships as a JSON array of '\n        '[subject, relation, object] triples. Use canonical names.\\n\\n'\n        f'Text: {text}'\n    )\n    r = client.chat.completions.create(\n        model='gpt-4o-mini',\n        messages=[{'role':'user','content':prompt}],\n        response_format={'type':'json_object'},\n    )\n    return [tuple(t) for t in json.loads(r.choices[0].message.content)['triples']]" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d69-p4", day: 69, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Use neo4j or memgraph for production graphs",
        copy: "For >100k triples, in-memory dicts hurt. Production-grade graph stores:\n\n- neo4j — most popular; cypher query language\n- memgraph — Cypher compatible, faster for some workloads\n- TigerGraph — scale-out\n\nIntegrations with LangChain / LlamaIndex exist for all. The smallest possible Cypher query gives you a node + neighbours faster than scanning a Python dict.",
        hashtags: [...CORE, "#GraphDB"],
        image: { template: "tip", headline: "Use a real graph DB",
          bullets: ["neo4j — most popular", "memgraph — Cypher fast", "Cypher = the SQL of graphs", "Scale past 100k edges"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d69-p5", day: 69, postNumber: 5, slot: "night", type: "recap", pillar: "rag",
        title: "Day 69 — graphs when chunks aren't enough",
        copy: "Day 69 done.\n\n- GraphRAG = entities + relationships\n- Standard RAG first; graph for hard cases\n- 18-line triple extraction\n- Use neo4j/memgraph at scale\n\nTomorrow (Day 70): the production RAG checklist + week 10 wrap.",
        hashtags: [...CORE, "#GraphRAG"],
        image: { template: "quote", headline: "Chunks for facts. Graphs for relationships.", subhead: "Pick by question shape.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 70 */
  {
    day: 70, theme: "Production RAG checklist + week 10 wrap", pillar: "rag",
    posts: [
      { id: "d70-p1", day: 70, postNumber: 1, slot: "morning", type: "checklist", pillar: "rag",
        title: "Production RAG checklist — 12 items",
        copy: "Before shipping a RAG to users, tick every box:\n\n1. Chunk size + overlap tuned\n2. Metadata on every chunk\n3. Hybrid (vector + BM25) retrieval\n4. Reranker in stage 2\n5. Query rewrite (or HyDE) when relevant\n6. Citations always shown\n7. 'I don't know' escape in prompt\n8. Eval set with ragas / TruLens\n9. p99 latency budget set\n10. Cost per query measured\n11. Tool-call cap (if agentic)\n12. Embedding model + version pinned\n\nMost teams ship after 3 of these. The other 9 are why their RAG 'feels off'.",
        hashtags: [...CORE, "#RAGProduction"],
        image: { template: "list", headline: "Production RAG — 12 items",
          bullets: ["Chunking", "Metadata", "Hybrid", "Reranker", "Rewrites", "Citations", "Don't-know escape", "Eval set", "p99 budget", "Cost / query", "Call cap", "Pinned models"],
          accent: "cyan", aiPrompt: "12-item checklist poster, cyan, 1:1", canvaBrief: "White grid, 12 rows in 2 columns."
        }
      },
      { id: "d70-p2", day: 70, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "Cost & latency budgets — the real constraints",
        copy: "Per-query budgets I aim for in 2026:\n\n- p99 latency: 1.5s for chat, 5s for research mode\n- Cost: ≤ $0.005 / query at average load\n- Embedding: ≤ 50ms\n- Retrieval (hybrid + rerank): ≤ 200ms\n- LLM: ≤ 1s\n\nIf you blow these, optimise in this order:\n1. Cache (rewrites, retrieval, answers)\n2. Smaller LLM (gpt-4o-mini, claude-haiku)\n3. Smaller embedding (384 dim)\n4. Skip the reranker for easy queries\n\nMeasure first. Optimise once.",
        hashtags: [...CORE, "#MLOps"],
        image: { template: "list", headline: "RAG budgets I aim for",
          bullets: ["p99 chat: 1.5s", "p99 research: 5s", "$0.005 / query", "200ms retrieval"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d70-p3", day: 70, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "Trace every RAG call — the one log line that matters",
        copy: "One log line per query. Query, top retrieved IDs + scores, rewritten query, prompt token count, model, latency, answer length. Push to a structured store.\n\nThis log is what differentiates ML team from prod team. With it, you can answer 'why did this answer go wrong' in 30 seconds. Without it, you can only re-run.",
        hashtags: [...CORE, "#Observability"],
        image: { template: "code", headline: "RAG trace log",
          code: { language: "python", snippet: "import json, time, structlog\n\nlog = structlog.get_logger()\n\ndef rag_traced(q: str) -> str:\n    t0 = time.perf_counter()\n    rewritten = rewrite(q)\n    candidates = retrieve_hybrid(rewritten)\n    top = rerank(rewritten, candidates)\n    prompt = build_rag_prompt(q, [c.text for c in top])\n    answer = llm(prompt)\n    log.info('rag', query=q, rewritten=rewritten,\n             ids=[c.id for c in top], latency=time.perf_counter()-t0)\n    return answer" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d70-p4", day: 70, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Cache aggressively. Then cache more.",
        copy: "Caches that pay for themselves in days:\n\n1. Query → rewritten query (LRU, TTL=1d)\n2. Query hash → retrieved chunk IDs (LRU, TTL=1h)\n3. Final answer (LRU, TTL=1h, only if exact query match)\n\nCache invalidation is the hard part. When docs change, invalidate retrieval + answer caches by version tag.\n\nA well-cached RAG can serve 50-90% of queries from cache. Effective cost drops by an order of magnitude.",
        hashtags: [...CORE, "#Caching"],
        image: { template: "tip", headline: "Cache 3 things",
          bullets: ["Rewrite cache (1d)", "Retrieval cache (1h)", "Answer cache (1h, exact match)", "Invalidate by version tag"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d70-p5", day: 70, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Week 10 done — production RAG",
        copy: "Week 10 done. 70 days, 350 posts in.\n\nThis week:\n- Hybrid (BM25 + dense)\n- Rerankers — 2-stage retrieve\n- Query rewriting + HyDE\n- Multi-step retrieval\n- Agentic RAG\n- GraphRAG\n- Production checklist\n\nNext week: agents. ReAct, tool use, planning, multi-agent. The next layer of LLM apps.",
        hashtags: [...CORE, "#90DaysOfAI"],
        image: { template: "quote", headline: "10 weeks down. 3 to go.", subhead: "Next: agents.", accent: "cyan", aiPrompt: "Pastel cyan quote with 70/90 progress, 1:1", canvaBrief: "Pastel cyan quote with 70/90 cyan bar." }
      },
    ]
  },
];
