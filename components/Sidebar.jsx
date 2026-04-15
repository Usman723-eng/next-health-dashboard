"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/icons';

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
            { label: 'Nutrition + Metabolic', href: '/biomarkers/nutrition' },
            { label: 'Movement + Exercise', href: '/biomarkers/movement' },
            { label: 'Sleep + Recovery', href: '/biomarkers/sleep' },
            { label: 'Detoxification', href: '/biomarkers/detox' },
            { label: 'Emotional Health + Stress', href: '/biomarkers/emotional' },
            { label: 'Gut Health', href: '/biomarkers/gut' },
            { label: 'Hormone Health', href: '/biomarkers/hormones' },
            { label: 'Brain Health', href: '/biomarkers/brain' },
            { label: 'Heart Health', href: '/biomarkers/heart' },
            { label: 'Immune Health', href: '/biomarkers/immune' },
            { label: 'Regenerative Medicine', href: '/biomarkers/regenerative' },
            { label: 'Longevity', href: '/biomarkers/longevity' },
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
        id: 'devices',
        label: 'Devices',
        href: '/devices',
        icon: 'device-gray',
        iconActive: 'device-primary',
    },
];

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('home');
    const [expandedItem, setExpandedItem] = useState(null);

    const isExpanded = expandedItem !== null;

    const handleNavClick = (item) => {
        setActiveItem(item.id);
        if (item.submenu) {
            setExpandedItem(expandedItem === item.id ? null : item.id);
        } else {
            setExpandedItem(null);
        }
    };
    return (
        <div 
            className={`
                flex bg-surface border-r border-border transition-all duration-300 
                ${isExpanded ? 'w-103' : 'w-27'}
            `}
        >
            <div className='flex flex-col gap-4 py-6 px-2 w-full max-w-27'>
                <Link href="/" className='flex'>
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
                        const isActive = activeItem === item.id;
                        const commonProps = {
                            className: `
                                flex flex-col items-center justify-center rounded-2xl w-[92px] h-20 transition-all duration-200 hover:bg-menu-hover hover:text-text-menu-hover 
                                ${isActive ? 'bg-menu-selected! text-text-menu-selected!' : 'text-text-menu-default! bg-ransparent!'}
                            `,
                            onMouseEnter: e => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'var(--menu-hover)';
                                    e.currentTarget.style.color = 'var(--text-menu-hover)';
                                }
                            },
                            onMouseLeave: e => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-menu-default)';
                                }
                            },
                        };

                        const content = (
                            <>
                                <Icon name={isActive ? item.iconActive : item.icon} size={32} />
                                <span className={`text-menu-collapsed-size ${isActive ? "font-medium" : "font-normal"}`}>
                                    {item.label}
                                </span>
                            </>
                        );

                        return item.submenu ? (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item)}
                                {...commonProps}
                                className={`${commonProps.className} border-none cursor-pointer`}
                            >
                                {content}
                            </button>
                        ) : (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => handleNavClick(item)}
                                {...commonProps}
                            >
                                {content}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            {isExpanded && (
                <div
                    className="flex flex-col py-6 px-3 h-full overflow-y-auto flex-1 transition-all duration-300"
                    style={{
                        backgroundColor: 'var(--surface)',
                        borderRight: '1px solid var(--border)',
                    }}
                >
                    <div className="flex items-center justify-between mb-4 px-2">
                        <span
                            className="text-fs-menu text-primary font-semibold"
                        >
                            Next Health
                        </span>
                        <button
                            onClick={() => setExpandedItem(null)}
                            className="cursor-pointer border-none bg-transparent p-1 rounded-lg"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Submenu items */}
                    <nav className="flex flex-col gap-1">
                        {NAV_ITEMS.find(i => i.id === expandedItem)?.submenu?.map((sub, idx) => (
                            <Link
                                key={idx}
                                href={sub.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 no-underline"
                                style={{ color: 'var(--text-menu-default)', fontSize: 'var(--fs-menu)' }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = 'var(--menu-hover)';
                                    e.currentTarget.style.color = 'var(--text-menu-hover)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-menu-default)';
                                }}
                            >
                                {sub.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    )
}

export default Sidebar
