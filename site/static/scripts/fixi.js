(()=>{
        if(document.__fixi_mo) return;
        document.__fixi_mo = new MutationObserver((recs)=>recs.forEach((r)=>r.type === "childList" && r.addedNodes.forEach((n)=>process(n))))
        let send = (elt, type, detail, bub)=>elt.dispatchEvent(new CustomEvent("fx:" + type, {detail, cancelable:true, bubbles:bub !== false, composed:true}))
        let attr = (elt, name, defaultVal)=>elt.getAttribute(name) || defaultVal
        let dflt = (n, d)=>(window.fixiCfg ?? {})[n] ?? d
        let ignore = (elt)=>elt.closest("[fx-ignore]") != null
        let init = (elt)=>{
                let options = {}
                if (elt.__fixi || ignore(elt) || !send(elt, "init", {options})) return
                elt.__fixi = async(evt)=>{
                        let reqs = elt.__fixi.requests ||= new Set()
                        let form = elt.form || elt.closest("form")
                        let body = new FormData(form ?? undefined, evt.submitter)
                        if (elt.name && !evt.submitter && (!form || (elt.form === form && elt.type === 'submit'))) body.append(elt.name, elt.value)
                        let ac = new AbortController()
                        let cfg = {
                                trigger:evt,
                                action:attr(elt, "fx-action"),
                                method:attr(elt, "fx-method", "GET").toUpperCase(),
                                target:document.querySelector(attr(elt, "fx-target")) ?? elt,
                                swap:attr(elt, "fx-swap", dflt("swap", "outerHTML")),
                                body,
                                drop:reqs.size,
                                headers:{"FX-Request":"true", ...window.fixiCfg?.headers},
                                abort:ac.abort.bind(ac),
                                signal:ac.signal,
                                preventTrigger:true,
                                transition:dflt("transition", document.startViewTransition?.bind(document)),
                                fetch:fetch.bind(window)
                        }
                        let go = send(elt, "config", {cfg, requests:reqs})
                        if (cfg.preventTrigger) evt.preventDefault()
                        if (!go || cfg.drop) return
                        if (/GET|DELETE/.test(cfg.method)){
                                let params = new URLSearchParams(cfg.body)
                                if (params.size)
                                        cfg.action += (/\?/.test(cfg.action) ? "&" : "?") + params
                                cfg.body = null
                        }
                        reqs.add(cfg)
                        try {
                                if (cfg.confirm){
                                        let result = await cfg.confirm()
                                        if (!result) return
                                }
                                if (!send(elt, "before", {cfg, requests:reqs})) return
                                cfg.response = await cfg.fetch(cfg.action, cfg)
                                cfg.text = await cfg.response.text()
                                if (!send(elt, "after", {cfg})) return
                                let target = cfg.target
                                let swap = cfg.swap
                                let doSwap = ()=>{
                                        if (swap === "innerHTML") target.innerHTML = cfg.text
                                        else if (swap === "outerHTML") target.outerHTML = cfg.text
                                        else if (swap === "textContent") target.textContent = cfg.text
                                        else if (swap === "beforebegin") target.insertAdjacentHTML("beforebegin", cfg.text)
                                        else if (swap === "afterbegin") target.insertAdjacentHTML("afterbegin", cfg.text)
                                        else if (swap === "beforeend") target.insertAdjacentHTML("beforeend", cfg.text)
                                        else if (swap === "afterend") target.insertAdjacentHTML("afterend", cfg.text)
                                        else if (swap === "delete") target.remove()
                                        else if (swap === "none") {}
                                        else throw "Unknown swap: " + swap
                                }
                                if (cfg.transition) await cfg.transition(doSwap).finished
                                else doSwap()
                                send(elt, "end", {cfg})
                        } catch (e) {
                                send(elt, "error", {cfg, error:e})
                        } finally {
                                reqs.delete(cfg)
                        }
                }
                elt.addEventListener(attr(elt, "fx-trigger", elt instanceof HTMLFormElement ? "submit" : /INPUT|SELECT|TEXTAREA/.test(elt.tagName) ? "change" : "click"), elt.__fixi)
        }
        let process = (elt)=>{
                if(elt.querySelectorAll){
                        if(elt instanceof Element && elt.hasAttribute("fx-action")) init(elt)
                        elt.querySelectorAll("[fx-action]").forEach(init)
                }
        }
        process(document)
        document.__fixi_mo.observe(document, {childList:true, subtree:true})
})()
