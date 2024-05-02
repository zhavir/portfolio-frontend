'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { generateCurriculum } from '../lib/client';

const HeroSection = () => {
  const [hasCvDownloaded, setHasCvDownloaded] = useState(false);
  const [downloadLink, setDownloadLink] = useState();
  const initialized = useRef(false);

  useEffect(() => {
    const getDownloadLink = async () => {
      await generateCurriculum()
        .then((response) => {
          if (response) {
            setDownloadLink(response.data.download_link);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (!initialized.current) {
      initialized.current = true;
      getDownloadLink();
    }
  });

  return (
    <section className="lg:py-16" id="hero">
      <div className="grid grid-cols-1 sm:grid-cols-12 w-full">
        <div className="col-span-8 place-self-center text-center sm:text-left justify-self-start">
          <h1 className="text-primaryText mb-4 text-4xl sm:text-5xl lg:text-6xl lg:leading-normal font-extrabold h-32 sm:h-auto">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-400 ">
              {`Hello I'm`}{' '}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                'Andrea',
                1000,
                'Softwere Engineer',
                1000,
                'DevOps Engineer',
                1000,
                'Backend Developer',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-secondaryText text-base sm:text-lg mb-6 lg:text-xl mr-0 sm:mr-10">
            {`I'm a Software Engineer with more than 10 years of experience`}
          </p>
          <div>
            <Link
              href="#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-600 to-secondary-400 hover:from-primary-600 hover:to-secondary-200 text-primaryText"
            >
              Contact Me
            </Link>
            {downloadLink ? (
              <Link
                className={`px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-600 to-secondary-400 hover:bg-slate-800 text-primaryText mt-3 ${hasCvDownloaded ? 'pointer-events-none' : ''}`}
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                locale={false}
                download
                onClick={() => setHasCvDownloaded(true)}
              >
                <span className="block bg-secondaryBackgroud hover:bg-slate-800 rounded-full px-5 py-2">
                  Download CV
                </span>
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="col-span-4 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/static/images/hero-image.jpeg"
              alt="hero image"
              className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
