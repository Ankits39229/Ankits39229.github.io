"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Laptop } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Laptop, label: "System" },
  ]

  return (
    <div className="relative">
      <motion.div
        className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background indicator */}
        <motion.div
          className="absolute inset-y-1 bg-white dark:bg-gray-700 rounded-full shadow-sm"
          initial={false}
          animate={{
            x: themes.findIndex(t => t.name === theme) * 40,
            width: 32,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />

        {themes.map((themeOption, index) => {
          const Icon = themeOption.icon
          const isActive = theme === themeOption.name

          return (
            <motion.button
              key={themeOption.name}
              onClick={() => setTheme(themeOption.name)}
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${themeOption.label} theme`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${themeOption.name}-${isActive}`}
                  initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}

export function FloatingThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
    >
      <motion.button
        onClick={toggleTheme}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        className="group relative flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-800 rounded-full shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        {/* Rotating background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 opacity-0 group-hover:opacity-20 dark:from-blue-600 dark:via-purple-600 dark:to-cyan-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Icon container */}
        <div className="relative w-6 h-6">
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="w-6 h-6 text-blue-400" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -90, scale: 0 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="w-6 h-6 text-yellow-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full mr-3 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap"
            >
              Switch to {isDark ? "light" : "dark"} mode
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
