'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sendContactMeEmail } from '../lib/client.js';
import { motion, useAnimationControls } from 'framer-motion';

const EmailSection = () => {
  const [messageSent, setMessageSent] = useState(null);
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({
    email: '',
  });
  const formRef = useRef(null);
  const controls = useAnimationControls();
  const [isValidForm, setIsValidForm] = useState(false);

  const validateForm = () => {
    let tmp = {};
    let anyError = false;
    if (!/\S+@\S+\.\S+/.test(email)) {
      tmp.email = 'Email is invalid.';
      anyError = true;
    } else {
      tmp.email = '';
    }
    if (!subject || !message || !email) {
      anyError = true;
    }
    setErrors(tmp);
    setIsValidForm(!anyError);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendContactMeEmail(
      e.target.email.value,
      e.target.subject.value,
      e.target.message.value,
    )
      .then((_) => {
        setMessageSent(false);
        formRef.current.reset();
        setEmail(null);
        setSubject(null);
        setMessage(null);
        setIsValidForm(false);
      })
      .catch((err) => {
        setMessageSent(true);
        console.log(err);
      });
  };
  useEffect(() => {
    if (email !== null || subject !== null || message !== null) {
      validateForm();
    }
    if (messageSent !== null && !messageSent) {
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
      setMessageSent(null);
    }
  }, [messageSent, email, subject, message]);
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
            {errors.email && (
              <p className="text-red-500 text-sm mb-2 block">{errors.email}</p>
            )}
            <input
              name="email"
              type="text"
              id="email"
              required
              className="bg-secondaryBackgroud border border-primaryBorder placeholder-primaryPlaceholder text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="lorem@ipsum.com"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setSubject(e.target.value)}
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
              rows={10}
              className="bg-secondaryBackgroud border border-primaryBorder placeholder-primaryPlaceholder text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Leave your message here..."
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`rounded ${isValidForm ? 'hover:bg-primary-400' : ''} bg-primary-600 text-primaryText w-full py-2.5 flex justify-center`}
            disabled={!isValidForm}
          >
            Send Message
          </button>
          {messageSent ? (
            <p className="text-red-500 text-sm mt-2 block">
              ❌ Message not set, sorry!
            </p>
          ) : (
            <motion.p
              className="text-primary-500 text-sm mt-2 block"
              initial={{ opacity: 0, scale: 1 }}
              animate={controls}
            >
              ✅ Email sent succesfully!
            </motion.p>
          )}
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
