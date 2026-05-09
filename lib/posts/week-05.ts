import type { DayPlan } from "../types";

const CORE = ["#NumPy", "#Pandas", "#DataScience", "#Python", "#100DaysOfCode"];

export const week05: DayPlan[] = [
  /* DAY 29 */
  {
    day: 29, theme: "NumPy — vectorise everything", pillar: "ai-ml",
    posts: [
      {
        id: "d29-p1", day: 29, postNumber: 1, slot: "morning", type: "concept", pillar: "ai-ml",
        title: "NumPy is C with a Python skin",
        copy: "Day 29. Week five begins, and we leave pure DSA for the data stack — the libraries that turn Python from 'a great teaching language' into the dominant language of machine learning.\n\nLet's start with NumPy.\n\nLoops in pure Python are slow. Even a simple sum over a million numbers takes hundreds of milliseconds. The same operation in C takes microseconds. The gap is roughly 100x.\n\nNumPy closes the gap. Under the hood, an ndarray is a contiguous block of typed memory (32-bit floats, 64-bit ints, etc.) plus a set of C kernels that operate on that memory. When you write 'a + b' on two NumPy arrays, NumPy doesn't run a Python loop — it dispatches to a C function that adds them element-by-element using SIMD instructions where possible.\n\nThe result — you write one line of Python, you get C-speed execution.\n\nThis is why every modern ML framework — PyTorch, JAX, TensorFlow — is built on the same ndarray abstraction. PyTorch tensors are essentially NumPy arrays with GPU support and automatic differentiation. JAX arrays are NumPy arrays with JIT compilation and GPU/TPU support. The shape API is the same; the underlying numerical operations are the same; only the execution backend differs.\n\nWhich means — once you internalise NumPy, you've internalised 80% of how to read PyTorch, JAX, or TensorFlow code. Same patterns. Same vocabulary. Same idioms.\n\nThe rule for the next 60 days — vectorise or perish. If you find yourself writing a Python for-loop over a NumPy array, stop. There's almost always a vectorised alternative that's 100x faster.\n\nWhen NumPy can't vectorise (rare, usually involves complex stateful logic), use numba or cython to JIT-compile the loop. Last resort, write the inner loop in C++ and bind via pybind11. Pure Python loops over numerical data are something to avoid.",
        hashtags: [...CORE, "#NumPy"],
        image: {
          template: "stat", headline: "100x", subhead: "NumPy vectorised vs Python loop", stat: { number: "100x", label: "speedup vs pure-Python loops on big arrays" }, accent: "violet",
          aiPrompt: "Stat poster with grid-array glyph, violet-cyan, 1:1",
          canvaBrief: "Violet→cyan gradient. Big 100x. Subhead. Array grid faded.",
        },
      },
      {
        id: "d29-p2", day: 29, postNumber: 2, slot: "midday", type: "deepdive", pillar: "ai-ml",
        title: "5 NumPy ops that replace 50 lines of loops",
        copy: "Five NumPy operations that, between them, replace 90% of the loops you'd be tempted to write. Memorise them. Reach for them by reflex.\n\nOne — np.where(cond, a, b). Vectorised if/else. Returns a new array where each element is from a if cond is true at that position, else from b. Replaces:\n\nresult = []\nfor x in arr:\n    if x > 0: result.append(x)\n    else: result.append(0)\n\nWith:\n\nresult = np.where(arr > 0, arr, 0)\n\nOne line. Runs in C.\n\nTwo — np.clip(x, lo, hi). Bound values to a range. Anything below lo becomes lo; anything above hi becomes hi. Used in normalisation, gradient clipping, range enforcement.\n\nThree — np.argsort(arr). Returns the indices that would sort the array. Useful for ranking, top-k selection, picking the k largest by some score (use np.argsort(-scores)[:k]).\n\nFour — boolean indexing. arr[mask] selects only the elements where mask is true. Replaces filter loops:\n\nresult = arr[arr > threshold]\n\nFive — reshape. arr.reshape(-1, n) flattens into n columns. arr.reshape(rows, -1) gives the flexibility to compute the other dim. Powerful for batching, reshaping inputs, undoing flattens.\n\nThe broader principle — anywhere your loop is doing 'apply a transformation to every element', NumPy probably has the vectorised version. Most for-loops over a numpy array can be eliminated with one of these primitives.\n\nThe productivity payoff is huge. Code that took 30 lines and ran in 5 seconds becomes 3 lines that run in 50 milliseconds. Both faster to write and faster to execute.",
        hashtags: [...CORE, "#NumPy"],
        image: {
          template: "list", headline: "5 NumPy ops that kill loops",
          bullets: ["np.where(cond, a, b)", "np.clip(x, lo, hi)", "np.argsort(a)", "a[mask] — bool indexing", "a.reshape(-1, n)"],
          accent: "violet",
          aiPrompt: "List poster, violet, 1:1",
          canvaBrief: "White grid. 5 numbered rows.",
        },
      },
      {
        id: "d29-p3", day: 29, postNumber: 3, slot: "afternoon", type: "code", pillar: "ai-ml",
        title: "Pure Python vs NumPy — same problem, two speeds",
        copy: "A concrete benchmark. We compute the L2 (Euclidean) distance between every pair of vectors in two batches — A is shape (n, d), B is shape (m, d). The result should be an (n, m) matrix where output[i][j] is the distance between A[i] and B[j].\n\nTwo implementations.\n\nPure Python — a triple nested loop. For each row of A, for each row of B, compute the distance. Each distance involves another inner loop over the d features. Total work — O(n * m * d) Python operations. For n=m=1000 and d=128, that's 128 million Python ops. Multiple seconds.\n\nNumPy — one broadcast and one norm. A[:, None, :] has shape (n, 1, d). B[None, :, :] has shape (1, m, d). The subtraction broadcasts to shape (n, m, d). np.linalg.norm with axis=-1 collapses the last dim, giving (n, m).\n\nOne line. Same answer. ~100x faster.\n\nWhy the speedup? The NumPy version drops into a C kernel that processes all 128 million underlying float operations using SIMD instructions and tight memory access patterns. Pure Python's interpreter overhead — type checks, object creation, attribute access — is gone.\n\nThe broadcast pattern (A[:, None, :] - B[None, :, :]) is itself memory-efficient. NumPy doesn't materialise a full (n, m, d) tensor; it iterates with virtual strides. We'll cover broadcasting tomorrow in detail.\n\nThis is the canonical NumPy upgrade. The pattern is — when your computation involves many parallel operations on arrays, find the vectorised version. The savings are dramatic.\n\nFor large-scale similarity computations, this exact pattern (reshape + subtract + norm or reshape + matmul) is the foundation of vector search, RAG retrieval, recommendation systems. Now you've seen it in 4 lines.",
        hashtags: [...CORE, "#NumPy"],
        image: {
          template: "code", headline: "L2 distance: loops vs NumPy",
          code: { language: "python", snippet: "import numpy as np\n\n# slow — pure Python\ndef pdist_loop(A, B):\n    out = [[sum((a-b)**2 for a, b in zip(x, y))**0.5\n            for y in B] for x in A]\n    return out\n\n# fast — NumPy broadcast\ndef pdist_np(A, B):\n    return np.linalg.norm(A[:, None, :] - B[None, :, :], axis=-1)" },
          accent: "violet",
          aiPrompt: "Dark code card, violet, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d29-p4", day: 29, postNumber: 4, slot: "evening", type: "tip", pillar: "ai-ml",
        title: "If you're appending to a NumPy array in a loop, stop",
        copy: "There's a NumPy anti-pattern I see all the time, often in tutorials, occasionally in production code. It's the silent O(n²) bug.\n\nresult = np.array([])\nfor x in inputs:\n    val = compute(x)\n    result = np.append(result, val)\n\nLooks reasonable. Is catastrophic.\n\nnp.append doesn't append in place. It allocates a new array, copies the old contents over, adds the new element, and returns the new array. Each call is O(n) where n is the current array's length. Total work for n appends — n * (1 + 2 + ... + n) / 2 ≈ O(n²).\n\nFor n = 100000, that's 10^10 operations. Minutes of waiting for what should be milliseconds.\n\nThree fixes, in order of preference.\n\nOne — build a Python list with .append, then np.array(lst) at the end. List append is O(1) amortised. np.array() does one allocation and one copy. Total O(n).\n\nresult = []\nfor x in inputs:\n    result.append(compute(x))\nresult = np.array(result)\n\nTwo — pre-allocate the array if you know the final size. result = np.empty(n); result[i] = ...\n\nThree — use np.fromiter for generator-style construction. result = np.fromiter((compute(x) for x in inputs), dtype=float, count=n).\n\nFour — vectorise the whole thing if compute() can run on the entire array at once. Often the right answer.\n\nNever np.append in a loop. Build a list, materialise once. Or pre-allocate. Or vectorise. The 'innocent-looking' append is the perf bug that ships and embarrasses you in code review.",
        hashtags: [...CORE, "#PythonPerf"],
        image: {
          template: "tip", headline: "Don't np.append in a loop",
          bullets: ["Build list → np.array once", "Or pre-allocate np.empty(n)", "Or np.fromiter for lazy", "Append-in-loop is O(n²)"],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d29-p5", day: 29, postNumber: 5, slot: "night", type: "recap", pillar: "ai-ml",
        title: "Day 29 — vectorise everything",
        copy: "End of Day 29. Welcome to the data stack.\n\nWhat we covered.\n\nMorning, NumPy as 'C with a Python skin'. ndarray is contiguous typed memory plus C kernels. Vectorised operations run 100x faster than equivalent Python loops. Every modern ML framework (PyTorch, JAX, TensorFlow) is built on the same idea. Internalising NumPy unlocks them all.\n\nMidday, the five NumPy operations that replace 90% of loops. np.where, np.clip, np.argsort, boolean indexing, reshape. Each one a C-implemented vectorised primitive. Reach for them by reflex.\n\nAfternoon, the L2-distance benchmark — pure Python triple-nested-loop versus one-line NumPy broadcast. Same answer, 100x speedup. The broadcast pattern (A[:, None, :] - B[None, :, :]) is the foundation of vector search and most similarity computations.\n\nEvening, the silent O(n²) bug — np.append in a loop. Replace with list-then-array, or pre-allocation, or fromiter, or full vectorisation. Never append-in-loop. The bug ships and embarrasses you.\n\nA broader theme. The shift from pure Python to NumPy is a shift in mindset. Stop iterating; start operating on whole arrays. The vocabulary changes — from 'for each x' to 'for the whole batch'. Once internalised, you don't go back.\n\nTomorrow, Day 30, broadcasting in depth. The single mental model behind every PyTorch shape error you'll ever encounter. Pad with 1s, stretch on 1. Two rules; massive consequences.\n\nSee you in the morning.",
        hashtags: [...CORE, "#NumPy"],
        image: {
          template: "quote", headline: "Vectorise. Or wait.", subhead: "Loops in NumPy are a smell.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1",
          canvaBrief: "Pastel quote card.",
        },
      },
    ],
  },

  /* DAY 30 */
  {
    day: 30, theme: "Broadcasting — the deep-learning mental model", pillar: "ai-ml",
    posts: [
      {
        id: "d30-p1", day: 30, postNumber: 1, slot: "morning", type: "concept", pillar: "ai-ml",
        title: "Broadcasting in one rule",
        copy: "Day 30. Broadcasting is one of those topics where ten online tutorials each explain it differently. Most of them overcomplicate it. The actual rule is small.\n\nWhen you do an operation between two arrays of different shapes, NumPy aligns them by:\n\nOne — pad the shorter shape with leading 1s until both have the same number of dimensions.\n\nTwo — for each dimension, the sizes must either match, or one of them must be 1. Where one is 1, NumPy 'stretches' it to match the other.\n\nIf no consistent alignment exists, NumPy raises a ValueError.\n\nThat's it. Two rules. Pad and stretch.\n\nExamples:\n\n(3,) + (3,) → (3,). Same shape; element-wise.\n\n(3, 4) + (4,). Pad the (4,) to (1, 4). Stretch the leading 1 to 3. Both are now (3, 4). Element-wise.\n\n(3, 1) + (1, 4). No padding needed. Stretch the trailing 1 in the first to 4. Stretch the leading 1 in the second to 3. Both become (3, 4). Outer-product-style result.\n\n(2, 3, 4) + (4,). Pad (4,) to (1, 1, 4). Stretch to (2, 3, 4). Element-wise.\n\n(2, 3, 4) + (3, 1). Pad (3, 1) to (1, 3, 1). Stretch leading 1 to 2; trailing 1 to 4. Result (2, 3, 4).\n\nA case that fails — (3,) + (4,). Padding gives (3,) and (4,) — same dim count. Sizes 3 and 4 don't match and neither is 1. ValueError.\n\nThis rule explains every PyTorch shape error you'll encounter. The framework error message tells you the shapes; you walk through the rule mentally; you find which dim broke.\n\nMemorise the rule. It comes up in every NN forward pass.",
        hashtags: [...CORE, "#Broadcasting"],
        image: {
          template: "stat", headline: "1 rule", subhead: "Pad with 1s. Stretch on 1.", stat: { number: "1", label: "rule that explains all broadcasting" }, accent: "violet",
          aiPrompt: "Stat poster with array-shape grid, violet, 1:1",
          canvaBrief: "Violet gradient. Big 1.",
        },
      },
      {
        id: "d30-p2", day: 30, postNumber: 2, slot: "midday", type: "deepdive", pillar: "ai-ml",
        title: "Why broadcasting is a memory win, not just syntax",
        copy: "Broadcasting isn't just syntactic sugar. The implementation is genuinely efficient — it doesn't materialise the larger array.\n\nWhen you do (3,) + (3, 4), naive thinking says NumPy first creates a (3, 4) copy of the (3,), then does element-wise addition. That would double the memory.\n\nWhat NumPy actually does — it iterates with 'virtual strides'. The (3,) array's stride for the first dim is 0, meaning the iterator returns the same row for each i. The data is read from the small array, repeatedly, without copying. Memory cost — bounded by the larger array, not by the broadcast.\n\nThis matters enormously in deep learning. Every forward pass through a neural network broadcasts:\n\nBias addition. Weight matrix output is (batch, features). Bias is (features,). The bias broadcasts across the batch dimension. No (batch, features) copy of the bias is created.\n\nAttention masks. Mask is (seq_len, seq_len). Attention scores are (batch, heads, seq_len, seq_len). The mask broadcasts across batch and heads. One small mask serves billions of attention scores.\n\nLayer normalisation. The scale and shift parameters are (features,). They broadcast across batch and sequence dimensions in transformers.\n\nWithout broadcasting's memory efficiency, modern deep learning wouldn't fit on GPUs. Each operation would require allocating a giant fully-expanded version of every small array. Memory would be the bottleneck.\n\nReading neural-network code with broadcasting awareness — you can spot what's happening from the shape comments. # x: (B, T, D), # bias: (D,) — bias broadcasts across B and T. The architecture is comprehensible from the shapes alone.\n\nLearn to read shapes; you read modern ML.",
        hashtags: [...CORE, "#NumPy"],
        image: {
          template: "list", headline: "Broadcasting wins",
          bullets: ["No memory copy", "Virtual strides", "Same speed as plain ops", "Foundation of every NN"],
          accent: "violet",
          aiPrompt: "List poster, violet, 1:1",
          canvaBrief: "White grid. 4 rows.",
        },
      },
      {
        id: "d30-p3", day: 30, postNumber: 3, slot: "afternoon", type: "code", pillar: "ai-ml",
        title: "Cosine similarity as a one-liner",
        copy: "Cosine similarity between two batches of vectors is the foundation of vector search, RAG retrieval, recommendation systems, and a hundred other ML applications. Without broadcasting, it's a triple loop. With broadcasting and matrix multiplication, it's two lines.\n\nThe math — cosine_sim(a, b) = (a · b) / (||a|| * ||b||). The dot product divided by the product of magnitudes.\n\nFor batched cosine similarity — given A of shape (n, d) and B of shape (m, d), we want an (n, m) matrix where output[i][j] = cosine_sim(A[i], B[j]).\n\nThe trick — normalise each row of A and B to unit length first. After normalisation, cosine similarity equals dot product. The matrix of all pairwise dot products is exactly A @ B.T.\n\nLook at the snippet.\n\nLine 1 — normalise A. np.linalg.norm with axis=1 and keepdims=True gives a (n, 1) array of row norms. Dividing A by this broadcasts (each row scaled by its norm).\n\nLine 2 — same for B.\n\nLine 3 — A @ B.T. Matrix multiplication. Shape (n, d) times shape (d, m) gives (n, m). Each entry is the dot product of one row of A and one row of B. Because both are normalised, that dot product IS the cosine similarity.\n\nO(n*m*d) operations, all running in BLAS-optimised C code. On modern hardware with vectorisation, this is hundreds of times faster than the equivalent loop in Python.\n\nThis exact pattern is what runs inside every vector database when you query. Faiss, Qdrant, pgvector — all do batched matmul of normalised embeddings. Now you've seen it in 3 lines. Tomorrow we move to pandas.",
        hashtags: [...CORE, "#NumPy"],
        image: {
          template: "code", headline: "Cosine sim — broadcast + matmul",
          code: { language: "python", snippet: "import numpy as np\n\ndef cosine_sim(A, B):\n    A = A / np.linalg.norm(A, axis=1, keepdims=True)\n    B = B / np.linalg.norm(B, axis=1, keepdims=True)\n    return A @ B.T   # (n, m) similarity matrix\n\n# tiny test\nA = np.random.randn(4, 8)\nB = np.random.randn(6, 8)\nprint(cosine_sim(A, B).shape)   # (4, 6)" },
          accent: "violet",
          aiPrompt: "Dark code card, violet, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d30-p4", day: 30, postNumber: 4, slot: "evening", type: "tip", pillar: "ai-ml",
        title: "Always print .shape during shape bugs",
        copy: "Shape mismatches account for the majority of NumPy and PyTorch debugging time. The cure is a habit — comment shapes everywhere, print shapes liberally during bugs.\n\nMy rule, applied religiously in any non-trivial array code:\n\n# x: (B, T, D)\nx = self.norm(x)\n# logits: (B, T, V)\nlogits = self.head(x)\n\nThe comment annotates the expected shape after each operation. B is batch size; T is sequence length; D is hidden dim; V is vocab size. The single-letter convention is dense and readable once you know it.\n\nWhen something breaks, walk down the function and add print(name, shape) at every step until you find where reality diverges from the comment.\n\nfor x in batch:\n    print('input', x.shape)   # expected (B, T)\n    e = self.emb(x)\n    print('emb', e.shape)     # expected (B, T, D)\n    h = self.attn(e)\n    print('attn', h.shape)    # expected (B, T, D)\n    ...\n\nThe diagnostic is mechanical. Wherever the actual shape disagrees with the expected shape, that's the bug.\n\nBetter than print — assert. assert x.shape == (B, T, D), f'unexpected {x.shape}'. Now the failure happens at the source, not three layers later.\n\nFor production code, einops is your friend. einops.rearrange and einops.einsum let you express shape transformations declaratively. einops.rearrange(x, 'b t d -> b (t d)') flattens the last two dims. The named axes turn shape comments into checkable code.\n\nShape bugs are mostly NOT logic bugs. They're transcription errors between the math you intended and the code you wrote. Liberal printing closes the gap fast.",
        hashtags: [...CORE, "#PyTorch"],
        image: {
          template: "tip", headline: "Comment shapes inline",
          bullets: ["# x: (B, T, D)", "Print .shape during bugs", "Use einops for clarity", "Shape bugs ≠ logic bugs"],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d30-p5", day: 30, postNumber: 5, slot: "night", type: "recap", pillar: "ai-ml",
        title: "Day 30 — broadcasting clicks once, forever",
        copy: "End of Day 30. Two days into the data stack. Both heavy on principles, light on framework-specific minutiae.\n\nWhat we covered.\n\nMorning, the broadcasting rule. Two operations — pad the shorter shape with leading 1s, stretch any 1-dim along the matching axis. If no consistent alignment exists, ValueError. This single rule explains every shape error in NumPy and PyTorch.\n\nMidday, broadcasting as a memory win. Virtual strides instead of materialising copies. Foundation of how neural networks fit on GPUs at all. Bias addition, attention masks, layer norm — all rely on broadcasting.\n\nAfternoon, cosine similarity as a 3-line broadcast + matmul. The pattern that runs inside every vector database when you query. Now you've seen the full implementation in plain NumPy.\n\nEvening, the shape-bug debugging discipline. Comment shapes inline. Print .shape liberally during bugs. Use assert for production. einops for declarative reshaping. Shape bugs are usually transcription errors, not logic errors.\n\nA broader theme. NumPy's design choices — vectorisation, broadcasting, shape-aware operations — are the architectural choices that turned Python into the dominant ML language. Without them, models would be too slow and too memory-hungry to be practical.\n\nTomorrow, Day 31, pandas. The DataFrame as 'a dict of NumPy arrays plus an index'. The five methods that cover 80% of real data work. Plus the most common pandas perf bug — using iterrows when you should be vectorising.\n\nSee you in the morning.",
        hashtags: [...CORE, "#NumPy"],
        image: {
          template: "quote", headline: "Pad. Stretch. Compute.", subhead: "All of broadcasting in 3 words.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1",
          canvaBrief: "Pastel violet quote card.",
        },
      },
    ],
  },

  /* DAY 31 */
  {
    day: 31, theme: "Pandas — DataFrames you'll actually use", pillar: "ai-ml",
    posts: [
      {
        id: "d31-p1", day: 31, postNumber: 1, slot: "morning", type: "concept", pillar: "ai-ml",
        title: "A DataFrame is a dict of NumPy arrays",
        copy: "If you understand NumPy from yesterday, you almost understand pandas. A DataFrame is, mechanically, a dict mapping column-name to typed array, plus a row index.\n\nThat single sentence explains most of pandas' performance characteristics.\n\nReading a column — df['col'] — is O(1). It's a pointer to the underlying NumPy array. No copying.\n\nVectorised operations on columns — df['a'] + df['b'] — run in C, not Python. NumPy under the hood. Fast.\n\nReading a row by position — df.iloc[i] — has to construct a Series across all columns. Slower than reading a column. Still constant time per row, but multi-column access pays a per-row constructor cost.\n\nIterating row by row with df.iterrows() — disastrous. For each row, pandas constructs a new Series. The Python overhead per row dominates. On a million-row DataFrame, iterrows can take minutes for what vectorised code does in milliseconds.\n\nThe rule that drops out — operate on whole columns, not on individual rows. df['a'] + df['b'] (vectorised) instead of [a + b for a, b in zip(df['a'], df['b'])] (Python loop) instead of df.iterrows() with row.a + row.b (slowest).\n\nOther consequences of the dict-of-arrays model:\n\nColumn types are uniform. Each column is one NumPy dtype. Mixed types in a column become 'object' dtype, which loses NumPy's speed advantages.\n\nThe row index is a separate first-class structure. It's not just a counter — it can be a date, a string, a multi-level tuple. df.loc[index_value] uses the index for lookup; df.iloc[position] uses the integer position.\n\nMissing values exist via NaN (for floats) or pd.NA (newer, type-aware). Either way, special handling — most operations propagate missing values; some functions skip them.\n\nKnow the model. The performance and behaviour follow.",
        hashtags: [...CORE, "#Pandas"],
        image: {
          template: "stat", headline: "DataFrame ≈ {col → ndarray}", subhead: "Plus an index.", stat: { number: "1", label: "concept that explains pandas perf" }, accent: "violet",
          aiPrompt: "Stat poster with table-grid glyph, violet, 1:1",
          canvaBrief: "Violet gradient. Big 1.",
        },
      },
      {
        id: "d31-p2", day: 31, postNumber: 2, slot: "midday", type: "deepdive", pillar: "ai-ml",
        title: "5 pandas methods that cover 80% of work",
        copy: "Pandas has hundreds of methods. Most of your real work uses five. Learn these five at depth — their kwargs, their edge cases, their performance characteristics — and you can wrangle most CSV-shaped data without reaching for SQL.\n\nOne — read_csv / to_parquet. The I/O entrypoints. read_csv has 50+ kwargs; the ones you actually use are sep, header, names, dtype, parse_dates, na_values, usecols, nrows. For large datasets, parquet is the better default — typed, compressed, column-oriented, fast to read partial files.\n\nTwo — query. df.query('col > 5 and tag == a'). String-based filter syntax that reads naturally and is often faster than chained boolean indexing. Especially shines on multi-condition filters where the bracket syntax becomes unreadable.\n\nThree — groupby + agg. The split-apply-combine engine. df.groupby('city').agg({'sales': 'sum', 'orders': 'count'}). Modern syntax with named aggregations is even cleaner. Tomorrow we go deep on this.\n\nFour — merge. SQL-style joins. df1.merge(df2, on='id', how='left'). Four 'how' modes (left, right, inner, outer). Always specify how= explicitly — defaults can silently drop rows.\n\nFive — assign. Add or replace a column in a chain-friendly way. df.assign(total=lambda d: d.qty * d.price). Returns a new DataFrame, doesn't mutate, plays nicely with method chaining.\n\nThese five plus method chaining replace 80% of what you'd write in SQL or in a hand-rolled Python loop. Add a few utility methods (sort_values, reset_index, dropna, fillna) and you have most of the toolkit.\n\nGet fluent in these five. The rest of pandas is reachable from any of them.",
        hashtags: [...CORE, "#Pandas"],
        image: {
          template: "list", headline: "5 pandas methods that do 80%",
          bullets: ["read_csv / to_parquet", "df.query(...)", "df.groupby(...).agg(...)", "df.merge(...)", "df.assign(new=...)"],
          accent: "violet",
          aiPrompt: "List card, violet, 1:1",
          canvaBrief: "White grid, 5 rows.",
        },
      },
      {
        id: "d31-p3", day: 31, postNumber: 3, slot: "afternoon", type: "code", pillar: "ai-ml",
        title: "A real pandas pipeline in 8 lines",
        copy: "Method chaining is the secret to readable pandas. Each step is a clear transformation; the chain reads top-to-bottom like a recipe.\n\nLook at the snippet. Eight lines wrapped in parentheses (so we can break across lines naturally). Each line is one operation; the data flows from top to bottom.\n\nLine 1 — read_csv. Standard.\n\nLine 2 — query for paid orders. Filters in one line.\n\nLine 3 — assign a computed column. total = qty * price. The lambda receives the DataFrame at this point in the chain (post-filter), so we work with the filtered version.\n\nLine 4 — groupby customer_id.\n\nLine 5 — agg with named aggregations. orders is the count of id; revenue is the sum of total. Modern named-agg syntax — much cleaner than the older dict-of-dicts.\n\nLine 6 — reset_index moves customer_id from the index back to a column. Optional, but makes downstream code easier when you treat the result as a flat DataFrame.\n\nLine 7 — sort by revenue descending.\n\nNo intermediate variables to name and mistype. No re-binding of df. Each step's output flows into the next step's input.\n\nThe payoff — readability. A new colleague reads this and immediately understands the pipeline. There's no hidden state, no out-of-order operations, no possibility of accidentally using stale data from an earlier step.\n\nThe trade-off — debugging. If a step misbehaves, you can't easily inspect the DataFrame after that step without breaking the chain. The fix is to break the chain temporarily during debugging, store an intermediate variable, inspect, then re-chain.\n\nFor production data pipelines, method chaining is the cleanest pattern. For exploratory analysis, breaking and re-chaining is fine. Use both — the chain for the final code, breaks for the debugging path.",
        hashtags: [...CORE, "#Pandas"],
        image: {
          template: "code", headline: "Pandas chain — read, clean, group",
          code: { language: "python", snippet: "import pandas as pd\n\nsummary = (\n    pd.read_csv('orders.csv')\n      .query('status == \"paid\"')\n      .assign(total=lambda d: d.qty * d.price)\n      .groupby('customer_id')\n      .agg(orders=('id','count'), revenue=('total','sum'))\n      .reset_index()\n      .sort_values('revenue', ascending=False)\n)" },
          accent: "violet",
          aiPrompt: "Dark code card, violet, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d31-p4", day: 31, postNumber: 4, slot: "evening", type: "tip", pillar: "ai-ml",
        title: "Drop iterrows from your vocabulary",
        copy: "df.iterrows() is the pandas equivalent of looping in pure Python. It's slow, often catastrophically slow, and there's almost always a vectorised alternative.\n\nWhy iterrows is slow — for each row, pandas constructs a new Series object. The construction has overhead — copying values out of the underlying NumPy arrays into a new Series, registering an index, supporting the full Series API. Multiply by N rows and you're in trouble.\n\nReal numbers — on a 100k-row DataFrame, summing two columns with iterrows takes about 5 seconds. Vectorised (df['a'] + df['b']) takes about 5 milliseconds. 1000x.\n\nReplacements, in order of preference:\n\nVectorised arithmetic — df['x'] + df['y'], df['x'] * 2, df['x'] ** 2. Anywhere the operation is per-element, NumPy applies it column-wise.\n\nVectorised conditional — np.where(cond, a, b). Replaces 'if-else inside iterrows'.\n\nVectorised functions — df['x'].apply(fn). Slower than pure vectorised, but faster than iterrows because it doesn't construct a full Series per call. Used when fn can't be expressed as a vector op.\n\nFull vectorisation with numpy — drop into NumPy: df['x'].values, do the op, write back. Sometimes faster than pandas' wrappers when you're hot.\n\nFor genuine perf — switch to polars. Lazy evaluation, query optimisation, multi-core by default. We cover it tomorrow.\n\niterrows has approximately one legitimate use — debugging on a small DataFrame, where the slowness doesn't matter and you want to inspect rows manually. Anywhere else, it's a code smell.\n\nIf you typed iterrows, you almost certainly have a faster vectorised alternative. Stop. Refactor. Ship the faster version.",
        hashtags: [...CORE, "#PandasTips"],
        image: {
          template: "tip", headline: "iterrows is a smell",
          bullets: ["Vectorise where possible", "np.where for if/else", "df.apply if you must", "polars for real perf"],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d31-p5", day: 31, postNumber: 5, slot: "night", type: "recap", pillar: "ai-ml",
        title: "Day 31 — pandas, demystified",
        copy: "End of Day 31. Three days into the data stack.\n\nWhat we covered.\n\nMorning, the foundational mental model — DataFrame is a dict of NumPy arrays plus an index. This single fact explains the performance profile (column access fast, row access slower, iterrows dreadful) and the API design (column-oriented operations everywhere).\n\nMidday, the five pandas methods that cover 80% of real work. read_csv / to_parquet, query, groupby+agg, merge, assign. Get fluent in these and most data wrangling is solved.\n\nAfternoon, an 8-line method-chained pipeline from CSV to per-customer summary. The chain reads top-to-bottom; no intermediate variables; the data flows. Cleaner than the equivalent SQL in many cases.\n\nEvening, iterrows as the canonical pandas perf bug. 1000x slower than vectorised alternatives. Use vectorised arithmetic, np.where for conditionals, df.apply when truly needed, polars when scale demands. iterrows is a code smell.\n\nA broader theme — pandas inherits NumPy's vectorisation philosophy and applies it to labelled, mixed-type, possibly-missing data. The patterns from yesterday (vectorise everything) carry over with extra dimensions for column names and indices.\n\nTomorrow, Day 32, groupby and merge in depth. Split-apply-combine in detail. The gotchas in pandas joins (default 'how' silently drops rows). When polars beats pandas (and when it doesn't).\n\nSee you in the morning.",
        hashtags: [...CORE, "#Pandas"],
        image: {
          template: "quote", headline: "Pandas is NumPy with labels.", subhead: "Vectorise. Chain. Move on.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1",
          canvaBrief: "Pastel quote card.",
        },
      },
    ],
  },

  /* DAY 32 */
  {
    day: 32, theme: "groupby & merge — the SQL of pandas", pillar: "ai-ml",
    posts: [
      {
        id: "d32-p1", day: 32, postNumber: 1, slot: "morning", type: "concept", pillar: "ai-ml",
        title: "groupby is split-apply-combine",
        copy: "groupby is the workhorse of data analysis. Once you understand its three-phase model, every aggregation question becomes mechanical.\n\nThe model — split-apply-combine.\n\nSplit — partition the rows of the DataFrame by the values in the groupby key. df.groupby('city') creates one logical group per distinct city, each containing the rows for that city.\n\nApply — run an aggregation function on each group independently. mean(), sum(), count(), or anything else that reduces a Series to a scalar. The function is applied per group, in parallel where possible.\n\nCombine — stitch the per-group results back into one DataFrame, with the groupby key as the index.\n\nThe pattern is the same as SQL's GROUP BY, MapReduce's reduce step, Spark's groupBy, BigQuery's GROUP BY. The terminology differs; the mechanics are identical. If you understand this in one tool, you understand it in all of them.\n\nUnder the hood, pandas implements groupby with hash-based grouping — it computes the group key for each row, builds a dict mapping key to row indices, then applies the aggregation per group using the underlying NumPy arrays. The aggregations themselves run in C. On 10 million rows, a simple sum-by-key finishes in under a second.\n\nWhere groupby shows up in real ML/data work:\n\nFeature engineering — group by user_id, compute mean session length, that becomes a feature.\n\nDataset statistics — group by class label, compute mean and std of features per class.\n\nReporting — group by date, sum revenue, plot.\n\nHyperparameter sweep analysis — group by hyperparameter, compute mean validation accuracy, find the best value.\n\nThe pattern is the same. The applications are everywhere.",
        hashtags: [...CORE, "#Pandas"],
        image: {
          template: "stat", headline: "split → apply → combine", subhead: "groupby in three words", stat: { number: "3", label: "phases inside every groupby call" }, accent: "violet",
          aiPrompt: "Stat poster, violet, 1:1",
          canvaBrief: "Violet gradient. Big 3.",
        },
      },
      {
        id: "d32-p2", day: 32, postNumber: 2, slot: "midday", type: "deepdive", pillar: "ai-ml",
        title: "merge — pandas joins, with the right defaults",
        copy: "df1.merge(df2, on='id', how='left')\n\nFour 'how' modes match SQL exactly — left, right, inner, outer. Each one decides what to do with rows that have no match on the other side.\n\nleft — keep all rows of df1. Rows with no match on the right get NaN for df2's columns. Use when df1 is your 'main' dataset and you're enriching it with df2's information.\n\nright — keep all rows of df2. Mirror image of left. Rarely used; usually swap the operands and use left.\n\ninner — keep only rows where the join key appears in BOTH. Drops unmatched rows on either side. The default for merge in pandas, and the source of many silent-data-loss bugs.\n\nouter — keep all rows from both. Unmatched rows on either side get NaN for the other side's columns. Used when you want to detect mismatches.\n\nWHY YOU SHOULD ALWAYS SPECIFY HOW.\n\nThe default 'inner' merge silently drops rows. If df1 has 1000 rows and you merge with df2 that has only 800 of those keys, you silently lose 200 rows of df1. The output looks fine; you analyse and report on 800 rows; nobody notices the loss.\n\nMy rule — every merge has an explicit how= parameter. Defending in code review what you intended.\n\nThe debugging trick — indicator=True. Adds a _merge column to the result with values 'left_only', 'right_only', or 'both'. Lets you quickly see how many rows came from each side. The best 'why did rows disappear' debugger pandas has.\n\nHandling duplicate keys — merge does a Cartesian product per key. If df1 has 3 rows with id=42 and df2 has 2 rows with id=42, the merge result has 6 rows for id=42. Easy bug. Validate uniqueness before merging or use validate='one_to_one' / 'one_to_many' to fail fast.\n\nMerges are SQL joins with extra tools. Always specify how. Use indicator=True when debugging.",
        hashtags: [...CORE, "#Pandas"],
        image: {
          template: "list", headline: "merge — 4 joins + 1 lifesaver",
          bullets: ["how='left' — keep df1", "how='inner' — both", "how='outer' — keep all", "how='right' — rare", "indicator=True — debug"],
          accent: "violet",
          aiPrompt: "List poster with venn glyph, violet, 1:1",
          canvaBrief: "White grid. 5 rows. Venn faded corner.",
        },
      },
      {
        id: "d32-p3", day: 32, postNumber: 3, slot: "afternoon", type: "code", pillar: "ai-ml",
        title: "Multi-key groupby with named aggs",
        copy: "Modern pandas takes named aggregations directly in the agg() call. The output column names are exactly what you say they should be. Cleaner than the old dict-of-dicts syntax.\n\nLook at the snippet. We groupby on two keys (country, product) and compute four aggregations.\n\norders=('order_id', 'count') — count the order_id column, name the output 'orders'.\n\nrevenue=('total', 'sum') — sum the total column, name it 'revenue'.\n\navg_value=('total', 'mean') — average the total column, name it 'avg_value'.\n\nfirst_order=('created_at', 'min') — earliest created_at, name it 'first_order'.\n\nThe tuple syntax is (column, function). Pandas accepts string names for built-in aggregations ('count', 'sum', 'mean', 'min', 'max', 'std', 'var', 'first', 'last', 'nunique', 'median', etc) or callables for custom logic.\n\nMulti-key groupby — pass a list ['country', 'product'] instead of a single key. The result has a MultiIndex with country and product as levels. reset_index() converts the MultiIndex back to flat columns.\n\nWhen you need a custom aggregation that isn't in the built-ins, pass a callable: revenue_3p=('total', lambda s: s.quantile(0.3)). Slower than built-ins (it's Python, not C), but works.\n\nFor multiple aggregations per column, the syntax handles it cleanly. revenue=('total', 'sum'), avg_value=('total', 'mean') applies two functions to the same column with different output names. Cleaner than the older agg({'total': ['sum', 'mean']}) which produces awkward MultiIndex columns.\n\nThe named-agg syntax landed in pandas 0.25 (mid-2019). Most pandas tutorials online still show the older dict-of-dicts. The named-agg version is more readable. Use it.",
        hashtags: [...CORE, "#Pandas"],
        image: {
          template: "code", headline: "Multi-key groupby — named aggs",
          code: { language: "python", snippet: "import pandas as pd\n\nstats = (\n    df.groupby(['country', 'product'])\n      .agg(\n          orders=('order_id', 'count'),\n          revenue=('total', 'sum'),\n          avg_value=('total', 'mean'),\n          first_order=('created_at', 'min'),\n      )\n      .reset_index()\n)" },
          accent: "violet",
          aiPrompt: "Dark code card, violet, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d32-p4", day: 32, postNumber: 4, slot: "evening", type: "tip", pillar: "ai-ml",
        title: "Polars when pandas struggles",
        copy: "Pandas is the right choice for most data work. There's a clear point where it stops being the right choice — and 2026's better answer is polars.\n\nWhen polars wins:\n\nLarge datasets. Past 10 million rows, pandas starts feeling slow. Past 100 million, pandas often runs out of memory or takes hours for what should be minutes. Polars handles 100M+ rows comfortably on a laptop.\n\nComplex pipelines. When you're chaining 20 operations, polars' lazy evaluation kicks in. It analyses the full pipeline before executing, optimises the plan (predicate pushdown, projection pushdown, common subexpression elimination), and runs only what's needed. Often 10-100x faster than the equivalent pandas chain on large data.\n\nMulti-core by default. Pandas is mostly single-threaded. Polars uses Rayon (Rust's data-parallelism library) and multi-cores most operations automatically. On modern 8-16 core laptops, this is a 4-8x speedup for free.\n\nCleaner expressions for chained operations. The polars expression API (pl.col('x').filter(...).sum()) is more composable than pandas' boolean indexing.\n\nWhere pandas still wins:\n\nNotebook-style exploratory analysis. Pandas' integration with Jupyter, matplotlib, and the broader scientific-Python ecosystem is more mature.\n\nML-specific work where downstream tools (sklearn, statsmodels, plotly) expect pandas DataFrames. Polars can convert to pandas, but the conversion itself takes time.\n\nLegacy codebases where the team knows pandas. Switching cost is real.\n\nMy default in 2026 — pandas for ML/notebook work; polars for ETL pipelines or anything past 10M rows. They share enough vocabulary that switching mid-career is straightforward. Both languages of choice for different jobs.",
        hashtags: [...CORE, "#Polars"],
        image: {
          template: "tip", headline: "polars beats pandas at 10M+ rows",
          bullets: ["Lazy eval + optimiser", "Multi-core default", "Rust under the hood", "Use it for ETL"],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d32-p5", day: 32, postNumber: 5, slot: "night", type: "recap", pillar: "ai-ml",
        title: "Day 32 — groupby and merge, mastered",
        copy: "End of Day 32. Pandas core wrapped.\n\nWhat we covered.\n\nMorning, the split-apply-combine model behind groupby. Three phases that match SQL's GROUP BY, MapReduce's reduce, Spark's groupBy. Once you see the model, every aggregation question is mechanical.\n\nMidday, merge as pandas' SQL joins. Four 'how' modes — left, right, inner, outer. ALWAYS specify how= explicitly. Default 'inner' silently drops rows. indicator=True is the debugger for 'why did my row count change'.\n\nAfternoon, modern named-aggregation syntax. agg(name=(column, function)) gives you exact output column names. Cleaner than the older dict-of-dicts. Multi-key groupby plus named aggs covers most aggregation work.\n\nEvening, polars as the answer when pandas struggles. Past 10M rows, polars wins on speed and memory. Lazy evaluation, query optimisation, multi-core by default. Pandas still wins for ML notebook work and ecosystem integration.\n\nA broader theme. Pandas (and polars) inherit NumPy's vectorised philosophy and apply it to labelled, indexed, mixed-type data. The performance characteristics flow from the underlying array structure. Vectorise everything; iterrows is a smell.\n\nTomorrow, Day 33, plotting. matplotlib basics, seaborn for statistical plots, pandas .plot() for sanity checks, plotly for interactive. Plus the one chart I make first on every new dataset.\n\nSee you in the morning.",
        hashtags: [...CORE, "#Pandas"],
        image: {
          template: "quote", headline: "Default to how='left'.", subhead: "The other 'how's are explicit choices.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1",
          canvaBrief: "Pastel quote card.",
        },
      },
    ],
  },

  /* DAY 33 */
  {
    day: 33, theme: "Plotting — the chart that ends every EDA", pillar: "ai-ml",
    posts: [
      {
        id: "d33-p1", day: 33, postNumber: 1, slot: "morning", type: "concept", pillar: "ai-ml",
        title: "matplotlib is the engine. Everything else is a wrapper.",
        copy: "Plot libraries in Python are confusing because there are many of them and most overlap. The simplifying frame — matplotlib is the engine. Almost everything else is a layer that ultimately renders through matplotlib (or to web with a similar abstraction).\n\nSeaborn — high-level statistical plotting. Box plots, violin plots, regression plots, pair plots. Renders through matplotlib. Use when you want statistical-looking output without configuring axes by hand.\n\nPandas .plot() — convenience method that wraps matplotlib for quick DataFrame visualisation. df.plot(kind='line') gives you a quick line chart. Used for sanity checks during exploratory work.\n\nPlotnine — a Python implementation of ggplot2's grammar of graphics. Different mental model (layer-based composition); same final pixels.\n\nPlotly — interactive plots. Renders to JavaScript / WebGL in the browser, not matplotlib. Use when you need zoomable, hoverable charts in dashboards or notebooks.\n\nBokeh — alternative to plotly. Similar interactive philosophy.\n\nAltair — declarative grammar based on Vega-Lite. Renders to web.\n\nMy daily workflow:\n\nQuick sanity plots during analysis — df.plot() or df.hist(). Fast, no config.\n\nStatistical plots for reports and EDA — seaborn (sns.histplot, sns.boxplot, sns.pairplot). Tidy long-form data, nice defaults.\n\nFinal polished plots for slides or papers — matplotlib direct. Full control over axes, fonts, colors, annotations.\n\nInteractive dashboards — plotly. Zoomable time series, hoverable scatter plots, drill-down.\n\nThe rule — learn matplotlib's basics once. The rest sit on top, and you can switch between them based on what you need.\n\nDon't get lost in the proliferation of libraries. matplotlib is the engine; everything else is a stylistic preference or a different output target.",
        hashtags: [...CORE, "#Matplotlib"],
        image: {
          template: "list", headline: "Plot tools — pick by job",
          bullets: ["df.plot() — sanity checks", "seaborn — statistical", "matplotlib — finished plots", "plotly — interactive"],
          accent: "violet",
          aiPrompt: "List poster, violet, 1:1",
          canvaBrief: "White grid, 4 rows.",
        },
      },
      {
        id: "d33-p2", day: 33, postNumber: 2, slot: "midday", type: "deepdive", pillar: "ai-ml",
        title: "Pair plot — the chart I make first, every dataset",
        copy: "Drop a fresh dataset on me and I run sns.pairplot() before anything else.\n\nThe pair plot is a grid of small charts. The diagonal shows the distribution of each numeric column (histogram or kde). The off-diagonal shows scatter plots of each pair of columns. With hue=class for classification problems, the colors split each chart by class.\n\nIn 2 seconds you spot:\n\nSkew. Distributions that lean heavily right or left. Suggests log-transform or different model assumptions.\n\nOutliers. Points way off the main cloud. Maybe data errors, maybe genuinely interesting cases.\n\nSeparable classes. Class boundaries visible in the off-diagonal scatters. Tells you whether a simple linear model could work or you need something nonlinear.\n\nMulticollinearity. Pairs of features that are highly correlated (off-diagonal scatter looks like a tight line). Often you can drop one or use regularisation.\n\nMissing data patterns. Empty regions in scatter plots. Columns that appear all-zero or all-NaN.\n\nSize considerations — pairplot doesn't scale to large datasets. With more than ~20 columns, the grid becomes unreadable. With more than ~50k rows, scatter plots become solid blobs (sample first). Both are easy to handle — pick the most-relevant 5-10 columns; subsample the rows.\n\nFor very small datasets, pair plots are trivially fast and give you the orientation you need. For larger datasets, the same chart with sampled data takes seconds and tells you almost as much.\n\nAfter pair plot, the next charts I make depend on what pair plot revealed. If skew is everywhere, log-transform first. If multicollinearity is rampant, maybe PCA. If classes look completely separable, a linear model is probably enough.\n\nOne chart, two seconds, more orientation than reading the data dictionary. Worth the runtime.",
        hashtags: [...CORE, "#EDA"],
        image: {
          template: "stat", headline: "pairplot first", subhead: "Distributions + scatter for every pair", stat: { number: "1", label: "chart that orients you to a new dataset" }, accent: "violet",
          aiPrompt: "Stat poster with grid-of-charts glyph, violet, 1:1",
          canvaBrief: "Violet gradient. Big 1. Faded chart-grid.",
        },
      },
      {
        id: "d33-p3", day: 33, postNumber: 3, slot: "afternoon", type: "code", pillar: "ai-ml",
        title: "Three plots, one matplotlib pattern",
        copy: "The fig/axes pattern is matplotlib's idiomatic API. Once you've seen it, every plotting library makes more sense — they all (eventually) call into something like this.\n\nfig, axes = plt.subplots(rows, cols, figsize=(width, height))\n\nReturns a Figure (the whole canvas) and an array of Axes (each individual subplot). You then plot on each axes by calling its methods — axes[0].hist(), axes[1].scatter(), axes[2].plot().\n\nLook at the snippet — three subplots in a 1x3 grid.\n\naxes[0].hist(df['age'], bins=30) — histogram of ages with 30 bins.\n\naxes[1].scatter(df['x'], df['y'], alpha=0.4) — scatter of x vs y. alpha=0.4 makes points partially transparent so overlapping points show density.\n\naxes[2].plot(df['date'], df['value']) — line chart over time.\n\nEach ax has its own title, axis labels, ticks, legend — set independently. axes[i].set_title('...'), axes[i].set(xlabel='...', ylabel='...'), axes[i].legend().\n\nfig.tight_layout() before plt.show() — adjusts spacing to prevent overlap. Always do this for multi-subplot figures.\n\nSaving — fig.savefig('out.png', dpi=150, bbox_inches='tight'). dpi controls resolution; 150 is fine for slides, 300 for print. bbox_inches='tight' trims whitespace.\n\nFor production publish-quality plots, you'll add — explicit colors, custom fonts, axis limits, annotations, legends with locations. matplotlib gives you full control over each. The cost is verbosity; the benefit is exactness.\n\nFor a Jupyter notebook quick-look, df.plot() in pandas (which uses matplotlib under the hood) is enough. For final figures, drop into matplotlib direct.\n\nKnow the fig/ax pattern. Most plotting code you'll read uses it.",
        hashtags: [...CORE, "#Matplotlib"],
        image: {
          template: "code", headline: "fig, ax — universal mpl pattern",
          code: { language: "python", snippet: "import matplotlib.pyplot as plt\n\nfig, axes = plt.subplots(1, 3, figsize=(12, 4))\n\naxes[0].hist(df['age'], bins=30)\naxes[0].set_title('Age distribution')\n\naxes[1].scatter(df['x'], df['y'], alpha=0.4)\naxes[1].set(xlabel='x', ylabel='y', title='x vs y')\n\naxes[2].plot(df['date'], df['value'])\naxes[2].set_title('Time series')\n\nfig.tight_layout()\nplt.show()" },
          accent: "violet",
          aiPrompt: "Dark code card, violet, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d33-p4", day: 33, postNumber: 4, slot: "evening", type: "tip", pillar: "ai-ml",
        title: "If you're plotting more than 100k points, sample first",
        copy: "Plotting a million data points in a scatter plot is slow AND useless. Slow because the plot library has to render a million markers. Useless because the markers overlap into a solid blob — you can't see structure.\n\nThe fixes, in order of preference:\n\nSample. df.sample(50_000) gives you a random subset. For most exploratory plots, 50k points show the same patterns as the full data — outliers, clusters, trends are all visible.\n\nHexbin plot. plt.hexbin(x, y) divides the plane into hexagonal bins and colors each by the count of points in it. Great for showing 2D density. Doesn't suffer from overplotting.\n\n2D histogram. plt.hist2d(x, y, bins=50) — same idea as hexbin but rectangular bins. Slightly faster; less aesthetically pleasing.\n\nDatashader / vaex for very large datasets. Renders billion-point scatter plots by aggregating into image pixels. Used in genomics, geographic data, telemetry visualisations.\n\nKDE. seaborn.kdeplot for smooth density estimates. Slower than hexbin, prettier output.\n\nWhen alpha helps and when it doesn't:\n\nOn small N (< 10k), alpha=0.05 to 0.3 lets you see density through transparency. The piling up of partially transparent dots reveals where the points are concentrated.\n\nOn large N (> 100k), alpha doesn't help — even at alpha=0.01, a million dots saturate the canvas. Switch to hexbin or 2D histogram.\n\nMy first-draft scatter plot rule — if df has more than 100k rows, sample to 50k for visualisation. After looking at the sample, decide if I need a density-aware visualisation for the full data.\n\nFast plots are useful plots. Decorate later, after the analysis decisions are made.",
        hashtags: [...CORE, "#DataViz"],
        image: {
          template: "tip", headline: "Sample big data before plotting",
          bullets: ["df.sample(50k) — quick", "hexbin for density", "hist2d for heatmap", "alpha tells less than density"],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d33-p5", day: 33, postNumber: 5, slot: "night", type: "recap", pillar: "ai-ml",
        title: "Day 33 — plot to think, not to publish",
        copy: "End of Day 33. Plotting done.\n\nWhat we covered.\n\nMorning, the plotting library landscape. matplotlib as the engine; seaborn, pandas .plot(), plotnine, plotly, bokeh, altair as layers and alternatives. Pick by job — sanity checks vs statistical vs polished vs interactive.\n\nMidday, the pair plot as the orientation chart. sns.pairplot shows distributions and pairwise scatter. Reveals skew, outliers, separable classes, multicollinearity in seconds. The first chart I make on every new dataset.\n\nAfternoon, the matplotlib fig/axes pattern. plt.subplots(rows, cols) returns a Figure and an array of Axes. Plot on each axes individually. fig.tight_layout() before show. The pattern underlies most plotting code you'll read.\n\nEvening, the perf and readability rule for big data — sample first, decorate later. 50k points is enough for most exploratory plots. For density visualisation on large data, use hexbin or 2D histograms.\n\nA broader theme — plots are a thinking tool, not a publication. Make many quick plots during analysis; polish a few for the final report. The first plot you make rarely answers the question; the conversation between you and the data is what produces insight.\n\nTomorrow, Day 34, EDA workflow. The seven questions I ask of every dataset before opening a model. The 'data understanding' phase that separates ML projects that succeed from ones that fail.\n\nSee you in the morning.",
        hashtags: [...CORE, "#EDA"],
        image: {
          template: "quote", headline: "Plot to think.", subhead: "Polish later.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1",
          canvaBrief: "Pastel quote card.",
        },
      },
    ],
  },

  /* DAY 34 */
  {
    day: 34, theme: "EDA — 7 questions before you open a model", pillar: "ai-ml",
    posts: [
      {
        id: "d34-p1", day: 34, postNumber: 1, slot: "morning", type: "concept", pillar: "ai-ml",
        title: "Models can't fix data you haven't looked at",
        copy: "I've seen it many times. A team trains a model. The model performs poorly. They blame the architecture, try a bigger model, retrain with different hyperparameters. The model still performs poorly. Eventually someone looks at the data and finds — surprise — the labels are noisy, half the features have systematic missing values, and the train/test split has a temporal leak. The truth was visible in the first hour of EDA, and the team spent three weeks ignoring it.\n\nDon't be that team. EDA isn't a step you skip when you're in a hurry. It's the step that prevents the slowness.\n\nMy seven questions for every fresh dataset, asked in order:\n\nOne — what's the row count and column count? Frames the rest of the analysis. 100 rows is a different problem from 100M.\n\nTwo — what types are each column? df.info() in pandas. Strings as categories vs strings as IDs vs strings that should be parsed as dates.\n\nThree — where are the missing values? df.isna().sum().sort_values(ascending=False). Some columns missing 90% of values are essentially noise. Some missing 5% need imputation strategy.\n\nFour — what's the target distribution? Skewed? Imbalanced? For classification, value_counts() on the target. If 99% of rows are one class, accuracy is meaningless.\n\nFive — any obvious correlations? df.corr() and look at the top correlations with target. Anything above 0.95 is suspicious — likely a leaky feature.\n\nSix — any duplicated rows or near-duplicates? df.duplicated().sum() catches exact duplicates. Near-duplicates need fuzzy matching, but worth checking on critical fields.\n\nSeven — any leak? Features that 'know' the answer at training time but won't be available at inference. Date fields, customer IDs that map 1-1 to label, anything created downstream of the target.\n\nAnswer these in 30 minutes. Then model.",
        hashtags: [...CORE, "#EDA"],
        image: {
          template: "list", headline: "7 EDA questions before any model",
          bullets: ["Shape (rows, cols)", "Types per column", "Missing where?", "Target distribution", "Correlations", "Duplicates", "Leakage"],
          accent: "violet",
          aiPrompt: "Premium 7-row infographic, violet, 1:1",
          canvaBrief: "White grid. 7 numbered rows.",
        },
      },
      {
        id: "d34-p2", day: 34, postNumber: 2, slot: "midday", type: "deepdive", pillar: "ai-ml",
        title: "df.info(), df.describe(), df.isna().sum() — the holy trio",
        copy: "Three pandas calls. Run them in order, every time. Thirty seconds of effort. They answer questions one through three from this morning's checklist.\n\ndf.info() — shape, dtypes, non-null counts. Tells you the row count, the column count, and how many non-null values each column has.\n\ndf.describe(include='all') — summary statistics. mean, std, min, 25th/50th/75th percentile, max for numeric columns. count, unique, top, freq for object columns. The 'include=all' makes it work for both types.\n\ndf.isna().sum().sort_values(ascending=False).head(20) — missing-values census. Sum the boolean isna mask per column, sort descending, show the top 20. Reveals which columns have the most missing data.\n\nLook at the snippet. Add a fourth call — top correlations with the target.\n\ncorr = df.corr(numeric_only=True)\ncorr['target'].sort_values(ascending=False).head(10)\n\nGives you the ten features most positively correlated with the target. Look at the bottom too (corr.sort_values().head(10)) for the most negative correlations. Anything above |0.95| is a leakage suspect.\n\nIn 30 seconds you've seen — dataset shape, type distribution, missing-values pattern, summary stats, top correlations. From there you decide what to clean, fill, drop, or one-hot encode. You decide whether the target needs reframing (log transform a skewed regression target). You decide what feature engineering to try first.\n\nThe trio runs in any Jupyter notebook in seconds even on multi-GB DataFrames. There's no excuse to skip it. Most ML failures I've seen would have been prevented by 30 minutes of running these four calls and looking carefully at the output.\n\nFor production-grade EDA, ydata-profiling (formerly pandas-profiling) generates a full HTML report from these primitives. Useful for sharing findings with stakeholders. For your own first pass, the trio is sufficient.\n\nLook at the data first. Always.",
        hashtags: [...CORE, "#Pandas"],
        image: {
          template: "code", headline: "EDA holy trio",
          code: { language: "python", snippet: "import pandas as pd\n\ndf = pd.read_csv('data.csv')\n\ndf.info()\nprint(df.describe(include='all'))\nprint(df.isna().sum().sort_values(ascending=False).head(20))\n\n# top correlations\ncorr = df.corr(numeric_only=True)\nprint(corr['target'].sort_values(ascending=False).head(10))" },
          accent: "violet",
          aiPrompt: "Dark code card, violet, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d34-p3", day: 34, postNumber: 3, slot: "afternoon", type: "code", pillar: "ai-ml",
        title: "Spot leakage in 4 lines",
        copy: "Data leakage is the silent killer of ML projects. A leaked feature is one that wouldn't be available at prediction time but accidentally got into your training data. Your model learns to use it. Validation accuracy looks great. Production accuracy is garbage. The model is useless.\n\nA quick diagnostic. Compute correlations between every numeric feature and the target. Anything with |correlation| > 0.95 is suspicious.\n\nWhy 0.95 — most genuinely useful features in real datasets correlate with the target between 0.1 and 0.7. Anything dramatically higher is usually one of:\n\nA derived feature created from the target. Someone's preprocessing pipeline computed mean_target_for_this_user and shipped it as a feature. Now the model is essentially given the answer.\n\nA timestamp or ID that maps 1-1 to the target. Customer ID 5847 always has label A; that's not a feature, it's the answer in disguise.\n\nA feature created downstream of the target. The target is 'did the user churn'; you have a feature 'days since last login' and that feature was computed for churned users by going to the date they churned. Knows the answer.\n\nThe diagnostic doesn't catch all leakage (categorical features won't show in numeric correlation; complex non-linear leakage hides). But it catches the most common cases in 30 seconds.\n\nAfter spotting suspicious features, the second diagnostic — temporal split. Sort the data by time, train on early, test on late. If validation accuracy drops dramatically when you do this versus a random split, you have temporal leakage somewhere.\n\nLeakage costs trust. A model that performed great in development and fails in production loses you political capital. Catch it during EDA, before training. The few minutes you spend looking for it pay off enormously.",
        hashtags: [...CORE, "#MachineLearning"],
        image: {
          template: "tip", headline: "Suspicion ≥ 0.95 correlation",
          bullets: ["Correlate features → target", "|r| > 0.95 — investigate", "ID-like columns suspicious", "Time-shifted future = leak"],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d34-p4", day: 34, postNumber: 4, slot: "evening", type: "tip", pillar: "ai-ml",
        title: "Save EDA as a notebook AND a markdown",
        copy: "Notebooks die. I've opened 18-month-old EDA notebooks and found them broken — kernel state lost, charts re-running differently because the underlying data drifted, library versions incompatible. The notebook was a snapshot of a thought process; the thought process is gone.\n\nMy fix is dual-format documentation. Alongside every EDA notebook, I write a 1-page markdown summary.\n\nThe notebook captures the WORK — every chart you made, every aggregation you ran, every hypothesis you tested. It's the audit trail.\n\nThe markdown captures the FINDINGS — top observations, key decisions made, charts saved as PNG with captions. It's the memory.\n\nTwelve months later, you read the markdown. The notebook is there if you need to verify or rerun something.\n\nWhat goes in the markdown:\n\n1. Dataset summary — n rows, n columns, sources, time range. Two sentences.\n2. Top 3-5 findings with one-sentence explanations. 'The target is heavily imbalanced (95/5).' 'Feature X has 40% missing values, but only for users in segment Y.'\n3. Decisions made — 'Will drop column Z due to leakage suspicion.' 'Will use log-transform on price target.'\n4. Open questions — 'Why does feature A spike on weekends?' Note for future investigation.\n5. Links to key charts saved as PNG — 'See pair_plot_v1.png in figures/'.\n\nKeep it under one page. The discipline of fitting in one page forces clarity.\n\nFor team work, the markdown is what you share. Stakeholders don't read notebooks; they read markdowns. Engineers reading the project six months later read the markdown first; only dive into notebooks when they need specifics.\n\nNotebook for the work. Markdown for the memory. Both, every time.",
        hashtags: [...CORE, "#DataScience"],
        image: {
          template: "tip", headline: "EDA: notebook AND markdown",
          bullets: ["Notebook for the work", "Markdown for the memory", "Save key charts as PNG", "Future-you reads markdown"],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d34-p5", day: 34, postNumber: 5, slot: "night", type: "recap", pillar: "ai-ml",
        title: "Day 34 — EDA is half the work",
        copy: "End of Day 34. EDA wrapped.\n\nWhat we covered.\n\nMorning, the seven questions to answer about every dataset before you train any model. Shape, types, missingness, target distribution, correlations, duplicates, leakage. Thirty minutes of effort that prevents weeks of debugging downstream.\n\nMidday, the holy trio of pandas calls — info, describe, isna.sum. Plus the correlation top-10 with target. Together they answer five of the seven questions. The trio runs in seconds; there's no excuse to skip.\n\nAfternoon, leakage detection in 4 lines. Correlation > 0.95 with target is suspicious. Catches 80% of common leakage cases — derived-from-target features, ID-mapped labels, timestamps that encode the future. Quick diagnostic; massive payoff.\n\nEvening, the dual-format documentation rule. Notebook for the work; markdown for the memory. The notebook records every chart and every aggregation; the markdown captures the key findings and decisions. In 12 months, future-you reads the markdown.\n\nA broader theme. ML failures are usually data failures. Skipping EDA to 'save time' is the biggest false economy in the field. The 30 minutes to look at the data is among the highest-ROI activities you'll do on any project.\n\nTomorrow, Day 35, the cleaning workflow. Patterns I run on every dataset to handle the messiness — strip whitespace, parse dates, coerce numbers, dedup, bucket rare categories. Then we close week 5.\n\nSee you in the morning.",
        hashtags: [...CORE, "#EDA"],
        image: {
          template: "quote", headline: "Look at the data first.", subhead: "Always.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1",
          canvaBrief: "Pastel violet quote card.",
        },
      },
    ],
  },

  /* DAY 35 */
  {
    day: 35, theme: "Cleaning real data + week 5 wrap", pillar: "ai-ml",
    posts: [
      {
        id: "d35-p1", day: 35, postNumber: 1, slot: "morning", type: "concept", pillar: "ai-ml",
        title: "Real data is messy. Plan for that.",
        copy: "Almost every tutorial dataset is clean. Iris, MNIST, Boston Housing, Titanic — all curated, all consistent, all ready for sklearn out of the box. They're useful for learning algorithms; they're misleading about the actual job.\n\nReal data is messy. Always. It has:\n\nMixed-type columns. The 'price' column is sometimes '12.99', sometimes '12,99' (European decimal), sometimes '$12.99', sometimes 'NA', sometimes empty string. Pandas reads this as object dtype, which kills NumPy's speed.\n\nInconsistent dates. '2024-01-01', '01/01/24', '01-Jan-2024', None, '2024-01-32' (yes, 32, real bug from a real dataset). Each format hides date arithmetic until parsed.\n\nDuplicates that aren't byte-identical. Same person registered twice with slightly different email capitalisation, slightly different phone number formats. Drop_duplicates() catches none of them.\n\nFree-text categories with typos and case. 'New York', 'new york', 'New york', 'NewYork', 'NY' — five strings, one city. Group-bys treat them as five categories.\n\nExtreme outliers from copy-paste. Someone pasted a number with the wrong number of zeros. Now your 'age' column has a 99,000-year-old. The mean is meaningless until you handle it.\n\nMissing values that aren't NaN. The original system used '-1' or '999' or empty string for missing. Pandas reads these as values. Mean and std are computed over them.\n\nThe rule that drops out — budget 60% of any data project for cleaning. Anyone who tells you they 'just trained a model' on real data is either lying or working on toy data. Real data starts dirty.\n\nThe good news — cleaning is mostly mechanical once you know the patterns. Tomorrow we cover the five I run on every dataset.",
        hashtags: [...CORE, "#DataCleaning"],
        image: {
          template: "stat", headline: "60%", subhead: "of data work is cleaning", stat: { number: "60%", label: "of any real data project = cleaning" }, accent: "violet",
          aiPrompt: "Stat poster, violet, 1:1",
          canvaBrief: "Violet gradient. Big 60%.",
        },
      },
      {
        id: "d35-p2", day: 35, postNumber: 2, slot: "midday", type: "deepdive", pillar: "ai-ml",
        title: "5 cleaning patterns I run on every dataset",
        copy: "After cleaning hundreds of datasets, I've converged on five patterns that I apply almost reflexively at the start of any project. They handle 80% of the mess.\n\nOne — strip and lowercase string columns. df['col'].str.strip().str.lower(). Handles trailing whitespace and case-inconsistencies. 'New York ' becomes 'new york'; 'NEW YORK' becomes 'new york'. Now group-bys work correctly.\n\nTwo — parse dates centrally. pd.to_datetime(col, errors='coerce'). Handles most format variations automatically. errors='coerce' converts unparseable strings to NaT (NumPy's date-NaN), which lets the rest of the pipeline continue while flagging bad rows.\n\nThree — coerce numeric. pd.to_numeric(col, errors='coerce'). Forces object-dtype columns into numeric. Strings like '12.99' become 12.99; strings like 'unknown' become NaN. Now the column is float, NumPy operations work, summary stats are meaningful.\n\nFour — dedup by composite key. df.drop_duplicates(subset=[...]). The subset matters — passing nothing dedups on all columns (rare to want). Usually you dedup by a meaningful subset like (email, signup_date) or (transaction_id) — only the columns that should be unique.\n\nFive — bucket rare categories. Top-N + 'other'. If a categorical column has 10000 unique values and 9900 of them appear fewer than 5 times each, the long tail is noise. Keep the top 50; map the rest to 'other'. Reduces feature explosion in one-hot encoding; doesn't lose meaningful signal.\n\nThese five together tame most messy datasets. Apply them once at the start of every project, BEFORE you start exploratory analysis. The downstream EDA, modelling, and feature engineering all become smoother.\n\nFor production pipelines, encode each pattern as a function in your shared utilities. Reuse across projects. The first time you save 30 minutes by importing a function instead of rewriting it, you'll know it was worth the effort.",
        hashtags: [...CORE, "#Pandas"],
        image: {
          template: "list", headline: "5 cleaning patterns I always run",
          bullets: ["Strip + lower strings", "to_datetime(errors='coerce')", "to_numeric(errors='coerce')", "drop_duplicates(subset=...)", "Bucket rare categories → 'other'"],
          accent: "violet",
          aiPrompt: "List card, violet, 1:1",
          canvaBrief: "White grid. 5 rows.",
        },
      },
      {
        id: "d35-p3", day: 35, postNumber: 3, slot: "afternoon", type: "code", pillar: "ai-ml",
        title: "A reusable cleaning function",
        copy: "I keep this function in a shared utilities module. Apply once at the start of every project. Replaces 50 lines of cleaning into 12.\n\nLook at the snippet. The tidy() function takes a DataFrame, returns a cleaned copy.\n\ndf.copy() — work on a copy so we don't mutate the caller's DataFrame. Good hygiene.\n\nFor object-dtype columns — strip whitespace, lowercase. Two transformations chained on the str accessor. Applies to all string-shaped columns automatically.\n\nFor columns with 'date' or 'at' in the name — parse as datetime with coerce. The naming convention 'date_*' or '*_at' for date columns is widespread; this leverages it.\n\ndrop_duplicates() at the end — removes exact-duplicate rows. For more sophisticated dedup, replace with drop_duplicates(subset=[...]) for a specific composite key.\n\nThe function is intentionally minimal. It handles the common cases. Edge cases — categorical buckets, numeric coercion on specific columns, custom date formats — are project-specific, added on top of the base.\n\nMy actual production version has more bells and whistles — logs row count before/after each step, validates that critical columns survived, optionally writes a 'cleanup report' showing what was removed. But the 12-line core is the same.\n\nThe broader philosophy — data cleaning is mechanical. Code it once; reuse it. The first time you write 'df.drop_duplicates()' in a new project after typing it 50 times in previous projects, you should hear yourself complaining and refactor it into a shared utility. Save your brain for the project-specific work; let the utility handle the universal.\n\nVersion-control your data utilities like you version-control your code. They compound across projects.",
        hashtags: [...CORE, "#Pandas"],
        image: {
          template: "code", headline: "Reusable cleaning function",
          code: { language: "python", snippet: "import pandas as pd\n\ndef tidy(df: pd.DataFrame) -> pd.DataFrame:\n    df = df.copy()\n    obj_cols = df.select_dtypes('object').columns\n    for c in obj_cols:\n        df[c] = df[c].astype(str).str.strip().str.lower()\n    for c in df.columns:\n        if 'date' in c or 'at' in c:\n            df[c] = pd.to_datetime(df[c], errors='coerce')\n    df = df.drop_duplicates()\n    return df" },
          accent: "violet",
          aiPrompt: "Dark code card, violet, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d35-p4", day: 35, postNumber: 4, slot: "evening", type: "tip", pillar: "ai-ml",
        title: "Always log row count before/after every step",
        copy: "There's a class of pandas bug that's hard to catch and easy to ship — a step that silently drops rows. By the time you've chained 10 operations, your million-row DataFrame is now 600k and you don't remember which step did it.\n\nThe culprits:\n\nMerges with how='inner' that drop unmatched rows.\n\nFilters that exclude more than expected.\n\ndrop_duplicates that fires on a subset broader than intended.\n\ndropna() that loses anything with a missing value in any column.\n\nAny of these can drop 40% of your data with no error, no warning, no flag.\n\nMy fix is a tiny @log_shape decorator. Wraps any DataFrame-transforming function. Prints rows-before, rows-after, and the percent change. Five lines of code; saves entire categories of bugs.\n\nThe decorator looks like:\n\nimport functools\n\ndef log_shape(fn):\n    @functools.wraps(fn)\n    def wrap(df, *args, **kwargs):\n        before = len(df)\n        out = fn(df, *args, **kwargs)\n        after = len(out)\n        delta = (after - before) / max(before, 1) * 100\n        print(f'{fn.__name__}: {before} → {after} ({delta:+.1f}%)')\n        return out\n    return wrap\n\nApply to your pipeline functions. Run the pipeline. Get a log line per step.\n\nFor quick exploratory work without decorators, just print(df.shape) liberally between operations. Five extra lines, instant visibility.\n\nWhen the pipeline goes sideways and you've lost 40% of rows, the log tells you which step cost what. Without it, you're bisecting blind.\n\nIn ML, a 'why is my dataset so small' bug is almost always a hidden inner-join or a too-aggressive dropna. The shape decorator catches it the moment it happens.\n\nA five-line decorator. Drop into every data utility module you write.",
        hashtags: [...CORE, "#DataCleaning"],
        image: {
          template: "tip", headline: "Log shape before/after every step",
          bullets: ["@log_shape decorator", "Or print(df.shape) liberally", "Inner-joins drop silently", "Filters drop silently"],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d35-p5", day: 35, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Week 5 done — the data stack",
        copy: "End of week five. 35 days. 175 posts. We're 39% through the sprint.\n\nThe data stack week is in the books. Tomorrow week 6 starts on classical machine learning — linear regression to gradient boosting. The stack we've built this week is the substrate underneath all of it.\n\nWhat week 5 covered.\n\nNumPy and broadcasting. C-speed numerical operations. Vectorise everything. Five built-in primitives that replace most loops. Broadcasting in one rule (pad and stretch). Cosine similarity in three lines.\n\nPandas. DataFrame as a dict of NumPy arrays. The five methods that cover 80% of work. Method chaining as the readability default. iterrows as the canonical perf bug.\n\ngroupby and merge. Split-apply-combine model. Always specify how= on merges. Named aggregations for clean group-by output. polars when pandas struggles.\n\nPlotting. matplotlib as the engine. Pair plot as the orientation chart for new datasets. fig/axes pattern as the universal API. Sample big data before plotting.\n\nEDA workflow. Seven questions to answer before opening a model. Pandas info/describe/isna trio plus correlation top-10. Leakage detection via correlation > 0.95. Notebook + markdown documentation.\n\nData cleaning. Five patterns that handle 80% of mess — strip+lower, to_datetime, to_numeric, drop_duplicates, bucket rare categories. Reusable cleaning function in 12 lines. @log_shape decorator for catching silent row drops.\n\nA broader theme — most ML failures are data failures, not modelling failures. The week's investment in data hygiene pays back enormously over the next eight weeks.\n\nTomorrow, week 6 — classical ML. Linear regression, logistic regression, decision trees, random forests, gradient boosting, k-means, SVMs. The mental model is the same as the data work — pick the right tool for the question.\n\nSee you in week 6.",
        hashtags: [...CORE, "#90DaysOfAI"],
        image: {
          template: "quote", headline: "5 weeks down. 8 to go.", subhead: "Next: classical ML — regression to gradient boosting.", accent: "violet",
          aiPrompt: "Pastel violet quote with 35/90 progress, 1:1",
          canvaBrief: "Pastel violet quote with 35/90 violet bar.",
        },
      },
    ],
  },
];
