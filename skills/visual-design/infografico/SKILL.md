---
name: infografico
description: Gera infográficos verticais premium em HTML/CSS → PNG. Fundo branco, hero centralizado com Playfair Display, cards sutis tintados, anti-padrões de IA eliminados. Use quando o usuário pedir infográfico, visual educativo ou peça para LinkedIn/impressão.
---

# Infográfico — Skill de Produção

Gera infográficos verticais, fundo branco, qualidade de impressão, exportados como PNG 960px de largura.

Workflow: mapear conteúdo → gerar HTML → detectar altura → exportar PNG.

---

## 1. Idioma visual — princípios inegociáveis

### Fundo
- **Background principal: BRANCO** (`#FFFFFF`). Sempre. Sem exceção.
- O fundo escuro existe apenas no **bloco do título** (hero).
- Cards usam fundos sutis: `#FFF4EE` (laranja claro), `#EFF6FF` (azul claro), `#F0FDF4` (verde claro), `#F8FAFC` (cinza neutro).
- **Nunca** usar dark backgrounds para conteúdo.

### Cor como acento
- Usar no máximo **3 cores** por infográfico.
- A cor aparece em: números grandes, palavras-chave no título, badges, bordas de destaque.
- Se tirar a cor e a informação ainda fizer sentido, a cor estava decorando. Se a cor guia o olho para o que importa, ela está certa.

### Tipografia
- **Hero headline**: 42-46px, weight 700-800, **Playfair Display** (serif). Palavra-chave em cor primária + `font-style: italic`. Cria contraste editorial com o resto.
- **Label de autor no hero**: 10-11px, Space Grotesk, uppercase, letter-spacing 2px, opacity 38-45%.
- **Heading de seção**: 20-22px, 800, Space Grotesk, `#111827`.
- **Label de seção** (acima do heading): 9-10px, 700, uppercase, letter-spacing 2px, na cor primária.
- **Card title**: 14-15px, 700, Space Grotesk, `#111827`.
- **Body text**: **mínimo 13px**, DM Sans, `#374151`, line-height 1.55-1.6. Nunca menor.
- **Números grandes**: 32-36px, 800, Space Grotesk, na cor primária.
- Line-height de body: 1.5-1.75 (padrão do ui-ux-pro — legibilidade crítica).
- Contraste mínimo: **4.5:1** texto normal, **3:1** texto grande.

### Cards e bordas
- Card padrão: `background: #F8FAFC`, `border-radius: 8-10px`, `padding: 12-16px`.
- Card destaque laranja: `background: #FFF4EE`.
- Card destaque azul: `background: #EFF6FF`.
- Card callout: `border-left: 4px solid var(--primary)`, sem fill ou fill muito sutil.
- **Sem sombras**. Flat design.
- Gap entre colunas: `8-12px`.

### Separação de seções
- Seções separadas por `margin-top: 22px` e/ou `1px solid #E5E7EB`.
- **Sem barras navy full-width** para separar seções.
- O heading da seção já é separador visual suficiente.

---

## 2. Hero — design aprovado (v4)

O hero é **centralizado**. Sem badge de conteúdo ("Metodologia X + Y"). Sem stats row. Foto circular acima do título, autor identificado em caps pequenos.

```html
<div class="hero">
  <img class="aphoto" src="data:image/png;base64,...">
  <p class="aname">Cristian · Powerd</p>
  <h1>Como melhorar qualquer skill<br>no <span class="a">piloto automático</span></h1>
  <p class="hsub">O agente testa, mede e refina o prompt em loop. Você define o que é "bom". O resto é automático.</p>
</div>
```

**CSS do hero:**
```css
.hero {
  background: var(--navy);
  padding: 40px 60px 36px;
  text-align: center;
}
.aphoto {
  width: 68px; height: 68px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 3px solid var(--primary);
  margin: 0 auto 10px;
  display: block;
}
.aname {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10.5px; font-weight: 700;
  color: rgba(255,255,255,0.38);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 18px;
}
.hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: 44px; font-weight: 800;
  color: #fff;
  line-height: 1.08;
  max-width: 680px;
  margin: 0 auto 14px;
}
.hero h1 .a {
  color: var(--primary);
  font-style: italic;
}
.hsub {
  font-size: 14px;
  color: rgba(255,255,255,0.48);
  line-height: 1.6;
  max-width: 520px;
  margin: 0 auto;
}
```

