# Duct Math

Duct section and hanger arithmetic. The 47 ft of duct run in 5 ft sections takes 10 sections, leaving 3 ft.

## Named constants

One: 12 inches in a foot.

## What it computes

- **The sections truth** - sections: the duct run (1 to 100000 ft) divided by the section length (1 to 50 ft), rounded up, with the feet left.
- **The hangers truth** - hangers: the duct run over the hanger gap (1 to 100 ft), rounded up, plus 1.
- **The tape truth** - tape: the joints (1 to 100000) times the inches a joint (1 to 1000), over 12 rounded up to feet, then the rolls (1 to 1000 ft each), rounded up, with the feet left.
- **The cost truth** - cost: the sections and the rolls (1 to 100000 each), each at their price (0.01 to 10000 dollars).

## Boundary

Arithmetic only. Counting applied as written. It has not seen any building and does not know the airflow, the duct size, the code, the seams or the system, and it gives no verdict that a duct run works or is sound. Every other number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/ductmath/
Repo: https://github.com/iLanis-agent/ductmath
