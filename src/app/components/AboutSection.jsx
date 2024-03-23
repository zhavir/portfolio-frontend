'use client';
import React, { useTransition, useState } from 'react';
import Image from 'next/image';
import TabButton from './TabButton';
import { aboutSections } from '../lib/constants';

function AboutSection() {
  const [tab, setTab] = useState('skills');
  const [_, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };
  return (
    <section className="text-primaryText" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 mt-10 w-full mb-10">
        <div className="justify-center mt-20">
          <Image
            src="/static/images/code.webp"
            alt="code image"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded"
            priority={false}
          />
        </div>
        <div className="flex flex-col mt-10 h-full text-justify">
          <h2 className="text-4xl font-bold text-primaryText mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I am an experienced and specialized backend software engineer, with
            a proven track record of delivering high-quality and scalable
            solutions. My technical skills include proficiency in database
            design and management, API development, and server-side scripting. I
            enjoy solving problems and collaborating with cross-functional teams
            to identify and implement innovative solutions. I am a passionate
            learner and always seek opportunities to expand my skills and stay
            up-to-date on emerging trends in the industryI am an experienced and
            specialized backend software engineer, with a proven track record of
            delivering high-quality and scalable solutions. My technical skills
            include proficiency in database design and management, API
            development, and server-side scripting. I enjoy solving problems and
            collaborating with cross-functional teams to identify and implement
            innovative solutions. I am a passionate learner and always seek
            opportunities to expand my skills and stay up-to-date on emerging
            trends in the industry
          </p>
          <div className="flex flex-row mt-8">
            {aboutSections.map((section, index) => {
              return (
                <TabButton
                  selectTab={() => handleTabChange(section.id)}
                  active={tab === section.id}
                  key={index}
                >
                  {section.title}
                </TabButton>
              );
            })}
          </div>
          <div className="mt-4">
            {aboutSections.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
