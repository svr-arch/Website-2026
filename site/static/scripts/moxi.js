(()=>{
        let doc = document
        if(doc.__moxi_mo) return
        let liveFns = new Set(), pending = false,
        recompute = ()=>{
                if (pending) return
                pending = true
                queueMicrotask(()=>{liveFns.forEach(f=>f()); setTimeout(()=>pending = false)})
        }
        doc.__moxi_mo = new MutationObserver(recs=>{
                recs.forEach(r=>r.type == "childList" && r.addedNodes.forEach(n=>process(n)))
                recompute()
        })
        let AF = async function(){}.constructor, HARGS = ["q", "wait", "trigger", "debounce", "evt"],
        fire = (elt, type, detail, bub)=>elt.dispatchEvent(new CustomEvent(type, {detail, cancelable:1, bubbles:bub??1, composed:1})),
        el = (e,n,h,o)=>e.addEventListener(n,h,o),
        DB = Symbol(),
        mkDb = ()=>{let last = 0, j; return ms=>new Promise((r,rj)=>{j?.(DB); j = rj; let id = ++last; setTimeout(()=>id == last && (j = null, r()), ms)})},
        mkWait = ctx=>x=>new Promise(r=>typeof x == "number" ? setTimeout(r,x) : el(ctx,x,r,{once:1})),
        ignore = elt=>elt.closest("[mx-ignore]"),
        one = x=>x?[x]:[],
        POS = {before:"beforebegin",after:"afterend",start:"afterbegin",end:"beforeend"},
        proxy = elts=>new Proxy({}, {
                get:(_,p)=>{
                        if (p == "count") return elts.length
                        if (p == "arr") return ()=>elts.slice()
                        if (p == Symbol.iterator) return ()=>elts.values()
                        if (p == "trigger") return (t,d,b)=>elts.forEach(e=>fire(e,t,d,b))
                        if (p == "insert") return (pos,s)=>elts.forEach(e=>e.insertAdjacentHTML(POS[pos],s))
                        if (p == "take") return (cls,from)=>{
                                for (let e of typeof from == "string" ? doc.querySelectorAll(from) : from) e.classList.remove(cls)
                                for (let e of elts) e.classList.add(cls)
                        }
                        if (p == "last") return elts[elts.length - 1]
                        let v = elts[0]?.[p]
                        if (v?.call) return (...a)=>elts.map(e=>e[p](...a))[0]
                        if (v && typeof v == "object") return proxy(elts.map(e=>e[p]))
                        return v
                },
                set:(_,p,v)=>(elts.forEach(e=>e[p]=v),true)
        }),
        mkq = ctx=>sel=>{
                if (typeof sel != "string") return proxy(sel.nodeType ? [sel] : [...sel])
                let im = sel.match(/^(.+)\s+in\s+(.+)$/), root = doc
                if (im){ sel = im[1]; root = im[2] == "this" ? ctx : doc.querySelector(im[2]) }
                if (!root) return proxy([])
                let m = sel.match(/^(next|prev|closest|first|last)\s+(.+)$/), elts
                if (m){
                        let [,d,s] = m, cdp = e=>ctx.compareDocumentPosition(e)
                        if (d == "closest") elts = one(ctx.closest(s))
                        else {
                                let all = [...doc.querySelectorAll(s)], idx = all.indexOf(ctx)
                                if (d == "next") elts = all.filter(e=>(cdp(e)&Node.DOCUMENT_POSITION_FOLLOWING)).slice(0,1)
                                else if (d == "prev") elts = all.filter(e=>(cdp(e)&Node.DOCUMENT_POSITION_PRECEDING)).slice(-1)
                                else if (d == "first") elts = all.slice(0,1)
                                else if (d == "last") elts = all.slice(-1)
                        }
                } else elts = [...root.querySelectorAll(sel)]
                return proxy(elts)
        },
        init = (elt, attr, attrName)=>{
                if (ignore(elt)) return
                let trigger = attrName.split("-").slice(1).join("-"),
                debounce = mkDb(), h = async (evt)=>{
                        try { await new AF(...HARGS, attr)(mkq(elt), mkWait(elt), (t,d,b)=>fire(elt,t,d,b), debounce, evt) }
                        catch(e){ if (e !== DB) throw e }
                }
                if (trigger == "live") liveFns.add(h)
                else el(elt, trigger, h)
        },
        process = (elt)=>{
                if (elt.attributes){
                        for (let a of elt.attributes) if (a.name.startsWith("on-") || a.name == "live") init(elt, a.value, a.name)
                }
                if (elt.querySelectorAll) elt.querySelectorAll("*").forEach(n=>{
                        for (let a of n.attributes) if (a.name.startsWith("on-") || a.name == "live") init(n, a.value, a.name)
                })
        }
        globalThis.q = mkq(doc); globalThis.wait = mkWait(doc); globalThis.transition = fn=>doc.startViewTransition(fn)
        process(doc)
        doc.__moxi_mo.observe(doc, {childList:1, subtree:1})
})()