**Regra**: o badge de tema ("Metodologia X + Y") não existe nesse formato. O subtítulo já contextualiza.

Se precisar de stats no hero (casos específicos), colocar **abaixo do subtítulo** como linha separada — não como bloco de destaque. Em geral, remover.

---

## 3. Fontes — import correto

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Space+Grotesk:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

Três famílias:
- **Playfair Display** — hero headline (contraste editorial)
- **Space Grotesk** — headings de seção, labels, números, badges
- **DM Sans** — todo body text

---

## 4. CSS base completo

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --p:   #E8632A;   /* primary */
  --s:   #2563EB;   /* secondary */
  --n:   #111E2E;   /* navy */
  --t:   #111827;   /* text dark */
  --b:   #374151;   /* body */
  --m:   #6B7280;   /* muted */
  --br:  #E5E7EB;   /* border */
  --og:  #FFF4EE;   /* bg orange */
  --bl:  #EFF6FF;   /* bg blue */
  --su:  #F8FAFC;   /* bg subtle */
}
body {
  width: 960px;
  background: #FFFFFF;
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  color: var(--t);
}

/* HERO */
.hero { background: var(--n); padding: 40px 60px 36px; text-align: center; }
.aphoto { width: 68px; height: 68px; border-radius: 50%; object-fit: cover; object-position: center top; border: 3px solid var(--p); margin: 0 auto 10px; display: block; }
.aname { font-family: 'Space Grotesk', sans-serif; font-size: 10.5px; font-weight: 700; color: rgba(255,255,255,0.38); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 18px; }
.hero h1 { font-family: 'Playfair Display', serif; font-size: 44px; font-weight: 800; color: #fff; line-height: 1.08; max-width: 680px; margin: 0 auto 14px; }
.hero h1 .a { color: var(--p); font-style: italic; }
.hsub { font-size: 14px; color: rgba(255,255,255,0.48); line-height: 1.6; max-width: 520px; margin: 0 auto; }

/* CONTENT WRAPPER */
.wrap { padding: 0 40px 24px; }

/* SECTIONS */
.sec { margin-top: 22px; }
.slabel { font-family: 'Space Grotesk', sans-serif; font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--p); margin-bottom: 3px; }
.sh { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 800; color: var(--t); margin-bottom: 10px; line-height: 1.2; }
.spill { display: inline-block; background: var(--n); color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700; padding: 5px 14px; border-radius: 20px; margin-bottom: 12px; }
.divider { height: 1px; background: var(--br); margin: 22px 0; }

/* GRIDS */
.g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
.g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.g6 { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }

