'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    /*
    const endpoint = '';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const resData = await response.json();
    console.log(resData);
    if (response.status === 200) {
    */
    console.log(`Message sent ${JSONdata}`);
    setEmailSubmitted(true);
    //}
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
        <form className="flex flex-col" onSubmit={handleSubmit}>
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
          >
            Send Message
          </button>
          {emailSubmitted && (
            <p className="text-primary-500 text-sm mt-2 block">
              Email sent succesfully!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
