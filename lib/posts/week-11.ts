import type { DayPlan } from "../types";

const CORE = ["#Agents", "#LLM", "#AI", "#LangGraph", "#100DaysOfCode"];

export const week11: DayPlan[] = [
  /* DAY 71 */
  {
    day: 71, theme: "What is an LLM agent — the honest definition", pillar: "agents",
    posts: [
      { id: "d71-p1", day: 71, postNumber: 1, slot: "morning", type: "concept", pillar: "agents",
        title: "An agent is an LLM in a loop, with tools",
        copy: "Strip the marketing.\n\nAgent = LLM that can:\n1. Call tools (search, code, API)\n2. Loop on its own outputs\n3. Decide when to stop\n\nThat's it. Not a magic intelligence. Not 'AGI lite'. A program where the LLM is the planner, and external functions are the hands.\n\nWhen this works:\n- Multi-step research\n- Long-form code generation with self-correction\n- Browsing + reading + summarising\n\nWhen it doesn't:\n- Tasks needing precise determinism\n- High-stakes single-shot decisions\n- Tasks better served by a hard-coded pipeline",
        hashtags: [...CORE, "#Agents"],
        image: { template: "stat", headline: "Agent = LLM + Loop + Tools", subhead: "Three ingredients. Nothing more.", stat: { number: "3", label: "ingredients of every agent" }, accent: "magenta", aiPrompt: "Stat poster with robot-head glyph, magenta-violet, 1:1", canvaBrief: "Magenta-violet gradient. Big 3."
        }
      },
      { id: "d71-p2", day: 71, postNumber: 2, slot: "midday", type: "deepdive", pillar: "agents",
        title: "ReAct — the agent pattern",
        copy: "ReAct (Reasoning + Acting) is the dominant agent pattern.\n\nFor each step, the LLM produces:\n1. Thought — what should I do next?\n2. Action — which tool to call (or 'final answer')\n3. Observation — the tool's result, fed back\n\nLoop until 'final answer'. The chain of thoughts + actions + observations is the agent's trajectory.\n\nMost frameworks (LangChain, LlamaIndex, AutoGen, CrewAI) implement ReAct under different names. The shape doesn't change — just the API.",
        hashtags: [...CORE, "#ReAct"],
        image: { template: "list", headline: "ReAct loop",
          bullets: ["Thought — plan", "Action — pick a tool", "Observation — tool result", "Repeat until final answer"],
          accent: "magenta", aiPrompt: "List card with loop arrow, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d71-p3", day: 71, postNumber: 3, slot: "afternoon", type: "code", pillar: "agents",
        title: "Minimal ReAct loop in 30 lines",
        copy: "No framework. Just chat completions + a tool dict + a while loop. Reading this once is worth 10 LangChain tutorials. Frameworks add memory, tracing, retries — but the core is what's below.",
        hashtags: [...CORE, "#OpenAI"],
        image: { template: "code", headline: "ReAct from scratch",
          code: { language: "python", snippet: "from openai import OpenAI\nimport json\n\nclient = OpenAI()\n\ntools = {\n    'search': lambda q: f'(stub result for: {q})',\n    'calc':   lambda e: str(eval(e, {'__builtins__': {}})),\n}\n\nschema = [\n    {'type':'function','function':{'name':n,'parameters':{'type':'object',\n     'properties':{'q':{'type':'string'}},'required':['q']}}} for n in tools\n]\n\nmsgs = [{'role':'user','content':'Square root of population of India in 2024.'}]\nfor _ in range(8):\n    r = client.chat.completions.create(model='gpt-4o-mini', messages=msgs, tools=schema)\n    m = r.choices[0].message; msgs.append(m)\n    if not m.tool_calls:\n        print(m.content); break\n    for tc in m.tool_calls:\n        out = tools[tc.function.name](json.loads(tc.function.arguments)['q'])\n        msgs.append({'role':'tool','tool_call_id':tc.id,'content':out})" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d71-p4", day: 71, postNumber: 4, slot: "evening", type: "tip", pillar: "agents",
        title: "Don't reach for an agent until you must",
        copy: "Agents are slow, expensive, and unpredictable.\n\nBefore building one, ask:\n- Can this be a fixed pipeline (no LLM-driven branching)?\n- Can a single LLM call with good prompting handle it?\n- Can a tool-calling LLM (no loop) solve it?\n\nOnly if all three are 'no' does the loop earn its keep. Most teams should reach for agentic patterns at version 2, not version 1. Ship the dumb version first.",
        hashtags: [...CORE, "#Engineering"],
        image: { template: "tip", headline: "Agents v2, not v1",
          bullets: ["Fixed pipeline first", "Single LLM call next", "Tool-call no-loop next", "Then agent"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d71-p5", day: 71, postNumber: 5, slot: "night", type: "recap", pillar: "agents",
        title: "Day 71 — agents, defined honestly",
        copy: "Day 71 done.\n\n- Agent = LLM + tools + loop\n- ReAct: thought / action / observation\n- 30-line agent from scratch\n- Reach for agents only when needed\n\nTomorrow (Day 72): tool design — the most important skill in agent engineering.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "quote", headline: "An agent is a loop with hands.", subhead: "Nothing more.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 72 */
  {
    day: 72, theme: "Tool design — the most important agent skill", pillar: "agents",
    posts: [
      { id: "d72-p1", day: 72, postNumber: 1, slot: "morning", type: "concept", pillar: "agents",
        title: "A tool is a contract — name, schema, behaviour",
        copy: "An agent's quality is bounded by the quality of its tools. Each tool needs:\n\n1. A clear name — search_docs, not search\n2. A precise description — what it does, when to use it\n3. A typed JSON schema for parameters\n4. A deterministic implementation\n5. Useful, structured outputs\n\nA fuzzy tool ('do_stuff') confuses the LLM. A precise tool ('lookup_customer_by_email') guides it. Spend more time on tool design than agent prompting. ROI is higher.",
        hashtags: [...CORE, "#ToolUse"],
        image: { template: "list", headline: "5 ingredients of a good tool",
          bullets: ["Clear name", "Precise description", "Typed JSON schema", "Deterministic logic", "Structured outputs"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 5 rows."
        }
      },
      { id: "d72-p2", day: 72, postNumber: 2, slot: "midday", type: "deepdive", pillar: "agents",
        title: "Tool error handling — fail informatively",
        copy: "When a tool fails, return a STRUCTURED error to the model. Not a Python traceback.\n\nGood: { 'error': 'NOT_FOUND', 'detail': 'No customer with email x@y.com', 'suggestions': ['try search_customer_by_phone'] }\n\nBad: 'Traceback (most recent call last)... KeyError: ...'\n\nThe model can read the structured error and pivot — try a different tool, ask for clarification. The traceback just confuses it.\n\nYour tools' error messages are part of your system prompt. Treat them with the same care.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "compare", headline: "Tool errors — structured > traceback",
          compare: { leftLabel: "Bad", leftItems: ["Python traceback", "Cryptic", "Model gives up", "Hard to recover"], rightLabel: "Good", rightItems: ["Structured JSON error", "Hint at next steps", "Model self-recovers", "Loop continues"] },
          accent: "magenta", aiPrompt: "Compare poster, 1:1", canvaBrief: "Split. Grey vs magenta."
        }
      },
      { id: "d72-p3", day: 72, postNumber: 3, slot: "afternoon", type: "code", pillar: "agents",
        title: "Tool definition that actually works",
        copy: "JSON schema with rich descriptions, an enum for fixed-set parameters, and structured error returns. Read the description like you're an LLM seeing it cold.",
        hashtags: [...CORE, "#OpenAI"],
        image: { template: "code", headline: "A well-designed tool",
          code: { language: "python", snippet: "lookup_customer = {\n    'type': 'function',\n    'function': {\n        'name': 'lookup_customer',\n        'description': 'Find a customer by exact email or phone. Use this when you have a precise identifier. Returns customer record or NOT_FOUND.',\n        'parameters': {\n            'type': 'object',\n            'properties': {\n                'kind': {'type': 'string', 'enum': ['email', 'phone']},\n                'value': {'type': 'string'},\n            },\n            'required': ['kind', 'value'],\n        },\n    },\n}" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d72-p4", day: 72, postNumber: 4, slot: "evening", type: "tip", pillar: "agents",
        title: "Test tools without an LLM first",
        copy: "Before plugging tools into an agent, unit-test them like any other function.\n\n- Happy path returns expected shape\n- Bad inputs return structured errors\n- No state leaks between calls\n- Latency p99 is acceptable\n\nA flaky tool with the LLM-in-the-loop becomes a debugging nightmare. Test in isolation. Trust the agent only with tools that are themselves trusted.",
        hashtags: [...CORE, "#Testing"],
        image: { template: "tip", headline: "Unit-test tools without the LLM",
          bullets: ["Happy + edge cases", "Structured errors", "No shared state", "Pin p99 latency"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d72-p5", day: 72, postNumber: 5, slot: "night", type: "recap", pillar: "agents",
        title: "Day 72 — tools first, prompts second",
        copy: "Day 72 done.\n\n- Tools = name + schema + behaviour\n- Structured errors over tracebacks\n- Rich descriptions, enums for sets\n- Unit-test without the LLM\n\nTomorrow (Day 73): planning agents. Multi-step decomposition before execution.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "quote", headline: "Tools first. Prompts second.", subhead: "ROI is higher in tool design.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 73 */
  {
    day: 73, theme: "Planning agents — decompose, then execute", pillar: "agents",
    posts: [
      { id: "d73-p1", day: 73, postNumber: 1, slot: "morning", type: "concept", pillar: "agents",
        title: "Plan-then-execute beats step-by-step on hard tasks",
        copy: "Vanilla ReAct decides one step at a time. For complex multi-step work this leads to drift, dead-ends, and rework.\n\nPlan-then-execute:\n1. Planner LLM produces a step list before any action.\n2. Executor LLM (or the same one) runs each step with tools.\n3. After each step, replan if needed.\n\nBenefits:\n- Plan visible upfront (auditable)\n- Cheaper executor model possible\n- Failures localised to a step\n\nUse for: research tasks, coding tasks, anything with > 3 logical phases.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "list", headline: "Plan → Execute → Replan",
          bullets: ["Planner produces step list", "Executor runs each step", "Replan on failure / new info", "Auditable, debuggable"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d73-p2", day: 73, postNumber: 2, slot: "midday", type: "deepdive", pillar: "agents",
        title: "Two-LLM pattern: cheap executor, smart planner",
        copy: "Use a smart model (gpt-4o, claude-sonnet) as planner — produces the plan once.\n\nUse a cheap model (gpt-4o-mini, claude-haiku) as executor — runs each step. Cheap model is good enough for 'call this tool with these args' if the plan is clear.\n\nResults:\n- 5-10x cost reduction on long agentic flows\n- Same or better outcomes if planning is good\n- Faster iteration loop\n\nThis is the move that separates production agent systems from demos.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "stat", headline: "Smart plan + cheap exec", subhead: "5-10x cost reduction", stat: { number: "5-10x", label: "cost reduction with two-model split" }, accent: "magenta", aiPrompt: "Stat poster, magenta, 1:1", canvaBrief: "Magenta-violet gradient. Big 5-10x."
        }
      },
      { id: "d73-p3", day: 73, postNumber: 3, slot: "afternoon", type: "code", pillar: "agents",
        title: "Plan + execute split — minimal code",
        copy: "Planner returns a JSON list of steps. Executor loops over them, calling tools per step. Final synthesis combines results.\n\nThis 30-line skeleton handles 80% of multi-step agent flows. Wrap it with retries, cancelable steps, and tracing — that's a production planner.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "code", headline: "Plan + execute skeleton",
          code: { language: "python", snippet: "def plan(goal: str) -> list[dict]:\n    p = openai.chat.completions.create(\n        model='gpt-4o',\n        messages=[{'role':'user','content':f'Plan steps to achieve: {goal}. JSON list of {{tool, args}}.'}],\n        response_format={'type':'json_object'},\n    )\n    return json.loads(p.choices[0].message.content)['steps']\n\ndef execute(step: dict, history: list) -> str:\n    return tools[step['tool']](**step['args'])\n\ndef run(goal: str) -> str:\n    steps = plan(goal)\n    history = []\n    for s in steps:\n        result = execute(s, history)\n        history.append({**s, 'result': result})\n    return synthesise(goal, history)" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d73-p4", day: 73, postNumber: 4, slot: "evening", type: "tip", pillar: "agents",
        title: "Allow replanning after surprises",
        copy: "Plans get stale. After every step, ask:\n- Did the result change my model of the world?\n- Are remaining steps still relevant?\n\nIf yes, replan. If no, continue.\n\nA cheap classifier ('replan needed: yes/no?') after each step catches drift early. Without it, the agent rigidly follows the plan even when step 1's result invalidates it. Static plans don't survive contact with reality.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "tip", headline: "Replan after surprises",
          bullets: ["Step result reshapes context", "Cheap classifier checks drift", "Replan if invalidated", "Static plans break"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d73-p5", day: 73, postNumber: 5, slot: "night", type: "recap", pillar: "agents",
        title: "Day 73 — plan, execute, replan",
        copy: "Day 73 done.\n\n- Plan-then-execute > step-by-step\n- Smart planner + cheap executor\n- 30-line skeleton\n- Replan after surprises\n\nTomorrow (Day 74): multi-agent systems — when one agent isn't enough.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "quote", headline: "Static plans break.", subhead: "Replan when reality disagrees.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 74 */
  {
    day: 74, theme: "Multi-agent — when one isn't enough", pillar: "agents",
    posts: [
      { id: "d74-p1", day: 74, postNumber: 1, slot: "morning", type: "concept", pillar: "agents",
        title: "Multi-agent = specialisation + handoff",
        copy: "Sometimes one agent gets confused juggling 12 tools. Splitting helps:\n\n- Researcher — finds info\n- Coder — writes code\n- Critic — reviews + suggests fixes\n- Coordinator — routes between them\n\nEach agent has fewer tools, a clearer role, focused prompt. They communicate by handoff (passing structured messages) or shared state.\n\nWarning: multi-agent costs MORE than single-agent. Only worth it when role separation actually clarifies things. Don't multi-agent for vibes.",
        hashtags: [...CORE, "#MultiAgent"],
        image: { template: "list", headline: "When multi-agent earns its cost",
          bullets: ["12+ tools confuse one agent", "Distinct roles (research vs code)", "Critic loops improve quality", "Costs scale with agents"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d74-p2", day: 74, postNumber: 2, slot: "midday", type: "deepdive", pillar: "agents",
        title: "Topology — pipeline vs network",
        copy: "Two common shapes:\n\n1. Pipeline — researcher → coder → critic → coordinator. Linear. Easy to reason about. LangGraph default.\n\n2. Network — coordinator routes any agent to any other. Dynamic. Messy but flexible. AutoGen's strength.\n\nStart with pipeline. Network gets you 'fascinating' demos and unbounded loops. Pipeline gets you something that works.\n\nIf the task fits a pipeline, use it. If not, the task often isn't ready for multi-agent.",
        hashtags: [...CORE, "#MultiAgent"],
        image: { template: "compare", headline: "Pipeline vs network",
          compare: { leftLabel: "Pipeline", leftItems: ["Linear flow", "Predictable", "Easy debug", "Default first"], rightLabel: "Network", rightItems: ["Dynamic routing", "More flexible", "Harder to debug", "Unbounded loops risk"] },
          accent: "magenta", aiPrompt: "Compare poster, 1:1", canvaBrief: "Split. Grey vs magenta."
        }
      },
      { id: "d74-p3", day: 74, postNumber: 3, slot: "afternoon", type: "code", pillar: "agents",
        title: "Two-agent pipeline in 30 lines",
        copy: "Researcher gathers info. Coder uses it to write code. They pass a typed message between them. No framework — just function calls.\n\nThis is the Lego brick of multi-agent. Add a third critic by the same pattern.",
        hashtags: [...CORE, "#Python"],
        image: { template: "code", headline: "Two-agent pipeline",
          code: { language: "python", snippet: "from openai import OpenAI\nimport json\n\nclient = OpenAI()\n\ndef researcher(task: str) -> dict:\n    r = client.chat.completions.create(\n        model='gpt-4o-mini',\n        messages=[{'role':'system','content':'You research. Return JSON: {summary, key_facts}.'},\n                  {'role':'user','content':task}],\n        response_format={'type':'json_object'},\n    )\n    return json.loads(r.choices[0].message.content)\n\ndef coder(spec: str, research: dict) -> str:\n    msgs = [{'role':'system','content':'Write Python. Use research as ground truth.'},\n            {'role':'user','content':f'Spec: {spec}\\nResearch: {json.dumps(research)}'}]\n    return client.chat.completions.create(model='gpt-4o', messages=msgs).choices[0].message.content\n\nresearch = researcher('How does HNSW index work?')\nprint(coder('write 30 lines implementing HNSW insert', research))" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d74-p4", day: 74, postNumber: 4, slot: "evening", type: "tip", pillar: "agents",
        title: "Cap network agents with a turn limit",
        copy: "Network topologies can ping-pong forever ('agent A asks B, B asks A back...').\n\nMy rule: max 12 inter-agent messages. After that, force the coordinator to produce a final answer with whatever info it has.\n\nLog every handoff. When the system is weird, the handoff log shows you the dance. Without the log, multi-agent is opaque.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "tip", headline: "Hard cap on agent turns",
          bullets: ["Max ~12 messages", "Force final answer at cap", "Log every handoff", "Or no debug is possible"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d74-p5", day: 74, postNumber: 5, slot: "night", type: "recap", pillar: "agents",
        title: "Day 74 — multi-agent, with caps",
        copy: "Day 74 done.\n\n- Multi-agent = specialisation\n- Pipeline > network for first version\n- Two-agent pipeline in 30 lines\n- Cap turns; log handoffs\n\nTomorrow (Day 75): the agent frameworks worth knowing — LangGraph, AutoGen, CrewAI.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "quote", headline: "Multi-agent only when single-agent breaks.", subhead: "Most tasks don't need it.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 75 */
  {
    day: 75, theme: "Agent frameworks — LangGraph, AutoGen, CrewAI", pillar: "agents",
    posts: [
      { id: "d75-p1", day: 75, postNumber: 1, slot: "morning", type: "concept", pillar: "agents",
        title: "Pick by abstraction, not by stars",
        copy: "Three agent frameworks worth knowing in 2026:\n\n- LangGraph — explicit graph of nodes + edges. State is shared dict. Best when you want control.\n\n- AutoGen — conversational agents with role-based prompts. Microsoft. Better for research-style multi-agent.\n\n- CrewAI — agents as 'roles' with goals + backstory. Highest abstraction. Fastest to demo, hardest to debug.\n\nPlus the SDKs: OpenAI Assistants API, Anthropic agent SDK. Lower abstraction, native to provider.",
        hashtags: [...CORE, "#LangGraph"],
        image: { template: "list", headline: "5 agent frameworks",
          bullets: ["LangGraph — explicit graph", "AutoGen — conversational", "CrewAI — high-level", "OpenAI Assistants", "Anthropic SDK"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 5 rows."
        }
      },
      { id: "d75-p2", day: 75, postNumber: 2, slot: "midday", type: "deepdive", pillar: "agents",
        title: "LangGraph — my default in production",
        copy: "LangGraph models an agent as a state graph:\n\n- State — typed dict (TypedDict / Pydantic) shared by all nodes\n- Nodes — functions that read state, do work, return updates\n- Edges — conditional routing between nodes\n\nWhy it wins:\n- You see the graph; bugs are findable\n- State is centralised; no implicit shared memory\n- Persistence + checkpointing built-in\n- Clean async support\n\nWeakness: more boilerplate vs CrewAI for simple cases. Worth it past prototype.",
        hashtags: [...CORE, "#LangGraph"],
        image: { template: "list", headline: "LangGraph wins on...",
          bullets: ["Explicit state", "Visible graph", "Async + checkpointing", "Bugs are findable"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d75-p3", day: 75, postNumber: 3, slot: "afternoon", type: "code", pillar: "agents",
        title: "Tiny LangGraph agent",
        copy: "Define a state. Add nodes. Add edges. Compile. Invoke. Same shape every time.\n\nThis 25-line example shows the structure. Real agents add tools, conditional edges, checkpointing — but the skeleton stays the same.",
        hashtags: [...CORE, "#LangGraph"],
        image: { template: "code", headline: "LangGraph minimal",
          code: { language: "python", snippet: "from typing import TypedDict\nfrom langgraph.graph import StateGraph, END\n\nclass S(TypedDict):\n    question: str\n    context: str\n    answer: str\n\ndef retrieve(s: S) -> S:\n    s['context'] = vector_search(s['question'])\n    return s\n\ndef generate(s: S) -> S:\n    s['answer'] = llm(build_prompt(s['question'], s['context']))\n    return s\n\ng = StateGraph(S)\ng.add_node('retrieve', retrieve)\ng.add_node('generate', generate)\ng.set_entry_point('retrieve')\ng.add_edge('retrieve', 'generate')\ng.add_edge('generate', END)\napp = g.compile()\n\nprint(app.invoke({'question': 'What is RAG?'})['answer'])" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d75-p4", day: 75, postNumber: 4, slot: "evening", type: "tip", pillar: "agents",
        title: "Always add tracing (LangSmith / Langfuse)",
        copy: "An agent without traces is unfixable. You'll spend hours guessing why it gave a wrong answer.\n\nMy default stack:\n- LangSmith (managed) or Langfuse (self-host) — captures every prompt, tool call, latency\n- One-line setup with most frameworks\n- Search by user, query, error\n\nThe minute you ship an agent, ship its trace dashboard. Cost: ~$0 for low volume. Saves entire debugging cycles.",
        hashtags: [...CORE, "#Observability"],
        image: { template: "tip", headline: "Always trace your agent",
          bullets: ["LangSmith or Langfuse", "Capture every step", "Searchable", "Free at low volume"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d75-p5", day: 75, postNumber: 5, slot: "night", type: "recap", pillar: "agents",
        title: "Day 75 — frameworks, with intent",
        copy: "Day 75 done.\n\n- LangGraph for control\n- AutoGen for research\n- CrewAI for fast demos\n- Always add tracing\n\nTomorrow (Day 76): memory in agents. Short-term, long-term, and the patterns that survive contact with users.",
        hashtags: [...CORE, "#LangGraph"],
        image: { template: "quote", headline: "Pick the framework with the abstraction you can debug.", subhead: "Stars don't fix bugs.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 76 */
  {
    day: 76, theme: "Memory in agents — short, long, working", pillar: "agents",
    posts: [
      { id: "d76-p1", day: 76, postNumber: 1, slot: "morning", type: "concept", pillar: "agents",
        title: "Three kinds of agent memory",
        copy: "Memory in agents isn't one thing.\n\n- Working memory — current conversation. Lives in the messages array.\n- Short-term memory — recent sessions, user preferences, active tasks. Often a small DB or cache.\n- Long-term memory — facts, preferences, decisions that should persist forever. Vector store or structured DB.\n\nDifferent storage, different lifecycles, different recall mechanisms. Mixing them is how 'amnesia bugs' happen.",
        hashtags: [...CORE, "#AgentMemory"],
        image: { template: "list", headline: "3 kinds of memory",
          bullets: ["Working — messages array", "Short-term — recent / cache", "Long-term — vector / DB", "Different lifecycles"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d76-p2", day: 76, postNumber: 2, slot: "midday", type: "deepdive", pillar: "agents",
        title: "Summarise as you go — survive token limits",
        copy: "Long conversations bust context limits. The fix isn't 'bigger context'. It's compression.\n\nEvery N turns:\n1. Summarise old turns into a short paragraph.\n2. Replace old turns with the summary.\n3. Keep the most-recent turns verbatim.\n\nFrameworks call this ConversationSummaryBufferMemory or similar. The agent retains the gist of long sessions without paying long-context tokens.\n\nFor really long sessions, keep the summary in long-term memory and rebuild context per session.",
        hashtags: [...CORE, "#AgentMemory"],
        image: { template: "stat", headline: "Summarise. Compress. Continue.", subhead: "How long sessions stay cheap.", stat: { number: "1", label: "trick that scales agent memory" }, accent: "magenta", aiPrompt: "Stat poster, magenta, 1:1", canvaBrief: "Magenta-violet gradient. Big 1."
        }
      },
      { id: "d76-p3", day: 76, postNumber: 3, slot: "afternoon", type: "code", pillar: "agents",
        title: "Rolling-summary memory in 20 lines",
        copy: "Keep last K turns verbatim. Older turns get summarised into a single 'summary' message at the front. Re-summarise when older + summary exceeds budget.\n\nSimple, robust, framework-agnostic. Plugs into any LLM API.",
        hashtags: [...CORE, "#Python"],
        image: { template: "code", headline: "Rolling-summary memory",
          code: { language: "python", snippet: "class Memory:\n    def __init__(self, keep=8):\n        self.keep = keep\n        self.summary = ''\n        self.recent: list[dict] = []\n    def add(self, msg: dict):\n        self.recent.append(msg)\n        if len(self.recent) > self.keep:\n            old = self.recent[: -self.keep]\n            self.recent = self.recent[-self.keep:]\n            text = '\\n'.join(m['content'] for m in old)\n            self.summary = summarise_llm(self.summary + '\\n' + text)\n    def messages(self) -> list[dict]:\n        if not self.summary:\n            return self.recent\n        return [{'role':'system','content':f'Summary so far: {self.summary}'}] + self.recent" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d76-p4", day: 76, postNumber: 4, slot: "evening", type: "tip", pillar: "agents",
        title: "Don't store secrets in long-term memory",
        copy: "Agents have a habit of writing 'remember user said password is X' into memory. Don't.\n\nMy rule:\n- Long-term memory stores user preferences and decisions, not credentials\n- Filter out PII / secrets before writing to vector store\n- Tag memories with sensitivity; refuse to retrieve when context is wrong\n\nMemory leaks across sessions feel benign until they aren't. Ship with redaction from day one.",
        hashtags: [...CORE, "#Security"],
        image: { template: "tip", headline: "Redact before remembering",
          bullets: ["No credentials in memory", "Filter PII / secrets", "Tag sensitivity", "Refuse cross-context retrieval"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d76-p5", day: 76, postNumber: 5, slot: "night", type: "recap", pillar: "agents",
        title: "Day 76 — agents that remember (sensibly)",
        copy: "Day 76 done.\n\n- 3 kinds of memory\n- Rolling summary survives token limits\n- 20-line implementation\n- Redact before persisting\n\nTomorrow (Day 77): the agent failure modes I've seen most. Then we close week 11.",
        hashtags: [...CORE, "#AgentMemory"],
        image: { template: "quote", headline: "Compress old. Keep recent.", subhead: "How agent memory survives reality.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 77 */
  {
    day: 77, theme: "Agent failure modes + week 11 wrap", pillar: "agents",
    posts: [
      { id: "d77-p1", day: 77, postNumber: 1, slot: "morning", type: "checklist", pillar: "agents",
        title: "5 agent failure modes I've shipped (and learned)",
        copy: "Real agent bugs I've hit:\n\n1. Tool spinning — calls search() 50 times. Cap turns.\n2. Hallucinated tool — invents a tool name not in the schema. Strict response_format + reject unknown.\n3. Lost-in-context — gives up halfway. Add periodic 'restate goal' nudges.\n4. Confidence collapse — claims success without verifying. Force a check-tool at end.\n5. Cost runaway — quietly burns $50 per query. Set a hard cost cap per session.\n\nEach has a fix. None require a smarter model. They require better engineering.",
        hashtags: [...CORE, "#Engineering"],
        image: { template: "list", headline: "5 agent failure modes",
          bullets: ["Tool spinning", "Hallucinated tool", "Lost in context", "Unverified success", "Cost runaway"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 5 rows."
        }
      },
      { id: "d77-p2", day: 77, postNumber: 2, slot: "midday", type: "deepdive", pillar: "agents",
        title: "Eval agents on completion + cost + safety",
        copy: "Three eval axes for any agent:\n\n1. Completion — did it solve the user's task? (LLM-as-judge or held-out tests)\n2. Cost — total tokens / time / tool calls\n3. Safety — any banned actions, unsafe outputs, leaked secrets\n\nA 'great' agent that costs $5/query is not great. A cheap agent that fails 30% of tasks is not cheap. Track all three; reject changes that regress any.\n\nlangsmith / langfuse make this easy. Add it to CI for any agentic feature.",
        hashtags: [...CORE, "#Evaluation"],
        image: { template: "list", headline: "Eval agents on 3 axes",
          bullets: ["Completion (success rate)", "Cost (tokens / tool calls)", "Safety (banned actions)", "Track all 3 in CI"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d77-p3", day: 77, postNumber: 3, slot: "afternoon", type: "code", pillar: "agents",
        title: "Hard cost + step caps",
        copy: "Always cap. Cost cap kills runaway loops. Step cap kills infinite ReAct dances. Combine them; hit either; force final answer.",
        hashtags: [...CORE, "#Agents"],
        image: { template: "code", headline: "Cost + step caps",
          code: { language: "python", snippet: "class Caps:\n    def __init__(self, max_steps=8, max_usd=0.05):\n        self.max_steps = max_steps\n        self.max_usd = max_usd\n        self.steps = 0\n        self.cost = 0.0\n    def step(self, usd: float):\n        self.steps += 1\n        self.cost += usd\n    def exceeded(self) -> bool:\n        return self.steps >= self.max_steps or self.cost >= self.max_usd\n\ncaps = Caps()\nwhile not caps.exceeded() and not done:\n    msg, usd = run_one_turn(state)\n    caps.step(usd)" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d77-p4", day: 77, postNumber: 4, slot: "evening", type: "tip", pillar: "agents",
        title: "Ship a kill-switch endpoint",
        copy: "Agents in production sometimes go wrong en masse. A bad system prompt deploy. A regressing model. A novel adversarial input.\n\nShip a kill-switch from day one:\n- Feature flag to disable all agentic flows\n- Force fallback to non-agentic path (vanilla RAG, FAQ, human escalation)\n- One-click toggle\n\nWhen things go wrong at 2am, you flip the switch and debug calmly.",
        hashtags: [...CORE, "#MLOps"],
        image: { template: "tip", headline: "Kill-switch from day one",
          bullets: ["Feature flag", "Fallback path ready", "One-click toggle", "Debug calmly"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d77-p5", day: 77, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Week 11 done — agents, with intent",
        copy: "Week 11 done. 77 days, 385 posts in.\n\nThis week:\n- LLM agents defined honestly\n- Tool design that scales\n- Plan-then-execute\n- Multi-agent (used carefully)\n- LangGraph as default\n- Memory: working, short, long\n- Failure modes + caps\n\nNext week: automation. Python scripts that schedule themselves and free your time.",
        hashtags: [...CORE, "#90DaysOfAI"],
        image: { template: "quote", headline: "11 weeks down. 2 to go.", subhead: "Next: automation.", accent: "magenta", aiPrompt: "Pastel magenta quote with 77/90 progress, 1:1", canvaBrief: "Pastel magenta quote with 77/90 magenta bar." }
      },
    ]
  },
];
