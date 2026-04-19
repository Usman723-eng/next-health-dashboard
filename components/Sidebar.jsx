"use client";

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/icons';
import { BIOMARKER_LAB_SLUGS } from '@/app/lib/biomarkerLabs';

function matchesSubmenuPath(pathname, sub) {
    if (!pathname || !sub?.href) return false;
    if (sub.href === '/biomarkers') {
        if (pathname === '/biomarkers') return true;
        const m = pathname.match(/^\/biomarkers\/([^/]+)$/);
        return m ? BIOMARKER_LAB_SLUGS.includes(m[1]) : false;
    }
    return pathname === sub.href || pathname.startsWith(`${sub.href}/`);
}

function findActiveSubmenu(pathname, submenu) {
    if (!submenu?.length) return null;
    const withoutAll = submenu.filter((s) => s.href !== '/biomarkers');
    const sorted = [...withoutAll].sort((a, b) => b.href.length - a.href.length);
    const areaMatch = sorted.find((sub) => matchesSubmenuPath(pathname, sub));
    if (areaMatch) return areaMatch;
    const allBio = submenu.find((s) => s.href === '/biomarkers');
    if (allBio && matchesSubmenuPath(pathname, allBio)) return allBio;
    return null;
}

const NAV_ITEMS = [
    {
        id: 'home',
        label: 'Home',
        href: '/',
        icon: 'home-gray',
        iconActive: 'home-primary',
    },
    {
        id: 'biomarkers',
        label: 'Biomarkers',
        href: '/biomarkers',
        icon: 'biomarkers-gray',
        iconActive: 'biomarkers-primary',
        submenu: [
            {
                label: 'All',
                href: '/biomarkers',
                icon: 'all-biomarkers-grid',
            },
            {
                label: 'Nutrition',
                href: '/biomarkers/nutrition',
                icon: 'nutrition',
            },
            {
                label: 'Metabolic Health',
                href: '/biomarkers/metabolic',
                icon: 'metabolic',
            },
            {
                label: 'Sleep and Recovery',
                href: '/biomarkers/sleep',
                icon: 'recovery',
            },
            {
                label: 'Physical Fitness',
                href: '/biomarkers/movement',
                icon: 'movement',
            },
            {
                label: 'Emotional Health + Stress',
                href: '/biomarkers/emotional',
                icon: 'emotional-health',
            },
            {
                label: 'Toxin Exposure',
                href: '/biomarkers/toxin-exposure',
                icon: 'toxin-exposure',
            },
            {
                label: 'Liver and Kidney Health',
                href: '/biomarkers/liver-kidney',
                icon: 'liver-kidney',
            },
            {
                label: 'Hormone Health',
                href: '/biomarkers/hormones',
                icon: 'hormone-health',
            },
            {
                label: 'Gut Health',
                href: '/biomarkers/gut',
                icon: 'gut-health',
            },
            {
                label: 'Inflammation',
                href: '/biomarkers/inflammation',
                icon: 'inflammation',
            },
            {
                label: 'CV (Heart) Health',
                href: '/biomarkers/heart',
                icon: 'heart-health',
            },
            {
                label: 'Immune Health',
                href: '/biomarkers/immune',
                icon: 'immune-health',
            },
            {
                label: 'Cancer Prevention',
                href: '/biomarkers/regenerative',
                icon: 'regenerative-medicine',
            },
            {
                label: 'Brain Health',
                href: '/biomarkers/brain',
                icon: 'brain-health',
            },
            {
                label: 'Longevity',
                href: '/biomarkers/longevity',
                icon: 'longevity',
            },
        ],
    },
    {
        id: 'health-plan',
        label: 'Health Plan',
        href: '/health-plan',
        icon: 'health-plan-gray',
        iconActive: 'health-plan-primary',
    },
    {
        id: 'records',
        label: 'Records',
        href: '/records',
        icon: 'health-plan-gray',
        iconActive: 'health-plan-primary',
    },
    {
        id: 'devices',
        label: 'Devices',
        href: '/devices',
        icon: 'device-gray',
        iconActive: 'device-primary',
    },
];

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeItem, setActiveItem] = useState('home');
    const [expandedItem, setExpandedItem] = useState(null);
    const [isSubmenuCollapsed, setIsSubmenuCollapsed] = useState(false);
    const [activeSubItem, setActiveSubItem] = useState(null);

    const isExpanded  = expandedItem !== null;
    const expandedNav = NAV_ITEMS.find(i => i.id === expandedItem);

    const activeItemFromPath = useMemo(() => {
        if (!pathname) return null;
        const match = NAV_ITEMS.find((item) => {
            if (item.submenu?.length) {
                if (item.id === 'biomarkers' && pathname.startsWith('/biomarkers')) return true;
                return item.submenu.some((sub) => matchesSubmenuPath(pathname, sub));
            }
            return pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
        });
        return match?.id ?? null;
    }, [pathname]);

    useEffect(() => {
        if (!activeItemFromPath) return;
        setActiveItem(activeItemFromPath);
    }, [activeItemFromPath]);

    useEffect(() => {
        if (!pathname) return;
        
        const biomarkersItem = NAV_ITEMS.find((i) => i.id === 'biomarkers');
        if (pathname.startsWith('/biomarkers')) {
            setExpandedItem('biomarkers');
            const biomarkersSubMatch = findActiveSubmenu(pathname, biomarkersItem?.submenu);
            setActiveSubItem(biomarkersSubMatch?.href ?? null);
            return;
        }

        setExpandedItem(null);
        setActiveSubItem(null);
    }, [pathname]);

    useEffect(() => {
        if (expandedItem === null) setIsSubmenuCollapsed(false);
    }, [expandedItem]);

    const handleNavClick = (item) => {
        setActiveItem(item.id);
        if (item.submenu) {
            const firstHref = item.submenu[0]?.href ?? item.href;
            setExpandedItem(item.id);
            setActiveSubItem(firstHref);
            if (firstHref) router.push(firstHref);
        } else {
            setExpandedItem(null);
            setActiveSubItem(null);
        }
    };

    return (
        <div
            className={`flex bg-surface transition-all duration-300 ${
                isExpanded ? (isSubmenuCollapsed ? 'w-44' : 'w-103') : 'w-27'
            }`}
        >
            <div className="flex flex-col gap-4 py-6 px-2 w-27 shrink-0 border-r border-border">
                <Link href="/" className="flex">
                    <Image
                        className="rounded-2xl object-contain"
                        src="/assets/logo.png"
                        alt="Logo"
                        width={86}
                        height={79}
                        loading="eager"
                    />
                </Link>
                <nav className="flex flex-col gap-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive  = activeItem === item.id;
                        const baseClass = 'flex flex-col items-center justify-center rounded-2xl w-[92px] h-20 transition-all duration-200';
                        const style = {
                            backgroundColor: isActive ? 'var(--menu-selected)' : 'transparent',
                            color: isActive ? 'var(--text-menu-selected)' : 'var(--text-menu-default)',
                        };
                        const hoverOn  = e => { if (!isActive) { e.currentTarget.style.backgroundColor = 'var(--menu-hover)'; e.currentTarget.style.color = 'var(--text-menu-hover)'; } };
                        const hoverOff = e => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-menu-default)'; } };
                        const content = (
                            <>
                                <Icon name={isActive ? item.iconActive : item.icon} size={32} color="currentColor" />
                                <span className={`text-menu-collapsed-size ${isActive ? 'font-medium' : 'font-normal'}`}>
                                    {item.label}
                                </span>
                            </>
                        );
                        return item.submenu ? (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item)}
                                className={`${baseClass} border-none cursor-pointer`}
                                style={style}
                                onMouseEnter={hoverOn}
                                onMouseLeave={hoverOff}
                            >
                                {content}
                            </button>
                        ) : (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => handleNavClick(item)}
                                className={baseClass}
                                style={style}
                                onMouseEnter={hoverOn}
                                onMouseLeave={hoverOff}
                            >
                                {content}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            {isExpanded && expandedNav?.submenu && (
                <div
                    className={`flex flex-col gap-2 h-full overflow-y-auto transition-all duration-300 ${
                        isSubmenuCollapsed ? 'py-6 px-2 w-17' : 'py-6 px-3 flex-1'
                    }`}
                >
                    <div className="flex items-center justify-between gap-2">
                        {!isSubmenuCollapsed && (
                            <span className="text-menu-size leading-7.5 font-bold text-primary">Next Health</span>
                        )}
                        <button
                            onClick={() => setIsSubmenuCollapsed((v) => !v)}
                            className={`
                                flex items-center justify-center cursor-pointer text-primary border-none bg-transparent p-1 rounded-md transition-colors
                                ${isSubmenuCollapsed ? 'w-full h-12' : 'w-auto h-auto'}
                            `}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--menu-hover)'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                            aria-label={isSubmenuCollapsed ? 'Expand submenu' : 'Collapse submenu'}
                        >
                            <Icon name="sidebar-collapse" size={24} color="currentColor" fill="currentColor" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-2">
                        {expandedNav.submenu.map((sub) => {
                            const isSubActive = activeSubItem === sub.href;
                            return (
                                <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => setActiveSubItem(sub.href)}
                                    className={`flex items-center rounded-lg transition-all duration-200 no-underline ${
                                        isSubmenuCollapsed ? 'justify-center px-2 py-3' : 'gap-2 px-2 py-3'
                                    }`}
                                    style={{
                                        backgroundColor: isSubActive
                                            ? 'color-mix(in srgb, var(--brand-color) 10%, transparent)'
                                            : 'transparent',
                                        color: isSubActive
                                            ? 'var(--text-menu-selected)'
                                            : 'var(--text-menu-default)',
                                    }}
                                    onMouseEnter={e => {
                                        if (!isSubActive) {
                                            e.currentTarget.style.backgroundColor = 'var(--menu-hover)';
                                            e.currentTarget.style.color = 'var(--text-menu-hover)';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!isSubActive) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = 'var(--text-menu-default)';
                                        }
                                    }}
                                >
                                    <Icon name={sub.icon} size={24} color="currentColor" />
                                    {!isSubmenuCollapsed && (
                                        <span className={`text-menu-size ${isSubActive ? 'font-semibold' : 'font-normal'}`}>
                                            {sub.label}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