/* CARDS */
.card { background: var(--su); border-radius: 10px; padding: 12px 16px; }
.card.og { background: var(--og); }
.card.bl { background: var(--bl); }
.card.wh { background: #fff; border: 1.5px solid var(--br); }

/* CARD CONTENT */
.ct { font-family: 'Space Grotesk', sans-serif; font-size: 14.5px; font-weight: 700; color: var(--t); margin-bottom: 6px; line-height: 1.25; }
.cb { font-size: 13px; color: var(--b); line-height: 1.58; }
.bnum { font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 800; color: var(--p); line-height: 1; margin-bottom: 5px; }
.bnum.bl2 { color: var(--s); }

/* BULLET LIST */
.blist { list-style: none; }
.blist li { font-size: 13px; color: var(--b); line-height: 1.48; padding: 3px 0; border-bottom: 1px solid var(--br); display: flex; gap: 8px; align-items: flex-start; }
.blist li:last-child { border-bottom: none; }
.dot { width: 5px; height: 5px; border-radius: 50%; background: var(--p); flex-shrink: 0; margin-top: 7px; }

/* BADGE LIST */
.badgelist { display: flex; flex-direction: column; gap: 4px; }
.bitem { display: flex; align-items: center; gap: 10px; background: #fff; border: 1px solid var(--br); border-radius: 7px; padding: 6px 12px; }
.bitem.mut { opacity: 0.48; }
.bitem-txt { flex: 1; font-size: 12.5px; color: var(--t); }
.badge { font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700; padding: 2px 9px; border-radius: 20px; flex-shrink: 0; }
.bg { background: #DCFCE7; color: #15803D; }
.br2 { background: #FEE2E2; color: #B91C1C; }
.bo { background: var(--og); color: var(--p); }
.bs { background: var(--su); color: var(--m); }
.bnote { font-size: 11px; color: var(--m); font-style: italic; flex-shrink: 0; }

/* PILLARS */
.pillar { padding: 6px 0; border-bottom: 1px solid var(--br); display: flex; gap: 14px; align-items: flex-start; }
.pillar:last-child { border-bottom: none; }
.pnum { font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 800; color: var(--p); line-height: 1; min-width: 30px; }
.ptit { font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 700; color: var(--t); margin-bottom: 2px; }
.pdsc { font-size: 12px; color: var(--b); line-height: 1.45; }

/* SIGNALS */
.signal { display: flex; gap: 9px; padding: 5px 0; border-bottom: 1px solid var(--br); align-items: flex-start; }
.signal:last-child { border-bottom: none; }
.sigico { width: 20px; height: 20px; background: var(--og); border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
.sigdot { width: 7px; height: 7px; background: var(--p); border-radius: 2px; }
.sigtxt { font-size: 12.5px; color: var(--b); line-height: 1.42; }

/* STEPS */
.step-row { display: flex; gap: 6px; align-items: flex-start; }
.step { flex: 1; text-align: center; }
.step-n { width: 26px; height: 26px; background: var(--p); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 800; margin: 0 auto 8px; }
.step-t { font-family: 'Space Grotesk', sans-serif; font-size: 12.5px; font-weight: 700; color: var(--t); margin-bottom: 4px; }
.step-d { font-size: 11.5px; color: var(--b); line-height: 1.45; }
.step-arr { font-size: 16px; color: var(--br); padding-top: 4px; flex-shrink: 0; }

/* LOOP / NUMBERED ROWS */
.loop-item { display: flex; gap: 10px; padding: 5px 0; border-bottom: 1px solid var(--br); align-items: flex-start; }
.loop-item:last-child { border-bottom: none; }
.loop-n { font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700; color: var(--p); min-width: 20px; margin-top: 2px; }

/* CALLOUT */
.callout { background: var(--og); border-left: 4px solid var(--p); border-radius: 8px; padding: 14px 20px; font-size: 13.5px; line-height: 1.6; color: var(--b); }
.callout strong { color: var(--p); }

/* COMPARISON */
.compare-col { flex: 1; }
.compare-label { font-family: 'Space Grotesk', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
.compare-label.before { color: var(--m); }
.compare-label.after { color: var(--p); }
.compare-item { font-size: 12.5px; padding: 7px 12px; border-radius: 6px; margin-bottom: 5px; display: flex; gap: 8px; align-items: flex-start; line-height: 1.4; }
.compare-item.bad { background: #FEF2F2; color: #991B1B; }
.compare-item.good { background: #F0FDF4; color: #166534; }

/* SCORE BAR */
.score-bar { height: 7px; background: var(--br); border-radius: 4px; margin: 6px 0 2px; overflow: hidden; }
.score-fill { height: 100%; background: var(--p); border-radius: 4px; }

/* FOOTER */
.footer { border-top: 1px solid var(--br); padding: 16px 40px; display: flex; justify-content: space-between; align-items: center; }
.footer-left { font-size: 12.5px; color: var(--m); }
.footer-left strong { color: var(--t); font-weight: 700; }
.footer-cta { font-size: 11px; color: var(--m); }
```

---

## 5. Framework de conteúdo — 7 seções

Mapear qualquer tema nessas seções antes de escrever HTML.

**HERO** — Foto centralizada + autor em caps + headline Playfair + subtítulo 1 linha
**SEÇÃO 1** — Definição + O que entrega + Stack (g3)
**SEÇÃO 2** — Fundamentos/Pilares (g2: pillar list + signals list)
**SEÇÃO 3** — Tipos ou categorias (badgelist com badges coloridos)
**SEÇÃO 4** — Processo (5 passos step-row) + Anatomia/Loop (g2)
**SEÇÃO 5** — Antes/Depois (g2 compare) + Score bar
**SEÇÃO 6** — Outputs + Para quem (g2) + Callout
**FOOTER** — Autor, marca, CTA

---

## 6. Paletas aprovadas

### Powerd (padrão Cristian)
```css
--p: #E8632A;  --s: #2563EB;  --n: #111E2E;
```

### Editorial noir
```css
--p: #C9A84C;  --s: #374151;  --n: #111111;
```

### Teal clean
```css
--p: #0D9488;  --s: #6366F1;  --n: #0F2A3A;
```

### Roxo premium
```css
--p: #7C3AED;  --s: #0EA5E9;  --n: #1A0533;
```

---

## 7. Regras de texto — anti-IA

- [ ] Nenhum número sem unidade: "3x mais rápido", "47 min", "R$12k/mês".
- [ ] Zero palavras de preenchimento: "notavelmente", "significativamente", "de fato".
- [ ] Zero transições de ensaio: "além disso", "nesse sentido", "em suma".
- [ ] Verbos ativos: "gera", "reduz", "automatiza" — nunca "pode ser utilizado para".
- [ ] Sem travessão (—): usar vírgula, ponto ou dois-pontos.
- [ ] Sem verbos corporativos: alavancar, potencializar, maximizar, impulsionar.
- [ ] Frases de card: máximo 10-12 palavras por linha.
- [ ] Dado > adjetivo: "reduz 73% do tempo" não "reduz muito o tempo".

---

## 8. Exportação PNG

### Passo 1 — detectar altura

Criar cópia do HTML com script de detecção:
```bash
cp arquivo.html /tmp/detect.html
# Injetar antes de </body>:
sed -i '' 's|</body>|<script>window.addEventListener("load",function(){document.title="HEIGHT:"+document.documentElement.scrollHeight;});</script></body>|' /tmp/detect.html
```

Detectar:
```bash
"/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
  --headless --dump-dom --virtual-time-budget=3000 \
  "file:///tmp/detect.html" 2>/dev/null | grep -o 'HEIGHT:[0-9]*' | head -1
```

### Passo 2 — exportar
```bash
HEIGHT=XXXX
"/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
  --headless \
  --screenshot="/Users/cristianmacos/Documents/infograficos/saida.png" \
  --window-size=960,${HEIGHT} \
  --hide-scrollbars \
  "file:///caminho/arquivo.html" 2>/dev/null
```

### Alvos de qualidade
- Largura: **960px** fixo
- Altura: deixar o conteúdo determinar (**1:2.0 a 1:3.0 aceitável**)
- Não forçar ratio — melhor legível e mais alto do que cramped
- Se ultrapassar 1:3.2, revisar espaçamentos antes de cortar conteúdo

---

## 9. Onde salvar

```
/Users/cristianmacos/Documents/infograficos/
  [cliente]-[tema].html
  [cliente]-[tema].png
```

---

## 10. Checklist antes de exportar

- [ ] Fundo branco em todo conteúdo (exceto hero)
- [ ] Hero centralizado (text-align: center) — sem badge de tema, sem stats
- [ ] Headline do hero em Playfair Display com acento itálico na cor primária
- [ ] Foto circular centralizada com border na cor primária
- [ ] Body text mínimo 13px com alto contraste (4.5:1)
- [ ] Line-height 1.5-1.6 em todo body text
- [ ] Foto sem distorção (object-fit: cover; object-position: center top)
- [ ] Zero espaço branco no final (height = scrollHeight)
- [ ] Zero emojis no corpo
- [ ] Fontes Playfair Display + Space Grotesk + DM Sans via Google Fonts com display=swap
- [ ] Cores dentro da paleta escolhida
- [ ] Checklist anti-IA aplicada
- [ ] Sem dark backgrounds em cards de conteúdo
