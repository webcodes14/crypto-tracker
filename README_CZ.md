# Crypto Tracker

Responzivní přehled kryptoměn postavený na Next.js 16. Zobrazuje deset mincí
s nejvyšší tržní kapitalizací, umožňuje vyhledávání a řazení a nabízí detail
s cenovým grafem za posledních sedm dní.

Anglická verze dokumentace je v souboru [README.md](./README.md).

## Funkce

- Serverové načítání tržních dat z CoinGecko s revalidací po 60 sekundách.
- Ověření odpovědí API při běhu aplikace pomocí Zod.
- Vyhledávání podle názvu nebo symbolu a přístupné řazení pomocí nativního
  ovládacího prvku.
- Detail mince se změnou za 24 hodin, rozpětím denní ceny, nabídkou a grafem.
- Responzivní rozvržení, stav načítání, prázdný stav a chybové obrazovky.

## Technologie

- Next.js 16 App Router a React 19
- TypeScript a Zod
- Tailwind CSS 4 a CSS Modules
- Chart.js a `react-chartjs-2`
- Vestavěný test runner Node.js

## Požadavky

- Node.js 20.9 nebo novější
- npm
- Připojení k internetu pro CoinGecko API a obrázky mincí

## Instalace a spuštění

```bash
npm ci
npm run dev
```

Otevřete [http://localhost:3000](http://localhost:3000).

## Kontrola projektu

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

GitHub Actions spouští tyto kontroly při každém pushi a pull requestu.

## Použití AI nástrojů

Při vývoji a úpravách projektu jsem jako podpůrný nástroj použil GitHub Copilot.
Návrhy vygenerované AI jsem průběžně upravoval a ověřoval pomocí testů, lintování
a produkčního buildu.

## Struktura projektu

```text
app/
  coin/[id]/page.tsx       Detail mince a metadata stránky
  components/              Serverové a klientské UI komponenty
  tech-stack/page.tsx      Přehled technologií a rozhodnutí
  page.tsx                 Dashboard
lib/
  api.ts                   Zod schémata a serverové helpery CoinGecko
  coin-utils.ts            Formátování a výpočet cenového rozpětí
  api.test.ts              Testy validace dat a pomocných funkcí
```

## Data a omezení

Všechny ceny jsou v USD. Data jsou externí a mohou být opožděná, nedostupná
nebo omezená limity CoinGecko. Aplikace tato data ověřuje a chybějící číselné
hodnoty zobrazuje jako nedostupné. Projekt je read-only ukázka bez účtů,
databáze ani ukládání uživatelských preferencí.

Pro veřejný repozitář zatím není zvolena licence; před dalším šířením je potřeba
licenční podmínky výslovně doplnit.
