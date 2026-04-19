import Image from 'next/image';
import React from 'react'

const MetricsCard = ({ label, value, variant = 'green' }) => {
    const variants = {
        green: {
            bg: 'linear-gradient(132.37deg, #089874 13.06%, #02795A 85.06%)',
            valueColor: '#3DECBD',
            labelColor: '#3DECBD',
            pattern: '/assets/metrics-bg-shape1.png',
        },
        orange: {
            bg: 'linear-gradient(139.92deg, #F29831 21.22%, #D97706 77.15%)',
            valueColor: '#FFE194',
            labelColor: '#FFE194',
            pattern: '/assets/metrics-bg-shape2.png',
        },
    };

    const v = variants[variant] || variants.green;
    return (
        <div
            className="relative flex flex-col items-center justify-center rounded-3xl py-1.5 px-2 h-full overflow-hidden"
            style={{ background: v.bg }}
        >
            <Image
                className='object-cover'
                src={v.pattern}
                alt='pattern'
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading='eager'
            />
            <div className="flex flex-col items-center">
                <span
                    className="font-bold leading-[100%]"
                    style={{ fontSize: 'var(--fs-hero-metric)', color: v.valueColor }}
                >
                    {value}
                </span>
                <span
                    className="font-medium leading-[100%]"
                    style={{ fontSize: 'var(--fs-hero-subtext)', color: v.labelColor }}
                >
                    {label}
                </span>
            </div>
        </div>
    )
}

export default MetricsCard
