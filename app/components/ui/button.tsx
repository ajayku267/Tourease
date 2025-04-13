import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "text-white gradient-animation border-0 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600",
        glow: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow",
        "3d": "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transform transition-transform active:translate-y-0.5 active:shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/* Additional custom styles */
const customStyles = {
  rippleEffect: "after:content-[''] after:absolute after:inset-0 after:bg-white after:opacity-0 group-hover:after:opacity-20 after:rounded-md after:transition-opacity",
  glowEffect: "before:content-[''] before:absolute before:inset-0 before:bg-white before:opacity-0 before:blur-xl group-hover:before:opacity-20 before:transition-opacity",
  shineEffect: "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-100%] group-hover:before:translate-x-[100%] before:transition-transform before:duration-1000",
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  withRipple?: boolean
  withGlow?: boolean
  withShine?: boolean
  isLoading?: boolean
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, withRipple, withGlow, withShine, isLoading, iconLeft: IconLeft, iconRight: IconRight, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const additionalClasses = [
      withRipple ? customStyles.rippleEffect : "",
      withGlow ? customStyles.glowEffect : "",
      withShine ? customStyles.shineEffect : "",
    ].join(" ")

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }), additionalClasses)}
          ref={ref}
          {...props}
        >
          {isLoading ? (
            <>
              <svg 
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading...</span>
            </>
          ) : (
            <>
              {IconLeft && <IconLeft className="mr-2 h-4 w-4" />}
              {children}
              {IconRight && <IconRight className="ml-2 h-4 w-4" />}
            </>
          )}
        </Comp>
      )
    }

    // Use motion.button for animated buttons
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }), additionalClasses)}
        ref={ref}
        {...props}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {isLoading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {IconLeft && <IconLeft className="mr-2 h-4 w-4" />}
            {children}
            {IconRight && <IconRight className="ml-2 h-4 w-4" />}
          </>
        )}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 