export default {
    input: {
        seed: {
            label: "Input",
            placeholder: "Enter text to generate rune",
        },
        seedCircle: {
            label: "Input",
            placeholder: `RuneGPT
you;can;generate
circles;by;writing;here
each;line;is;another;circle
each;line;contains;input;seperated;by;semicolons`,
        },
        advanced: "Advanced settings",
        pointDensity: { label: "Point density" },
        lineDensity: { label: "Line Density" },
    },
    downloadSvg: "Download SVG",
    runes: {
        hex: "hexagon",
        tallHex: "tall hexagon",
        flatHex: "flat hexagon",
        tallRect: "tall rectangle",
        wideRect: "wide rectangle",
    },
    header: {
        runeGenerator: "Rune Generator",
        circleGenerator: "Circle Generator",
    },
    footer: {
        author: {
            pre: "Made with ❤ by ",
            post: "",
        },
    },
};
