import type { DayPlan } from "../types";

const CORE = ["#DSA", "#DataStructures", "#Algorithms", "#Python", "#100DaysOfCode"];

export const week03: DayPlan[] = [
  /* DAY 15 */
  {
    day: 15, theme: "Big-O — the only complexity vocab you need", pillar: "dsa",
    posts: [
      {
        id: "d15-p1", day: 15, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "Big-O isn't math. It's a label for growth.",
        copy: "Day 15. Week three. We pivot from Python the language to the algorithms and data structures Python the language sits on top of.\n\nLet's start with the question every interviewer asks and most candidates answer badly — 'what's the time complexity?'\n\nBig-O is not math. It's a label that describes how an algorithm's runtime (or memory) grows as the input size grows. That's it. The constants don't matter. The lower-order terms don't matter. We care about the growth pattern, not the exact count.\n\nThe six classes you'll meet daily, in order of pain:\n\nO(1) — constant. Doesn't grow with input size. dict lookup. Array indexing. The fastest possible.\n\nO(log n) — logarithmic. Halves the input each step. Binary search. Tree depth in a balanced tree. Doubling input adds one step. Phenomenal scaling.\n\nO(n) — linear. Touches each item once. Scanning a list. Reading a file. Doubling input doubles the work. Acceptable.\n\nO(n log n) — linearithmic. Best general-purpose comparison sort. Mergesort, timsort, heapsort. Doubling input slightly more than doubles the work. Considered efficient.\n\nO(n²) — quadratic. Nested loop over the input. Bubble sort. Naive duplicate check with two for-loops. Doubling input quadruples the work. Painful past 10k elements.\n\nO(2ⁿ) — exponential. Recursive subset enumeration without memoisation. Each new input doubles the entire work. Painful past 30 elements. Almost always fixable with DP.\n\nYou don't need to compute exact constants. You need to recognise which family your code falls into. That recognition, applied repeatedly, is the difference between code that scales and code that bricks production.",
        hashtags: [...CORE, "#BigO"],
        image: {
          template: "stat", headline: "O(?)", subhead: "Pick the right family. Win the problem.", stat: { number: "6", label: "complexity classes you'll see daily" }, accent: "amber",
          aiPrompt: "Stat poster, deep purple to amber gradient, big 6 numeral, faded growth-curve graph behind, 1:1 LinkedIn premium",
          canvaBrief: "Gradient #150538 to #f59e0b. Big 6 centered. Subhead. Faded curve graph at 12% opacity. Brand pill, DSA pillar tag.",
        },
      },
      {
        id: "d15-p2", day: 15, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "How to estimate Big-O in 30 seconds",
        copy: "There's a quick recipe for estimating Big-O that works for 90% of code you'll read, takes about 30 seconds, and you can do it standing up at a whiteboard.\n\nStep one — find the dominant loop. The outermost loop that depends on the input size. Ignore loops with a fixed bound (for i in range(10): doesn't scale with input).\n\nStep two — count how that loop depends on n. One pass over n items? O(n). Nested loop, both over n? O(n²). Halving each step? O(log n).\n\nStep three — figure out the worst single operation inside the loop. Is it a dict lookup (O(1))? A 'in list' check (O(n))? A sorted call (O(n log n))? The whole inner block dominates by its slowest op.\n\nStep four — multiply the loop count by the inner op's complexity.\n\nThat's it. Linear-loop-with-constant-inner = O(n). Linear-loop-with-linear-inner = O(n²). Logarithmic-loop-with-constant-inner = O(log n).\n\nThe most common Big-O upgrade in real Python — finding 'in list' inside a loop, replacing the list with a set. 'in list' is O(n); 'in set' is O(1). The loop drops a complexity class for free. We see this exact pattern across half the leetcode mediums.\n\nA gotcha — recursive functions. Don't count the recursion explicitly. Count the depth of recursion times the work per call. Fibonacci's naive recursion calls itself twice per step, depth n, so O(2^n). Adding memoisation makes each subproblem solved once, so O(n).\n\nMost code falls into one of the six classes from the morning post. Recognising the family is the skill. Multiplying constants is the math you don't need.",
        hashtags: [...CORE, "#Algorithms"],
        image: {
          template: "list", headline: "Estimate Big-O in 30 seconds",
          bullets: ["1. Find dominant loop", "2. Count loop dep on n", "3. Worst inner op", "4. Multiply", "5. Replace 'in list' with 'in set'"],
          accent: "amber",
          aiPrompt: "5-step recipe poster, white-amber, 1:1",
          canvaBrief: "White grid. 5 rows. Amber number badges.",
        },
      },
      {
        id: "d15-p3", day: 15, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "O(n²) → O(n) — the dedup pattern",
        copy: "The single most common Big-O upgrade in interview problems and real code is this exact pattern.\n\nThe naive duplicate check is two nested loops. For every item, check every other item. O(n²). Slow past 10k elements; unusable past 100k.\n\nThe upgrade is one structure swap. Use a set to track items you've seen. As you walk the list, check membership against the set (O(1)) and add the current item (O(1)). One pass. O(n) time. O(n) extra space.\n\nLook at the snippet. Same problem, two solutions, two complexity classes. The fast version is barely longer than the slow one.\n\nWhy this matters more than just 'duplicate detection'. The pattern of trading memory for hash lookups appears everywhere:\n\nTwo-sum. Naive O(n²) checks all pairs. With a dict mapping value-to-index, one pass O(n).\n\nGroup-by. Naive O(n²) puts each item in the right group via linear search. With a defaultdict, one pass O(n).\n\nFinding intersection of two lists. Naive nested-loop O(n*m). Convert one to a set; iterate the other. O(n + m).\n\nFinding the longest substring without repeats. Naive enumerates all substrings. With a sliding window and a set, one pass O(n).\n\nThe meta-pattern: when the brute force is 'for each X, for each Y, do something', ask if a hash structure can replace one of the loops with O(1) lookups. The answer is yes more often than not.\n\nThis single move, applied thoughtfully, accounts for a huge fraction of leetcode-medium solutions. Internalise it.",
        hashtags: [...CORE, "#Python"],
        image: {
          template: "code", headline: "O(n²) → O(n) with a set",
          code: { language: "python", snippet: "# O(n^2) — slow\ndef has_dup_slow(nums):\n    for i, x in enumerate(nums):\n        for y in nums[i+1:]:\n            if x == y:\n                return true\n    return False\n\n# O(n) — fast\ndef has_dup_fast(nums):\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return True\n        seen.add(x)\n    return False" },
          accent: "amber",
          aiPrompt: "Dark code card, amber accents, 1:1",
          canvaBrief: "Dark gradient code window with two functions. Title above.",
        },
      },
      {
        id: "d15-p4", day: 15, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Don't optimise without measuring",
        copy: "There's a reflex among Big-O-aware developers to optimise everything to the lowest possible complexity. Resist it. Big-O is a guide; profiling is the truth.\n\nBig-O describes asymptotic behaviour — what happens when n grows large. For small n, the constants and lower-order terms (which Big-O ignores) often dominate. A 'quadratic' algorithm with a 1ns inner step beats a 'linear' algorithm with a 100ns inner step until n gets pretty large.\n\nReal-world Python performance bugs are usually NOT algorithmic. They're:\n\nI/O — synchronous network calls, disk reads, file opens. Each one takes milliseconds. A loop with 100 sync HTTP calls is slow not because of algorithmic complexity but because of 100 round trips.\n\nJSON parsing — surprisingly expensive on large objects. Python's stdlib json is slow; orjson is 5-10x faster.\n\nString operations — Python strings are immutable. += in a loop is O(n²) total. Use ''.join() — O(n) total.\n\nGlobal dict lookups — accessing a function in a module's global dict is slower than accessing a local variable. Hot loops sometimes benefit from rebinding to local names.\n\nUnnecessary list materialisation — comprehensions where generators would do, in-memory copies of huge data instead of streaming.\n\nBefore you 'optimise' an O(n) loop to O(log n), measure where the actual time goes.\n\nMy default tools — cProfile and snakeviz for offline profiling. py-spy for production-style sampling. scalene for combined CPU+memory profiling. Each gives you a different view; each takes 5 minutes to set up.\n\nFor algorithmic problems at scale, Big-O wins. For 90% of real Python performance work, the profiler points you at I/O or string ops, not at your algorithm. Measure first.",
        hashtags: [...CORE, "#PerformanceTips"],
        image: {
          template: "tip", headline: "Big-O for big n. Profiler for small.",
          bullets: ["Measure before optimising", "cProfile / scalene", "I/O usually beats CPU", "Algorithmic wins matter at scale"],
          accent: "amber",
          aiPrompt: "Pro tip card, amber, 1:1",
          canvaBrief: "Amber gradient header. PRO TIP. White card 4 items.",
        },
      },
      {
        id: "d15-p5", day: 15, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 15 — see the family, pick the structure",
        copy: "End of Day 15. Week three begins. Welcome to DSA week.\n\nA quick frame for the next two weeks. We're not doing competitive-programming gymnastics. We're building the vocabulary that turns 'this code is slow' into 'this code is O(n²) because of a nested in-list-check, and the fix is to swap the inner list for a set, dropping it to O(n)'.\n\nThat vocabulary is the foundation that makes ML interviews bearable, makes code reviews precise, and lets you read other people's code with a sharper eye.\n\nWhat we covered today.\n\nMorning — Big-O as a label for growth. Six classes (constant, log, linear, linearithmic, quadratic, exponential) cover almost every algorithm you'll see. Recognise the family; ignore the constants.\n\nMidday — a 30-second estimation recipe. Find the dominant loop, count its dependence on n, multiply by the worst inner op. Works for 90% of code you'll read.\n\nAfternoon — the dedup pattern as the canonical Big-O upgrade. Trade memory for hash lookups. Drop a complexity class. The pattern shows up across most interview mediums.\n\nEvening — measure before you optimise. Big-O is asymptotic; for small n the constants dominate. Real Python perf bugs are usually I/O or string ops. cProfile, snakeviz, py-spy are your friends.\n\nTomorrow, Day 16, arrays. Python's list is the workhorse. Slicing, two-pointer, prefix sum — the patterns interviewers love and that show up constantly in real ML code (sliding windows in time series, prefix sums in batch normalisation, two-pointer in tokeniser code).\n\nSee you in the morning.",
        hashtags: [...CORE, "#BigO"],
        image: {
          template: "quote", headline: "Recognise the family. Pick the structure.", subhead: "Big-O is a label, not maths.", accent: "amber",
          aiPrompt: "Pastel amber quote card, 1:1",
          canvaBrief: "Pastel amber gradient quote card.",
        },
      },
    ],
  },

  /* DAY 16 */
  {
    day: 16, theme: "Arrays — the workhorse in disguise", pillar: "dsa",
    posts: [
      {
        id: "d16-p1", day: 16, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "Python list = dynamic array",
        copy: "Most Python developers use list every day without thinking about what it actually is. Worth thinking about.\n\nA Python list is a dynamic array. Memory-contiguous. When you create [1, 2, 3], CPython allocates a small contiguous block, stores pointers to the three integer objects in it, and tracks length and capacity. When you append and exceed capacity, Python allocates a new block (typically 1.125x the old size — Python's growth factor is small, not 2x), copies pointers over, and frees the old block.\n\nWhy this matters for your daily work — the operations have asymmetric costs.\n\nAppend — O(1) amortised. Most appends are cheap; occasional ones trigger a resize. The 'amortised' is key — averaging over many appends, each is constant.\n\nIndex — O(1). Direct memory offset. Same speed as a C array.\n\nInsert at position i — O(n). Every element after i shifts right by one slot. Insert at position 0 in a list of 1M items moves a million pointers.\n\nDelete at position i — O(n). Same shift, in the other direction.\n\nSearch by value — O(n). Lists have no idea what they contain. Linear scan.\n\nSearch by sorted value — O(log n) with bisect, but ONLY if the list is sorted. Otherwise O(n).\n\nThe asymmetry guides design. Append is cheap; insert-at-front is expensive. If you find yourself inserting at the front a lot, switch to collections.deque — same iteration interface, O(1) appendleft and popleft.\n\nIf you're searching by value a lot, the list is wrong; you want a set or dict.\n\nThe 'list is dynamic array' frame answers most performance questions about lists in advance. Hold it; use it.",
        hashtags: [...CORE, "#Arrays"],
        image: {
          template: "stat", headline: "list = dynamic array", subhead: "Append O(1). Insert-at-front O(n).", stat: { number: "2x", label: "size growth on resize" }, accent: "amber",
          aiPrompt: "Stat poster with array-cell glyph, amber, 1:1",
          canvaBrief: "Amber gradient. Big 2x. Subhead. Array-cell row faded.",
        },
      },
      {
        id: "d16-p2", day: 16, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "The two-pointer pattern in one diagram",
        copy: "Two pointers solve more interview problems than any other technique. Once you can recognise the pattern, half of array problems become routine.\n\nThe basic idea — instead of nested loops over the same array, use two integer indices that walk through it together. Three flavours.\n\nFlavour one — slow and fast pointers, both moving forward. Used for cycle detection in linked lists (Floyd's algorithm), removing duplicates from a sorted array, finding the middle of a list.\n\nThe slow pointer increments at one rate; the fast pointer increments at a different rate (often double). When they meet — or fail to meet — you've answered something about the structure.\n\nFlavour two — pointers from opposite ends, moving toward each other. Used for palindrome check, two-sum on a sorted array, container-with-most-water type problems.\n\nLeft pointer at the start, right pointer at the end. Compare; move whichever pointer makes progress; stop when they meet.\n\nFlavour three — sliding window. Both pointers moving forward, defining a window of interest. Used for longest-substring problems, minimum-window problems, anything 'best subrange'.\n\nLeft pointer marks the start of the window; right pointer marks the end. Expand the right; shrink the left when the window violates a constraint. Track the optimum window seen so far.\n\nWhy this is the pattern that wins. The brute force for these problems is usually two nested loops over the array — O(n²). Two pointers do it in one pass, each pointer touching each element O(1) times — O(n).\n\nThe trick to recognising a two-pointer problem — when the brute force has two indices both ranging over the array, ask if those indices have a relationship that lets them coordinate (one always greater than the other, one always halving the search space, both moving in some direction). If yes, two-pointer is probably the right answer.",
        hashtags: [...CORE, "#TwoPointers"],
        image: {
          template: "list", headline: "Two-pointer — 3 flavours",
          bullets: ["Slow / fast — cycles", "Opposite ends — palindrome / two-sum", "Sliding window — substring", "Single-pass replacement of O(n²)"],
          accent: "amber",
          aiPrompt: "Two-pointer infographic with array glyph and arrows, amber, 1:1",
          canvaBrief: "White grid. 4 rows with arrow-pair icons.",
        },
      },
      {
        id: "d16-p3", day: 16, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "Two-sum in two pointers (sorted)",
        copy: "Classic problem. Given a SORTED array and a target, find two indices whose values sum to the target.\n\nBrute force — two nested loops, O(n²).\n\nWith a hash map — one pass, O(n) time, O(n) space. (We'll do that one tomorrow on the hash-map day.)\n\nWith two pointers on a sorted array — one pass, O(n) time, O(1) space. Hard to beat.\n\nLook at the snippet. left starts at 0, right at len(nums) - 1. We compute the sum at the current pair. Three branches.\n\nIf sum equals target — found, return.\n\nIf sum is less than target — we need a bigger value. The smallest available bigger value is at left+1. Move left right.\n\nIf sum is greater than target — we need a smaller value. Smallest available smaller value is at right-1. Move right left.\n\nWe stop when left and right meet.\n\nWhy this works — because the array is sorted, the value at any index implies a range of possible sums. Moving left right increases the sum. Moving right left decreases it. Each step makes provable progress toward the target. We never need to go back.\n\nThe constraint that makes this work is sorting. If the array isn't sorted, you'd need to sort first (O(n log n)) or use a hash map (O(n)). For an unsorted array, hash map wins. For a sorted array (or one you can sort cheaply), two pointers with O(1) extra space is elegant.\n\nThis is the cleanest example of two-pointer-from-opposite-ends. Once you've coded it once, you recognise the shape. Container with most water, valid palindrome, three-sum, four-sum — all variations.",
        hashtags: [...CORE, "#Leetcode"],
        image: {
          template: "code", headline: "Two-sum on sorted array — O(n)",
          code: { language: "python", snippet: "def two_sum_sorted(nums, target):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        s = nums[l] + nums[r]\n        if s == target:\n            return l, r\n        if s < target:\n            l += 1\n        else:\n            r -= 1\n    return None" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d16-p4", day: 16, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Prefix sum — O(1) range queries",
        copy: "Here's a trick that turns 'sum of nums[i..j]' from an O(n) operation into an O(1) one, with O(n) preprocessing.\n\nGiven an array nums of size n, build a prefix sum array of size n+1 where prefix[i] = sum of nums[:i]. So prefix[0] = 0, prefix[1] = nums[0], prefix[2] = nums[0] + nums[1], and so on. Computed in one pass, O(n).\n\nNow, sum of nums[i..j] = prefix[j+1] - prefix[i]. O(1) per query. No more re-summing slices.\n\nThe payoff explodes with many range queries. If you're answering 1M range-sum queries on an array of 1M items, naive is O(n*q) = 10^12 ops. With prefix sums, O(n + q) = 2*10^6 ops. Six orders of magnitude difference.\n\nVariations on the same idea:\n\nPrefix max — for max-in-range queries. Same shape, max instead of sum.\n\nPrefix XOR — for XOR-in-range queries. Used in subarray-with-given-XOR problems.\n\n2D prefix sums — sum over a rectangle in a matrix. Build prefix[i][j] = sum of submatrix [0..i-1, 0..j-1]. Rectangle sum becomes prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]. Constant per query.\n\nNumPy's cumsum is exactly prefix sum, vectorised. np.cumsum(arr) gives you the prefix sum array as fast as the underlying SIMD allows.\n\nIn ML, you'll see prefix sums in time-series feature engineering (rolling means, cumulative metrics) and in batch sampling (cumulative weights for weighted random selection).\n\nO(n) preprocessing for O(1) queries. Free win when you have many queries.",
        hashtags: [...CORE, "#PrefixSum"],
        image: {
          template: "tip", headline: "Prefix sum — O(1) range queries",
          bullets: ["Build once, query forever", "prefix[j] - prefix[i]", "Memory O(n)", "numpy.cumsum is this"],
          accent: "amber",
          aiPrompt: "Pro tip card, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP. 4 items.",
        },
      },
      {
        id: "d16-p5", day: 16, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 16 — arrays + 2 pointers = half of leetcode",
        copy: "End of Day 16. Arrays are the most-asked structure in interviews and one of the most-used in real code.\n\nWhat we covered.\n\nMorning, list as a dynamic array. The asymmetric cost profile — append is cheap, insert-at-front is expensive, search-by-value is linear. Knowing this answers most performance questions about lists.\n\nMidday, the two-pointer pattern in three flavours. Slow/fast for cycles. Opposite ends for sorted-array problems. Sliding window for best-subrange. The pattern alone solves a huge fraction of interview problems.\n\nAfternoon, two-sum on a sorted array as the canonical opposite-ends two-pointer. O(n) time, O(1) space. The shape generalises to container-with-most-water, palindrome check, three-sum, four-sum. Code the shape once; reach for it forever.\n\nEvening, prefix sums as the O(1)-range-query trick. O(n) preprocessing, O(1) per query. Saves orders of magnitude when you have many range queries. NumPy's cumsum is this, vectorised.\n\nA pattern across the day — most array tricks are about avoiding redundant work. Don't recompute slices. Don't re-search. Don't nest loops where one pass with two pointers would do. The structure of the problem usually allows a single pass; the algorithm's job is to find it.\n\nTomorrow, Day 17, strings. Underestimated as a DSA topic. In real ML/data jobs, string manipulation is a daily task — tokenisers, log parsing, name normalisation. The patterns from arrays apply, plus a few that are string-specific.\n\nSee you in the morning.",
        hashtags: [...CORE, "#Arrays"],
        image: {
          template: "quote", headline: "Two pointers replace one nested loop.", subhead: "When in doubt, scan from both ends.", accent: "amber",
          aiPrompt: "Pastel amber quote card, 1:1",
          canvaBrief: "Pastel amber quote card.",
        },
      },
    ],
  },

  /* DAY 17 */
  {
    day: 17, theme: "Strings — the most underestimated DSA topic", pillar: "dsa",
    posts: [
      {
        id: "d17-p1", day: 17, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "Strings are immutable arrays of code points",
        copy: "Two facts about Python strings change how you write string code, and both trip up beginners.\n\nFact one — strings are immutable. Every operation that 'modifies' a string creates a new one. result += 'x' in a loop creates n new strings, each one bigger than the last, total work O(n²). For long strings or many concatenations, this is brutal.\n\nThe fix is one of the most-cited Python idioms. Build a list, join at the end:\n\nparts = []\nfor x in items:\n    parts.append(transform(x))\nresult = ''.join(parts)\n\nList append is O(1) amortised. join() does one pass over the list. Total: O(n). Identical output, much better complexity.\n\nFact two — strings are sequences of code points, not bytes. len('café') is 4, not 5. Iterating gives you four characters, even though the UTF-8 encoding is 5 bytes (because é is two bytes in UTF-8).\n\nThis is correct behaviour for almost every text operation you care about (word counts, slicing, indexing). It's confusing only when you're working at the byte level — networking, hashing, certain low-level file formats. For those cases, .encode('utf-8') gives you a bytes object, which IS indexed by byte.\n\nMost of the bugs around code points happen at boundaries — Python strings vs bytes for files, strings vs bytes for network protocols, strings vs bytes for MD5 hashing. Always know which you're holding.\n\nFor everyday string work — slicing, searching, splitting, joining — Python's str does the right thing. Treat strings like immutable arrays of characters. Build with join(). Avoid += in loops. Reach for the byte representation only when you really mean bytes.",
        hashtags: [...CORE, "#Strings"],
        image: {
          template: "stat", headline: "''.join(parts)", subhead: "O(n). The only right way to build a string in a loop.", stat: { number: "O(n)", label: "with join. O(n²) without." }, accent: "amber",
          aiPrompt: "Stat poster, amber, 1:1",
          canvaBrief: "Amber gradient. Big O(n) centered. Subhead.",
        },
      },
      {
        id: "d17-p2", day: 17, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "Anagram & character counting tricks",
        copy: "A surprising number of string problems reduce to 'count the characters'. Once you know three patterns for character counting, half of string DSA falls.\n\nPattern one — collections.Counter. Counter(s) returns a dict-like mapping character to count. Two strings are anagrams if and only if Counter(a) == Counter(b). Cleanest possible solution. O(n) time. O(k) space where k is the alphabet size.\n\nfrom collections import Counter\nis_anagram = Counter(a) == Counter(b)\n\nPattern two — sorting. sorted(a) == sorted(b) also tests anagram, because two anagrams have the same characters in different orders, and sorting normalises both to the same string. O(n log n) time, slightly more memory. The code is one line. Use when n is small or you need to sort anyway.\n\nPattern three — frequency array. For ASCII strings, an array of size 128 (or 26 for lowercase letters) with counts is faster than a dict. Increment for one string; decrement for the other; check that all entries are zero. C-style and fast. Used inside performance-critical string libraries.\n\nWhich to use? Start with Counter. It reads the cleanest, works on Unicode, and is fast enough for almost all practical inputs. Switch to sorting if it's a one-line solution. Switch to a frequency array only if you've measured Counter as a bottleneck and the alphabet is fixed (ASCII or smaller).\n\nThe broader pattern. Many 'is X an anagram/permutation/rearrangement of Y' problems reduce to character counting. Same with 'find all substrings that are anagrams', 'group anagrams together' — each variation builds on the same primitive.\n\nKnow the primitive. Apply it. Move on.",
        hashtags: [...CORE, "#Anagram"],
        image: {
          template: "list", headline: "3 string-counting patterns",
          bullets: ["Counter — O(n), readable", "Sorted compare — O(n log n)", "Frequency array — fastest for ASCII", "Start with Counter"],
          accent: "amber",
          aiPrompt: "List poster, amber, 1:1",
          canvaBrief: "White grid, 4 rows with amber badges.",
        },
      },
      {
        id: "d17-p3", day: 17, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "Longest substring without repeating characters",
        copy: "A leetcode classic, and a perfect example of the sliding-window pattern from yesterday.\n\nThe problem — given a string, find the length of the longest substring with no repeated characters.\n\nBrute force enumerates every substring and checks each for uniqueness. That's O(n²) substrings, each O(n) to check, so O(n³) total. Painful past a few thousand characters.\n\nSliding window does it in O(n) time, O(k) space where k is the alphabet size.\n\nLook at the snippet. We maintain a window defined by left and right indices, plus a dict mapping each character to its most recent index.\n\nFor each right (we walk the right edge forward through the string), we check if the current character is already in our window. 'In the window' means seen before, and its previous index is at or after left.\n\nIf yes, we shrink from the left — set left to one past the last occurrence. The window is now repeat-free.\n\nIn either case, update the character's last-seen index and track the maximum window length so far.\n\nKey insight — we never go backward. Right only moves forward; left only moves forward (or stays). Each character enters the window once and leaves at most once. Total work O(n).\n\nThis pattern — left and right pointers, a hash structure tracking what's in the window, expand-from-right-shrink-from-left logic — solves almost every 'longest/shortest/best subarray with constraint X' problem. Variations include longest substring with at most k distinct characters, minimum window substring containing all characters of a target, longest repeating character replacement.\n\nMemorise the shape. Variations are tweaks to the constraint-violation rule.",
        hashtags: [...CORE, "#SlidingWindow"],
        image: {
          template: "code", headline: "Longest unique substring — O(n)",
          code: { language: "python", snippet: "def longest_unique(s):\n    seen = {}\n    left = 0\n    best = 0\n    for right, c in enumerate(s):\n        if c in seen and seen[c] >= left:\n            left = seen[c] + 1\n        seen[c] = right\n        best = max(best, right - left + 1)\n    return best" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d17-p4", day: 17, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "str.translate beats regex for char-replacements",
        copy: "Pop quiz: what's the fastest way to remove all punctuation from a string in Python?\n\nThe answers people reach for:\n\nA regex — re.sub(r'[^\\w\\s]', '', text). Works. But regex is overkill for character-level replacement, and it's slow for this use case.\n\nA loop with replace() — for c in punctuation: text = text.replace(c, ''). Quadratic in the worst case (each replace scans the whole string). And reads ugly.\n\nA list comprehension — ''.join(c for c in text if c not in punctuation). Better. But character-by-character iteration in pure Python isn't fast.\n\nThe answer most don't know — str.translate with str.maketrans:\n\nimport string\ntable = str.maketrans('', '', string.punctuation)\nclean = text.translate(table)\n\nstr.maketrans('', '', chars) builds a translation table that deletes each character in chars. str.translate applies it in a single C loop. 10-100x faster than regex for character-level operations.\n\nWhen this matters in real ML work — preprocessing tokens at scale. NLP pipelines normalise punctuation, strip control characters, transliterate accented characters. Every microsecond per token compounds across millions of tokens. translate() is dramatically faster than regex for these use cases.\n\nWhen NOT to use translate — when you need patterns. 'Replace any sequence of digits with [NUM]' is a regex job. 'Match HTML tags' is a regex job. Anything pattern-shaped, regex.\n\nFor character-level swaps, deletions, or transliterations — translate. For pattern-level work — regex. Two tools, different jobs.\n\nThe Python world has moved on from 'regex everything' for a few years now. The standard library has better-suited tools for character-level work; learn them.",
        hashtags: [...CORE, "#PythonTips"],
        image: {
          template: "tip", headline: "str.translate for char swaps",
          bullets: ["Faster than regex", "str.maketrans builds the table", "Strip punctuation in one call", "Use regex for patterns"],
          accent: "amber",
          aiPrompt: "Pro tip card, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP.",
        },
      },
      {
        id: "d17-p5", day: 17, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 17 — strings done right",
        copy: "End of Day 17. Strings are the most-used and most-underestimated structure in DSA. They're also the bread and butter of any ML/data role — tokenisers, log parsing, normalisation, embeddings, all string-heavy.\n\nWhat we covered.\n\nMorning, the two facts that change how you write string code. Strings are immutable; build with join(), not +=. Strings are code points, not bytes; len('café') is 4, not 5. Both are correctness issues as much as performance issues.\n\nMidday, the three patterns for character counting that solve most string DSA. Counter (default), sorted compare (one-liner), frequency array (when speed truly matters). Anagram, permutation, character histogram problems all build on these.\n\nAfternoon, the longest-substring-without-repeats problem solved with a sliding window in O(n). The shape — left, right, hash structure of what's in the window — generalises to many 'best subrange with constraint' problems.\n\nEvening, str.translate as the right tool for character-level transformations. 10-100x faster than regex. Reach for regex only when you actually need patterns.\n\nA larger theme. Most string DSA problems are 'apply a primitive (counter, slice, sort, window) to a transformation of the input'. Once you have the primitives, the problems are recognising which primitive applies.\n\nTomorrow, Day 18, linked lists. Less relevant in real ML work than other structures, but a fixture in interviews and a great test of pointer-manipulation skill. Reverse a linked list, detect a cycle, merge sorted lists — the canonical exercises.\n\nSee you in the morning.",
        hashtags: [...CORE, "#Strings"],
        image: {
          template: "quote", headline: "Strings are immutable. Plan accordingly.", subhead: "join() over += in any loop.", accent: "amber",
          aiPrompt: "Pastel amber quote, 1:1",
          canvaBrief: "Pastel amber quote card.",
        },
      },
    ],
  },

  /* DAY 18 */
  {
    day: 18, theme: "Linked lists — fewer than you think, harder than they look", pillar: "dsa",
    posts: [
      {
        id: "d18-p1", day: 18, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "Linked lists exist for one reason",
        copy: "Honest take — linked lists are over-represented in interview problems and under-represented in real ML/data code. You'll write maybe one a year in production. You'll read questions about them all the time.\n\nWhy the gap? Because linked lists exist for one specific reason — O(1) insert and delete given a pointer to the node. Arrays beat them at almost everything else.\n\nLet's enumerate.\n\nCache locality — arrays win. Memory-contiguous, prefetcher-friendly, one cache line covers many elements. Linked-list nodes are scattered across the heap; each access can be a cache miss.\n\nIndexing — arrays win. O(1) random access. Linked lists are O(n) — you walk from the head.\n\nMemory overhead — arrays win. A list of N ints is roughly N pointers. A linked list is N pointers plus N node headers (next pointer, possibly prev pointer, possibly a tag).\n\nIteration speed — arrays win again, by a lot, because of cache effects.\n\nThe one place linked lists win — O(1) insert at a known position, when you have a pointer to the node before. This matters in:\n\nLRU caches — a doubly linked list lets you move a node to the front in O(1) when accessed.\n\nTask schedulers — insert and remove in O(1) anywhere in the queue.\n\nMemory allocators — free lists tracking unused blocks.\n\nUndo/redo stacks where you might insert in the middle.\n\nFor ML/AI specifically? You'll touch them in interviews, in some library internals, and almost never in your own code. But the underlying skill — pointer manipulation, the three-pointer dance, recognising cycles — generalises to tree and graph code, where it matters more.\n\nLearn linked lists for the skill, not for the structure.",
        hashtags: [...CORE, "#LinkedList"],
        image: {
          template: "stat", headline: "1 reason", subhead: "O(1) insert at known node", stat: { number: "1", label: "real reason linked lists exist" }, accent: "amber",
          aiPrompt: "Stat poster with chained-node glyph, amber, 1:1",
          canvaBrief: "Amber gradient. Big 1 centered. Chain glyph 12% opacity.",
        },
      },
      {
        id: "d18-p2", day: 18, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "Reverse a linked list — the universal warmup",
        copy: "If you can reverse a singly linked list iteratively without bugs, you understand pointer manipulation. It's the most-asked warmup question in interviews because it tests exactly the skill that the harder linked-list questions build on.\n\nThe trick is the three-pointer dance.\n\nprev = None\ncurr = head\nwhile curr is not None:\n    nxt = curr.next   # save before we rewire\n    curr.next = prev  # rewire current node\n    prev = curr       # advance prev\n    curr = nxt        # advance curr\nreturn prev\n\nWalk through it on a four-node list — head → 1 → 2 → 3 → 4 → null.\n\nIteration 1: prev=None, curr=node1. Save nxt=node2. Rewire node1.next=None. Advance prev=node1, curr=node2. State: 1 (next: None), 2 → 3 → 4.\n\nIteration 2: prev=node1, curr=node2. Save nxt=node3. Rewire node2.next=node1. Advance prev=node2, curr=node3. State: 2 → 1 → None, 3 → 4.\n\nIteration 3: prev=node2, curr=node3. Save nxt=node4. Rewire node3.next=node2. Advance prev=node3, curr=node4. State: 3 → 2 → 1 → None, 4.\n\nIteration 4: prev=node3, curr=node4. Save nxt=None. Rewire node4.next=node3. Advance prev=node4, curr=None. State: 4 → 3 → 2 → 1 → None.\n\nLoop ends. Return prev (which is now the new head: node4).\n\nOne pass. O(n) time. O(1) extra space. The save-before-rewire is the part that's easy to forget — without it, you lose access to the rest of the list as soon as you change curr.next.\n\nDraw it on paper once. Code it from memory. Done. The skill transfers to harder problems.",
        hashtags: [...CORE, "#LinkedList"],
        image: {
          template: "list", headline: "Reverse a linked list — 4 steps",
          bullets: ["prev=None, curr=head", "save next = curr.next", "curr.next = prev (rewire)", "prev = curr; curr = next", "Repeat until curr is None"],
          accent: "amber",
          aiPrompt: "Step infographic, amber, 1:1",
          canvaBrief: "White grid, 5 rows.",
        },
      },
      {
        id: "d18-p3", day: 18, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "Linked list, in 16 lines",
        copy: "Here's a minimal singly linked list in Python — Node class plus a couple of operations. Notice the structural simplicity. A Node holds a value and a pointer to the next node. That's it.\n\nThe reverse function is the three-pointer dance from the morning post, written compactly. Read it side-by-side with the explanation; the code matches the steps line by line.\n\nThe walk function is a generator. It yields each value as it walks the list head-to-tail. Once you've implemented __iter__ — well, in this case, walk is a top-level generator, but the pattern is the same — your linked list participates in for-loops, list(...) materialisation, sum/len computations.\n\nA few notes on Python-specific design.\n\nWe could use a dataclass. @dataclass with two fields would generate __init__ and __repr__ for free. For a structure this small, the manual __init__ is fine. The main reason to keep it manual is that the recursive type 'Node | None' as a default is a bit awkward for dataclasses.\n\nWe could use __slots__. For a class that creates millions of instances (linked lists with millions of nodes), __slots__ skips the __dict__ allocation per instance and saves substantial memory. Doesn't matter for interview problems; matters in production data structures.\n\nWe should add __repr__. For interview code, often skipped. For real code, always present.\n\nThe linked list is mostly a teaching tool here. The Python stdlib has collections.deque which gives you O(1) append-and-popleft semantics with a C-implemented doubly linked list under the hood. For 99% of cases where you'd want a linked list, use deque. For the remaining 1%, hand-roll it.",
        hashtags: [...CORE, "#Python"],
        image: {
          template: "code", headline: "Linked list + reverse",
          code: { language: "python", snippet: "class Node:\n    def __init__(self, val, nxt=None):\n        self.val, self.nxt = val, nxt\n\ndef reverse(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.nxt\n        curr.nxt = prev\n        prev = curr\n        curr = nxt\n    return prev\n\ndef walk(head):\n    while head:\n        yield head.val\n        head = head.nxt" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d18-p4", day: 18, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Floyd's cycle detection — the slow/fast trick",
        copy: "Question: given a singly linked list, does it have a cycle? (Some node's .next points back to a previous node, creating a loop.)\n\nNaive solution — visit each node, store visited nodes in a set, check membership before adding. O(n) time, O(n) space.\n\nClever solution — Floyd's tortoise-and-hare algorithm. O(n) time, O(1) space.\n\nslow = head; fast = head\nwhile fast and fast.next:\n    slow = slow.next\n    fast = fast.next.next\n    if slow is fast:\n        return True\nreturn False\n\nThe insight — slow moves one step per iteration; fast moves two. If there's no cycle, fast hits None (because fast or fast.next is None at some point) and we return False. If there IS a cycle, fast eventually laps slow inside the cycle and they meet at some node.\n\nWhy they always meet inside a cycle — relative speed. Inside the cycle, fast gains one step per iteration on slow. Eventually the gap closes to zero, regardless of the cycle's size.\n\nWhy O(1) space — we only track two pointers. No set of visited nodes.\n\nA related problem — find the start of the cycle. Variant of Floyd that's also O(1) space. After they meet inside the cycle, reset one pointer to head, then advance both one step at a time. They meet again at the cycle's start. This is the trick interviewers love because it's surprising.\n\nFloyd's algorithm shows up beyond linked lists. The same technique solves 'find the duplicate in an array of n+1 numbers in [1, n]' (treat values as pointers), and certain modular-arithmetic problems.\n\nKnow it. The next time you see a 'detect cycle' question, you have a constant-space answer ready.",
        hashtags: [...CORE, "#FloydsAlgorithm"],
        image: {
          template: "tip", headline: "Slow/fast — detect a cycle",
          bullets: ["slow moves 1 step", "fast moves 2 steps", "Cycle → they meet", "O(1) extra space"],
          accent: "amber",
          aiPrompt: "Pro tip card, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP.",
        },
      },
      {
        id: "d18-p5", day: 18, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 18 — pointers, not nodes",
        copy: "End of Day 18.\n\nLinked lists are a small chapter in the broader DSA story. The skill is pointer manipulation; the structure is just an excuse to practise it.\n\nWhat we covered.\n\nMorning, the honest take. Linked lists exist for O(1) insert/delete given a pointer. Arrays win at almost everything else (cache locality, indexing, memory overhead, iteration speed). Real production code uses them rarely; interviews use them constantly.\n\nMidday, the universal warmup — reverse a singly linked list iteratively. The three-pointer dance (prev, curr, next). Save before rewire. One pass, O(n), O(1) extra space.\n\nAfternoon, a 16-line linked list implementation in Python. Node class plus reverse plus a generator-based walk. Notes on when to use __slots__, dataclass, deque alternatives.\n\nEvening, Floyd's cycle detection. Slow/fast pointers, O(1) space. The subtle relative-speed argument that proves they always meet inside a cycle.\n\nA broader thought. Linked lists are an under-rated test of one specific skill — keeping pointer operations correct under change. The same skill makes tree code (rotate a node, splice in a subtree) and graph code (relax an edge) correct. The DSA week that builds toward trees and graphs starts here.\n\nTomorrow, Day 19, hash maps and sets. The structure that drops you a Big-O class for free. We've already used it in dedup and two-sum; tomorrow we go deep on the mechanics — collision handling, hash function quality, when 'O(1) average' isn't actually average.\n\nSee you in the morning.",
        hashtags: [...CORE, "#LinkedList"],
        image: {
          template: "quote", headline: "Pointer is the structure. Not the value.", subhead: "Linked lists test that one skill.", accent: "amber",
          aiPrompt: "Pastel amber quote, 1:1",
          canvaBrief: "Pastel amber quote card.",
        },
      },
    ],
  },

  /* DAY 19 */
  {
    day: 19, theme: "Hash maps & sets — your O(1) superpower", pillar: "dsa",
    posts: [
      {
        id: "d19-p1", day: 19, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "If your loop has 'in list', think 'in set'",
        copy: "Here's the most common Big-O upgrade in real Python code. Once you can spot it, you'll find it everywhere.\n\nThe smell:\n\nfor x in items:\n    if x in cache:   # cache is a list\n        ...\n\nThat 'in cache' looks innocent. It's hiding an O(n) scan. The whole loop is O(n*m) where m is the size of cache.\n\nThe fix is one line — make cache a set. 'x in set' is O(1) average. The whole loop drops to O(n+m).\n\nFor n = m = 10000, that's 10^8 operations versus 2*10^4. Four orders of magnitude. From 'unusable' to 'instant'.\n\nThe same principle applies to dict-based lookups. 'd[k]' and 'k in d' are O(1) average. If you find yourself searching a list for a matching key inside a loop, you almost always want a dict instead, mapping that key to whatever value you needed.\n\nWhy 'average' matters. Hash tables CAN degrade to O(n) when the hash function is bad and many keys collide. Python's dict and set use well-engineered hash functions for built-in types — strings, ints, tuples — so collisions are rare in practice. For your own classes (overriding __hash__), the burden is on you to write a good hash function. Tuple-of-fields is usually safe.\n\nThe broader pattern — trade memory for hash lookups. Sets and dicts cost O(n) memory; they save O(n) time per lookup. If your alternative is repeated linear searches, the trade is almost always worth it.\n\nWatch for the smell. 'in list' inside a loop. 'list.index' inside a loop. 'manually search a list of dicts'. All variants of the same anti-pattern. All have a one-line fix.\n\nLearn to see the pattern. Half of the optimisations you'll ever make in Python are this one move applied repeatedly.",
        hashtags: [...CORE, "#HashMap"],
        image: {
          template: "stat", headline: "in set = O(1)\nin list = O(n)", subhead: "The cheapest Big-O upgrade.", stat: { number: "O(1)", label: "set membership, dict lookup" }, accent: "amber",
          aiPrompt: "Stat poster, amber, 1:1",
          canvaBrief: "Amber gradient. Big O(1). Subhead.",
        },
      },
      {
        id: "d19-p2", day: 19, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "Group-by patterns with defaultdict",
        copy: "Every data-handling project I've ever worked on has 'group these items by some key' as a frequent operation. The Python stdlib has the perfect tool for it — collections.defaultdict — and most beginners reinvent the wheel.\n\nThe naive group-by:\n\nbuckets = {}\nfor item in items:\n    key = compute_key(item)\n    if key not in buckets:\n        buckets[key] = []\n    buckets[key].append(item)\n\nFour lines, two state checks, easy to typo. The defaultdict version:\n\nfrom collections import defaultdict\n\nbuckets = defaultdict(list)\nfor item in items:\n    buckets[compute_key(item)].append(item)\n\nTwo lines. The defaultdict auto-creates an empty list the first time a key is accessed. Subsequent accesses use the existing list. Net effect — the same group-by, half the code, no state-check bugs.\n\nThe variants are where it gets really useful.\n\ndefaultdict(int) is a counter. defaultdict[key] += 1 works on every key, even unseen ones. Equivalent to collections.Counter for counting purposes, slightly more flexible if you want to mix counting with other operations on the same dict.\n\ndefaultdict(set) gives unique-per-key. Useful for inverted indices — for each tag, the set of documents with that tag.\n\nNested defaultdicts. defaultdict(lambda: defaultdict(int)) gives you a 2D counter — a count for each (row, col) pair. Combine for matrices, co-occurrence stats, transition counts in HMMs.\n\nWhen you see 'manually-built dict-of-lists' in code, reach for defaultdict(list). The migration is one line — change the dict creation. The code becomes cleaner and slightly faster.\n\nBonus — collections.Counter for direct counting. Counter(items) returns {item: count}. .most_common(k) gives the top k by count. Saves you from rolling your own.",
        hashtags: [...CORE, "#Python"],
        image: {
          template: "list", headline: "defaultdict — 4 daily uses",
          bullets: ["defaultdict(list) — group-by", "defaultdict(int) — counter", "defaultdict(set) — unique-per-key", "Nested for matrices/co-occurrence"],
          accent: "amber",
          aiPrompt: "List card, amber, 1:1",
          canvaBrief: "White grid, 4 rows.",
        },
      },
      {
        id: "d19-p3", day: 19, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "Two-sum — the original O(n) interview answer",
        copy: "The two-sum problem: given an UNSORTED array and a target, return indices of two numbers that sum to the target. (Variant of yesterday's sorted version.)\n\nWith no sorted-ness to exploit, we can't use opposite-end two-pointers. But hash maps give us an O(n) solution anyway.\n\nThe trick — as you walk the array, keep a dict mapping each value seen so far to its index. For each new element x, check if (target - x) is already in the dict. If yes, you've found the pair — the previously-seen value at some earlier index, plus the current x at the current index.\n\nLook at the snippet. seen is the dict. We iterate with enumerate. need = target - x is the value we'd need to pair with x. If need is in seen, return (seen[need], i). Otherwise add x to seen with its index.\n\nOne pass. O(n) time. O(n) space.\n\nWhy this is the canonical 'use a hash map' interview answer — it makes the trade-off explicit. Brute force is O(n²) with O(1) space. Hash map is O(n) with O(n) space. The hash map trades memory for time, dropping a Big-O class.\n\nThe variants build on this base.\n\nThree-sum — find triples summing to a target. Sort first, then for each i, run two-sum on the rest. O(n²).\n\nFour-sum — find quadruples. Two nested loops over indices, two-pointer for the inner pair. O(n³).\n\nSubarray sum equals K — different problem, similar shape. Use a prefix sum and a hash map. For each prefix sum p, check if (p - K) has been seen. If yes, the subarray between has sum K.\n\nThe pattern repeats — when the brute force has nested loops over the array, ask if a hash map can replace one of them with O(1) lookup. Usually yes.",
        hashtags: [...CORE, "#TwoSum"],
        image: {
          template: "code", headline: "Two-sum — O(n) with a hash map",
          code: { language: "python", snippet: "def two_sum(nums, target):\n    seen = {}        # value -> index\n    for i, x in enumerate(nums):\n        need = target - x\n        if need in seen:\n            return seen[need], i\n        seen[x] = i\n    return None" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d19-p4", day: 19, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Set operations beat manual loops",
        copy: "If you've never used Python's set operators, your collection-comparison code is longer than it needs to be.\n\nFour operators. Each one a single character. Each one an O(min(|a|, |b|))-ish operation under the hood.\n\na & b — intersection. Items in BOTH a and b.\n\na | b — union. Items in EITHER a or b.\n\na - b — difference. Items in a but not in b.\n\na ^ b — symmetric difference. Items in exactly one of the two, not both.\n\nReplaces all of these manual loops:\n\ncommon = [x for x in a if x in b]   # a & b is shorter and faster\nall_items = list(set(a) | set(b))   # a | b\nonly_in_a = [x for x in a if x not in b]   # a - b\n\nThe operators run in C inside CPython, where the manual list comp is interpreted Python bytecode. Order-of-magnitude speed difference for any non-trivial size.\n\nWhere this comes up in real ML/data work:\n\nTag overlap. tags_a & tags_b gives shared tags between two items.\n\nFeature presence. set(features_required) - set(features_in_data) gives features that are missing.\n\nDeduplication across sources. set(source_a) | set(source_b) merges and dedupes in one step.\n\nLabel diffing. set(predictions) ^ set(ground_truth) shows where they disagree.\n\nA small gotcha — sets are unordered. If order matters, sort the result or use a different structure. Most of the time order doesn't matter for these operations.\n\nThe operators also have method-form equivalents (a.intersection(b), a.union(b), etc) that take any iterable. Use the operators for set-set; use the methods if your right side is a list, tuple, or generator.\n\nLearn the operators once. They show up in clean code constantly.",
        hashtags: [...CORE, "#PythonSets"],
        image: {
          template: "tip", headline: "Set ops > loops",
          bullets: ["a & b — intersection", "a | b — union", "a - b — difference", "a ^ b — symmetric difference"],
          accent: "amber",
          aiPrompt: "Pro tip with venn-diagram glyph, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP. Venn glyph faded.",
        },
      },
      {
        id: "d19-p5", day: 19, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 19 — hash everything you can",
        copy: "End of Day 19. Hash maps and sets are the structures that compound your skill the fastest. Master them and most leetcode-medium array problems become routine.\n\nWhat we covered.\n\nMorning, the canonical Big-O upgrade. 'In list' inside a loop is a smell; replace with 'in set'. Drops from O(n*m) to O(n+m). Four orders of magnitude on real-sized inputs. Spot the pattern; the fix is one line.\n\nMidday, defaultdict for group-by patterns. Four daily uses — list (group-by), int (counter), set (unique-per-key), nested (matrices/co-occurrence). Replaces manual 'if key not in dict' boilerplate everywhere.\n\nAfternoon, two-sum solved in O(n) with a hash map. The canonical 'trade memory for time' answer in interviews. The same pattern (running map of seen values) generalises to subarray-sum-equals-K, longest-subarray-with-property, and other one-pass problems.\n\nEvening, Python's set operators. & | - ^. Each one a one-character replacement for a manual loop, running in C. Use them every time you're comparing collections.\n\nA week-three midpoint check. We've covered Big-O, arrays, strings, linked lists, hash maps. The fundamental data structures and the Big-O upgrades they enable. Tomorrow we add stacks and queues; the day after, sliding window in depth.\n\nTomorrow, Day 20, stacks and queues. The structures behind undo/redo, function calls, BFS, async event loops, parser flows. Small concepts; outsized reach. Plus the most important Python perf gotcha — using list.pop(0) as a queue is O(n), not O(1). Use collections.deque instead.\n\nSee you in the morning.",
        hashtags: [...CORE, "#HashMap"],
        image: {
          template: "quote", headline: "Trade memory for hash. Win one Big-O.", subhead: "The cheapest speedup in DSA.", accent: "amber",
          aiPrompt: "Pastel amber quote, 1:1",
          canvaBrief: "Pastel amber quote card.",
        },
      },
    ],
  },

  /* DAY 20 */
  {
    day: 20, theme: "Stacks & queues — small structures, huge reach", pillar: "dsa",
    posts: [
      {
        id: "d20-p1", day: 20, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "Stack vs queue — LIFO vs FIFO",
        copy: "Two of the most-used structures in computer science, and the difference between them is a single sentence.\n\nA stack is Last-In-First-Out. The most recently added item is the next one to come out. Like a stack of plates — you take the top one off, you put new ones on top.\n\nA queue is First-In-First-Out. The earliest added item is the next one to come out. Like a line at a coffee shop — first in line, first served.\n\nBoth structures support two operations. For a stack, push (add to top) and pop (remove from top). For a queue, enqueue (add to back) and dequeue (remove from front). Both are O(1).\n\nWhere they show up.\n\nStacks — function calls (the call stack). Undo/redo (recent action goes on top). DFS (depth-first traversal — push neighbours, pop one off, recurse). Expression parsing (operator precedence, balanced parentheses). Backtracking algorithms.\n\nQueues — BFS (breadth-first traversal — enqueue neighbours, dequeue the front). Task scheduling (jobs in submission order). Producer-consumer patterns. Async event loops. Message queues like Kafka, RabbitMQ.\n\nIn Python:\n\nFor a stack — use list. append() pushes; pop() removes from the end. O(1) on both. The list IS a stack.\n\nFor a queue — use collections.deque, NOT list. append() and popleft() are both O(1). list.pop(0) is O(n) because it shifts all elements left. This is the most common Python perf bug I see in junior code.\n\nThe rule — pick by access pattern, then pick by Python's right structure. Stack = list. Queue = deque. Don't conflate them.",
        hashtags: [...CORE, "#StackQueue"],
        image: {
          template: "compare", headline: "Stack vs queue",
          compare: { leftLabel: "Stack (LIFO)", leftItems: ["push/pop top", "DFS, recursion", "Undo, parsing", "Python: list"], rightLabel: "Queue (FIFO)", rightItems: ["enqueue back, dequeue front", "BFS, task queues", "Streams, scheduling", "Python: deque"] },
          accent: "amber",
          aiPrompt: "Compare poster, 1:1",
          canvaBrief: "Split. Grey vs amber. VS badge.",
        },
      },
      {
        id: "d20-p2", day: 20, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "Valid parentheses — the classic stack problem",
        copy: "Given a string of brackets like '({[]})' — is it balanced? Each opening bracket has a matching closing bracket of the same type, in the right order. The stack solves it elegantly.\n\nThe pattern — walk the string left to right. On opening brackets, push them onto a stack. On closing brackets, pop the top of the stack and check it's the matching opener. End with the stack empty — balanced. End with non-empty stack or any mismatch — not balanced.\n\nWhy a stack is the right structure — closing brackets match the MOST RECENT unclosed opening bracket. That's exactly stack semantics. Last in, first out.\n\nThe pattern generalises far beyond parentheses.\n\nHTML/XML parsers. Open tags push; close tags pop and check.\n\nMarkdown rendering. Bold/italic markers in nested order.\n\nFunction call frames. Each call pushes a frame; each return pops one.\n\nUndo/redo. Each action pushes onto an undo stack; each undo pops to a redo stack.\n\nBacktracking algorithms. Push state at decision points; pop to backtrack.\n\nThe broader pattern is 'process tokens left to right, defer some to a stack, resolve when a closing token arrives'. Once you can recognise it, you'll see it constantly. Compilers parse with it. Many DP problems unfold with stack-based dispatch.\n\nA tip for the parentheses problem specifically — use a dict to map closers to openers. {')' : '(', ']': '[', '}': '{'}. Then on a closer, pop and compare to dict[closer]. Cleaner than chained if-statements.\n\nA fun extension — given a string with letters AND brackets, find the longest valid balanced substring. Stack-based, but trickier. Worth solving once for fluency.",
        hashtags: [...CORE, "#StackProblem"],
        image: {
          template: "list", headline: "Stack pattern — match-and-pop",
          bullets: ["Walk left to right", "Push opens onto stack", "On close: pop and check match", "End empty = balanced"],
          accent: "amber",
          aiPrompt: "Stack-of-blocks infographic, amber, 1:1",
          canvaBrief: "White grid. 4 rows. Stack-of-blocks glyph faded.",
        },
      },
      {
        id: "d20-p3", day: 20, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "BFS template every interviewer expects",
        copy: "Memorise this template. Adapt the 'neighbours' function. You've solved a quarter of all graph and grid problems.\n\nfrom collections import deque\n\ndef bfs(start, neighbours):\n    q = deque([start])\n    seen = {start}\n    order = []\n    while q:\n        node = q.popleft()\n        order.append(node)\n        for nb in neighbours(node):\n            if nb not in seen:\n                seen.add(nb)\n                q.append(nb)\n    return order\n\nThe shape — a deque as the queue, a set tracking seen nodes (so we don't revisit), a loop that pops from the front, processes the node, and enqueues unseen neighbours.\n\nWhy BFS visits in distance order — because it's a queue. The first node enqueued is the start. Its neighbours are enqueued next, all distance 1. Then their neighbours, all distance 2. Distance grows monotonically as nodes leave the queue. This is why BFS finds shortest paths in unweighted graphs.\n\nWhat the 'neighbours' function does — encapsulates how you get the adjacent nodes. For a graph stored as adjacency list, return graph[node]. For a grid, return the four (or eight) cardinal neighbours that are in-bounds. For a state-space search, return the legal next states.\n\nVariations.\n\nLevel-order traversal — track the level you're on by keeping a separate counter or processing the queue in batches of len(q) at a time.\n\nShortest path — track parent pointers as you visit; reconstruct the path from end to start at the end.\n\nMulti-source BFS — start with multiple nodes in the queue. All are 'distance 0'. The closest source to each unseen node is found in O(V + E).\n\nWord ladder, knight's tour, friendship-degrees, num-islands — all variations on this template. Code the template once; reach for it forever.",
        hashtags: [...CORE, "#BFS"],
        image: {
          template: "code", headline: "BFS — universal template",
          code: { language: "python", snippet: "from collections import deque\n\ndef bfs(start, neighbours):\n    q = deque([start])\n    seen = {start}\n    order = []\n    while q:\n        node = q.popleft()\n        order.append(node)\n        for nb in neighbours(node):\n            if nb not in seen:\n                seen.add(nb)\n                q.append(nb)\n    return order" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d20-p4", day: 20, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Use deque, not list, as a queue",
        copy: "This is a tip I should put on a billboard. It's the most-common Python perf bug I see in junior code, and the fix is one import line.\n\nBad:\n\nq = []\nq.append(x)         # add to back — O(1), fine\nq.pop(0)            # remove from front — O(n), DISASTER\n\nlist.pop(0) is O(n) because removing from the front means shifting every other element left by one position. In a queue with thousands of items, every pop touches thousands of elements. Your nominally-O(n) BFS becomes O(n²).\n\nThe fix is collections.deque (double-ended queue):\n\nfrom collections import deque\nq = deque()\nq.append(x)         # O(1)\nq.popleft()         # O(1) — !\n\nDeque is implemented as a doubly-linked list of fixed-size blocks. Append, appendleft, pop, popleft are all O(1). Random access is O(n) (it's not designed for indexing) — for that, use list.\n\nThe broader rule — pick the right Python structure for your access pattern.\n\nFront-and-back access (queue, double-ended pipe) — deque.\n\nBack-only access (stack) — list.\n\nMin/max retrieval (priority queue) — heapq (we cover Day 24).\n\nKey-based access — dict.\n\nUnique items, membership tests — set.\n\nSorted-on-insert — bisect on a list, OR sortedcontainers' SortedList.\n\nThe time you save by using the right structure on day one is more than the time you'd spend understanding why your code got slow.\n\nNever use list.pop(0) or list.insert(0, x). They look innocent. They're not.",
        hashtags: [...CORE, "#PythonGotchas"],
        image: {
          template: "tip", headline: "deque > list as a queue",
          bullets: ["list.pop(0) is O(n)", "deque.popleft is O(1)", "Same API: append/appendleft", "from collections"],
          accent: "amber",
          aiPrompt: "Pro tip card, amber, 1:1",
          canvaBrief: "Amber header. PRO TIP.",
        },
      },
      {
        id: "d20-p5", day: 20, postNumber: 5, slot: "night", type: "recap", pillar: "dsa",
        title: "Day 20 — stacks and queues, by access pattern",
        copy: "End of Day 20. Two-thirds through DSA week one. The structural foundations are mostly in place; tomorrow we wrap with sliding window deep dive.\n\nWhat we covered today.\n\nMorning, the difference between stack and queue boils down to access pattern — LIFO versus FIFO. Stack for back-and-forth, queue for steady flow. Picking the right one matches the structure to the problem.\n\nMidday, the parentheses pattern. Walk the string, push openers, pop and check on closers. End empty = balanced. The pattern generalises to HTML parsing, function call frames, undo/redo, and any 'most recent unclosed thing' situation.\n\nAfternoon, the BFS template. Deque + seen set + while loop. The shape is the same for graphs, grids, state-space searches. Adapt the 'neighbours' function to your problem; the rest is reusable.\n\nEvening, the most-common Python performance bug. Using list as a queue with .pop(0) — quadratic. Use collections.deque — linear. One import line, dramatic speedup.\n\nA reflection at the day-20 mark. We've now covered all the basic structures (array, string, linked list, hash map, set, stack, queue) and most of the common patterns (two-pointer, sliding window, BFS, dedup, group-by). Tomorrow's sliding window post and Friday's wrap consolidate everything; then week 4 goes deeper into recursion, search, sort, trees, graphs, and DP.\n\nTomorrow, Day 21, sliding window deep dive. The pattern that solves most 'longest/shortest/best subrange' problems. We've used it once in the longest-substring problem; tomorrow we generalise.\n\nSee you in the morning.",
        hashtags: [...CORE, "#StackQueue"],
        image: {
          template: "quote", headline: "Pick the access pattern. The structure follows.", subhead: "Stack for back-and-forth. Queue for steady flow.", accent: "amber",
          aiPrompt: "Pastel amber quote, 1:1",
          canvaBrief: "Pastel amber quote card.",
        },
      },
    ],
  },

  /* DAY 21 */
  {
    day: 21, theme: "Sliding window + week 3 wrap", pillar: "dsa",
    posts: [
      {
        id: "d21-p1", day: 21, postNumber: 1, slot: "morning", type: "concept", pillar: "dsa",
        title: "Sliding window — the pattern for 'best subrange'",
        copy: "If you only learn one DSA pattern this week, learn sliding window. It solves more leetcode-medium problems than any other single technique, and the shape is small enough to memorise once and reach for forever.\n\nThe setup — you have an array (or string) and you want the best subrange satisfying some constraint. Best could be longest, shortest, count of, max sum, anything. The brute force is O(n²) — enumerate all subranges, check each.\n\nThe sliding window upgrade — keep two pointers, left and right, defining the current window. Expand from the right; shrink from the left when the window violates the constraint. Track the optimum window seen as you go.\n\nKey property — each element enters the window once (when right passes it) and leaves at most once (when left passes it). Total work — O(n).\n\nWhen does sliding window apply? Three signals.\n\nOne — the goal is about a subarray or substring. 'Longest', 'shortest', 'count of', 'minimum window containing', etc.\n\nTwo — the constraint is monotonic in window size. Adding to the window can only make the constraint 'better' or 'worse' in one direction. (Sum strictly grows when you add positive numbers; the count of distinct chars can only grow.)\n\nThree — each element is involved at most twice (entering, leaving). If you'd need to revisit elements multiple times, sliding window probably isn't the right tool.\n\nVariants.\n\nFixed-size window. The window is exactly k wide; slide step by step. Useful for 'max sum of k consecutive elements'.\n\nVariable window. Grow and shrink based on the constraint. Useful for 'longest substring with at most k distinct chars'.\n\nThe distinction matters because the loop structure differs slightly. Fixed-size — single for-loop, with the right edge auto-derived from left. Variable — while-loop or for-with-inner-while, expanding and shrinking.\n\nMemorise the shapes; the variants are tweaks.",
        hashtags: [...CORE, "#SlidingWindow"],
        image: {
          template: "stat", headline: "O(n)", subhead: "What 'sliding window' really buys you", stat: { number: "O(n)", label: "for problems that look O(n²)" }, accent: "amber",
          aiPrompt: "Stat poster with arrow-window glyph, amber, 1:1",
          canvaBrief: "Amber gradient. Big O(n). Subhead.",
        },
      },
      {
        id: "d21-p2", day: 21, postNumber: 2, slot: "midday", type: "deepdive", pillar: "dsa",
        title: "How to recognise a window problem",
        copy: "The skill that separates 'I solve sliding-window problems when told it's sliding window' from 'I see a problem and recognise it's sliding window' is pattern recognition. Three signals that, when all three are present, mean the answer is almost certainly a sliding window.\n\nSignal one — the goal involves a subarray or substring. 'Longest', 'shortest', 'count of', 'maximum', 'minimum window containing'. Anything where the answer is itself a contiguous range of the input.\n\nSignal two — the constraint is monotonic with window size. As the window grows, the constraint either keeps getting 'worse' (e.g., sum exceeds target) or keeps getting 'better' (e.g., count of distinct elements grows). Critically, growing or shrinking doesn't 'flip' the constraint unpredictably.\n\nSignal three — each element should logically enter and leave the window at most once. If your problem requires re-examining the same element after it leaves, sliding window is wrong.\n\nIf all three signals fire, sliding window is your tool. Code the shape (left, right, expand-shrink, track optimum), specialise the constraint check, done.\n\nIf signals don't fire, consider:\n\nHash map for one-pass lookup. (Two-sum on unsorted, subarray-sum-equals-K with prefix.)\n\nPrefix sum for range queries. (Multiple sum-in-range queries on a static array.)\n\nDynamic programming for overlapping subproblems. (Longest common subsequence, edit distance.)\n\nBinary search for monotonic answer space. (Min capacity to ship in D days.)\n\nBacktracking for combinatorial enumeration. (All subsets, permutations, valid configurations.)\n\nA practical exercise — pick five leetcode-medium problems labelled 'sliding window'. Try to articulate the three signals for each before solving. The articulation IS the skill; the code falls out once you've named the pattern.",
        hashtags: [...CORE, "#Algorithms"],
        image: {
          template: "list", headline: "3 signals it's a window problem",
          bullets: ["Subarray / substring goal", "Monotonic constraint", "Each element in/out once", "If yes — window. If no — hash/DP."],
          accent: "amber",
          aiPrompt: "List poster, amber, 1:1",
          canvaBrief: "White grid, 4 rows.",
        },
      },
      {
        id: "d21-p3", day: 21, postNumber: 3, slot: "afternoon", type: "code", pillar: "dsa",
        title: "Min subarray sum ≥ target",
        copy: "Given an array of POSITIVE integers and a target, find the shortest contiguous subarray whose sum is at least the target. Return its length, or 0 if no such subarray exists.\n\nThis is sliding window in its purest form. All three signals fire — subarray goal (shortest), monotonic constraint (sum grows when you add a positive, shrinks when you remove), each element handled at most twice.\n\nLook at the snippet.\n\nWe initialise left=0, total=0, best=infinity.\n\nFor each right, x in enumerate(nums) — we expand the window by adding x to total.\n\nThen, while total >= target — the window is valid. Try to shrink from the left while keeping it valid. Update best with the current length. Subtract nums[left] from total. Increment left.\n\nThe inner while-loop is the shrink phase. It continues to shrink as long as the window remains valid (sum >= target). When it stops, the window is JUST below the constraint — we've found the smallest valid window ending at this right.\n\nThe outer for-loop expands the right edge.\n\nReturn — 0 if best is still infinity (no valid window found), else best.\n\nKey complexity argument — left and right each move at most n times across the entire algorithm. left can only go forward (never backward). Total work — O(n).\n\nThe shape — for-with-inner-while — is the standard variable-window template. Memorise it. Variants include longest-substring-without-repeats (similar shape, different shrink condition), minimum-window-substring (more complex constraint check), longest-substring-with-at-most-k-distinct (count-based constraint).\n\nOne pass. O(n). Each element joins and leaves at most once. The pattern is so consistent that once you've coded three of these, you can write a fourth from scratch.",
        hashtags: [...CORE, "#Leetcode"],
        image: {
          template: "code", headline: "Shortest subarray ≥ target",
          code: { language: "python", snippet: "from math import inf\n\ndef min_subarray(target, nums):\n    left = 0\n    total = 0\n    best = inf\n    for right, x in enumerate(nums):\n        total += x\n        while total >= target:\n            best = min(best, right - left + 1)\n            total -= nums[left]\n            left += 1\n    return 0 if best == inf else best" },
          accent: "amber",
          aiPrompt: "Dark code card, amber, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d21-p4", day: 21, postNumber: 4, slot: "evening", type: "tip", pillar: "dsa",
        title: "Practice these 5 problems first",
        copy: "End-of-week-three reflection. If you've followed along but haven't actually written code, you'll forget most of what we covered. The cure is targeted practice on the highest-leverage problems.\n\nFive problems that, between them, cover the patterns from this week and the most common interview shapes. Solve them in this order; understand each before moving on.\n\nOne. Two-sum (Leetcode #1). Hash map for O(n). The canonical 'trade memory for time' answer.\n\nTwo. Longest substring without repeating characters (Leetcode #3). Sliding window with a hash map of seen positions. Cleanest example of the variable-window pattern.\n\nThree. Valid parentheses (Leetcode #20). Stack pattern in its simplest form. Push openers, pop and check on closers, end with empty stack.\n\nFour. Reverse linked list (Leetcode #206). Three-pointer dance. Tests pointer manipulation, the foundational skill behind tree and graph problems.\n\nFive. Number of islands (Leetcode #200). BFS or DFS on a grid. Tests adapting the BFS template to a non-obvious neighbours function.\n\nThese five cover hash map, sliding window, stack, pointer manipulation, BFS — the 'big five' DSA patterns by frequency. About 80% of leetcode-medium problems are variations on these.\n\nMy recommendation — solve each, then explain it out loud (literally, talking) as if to an interviewer. The talking-through is where you discover what you understand vs what you memorised. If you can't explain why two-sum works in O(n), code without notes, you don't understand it yet.\n\nAfter these five, if interviews are your goal, knock out 25-50 more leetcode mediums. The patterns repeat; recognising them is the skill.",
        hashtags: [...CORE, "#Leetcode"],
        image: {
          template: "tip", headline: "5 problems that cover 80% of interviews",
          bullets: ["Two-sum", "Longest unique substring", "Valid parentheses", "Reverse linked list", "BFS on grid"],
          accent: "amber",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Amber header. PRO TIP.",
        },
      },
      {
        id: "d21-p5", day: 21, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Week 3 done — DSA fundamentals locked",
        copy: "End of week three. 21 days. 105 posts. We're 23% of the way through the sprint.\n\nDSA week one is in the books. Tomorrow week 4 begins with recursion and goes through binary search, sorting, trees, graphs, and dynamic programming. The hard half of DSA.\n\nWhat we covered this week.\n\nBig-O as a label, not math. Six classes (constant, log, linear, linearithmic, quadratic, exponential). 30-second estimation recipe. Profile before optimising.\n\nArrays — list as dynamic array, asymmetric ops, two-pointer in three flavours, prefix sums for O(1) range queries.\n\nStrings — immutable, code-point indexed, build with join, character counting via Counter, sliding window for substring problems, str.translate over regex for char swaps.\n\nLinked lists — exist for O(1) insert/delete given a pointer, three-pointer reverse dance, Floyd's slow/fast cycle detection, and the honest 'you'll mostly see them in interviews, not real code'.\n\nHash maps and sets — drop a Big-O class for free, defaultdict for group-by, two-sum in one pass, set operators (& | - ^) for collection comparison.\n\nStacks and queues — pick by access pattern (LIFO vs FIFO), parentheses pattern (push openers, pop on closers), BFS template, deque-not-list for queues.\n\nSliding window — three signals (subarray goal, monotonic constraint, each element in/out once), variable-window template (for-with-inner-while), the pattern that solves most 'best subrange' problems.\n\nFive problems to lock the patterns — two-sum, longest unique substring, valid parentheses, reverse linked list, num-islands.\n\nNext week. Recursion as a thinking tool. Binary search beyond find-an-element. Why Python uses timsort. Trees and BFS/DFS in depth. Graphs. DP without the fear.\n\nThank you for showing up this week. See you tomorrow.",
        hashtags: [...CORE, "#90DaysOfAI"],
        image: {
          template: "quote", headline: "3 weeks down. 10 to go.", subhead: "Next: DSA deep — trees, graphs, DP.", accent: "amber",
          aiPrompt: "Pastel amber quote with progress bar 21/90, 1:1",
          canvaBrief: "Pastel amber quote with 21/90 amber bar.",
        },
      },
    ],
  },
];
