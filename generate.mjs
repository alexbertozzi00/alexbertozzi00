// Gera o terminal.svg do perfil. Requer apenas Node.js (sem dependências).
// Uso: node generate.mjs
import { readFileSync, writeFileSync } from "node:fs";

function renderSvg(artText) {
  const esc = (v) => String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const lines = artText.trimEnd().split(/\r?\n/);
  const big = lines.flatMap(line => {
    const rendered = [...line].map(c=>c==="#"?"██":"  ").join("").replace(/\s+$/,"");
    return [rendered,rendered];
  });
  const info=[
    ["Nome","Alexandre Bertozzi"],
    ["Perfil","Estratégia × Tecnologia"],
    ["Kernel","Sistemas · Gestão · Processos"],
    ["Runtime","Automação · APIs · Integrações"],
    ["Stack","Python · Java · Git"],
    ["Tools","GitHub · VS Code · Claude Code"],
    ["Projetos","Bots · Webhooks · Ferramentas"],
    ["Idioma","Português (BR)"],
    ["Método","Questionar → testar → evoluir"],
    ["Status","Em construção contínua"]
  ];
  const head=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" role="img" aria-labelledby="title desc">
<title id="title">Alexandre Bertozzi — terminal de perfil</title>
<desc id="desc">Neofetch personalizado com monograma AB e informações sobre Alexandre Bertozzi.</desc>
<defs>
  <linearGradient id="wave" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="360" y2="200" spreadMethod="repeat">
    <stop offset="0" stop-color="#67e8f9"/>
    <stop offset=".5" stop-color="#a78bfa"/>
    <stop offset="1" stop-color="#67e8f9"/>
    <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="360 200" dur="7s" repeatCount="indefinite"/>
  </linearGradient>
  <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
    <path d="M28 0H0V28" fill="none" stroke="#16212b" stroke-width=".6"/>
  </pattern>
  <style><![CDATA[
    text{font-family:"JetBrains Mono","Cascadia Code","Fira Code",Consolas,"DejaVu Sans Mono",monospace}
    .row{opacity:0;animation:show .55s ease-out forwards}
    .cursor{animation:blink 1.05s steps(1,end) infinite}
    .prompt{opacity:0;animation:show .6s ease-out 1.4s forwards}
    @keyframes show{to{opacity:1}}
    @keyframes blink{50%{opacity:0}}
    @media (prefers-reduced-motion:reduce){.row,.cursor,.prompt{animation:none;opacity:1}}
  ]]></style>
</defs>
<rect width="1200" height="600" rx="16" fill="#0d1117"/>
<rect x="1" y="1" width="1198" height="598" rx="15" fill="none" stroke="#30363d" stroke-width="2"/>
<path d="M16 0H1184Q1200 0 1200 16V52H0V16Q0 0 16 0Z" fill="#161b22"/>
<path d="M0 52H1200" stroke="#30363d"/>
<circle cx="27" cy="26" r="7" fill="#ff5f57"/>
<circle cx="51" cy="26" r="7" fill="#febc2e"/>
<circle cx="75" cy="26" r="7" fill="#28c840"/>
<text x="600" y="32" text-anchor="middle" font-size="15" fill="#8b949e">alexbertozzi00 — ~/profile</text>
<text x="32" y="98" font-size="18"><tspan fill="#7ee787" font-weight="bold">alexbertozzi00@github</tspan><tspan fill="#8b949e">:~$</tspan><tspan fill="#e6edf3"> neofetch --custom</tspan></text>
<rect x="32" y="122" width="422" height="404" rx="10" fill="#0f1821" opacity=".7"/>
<rect x="32" y="122" width="422" height="404" rx="10" fill="url(#grid)" opacity=".8"/>
<text x="48" y="148" font-size="11" fill="#64748b" letter-spacing="3">ALEXANDRE / BERTOZZI</text>`;
  const left=big.map((line,i)=>`<text x="51" y="${176+i*17.2}" font-size="14.7" letter-spacing="0" fill="url(#wave)" xml:space="preserve">${esc(line)}</text>`).join("\n");
  const right=`<text x="505" y="158" font-size="21" fill="#ffb86c" font-weight="bold">alexbertozzi00@github</text>
<path d="M505 177H1159" stroke="#30363d" stroke-width="1.5"/>
<text x="505" y="196" font-size="11" fill="#8b949e" letter-spacing="3">IDENTIDADE · PROCESSO · TECNOLOGIA</text>`;
  const infolines=info.map(([k,v],i)=>{
    const y=235+i*27;
    const delay=(.12+i*.10).toFixed(2);
    return `<g class="row" style="animation-delay:${delay}s"><text x="505" y="${y}" font-size="17" fill="#79c0ff" font-weight="bold">${esc(k)}</text><text x="648" y="${y}" font-size="17" fill="#6e7681">:</text><text x="673" y="${y}" font-size="17" fill="${k==="Status"?"#7ee787":"#e6edf3"}">${esc(v)}</text></g>`;
  }).join("\n");
  const colors=["#ff7b72","#ffa657","#e3b341","#7ee787","#79c0ff","#58a6ff","#bc8cff","#ff7eb6"];
  const palette=colors.map((color,i)=>`<rect x="${505+i*31}" y="520" width="25" height="17" rx="3" fill="${color}"/>`).join("\n");
  const foot=`<path d="M32 550H1168" stroke="#30363d" stroke-width="1"/>
<g class="prompt"><text x="32" y="577" font-size="17"><tspan fill="#7ee787" font-weight="bold">alexbertozzi00@github</tspan><tspan fill="#8b949e">:~$</tspan><tspan fill="#e6edf3"> construir --questionar --iterar </tspan><tspan fill="#a78bfa" class="cursor">█</tspan></text></g>
<text x="1166" y="577" font-size="12" fill="#64748b" text-anchor="end">v2.0 · AB</text>
</svg>`;
  return [head,left,right,infolines,palette,foot].join("\n")+"\n";
}

const art = readFileSync(new URL("./art.txt", import.meta.url), "utf8");
writeFileSync(new URL("./terminal.svg", import.meta.url), renderSvg(art), "utf8");
console.log("terminal.svg atualizado");
