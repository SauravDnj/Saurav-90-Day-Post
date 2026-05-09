import type { DayPlan } from "../types";

const CORE = ["#Python", "#AI", "#100DaysOfCode", "#BuildInPublic", "#PythonProgramming"];

export const week02: DayPlan[] = [
  /* DAY 8 */
  {
    day: 8, theme: "OOP — when (and when not) to use classes", pillar: "python",
    posts: [
      {
        id: "d8-p1", day: 8, postNumber: 1, slot: "morning", type: "concept", pillar: "python",
        title: "What a Python class actually is",
        copy: "Week 2 starts with a topic most people make harder than it needs to be — Python classes.\n\nA class is a factory that produces objects with shared behaviour. That's the whole concept. Stripped of the formalism, you're just saying 'here's a recipe for making things; each thing has its own data and shares the same methods'.\n\nThe one piece that confuses everyone is self. Self isn't magic, isn't a keyword, isn't enforced by the runtime. It's just the name we conventionally give to the first parameter of every method, and Python passes the instance into that slot when you call obj.method(). 'def greet(self):' is just shorthand for 'def greet(instance_of_this_class):'.\n\nYou could call it 'this', or 'me', or 'me_obj'. The convention is self, and following it is non-negotiable in any team codebase. But knowing why it's there demystifies the whole class system.\n\nThe rest of OOP in Python rests on three things.\n\n__init__ — the constructor. Runs once when you create an object. Use it to set the instance's initial attributes (self.x = x, self.y = y).\n\nAttributes — data stored on the instance. Accessed via self.x inside methods, obj.x outside. Type hints make them readable.\n\nMethods — functions defined in the class body that take self as the first argument. Bound to the class so every instance can call them.\n\nThat's 90% of OOP in Python. The remaining 10% is conventions — how to name private attributes (single underscore prefix), when to use class methods versus static methods (rarely), how to override dunder methods to integrate with built-ins (tomorrow's topic).\n\nDon't overengineer. Most useful classes are 30 lines and three methods.",
        hashtags: [...CORE, "#OOP"],
        image: {
          template: "stat", headline: "self is not magic", subhead: "Just the first arg every method gets.", stat: { number: "1", label: "concept beginners over-mystify" }, accent: "violet",
          aiPrompt: "Concept poster, deep violet gradient, big numeral 1, subtitle, snake-and-class glyph, 1:1 LinkedIn premium",
          canvaBrief: "Gradient #150538 to #5a23ee. Big 1 centered. Subhead. Decorative class-diagram in 8% opacity. Brand + pillar pills, footer.",
        },
      },
      {
        id: "d8-p2", day: 8, postNumber: 2, slot: "midday", type: "deepdive", pillar: "python",
        title: "When to use a class — and when not",
        copy: "Java taught millions of developers that everything must be a class. Python is gentler — it gives you classes when you want them, modules and functions when you don't.\n\nUnlearning the 'class everything' reflex is a one-week project. Worth it.\n\nReach for a class when:\n\nYou have state and behaviour that travel together. A user session that holds tokens AND knows how to refresh them. An ML model that holds weights AND knows how to predict. State+behaviour pair = class.\n\nYou need multiple instances. If there's exactly one of something in the program, a module-level dict is often cleaner than a singleton class.\n\nYou want a clear lifecycle — open, use, close. A database connection, a file handle, a model session. The class formalises 'this thing has a beginning and end'.\n\nYou'll have subclasses. If callers need to swap implementations (real DB vs fake DB for testing), a base class with concrete subclasses is the right shape.\n\nDON'T reach for a class when:\n\nYou have a group of utility functions. Use a module. Functions in a module are namespaced (utils.parse_date() reads fine). A class with all-static methods is a Java reflex.\n\nYou'd write one method called 'run' or 'execute'. That's a function pretending to be a class. Just write the function.\n\nYou only have data, no behaviour. Use a dataclass (Day 13) or a NamedTuple. Same shape, way less code, immutable by default if you want it.\n\nYou're using inheritance to share helper methods. Composition (passing helpers in __init__) is almost always cleaner.\n\nA module + a dataclass + a few functions beats a class hierarchy 8 times out of 10. Save classes for when they earn their weight.",
        hashtags: [...CORE, "#CleanCode"],
        image: {
          template: "compare", headline: "When to use a class",
          compare: { leftLabel: "Don't class it", leftItems: ["Pure functions only", "Group of utils → module", "One method called run()", "No internal state"], rightLabel: "Class it", rightItems: ["State + behaviour", "Multiple instances", "Subclassing matters", "Lifecycle (open/close)"] },
          accent: "violet",
          aiPrompt: "Compare poster, white vs violet split, 1:1",
          canvaBrief: "Split 540/540. Grey left, violet right. VS badge. Brand pills.",
        },
      },
      {
        id: "d8-p3", day: 8, postNumber: 3, slot: "afternoon", type: "code", pillar: "python",
        title: "A minimal class, the right way",
        copy: "Here's a 12-line class that demonstrates 80% of what most production Python classes need.\n\nLook at the structure. __init__ takes self plus the constructor args. Attributes get set on self with explicit types. The cosine method takes self plus another Embedding and returns a float. There's a __repr__ at the bottom for debug output.\n\nA few things to notice.\n\nType hints on every parameter and return type. The 'list[float]' is Python 3.9+ syntax for a list of floats. The 'Embedding' in the cosine signature is the class itself — Python lets you reference your own class in a method's signature using a forward reference (the quotes are needed in older Python; 3.12+ lets you skip them in many cases).\n\nThe cosine method does the math inline. For a real codebase you'd use NumPy (a @ b / (np.linalg.norm(a) * np.linalg.norm(b))) which we'll cover Day 30. The pure-Python version makes the formula visible.\n\nThe __repr__ gives a useful debug string. Without it, print(emb) shows '<Embedding object at 0x10ab9f8e0>'. With it, print(emb) shows Embedding(text='hello', dim=384). The difference is hours of debugging time over a project's lifetime.\n\nThis is what 'a Python class' looks like in well-written code. No unnecessary inheritance. No abstract base class layer. No 'Manager' suffix. Just data, behaviour, and a useful repr.\n\nIf your classes are starting to look more elaborate than this and you can't articulate why, simplify. Most classes that justify their existence are small.",
        hashtags: [...CORE, "#PythonOOP"],
        image: {
          template: "code", headline: "Minimal Python class — 12 lines",
          code: { language: "python", snippet: "class Embedding:\n    def __init__(self, vector: list[float], text: str):\n        self.vector = vector\n        self.text = text\n\n    def cosine(self, other: 'Embedding') -> float:\n        a, b = self.vector, other.vector\n        dot = sum(x*y for x, y in zip(a, b))\n        na = sum(x*x for x in a) ** 0.5\n        nb = sum(y*y for y in b) ** 0.5\n        return dot / (na * nb)\n\n    def __repr__(self) -> str:\n        return f'Embedding(text={self.text!r}, dim={len(self.vector)})'" },
          accent: "violet",
          aiPrompt: "Dark code window, violet glow, 1:1",
          canvaBrief: "Dark gradient. Code window with mac controls. Title above. Footer.",
        },
      },
      {
        id: "d8-p4", day: 8, postNumber: 4, slot: "evening", type: "tip", pillar: "python",
        title: "Always write __repr__ first",
        copy: "Tiny habit, massive payoff — write __repr__ before any business logic on a new class.\n\nWhy? Because the moment you write a real method, you'll want to debug it. And debugging without __repr__ looks like this:\n\nprint(my_obj)  # <MyClass object at 0x10ab9f8e0>\n\nWonderful. So informative. Now you have to print individual fields to see what's actually inside.\n\nWith __repr__:\n\nprint(my_obj)  # MyClass(name='Saurav', count=3, status='active')\n\nNow your debugger output is meaningful. Logging is meaningful. Error messages are meaningful. Pytest's failure output is meaningful.\n\nThe minimum useful __repr__ is one line. Class name plus the two or three most important fields.\n\ndef __repr__(self) -> str:\n    return f'{type(self).__name__}(name={self.name!r}, count={self.count})'\n\nNote the !r in the f-string. That's repr formatting — wraps strings in quotes so 'foo' shows as \"'foo'\" not 'foo'. Critical for distinguishing 'None' (the string) from None (the value). Use !r for any field that might be a string, list, or dict.\n\nA class without __repr__ is a class you'll regret in three months. Write the one-liner upfront. Cost: 30 seconds. Lifetime savings: hours.\n\nBonus tip — dataclasses (Day 13) generate __repr__ automatically. If you find yourself writing __repr__ a lot, you probably want a dataclass.",
        hashtags: [...CORE, "#PythonTips"],
        image: {
          template: "tip", headline: "Write __repr__ before any logic",
          bullets: ["Default repr is useless", "Custom repr saves hours", "One-liner is fine", "Show class + key fields"],
          accent: "violet",
          aiPrompt: "Pro tip poster, violet header, 1:1",
          canvaBrief: "Violet header with PRO TIP. White card with 4 items.",
        },
      },
      {
        id: "d8-p5", day: 8, postNumber: 5, slot: "night", type: "recap", pillar: "python",
        title: "Day 8 — class with intent, not by reflex",
        copy: "End of Day 8. Week 2 begins. We're now in 'how Python is actually written in production' territory.\n\nWhat we covered.\n\nMorning, the foundations. A class is a factory that produces objects with shared behaviour. Self is just the first parameter every method receives — Python passes the instance into it. Once you stop seeing self as magic, classes get simpler.\n\nMidday, the most useful guidance about classes — when to use them and when not. Over-classing is a Java reflex. Reach for a class when you have state plus behaviour together, multiple instances, a clear lifecycle, or genuine subclassing needs. Otherwise reach for a function, module, or dataclass.\n\nAfternoon, a 12-line class that demonstrates almost everything you need. Type hints, __init__, an actual method, and a __repr__. Most production classes look about this clean. If yours look more elaborate without justification, simplify.\n\nEvening, the cheapest debugging upgrade in Python — write __repr__ first. One-liner cost. Hours of saved debugging across a project's life.\n\nA broader observation. Python's OOP is not Java's OOP. Python wants you to use the right tool — function, dataclass, class, module — for each situation. Classes aren't the default; they're one option. The reflex to wrap everything in a class is a habit from other languages. Unlearn it; the result is cleaner code.\n\nTomorrow, Day 9, we go deeper — inheritance and dunder methods. The methods that make your objects 'feel native' to Python (work with len(), iter(), with-statements). The single most powerful idea in Python OOP, and the one most beginners skip.\n\nSee you in the morning.",
        hashtags: [...CORE, "#PythonOOP"],
        image: {
          template: "quote", headline: "Class with intent. Not by reflex.", subhead: "Most Python doesn't need OOP.", accent: "violet",
          aiPrompt: "Pastel violet quote card, 1:1",
          canvaBrief: "Pastel gradient. Big quote, italic subhead, accent bar.",
        },
      },
    ],
  },

  /* DAY 9 */
  {
    day: 9, theme: "Inheritance & dunder methods", pillar: "python",
    posts: [
      {
        id: "d9-p1", day: 9, postNumber: 1, slot: "morning", type: "concept", pillar: "python",
        title: "Composition over inheritance — read this once",
        copy: "If there's one piece of OO advice that's universally right and universally ignored, it's this: prefer composition over inheritance. Most code that breaks under inheritance breaks because someone reached for inheritance when composition would have been simpler.\n\nThe symptom — class hierarchies more than two levels deep. Animal → Mammal → Dog → GoldenRetriever. By level three, you're tying changes at level zero to behaviour at level three, and small modifications cascade in ways you didn't predict.\n\nThe fix — favour 'has-a' over 'is-a'.\n\nOld instinct: 'A WeightedSampler is-a Sampler', so make WeightedSampler extend Sampler.\n\nNew instinct: 'A WeightedSampler has-a Sampler under the hood', so pass the sampler in via __init__ and call it.\n\nThe difference is subtle in code, profound in consequences. Composition keeps your inheritance tree flat. Each class is responsible for its own state and delegates other concerns to collaborators it received in the constructor. Testing becomes easy — pass a fake collaborator. Refactoring becomes easy — swap one collaborator without touching the others.\n\nWhen IS inheritance the right tool?\n\nFramework hooks. PyTorch's nn.Module, Django's models.Model, Flask's views — these are designed to be subclassed. The framework expects it; the subclass slot is part of the contract.\n\nTiny mixins for cross-cutting concerns. A SerializableMixin that adds a to_json method. A LoggableMixin that adds debug logging.\n\nDuck typing via Protocols. If you just want polymorphism (different objects responding to the same method), Python's protocols (PEP-544) give you that without requiring inheritance at all.\n\nFor your own business logic, default to composition. The day you find yourself debugging multiple inheritance with diamond patterns is the day you wish you had.",
        hashtags: [...CORE, "#OOP"],
        image: {
          template: "stat", headline: "2", subhead: "max inheritance depth before refactoring", stat: { number: "2", label: "max levels of inheritance you should write" }, accent: "violet",
          aiPrompt: "Stat poster with class-tree glyph, deep violet, 1:1",
          canvaBrief: "Violet gradient. Big 2. Subhead. Tree glyph faded.",
        },
      },
      {
        id: "d9-p2", day: 9, postNumber: 2, slot: "midday", type: "deepdive", pillar: "python",
        title: "The dunder methods that matter",
        copy: "Dunder methods (double-underscore methods, like __init__ and __repr__) are Python's way of letting your classes integrate with built-in syntax and built-in functions.\n\nWhen you write len(my_obj), Python calls my_obj.__len__(). When you write for x in my_obj, Python calls my_obj.__iter__(). When you write my_obj == other, Python calls my_obj.__eq__(other). Implement the dunder; participate in the syntax.\n\nThe ones worth learning first, in priority order:\n\n__init__ — construction. Already covered.\n\n__repr__ — debug string. Already covered.\n\n__eq__ — equality. By default, two objects are equal only if they're the same object in memory. Override __eq__ to compare by value. The moment you override __eq__, you must also override __hash__ — otherwise your objects can't be put in sets or used as dict keys safely. Either return hash of a tuple of fields, or set __hash__ = None to mark the class unhashable.\n\n__len__ — len(). Implement on any class that has a sensible 'size'.\n\n__iter__ — for-loop and iteration. Implement to make for x in my_obj work. Returns an iterator.\n\n__getitem__ — square-bracket access. Implement to make my_obj[i] work. Combine with __len__ and you have a sequence.\n\n__enter__ / __exit__ — with-statement support. Cover Day 12 in detail.\n\n__call__ — make instances callable. obj() then invokes obj.__call__(). Powerful for stateful function-like objects (PyTorch modules use this).\n\nImplement these and your class behaves like a native Python type. That's the goal. Not 'class-shaped'. Native.",
        hashtags: [...CORE, "#PythonAdvanced"],
        image: {
          template: "list", headline: "8 dunder methods that matter",
          bullets: ["__init__", "__repr__", "__eq__ + __hash__", "__len__", "__iter__", "__enter__ / __exit__", "__call__", "__getitem__"],
          accent: "violet",
          aiPrompt: "8-row dunder reference card, white-violet, 1:1",
          canvaBrief: "White grid. 8 rows alternating brandWhisper. Violet number badges + monospace dunder names.",
        },
      },
      {
        id: "d9-p3", day: 9, postNumber: 3, slot: "afternoon", type: "code", pillar: "python",
        title: "A class that behaves like a native type",
        copy: "Look at this TokenStream class. By implementing three dunder methods — __len__, __iter__, __getitem__ — it becomes a sequence in every way Python cares about.\n\nlen(ts) works. ts[0] works. for tok in ts: works. list(ts) materialises it. ts[1:3] gives you a slice (because __getitem__ accepts slice objects, not just ints). All without any extra ceremony.\n\nThis is the 'protocol' approach in Python. Don't inherit from a Sequence base class. Just implement the methods the protocol requires. Python's duck typing does the rest.\n\nWhy this is powerful in real codebases:\n\nNumPy arrays do this. Implementing __len__, __getitem__, and a few more makes their API feel native.\n\nPandas DataFrames do this. df[col] uses __getitem__. len(df) uses __len__. for col in df: uses __iter__ and yields column names.\n\nPyTorch tensors do this. The reason 't[0]' and 'for x in t' work on tensors is because the Tensor class implements these dunders.\n\nYour code can do this too. Got a custom collection? A custom dataset? A wrapper around an external API that returns a list of things? Implement the protocols and your callers get a native experience.\n\nA tip: collections.abc has abstract base classes (Sequence, Iterable, MutableSet, etc) that document each protocol. You don't have to inherit from them — Python doesn't require it — but reading them tells you exactly which dunders to implement for which behaviour.\n\nMake your classes feel like Python. Not like Java that compiled to Python.",
        hashtags: [...CORE, "#PythonInternals"],
        image: {
          template: "code", headline: "Make a class iterable and indexable",
          code: { language: "python", snippet: "class TokenStream:\n    def __init__(self, tokens):\n        self._t = list(tokens)\n\n    def __len__(self):\n        return len(self._t)\n\n    def __iter__(self):\n        return iter(self._t)\n\n    def __getitem__(self, key):\n        return self._t[key]\n\nts = TokenStream(['I', 'love', 'AI'])\nprint(len(ts), ts[0], list(ts))" },
          accent: "violet",
          aiPrompt: "Dark code card, violet, 1:1",
          canvaBrief: "Dark gradient code window. Title above.",
        },
      },
      {
        id: "d9-p4", day: 9, postNumber: 4, slot: "evening", type: "tip", pillar: "python",
        title: "If you override __eq__, override __hash__",
        copy: "There's a subtle Python rule that's easy to miss and causes baffling bugs when you do — if you override __eq__, you MUST also override __hash__ (or explicitly set it to None).\n\nWhy? Because Python's set and dict use both. When you put an object in a set, Python calls __hash__ to find the right hash bucket. When two objects collide in the same bucket, Python calls __eq__ to disambiguate.\n\nThe contract is: if a == b, then hash(a) == hash(b). Two objects that compare equal MUST hash equal. Otherwise dicts and sets behave erratically — same object can be 'in' the set sometimes and not other times, depending on bucket placement.\n\nBy default, Python's __hash__ uses object identity (id()), and __eq__ uses object identity too. Override one, leave the other, and the contract breaks.\n\nThe fix is one line. If you've overridden __eq__ to compare by some fields, hash a tuple of the same fields:\n\ndef __hash__(self):\n    return hash((self.x, self.y))\n\nNow equal objects share a hash. The contract holds. Sets and dicts work correctly.\n\nIf your class is mutable and you don't want it usable as a dict key (which is sane — mutable hashable types lead to subtle bugs), set __hash__ = None at the class level. Now any attempt to put an instance in a set raises TypeError, with a clear message.\n\nDataclasses (Day 13) handle this for you when you use frozen=True. The class becomes immutable, __hash__ is auto-generated from the fields, the contract holds.\n\nThe bug only shows up when you put your objects in a set or dict, which often happens long after the class was written. Front-load the discipline. It costs one line.",
        hashtags: [...CORE, "#PythonGotchas"],
        image: {
          template: "tip", headline: "Override __eq__? Override __hash__.",
          bullets: ["dict/set use both", "Mismatched = chaos", "hash a tuple of same fields", "Or __hash__ = None for unhashable"],
          accent: "violet",
          aiPrompt: "Pro tip poster, 1:1",
          canvaBrief: "Violet header. PRO TIP pill. White card with 4 items.",
        },
      },
      {
        id: "d9-p5", day: 9, postNumber: 5, slot: "night", type: "recap", pillar: "python",
        title: "Day 9 — your classes can speak Python's protocols",
        copy: "End of Day 9. Inheritance and dunders are the difference between writing 'class-shaped Python' and writing Python that actually feels like Python.\n\nWhat we covered.\n\nMorning, composition over inheritance. The advice is universal, the practice is uncommon. Reach for inheritance when you genuinely have an is-a relationship, framework hooks demand it, or you're writing a small mixin. For everything else, pass collaborators in __init__ and delegate. Tests are easier, refactoring is easier, the cognitive load is lower.\n\nMidday, the eight dunder methods that matter. Each one is a hook into Python syntax — len(), for, ==, with, (), and so on. Implement them and your class participates as a first-class citizen.\n\nAfternoon, a TokenStream class that became a real Python sequence by implementing three dunders. NumPy, pandas, PyTorch all use this exact pattern at scale. You can too.\n\nEvening, the __eq__ + __hash__ contract. The bug-class that bites teams when classes meet sets and dicts after months of working fine. Front-load the discipline — override both, or set __hash__ = None.\n\nA pattern across the day. Python's OO design centers on protocols, not class hierarchies. The thing your class needs to 'be' is defined by which methods it implements, not which base class it inherits. This is duck typing, formalised.\n\nTomorrow, Day 10, we make decorators boring. Decorators are the part of Python that scares beginners and confuses intermediates, but they're really just functions that take functions and return functions. Once you internalise that, every Flask route, every PyTorch optimiser, every pytest fixture stops being magic.\n\nSee you in the morning.",
        hashtags: [...CORE, "#100DaysPython"],
        image: { template: "quote", headline: "Speak Python's protocols.", subhead: "Your class will feel native.", accent: "violet",
          aiPrompt: "Pastel violet quote card, 1:1",
          canvaBrief: "Pastel gradient quote card.",
        },
      },
    ],
  },

  /* DAY 10 */
  {
    day: 10, theme: "Decorators — finally explained", pillar: "python",
    posts: [
      {
        id: "d10-p1", day: 10, postNumber: 1, slot: "morning", type: "concept", pillar: "python",
        title: "A decorator is just a function that returns a function",
        copy: "If there's one Python feature that consistently scares newcomers and confuses intermediates, it's the decorator. Take away the @ syntax and the fear evaporates.\n\n@my_decorator\ndef foo(): ...\n\nIs LITERALLY the same as:\n\nfoo = my_decorator(foo)\n\nThat's the entire concept. The @ is sugar for 'pass this function to the named callable, replace it with whatever the callable returns'.\n\nmy_decorator is a function. It receives foo (the function being decorated) as input. It returns something. Usually that 'something' is a wrapper function — another function that calls foo and adds some behaviour around it. The original 'foo' is now bound to the wrapper.\n\nThat's why the same decorator can:\n- Time a function (wrap it, log how long it took)\n- Cache results (wrap it, return cached value if available)\n- Authenticate calls (wrap it, check user before running)\n- Register a route (wrap it, add it to a routing table)\n- Convert exceptions (wrap it, catch and re-raise)\n\nAll of these are 'function in, function out'. Just the wrapper does different things.\n\nOnce you internalise this — say it out loud once a day for a week if you have to — every framework you ever read becomes easier. @app.route('/users') in Flask: app.route is a function that returns a decorator that registers the wrapped function in app's routing table. @torch.no_grad(): torch.no_grad is a function that returns a decorator that disables gradient tracking around the wrapped function. Same pattern.\n\nDecorators aren't magic. They aren't a special language feature. They're just function composition with prettier syntax. Internalise that, and Python's biggest source of mystery becomes one of its quieter pleasures.",
        hashtags: [...CORE, "#Decorators"],
        image: {
          template: "stat", headline: "@ is just sugar", subhead: "foo = decorator(foo)", stat: { number: "@", label: "is just shorthand for wrapping" }, accent: "violet",
          aiPrompt: "Stat poster with stylised @ symbol large, violet, 1:1",
          canvaBrief: "Violet gradient. Large @ symbol Plus Jakarta 320pt centered. Subhead. Brand pills.",
        },
      },
      {
        id: "d10-p2", day: 10, postNumber: 2, slot: "midday", type: "deepdive", pillar: "python",
        title: "Three decorator shapes you'll meet",
        copy: "Decorators come in three shapes. Knowing which is which makes reading framework code much easier.\n\nShape one — the plain decorator. @retry. The function gets wrapped directly. retry is a function that takes a function and returns a function.\n\nShape two — the parameterised decorator. @retry(times=3). retry(times=3) returns a decorator (which then takes the function and returns a wrapped function). Two layers of nesting. retry is now a 'decorator factory' — a function that produces decorators based on parameters.\n\nThis is the pattern that confuses intermediate Python users. You see @retry(times=3) and think 'a decorator with arguments'. It's actually 'a function call that returns a decorator, which then decorates'. The @ runs the call result, not the call itself.\n\nShape three — stacked decorators. Multiple @ lines on a single function. They apply bottom-up. @auth → @log → @cache → def foo() means: cache wraps foo, log wraps cache(foo), auth wraps log(cache(foo)). The outermost decorator runs first when the function is called.\n\nImportant — stacked decorators compose. The order matters. @auth above @log means auth runs before log on each call. Reverse them and authentication checks come AFTER logging, which usually isn't what you want.\n\nA related must-know: functools.wraps. When your wrapper function has its own __name__ ('wrapper') and __doc__ (probably None), debugging gets confusing — stack traces show 'wrapper' instead of the original function name. @functools.wraps(fn) inside the decorator copies the original's metadata onto the wrapper. ALWAYS use it. Tomorrow's tip post is dedicated to it.\n\nThree shapes. Same underlying mechanism. Once you can recognise them in the wild, decorator-heavy frameworks become readable.",
        hashtags: [...CORE, "#PythonAdvanced"],
        image: {
          template: "list", headline: "3 shapes of decorator",
          bullets: ["@plain — wraps directly", "@parameterised(...) — factory", "Stacked — applied bottom-up", "@functools.wraps preserves metadata"],
          accent: "violet",
          aiPrompt: "List poster, white-violet, 1:1",
          canvaBrief: "White grid. 4 rows. Violet badges.",
        },
      },
      {
        id: "d10-p3", day: 10, postNumber: 3, slot: "afternoon", type: "code", pillar: "python",
        title: "A timing decorator in 10 lines",
        copy: "Theory done. Here's a real, useful, drop-in decorator I use in every AI/ML repo I write.\n\n@timed prints how long any function took to run. Drop it onto your training step, your retrieval call, your model load — anywhere you suspect a bottleneck. Fifteen seconds to add, lifelong utility.\n\nLook at the structure. timed is a function that takes fn (the function being decorated). Inside, it defines wrapper, which records the start time, calls fn with whatever args it received, records the end time, prints the duration, returns the result. Then timed returns wrapper.\n\nThe @functools.wraps(fn) on the wrapper is non-negotiable. Without it, fn.__name__ becomes 'wrapper' inside the decorator, and your debug prints would say 'wrapper: 12 ms' instead of 'train_one_epoch: 12 ms'. Useless. With it, your debug output is meaningful and your stack traces still show the right function names.\n\nThe *args and **kwargs forwarding lets the decorator work on any function regardless of signature. The decorator doesn't care if the wrapped function takes 0 args or 27.\n\nUse:\n\n@timed\ndef train_one_epoch():\n    ...\n\nNow every call prints the timing. Nothing else changes — the function behaves identically.\n\nFor more sophisticated timing (collecting stats, sending to a metrics service, suppressing noisy logs), the structure expands but the shape doesn't change. function in, wrapper around it, function out.\n\nThis is the simplest decorator you'll write. The next 80% of decorators you'll write are variations on this template — caching, retrying, authenticating, logging. Same shape, different middle.",
        hashtags: [...CORE, "#PythonCode"],
        image: {
          template: "code", headline: "@timed — measure any function",
          code: { language: "python", snippet: "import functools, time\n\ndef timed(fn):\n    @functools.wraps(fn)\n    def wrapper(*args, **kwargs):\n        t0 = time.perf_counter()\n        out = fn(*args, **kwargs)\n        dt = time.perf_counter() - t0\n        print(f'{fn.__name__}: {dt*1000:.1f} ms')\n        return out\n    return wrapper\n\n@timed\ndef train_one_epoch(): ..." },
          accent: "violet",
          aiPrompt: "Dark code card, violet glow, 1:1",
          canvaBrief: "Dark gradient code window. Title above.",
        },
      },
      {
        id: "d10-p4", day: 10, postNumber: 4, slot: "evening", type: "tip", pillar: "python",
        title: "Always wrap your decorators in @functools.wraps",
        copy: "If you remember nothing else from today's posts, remember this — @functools.wraps is non-negotiable in any decorator you write.\n\nWhy is this so important? Because the wrapper function inside your decorator has its own identity. Without functools.wraps:\n\n@my_decorator\ndef foo():\n    \"\"\"Does the foo thing.\"\"\"\n    pass\n\nfoo.__name__   # 'wrapper'  — wrong\nfoo.__doc__    # None       — wrong\nfoo.__module__ # decorator's module — wrong\n\nThis breaks more than aesthetics.\n\nFlask routing breaks. Flask uses fn.__name__ to register endpoints. If two decorated functions both have __name__ == 'wrapper', Flask sees them as the same endpoint.\n\nFastAPI breaks similarly. Auto-documentation pulls from __doc__ and __name__.\n\nDebugger output is wrong. Stack traces show 'wrapper' on every line, no matter which actual function failed.\n\nLogging is wrong. Anywhere you log fn.__name__ for diagnostics, you get 'wrapper' instead of the meaningful name.\n\nUnit tests break. Anywhere a test imports a function by name and asserts its __name__, the assertion fails.\n\nThe fix is one decorator from the standard library:\n\nimport functools\n\ndef my_decorator(fn):\n    @functools.wraps(fn)\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs)\n    return wrapper\n\nfunctools.wraps copies fn's __name__, __doc__, __module__, __qualname__, and __wrapped__ attributes onto the wrapper. The wrapper now identifies itself as the wrapped function.\n\nOne line. No excuse. Add it to every decorator you write, forever. The day you forget is the day Flask routes start colliding silently.",
        hashtags: [...CORE, "#PythonGotchas"],
        image: {
          template: "tip", headline: "@functools.wraps — never skip it",
          bullets: ["Preserves __name__", "Preserves __doc__", "Keeps Flask routing happy", "One line, no excuse"],
          accent: "violet",
          aiPrompt: "Pro tip poster, 1:1",
          canvaBrief: "Violet header. PRO TIP. White card.",
        },
      },
      {
        id: "d10-p5", day: 10, postNumber: 5, slot: "night", type: "recap", pillar: "python",
        title: "Day 10 — decorators demystified",
        copy: "End of Day 10. Decorators were probably the topic I dreaded explaining most when I started planning this 90-day sprint, and they turned out to compress into four clean posts. Sometimes the scary topics aren't.\n\nWhat we covered.\n\nMorning, the foundational sentence — @ is just sugar for 'foo = decorator(foo)'. A decorator is a function that takes a function and returns a function. Once that lands, every framework you've ever found cryptic gets less cryptic.\n\nMidday, the three decorator shapes you'll meet — plain, parameterised (decorator factory), and stacked. Knowing which shape a piece of code is using turns it from 'mysterious framework magic' into 'oh, that's a function returning a function'.\n\nAfternoon, a real ten-line @timed decorator. The template you'll adapt for caching, retrying, logging, auth — same structure, different middle.\n\nEvening, the one rule that's not optional — @functools.wraps. Without it, decorators silently break Flask routes, FastAPI docs, debuggers, and logs. With it, your decorator behaves correctly. One import, one line, no exceptions.\n\nSome reflection. Decorators are the gateway to more advanced Python — context managers (Day 12), generators (Day 11), descriptors, metaclasses. They share a theme: Python lets you intercept normal mechanisms (function calls, with-statements, attribute access) and inject behaviour. The interception points are the language's deeper power.\n\nTomorrow, Day 11, we go to generators and lazy evaluation. The reason you can stream a 100GB file with a Python loop and not run out of memory. The pattern that makes data-loading pipelines, infinite sequences, and memory-bounded processing all work in plain Python.\n\nSee you in the morning.",
        hashtags: [...CORE, "#PythonDecorators"],
        image: { template: "quote", headline: "@ is sugar. Functions wrap functions.", subhead: "Once you see it, every framework reads.", accent: "violet",
          aiPrompt: "Pastel violet quote card, 1:1",
          canvaBrief: "Pastel gradient quote card.",
        },
      },
    ],
  },

  /* DAY 11 */
  {
    day: 11, theme: "Generators & lazy evaluation", pillar: "python",
    posts: [
      {
        id: "d11-p1", day: 11, postNumber: 1, slot: "morning", type: "concept", pillar: "python",
        title: "A generator is a function that pauses",
        copy: "Replace 'return' with 'yield' in a function and you get a generator. That swap unlocks one of Python's most powerful patterns — lazy, paused, memory-bounded sequences.\n\nA regular function runs to completion and returns a single value. A generator function, when called, doesn't actually run the body. It returns a generator object. The body runs piece by piece, pausing at each yield, resuming when next() is called on the generator.\n\nThe practical effect — you can produce a sequence of values one at a time, holding only the current value in memory, and the consumer can stop anywhere without ever materialising the rest.\n\nThree consequences this enables.\n\nStream a 100GB file line by line. The 'for line in f' pattern is a generator under the hood — Python's file objects implement __iter__ as a generator. Memory stays low; processing happens chunk by chunk.\n\nIterate infinite sequences. A generator can yield forever. itertools.count() yields 0, 1, 2, 3, … with no upper bound. Take what you need; stop when you want.\n\nBuild composable pipelines. Generators chain. read → parse → filter → transform — each stage a generator, each stage processing one item at a time, total memory bounded by the largest intermediate item.\n\nMost Python libraries you respect hide a generator inside. requests' iter_content() streams response bodies. PyTorch's DataLoader is generator-shaped. TensorFlow's tf.data is generator-shaped. SQLAlchemy's query iteration is generator-shaped.\n\nThe trick to thinking in generators is to ask: 'do I need all the values at once, or just one at a time?' If 'one at a time', use a generator. If 'all at once for some reason' — start with a generator anyway and convert to a list at the end if needed. Lazy first, eager last.",
        hashtags: [...CORE, "#PythonGenerators"],
        image: {
          template: "stat", headline: "yield = pause", subhead: "next() = resume", stat: { number: "∞", label: "memory-bounded streams, possible" }, accent: "violet",
          aiPrompt: "Stat poster with infinity glyph, violet, 1:1",
          canvaBrief: "Violet gradient. Big infinity centered. Subhead. Brand pills.",
        },
      },
      {
        id: "d11-p2", day: 11, postNumber: 2, slot: "midday", type: "deepdive", pillar: "python",
        title: "Generator expressions — list comp's lazy cousin",
        copy: "Yesterday we covered list comprehensions. Today's twist: replace the square brackets with parentheses and you get a generator expression. Same syntax, different semantics, dramatically different memory.\n\nList comp: [x*x for x in big_iter] — builds the entire list in memory. If big_iter has 10 million items, the list has 10 million items.\n\nGenerator expression: (x*x for x in big_iter) — produces values lazily on demand. Memory cost: O(1). Time cost on creation: also O(1). The work happens as you iterate.\n\nThe swap from [] to () is one character. The implications are enormous.\n\nWhen does it matter?\n\nLogging pipelines processing GB-scale logs. List comp would blow your RAM. Generator expression streams.\n\nReading large datasets where you only need the values that pass a filter. Generator expression filters lazily — never materialises the rejected items.\n\nAnything piped into a single-pass aggregator like sum(), max(), min(), any(), all(). sum(x*x for x in big_iter) doesn't need to materialise a list — it consumes squares one at a time and accumulates the sum. Constant memory. Fast.\n\nThe pattern: when the next step is 'consume one item, do something, produce result', use a generator expression. When the next step is 'reuse the collection multiple times', use a list comp.\n\nGotcha: generators are single-use. Iterate once, they're exhausted. If you need to iterate twice, store as a list or rebuild the generator.\n\nGotcha 2: generators don't support indexing or len(). They don't know in advance how many items they'll produce.\n\nGotcha 3: error handling. An exception in the body of a generator expression surfaces only when you reach the failing item. Easier to debug if you put complex logic in a separate generator function with proper error handling.",
        hashtags: [...CORE, "#PythonAdvanced"],
        image: {
          template: "compare", headline: "List comp vs gen expression",
          compare: { leftLabel: "[ ... ] list comp", leftItems: ["Builds full list", "O(n) memory", "Subscriptable", "Re-iterable"], rightLabel: "( ... ) generator", rightItems: ["Lazy, on-demand", "O(1) memory", "Single use", "Pipeline-friendly"] },
          accent: "violet",
          aiPrompt: "Compare poster, 1:1",
          canvaBrief: "Split 540/540. Grey vs violet. VS badge.",
        },
      },
      {
        id: "d11-p3", day: 11, postNumber: 3, slot: "afternoon", type: "code", pillar: "python",
        title: "Stream a huge file in 6 lines",
        copy: "Imagine you have a 50GB log file from production. You need to find all lines starting with 'ERROR' and print them. You can't load the file into memory.\n\nGenerators handle this elegantly. Look at the snippet — three small generator functions chained together.\n\nlines() opens the file and yields one line at a time. The 'for line in f' is itself a generator (Python file iteration), so lines() is just forwarding. Memory cost: one line at a time.\n\ntokens() takes the line generator and splits each line into lowercase tokens, yielding each token. Memory cost: one line plus its tokens.\n\nThe outer for-loop consumes tokens one at a time. Filters by 'startswith('error')'. Prints the matches.\n\nTotal memory used to process a 50GB file: roughly the size of one line. Could be a few KB. The OS handles file buffering; Python handles the streaming.\n\nThis pattern composes. Add another stage. parse_event(token_iter) → filter_severity(event_iter) → bucket_by_hour(filtered_iter). Each stage processes one item at a time, yields one item at a time. The whole pipeline's memory is bounded by the largest single item, not the whole dataset.\n\nIt's not just about huge files. The same pattern applies to:\n\nStreaming network responses (requests.iter_content).\nReading from a database cursor (most ORMs).\nProcessing telemetry events one at a time.\nIterating tokens through an LLM tokeniser.\n\nWhen people say 'Python is slow', they often mean 'I wrote eager code that materialised everything at every step'. Generators flip this. Lazy by default. Materialise only at the boundary.",
        hashtags: [...CORE, "#PythonStreaming"],
        image: {
          template: "code", headline: "Streaming with chained generators",
          code: { language: "python", snippet: "def lines(path):\n    with open(path) as f:\n        for line in f:\n            yield line\n\ndef tokens(line_iter):\n    for line in line_iter:\n        for tok in line.split():\n            yield tok.lower()\n\nfor t in tokens(lines('big.log')):\n    if t.startswith('error'):\n        print(t)" },
          accent: "violet",
          aiPrompt: "Dark code card, violet, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d11-p4", day: 11, postNumber: 4, slot: "evening", type: "tip", pillar: "python",
        title: "yield from — chain generators in one line",
        copy: "Once you start writing generators, you'll quickly hit a pattern — a generator that delegates part of its work to another generator. The naive way:\n\ndef outer():\n    for x in inner():\n        yield x\n\nThis works, but Python has a better way:\n\ndef outer():\n    yield from inner()\n\n'yield from' delegates to another iterable. It yields every value the inner generator yields. Visually cleaner. Functionally identical for the basic case. But it does more — it correctly forwards .send(), .throw(), and .close() calls to the inner generator. And when the inner generator returns a value (yes, generators can return), 'yield from' captures it.\n\nThis matters more than it seems. If you're writing a coroutine-shaped generator that another piece of code drives via .send(), the manual for-yield loop breaks the protocol. 'yield from' preserves it.\n\nWhere this comes up most often:\n\nTree traversals. Walking a tree where children are subtrees: yield from traverse(child) cleanly forwards everything from the recursive call.\n\nFlattening nested iterables. yield from chain1, then yield from chain2, then yield from chain3.\n\nGenerator pipelines that route through helper generators based on conditions.\n\nDelegating to itertools functions that already return iterables. yield from itertools.chain(a, b).\n\nA tiny but real perf benefit too — 'yield from' is implemented in C in CPython, where the manual loop is interpreted bytecode. The difference is small for short iterables, noticeable for long ones, especially in deep recursion.\n\nUse 'yield from' anywhere you'd otherwise write 'for x in inner: yield x'. It's clearer to read, faster to run, and correctly forwards the generator protocol. Free upgrade.",
        hashtags: [...CORE, "#PythonTips"],
        image: {
          template: "tip", headline: "yield from > manual re-yield",
          bullets: ["Cleaner syntax", "Forwards .send / .throw", "Faster bytecode", "Best in tree traversals"],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d11-p5", day: 11, postNumber: 5, slot: "night", type: "recap", pillar: "python",
        title: "Day 11 — lazy beats eager when memory is finite",
        copy: "End of Day 11. Generators are one of those Python features that, once internalised, change how you write almost every data-processing piece of code.\n\nWhat we covered.\n\nMorning, the conceptual unlock — yield turns a function into a generator that pauses and resumes. Memory-bounded streams, infinite sequences, composable pipelines — all flow from this single mechanism.\n\nMidday, generator expressions. The lazy cousin of list comprehensions. Swap [] for () and you go from O(n) memory to O(1). The right default for sum/max/any pipelines and for any case where you'll iterate exactly once.\n\nAfternoon, a 6-line streaming pipeline that processes huge files line by line in constant memory. Three small generators chained together — read, tokenise, consume. The pattern composes to arbitrary stages. This is how grown-up Python handles big data without reaching for Spark.\n\nEvening, 'yield from' as the clean way to delegate to another generator. Cleaner code, correctly forwards the generator protocol, and slightly faster. Use it anywhere you'd otherwise write a for-yield loop.\n\nA running theme across week 2 — Python rewards explicit, composable, narrow-purpose constructs. Decorators wrap one concern. Dunder methods participate in one protocol. Generators yield one value at a time. The lego pieces are small; the assemblies are big.\n\nTomorrow, Day 12, context managers. The 'with' statement. Why your file handles never leak in Python and how to write your own context managers for any setup-and-teardown pattern. Plus the rare-but-clean ExitStack for composing several context managers at runtime.\n\nSee you in the morning.",
        hashtags: [...CORE, "#100DaysPython"],
        image: { template: "quote", headline: "Lazy when you can. Eager when you must.", subhead: "Memory is finite. Streams aren't.", accent: "violet",
          aiPrompt: "Pastel violet quote card, 1:1",
          canvaBrief: "Pastel quote card.",
        },
      },
    ],
  },

  /* DAY 12 */
  {
    day: 12, theme: "Context managers — the with-statement, demystified", pillar: "python",
    posts: [
      {
        id: "d12-p1", day: 12, postNumber: 1, slot: "morning", type: "concept", pillar: "python",
        title: "with-statements never leak resources",
        copy: "Every long-lived program eventually leaks something. File handles, network sockets, database connections, locks, GPU memory. The leak is rarely a single bug — it's the accumulation of forgotten cleanup. Open a thing on line 12; forget to close it on line 47; the leak waits.\n\nPython's 'with' statement was designed to make this class of bug nearly impossible.\n\nwith open('file') as f:\n    process(f)\n\nThe runtime guarantees that f.close() runs when the block exits. Even if process(f) raises an exception. Even if you return early from a function. Even if a deeply nested call inside process() causes a stack unwind. The cleanup happens.\n\nBehind the scenes, 'with' looks for two methods on the object — __enter__ and __exit__. __enter__ returns the resource (and runs setup). __exit__ runs at block end (and handles teardown). Python ensures __exit__ is called even on exceptions.\n\nThis pattern generalises far beyond files:\n\nDatabase connections. with engine.begin() as conn: ... — transaction commits on success, rolls back on exception.\n\nLocks. with lock: ... — acquire on enter, release on exit. Even if the body crashes, the lock releases.\n\nTemp directories. with tempfile.TemporaryDirectory() as path: ... — directory created on enter, deleted on exit.\n\nGPU memory. with torch.cuda.device(0): ... — device set on enter, restored on exit.\n\nTimers and metrics. with timer('inference'): ... — start time recorded on enter, duration computed on exit.\n\nThe principle is simple — any resource with a 'must clean up' rule belongs in a context manager. If you find yourself writing try/finally with a paired open/close, you almost certainly want a context manager instead.\n\nLeaks are bugs the runtime can prevent for you. Let it.",
        hashtags: [...CORE, "#PythonContextManagers"],
        image: {
          template: "stat", headline: "0 leaks", subhead: "with-statement, every time", stat: { number: "0", label: "resource leaks if you use 'with'" }, accent: "violet",
          aiPrompt: "Stat poster, violet, 1:1",
          canvaBrief: "Violet gradient. Big 0 centered.",
        },
      },
      {
        id: "d12-p2", day: 12, postNumber: 2, slot: "midday", type: "deepdive", pillar: "python",
        title: "Two ways to write a context manager",
        copy: "Python gives you two patterns to write a context manager. They're equivalent in capability; they differ in style and in what they're best at.\n\nPattern one — class with __enter__ and __exit__:\n\nclass Timer:\n    def __enter__(self):\n        self.start = time.time()\n        return self  # what 'as' binds to\n    def __exit__(self, exc_type, exc_value, tb):\n        print(f'took {time.time() - self.start:.2f}s')\n        return False  # don't suppress exceptions\n\nUse the class form when:\n- You need to maintain instance state across enter/exit (timer state, counters)\n- You want to handle exceptions explicitly inside __exit__ (log, transform, suppress)\n- You need an async sibling (__aenter__ / __aexit__)\n- The context manager has additional methods callers should call inside the block\n\nPattern two — the @contextmanager decorator:\n\nfrom contextlib import contextmanager\n\n@contextmanager\ndef timer():\n    start = time.time()\n    try:\n        yield\n    finally:\n        print(f'took {time.time() - start:.2f}s')\n\nThe code BEFORE yield runs at __enter__. The code AFTER yield (inside finally) runs at __exit__. Whatever you yield is what 'as' binds to. The try/finally ensures cleanup happens even on exception.\n\nUse the decorator form when:\n- The context manager is short and doesn't need much state\n- You're writing a one-off CM for a specific function\n- The setup/teardown reads as a small linear flow\n\nMy default is the decorator. It's shorter, fewer moving parts, and reads top to bottom. I switch to the class form when I need explicit exception handling or async support.\n\nFor async, the equivalents are __aenter__/__aexit__ and @asynccontextmanager. Same shape, just async.",
        hashtags: [...CORE, "#PythonAdvanced"],
        image: {
          template: "compare", headline: "Two ways to make a CM",
          compare: { leftLabel: "Class", leftItems: ["__enter__ / __exit__", "Explicit exception handling", "Async siblings (__aenter__)", "More verbose"], rightLabel: "@contextmanager", rightItems: ["yield-based", "Cleaner for one-offs", "Auto async via @asynccontextmanager", "from contextlib"] },
          accent: "violet",
          aiPrompt: "Compare poster, 1:1",
          canvaBrief: "Split. Grey vs violet. VS badge.",
        },
      },
      {
        id: "d12-p3", day: 12, postNumber: 3, slot: "afternoon", type: "code", pillar: "python",
        title: "Time any block of code with a context manager",
        copy: "Here's a 10-line context manager you'll use across the next 78 days, and probably every Python project after that.\n\n@contextmanager turns the function into a CM. Setup happens before yield. Cleanup happens after yield (inside finally so it runs even if the body raises).\n\nUsage:\n\nwith timed('inference'):\n    out = model.predict(x)\n\nPrints 'inference: 12.3 ms'. Drop it around any block of code you suspect might be slow. Inside training loops, around model loads, around HTTP calls. Way more useful than scattering time.time() calls and arithmetic across your code.\n\nNote the structure of __exit__'s arguments. If we'd written this as a class, __exit__ would receive (exc_type, exc_value, tb). The contextmanager decorator handles those for you — exceptions inside the 'with' block automatically propagate out unless you explicitly catch them around the yield.\n\nIf you wanted to suppress exceptions (rarely correct, but occasionally useful), you'd add a try/except around yield. If you wanted to log them, same. If you wanted to add fields to a tracing span based on whether the block raised, also same.\n\nWhy I always print durations to stderr in production code: stdout is for program output, stderr is for diagnostics. Use logger.info() if you have a logger configured. Don't pollute pipeable program output with timing noise.\n\nThe @contextmanager decorator + a tiny try/finally is one of the most underrated patterns in Python. Once you start writing CMs, you'll find places to use them everywhere — feature flags scoped to a block, mock setups in tests, profiler regions, database transactions. Pattern's the same.",
        hashtags: [...CORE, "#PythonCode"],
        image: {
          template: "code", headline: "@contextmanager timer",
          code: { language: "python", snippet: "from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timed(label='block'):\n    t0 = time.perf_counter()\n    try:\n        yield\n    finally:\n        dt = time.perf_counter() - t0\n        print(f'{label}: {dt*1000:.1f} ms')\n\nwith timed('inference'):\n    out = model.predict(x)" },
          accent: "violet",
          aiPrompt: "Dark code card, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d12-p4", day: 12, postNumber: 4, slot: "evening", type: "tip", pillar: "python",
        title: "ExitStack — composing many context managers",
        copy: "Sometimes you need to enter several context managers at once, and the count is only known at runtime. Maybe you're processing N files specified on the command line. Maybe you're holding M database connections for a fan-out query.\n\nThe naive approach is nesting:\n\nwith open(p1) as f1:\n    with open(p2) as f2:\n        with open(p3) as f3:\n            ...\n\nUgly. And impossible if you don't know the count up front.\n\ncontextlib.ExitStack solves this:\n\nfrom contextlib import ExitStack\n\nwith ExitStack() as stack:\n    files = [stack.enter_context(open(p)) for p in paths]\n    process(files)\n\nExitStack is itself a context manager. Inside its block, you call enter_context() to register additional context managers. When the ExitStack exits, it calls __exit__ on every registered manager in reverse order of entry — last in, first out. Just like nested 'with' blocks would.\n\nWhere this shines:\n\nDynamic resource counts. N files, N connections, N temp directories. Loop and stack.enter_context() each one.\n\nConditional context managers. Sometimes you want a CM, sometimes you don't. Ugly with nested 'with'; clean with ExitStack and an if-statement around stack.enter_context().\n\nTest fixtures composing several mocks/patches/temp resources whose count varies per test.\n\nMulti-step ETL pipelines that hold open multiple readers and writers.\n\nThe register variant — stack.callback(fn, *args, **kwargs) — registers an arbitrary cleanup function instead of a CM. Useful for paired setup/teardown that doesn't naturally fit a context manager protocol.\n\nExitStack is in the standard library. No external dependency. It's the right answer any time 'how many context managers do I need' is the question.",
        hashtags: [...CORE, "#PythonTips"],
        image: {
          template: "tip", headline: "ExitStack — N context managers, one block",
          bullets: ["Dynamic count of resources", "Reverse-order cleanup", "Cleaner than nested 'with'", "from contextlib import ExitStack"],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d12-p5", day: 12, postNumber: 5, slot: "night", type: "recap", pillar: "python",
        title: "Day 12 — never write try/finally by hand again",
        copy: "End of Day 12. Halfway through week two. Python's standard library is delivering more than tutorials credit it for.\n\nWhat we covered.\n\nMorning, the principle behind 'with' — guaranteed cleanup, even on exception, even on early return, even on deep stack unwinds. Any resource with a 'must clean up' rule belongs in a context manager.\n\nMidday, the two ways to author a context manager — class with __enter__/__exit__, or @contextmanager-decorated function. Both are equivalent in capability. The decorator is cleaner for one-offs; the class is better when you need explicit exception handling or instance state.\n\nAfternoon, a 10-line @timed context manager. Drop it around any block to measure duration. Endlessly reusable. Way better than scattering time.time() calls.\n\nEvening, ExitStack for the cases where you need a runtime-decided number of context managers. Stack as many as you need, get reverse-order cleanup automatically. Standard library. Free.\n\nA broader pattern for the week. Python's elegance often hides in modules with terse names — contextlib, functools, itertools, collections. Each one is a small toolkit of patterns that the standard library hardened over decades. Reach for them before reinventing.\n\nTomorrow, Day 13, type hints and dataclasses. The combination that turned Python from 'great for prototypes' into 'production-viable for big projects'. Type hints don't run, but they catch entire classes of bug before runtime, and they make every framework's auto-complete useful. Dataclasses replace 30-line boilerplate with a 5-line declaration.\n\nTwo days left in week two. We're about to wrap the Python core and head into DSA territory.\n\nSee you in the morning.",
        hashtags: [...CORE, "#PythonContextManagers"],
        image: { template: "quote", headline: "with → no leaks. ever.", subhead: "If you typed 'finally', you forgot 'with'.", accent: "violet",
          aiPrompt: "Pastel violet quote card, 1:1",
          canvaBrief: "Pastel quote card.",
        },
      },
    ],
  },

  /* DAY 13 */
  {
    day: 13, theme: "Type hints + dataclasses — Python at scale", pillar: "python",
    posts: [
      {
        id: "d13-p1", day: 13, postNumber: 1, slot: "morning", type: "concept", pillar: "python",
        title: "Type hints — Python's safety net",
        copy: "There's a question that comes up in every Python team transitioning from 'small scripts' to 'serious project': do we add type hints? The right answer is yes — and I'll tell you why most teams hesitate before they finally do.\n\nThe hesitation usually goes 'type hints are extra work and they don't even run'. The first part is true. The second part misses the point.\n\nType hints don't execute at runtime. They're metadata attached to functions and variables. The interpreter ignores them when running your code. No overhead, no behaviour change.\n\nBut.\n\nIDEs use them for accurate auto-complete and 'go to definition'. The difference between hint-less Python and hinted Python in PyCharm or VS Code is night and day.\n\nmypy and pyright (static type checkers) catch entire classes of bugs before you run the code. Wrong return type, missing None handling, calling a function with the wrong argument types — caught at lint time, not runtime.\n\nThey serve as inline documentation. A signature 'def embed(text: str, model: str = small) -> list[float]' tells you everything you need to know to call the function. No need to read the body.\n\nDataclasses, Pydantic, FastAPI, and most modern libraries USE the hints to generate behaviour — auto-validating inputs, generating API schemas, building serialisers, generating docs.\n\nThe cost of type hints — about a 10% increase in code volume. The benefit — catching bugs you'd otherwise meet in production, plus the IDE wins, plus framework integration.\n\nIn 2026, untyped Python on a multi-developer project is a code smell. Strict mypy on a new project is a non-negotiable. The path from 'hints are optional' to 'hints are expected' is a one-way road, and the ecosystem already finished the journey. Catch up.",
        hashtags: [...CORE, "#TypeHints"],
        image: {
          template: "stat", headline: "Hints don't run.\nThey save runs.", subhead: "Static checks catch bugs before prod.", stat: { number: "1000s", label: "of bugs caught before runtime by mypy" }, accent: "violet",
          aiPrompt: "Stat poster, violet, 1:1",
          canvaBrief: "Violet gradient. Big 1000s. Subhead.",
        },
      },
      {
        id: "d13-p2", day: 13, postNumber: 2, slot: "midday", type: "deepdive", pillar: "python",
        title: "The type hints you'll actually use",
        copy: "Most type-hint tutorials lead with exotic generics and TypeVars. Skip that for now. Eight type-hint primitives cover 95% of the Python you'll write.\n\nThe primitives — str, int, float, bool. Self-explanatory. Use them everywhere a function takes or returns a basic value.\n\nCollections — list[T], dict[K, V], set[T], tuple[T, ...]. The new (3.9+) syntax for generic collections. Old syntax was List[T], Dict[K, V] from typing. New syntax is shorter and lives directly on the built-in types. Use the new syntax in any new code; the old still works for compatibility.\n\nOptional values — Optional[T] or T | None (3.10+ pipe syntax). Used for parameters that can be None and return values that might be missing. The pipe syntax is more readable. 'def find(name: str) -> User | None' is clear at a glance.\n\nFixed string options — Literal['a', 'b', 'c']. The parameter must be exactly one of these strings. Type-checker catches typos. Useful for mode flags, pillar names, status enums.\n\nFunction signatures — Callable[[int], str]. A function that takes one int and returns a string. Use when accepting callbacks or higher-order functions.\n\nEscape hatch — Any. Disables type-checking for that value. Use when you genuinely don't care about the type, or when interfacing with un-typed third-party libraries. Sparingly.\n\nDicts with known keys — TypedDict. {'name': str, 'age': int}. Stricter than dict[str, Any]. Useful for API responses, JSON shapes.\n\nDuck typing, statically — Protocol. Define an interface by methods, not by inheritance. Anything implementing the methods satisfies the protocol. The type-system way to do duck typing.\n\nLearn these eight. Read 95% of typed Python with no friction. Reach for the more exotic generics (TypeVar, Generic[T], Concatenate) when the situation actually calls for it — usually when you're writing a library, not application code.",
        hashtags: [...CORE, "#PythonTyping"],
        image: {
          template: "list", headline: "8 type hints you'll actually use",
          bullets: ["str, int, float, bool", "list[T] / dict[K,V]", "Optional[T] or T | None", "Literal['a', 'b']", "Callable[[int], str]", "Any (escape hatch)", "TypedDict", "Protocol"],
          accent: "violet",
          aiPrompt: "8-row reference card, white-violet, 1:1",
          canvaBrief: "White grid. 8 rows. Violet badges.",
        },
      },
      {
        id: "d13-p3", day: 13, postNumber: 3, slot: "afternoon", type: "code", pillar: "python",
        title: "@dataclass — kill the boilerplate",
        copy: "Look at the snippet. Five lines. That's a Document class with id, text, score, and tags fields. Auto-generated __init__, __repr__, __eq__, __hash__ (because frozen=True), and immutability. Try writing it without @dataclass and you're at 30+ lines, easy.\n\n@dataclass auto-generates the methods you'd otherwise hand-code from the fields you declare with type hints. It's the single biggest reduction in Python boilerplate to land in the last decade.\n\nLet me unpack the example.\n\n@dataclass(frozen=True) on the class. The frozen=True flag makes instances immutable — assignments to fields after construction raise FrozenInstanceError. Combined with type hints on the fields, this gives you __init__, __repr__, __eq__, __hash__ for free.\n\nField declarations look like type hints — id: str, text: str, score: float = 0.0. The dataclass decorator inspects them at class-creation time and generates the __init__ to accept them in order, with defaults applying to fields that have them.\n\nUse this for any 'plain data' class — domain objects, value types, request/response shapes, configuration. The 80% of classes that exist mainly to bundle data should be dataclasses, not handwritten classes.\n\nThe other 20% — classes with custom validation, deferred field initialisation, complex __init__ logic — reach for Pydantic. Same idea, more powerful, runtime validation, integrates with FastAPI. We use Pydantic in the agent and RAG weeks.\n\nThe gotcha worth knowing — mutable default fields need field(default_factory=list) instead of just '= []'. Otherwise you hit the same mutable-default trap from Day 3. Dataclasses warn about this, so it's hard to get wrong.\n\nWrite less. Get more.",
        hashtags: [...CORE, "#PythonDataclass"],
        image: {
          template: "code", headline: "@dataclass — 30 lines become 5",
          code: { language: "python", snippet: "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Document:\n    id: str\n    text: str\n    score: float = 0.0\n    tags: tuple[str, ...] = ()\n\nd = Document(id='a1', text='hello', tags=('rag',))\nprint(d)\n# Document(id='a1', text='hello', score=0.0, tags=('rag',))" },
          accent: "violet",
          aiPrompt: "Dark code card, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d13-p4", day: 13, postNumber: 4, slot: "evening", type: "tip", pillar: "python",
        title: "Run mypy in CI from day one",
        copy: "If you're starting a new Python project today, the single highest-leverage decision you can make is — add mypy to CI on day one. Strict mode. No exceptions allowed.\n\nWhy day one? Because adding mypy to a mature project is a brutal slog. You face thousands of errors, half of them genuine bugs, half of them stylistic warnings. You triage for weeks, suppress hundreds with #type: ignore, and ship a half-typed codebase that gives you 30% of the value of a fully-typed one.\n\nAdd mypy on day one and the experience is the opposite. The codebase has zero errors at the start. Every PR adds new code and (occasionally) new type errors. You fix them as you go. The cost is bounded — usually 5-15 minutes per PR. The codebase stays cleanly typed from start to finish.\n\nThe minimum setup. Add 'mypy' to your dev dependencies. Add a [tool.mypy] section to pyproject.toml. Add 'mypy src/' to your CI step. Configure mypy to fail the build on any error.\n\nMy default mypy config is strict — strict = true. This enables all the strict-mode flags. You'll write more careful code; mypy will reward you with more catches.\n\nAlternatives — pyright (Microsoft, used by VS Code's Pylance) is faster than mypy and roughly equivalent in catches. Some teams use both. For most teams, one is enough.\n\nThe rule I follow on personal projects — strict mypy, no #type: ignore in committed code. If I'm tempted to ignore, I'm doing something wrong. Fix the type, not the silence.\n\nIt is, unironically, the single most boring and most valuable habit you can adopt in a new Python project. Start now.",
        hashtags: [...CORE, "#PythonTesting"],
        image: {
          template: "tip", headline: "mypy on day one",
          bullets: ["mypy --strict", "Required in CI", "Pyright as alt", "Fix early. Fix small."],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d13-p5", day: 13, postNumber: 5, slot: "night", type: "recap", pillar: "python",
        title: "Day 13 — types make Python serious",
        copy: "End of Day 13. One day left in week two, then we head into DSA territory.\n\nWhat we covered.\n\nMorning, the case for type hints. They don't run. They catch bugs anyway, give you better IDE support, document your intent, and integrate with frameworks that consume them at runtime. The cost is small. The benefit compounds.\n\nMidday, the eight type primitives that cover 95% of typed Python. str, int, float, bool, list[T] / dict[K,V], Optional/None, Literal, Callable, Any (sparingly), TypedDict, Protocol. Learn these eight. The rest comes later when you're writing libraries, not applications.\n\nAfternoon, @dataclass. The decorator that compresses 30-line boilerplate classes into 5-line declarations. Auto-generates __init__, __repr__, __eq__, __hash__ from the type-hinted fields. frozen=True for immutability and cleaner hashing.\n\nEvening, the strongest single recommendation in Python project setup — add mypy to CI on day one. Strict mode. No 'we'll add types later'. Day one. The compound interest is enormous; the retroactive migration is brutal.\n\nA week-two perspective check. We've now covered classes, inheritance, dunder methods, decorators, generators, context managers, type hints, and dataclasses. That's pretty much the complete 'modern Python' toolkit. By tomorrow's wrap, you'll be able to read most open-source AI/ML codebases without flinching at the language constructs.\n\nTomorrow, Day 14, errors and exceptions. The rules for catching them, when to define your own, and the 3.11+ ExceptionGroup pattern that handles parallel failures. Then we close week two.\n\nSee you in the morning.",
        hashtags: [...CORE, "#PythonTyping"],
        image: { template: "quote", headline: "Hints aren't optional anymore.", subhead: "Not in 2026. Not in your team's repo.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1",
          canvaBrief: "Pastel quote card.",
        },
      },
    ],
  },

  /* DAY 14 */
  {
    day: 14, theme: "Errors, exceptions & week 2 wrap", pillar: "python",
    posts: [
      {
        id: "d14-p1", day: 14, postNumber: 1, slot: "morning", type: "concept", pillar: "python",
        title: "Fail loud, fail fast — never silently",
        copy: "I've debugged a lot of Python code over the years, and one anti-pattern accounts for more wasted hours than any other.\n\ntry:\n    do_thing()\nexcept Exception:\n    pass\n\nThis is the silent failure. Catches every error — including the typo, the import error, the file-not-found, the network timeout, the ML divergence — and swallows it without a sound. Your program limps onward, missing parts, and you spend hours wondering why nothing trains.\n\nThe rule, which I'll state in big bold mental letters — fail loud, fail fast, never silently.\n\nIf an error happens, you want to know. Loudly. With a stack trace. As close to the cause as possible. Anything else trades short-term smoothness for long-term debugging hell.\n\nThe right shape is specific exception handling.\n\ntry:\n    json.loads(text)\nexcept json.JSONDecodeError as e:\n    log.warning('bad json', extra={'err': e})\n    return None\n\nNotice three things. The except is for ONE specific exception type. The handler does something useful — logs the cause for later analysis. The handler returns a defined fallback. Anything else (TypeError, KeyError, MemoryError) is NOT caught here. It propagates up the stack to a layer that DOES know how to handle it, or crashes the program with a useful trace.\n\nNever 'except Exception:'. Almost never. The handful of cases where it's right (top-of-loop request handlers in a web server that must keep serving even on user-code bugs) are cases where you log the full traceback before continuing.\n\nNever bare 'except:'. Catches even KeyboardInterrupt and SystemExit. Your program becomes uninterruptible.\n\nThe guideline is one sentence — catch the most specific exception you can handle, and re-raise everything else. Your future self, debugging at 3am, will thank you for the loudness.",
        hashtags: [...CORE, "#PythonExceptions"],
        image: {
          template: "stat", headline: "0", subhead: "bare 'except: pass' in production code", stat: { number: "0", label: "bare exception swallowers, ever" }, accent: "violet",
          aiPrompt: "Stat poster, violet, 1:1",
          canvaBrief: "Violet gradient. Big 0 centered.",
        },
      },
      {
        id: "d14-p2", day: 14, postNumber: 2, slot: "midday", type: "deepdive", pillar: "python",
        title: "Custom exceptions — when and how",
        copy: "Most code I see either uses too many built-in exceptions (raise ValueError everywhere) or invents a custom one for every condition. The middle ground is right.\n\nDefine a custom exception when:\n\nThe error is specific to your domain. A retrieval failure in a RAG system isn't a ValueError — it's a RetrievalError. The name carries information.\n\nCallers should be able to catch it precisely. If users of your code want to recover from one type of failure but not others, they need distinct exception types to discriminate.\n\nYou want a base class for a family of related errors. RAGError as base, RetrievalError, ChunkingError, EmbeddingError as subclasses. Now callers can 'except RAGError' to catch any of them, or 'except RetrievalError' for one specific kind.\n\nThe pattern looks like:\n\nclass RAGError(Exception):\n    pass\n\nclass RetrievalError(RAGError):\n    pass\n\nclass ChunkingError(RAGError):\n    pass\n\nFour lines. Three exception types. A clear hierarchy.\n\nDon't subclass Exception for every tiny case. Three to five domain exceptions usually cover an entire project. More than that and you're micro-typing errors at a cost that callers won't pay attention to.\n\nA related principle — don't reuse built-in exceptions for unrelated meanings. Don't raise ValueError for a retrieval failure just because you don't want to define a class. Define the class. The 30 seconds of effort gives every caller a precise way to handle the failure.\n\nDocument what your custom exceptions mean. A docstring on the class. When it's raised, what callers should typically do. Three lines per exception class, max.\n\nProperly named, hierarchical exceptions are an underrated form of API design. They tell callers what can go wrong without forcing them to read the implementation.",
        hashtags: [...CORE, "#PythonAdvanced"],
        image: {
          template: "list", headline: "When to define a custom exception",
          bullets: ["Domain-specific failure", "Callers need precise catch", "Hierarchy for grouping", "Stay under ~5 per project", "Inherit from a base class"],
          accent: "violet",
          aiPrompt: "List poster, white-violet, 1:1",
          canvaBrief: "White grid, 5 rows.",
        },
      },
      {
        id: "d14-p3", day: 14, postNumber: 3, slot: "afternoon", type: "code", pillar: "python",
        title: "raise from — keep the original error visible",
        copy: "When you wrap a third-party error in a domain error, do this — raise YourError(...) FROM e.\n\nThe 'from' keyword links the new exception to the original cause. Python's traceback shows both. The reader sees the underlying network error AND the high-level domain error in one stack trace.\n\nLook at the snippet. fetch() catches a requests.RequestException and wraps it in a domain RetrievalError. Without 'from e', the traceback shows the domain error and a hint that 'during handling of the above exception, another exception occurred'. With 'from e', it shows 'the above exception was the direct cause of the following exception' — explicit chaining.\n\nThe difference seems minor in writing. In a 3am debugging session, it's the difference between 'I can see the network failure that caused the wrap' and 'I have to re-read the code to find what called this'.\n\nUse 'raise from':\n\nWhen wrapping a low-level exception in a high-level one. Almost always.\n\nWhen translating an exception from one library's exception class to your own. Same reason.\n\nDon't use 'raise from':\n\nWhen the original exception isn't relevant. Use 'raise from None' to suppress the link. Useful when the internal exception is an implementation detail and you don't want to leak it in tracebacks.\n\nA common pattern in libraries — internal code raises a generic exception that the library's public API catches and wraps with 'raise from None' to hide the implementation. Callers see only the documented exception type.\n\nFor application code, you almost always want to keep the chain. Future-you debugging an issue will know where to look.",
        hashtags: [...CORE, "#PythonExceptions"],
        image: {
          template: "code", headline: "raise from — keep the cause",
          code: { language: "python", snippet: "class RetrievalError(Exception): pass\n\ndef fetch(url):\n    try:\n        return requests.get(url, timeout=5).json()\n    except requests.RequestException as e:\n        raise RetrievalError(f'fetch failed: {url}') from e\n\n# Traceback shows BOTH:\n#   requests.ConnectionError: ...\n#   The above was the direct cause of:\n#   RetrievalError: fetch failed: ..." },
          accent: "violet",
          aiPrompt: "Dark code card, 1:1",
          canvaBrief: "Dark gradient code window.",
        },
      },
      {
        id: "d14-p4", day: 14, postNumber: 4, slot: "evening", type: "tip", pillar: "python",
        title: "Use ExceptionGroup for parallel failures",
        copy: "Python 3.11 added ExceptionGroup, and most developers haven't met it yet. It changes how you handle parallel work.\n\nBefore 3.11, if you fanned out 50 tasks and 3 failed, the conventional approach was 'first failure wins'. asyncio.gather() raised the first exception; the other two were lost.\n\nExceptionGroup fixes this. Now when you use TaskGroup (the structured-concurrency replacement for gather), partial failures get bundled into a single ExceptionGroup that contains ALL the failed tasks' exceptions.\n\nfrom asyncio import TaskGroup\n\nasync with TaskGroup() as tg:\n    for url in urls:\n        tg.create_task(fetch(url))\n\nIf 3 of 50 fetches fail, you don't lose 47 successes and you don't lose 2 of the 3 failures. The ExceptionGroup carries all 3 errors. You can inspect them, log them, retry only the failed ones.\n\nA new keyword goes with this — except*. (Yes, with the asterisk.) It catches inside an ExceptionGroup, matching by type:\n\ntry:\n    ...\nexcept* requests.HTTPError as eg:\n    handle_http_failures(eg.exceptions)\nexcept* ValueError as eg:\n    handle_validation_failures(eg.exceptions)\n\nEach 'except*' catches matching exceptions from inside the group. The unmatched ones re-raise.\n\nWhere this matters in AI/ML work — batched LLM calls. You fan out 100 prompts to an API; some hit rate limits, some hit content filters, some fail for transient network reasons. Without ExceptionGroup, you only see the first failure. With it, you can categorise and retry intelligently.\n\nThe shape of concurrent error handling has changed. If you're on 3.11+, learn TaskGroup + ExceptionGroup. If you're stuck on older Python, this is one more reason to upgrade.",
        hashtags: [...CORE, "#Python311"],
        image: {
          template: "tip", headline: "ExceptionGroup — keep all failures",
          bullets: ["3.11+ feature", "Pairs with TaskGroup", "except* matches inside group", "Don't lose parallel errors"],
          accent: "violet",
          aiPrompt: "Pro tip card, 1:1",
          canvaBrief: "Violet header. PRO TIP.",
        },
      },
      {
        id: "d14-p5", day: 14, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Week 2 done — Python that scales",
        copy: "End of week two. 14 days in, 70 posts shipped, zero misses. The dataset of work is starting to feel substantial.\n\nWhat week 2 added on top of week 1.\n\nOOP that's actually idiomatic — classes when they earn their weight, dunder methods to integrate with Python's protocols, composition over inheritance, __repr__ on every class.\n\nDecorators demystified — @ is sugar for 'foo = decorator(foo)', three shapes (plain, parameterised, stacked), @functools.wraps non-negotiable.\n\nGenerators as the laziness primitive — yield/next, generator expressions, streaming pipelines, yield from.\n\nContext managers — with-statements, two ways to author them, ExitStack for runtime composition.\n\nTypes — eight primitives that cover 95% of typed Python, dataclasses to kill boilerplate, mypy strict in CI.\n\nExceptions — fail loud, custom hierarchy when justified, raise from to keep traces meaningful, ExceptionGroup for parallel failures.\n\nOn the meta level, this week was the 'production Python' tier. Most modern frameworks (FastAPI, PyTorch, LangChain, Django) are written using these constructs. After this week, you can read the source code of the libraries you import and not feel lost.\n\nA quick reality check on the sprint pace. We're 15.5% of the way through the 90 days. Two weeks of Python. Done. Now we head into DSA — Big-O, arrays, strings, hash maps, stacks, recursion, search, sort, trees, graphs, DP. Two weeks. The foundation that ML interviews and elegant code share.\n\nAfter that, Week 5 begins the actual ML stack — NumPy, Pandas, EDA, classical ML, deep learning, transformers, RAG, agents, automation, career. The march continues.\n\nThank you for showing up this week. See you tomorrow for Day 15.",
        hashtags: [...CORE, "#90DaysOfAI"],
        image: { template: "quote", headline: "Week 2 down. 11 to go.", subhead: "Next: DSA fundamentals.", accent: "violet",
          aiPrompt: "Pastel violet quote card, 1:1",
          canvaBrief: "Pastel quote card with 14/90 progress bar.",
        },
      },
    ],
  },
];
