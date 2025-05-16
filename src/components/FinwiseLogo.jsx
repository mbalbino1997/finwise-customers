export default function FinwiseLogo() {
    return (
        <svg
            width="200"
            height="80"
            viewBox="0 0 640 480"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="svg_14_blur">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
                </filter>
            </defs>
            <g className="layer">
                <text
                    fill="#ffffff"
                    filter="url(#svg_14_blur)"
                    fontFamily="Times"
                    fontSize="320"
                    fontStyle="normal"
                    fontWeight="bold"
                    lengthAdjust="spacing"
                    letterSpacing="6"
                    stroke="#ffffff"
                    strokeWidth="0"
                    textAnchor="middle"
                    x="298"
                    y="233"
                >
                    FinWise
                </text>
            </g>
        </svg>
    );
}