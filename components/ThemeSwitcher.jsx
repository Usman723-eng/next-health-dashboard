'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeSwitcher() {
    const { theme, setTheme, themes } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Render placeholder with same structure during SSR
    if (!mounted) {
        return (
            <div className="flex items-center gap-1 p-1 bg-surface border border-border">
                {themes.map((t) => (
                    <button
                        key={t.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-sans font-normal cursor-pointer border-none transition-all duration-200 bg-transparent text-menu-default"
                    >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1 p-1 bg-surface border border-border">
            {themes.map((t) => {
                const isActive = theme === t.id;
                return (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        title={t.label}
                        className={isActive
                            ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-sans font-semibold cursor-pointer border-none transition-all duration-200 bg-brand text-on-color'
                            : 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-sans font-normal cursor-pointer border-none transition-all duration-200 bg-transparent text-menu-default hover:bg-menu-hover'
                        }
                    >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                    </button>
                );
            })}
        </div>
    );
}