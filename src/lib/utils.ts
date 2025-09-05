import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get Operating System from User
// https://stackoverflow.com/questions/79437378/detecting-the-users-operating-system-on-the-server-in-next-js-15
export const getOSFromUA = (userAgent: string | null): string | null => {
    if (!userAgent) return null

    const ua = userAgent.toLowerCase()

    if (ua.includes('win')) return 'Windows'
    if (ua.includes('mac')) return 'macOS'
    if (ua.includes('linux')) return 'Linux'
    if (ua.includes('android')) return 'Android'
    if (ua.includes('like mac') || ua.includes('ios')) return 'ios'

    return null
}