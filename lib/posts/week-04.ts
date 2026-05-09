import type { DayPlan } from "../types";

const CORE = ["#DSA", "#Algorithms", "#Python", "#100DaysOfCode", "#CodingInterview"];

export const week04: DayPlan[] = [
  /* DAY 22 */
  {
    day: 22, theme: "Recursion — when (and how) to use it", pillar: "dsa",
    posts: [
      {
        id: "d22-p1", day: 22, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "Recursion is just a function calling itself",
        copy: "Day 22. Week four begins. We open with the topic that every CS-101 student claims to understand and most production developers misuse — recursion.\n\nThe definition is small. A recursive function is a function that calls itself. That's it. Strip away the formalism and you're left with two requirements every recursive function must have.\n\nOne — a base case. The simplest input where the function returns a direct answer without further recursion. Without a base case, the function calls itself forever and you get a stack overflow.\n\nTwo — a recursive case. The function reduces the input to a smaller version of the same problem and calls itself with that smaller input. The smaller call returns; you combine its result with whatever local work you needed.\n\nThe call stack does the bookkeeping. Each call gets its own stack frame with its own local variables. When a call returns, its frame is popped off the stack. The recursion depth equals the number of frames on the stack at peak.\n\nWhen does recursion fit naturally?\n\nWhen the problem can be described as 'solve a smaller version of the same problem'. Tree traversal — the answer for a tree is the answer for the left subtree, plus the answer for the right subtree, plus something at the root. Trivially recursive.\n\nDivide-and-conquer algorithms — mergesort, quicksort, fast Fourier transform. Same recursive shape.\n\nWhen does it NOT fit?\n\nIterative state machines, where you walk through stages with a fixed transition table. Use a loop.\n\nDeep recursive structures with no memoisation, where exponential branching makes the runtime explode. Add memoisation (Day 27 DP) or convert to iteration.\n\nThe rule — recursion is a thinking tool. Use it to UNDERSTAND a problem. Convert to iteration when the production code needs to be deeper than Python's stack allows.",
        hashtags: [...CORE, "#Recursion"],
        image: {
          template: "stat", headline: "1 base + 1 recursive", subhead: "= a recursive function", stat: { number: "2", label: "parts of every recursive function" }, accent: "amber",
          aiPrompt: "Stat poster with infinity-tree glyph, amber, 1:1",
          canvaBrief: "Amber gradient. Big 2. Subhead.",
        },
      },
      {
        id: "d22-p2", day: 22, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "Memoise to turn O(2ⁿ) into O(n)",
        copy: "The classic example of recursion gone wrong is naive Fibonacci.\n\ndef fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\n\nLooks innocent. It's catastrophic. Each call branches into two more calls. Depth n means 2^n leaf calls. fib(40) computes the answer in seconds; fib(50) takes minutes; fib(60) takes hours. Exponential.\n\nThe culprit — fib(38) gets computed billions of times across the recursion tree, by different parent paths. Each one wastes work. We're recomputing answers we already know.\n\nThe fix is one decorator.\n\nimport functools\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\n\nlru_cache wraps the function. Each unique (n,) call caches its result. The next time fib(38) is called, it returns from cache in O(1). Each n from 0 to N is computed once. Total: O(n).\n\nfib(1000) now returns instantly. fib(10000) still works (until you hit Python's recursion limit, which is a separate issue).\n\nThis is the gateway to dynamic programming. Memoised top-down recursion is exactly equivalent to bottom-up DP, just with the recursion handling the dependency order automatically.\n\nThe broader lesson — when recursion has overlapping subproblems (the same input gets computed multiple times by different paths), memoisation drops a Big-O class. When subproblems don't overlap (mergesort, where each call works on a unique sub-array), memoisation does nothing.\n\nKnow how to recognise overlap. Look at the recursion tree. If you'd see the same arguments at different nodes, there's overlap. Memoise. The runtime drops dramatically.",
        hashtags: [...CORE, "#Memoization"],
        image: {
          template: "compare", headline: "fib without vs with memoisation",
          compare: { leftLabel: "Naive O(2ⁿ)", leftItems: ["fib(40) ≈ seconds", "Recomputes everything", "Stack overflows fast", "Don't ship this"], rightLabel: "@lru_cache O(n)", rightItems: ["fib(1000) ≈ instant", "Cached results", "One Python decorator", "Ship this"] },
          accent: "amber",
          aiPrompt: "Compare poster, 1:1",
          canvaBrief: "Split. Grey vs amber. VS badge.",
        },
      },
      {
        id: "d22-p3", day: 22, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "Tree traversals — recursive in 3 lines each",
        copy: "Recursion shines on trees. The structure of a tree IS recursive — each subtree is a smaller tree of the same shape. The traversals follow naturally.\n\nThree classical traversal orders, three tiny functions.\n\nInorder — left subtree, root, right subtree. For binary search trees, inorder traversal yields values in sorted order.\n\nPreorder — root, left subtree, right subtree. Used for cloning trees, expression printing, file-system listing.\n\nPostorder — left subtree, right subtree, root. Used for evaluating expression trees, deleting trees (you delete children before the root), computing properties that depend on subtree results.\n\nLook at the snippet. Three functions, three lines of body each (plus the base case for empty subtree).\n\nEach function returns a list. The recursion combines child results — left subtree's list, then current node, then right subtree's list (for inorder), or whatever order. The base case for None returns an empty list. Combining via list concatenation gives the full traversal.\n\nThis is recursion at its cleanest. The shape of the code matches the shape of the data. There's almost no incidental complexity — no manual stacks, no while-loops, no state tracking.\n\nFor production code, you'd usually use generators (yield from) instead of materialising lists, to keep memory bounded. That's a small refactor — yield each value, yield from each subtree's recursion. Same shape, lazy.\n\nFor very deep trees, recursion hits Python's stack limit (default 1000). Convert to iterative with an explicit stack — same algorithm, different bookkeeping.\n\nFor balanced trees and interview-sized problems, the recursive form is correct, fast, and clear. Code three traversals once; you have the shape forever.",
        hashtags: [...CORE, "#Trees"],
        image: {
          template: "code", headline: "Inorder / Preorder / Postorder",
          code: { language: "python", snippet: "def inorder(node):\n    if not node: return []\n    return inorder(node.left) + [node.val] + inorder(node.right)\n\ndef preorder(node):\n    if not node: return []\n    return [node.val] + preorder(node.left) + preorder(node.right)\n\ndef postorder(node):\n    if not node: return []\n    return postorder(node.left) + postorder(node.right) + [node.val]" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d22-p4", day: 22, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Watch the Python recursion limit",
        copy: "Python's default recursion limit is 1000. The exact number is fine for shallow trees and interview problems; it's a wall for production code that might recurse deep.\n\nSymptoms — RecursionError: maximum recursion depth exceeded in comparison. Usually triggered by:\n\nA deeply nested data structure. JSON with 2000 levels of nesting (uncommon but happens with auto-generated config).\n\nA tree skewed to one side. A sorted-input BST is essentially a linked list and recurses to depth N.\n\nA bug in your base case that causes infinite recursion (until the stack limit catches it).\n\nThree fixes, in order of preference.\n\nFix one — increase the limit if you're confident the recursion is bounded. import sys; sys.setrecursionlimit(10_000). Each frame uses a few KB of stack space, so even 10000 is comfortable on modern machines (10000 * a few KB = a few tens of MB).\n\nFix two — convert to iterative with an explicit stack. Same algorithm, just maintain a list of 'work to do' instead of using the call stack. Tedious but rock solid; no stack limit.\n\nFix three — use yield-based generators with a manual stack. Combines lazy iteration with iterative bookkeeping. Best for tree traversals on large trees in production.\n\nWhat NOT to do — disable the recursion limit entirely or set it to 1 million. Python doesn't optimise tail calls, so deep recursion always uses real stack space. At 1 million frames, you'd OOM long before the function finished.\n\nFor interview problems, recursion is fine. For production code on user-supplied data of unbounded depth, prefer iterative or hybrid solutions. Defensive coding pays off.",
        hashtags: [...CORE, "#PythonGotchas"],
        image: {
          template: "tip", headline: "Python's stack is small",
          bullets: ["Default limit: 1000", "sys.setrecursionlimit(...)", "Or convert to iterative", "Prefer iterative in prod"],
          accent: "amber",
          aiPrompt: "Pro tip card, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP.",
        },
      },
      {
        id: "d22-p5", day: 22, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 22 — recursion, framed correctly",
        copy: "End of Day 22. Week four opens with recursion — the topic that scares freshmen, that beginners overuse, that experienced developers reach for thoughtfully.\n\nWhat we covered.\n\nMorning, the framing. A recursive function has two parts — base case and recursive case. The base case stops the recursion; the recursive case reduces the problem to a smaller version of itself. Use recursion when the problem has natural recursive structure (trees, divide-and-conquer); avoid it for state machines or anything iterative-shaped.\n\nMidday, the gateway from naive recursion to dynamic programming — memoisation. @functools.lru_cache turns exponential recursion into linear by caching subproblem results. Naive Fib is O(2^n); memoised Fib is O(n). The decorator is one line. The speedup is enormous.\n\nAfternoon, three tree traversals (inorder, preorder, postorder) in three lines each. Recursion at its cleanest — the shape of the code matches the shape of the data. Production refinements (generators, iterative versions for deep trees) are small refactors on the same skeleton.\n\nEvening, the Python recursion limit (default 1000) and how to handle it. Increase the limit for confident-bounded recursion. Convert to iterative for unbounded production cases. Don't disable the limit entirely — Python doesn't optimise tail calls, so deep recursion always burns stack.\n\nA broader theme. Recursion is a thinking tool. It often clarifies a problem (this is just a smaller version of itself). For production code, the thinking tool sometimes converts to a loop with an explicit stack — same algorithm, friendlier to limits.\n\nTomorrow, Day 23, binary search. Beyond 'find an element in a sorted array' — patterns for finding boundaries, searching the answer space, parametric search.\n\nSee you in the morning.",
        hashtags: [...CORE, "#Recursion"],
        image: {
          template: "quote", headline: "Recursion = problem ⊃ smaller problem.", subhead: "Add a base case. Trust the stack.", accent: "amber",
          aiPrompt: "Pastel amber quote, 1:1",
          canvaBrief: "Pastel amber quote card.",
        },
      },
    ],
  },

  /* DAY 23 */
  {
    day: 23, theme: "Binary search — beyond find-an-element", pillar: "dsa",
    posts: [
      {
        id: "d23-p1", day: 23, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "Binary search isn't only for sorted arrays",
        copy: "Most people learn binary search as 'find a number in a sorted list'. That's level one. The deeper power comes when you realise binary search applies to ANY decision space where the answer is monotonic.\n\nMonotonic means — once a value satisfies your condition, all larger values do too (or all smaller, depending on direction). The condition flips exactly once across the range, and you binary-search that flip point.\n\nExamples that don't look like 'sorted array search':\n\nFind the smallest x such that f(x) is true. The classic 'first true' problem. As long as f is monotonic — false, false, false, true, true, true — binary search finds the boundary in O(log n).\n\nFind the largest k such that we can fit k items. Capacity problems, scheduling problems. Try k; if it fits, try larger; if it doesn't, try smaller.\n\nFind the minimum capacity that achieves target throughput. Try a capacity, simulate, check if target met. Adjust binary-style.\n\nThis is the 'binary search the answer' technique. The search space isn't the input array — it's the space of possible answers. The condition function is whatever 'is this answer feasible' looks like. The runtime is O(log(range) * cost_of_feasibility_check).\n\nReal-world examples in ML — find the smallest learning rate that doesn't diverge. Find the largest batch size that fits in GPU memory. Find the threshold that gives target precision. All of these have monotonic feasibility.\n\nThe pattern beats brute-force linear search by orders of magnitude when the search space is large. log(10^9) is 30. Linear scan of 10^9 is forever. Same correctness, vastly faster.\n\nKnow this and you'll spot binary-search problems where most people don't.",
        hashtags: [...CORE, "#BinarySearch"],
        image: {
          template: "stat", headline: "O(log n)", subhead: "If the answer is monotonic.", stat: { number: "log n", label: "what binary search really buys you" }, accent: "amber",
          aiPrompt: "Stat poster, amber, 1:1",
          canvaBrief: "Amber gradient. Big log n.",
        },
      },
      {
        id: "d23-p2", day: 23, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "bisect — Python's built-in binary search",
        copy: "Python's standard library has a binary-search module: bisect. Most developers either don't know it or roll their own. Don't roll your own.\n\nbisect_left(arr, target) returns the index where target would be inserted to keep arr sorted, with target inserted BEFORE any equal entries. If target equals arr[i], it returns i.\n\nbisect_right(arr, target) does the same but inserts AFTER any equal entries. If target equals arr[i], it returns i+1.\n\nWhen to use which:\n\nFind the index of target in a sorted array — bisect_left. If arr[bisect_left(arr, target)] == target, found. Otherwise, not present.\n\nInsert target while keeping the array sorted — bisect.insort(arr, target). Internally uses bisect to find the position, then list.insert. O(log n) for the search, O(n) for the insert (shifting elements). Total O(n), but in tight loops the search portion saves time vs linear scan.\n\nCount items in [low, high) range — bisect_right(arr, high) - bisect_left(arr, low). Sweet trick for range counts on a static sorted array.\n\nFind first element ≥ target — bisect_left.\nFind first element > target — bisect_right.\n\nDon't roll your own binary search if bisect fits. It's correct, it's in C inside CPython, and millions of users have hammered on it. Hand-rolled binary searches are a notorious source of off-by-one bugs (more on this in the evening post).\n\nThe few cases where you DO need a custom search — when you're searching the answer space (yesterday's morning concept), where the 'array' is conceptual and you're calling a feasibility function. Then you write the loop yourself.\n\nFor sorted arrays — bisect.",
        hashtags: [...CORE, "#PythonStdlib"],
        image: {
          template: "list", headline: "bisect — 4 patterns",
          bullets: ["bisect_left(arr, x)", "bisect_right(arr, x)", "insort(arr, x) — sorted insert", "Range count = right - left"],
          accent: "amber",
          aiPrompt: "List poster, amber, 1:1",
          canvaBrief: "White grid, 4 rows.",
        },
      },
      {
        id: "d23-p3", day: 23, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "Binary search on the answer",
        copy: "Classic interview problem — given weights of packages and D days, find the minimum capacity that ships all packages within D days. Each day's load is a contiguous prefix of the remaining packages.\n\nNaive — try every capacity. Slow. Capacities range from max(weights) to sum(weights), which could be enormous.\n\nKey insight — the feasibility function is monotonic. If capacity C works, any capacity > C also works (you can always pack less per day). So we binary-search the capacity.\n\nLook at the snippet. The feasible function takes a capacity, simulates the packing day by day, and returns whether it finishes within D days.\n\nThe outer loop is binary search. lo = max(weights) (must fit largest single package), hi = sum(weights) (always works in 1 day). We find the smallest capacity that's feasible.\n\nLogic — if mid is feasible, the answer is at most mid; set hi = mid. If not feasible, the answer is at least mid+1; set lo = mid+1. Stop when lo == hi.\n\nReturn lo (which equals hi at termination) — that's the smallest feasible capacity.\n\nComplexity — O(log(sum) * n) where sum is the search range and n is the number of packages. log(sum) is ~30 for typical inputs. n is the simulation cost per check. Total is barely worse than a single linear pass.\n\nThis pattern — feasibility(x) is monotonic, binary-search for the smallest feasible x — is one of the most powerful tools in DSA. Once you can spot it, you'll see it everywhere — rate limiters, capacity planners, hyperparameter tuning bounds, k-means initialisation seeds.\n\nThe code is small. The conceptual leap (binary search the ANSWER, not the array) is the unlock.",
        hashtags: [...CORE, "#BinarySearch"],
        image: {
          template: "code", headline: "Binary search the answer",
          code: { language: "python", snippet: "def ship_within_days(weights, D):\n    def feasible(cap):\n        days, load = 1, 0\n        for w in weights:\n            if load + w > cap:\n                days += 1\n                load = 0\n            load += w\n        return days <= D\n    lo, hi = max(weights), sum(weights)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if feasible(mid):\n            hi = mid\n        else:\n            lo = mid + 1\n    return lo" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d23-p4", day: 23, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Off-by-one — the binary search killer",
        copy: "The two binary-search bugs that cause 90% of failures, and the canonical template that avoids both.\n\nBug one — wrong loop condition. 'while lo < hi' versus 'while lo <= hi'. Choose based on whether your range bounds are inclusive or exclusive.\n\nBug two — wrong update. 'lo = mid' instead of 'lo = mid + 1' creates an infinite loop when mid hits the boundary value.\n\nBoth bugs come from inconsistent invariants. The fix is to pick ONE invariant and stick to it religiously.\n\nMy template — half-open ranges. lo is inclusive (the smallest possible answer is at lo or higher). hi is exclusive (the answer is strictly less than hi). Range is [lo, hi).\n\nLoop condition — while lo < hi. (When lo == hi, the range is empty, we stop.)\n\nUpdate — either lo = mid + 1 or hi = mid. Never lo = mid (would loop forever) or hi = mid - 1 (would skip the answer).\n\nReturn — lo (which equals hi at termination).\n\nThis template handles every binary-search variant correctly:\n\nFirst element ≥ target — feasible(x) means arr[x] >= target. Find smallest feasible.\n\nFirst element > target — feasible(x) means arr[x] > target. Find smallest feasible.\n\nBinary-search the answer — feasible(x) is the monotonic condition. Find smallest feasible.\n\nMemorise the four lines:\n\nlo, hi = ..., ... + 1\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if feasible(mid): hi = mid\n    else: lo = mid + 1\n\nUse this template every time. Stop debugging off-by-one. Most binary-search bugs are just inconsistency between the loop condition, the range semantics, and the update rule. Pick one set; stay consistent.",
        hashtags: [...CORE, "#BinarySearch"],
        image: {
          template: "tip", headline: "Binary search template — memorise",
          bullets: ["Half-open [lo, hi)", "while lo < hi", "lo = mid + 1 OR hi = mid", "Never lo = mid"],
          accent: "amber",
          aiPrompt: "Pro tip card, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP.",
        },
      },
      {
        id: "d23-p5", day: 23, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 23 — log n on any monotonic answer",
        copy: "End of Day 23. Binary search done.\n\nWhat we covered.\n\nMorning, the realisation that binary search isn't just for sorted arrays — it's for any decision space where the answer is monotonic. Find the smallest capacity, find the largest k, find the threshold. Same pattern; the 'array' is conceptual.\n\nMidday, Python's bisect module. Standard library, in C, used everywhere. bisect_left, bisect_right, insort. The patterns for find-target, sorted-insert, range-count.\n\nAfternoon, the 'binary search the answer' technique on the ship-within-days problem. Feasibility is monotonic; binary-search the capacity; O(log(range) * n).\n\nEvening, the canonical binary-search template. Half-open [lo, hi), while lo < hi, lo = mid+1 or hi = mid. Memorise this and stop fighting off-by-one bugs. Almost every binary-search bug is inconsistency in the invariants.\n\nA broader theme. The 'binary search the answer' pattern is one of the most powerful pieces in the DSA toolkit. It comes up constantly in real ML/data work — sweep a learning rate, tune a threshold, pick a batch size. Recognising the pattern (monotonic feasibility) and reaching for it is the skill.\n\nTomorrow, Day 24, sorting. Why Python's default is timsort. When to use heapq instead of sorting. Stable vs unstable sorts and why stability matters. Plus the 'don't sort to compute one stat' tip that saves real time.\n\nSee you in the morning.",
        hashtags: [...CORE, "#BinarySearch"],
        image: {
          template: "quote", headline: "If it's monotonic, binary-search the answer.", subhead: "Half-open. lo<hi. Done.", accent: "amber",
          aiPrompt: "Pastel amber quote, 1:1",
          canvaBrief: "Pastel amber quote card.",
        },
      },
    ],
  },

  /* DAY 24 */
  {
    day: 24, theme: "Sorting — knowing what Python actually does", pillar: "dsa",
    posts: [
      {
        id: "d24-p1", day: 24, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "Python's sort is timsort. It's stable.",
        copy: "When you call sorted() or list.sort() in Python, you're invoking timsort — an algorithm specifically designed for real-world data. Three properties matter.\n\nO(n log n) worst case. Same as mergesort, heapsort, quicksort (on average). Asymptotically optimal for comparison-based sorting.\n\nO(n) on already-sorted or nearly-sorted data. This is timsort's special skill. Real data often has runs of already-sorted segments — timsort detects them and merges efficiently. On an already-sorted list, it's literally linear time.\n\nStable. Equal keys retain their original relative order. This matters more than people realise.\n\nWhy stability matters. Suppose you have a list of (city, score) pairs, and you want to sort first by city, then within each city by score descending.\n\nWith stable sort — sort by score (descending) first. Then sort by city. Within each city, the original order (which is now score-descending) is preserved. Done in two passes.\n\nWith unstable sort — second sort might disturb the score order within a city. You'd need a tuple key to do both at once, which is more code.\n\nPython guarantees timsort stability. Most other languages don't — C++ std::sort is unstable; you have to ask for std::stable_sort. Java's Arrays.sort on objects is stable; on primitives it's not. Knowing your language's default matters.\n\nA related guarantee — timsort is 'natural'. Reverse-sorted data is also fast (it detects descending runs and reverses them). Mostly-sorted with a few out-of-place elements is fast.\n\nFor your code — sorted() and list.sort() are almost always the right answer. The few cases they're not: when you only need top-k (use heapq), when you need to maintain a sorted collection across many inserts (use sortedcontainers), when stability would actively bite you (rare, but exists in some specialised algorithms).\n\nKnow what your sort does.",
        hashtags: [...CORE, "#Sorting"],
        image: {
          template: "stat", headline: "timsort", subhead: "stable, O(n log n), built-in", stat: { number: "O(n log n)", label: "Python's sort is stable timsort" }, accent: "amber",
          aiPrompt: "Stat poster, amber, 1:1",
          canvaBrief: "Amber gradient. Big O(n log n).",
        },
      },
      {
        id: "d24-p2", day: 24, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "Sort by anything with key=",
        copy: "Python's sorted() and list.sort() take a key= argument. The key is a function called once per element, producing the sort key for that element. Python sorts by the keys, not by the original elements.\n\nsorted(students, key=lambda s: s.score)\n\nThis sorts students by their score attribute. The lambda is called once per student; Python uses the resulting numbers to order the list.\n\nKey functions enable arbitrary sort orders without writing comparator functions (which Python doesn't really support — cmp_to_key exists but is rarely the right tool).\n\nCommon patterns:\n\nSort by an attribute — key=lambda s: s.score, or key=operator.attrgetter('score') for a slight speed bump.\n\nSort case-insensitively — key=str.lower. Each string is lowercased once for sort comparison; the original strings are returned.\n\nSort by multiple keys — key=lambda s: (s.team, -s.score). Tuple comparison is lexicographic. First sort by team, ties broken by score descending. The negation flips the sort direction for that key only.\n\nSort by a complex computation — key=lambda x: complex_function(x). The function is called n times total (not n*log n), so even slow keys are tolerable.\n\nReverse sort — sorted(items, reverse=True). Or, equivalently, key=lambda x: -x for numeric keys.\n\nDescending on one key, ascending on another — tuple key with negation on the descending one.\n\nWhat NOT to do — chain multiple .sort() calls expecting the second to refine the first. It works (because timsort is stable) but it's slower than a single tuple-key sort.\n\nThe key= parameter plus tuple keys covers 99% of real sorts you'll write. Reach for cmp_to_key only for genuinely non-key-shaped comparisons (rare).",
        hashtags: [...CORE, "#PythonSort"],
        image: {
          template: "list", headline: "Sort patterns you'll reuse",
          bullets: ["key=lambda x: x.attr", "key=str.lower", "Tuple key for multi-sort", "Negate for descending"],
          accent: "amber",
          aiPrompt: "List poster, amber, 1:1",
          canvaBrief: "White grid, 4 rows.",
        },
      },
      {
        id: "d24-p3", day: 24, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "Top-k with heapq, not full sort",
        copy: "Need the top 10 of a billion items? Don't sort the billion.\n\nFull sort is O(n log n). For n = 10^9, that's 30 billion ops. Even if each op takes a nanosecond, you're at 30 seconds. And you need to hold the entire billion in memory.\n\nA min-heap of size k gives you top-k in O(n log k). For k = 10, log k = 3.3. For n = 10^9, total work is ~3.3 billion ops. Ten times faster, and memory is bounded by k, not n.\n\nPython's heapq makes this easy.\n\nimport heapq\n\ntop10 = heapq.nlargest(10, items, key=lambda x: x.score)\n\nOne function call. heapq.nlargest maintains a min-heap of size k as it walks the iterable, kicking out the smallest item when a larger one comes in. At the end, the heap contains the top-k. It returns them sorted (largest first).\n\nFor streaming data — items arriving one at a time, you can't materialise the full list — use the heap directly:\n\nheap = []\nfor item in stream:\n    if len(heap) < k:\n        heapq.heappush(heap, (item.score, item))\n    else:\n        heapq.heappushpop(heap, (item.score, item))\n\nheappushpop pushes a new item AND pops the smallest, in one operation. Slightly more efficient than push-then-pop. The heap stays at size k.\n\nWhen this matters — recommendation systems (top-k similar items), search ranking (top-k results), trending topics (top-k counts), top-K loss in classification. Anywhere you need top elements without the full sort.\n\nAlso — heapq.nsmallest for the inverse problem. heapq.merge for streaming-merge of multiple sorted iterables. Smaller features, same module, all standard library.\n\nWhen full-sort is overkill, heapq is the tool.",
        hashtags: [...CORE, "#PythonStdlib"],
        image: {
          template: "code", headline: "heapq.nlargest — streaming top-k",
          code: { language: "python", snippet: "import heapq\n\n# Top-10 highest-scored docs\ntop = heapq.nlargest(10, docs, key=lambda d: d.score)\n\n# Online: keep a min-heap of size 10\nheap = []\nfor doc in stream:\n    if len(heap) < 10:\n        heapq.heappush(heap, (doc.score, doc))\n    else:\n        heapq.heappushpop(heap, (doc.score, doc))" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d24-p4", day: 24, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Don't sort to find the median",
        copy: "Common pattern that's slower than it should be — sort the array, take the middle element, return as median.\n\nO(n log n). Wasteful when you only need ONE statistic from the data.\n\nBetter approach — quickselect. O(n) average. Selects the k-th smallest element by partitioning, like quicksort but only recursing into the side containing k. Median is k = n/2.\n\nIn Python, you don't write quickselect by hand. Use:\n\nimport statistics\nstatistics.median(data)\n\nstatistics.median uses an efficient algorithm under the hood. Same with statistics.quantiles for arbitrary percentiles.\n\nFor really large data — t-digest sketches give approximate quantiles in O(n) time and bounded memory, even for streaming data. Libraries: datasketch (Python), tdigest (Python), or use tools like Apache Druid that have it built in.\n\nThe broader principle — don't compute more than you need. Sorting an array materialises the entire ordering. If you only need the median, the top-k, the count of elements > threshold, or any other partial statistic, there's almost always a faster algorithm.\n\nExamples:\n\nMin / max — O(n) with builtin min() / max(). Don't sort first.\n\nTop-k — O(n log k) with heapq. Don't sort first.\n\nMedian — O(n) with statistics.median. Don't sort first.\n\nCount of elements satisfying a predicate — O(n) with sum(1 for x in data if pred(x)). Don't sort first.\n\nIs every element distinct — O(n) with len(set(data)) == len(data). Don't sort first.\n\nThe 'don't compute more than you need' principle saves more time in real Python code than algorithmic optimisations on the actual computation. Lazy when you can; full-compute only when you must.",
        hashtags: [...CORE, "#Statistics"],
        image: {
          template: "tip", headline: "Don't sort to find one stat",
          bullets: ["statistics.median(data) — O(n)", "quickselect for k-th — O(n) avg", "t-digest for streams", "sorted is overkill"],
          accent: "amber",
          aiPrompt: "Pro tip card, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP.",
        },
      },
      {
        id: "d24-p5", day: 24, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 24 — sort smart, not big",
        copy: "End of Day 24. Sorting and selection done.\n\nWhat we covered.\n\nMorning, Python's sort is stable timsort. O(n log n) worst case, O(n) on already-sorted data. Stability lets you do multi-pass sorts where each later pass refines the previous.\n\nMidday, the key= parameter and tuple keys for arbitrary sort orders. Sort by attribute, sort case-insensitively, sort by multiple keys with mixed directions. Covers 99% of real sorts.\n\nAfternoon, heapq for top-k. O(n log k) instead of O(n log n). Saves dramatic time and memory when k is small relative to n. heapq.nlargest is the easy interface; the streaming heap pattern handles online data.\n\nEvening, the broader principle — don't compute more than you need. statistics.median for medians. min/max for extremes. set membership for distinctness. Sorting is overkill for one-stat queries.\n\nA pattern across the day. Many algorithmic 'wins' come from picking the right tool for the actual question. If the question is 'find the median', the sort algorithm doesn't matter — the right algorithm is quickselect or median-of-medians, which is linear. If the question is 'find top-k', the right tool is a heap, not a sort. Recognising the question is half the optimisation.\n\nTomorrow, Day 25, trees. BFS, DFS, and the structure that ML loves (decision trees, parse trees, abstract syntax trees, file systems). The DFS recursive vs iterative tradeoff. Plus a bonus introduction to tries — the structure for fast prefix matching.\n\nSee you in the morning.",
        hashtags: [...CORE, "#Sorting"],
        image: {
          template: "quote", headline: "Stable + keyed.", subhead: "That's 99% of sorts.", accent: "amber",
          aiPrompt: "Pastel amber quote, 1:1",
          canvaBrief: "Pastel amber quote card.",
        },
      },
    ],
  },

  /* DAY 25 */
  {
    day: 25, theme: "Trees — BFS, DFS, and why ML loves them", pillar: "dsa",
    posts: [
      {
        id: "d25-p1", day: 25, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "A tree is a graph without cycles",
        copy: "Trees are everywhere in computer science. File systems. HTML's DOM. Decision trees and random forests in ML. Heaps. Tries. Parser ASTs. JSON's nested objects. Categorisation hierarchies.\n\nThe formal definition — a connected acyclic graph. Connected means every node is reachable from every other. Acyclic means no loops. From these two properties, you get exactly n-1 edges in any tree of n nodes. (Any more and you'd have a cycle; any fewer and you'd be disconnected.)\n\nThe vocabulary you'll use:\n\nRoot — the node we start from. Trees are typically rooted, even though graphs in general aren't.\n\nNode — any entry in the tree. Has an optional value, optional children (other nodes), and optionally a parent pointer.\n\nLeaf — a node with no children.\n\nInternal node — a node with at least one child. Includes the root if the tree has more than one node.\n\nDepth — distance from root to a node, measured in edges.\n\nHeight — depth of the deepest leaf in the subtree.\n\nBalanced tree — height stays around O(log n). Insertions and deletions stay fast.\n\nUnbalanced tree — height can be O(n). Degenerates to a linked list. Operations slow to O(n).\n\nIn ML, trees show up most prominently in decision trees and ensembles (random forests, gradient boosting). Each internal node is a split decision (feature X < threshold). Each leaf is a prediction. The tree's depth controls overfitting — too deep memorises training data; too shallow underfits.\n\nMost tree problems boil down to 'walk the tree in some order, do something at each node'. The walking algorithm is BFS or DFS (covered next). The 'something' is the problem-specific logic.\n\nLearn the traversals. Most tree problems become tractable.",
        hashtags: [...CORE, "#Trees"],
        image: {
          template: "stat", headline: "tree = acyclic, connected", subhead: "n nodes → n-1 edges, exactly", stat: { number: "n-1", label: "edges in any tree of n nodes" }, accent: "amber",
          aiPrompt: "Stat poster with binary-tree glyph, amber, 1:1",
          canvaBrief: "Amber gradient. Big n-1.",
        },
      },
      {
        id: "d25-p2", day: 25, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "DFS recursion vs iteration",
        copy: "Two ways to depth-first search a tree. Both visit every node; both run in O(n) time and O(h) space (where h is height). They differ in HOW they manage the bookkeeping.\n\nRecursive DFS:\n\ndef dfs(n):\n    if n is None: return\n    visit(n)\n    dfs(n.left)\n    dfs(n.right)\n\nThree lines. Reads as English. The call stack handles the bookkeeping — each call gets its own frame, returning unwinds the stack, the recursion mirrors the tree's structure.\n\nIterative DFS:\n\nstack = [root]\nwhile stack:\n    n = stack.pop()\n    if n is None: continue\n    visit(n)\n    stack.append(n.right)   # right first, so left pops first\n    stack.append(n.left)\n\nMore lines. We maintain an explicit stack of nodes to visit. Pop one off, visit it, push its children (right before left, so left pops first — pre-order).\n\nWhich to use?\n\nRecursive is cleaner for balanced trees and interview problems. The code is shorter and matches the tree's recursive structure.\n\nIterative is required for production code on potentially deep trees. Python's default recursion limit is 1000. A skewed tree (effectively a linked list) of depth 5000 will RecursionError. Iterative has no such limit; the explicit stack lives on the heap, which is much bigger than Python's stack.\n\nFor file-system traversals, large LLM token streams, or any user-supplied data of unbounded depth — iterative.\n\nFor balanced binary trees up to depth ~1000 — recursive.\n\nA hybrid — recursive with @sys.setrecursionlimit increased to a reasonable number (say 10000). Combines clean code with reasonable headroom. Acceptable for trees you have control over.\n\nBoth approaches visit nodes in the same order (for pre-order specifically). Same algorithm, different implementations of the bookkeeping.",
        hashtags: [...CORE, "#DFS"],
        image: {
          template: "compare", headline: "DFS — recursive vs iterative",
          compare: { leftLabel: "Recursive", leftItems: ["3 lines", "Uses call stack", "Stack overflow risk", "Cleanest read"], rightLabel: "Iterative", rightItems: ["Explicit stack", "No depth limit", "Slightly more code", "Production-safe"] },
          accent: "amber",
          aiPrompt: "Compare poster, 1:1",
          canvaBrief: "Split. Grey vs amber.",
        },
      },
      {
        id: "d25-p3", day: 25, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "Level-order traversal in 12 lines",
        copy: "Breadth-first search on a tree gives you level-order traversal. Useful for problems like 'right-side view', 'level-by-level averages', 'zigzag traversal', 'serialize a tree'.\n\nThe shape uses a deque (yesterday's lesson — list.pop(0) is O(n); deque.popleft is O(1)). For each level, we know how many nodes are in the queue (it's len(q) before we start the inner loop). Process exactly those, push their children, move to the next level.\n\nLook at the snippet. The outer while-loop iterates levels. The 'for _ in range(len(q))' inner loop processes exactly this level — even though we're appending children to the queue inside the loop, we only iterate the original count, so children are processed in the next outer iteration.\n\nThe key trick — taking len(q) at the start of each outer iteration. Without this, the inner loop would consume children at this level along with the parents, and you'd lose the level boundary.\n\nReturn structure — a list of lists, one inner list per level. Adapts easily to other questions:\n\nRight-side view — within each level, take the LAST node's value.\n\nLevel averages — within each level, sum and divide by count.\n\nZigzag — within each level, reverse the order on even-indexed levels.\n\nMaximum value per level — within each level, take max.\n\nThe code structure stays the same. Specialise the per-level reduction.\n\nTime complexity — O(n) total, every node visited once. Space complexity — O(w) where w is the maximum width of the tree, which is bounded by n in the worst case (a complete tree's last level has n/2 nodes).\n\nLevel-order is BFS adapted to trees. The same template appears in graph problems (Day 26).",
        hashtags: [...CORE, "#BFS"],
        image: {
          template: "code", headline: "Level-order BFS",
          code: { language: "python", snippet: "from collections import deque\n\ndef level_order(root):\n    if not root: return []\n    q = deque([root])\n    out = []\n    while q:\n        level = []\n        for _ in range(len(q)):\n            n = q.popleft()\n            level.append(n.val)\n            if n.left: q.append(n.left)\n            if n.right: q.append(n.right)\n        out.append(level)\n    return out" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d25-p4", day: 25, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Tries — the data structure for prefix searches",
        copy: "If your application does many 'starts-with' queries on a fixed dictionary of strings — autocomplete, spellcheck, IP routing — a trie outperforms anything else.\n\nA trie (pronounced 'try', from re-trie-val) is a tree where each edge is a character, and each path from root to a node spells a prefix. Strings end at marked 'end-of-word' nodes.\n\nSearching for 'a string starts with prefix P' is O(len(P)). Walk down the trie following P's characters; if you can, the prefix exists; if at any point the edge isn't there, the prefix doesn't exist. CRUCIALLY — independent of dictionary size. A trie with one million strings answers the same prefix query in the same time as one with one thousand.\n\nUse cases beyond autocomplete:\n\nSpellcheck. Maintain a trie of valid words. Walk the input character by character; suggest corrections when paths fail.\n\nIP routing tables. Each prefix is an IP block. Routers use compressed tries (Patricia tries) for O(1) prefix matching at line speed.\n\nFastest token-prefix matching for tokenisers. Some BPE implementations use tries for matching the longest prefix.\n\nUnique prefix detection. Find the shortest prefix that uniquely identifies each string in a set. Useful for compressed code generation.\n\nIn Python, tries are easy to roll. Use a dict of dicts where each level represents a character. End-of-word marked with a sentinel ('_end' or similar).\n\nFor production, use marisa-trie (compact, immutable, very fast). For prototyping, hand-rolled is fine.\n\nMost developers go their whole career without writing a trie because their problems don't need them. When you DO need 'starts-with' queries on a dictionary, no other structure comes close.",
        hashtags: [...CORE, "#Trie"],
        image: {
          template: "tip", headline: "Trie — O(L) prefix lookup",
          bullets: ["Each edge = a character", "Each path = a prefix", "End-of-word marker", "Autocomplete, spellcheck, routing"],
          accent: "amber",
          aiPrompt: "Pro tip card with trie illustration, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP. Trie glyph faded.",
        },
      },
      {
        id: "d25-p5", day: 25, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 25 — trees, taught by traversal",
        copy: "End of Day 25. Trees are the structure that bridges DSA into both ML (decision trees, random forests) and systems work (file systems, parsers, ASTs).\n\nWhat we covered.\n\nMorning, the formal foundation. A tree is a connected acyclic graph. n nodes, exactly n-1 edges. Vocab — root, leaf, depth, height, balance. ML applications include decision trees and ensembles, where balance and depth control overfitting.\n\nMidday, DFS recursive vs iterative. Same algorithm, different bookkeeping. Recursive is clean for interview-sized problems; iterative is required for production code on unbounded-depth data.\n\nAfternoon, the level-order BFS template in 12 lines. Process exactly len(q) nodes per outer iteration; that gives you the level boundary. Same template adapts to right-side view, level averages, zigzag, max-per-level.\n\nEvening, tries as the structure for prefix queries. O(L) per query, independent of dictionary size. Use cases — autocomplete, spellcheck, IP routing, tokeniser prefixes. Most engineers go years without writing one; when you need it, nothing else compares.\n\nA broader thought. Trees are the right structure for hierarchical data, and most hierarchical data is more common than people realise. Decision trees, parse trees, file systems, JSON — all trees. Mastering tree traversals is the foundation that makes graphs (tomorrow) tractable.\n\nTomorrow, Day 26, graphs. Adjacency lists, BFS for shortest path, Dijkstra for weighted shortest path, topological sort for dependency resolution. The most-used data model in computer science.\n\nSee you in the morning.",
        hashtags: [...CORE, "#Trees"],
        image: {
          template: "quote", headline: "Trees teach traversal.", subhead: "Master traversal. Master half of DSA.", accent: "amber",
          aiPrompt: "Pastel amber quote, 1:1",
          canvaBrief: "Pastel amber quote card.",
        },
      },
    ],
  },

  /* DAY 26 */
  {
    day: 26, theme: "Graphs — the universal data model", pillar: "dsa",
    posts: [
      {
        id: "d26-p1", day: 26, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "Adjacency list — the only graph rep you need most days",
        copy: "Three ways to represent a graph in code. Each makes different operations cheap.\n\nOne — adjacency list. A dict (or list of lists) mapping each node to its neighbours. graph[node] returns the list of neighbours. Memory O(V + E). Iteration over neighbours is fast. Edge existence check is O(degree). Default for sparse graphs (most real graphs).\n\nTwo — adjacency matrix. An n×n boolean (or weight) array. matrix[u][v] is true if there's an edge from u to v. Memory O(V²). Edge existence is O(1). Iteration over neighbours is O(V) — you scan the row. Useful when graphs are dense (close to n² edges) or you query edge existence frequently.\n\nThree — edge list. A list of (u, v) pairs. Memory O(E). Iteration over all edges is fast. Iteration over neighbours of a single node is O(E) — slow. Useful for algorithms that process all edges (Kruskal's MST), almost never for traversal.\n\nFor the 99% of practical graph work — adjacency list, with defaultdict(list).\n\nfrom collections import defaultdict\n\ngraph = defaultdict(list)\nfor u, v in edges:\n    graph[u].append(v)\n    graph[v].append(u)   # undirected\n\nNow graph[node] is the neighbour list. Iteration is fast. Memory matches the actual edge count.\n\nReal-world graphs are almost always sparse. Social networks have average degree maybe 200, on networks of millions of users — way fewer than V² edges. Adjacency list is right.\n\nThe rare cases for matrix — small dense graphs (V < 1000), all-pairs shortest paths algorithms (Floyd-Warshall), or when edge-existence queries dominate. Otherwise adjacency list.\n\nLearn one rep well. Most algorithms (BFS, DFS, Dijkstra, topological sort) work directly on adjacency lists.",
        hashtags: [...CORE, "#Graphs"],
        image: {
          template: "list", headline: "Graph reps — pick by density",
          bullets: ["Adjacency list — default", "Adjacency matrix — dense graphs", "Edge list — simple, slow traversal", "defaultdict(list) is your friend"],
          accent: "amber",
          aiPrompt: "Graph-network glyph infographic, amber, 1:1",
          canvaBrief: "White grid, 4 rows. Graph-net glyph corner faded.",
        },
      },
      {
        id: "d26-p2", day: 26, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "BFS gives shortest path on unweighted graphs",
        copy: "Here's a beautiful property of breadth-first search — on an unweighted graph (or a graph where all edges have the same weight), BFS finds the shortest path from source to every reachable node.\n\nWhy? BFS uses a queue. Nodes leave the queue in distance-from-source order, because each node enters the queue when it's first reached, and 'first reached' means 'shortest distance found'. The first time you reach a node is via the shortest path.\n\nProof sketch — when BFS pops a node u at distance d, every node at distance < d has already been popped. Every neighbour of u is at distance ≤ d+1. They're added to the queue if not seen. The next pop is at distance d or d+1. Distance never decreases as you pop. When you reach the target node, you've reached it via the shortest path.\n\nFor weighted graphs (different edge costs), BFS doesn't work. Counterexample — if edge AB has cost 5 and edge AC has cost 1 and edge CB has cost 1, BFS reaches B in 1 hop via the direct edge (cost 5), but the actual shortest path A→C→B has cost 2. Two hops, but cheaper.\n\nFor weighted graphs, you need Dijkstra (next post — same shape as BFS, but with a min-heap instead of a queue).\n\nThe practical recipe. Got 'find shortest path / fewest steps / minimum hops' on an unweighted graph or grid? Use BFS. Add a 'distance' dict to track distances; add a 'parent' dict to reconstruct the path.\n\nGrid problems are unweighted graphs in disguise. Each cell is a node; cardinal neighbours are edges. Maze solvers, num-islands, knight's tour, word ladder — all BFS on a graph constructed from the input.\n\nThe BFS template from Day 20 is the implementation. The shortest-path application is the most important payoff.",
        hashtags: [...CORE, "#BFS"],
        image: {
          template: "stat", headline: "BFS = shortest path", subhead: "On unweighted graphs", stat: { number: "BFS", label: "= shortest distance, no weights needed" }, accent: "amber",
          aiPrompt: "Stat poster, amber, 1:1",
          canvaBrief: "Amber gradient. Big BFS.",
        },
      },
      {
        id: "d26-p3", day: 26, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "Dijkstra in 16 lines",
        copy: "Dijkstra finds the shortest path from a source to every reachable node in a graph with non-negative edge weights. Generalisation of BFS — the queue becomes a min-heap, sorted by distance from source.\n\nThe algorithm:\n\n1. dist[src] = 0; all others = infinity.\n2. Min-heap holds (distance, node) pairs. Start with (0, src).\n3. Pop the smallest-distance node u. If you've already found a shorter path, skip.\n4. For each neighbour v of u, the candidate distance is dist[u] + weight(u,v). If shorter than dist[v], update dist[v] and push (new_dist, v) onto the heap.\n5. Repeat.\n\nLook at the snippet. dist tracks current shortest distances. pq is the min-heap (Python's heapq is a min-heap by default). The 'if d > dist[u]: continue' line skips stale entries — the heap may contain old (longer) distance entries from before we found shorter routes.\n\nComplexity — O((V + E) log V) with a binary heap. For sparse graphs, this is dramatically faster than the matrix-based Dijkstra (O(V²)).\n\nWhere it's used:\n\nMap routing. Edges are roads with travel time as weights. Source is your location; destination is the target. Standard implementation in Google Maps, OpenStreetMap routing engines.\n\nNetwork routing protocols. Edges are network links with latency or hop counts as weights.\n\nEvent-driven simulations where 'cheapest event next' drives the schedule.\n\nDependencies between tasks where some take longer than others.\n\nDijkstra requires non-negative edge weights. For graphs with negative edges, use Bellman-Ford (slower, O(VE)). For all-pairs shortest paths on dense graphs, Floyd-Warshall (O(V³)).\n\nFor 95% of weighted shortest-path problems, Dijkstra is the answer.",
        hashtags: [...CORE, "#Dijkstra"],
        image: {
          template: "code", headline: "Dijkstra — heap-based shortest path",
          code: { language: "python", snippet: "import heapq\nfrom math import inf\n\ndef dijkstra(graph, src):\n    dist = {n: inf for n in graph}\n    dist[src] = 0\n    pq = [(0, src)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]:\n            continue\n        for v, w in graph[u]:\n            nd = d + w\n            if nd < dist[v]:\n                dist[v] = nd\n                heapq.heappush(pq, (nd, v))\n    return dist" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d26-p4", day: 26, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Topological sort — the dependency-order algorithm",
        copy: "When you have tasks with dependencies (A must finish before B; B must finish before C; D depends on A; etc), topological sort gives you a valid execution order.\n\nThe Kahn's algorithm version is the cleanest:\n\n1. Compute the in-degree of every node (number of incoming edges).\n2. Find all nodes with in-degree 0. These have no dependencies; add them to a queue.\n3. While the queue isn't empty: pop a node, add it to the output, decrement the in-degree of all its successors. If any successor's in-degree drops to 0, add it to the queue.\n4. If the output contains all n nodes, you have a valid topological order. If not, there's a cycle in the graph — no valid order exists.\n\nO(V + E). Linear in the graph size.\n\nWhere it's used:\n\nBuild systems. Make, Bazel, Cargo all topologically sort the dependency graph to decide compile order.\n\nPackage managers. pip, npm, apt resolve dependency order with topo sort.\n\nCourse scheduling. CS101 before CS201, CS201 before CS301 — toposort gives a valid order.\n\nML training pipelines. Feature pipeline → preprocessing → training → evaluation. Each stage depends on the previous; toposort handles arbitrary DAGs.\n\nSpreadsheet recalculation. Cell A depends on cell B; topo-sort the dependency graph and recompute in order.\n\nThe cycle-detection property is also useful. If the algorithm can't finish (some nodes have in-degree > 0 at the end), there's a cycle. Detecting a cycle in a directed graph is exactly what 'fails to topologically sort' tells you.\n\nDFS-based topo sort exists too — depth-first traversal, post-order, reversed. Same result, different style. Kahn's queue-based approach is usually clearer.\n\nDAGs (directed acyclic graphs) are everywhere. Topo sort is the algorithm that orders them.",
        hashtags: [...CORE, "#TopologicalSort"],
        image: {
          template: "tip", headline: "Topological sort — Kahn's recipe",
          bullets: ["In-degree count", "Queue all 0-degree nodes", "Pop, output, decrement", "Cycle if not all consumed"],
          accent: "amber",
          aiPrompt: "Pro tip card with DAG glyph, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP. DAG glyph faded.",
        },
      },
      {
        id: "d26-p5", day: 26, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 26 — graphs are universal",
        copy: "End of Day 26. Graphs done. The most-used data model in computer science.\n\nWhat we covered.\n\nMorning, the three graph representations and when to pick each. Adjacency list (default for sparse graphs). Matrix (dense graphs, O(1) edge check). Edge list (rare).\n\nMidday, the beautiful BFS-on-unweighted-graphs property — first reached is shortest path. The BFS template from Day 20 becomes the shortest-path solver. Grid problems are graphs in disguise; they yield to BFS the same way.\n\nAfternoon, Dijkstra in 16 lines. The weighted generalisation of BFS. Min-heap instead of queue; relax edges; non-negative weights required. Used everywhere — map routing, network protocols, event simulators.\n\nEvening, topological sort with Kahn's algorithm. In-degree counting and queue-based processing. Used in build systems, package managers, course schedulers, ML pipelines. Cycle detection comes free.\n\nA broader thought. Graphs are the most general structure on this list. Trees are graphs with restrictions. DAGs are graphs with restrictions. Linked lists are graphs with restrictions. Almost every relational data model is graph-shaped.\n\nMastering BFS, DFS, Dijkstra, and topo sort gives you the toolkit for most graph problems. Add a few specialised algorithms (MST with Kruskal/Prim for clustering and network design, max flow for assignment problems, Floyd-Warshall for small all-pairs) and you have professional-grade graph fluency.\n\nTomorrow, Day 27, dynamic programming. The single most-feared topic in DSA, and one of the most powerful tools when applied correctly. We make it less scary.\n\nSee you in the morning.",
        hashtags: [...CORE, "#Graphs"],
        image: {
          template: "quote", headline: "Graphs model anything connected.", subhead: "Master adjacency list. Master half of CS.", accent: "amber",
          aiPrompt: "Pastel amber quote, 1:1",
          canvaBrief: "Pastel amber quote card.",
        },
      },
    ],
  },

  /* DAY 27 */
  {
    day: 27, theme: "Dynamic programming — patterns over magic", pillar: "dsa",
    posts: [
      {
        id: "d27-p1", day: 27, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "DP is recursion + memoisation",
        copy: "Dynamic programming has a reputation as the hardest topic in interviews. Most of that reputation is undeserved. DP isn't a separate algorithm; it's a recipe.\n\nA problem is solvable by DP if it has two properties:\n\nOptimal substructure. The optimal answer to size n depends on optimal answers to smaller sizes. (If you know fib(n-1) and fib(n-2), you know fib(n).)\n\nOverlapping subproblems. The same smaller problems get computed multiple times across the recursion tree. (fib(n-3) shows up under both fib(n-1) and fib(n-2).)\n\nWhen both properties hold, cache the smaller answers. That's DP. Recursion + memoisation.\n\nThe naive recursion has exponential runtime because of the recomputation. The memoised version has linear (or polynomial) runtime because each subproblem is solved exactly once.\n\nClassical DP problems and the state shape:\n\nFibonacci — dp[n] = answer for size n. 1D state.\nClimbing stairs (count distinct paths) — dp[n] = ways to reach step n. 1D.\nCoin change (min coins for amount) — dp[a] = min coins for amount a. 1D.\nLongest common subsequence — dp[i][j] = LCS of first i chars of A and first j chars of B. 2D.\nEdit distance — dp[i][j] = edits to transform first i chars of A into first j chars of B. 2D.\nKnapsack (maximise value within weight limit) — dp[i][w] = max value using first i items with weight budget w. 2D.\n\nThe state shape (1D, 2D, etc.) usually drops out of the problem statement. Identify what the smaller problem depends on. If just one parameter — 1D. If two — 2D.\n\nDP is pattern recognition plus careful state design. The patterns repeat; once you've coded ten DP problems, the eleventh is recognisable.",
        hashtags: [...CORE, "#DynamicProgramming"],
        image: {
          template: "stat", headline: "DP = recursion + cache", subhead: "Optimal substructure + overlap = DP fits.", stat: { number: "2", label: "preconditions for DP to apply" }, accent: "amber",
          aiPrompt: "Stat poster, amber, 1:1",
          canvaBrief: "Amber gradient. Big 2.",
        },
      },
      {
        id: "d27-p2", day: 27, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "Top-down vs bottom-up — same answer, different shape",
        copy: "Two ways to write any DP problem. Same answer. Same complexity. Different code shape and different memory characteristics.\n\nTop-down (memoised recursion) — write the recursion the way the problem reads. Decorate with @lru_cache to cache results.\n\n@lru_cache(maxsize=None)\ndef solve(i):\n    if base_case(i):\n        return base_value(i)\n    return min(solve(i-1), solve(i-2)) + cost[i]\n\nBottom-up (iterative DP) — build a 1D or 2D array, fill it in dependency order with explicit loops.\n\ndp = [0] * n\ndp[0] = base_0\ndp[1] = base_1\nfor i in range(2, n):\n    dp[i] = min(dp[i-1], dp[i-2]) + cost[i]\nreturn dp[n-1]\n\nWhen to pick which:\n\nTop-down is easier to write. The code reads as the problem statement. lru_cache handles the memoisation. You don't have to think about iteration order — recursion handles dependency order automatically.\n\nBottom-up is easier to optimise. Once you've solved with top-down and confirmed correctness, you can rewrite as iterative. Often you can drop space — if dp[i] only depends on dp[i-1] and dp[i-2], you only need two variables, not the full array. Constant space instead of linear.\n\nBottom-up has no recursion limit. For very deep DP problems (n > 5000), top-down with @lru_cache hits Python's recursion ceiling unless you raise it. Bottom-up has no such issue.\n\nMy default — start top-down. Once it works, decide if bottom-up is worth the conversion (deeper-than-stack input, memory optimisation, micro-perf needed).\n\nThe transformation is mechanical. Identify the recursion's dependencies (i depends on i-1 and i-2). Write a loop in dependency order (from smallest i upward). Read each value from the array instead of recursing.",
        hashtags: [...CORE, "#Algorithms"],
        image: {
          template: "compare", headline: "Top-down vs bottom-up DP",
          compare: { leftLabel: "Top-down", leftItems: ["Recursion + @lru_cache", "Reads like the problem", "Easier to write", "Stack overhead"], rightLabel: "Bottom-up", rightItems: ["Loops + array", "Builds in order", "Easier to optimise", "No recursion limit"] },
          accent: "amber",
          aiPrompt: "Compare poster, 1:1",
          canvaBrief: "Split. Grey vs amber.",
        },
      },
      {
        id: "d27-p3", day: 27, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "Coin change — the DP gateway problem",
        copy: "If you understand coin change, you understand 80% of DP problems. The other 20% are variations on the same theme.\n\nProblem — given coin denominations [1, 2, 5] (or whatever) and a target amount (say 11), return the minimum number of coins to make exactly that amount. Or -1 if impossible.\n\nState — dp[a] = minimum coins to make amount a.\n\nTransition — dp[a] = min(dp[a - c] + 1 for c in coins if c <= a). For each coin c that doesn't exceed a, the answer is 1 (use c) plus the optimal answer for the remaining amount (a - c). Take the min across all coins.\n\nBase case — dp[0] = 0 (zero coins to make zero amount). All other dp[a] start at infinity (unreachable) and get updated to actual values as we fill the table.\n\nLook at the snippet. We allocate dp of size amount+1, initialised with [0] for amount 0 and inf elsewhere. The outer loop is over amounts 1 to target. The inner loop is over coins. We update dp[a] using the transition.\n\nO(amount * len(coins)) time. O(amount) space.\n\nReturn — dp[amount] if it's still inf (impossible), -1; otherwise dp[amount].\n\nVariations on the same shape:\n\nCoin change II — count distinct ways to make the amount. Same state, different transition (sum, not min).\n\nClimbing stairs (1 or 2 steps at a time) — coin change with coins=[1,2] and a count transition.\n\nEdit distance — 2D state (one dim per string). Transition uses three operations (insert, delete, replace) instead of one.\n\nKnapsack — 2D state. Transition picks 'include this item' vs 'skip this item'.\n\nLearn the shape on coin change. Variations are tweaks.",
        hashtags: [...CORE, "#DynamicProgramming"],
        image: {
          template: "code", headline: "Coin change — bottom-up DP",
          code: { language: "python", snippet: "from math import inf\n\ndef coin_change(coins, amount):\n    dp = [0] + [inf] * amount\n    for a in range(1, amount + 1):\n        for c in coins:\n            if c <= a:\n                dp[a] = min(dp[a], dp[a - c] + 1)\n    return dp[amount] if dp[amount] != inf else -1" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d27-p4", day: 27, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Define the state in one English sentence first",
        copy: "DP fails when the state is fuzzy. The most reliable cure is to define your state as one English sentence before writing any code.\n\n'dp[i] is the minimum number of coins to make exactly amount i.'\n\nIf you can write that sentence cleanly — concise, unambiguous, parameterised by your indices — you have a state. The transitions and base cases tend to follow.\n\nIf you can't write the sentence, your state is wrong. Common failure modes:\n\nThe sentence has 'or' or 'and' joining two ideas. 'dp[i] is the minimum coins OR -1 if impossible.' The disjunction is a smell — usually the right state separates these. Often you encode 'impossible' as infinity and check at the end.\n\nThe sentence requires a second dimension. 'dp[i] is the minimum coins to make i, given that the last coin used was c.' The second 'given that' tells you the state needs another index. dp[i][c].\n\nThe sentence is silent on what 'minimum' means. 'dp[i] is the path through the array.' Path optimising what? The cost? The count? The sum? Be specific.\n\nFor harder DPs (longest common subsequence, edit distance, knapsack), the sentence has two indices. 'dp[i][j] is the LCS of the first i characters of A and the first j characters of B.' Now transitions involve dp[i-1][j], dp[i][j-1], dp[i-1][j-1] depending on whether A[i-1] == B[j-1].\n\nWrite the sentence. Then the loop. Then the transition. Then test on a tiny input.\n\nMy rule — five minutes on the sentence saves an hour of debugging. The hardest part of DP isn't the code; it's stating the problem correctly.",
        hashtags: [...CORE, "#DynamicProgramming"],
        image: {
          template: "tip", headline: "DP starts with one English sentence",
          bullets: ["dp[i] = ...", "Pick what 'i' indexes", "Write before coding", "If sentence has 'and/or', go 2D"],
          accent: "amber",
          aiPrompt: "Pro tip card, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP.",
        },
      },
      {
        id: "d27-p5", day: 27, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 27 — DP is just disciplined recursion",
        copy: "End of Day 27. DP done.\n\nWhat we covered.\n\nMorning, DP framed simply — it's recursion + memoisation when the problem has optimal substructure and overlapping subproblems. Not magic. A recipe.\n\nMidday, top-down vs bottom-up. Same answer, different code shape. Top-down is easier to write (recursion + lru_cache). Bottom-up is easier to optimise (loops + array, often constant space). Start top-down; convert if needed.\n\nAfternoon, coin change as the gateway problem. State, transition, base case. The shape generalises to most other 1D and 2D DPs.\n\nEvening, the most reliable DP technique — define the state in one English sentence before coding. If you can't write the sentence, your state is wrong. Five minutes on the sentence saves an hour of debugging.\n\nA broader theme. DP problems are pattern-recognition problems. The patterns are limited (linear DP, grid DP, interval DP, tree DP, bitmask DP) and the variations on each pattern are predictable. Solve fifteen well-chosen DP problems and the eleventh is recognisable; the fifteenth is comfortable.\n\nTomorrow, Day 28, week four wrap. The 8 patterns that solve most leetcode mediums. The 20-problem study list. How I think during interviews. Then we exit DSA territory and head into the data stack.\n\nSee you in the morning.",
        hashtags: [...CORE, "#DynamicProgramming"],
        image: {
          template: "quote", headline: "DP starts with a sentence.", subhead: "If you can't write dp[i] = ..., it's not DP yet.", accent: "amber",
          aiPrompt: "Pastel amber quote, 1:1",
          canvaBrief: "Pastel amber quote card.",
        },
      },
    ],
  },

  /* DAY 28 */
  {
    day: 28, theme: "DSA wrap — patterns, study plan, interview prep", pillar: "career",
    posts: [
      {
        id: "d28-p1", day: 28, postNumber: 1, slot: "morning", type: "recap", pillar: "career",
        title: "8 patterns that solve 80% of interview problems",
        copy: "After two weeks of DSA, here's the pattern map I keep coming back to. Eight patterns. They cover 80% of leetcode-medium problems and the vast majority of coding interviews.\n\nOne — hash map / set. O(1) lookups. Replace 'in list' with 'in set'. Two-sum, dedup, group-by, anagram detection. The single most common Big-O upgrade.\n\nTwo — two pointers. Slow/fast for cycles. Opposite ends for sorted-array problems. Same direction for sliding window.\n\nThree — sliding window. The pattern for 'best subarray with constraint X'. Variable window with for-loop + inner while-loop is the standard shape.\n\nFour — stack. Match-and-pop. Parentheses, expression parsing, undo/redo, monotonic stack for next-greater-element problems.\n\nFive — BFS. Shortest path on unweighted graphs and grids. Level-order traversal of trees. The deque + seen set + while-loop template.\n\nSix — DFS. Recursion or explicit stack. Tree traversals, connected components, backtracking.\n\nSeven — binary search. Find an element in a sorted array. Search the answer space when feasibility is monotonic. Half-open template, while lo < hi, lo = mid+1 or hi = mid.\n\nEight — DP. Recursion + memoisation. State as one English sentence first. Top-down with lru_cache or bottom-up with loops.\n\nMost leetcode mediums map to one (or two) of these patterns. The skill that makes interviews easier isn't memorising algorithms — it's recognising which pattern applies. Five minutes thinking about the pattern beats fifty minutes coding the wrong approach.\n\nThe further skill — knowing when patterns DON'T apply, and what does. Brute force, math reasoning, greedy, divide and conquer. The eight above are the bread and butter; the rest is the spice.",
        hashtags: [...CORE, "#CodingInterview"],
        image: {
          template: "list", headline: "8 patterns ≈ 80% of leetcode",
          bullets: ["Hash map / set", "Two pointers", "Sliding window", "Stack", "BFS", "DFS", "Binary search", "DP"],
          accent: "amber",
          aiPrompt: "Pattern-map infographic, amber, 1:1",
          canvaBrief: "White grid. 8 rows. Amber number badges.",
        },
      },
      {
        id: "d28-p2", day: 28, postNumber: 2, slot: "midday", type: "deepdive", pillar: "career",
        title: "The 20-problem study list",
        copy: "Twenty leetcode problems that, between them, cover the eight patterns from this morning. Solve all of them. Understand why each works. You'll be in the 90th percentile of coding-interview prep.\n\nProblems 1-3 — hash map / set. Two-sum, valid anagram, group anagrams. The 'in set' upgrade in three different shapes.\n\nProblems 4-6 — sliding window. Longest substring without repeats, minimum window substring, valid parentheses. The third uses a stack but lives in the same pattern family — 'process tokens left to right with a helper structure'.\n\nProblems 7-9 — linked list. Reverse linked list, has cycle (Floyd's), merge two sorted lists. The pointer-manipulation triad.\n\nProblems 10-12 — BFS / DFS. Number of islands (DFS or BFS on a grid), course schedule (topological sort), open-the-lock (BFS on state space).\n\nProblems 13-15 — trees. Inorder traversal, lowest common ancestor, level order traversal. The traversal templates plus their applications.\n\nProblems 16-17 — binary search. Standard binary search, find peak element. The 'search the answer' technique surfaces in capacity / scheduling problems too.\n\nProblems 18-20 — DP. Climbing stairs (1D, easy), coin change (1D with optimisation), longest common subsequence (2D).\n\nPace yourself. Two problems a day, ten days. Three problems a day, seven days. Don't rush — understanding why each solution works is the skill, not just getting the right answer.\n\nFor each problem — solve, explain out loud as if to an interviewer, write the cleanest version after the explanation. The explaining-out-loud part is what reveals what you understand vs what you memorised.\n\nAfter these 20, if you're prepping for senior-level interviews, knock out 30 more leetcode mediums to cement pattern recognition. The patterns repeat; the second 30 will go three times faster than the first 20.",
        hashtags: [...CORE, "#Leetcode"],
        image: {
          template: "stat", headline: "20", subhead: "problems that cover 90% of patterns", stat: { number: "20", label: "problems = 90% pattern coverage" }, accent: "amber",
          aiPrompt: "Stat poster, amber, 1:1",
          canvaBrief: "Amber gradient. Big 20.",
        },
      },
      {
        id: "d28-p3", day: 28, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "The DSA cheatsheet I keep open",
        copy: "Print this. Pin it next to your monitor. Reach for it during interviews and tense debugging sessions.\n\nThe complexity reference for Python's built-in structures and their operations. Knowing these by reflex, not by re-deriving, saves real time during interviews.\n\nlist — append O(1) amortised, index O(1), insert at position O(n), delete at position O(n), search by value O(n).\n\ndict — get/set/in/delete O(1) average. Worst case O(n) under heavy collisions but Python's hash functions make this rare for built-in types.\n\nset — in/add/remove/discard all O(1) average. Set operations (union, intersection, difference) are roughly O(min(|a|,|b|)).\n\nFrom collections — deque (append/popleft both O(1)), Counter (subclass of dict for counting, .most_common(k) is O(n log k)).\n\nFrom heapq — heappush, heappop, heappushpop, heapreplace all O(log n). nlargest(k, iter) and nsmallest(k, iter) are O(n log k).\n\nFrom bisect — bisect_left, bisect_right both O(log n). insort is O(log n) for the search but O(n) for the insert (shifts).\n\nGeneral data structure complexities:\n\nBalanced BST — most ops O(log n). Python's stdlib doesn't have one; use sortedcontainers.SortedList.\n\nLinked list — insert/delete given pointer O(1). Search O(n).\n\nUnion-Find — nearly O(1) amortised per operation with path compression and union by rank.\n\nKnowing these by reflex turns 'I think this is O(n)' into 'this is O(n) because dict is O(1) per op'. The confidence speeds up interview pace and avoids second-guessing.",
        hashtags: [...CORE, "#Python"],
        image: {
          template: "code", headline: "DSA cheatsheet — Python",
          code: { language: "python", snippet: "# big-O of common ops\n\nlist     # append O(1), insert O(n)\ndict     # get/set/in O(1)\nset      # in/add O(1)\n\nfrom collections import deque, Counter\nfrom heapq import heappush, heappop\nfrom bisect import bisect_left, insort\n\ndeque                    # popleft O(1)\nheappush, heappop        # O(log n)\nbisect_left              # O(log n)\nCounter().most_common(k) # O(n log k)" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d28-p4", day: 28, postNumber: 4, slot: "evening", type: "tip", pillar: "career",
        title: "How I think during a coding interview",
        copy: "A coding interview is half algorithm, half communication. The interviewer is grading both. My five-step routine, refined across many interviews, both as candidate and as interviewer.\n\nStep one — restate the problem in my own words. Confirm the inputs, outputs, and edge cases with the interviewer. 'So I'm given an array of integers and a target. I need to return the indices of two elements that sum to the target. Can the indices be the same? Are there negative numbers? Always exactly one pair, or could there be many?' This step alone catches misunderstandings before you waste time.\n\nStep two — talk through brute force. State its complexity. DON'T code it yet. 'A naive approach is two nested loops checking all pairs. That's O(n²) time, O(1) space. Here's how it would look — [outline only].' This shows you understand the problem and the baseline.\n\nStep three — propose an optimisation. Name the pattern. 'I think we can do better with a hash map. As we iterate, we check if the complement (target - x) is already in the map. If yes, we've found the pair. Otherwise, store x with its index. O(n) time, O(n) space. Trade memory for time.'\n\nStep four — code it, narrating each line. 'I'll use a dict called seen, mapping value to index. Iterate with enumerate. For each x, compute need = target - x. Check if need is in seen — if yes, return seen[need] and i. Otherwise, store seen[x] = i.'\n\nStep five — test on edge cases. Empty array? Single element? Negative numbers? Duplicates? Walk through them out loud.\n\nThe person who blurts code immediately usually backtracks. The person who frames the problem first ships cleaner solutions and signals stronger thinking. Always frame first.",
        hashtags: [...CORE, "#CodingInterview"],
        image: {
          template: "tip", headline: "5-step interview routine",
          bullets: ["1. Restate", "2. Constraints", "3. Brute force aloud", "4. Pattern + sketch", "5. Code out loud"],
          accent: "amber",
          aiPrompt: "Pro tip card, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP.",
        },
      },
      {
        id: "d28-p5", day: 28, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Week 4 done — DSA wrapped",
        copy: "End of week four. 28 days. 140 posts. We're 31% through the sprint.\n\nDSA is done. From Big-O literacy on Day 15 to dynamic programming on Day 27, we covered the foundational vocabulary that makes ML interviews bearable, makes code reviews precise, and lets you read other people's code with sharper eyes.\n\nThe two weeks of DSA in eight patterns (today's morning post). Hash map, two pointers, sliding window, stack, BFS, DFS, binary search, DP. Most leetcode-medium problems map to one or two of these. Recognition is the skill; coding follows.\n\nTwenty practice problems for the patterns (today's midday post). Two-sum to longest common subsequence. Three weeks of focused practice gets you to interview-ready.\n\nThe DSA cheatsheet (today's afternoon post) — Python's built-in complexities at your fingertips. Internalise so you don't re-derive during pressure.\n\nThe interview routine (today's evening tip) — restate, constraints, brute force, pattern + optimisation, code with narration. Half the interview is communication; treat it as such.\n\nWhat we learned across the two weeks:\n\nBig-O is a label, not math. Six classes cover almost everything.\n\nMost data-structure choices come down to access pattern. Pick by what you'll do with the data.\n\nMost algorithmic 'wins' come from picking the right tool — hash map over list scan, heap over full sort, BFS over generic graph search, DP over naive recursion.\n\nReal Python perf bugs are usually I/O, not algorithm. Profile before you optimise.\n\nComing up. Next week, we leave DSA for the data stack — NumPy, Pandas, EDA, plotting. Practical Python for ML/data work. Then classical ML, deep learning, transformers, RAG, agents, automation, career.\n\nThank you for showing up these two weeks. See you in week 5.",
        hashtags: [...CORE, "#90DaysOfAI"],
        image: {
          template: "quote", headline: "4 weeks down. 9 to go.", subhead: "Next: NumPy, Pandas, EDA — the data stack.", accent: "amber",
          aiPrompt: "Pastel amber quote with 28/90 progress, 1:1",
          canvaBrief: "Pastel amber quote with 28/90 amber bar.",
        },
      },
    ],
  },
];
