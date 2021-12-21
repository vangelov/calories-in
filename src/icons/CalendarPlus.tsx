import { chakra } from '@chakra-ui/react'

function CalendarPlus({ size = 24, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden="true"
      pointer-events="none"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      {...rest}
    >
      <g>
        <rect
          id="svg_1"
          ry="2"
          rx="2"
          height="18"
          width="18"
          y="4"
          x="2.94816"
        />
        <line id="svg_2" y2="6" x2="16" y1="2" x1="16" />
        <line id="svg_3" y2="6" x2="8" y1="2" x1="8" />
        <line id="svg_4" y2="10" x2="21" y1="10" x1="3" />
        <line
          stroke="#000"
          stroke-linecap="undefined"
          stroke-linejoin="undefined"
          id="svg_6"
          y2="18.49025"
          x2="11.97408"
          y1="13.52387"
          x1="11.97408"
          fill="none"
        />
        <line
          transform="rotate(90 11.9741 16.0071)"
          stroke="#000"
          stroke-linecap="undefined"
          stroke-linejoin="undefined"
          id="svg_10"
          y2="18.49025"
          x2="11.97408"
          y1="13.52387"
          x1="11.97408"
          fill="none"
        />
      </g>
    </svg>
  )
}

export default chakra(CalendarPlus)
