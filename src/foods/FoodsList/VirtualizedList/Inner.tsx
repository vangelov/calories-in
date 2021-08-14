import { forwardRef } from 'react'

const TOP_PADDING = 12

const Inner = forwardRef<any, any>(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      height: `${parseFloat(style.height) + TOP_PADDING}px`,
    }}
    {...rest}
  />
))

export { TOP_PADDING }

export default Inner
