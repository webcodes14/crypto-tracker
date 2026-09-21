# Crypto Tracker

Malý responzivní dashboard kryptoměn vytvořený v Next.js. Zobrazuje aktuální
tržní data z CoinGecko, umožňuje vyhledávání a řazení zobrazených mincí a nabízí
detailní stránku se statistikami a grafem vývoje ceny za posledních sedm dní.

Anglická verze dokumentace je v souboru
[README.md](./README.md).

## Funkce

- Zobrazení 10 kryptoměn s nejvyšší tržní kapitalizací.
- Načítání aktuální ceny, symbolu, tržní kapitalizace a obrázku mince z CoinGecko
  API.
- Vyhledávání podle názvu nebo symbolu kryptoměny.
- Řazení aktuálně vyfiltrovaného seznamu podle výchozího pořadí, nejvyšší nebo
  nejnižší ceny.
- Detailní stránka na adrese `/coin/[id]`, která zobrazuje:
  - aktuální cenu v USD a změnu za 24 hodin,
  - minimum a maximum za posledních 24 hodin,
  - tržní kapitalizaci, plně zředěnou valuaci a údaje o nabídce,
  - graf ceny za posledních sedm dní.
- Stránka `/tech-stack` s přehledem použitých technologií.
- Responzivní vzhled pomocí Tailwind CSS a CSS Modules pro styly konkrétních
  komponent.

## Použité technologie

- [Next.js](https://nextjs.org/) 16 s App Routerem
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Chart.js](https://www.chartjs.org/) s knihovnou
  [react-chartjs-2](https://react-chartjs-2.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [CoinGecko API](https://docs.coingecko.com/reference/introduction)

## Požadavky

- Node.js 20.9 nebo novější
- npm
- Připojení k internetu pro požadavky na CoinGecko a načítání vzdálených obrázků
  mincí

## Instalace a spuštění

Nainstalujte závislosti:

```bash
npm install
```

Spusťte vývojový server:

```bash
npm run dev
```

Poté otevřete [http://localhost:3000](http://localhost:3000) v prohlížeči.

## Dostupné skripty

| Příkaz | Popis |
| --- | --- |
| `npm run dev` | Spustí vývojový server Next.js. |
| `npm run build` | Vytvoří produkční build. |
| `npm run start` | Spustí produkční build; nejdříve spusťte `npm run build`. |
| `npm run lint` | Spustí ESLint. |

## Data a cache

Data se načítají na serveru pomocí helperů v `lib/api.ts`:

- `GET /api/v3/coins/markets` načte prvních 10 mincí seřazených podle tržní
  kapitalizace.
- `GET /api/v3/coins/{id}` načte detail vybrané mince a její sparkline data za
  sedm dní.

Požadavky používají serverovou revalidaci Next.js s intervalem 60 sekund.
Aplikace v současné době nevyžaduje žádné proměnné prostředí. Dostupnost
CoinGecko a jeho limity API mohou ovlivnit načtení dashboardu; neúspěšné
požadavky jsou předány standardnímu error handlingu Next.js.

Načítání obrázků mincí z domény `coin-images.coingecko.com` je povoleno v
`next.config.ts`.

## Struktura projektu

```text
app/
  page.tsx                    Hlavní stránka dashboardu
  coin/[id]/page.tsx          Route detailu mince
  tech-stack/page.tsx         Přehled technologií
  components/                 UI komponenty a interaktivní logika
lib/
  api.ts                      Typy a serverové helpery pro CoinGecko
public/
  data.json                   Statický veřejný datový soubor
  crypto-tracker.png          Logo aplikace
```

Dashboard a detail mince používají serverové komponenty pro načítání dat.
Vyhledávání, řazení a vizualizace pomocí Chart.js jsou implementovány
v klientských komponentách.

## Poznámky

- Ceny a tržní hodnoty se zobrazují v USD.
- Dashboard záměrně zobrazuje pouze prvních 10 mincí z dotazu řazeného podle
  tržní kapitalizace.
- Projekt neobsahuje autentizaci, databázi ani trvalé ukládání uživatelských
  preferencí.
- CoinGecko je externí služba, takže se její data mohou měnit a platí pro ni
  limity API.

## Licence

V repozitáři se aktuálně nenachází licenční soubor.
