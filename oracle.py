import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def sections(r, s):
    n = -(-r//s)
    return f"The {r} ft of duct run in {s} ft sections takes {pl(n,' section',' sections')}, leaving {n*s-r} ft."
def hangers(r, g):
    n = -(-r//g) + 1
    return f"The {r} ft of duct run with hangers {g} ft apart takes {pl(n,' hanger',' hangers')}."
def tape(j, t, r):
    tot = j*t; ft = -(-tot//12); k = -(-ft//r)
    return f"The {pl(j,' joint',' joints')} at {t} inches of tape each take {tot} inches, {ft} ft, and in {r} ft rolls that is {pl(k,' roll',' rolls')}, leaving {k*r-ft} ft."
def cost(n, p, k, q):
    return f"The {pl(n,' section',' sections')} at ${dec(p)} and {pl(k,' roll',' rolls')} at ${dec(q)} cost ${money(n*p+k*q)}, sections ${money(n*p)} and rolls ${money(k*q)}."
random.seed(764)
R=random.randint
cases = [
 dict(fn="sections", args=["47","5"], expect=sections(47,5)),
 dict(fn="hangers", args=["47","4"], expect=hangers(47,4)),
 dict(fn="tape", args=["9","28","60"], expect=tape(9,28,60)),
 dict(fn="cost", args=["10","11.75","1","6.40"], expect=cost(10,1175,1,640)),
 dict(fn="sections", args=["1","1"], expect=sections(1,1)),
 dict(fn="tape", args=["1","1","1"], expect=tape(1,1,1)),
]
for _ in range(25):
    r,s=R(1,100000),R(1,50); cases.append(dict(fn="sections", args=[str(r),str(s)], expect=sections(r,s)))
for _ in range(20):
    r,g=R(1,100000),R(1,100); cases.append(dict(fn="hangers", args=[str(r),str(g)], expect=hangers(r,g)))
for _ in range(25):
    j,t,r=R(1,100000),R(1,1000),R(1,1000); cases.append(dict(fn="tape", args=[str(j),str(t),str(r)], expect=tape(j,t,r)))
for _ in range(20):
    n,p,k,q=R(1,100000),R(1,1000000),R(1,100000),R(1,1000000); cases.append(dict(fn="cost", args=[str(n),dec(p),str(k),dec(q)], expect=cost(n,p,k,q)))
errs=[["sections",["0","5"]],["sections",["100001","5"]],["sections",["47","0"]],["sections",["47","51"]],
 ["hangers",["0","4"]],["hangers",["47","0"]],["hangers",["47","101"]],
 ["tape",["0","28","60"]],["tape",["9","0","60"]],["tape",["9","1001","60"]],["tape",["9","28","0"]],["tape",["9","28","1001"]],
 ["cost",["0","11.75","1","6.40"]],["cost",["10","0","1","6.40"]],["cost",["10","11.75","0","6.40"]],["cost",["10","11.75","1","0"]],["cost",["10","11.75","1","10000.01"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
