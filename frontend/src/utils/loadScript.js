// utils/loadScript.js
const loadedScripts = new Set();

export function loadScript(src, id) {
    return new Promise((resolve) => {
        if (loadedScripts.has(id) || document.getElementById(id)) {
            resolve(true);
            return;
        }
        const script = document.createElement("script");
        script.id = id;
        script.src = src;
        script.async = true;
        script.onload = () => { loadedScripts.add(id); resolve(true); };
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}