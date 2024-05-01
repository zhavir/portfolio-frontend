'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sendContactMeEmail } from '../lib/client.js';
import { motion, useAnimationControls } from 'framer-motion';

const EmailSection = () => {
  const formRef = useRef(null);
  const controls = useAnimationControls();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendContactMeEmail(
      e.target.email.value,
      e.target.subject.value,
      e.target.message.value,
    ).then((response) => {
      if (response.status === 201) {
        formRef.current.reset();
      }
    });
  };
  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-12 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-600 to-transparent rounded-full h-2/3 w-6/12 z-0 blur-3xl absolute top-1/3 -left-4 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="z-0">
        <h5 className="text-xl font-bold text-primaryText my-2">
          {`Let's Connect`}
        </h5>
        <p className="text-secondaryText mb-4 max-w-md">
          {`Reach me out if you're interested!`}
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/zhavir" target="_blank">
            <Image
              src="/static/images/github.svg"
              width={80}
              height={80}
              alt="Github Icon"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/andrea-aramini/"
            target="_blank"
          >
            <Image
              src="/static/images/linkedin.svg"
              width={80}
              height={80}
              alt="Linkedin Icon"
            />
          </Link>
        </div>
      </div>
      <div>
        <form ref={formRef} className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-primaryText block mb-2 text-sm font-medium"
            >
              Your email
            </label>
            <input
              name="email"
              type="text"
              id="email"
              required
              className="bg-secondaryBackgroud border border-primaryBorder placeholder-primaryPlaceholder text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="lorem@ipsum.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="text-primaryText block mb-2 text-sm font-medium"
            >
              Subject
            </label>
            <input
              name="subject"
              type="text"
              id="subject"
              required
              className="bg-secondaryBackgroud border border-primaryBorder placeholder-primaryPlaceholder text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Just saying hi"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="text-primaryText block mb-2 text-sm font-medium"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows="10"
              className="bg-secondaryBackgroud border border-primaryBorder placeholder-primaryPlaceholder text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Leave your message here..."
            />
          </div>
          <button
            type="submit"
            className="rounded hover:bg-primary-400 bg-primary-600 text-primaryText w-full py-2.5 flex justify-center"
            onClick={() => {
              controls.set({ opacity: 0, scale: 1 });
              controls.start({
                opacity: 1,
                scale: 1,
                transition: {
                  repeat: 1,
                  repeatType: 'reverse',
                  duration: 2,
                },
              });
            }}
          >
            Send Message
          </button>
          <motion.p
            className="text-primary-500 text-sm mt-2 block"
            initial={{ opacity: 0, scale: 1 }}
            animate={controls}
          >
            Email sent succesfully!
          </motion.p>
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
