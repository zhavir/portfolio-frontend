'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Noise } from 'noisejs';
import AWSIcon from '../../../public/logos/aws.svg';
import DockerIcon from '../../../public/logos/docker.svg';
import JavascriptIcon from '../../../public/logos/javascript.svg';
import MongodbIcon from '../../../public/logos/mongodb.svg';
import PostgresIcon from '../../../public/logos/postgres.svg';
import PythonIcon from '../../../public/logos/python.svg';
import TypescriptIcon from '../../../public/logos/typescript.svg';
import RedisIcon from '../../../public/logos/redis.svg';
import KubernetesIcon from '../../../public/logos/kubernetes.svg';
import DjangoIcon from '../../../public/logos/django.svg';
import GitIcon from '../../../public/logos/git.svg';
import JenkinsIcon from '../../../public/logos/jenkins.svg';
import ScrumIcon from '../../../public/logos/scrum.svg';
import KafkaIcon from '../../../public/logos/kafka.svg';
import SparkIcon from '../../../public/logos/spark.svg';
import HTMLIcon from '../../../public/logos/html.svg';
import DevOpsIcon from '../../../public/logos/devops.svg';
import GraphQLIcon from '../../../public/logos/graphql.svg';
import NextJSIcon from '../../../public/logos/nextjs.svg';
import Bouble from './Bouble';
import { randomNoRepeats } from '../lib/utilis';

const noise = new Noise();
const NOISE_AMOUNT = 5;
// The frequency. Smaller for flat slopes, higher for jagged spikes.
const NOISE_SPEED = 0.004;
// Pixels to move per frame. At 60fps, this would be 18px a sec.
const SCROLL_SPEED = 1.5;
const CANVAS_WIDTH = 2800;

const bubbles = [
  {
    s: 0.6,
    x: 1134,
    y: 45,
  },
  {
    s: 0.6,
    x: 1620,
    y: 271,
  },
  {
    s: 0.6,
    x: 1761,
    y: 372,
  },
  {
    s: 0.6,
    x: 2499,
    y: 79,
  },
  {
    s: 0.8,
    x: 2704,
    y: 334,
  },
  {
    s: 0.6,
    x: 2271,
    y: 356,
  },
  {
    s: 0.6,
    x: 795,
    y: 226,
  },
  {
    s: 0.6,
    x: 276,
    y: 256,
  },
  {
    s: 0.6,
    x: 1210,
    y: 365,
  },
  {
    s: 0.6,
    x: 444,
    y: 193,
  },
  {
    s: 0.6,
    x: 2545,
    y: 387,
  },
  {
    s: 0.8,
    x: 1303,
    y: 193,
  },
  {
    s: 0.8,
    x: 907,
    y: 88,
  },
  {
    s: 0.8,
    x: 633,
    y: 320,
  },
  {
    s: 0.8,
    x: 323,
    y: 60,
  },
  {
    s: 0.8,
    x: 129,
    y: 357,
  },
  {
    s: 0.8,
    x: 1440,
    y: 342,
  },
  {
    s: 0.8,
    x: 1929,
    y: 293,
  },
  {
    s: 0.8,
    x: 2135,
    y: 198,
  },
  {
    s: 0.8,
    x: 2276,
    y: 82,
  },
  {
    s: 0.8,
    x: 2654,
    y: 182,
  },
  {
    s: 0.8,
    x: 2783,
    y: 60,
  },
  {
    s: 1.0,
    x: 1519,
    y: 118,
  },
  {
    s: 1.0,
    x: 1071,
    y: 233,
  },
  {
    s: 1.0,
    x: 1773,
    y: 148,
  },
  {
    s: 1.0,
    x: 2098,
    y: 385,
  },
  {
    s: 1.0,
    x: 2423,
    y: 244,
  },
  {
    s: 1.0,
    x: 901,
    y: 385,
  },
  {
    s: 1.0,
    x: 624,
    y: 111,
  },
  {
    s: 1.0,
    x: 75,
    y: 103,
  },
  {
    s: 1.0,
    x: 413,
    y: 367,
  },
  {
    s: 1.0,
    x: 2895,
    y: 271,
  },
  {
    s: 1.0,
    x: 1990,
    y: 75,
  },
];
var backgroundImages = randomNoRepeats([
  AWSIcon,
  DockerIcon,
  JavascriptIcon,
  MongodbIcon,
  PostgresIcon,
  PythonIcon,
  TypescriptIcon,
  RedisIcon,
  KubernetesIcon,
  DjangoIcon,
  GitIcon,
  JenkinsIcon,
  ScrumIcon,
  KafkaIcon,
  SparkIcon,
  HTMLIcon,
  DevOpsIcon,
  GraphQLIcon,
  NextJSIcon,
]);

const SkillSection = () => {
  const animationRef = useRef();
  const bubblesRef = useRef(
    bubbles.map((bubble) => ({
      ...bubble,
      noiseSeedX: Math.floor(Math.random() * 64000),
      noiseSeedY: Math.floor(Math.random() * 64000),
      xWithNoise: bubble.x,
      yWithNoise: bubble.y,
    })),
  );

  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 200);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  });

  function animate() {
    bubblesRef.current = bubblesRef.current.map((bubble, index) => {
      const newNoiseSeedX = bubble.noiseSeedX + NOISE_SPEED;
      const newNoiseSeedY = bubble.noiseSeedY + NOISE_SPEED;

      const randomX = noise.simplex2(newNoiseSeedX, 0);
      const randomY = noise.simplex2(newNoiseSeedY, 0);

      const newX = bubble.x - SCROLL_SPEED;

      const newXWithNoise = newX + randomX * NOISE_AMOUNT;
      const newYWithNoise = bubble.y + randomY * NOISE_AMOUNT;

      const element = document.getElementById(`bubble-${index}`);

      if (element) {
        element.style.transform = `translate(${newXWithNoise}px, ${newYWithNoise}px) scale(${bubble.s})`;
      }

      return {
        ...bubble,
        noiseSeedX: newNoiseSeedX,
        noiseSeedY: newNoiseSeedY,
        x: newX < -200 ? CANVAS_WIDTH : newX,
        xWithNoise: newXWithNoise,
        yWithNoise: newYWithNoise,
      };
    });

    animationRef.current = requestAnimationFrame(animate);
  }

  return (
    <section id="skills">
      <div className="flex relative flex-col flex-nowrap w-auto justify-center h-full z-0">
        <div className="z-[1] w-40 h-[600px] absolute left-0 bg-gradient-to-l from-transparent to-primaryBackgrund"></div>
        <div className="z-[1] w-40 h-[600px] absolute right-0 bg-gradient-to-r from-transparent to-primaryBackgrund"></div>
        <div className="overflow-hidden relative h-[600px]">
          {bubbles.map((bubble, index) => (
            <Bouble
              image={backgroundImages()}
              index={index}
              key={`${bubble.x} ${bubble.y}`}
              x={bubble.x}
              y={bubble.y}
              scale={bubble.s}
              isReady={isReady}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
