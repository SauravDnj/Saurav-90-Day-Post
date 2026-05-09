import type { DayPlan } from "../types";

const CORE = ["#RAG", "#LLM", "#VectorDatabase", "#AI", "#100DaysOfCode"];

export const week09: DayPlan[] = [
  /* DAY 57 */
  {
    day: 57, theme: "Why RAG — and why it's not just 'context-stuffing'", pillar: "rag",
    posts: [
      { id: "d57-p1", day: 57, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "RAG = Retrieval Augmented Generation",
        copy: "RAG gives an LLM access to your documents at query time, instead of training the documents into the model.\n\nFlow:\n1. User asks a question.\n2. System retrieves relevant chunks from your docs.\n3. Stuff those chunks + the question into a prompt.\n4. LLM answers using both its knowledge and the retrieved context.\n\nWhy it dominates 2026 LLM apps:\n- Your data stays private (no fine-tuning required)\n- Updates instantly (just re-index docs)\n- Cheaper than fine-tuning\n- Easier to debug (see what was retrieved)",
        hashtags: [...CORE, "#RAG"],
        image: { template: "stat", headline: "RAG > fine-tune", subhead: "for knowledge tasks, almost always", stat: { number: "RAG", label: "first; fine-tune later (or never)" }, accent: "cyan", aiPrompt: "Stat poster with retrieval glyph, cyan, 1:1", canvaBrief: "Cyan-violet gradient. Big RAG."
        }
      },
      { id: "d57-p2", day: 57, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "RAG isn't 'just embeddings + LLM'",
        copy: "Production RAG has 5 hard problems:\n\n1. Chunking — splitting docs without breaking context\n2. Embedding — choosing a model that captures YOUR domain's similarity\n3. Retrieval — top-k similarity vs hybrid search vs reranking\n4. Augmentation — fitting only relevant context into the prompt\n5. Evaluation — knowing if retrieval is even helping\n\nAny tutorial that shows you 'RAG in 20 lines' is solving 1/5 of the actual problem. The other 4 are where most production effort goes.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "list", headline: "5 hard problems in RAG",
          bullets: ["Chunking", "Embedding choice", "Retrieval algorithm", "Prompt augmentation", "Evaluation"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 5 rows."
        }
      },
      { id: "d57-p3", day: 57, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "Naive RAG in 30 lines (the starting point)",
        copy: "A working RAG with 4 imports. Reads markdown, embeds chunks, finds top-k for a query, stuffs into a prompt. The starting point — week 10 we make it production-grade.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "code", headline: "Naive RAG — 30 lines",
          code: { language: "python", snippet: "from sentence_transformers import SentenceTransformer\nimport numpy as np\nfrom openai import OpenAI\n\nmodel = SentenceTransformer('BAAI/bge-small-en-v1.5')\nclient = OpenAI()\n\nchunks = open('docs.md').read().split('\\n\\n')\nE = model.encode(chunks, normalize_embeddings=True)\n\ndef retrieve(q, k=4):\n    qv = model.encode([q], normalize_embeddings=True)\n    sims = E @ qv.T\n    return [chunks[i] for i in np.argsort(-sims.flatten())[:k]]\n\nq = 'What is RAG?'\nctx = '\\n\\n'.join(retrieve(q))\nprompt = f'Use this context to answer.\\n\\n{ctx}\\n\\nQuestion: {q}'\nresp = client.chat.completions.create(\n    model='gpt-4o-mini', messages=[{'role':'user','content':prompt}]\n)\nprint(resp.choices[0].message.content)" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d57-p4", day: 57, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Always pass the source back to the user",
        copy: "Bad RAG returns an answer. Good RAG returns an answer + the chunks used.\n\nWhy:\n- User can verify\n- You can debug bad answers (see what was retrieved)\n- Builds trust — 'cite your sources'\n- Reveals retrieval failures the LLM hides\n\nIn the prompt, ask the model to quote the relevant snippets. In the UI, show retrieved chunks as collapsible 'sources'. This single feature ships more confidence than any model upgrade.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "tip", headline: "Always show sources",
          bullets: ["Builds trust", "Catches retrieval bugs", "User verification", "Cite quoted snippets"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d57-p5", day: 57, postNumber: 5, slot: "night", type: "recap", pillar: "rag",
        title: "Day 57 — RAG, framed honestly",
        copy: "Day 57 done.\n\n- RAG = retrieve + augment + generate\n- 5 hard problems, not 1\n- 30-line naive RAG\n- Always show sources\n\nTomorrow (Day 58): chunking. The deceptively hard step that makes or breaks every RAG app.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "quote", headline: "RAG isn't embeddings + LLM.", subhead: "It's chunking, retrieval, evaluation, the rest.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 58 */
  {
    day: 58, theme: "Chunking — the deceptively hard step", pillar: "rag",
    posts: [
      { id: "d58-p1", day: 58, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "Bad chunks = bad RAG, no exceptions",
        copy: "If your chunks split mid-sentence or fragment a thought, no embedding model can rescue it.\n\nThe goal: each chunk should be self-contained on its topic. Retrieving it should give the LLM enough context to answer without other chunks.\n\nThree common chunkers:\n- Fixed-size — naive, breaks sentences. Avoid.\n- Recursive (split by ¶, then sentence, then word) — LangChain default.\n- Semantic (split where embedding similarity drops) — newer, sometimes better.\n\nYour first improvement on a RAG that's misbehaving is almost always better chunking.",
        hashtags: [...CORE, "#Chunking"],
        image: { template: "stat", headline: "Bad chunks = bad RAG", subhead: "Embeddings can't fix split sentences.", stat: { number: "1", label: "biggest lever in RAG quality" }, accent: "cyan", aiPrompt: "Stat poster with broken-text glyph, cyan, 1:1", canvaBrief: "Cyan-violet gradient. Big 1."
        }
      },
      { id: "d58-p2", day: 58, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "Chunk size & overlap — the two knobs",
        copy: "Two parameters dominate:\n\n- Chunk size — too small = no context; too big = retrieval gets noisy. 256-512 tokens is the sweet spot for most docs.\n- Overlap — let consecutive chunks share 10-20% of tokens. Captures context that crosses boundaries.\n\nFor structured content (tables, code, headings), chunk by structure — keep a section together. For prose, recursive character splitter on sentence boundaries.\n\nLog the average chunk length. If most chunks are tiny or huge, your splitter isn't tuned for the content.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "list", headline: "Chunking knobs",
          bullets: ["Size: 256-512 tokens", "Overlap: 10-20%", "Structured → split by structure", "Log size distribution"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d58-p3", day: 58, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "RecursiveCharacterTextSplitter — the safe default",
        copy: "LangChain's RecursiveCharacterTextSplitter tries paragraph splits, then sentence, then word, then char. Almost never breaks mid-sentence. Tune chunk_size and chunk_overlap to your docs.",
        hashtags: [...CORE, "#LangChain"],
        image: { template: "code", headline: "Recursive splitter — safe default",
          code: { language: "python", snippet: "from langchain.text_splitter import RecursiveCharacterTextSplitter\n\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=400,\n    chunk_overlap=80,\n    separators=['\\n\\n', '\\n', '. ', ' ', ''],\n)\nchunks = splitter.split_text(open('docs.md').read())\nprint(f'{len(chunks)} chunks, mean {sum(len(c) for c in chunks)/len(chunks):.0f} chars')" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d58-p4", day: 58, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Add metadata to every chunk",
        copy: "A chunk on its own is just text. With metadata, it's filterable, traceable, and rerankable.\n\nAttach:\n- Source URL or filename\n- Section / heading\n- Date / version\n- Document type\n\nNow you can filter retrieval to one product family, one date range, or one section. You can show the user exactly where each answer came from. You can debug 'why was this retrieved' instantly.\n\nMetadata is free; chunks without it are wasted.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "tip", headline: "Metadata on every chunk",
          bullets: ["Source URL", "Section / heading", "Date / version", "Doc type"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d58-p5", day: 58, postNumber: 5, slot: "night", type: "recap", pillar: "rag",
        title: "Day 58 — chunking is half the battle",
        copy: "Day 58 done.\n\n- Bad chunks ruin RAG\n- 256-512 tokens, 10-20% overlap\n- Recursive splitter as default\n- Metadata everywhere\n\nTomorrow (Day 59): embedding choice. Why your embedding model matters more than your LLM in many RAG apps.",
        hashtags: [...CORE, "#Chunking"],
        image: { template: "quote", headline: "Chunk well. Or fail loudly.", subhead: "Most RAG bugs trace to step 1.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 59 */
  {
    day: 59, theme: "Embedding choice — the silent quality lever", pillar: "rag",
    posts: [
      { id: "d59-p1", day: 59, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "Your embedding model decides what 'similar' means",
        copy: "Cosine similarity returns a number. The embedding model decided what counts as 'close'.\n\nA general-purpose model (text-embedding-3-small) thinks 'How do I refund?' and 'What's your refund policy?' are similar.\n\nA bad model might rank 'How do I refund?' close to 'How do I sign up?' because both start with 'How do I'.\n\nFor your domain, evaluate. Pick a 'small' good general model + a domain test set. Measure recall@5 against ground truth queries. Switch models if you can do better.",
        hashtags: [...CORE, "#Embeddings"],
        image: { template: "stat", headline: "embedding ≫ LLM (in RAG)", subhead: "Bad embeddings retrieve garbage. The LLM can't fix it.", stat: { number: "1", label: "model that decides quality of every retrieval" }, accent: "cyan", aiPrompt: "Stat poster, cyan, 1:1", canvaBrief: "Cyan-violet gradient. Big 1."
        }
      },
      { id: "d59-p2", day: 59, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "MTEB — the embedding benchmark + its caveats",
        copy: "MTEB (Massive Text Embedding Benchmark) ranks embedding models across retrieval, classification, clustering tasks.\n\nUse it to shortlist. Top of the leaderboard in 2026 includes BAAI/bge-m3, voyage-3, jina-embeddings-v3, OpenAI text-embedding-3-large.\n\nCaveats:\n- Mostly English. Multilingual is a separate ranking.\n- Domain-specific tasks (medical, legal, code) may not match average rankings.\n- Bigger isn't always better — small models often work fine on specific tasks.\n\nMTEB shortlists. Your held-out evaluation decides.",
        hashtags: [...CORE, "#MTEB"],
        image: { template: "list", headline: "Picking embeddings — MTEB and beyond",
          bullets: ["MTEB shortlists", "But evaluate on YOUR data", "Multilingual = separate ranking", "Domain models often beat general"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d59-p3", day: 59, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "Build a tiny eval set in 10 minutes",
        copy: "Hand-curate 30 (query, expected_chunk_id) pairs. Then for each, embed the query, retrieve top-5, check if expected chunk is in there.\n\nrecall@5 = number of hits / total queries.\n\nThis 30-minute exercise tells you more than 100 papers. Compare 3 embedding models on the same set. Pick the winner.",
        hashtags: [...CORE, "#RAGEval"],
        image: { template: "code", headline: "recall@k — minimum eval",
          code: { language: "python", snippet: "import numpy as np\n\ndef recall_at_k(model, eval_pairs, chunks, k=5):\n    chunk_vecs = model.encode(chunks, normalize_embeddings=True)\n    hits = 0\n    for q, expected_id in eval_pairs:\n        qv = model.encode([q], normalize_embeddings=True)\n        top = np.argsort(-(chunk_vecs @ qv.T).flatten())[:k]\n        if expected_id in top:\n            hits += 1\n    return hits / len(eval_pairs)" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d59-p4", day: 59, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Don't change embedding models without re-indexing",
        copy: "Embeddings from one model aren't comparable to another. If you switch from bge-small to OpenAI text-embedding-3-large, every existing vector in your store is invalid.\n\nRules:\n1. Pin the embedding model + version in your config.\n2. Re-index everything when you change models.\n3. Tag each vector with the model+version it came from. Refuse cross-version retrieval.\n\nTeams that skip this end up with mysterious quality drops. Save the headache.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "tip", headline: "Pin & re-index when changing models",
          bullets: ["Pin model + version", "Re-index on change", "Tag vectors with version", "Refuse cross-version retrieval"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d59-p5", day: 59, postNumber: 5, slot: "night", type: "recap", pillar: "rag",
        title: "Day 59 — embeddings define quality",
        copy: "Day 59 done.\n\n- Embedding choice = retrieval quality\n- MTEB shortlists; eval decides\n- 30-pair recall@k eval\n- Pin and re-index on change\n\nTomorrow (Day 60): vector databases — what they actually do, and which to use.",
        hashtags: [...CORE, "#Embeddings"],
        image: { template: "quote", headline: "The embedding decides what 'similar' means.", subhead: "Choose carefully.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 60 */
  {
    day: 60, theme: "Vector databases — pick by load, not hype", pillar: "rag",
    posts: [
      { id: "d60-p1", day: 60, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "A vector DB is an ANN index + storage + filters",
        copy: "A vector database does three things:\n\n1. ANN — approximate nearest neighbour search (HNSW, IVF). Sub-millisecond k-NN over millions of vectors.\n2. Storage — persist vectors + metadata, survive restarts.\n3. Filters — combine vector similarity with metadata predicates ('tag = beta AND date > 2025').\n\nUnder ~100k vectors, you don't need a vector DB — sklearn or numpy is fine. Above 1M, you do. Between is the gray zone where in-memory FAISS or sqlite-vss often suffices.",
        hashtags: [...CORE, "#VectorDatabase"],
        image: { template: "list", headline: "Vector DB does 3 things",
          bullets: ["ANN — fast k-NN", "Storage — persist + restart", "Filters — vector + metadata", "Skip it for <100k vectors"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d60-p2", day: 60, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "Pick a vector DB by load + ops fit",
        copy: "Top picks in 2026:\n\n- Qdrant — Rust, single binary, easy ops, great filters. My default for self-hosted.\n- Weaviate — clean GraphQL/REST, good ergonomics, multi-tenant.\n- pgvector — PostgreSQL extension. If you already have Postgres, start here.\n- Pinecone — managed, fastest to ship; pay-as-you-go cost.\n- LanceDB — embedded, file-based, no server.\n\nDon't pick by Twitter hype. Pick by: existing infra, query latency target, filter complexity, ops budget.",
        hashtags: [...CORE, "#Qdrant"],
        image: { template: "list", headline: "5 vector DBs — when to pick what",
          bullets: ["Qdrant — self-host default", "Weaviate — multi-tenant", "pgvector — already on Postgres", "Pinecone — managed, fast", "LanceDB — embedded / local"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 5 rows."
        }
      },
      { id: "d60-p3", day: 60, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "Qdrant in 15 lines",
        copy: "Spin up qdrant via Docker. Insert vectors with payload (metadata). Search with optional filters. The API is the same shape across self-host or cloud.",
        hashtags: [...CORE, "#Qdrant"],
        image: { template: "code", headline: "Qdrant — insert + search",
          code: { language: "python", snippet: "from qdrant_client import QdrantClient\nfrom qdrant_client.models import Distance, VectorParams, PointStruct\n\nq = QdrantClient(host='localhost', port=6333)\nq.recreate_collection('docs', vectors_config=VectorParams(size=384, distance=Distance.COSINE))\n\npoints = [PointStruct(id=i, vector=v.tolist(), payload={'source': src}) for i, (v, src) in enumerate(zip(vecs, sources))]\nq.upsert('docs', points)\n\nhits = q.search('docs', query_vector=qvec.tolist(), limit=5,\n                query_filter={'must': [{'key': 'source', 'match': {'value': 'docs.md'}}]})\nfor h in hits: print(h.score, h.payload)" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d60-p4", day: 60, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Profile p99 latency, not average",
        copy: "Average retrieval latency is meaningless. Tail latency (p95, p99) is what your users feel.\n\nTune for p99 < 100ms on your cluster size. If you need more, options:\n- Smaller embeddings (384 vs 1536 dim)\n- Quantisation (PQ in Qdrant, scalar in pgvector)\n- Pre-filtering by metadata before ANN\n- Bigger HNSW M / efConstruction\n\nBenchmark with realistic load patterns, not 1 query at a time.",
        hashtags: [...CORE, "#Performance"],
        image: { template: "tip", headline: "Tune for p99, not avg",
          bullets: ["p99 < 100ms target", "Smaller dims help", "Quantisation cheap win", "Filter before ANN"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d60-p5", day: 60, postNumber: 5, slot: "night", type: "recap", pillar: "rag",
        title: "Day 60 — vector DBs without hype",
        copy: "Day 60 done.\n\n- Vector DB = ANN + storage + filters\n- Pick by load + ops, not Twitter\n- 15-line Qdrant example\n- Profile p99\n\nTomorrow (Day 61): top-k retrieval and the parameters that matter.",
        hashtags: [...CORE, "#VectorDatabase"],
        image: { template: "quote", headline: "Pick the database by load.", subhead: "Hype isn't a deployment criterion.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 61 */
  {
    day: 61, theme: "Top-k retrieval — the parameters that matter", pillar: "rag",
    posts: [
      { id: "d61-p1", day: 61, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "k = how much context the LLM gets",
        copy: "Top-k = how many chunks you retrieve and stuff into the prompt.\n\n- k=1 — minimal context, brittle\n- k=3-5 — typical, balances context with noise\n- k=10+ — risk of polluting prompt with irrelevant chunks\n\nLLMs don't read perfectly through long context (look up 'lost in the middle'). More chunks isn't always better. The sweet spot depends on chunk size and document density.\n\nStart at k=4. Tune up if recall is bad, down if answers get noisy.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "stat", headline: "k = 4", subhead: "Starting point. Tune from your eval.", stat: { number: "4", label: "default top-k for most RAG systems" }, accent: "cyan", aiPrompt: "Stat poster, cyan, 1:1", canvaBrief: "Cyan-violet gradient. Big 4."
        }
      },
      { id: "d61-p2", day: 61, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "Cosine vs dot vs Euclidean — pick by training",
        copy: "Most embedding models are trained with cosine similarity. Use that.\n\nIf the model docs say 'inner product' or 'dot product', use dot. Match the metric the model was trained with.\n\nEuclidean (L2) is rare for text but common for images. If your DB lets you choose, ask 'what was the model trained with?' first.\n\nUsing the wrong metric silently degrades retrieval. The model still returns ranked results — just from a slightly distorted similarity space.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "list", headline: "Distance metric — pick by training",
          bullets: ["Cosine — most text models", "Dot — when model says so", "L2 — images, sometimes", "Match what model trained on"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d61-p3", day: 61, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "Filter before ANN — speed + relevance win",
        copy: "If you know the user is asking about 'product X' or 'docs from 2025', filter on metadata BEFORE the ANN. Smaller candidate set, faster search, and irrelevant docs can't pollute results.",
        hashtags: [...CORE, "#Qdrant"],
        image: { template: "code", headline: "Pre-filter then retrieve",
          code: { language: "python", snippet: "from qdrant_client.models import Filter, FieldCondition, MatchValue\n\nfilt = Filter(must=[\n    FieldCondition(key='product', match=MatchValue(value='wellora')),\n    FieldCondition(key='year', match=MatchValue(value=2026)),\n])\nhits = client.search(\n    'docs', query_vector=qv, limit=4, query_filter=filt\n)" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d61-p4", day: 61, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Hybrid search beats pure semantic",
        copy: "Pure vector search misses exact-keyword matches (product codes, names, IDs). BM25 catches those but misses semantic similarity.\n\nHybrid search runs both, normalises scores, and combines. Reciprocal Rank Fusion (RRF) is the simplest blend that works.\n\nQdrant, Weaviate, OpenSearch all support hybrid native. For pgvector + Postgres, run BM25 (full-text search) and vector queries in parallel and RRF in code.\n\nTypically a 5-15% relevance lift over either alone. Free win.",
        hashtags: [...CORE, "#HybridSearch"],
        image: { template: "tip", headline: "Hybrid (vector + BM25)",
          bullets: ["Catches exact matches AND semantic", "RRF to combine ranks", "Native in Qdrant / Weaviate", "5-15% relevance lift"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d61-p5", day: 61, postNumber: 5, slot: "night", type: "recap", pillar: "rag",
        title: "Day 61 — retrieval, tuned",
        copy: "Day 61 done.\n\n- Start at k=4\n- Match metric to model\n- Pre-filter with metadata\n- Hybrid > vector alone\n\nTomorrow (Day 62): augmenting prompts with retrieved context — the part that often surprises engineers.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "quote", headline: "Filter, then search.", subhead: "Cheaper. Cleaner. Faster.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 62 */
  {
    day: 62, theme: "Augmenting the prompt — the most overlooked step", pillar: "rag",
    posts: [
      { id: "d62-p1", day: 62, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "How you stuff context into the prompt matters",
        copy: "Most RAG tutorials write:\n\nf'Use this context.\\n\\n{context}\\n\\nQuestion: {q}'\n\nThat's a starting point, not production. Better prompts:\n- Tell the model when there's no relevant info ('say I don't know')\n- Number chunks and ask for citations\n- Constrain answer length and format\n- Set a system role for tone\n\nThe prompt is half the system. A great retrieval with a sloppy prompt still gives meh answers.",
        hashtags: [...CORE, "#PromptEngineering"],
        image: { template: "stat", headline: "prompt > retrieval", subhead: "in many production failures", stat: { number: "50%", label: "of 'RAG quality' bugs are prompt bugs" }, accent: "cyan", aiPrompt: "Stat poster, cyan, 1:1", canvaBrief: "Cyan-violet gradient. Big 50%."
        }
      },
      { id: "d62-p2", day: 62, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "A robust RAG prompt template",
        copy: "Mine, distilled from many tries:\n\nSystem: 'You are an expert assistant. Answer using only the context. If context is insufficient, say I don't know.'\n\nUser: '<context>\\n[1] {chunk1}\\n[2] {chunk2}\\n...\\n</context>\\n\\nQuestion: {q}\\n\\nRules:\\n- Cite sources as [1], [2]\\n- Quote relevant snippet for each cite\\n- If context insufficient, say so'\n\nThat's it. Three rules, one structure, every chunk numbered. The model now knows what to do.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "list", headline: "RAG prompt — 5 ingredients",
          bullets: ["System role / tone", "Context block (numbered)", "Question", "Citation rule", "'I don't know' escape"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 5 rows."
        }
      },
      { id: "d62-p3", day: 62, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "RAG prompt builder — the function I keep around",
        copy: "Same shape every time. Numbered context, system role, instructions block. Take this; tweak the system prompt to your domain; ship.",
        hashtags: [...CORE, "#PromptEngineering"],
        image: { template: "code", headline: "Build a RAG prompt",
          code: { language: "python", snippet: "def build_rag_prompt(question, chunks):\n    ctx = '\\n\\n'.join(f'[{i+1}] {c}' for i, c in enumerate(chunks))\n    system = ('You answer using only the provided context. '\n              'If the context is insufficient, say \"I don\\'t know\".')\n    user = (\n        f'<context>\\n{ctx}\\n</context>\\n\\n'\n        f'Question: {question}\\n\\n'\n        'Rules:\\n- Cite sources as [n]\\n- Quote a phrase per citation\\n'\n        '- Be concise.'\n    )\n    return [\n        {'role': 'system', 'content': system},\n        {'role': 'user', 'content': user},\n    ]" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d62-p4", day: 62, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Lower temperature for RAG — usually 0",
        copy: "RAG is a knowledge task. You want consistent, grounded answers. Set temperature=0 (or close).\n\nHigher temperatures = more creative phrasing but also more hallucinations and inconsistencies. For 'answer this question from these docs', creativity is a bug, not a feature.\n\nFor agent-style flows that need exploration, raise temperature. For Q&A, keep it cold.",
        hashtags: [...CORE, "#PromptEngineering"],
        image: { template: "tip", headline: "RAG: temperature = 0",
          bullets: ["Knowledge task = deterministic", "Higher T = more hallucinations", "Agents may need higher", "Q&A: cold"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d62-p5", day: 62, postNumber: 5, slot: "night", type: "recap", pillar: "rag",
        title: "Day 62 — the prompt is half the system",
        copy: "Day 62 done.\n\n- Stuffing matters\n- Numbered context, citation rule\n- Reusable prompt builder\n- Temperature = 0 for Q&A\n\nTomorrow (Day 63): evaluating RAG. Without it, you're shipping vibes. Then we close week 9.",
        hashtags: [...CORE, "#RAG"],
        image: { template: "quote", headline: "Great retrieval + bad prompt = mediocre answers.", subhead: "Both halves matter.", accent: "cyan", aiPrompt: "Pastel cyan quote, 1:1", canvaBrief: "Pastel cyan quote card." }
      },
    ]
  },
  /* DAY 63 */
  {
    day: 63, theme: "Evaluating RAG + week 9 wrap", pillar: "rag",
    posts: [
      { id: "d63-p1", day: 63, postNumber: 1, slot: "morning", type: "concept", pillar: "rag",
        title: "Evaluate retrieval + generation separately",
        copy: "RAG quality has two stages. Eval them independently or you'll attribute bugs incorrectly.\n\n1. Retrieval — given a query, did we fetch the right chunks?\n   - Metrics: recall@k, MRR, hit@k\n   - Needs (query, expected_chunk) pairs\n\n2. Generation — given the chunks, did the LLM answer well?\n   - Metrics: faithfulness (does the answer use the context?), correctness, citation accuracy\n   - Needs (query, answer, context) triples + a judge\n\nFix retrieval first. A great LLM can't recover from bad retrieval.",
        hashtags: [...CORE, "#RAGEval"],
        image: { template: "compare", headline: "Eval retrieval AND generation",
          compare: { leftLabel: "Retrieval", leftItems: ["recall@k", "MRR / hit@k", "(query, expected_id)", "Fix this first"], rightLabel: "Generation", rightItems: ["Faithfulness", "Correctness", "(query, answer, context)", "LLM-as-judge"] },
          accent: "cyan", aiPrompt: "Compare poster, 1:1", canvaBrief: "Split. Grey vs cyan."
        }
      },
      { id: "d63-p2", day: 63, postNumber: 2, slot: "midday", type: "deepdive", pillar: "rag",
        title: "Ragas / TruLens — RAG eval frameworks",
        copy: "Two libraries automate the boring parts:\n\n- Ragas — focused on RAG specifically. Faithfulness, answer correctness, context relevance. Uses LLMs as judges.\n- TruLens — broader LLM observability + RAG eval. Trace and grade in one.\n\nBoth need:\n1. Eval queries\n2. Ground-truth answers (or ground-truth contexts)\n3. An LLM as judge (GPT-4o or Claude is typical)\n\nStart with 30 hand-curated queries. Run ragas. The numbers tell you which step (retrieval, prompt, model) to fix.",
        hashtags: [...CORE, "#Ragas"],
        image: { template: "list", headline: "RAG eval frameworks",
          bullets: ["Ragas — focused, fast", "TruLens — broader observability", "Need 30+ eval queries", "LLM-as-judge is fine"],
          accent: "cyan", aiPrompt: "List card, cyan, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d63-p3", day: 63, postNumber: 3, slot: "afternoon", type: "code", pillar: "rag",
        title: "ragas — minimum eval setup",
        copy: "Build a Dataset, run ragas evaluate(), get back faithfulness + answer_correctness + context_recall numbers per query.\n\nIterate on chunking / retrieval / prompts. Keep ragas as your CI gate. Quality regressions show up before users see them.",
        hashtags: [...CORE, "#Ragas"],
        image: { template: "code", headline: "Minimum ragas eval",
          code: { language: "python", snippet: "from ragas import evaluate\nfrom ragas.metrics import faithfulness, answer_correctness, context_recall\nfrom datasets import Dataset\n\nds = Dataset.from_dict({\n    'question': questions,\n    'answer': answers,\n    'contexts': contexts,            # list[list[str]]\n    'ground_truth': ground_truths,\n})\nresult = evaluate(ds, metrics=[faithfulness, answer_correctness, context_recall])\nprint(result)" },
          accent: "cyan", aiPrompt: "Dark code card, cyan, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d63-p4", day: 63, postNumber: 4, slot: "evening", type: "tip", pillar: "rag",
        title: "Track eval scores per release like CI tests",
        copy: "Treat eval scores as commit-by-commit metrics, not one-off reports.\n\n- Run ragas on every PR that touches RAG code\n- Fail CI if faithfulness drops > 5%\n- Plot trends in a dashboard\n\nA new chunking strategy that improves average looks great until you see p20 dropped. Distribution > average. Ship like a real engineering team — measure regressions before users do.",
        hashtags: [...CORE, "#MLOps"],
        image: { template: "tip", headline: "Eval as CI",
          bullets: ["Run on every PR", "Fail on >5% drop", "Track distribution, not avg", "Block bad merges"],
          accent: "cyan", aiPrompt: "Pro tip card, cyan, 1:1", canvaBrief: "Cyan header. PRO TIP."
        }
      },
      { id: "d63-p5", day: 63, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Week 9 done — RAG fundamentals",
        copy: "Week 9 done. 63 days, 315 posts in.\n\nThis week:\n- Why RAG\n- Chunking honestly\n- Embedding choice\n- Vector DBs without hype\n- Top-k tuning + hybrid\n- Prompt augmentation\n- Eval as CI\n\nNext week: production RAG. Reranking, query rewriting, agentic RAG, GraphRAG, the hard ones.",
        hashtags: [...CORE, "#90DaysOfAI"],
        image: { template: "quote", headline: "9 weeks down. 4 to go.", subhead: "Next: production RAG.", accent: "cyan", aiPrompt: "Pastel cyan quote with 63/90 progress, 1:1", canvaBrief: "Pastel cyan quote with 63/90 cyan bar." }
      },
    ]
  },
];
