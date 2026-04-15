"use-clients";

import React from 'react'
import Image from 'next/image';

const ProfileCard = ({ name, age, avatarSrc }) => {
    return (
        <div
            className="flex items-center gap-4 bg-surface rounded-3xl p-6 h-full border border-border2"
        >
            <div className="flex shrink-0">
                <Image
                    className="rounded-full object-cover"
                    src={avatarSrc || '/assets/profile-image.png'}
                    alt={name}
                    width={96}
                    height={96}
                    loading="eager"
                />
            </div>
            <div className="flex flex-col gap-2">
                <h2
                    className="text-header-size font-semibold text-primary leading-7.5"
                >
                    {name}
                </h2>
                <p
                    className="text-[18px] leading-7.5 font-semibold text-primary"
                >
                    Age: {age}
                </p>
            </div>
        </div>
    )
}

export default ProfileCard
