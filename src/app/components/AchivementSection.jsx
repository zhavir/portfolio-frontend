'use client';
import React from 'react';
import { achivementsList } from '../lib/constants';
import dynamic from 'next/dynamic';

const AnimatedNumbers = dynamic(() => import('react-animated-numbers'), {
  ssr: false,
});

function AchivementSection() {
  return (
    <section id="achivement">
      <div className="w-full container pt-4 md:pt-0">
        <div className="border-primaryBorder border rouded-md py-8 px-16 pb-0 sm:pb-4 pt-4 flex md:flex-row flex-col items-center justify-between">
          {achivementsList.map((achivement, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center mx-4 pb-4 md:pb-0"
              >
                <h2 className="text-primaryText text-4xl font-bold flex flex-row">
                  {achivement.prefix}
                  <AnimatedNumbers
                    includeComma
                    animateToNumber={parseInt(achivement.value)}
                    transitions={(index) => ({
                      type: 'spring',
                      duration: index + 5,
                    })}
                  />
                  {achivement.suffix}
                </h2>
                <p className="text-secondaryText text-base">
                  {achivement.metric}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AchivementSection;
