import type en from "./en";

export default {
    input: {
        seed: {
            label: "Eingabe",
            placeholder: "Text eingeben um Rune zu generieren",
        },
        seedCircle: {
            label: "Eingabe",
            placeholder: `RuneGPT
du;kannst;Kreise
generieren;indem;du;hier
mehrere;Zeilen;eingibst
jede;Zeile;ist;ein;Kreis;und;Runen;sind;durch;Semikolons;getrennt`,
        },
        advanced: "Erweiterte Einstellungen",
        pointDensity: { label: "Dichte der Punkte" },
        lineDensity: { label: "Dichte der Linien" },
    },
    downloadSvg: "SVG herunterladen",
    runes: {
        hex: "Hexagon",
        tallHex: "Hohes Hexagon",
        flatHex: "Flaches Hexagon",
        tallRect: "Hohes Rechteck",
        wideRect: "Breites Rechteck",
    },
    header: {
        runeGenerator: "Runengenerator",
        circleGenerator: "Kreisegenerator",
    },
    footer: {
        author: {
            pre: "Von ",
            post: " mit ❤ gemacht",
        },
    },
} satisfies typeof en;
