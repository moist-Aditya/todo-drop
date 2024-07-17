"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const DURATION = 0.2
const STAGGER = 0.025

const ZoopText = ({
  children,
  href,
  className,
}: {
  children: string
  href: string
  className?: string
}) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className={cn(
        "relative block cursor-pointer text-5xl md:text-7xl lg:text-9xl whitespace-nowrap uppercase font-black text-black overflow-hidden",
        className
      )}
      style={{ lineHeight: 0.75 }}
    >
      {/* Child 1 */}
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              delay: STAGGER * i,
              ease: "easeInOut",
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>

      {/* Child 2 */}
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              delay: STAGGER * i,
              ease: "easeInOut",
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  )
}

export default ZoopText
