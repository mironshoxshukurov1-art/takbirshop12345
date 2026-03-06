import { useState } from "react";
import { FiCheckCircle, FiMail, FiArrowUpRight, FiChevronRight } from "react-icons/fi";
import { TbArrowBack } from "react-icons/tb";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";

function FloatingInput({ label, type = "text", name, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div
      className={`relative border rounded-xl px-3 pt-5 pb-2 transition-all duration-200 ${
        focused ? "border-gray-800 shadow-sm" : "border-gray-200"
      }`}
    >
      <label
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          active
            ? "top-1.5 text-xs text-gray-400"
            : "top-3.5 text-sm text-gray-400"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full text-sm text-gray-800 outline-none bg-transparent"
      />
    </div>
  );
}

function FloatingTextarea({ label, name, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div
      className={`relative border rounded-xl px-3 pt-5 pb-2 transition-all duration-200 ${
        focused ? "border-gray-800 shadow-sm" : "border-gray-200"
      }`}
    >
      <label
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          active
            ? "top-1.5 text-xs text-gray-400"
            : "top-3.5 text-sm text-gray-400"
        }`}
      >
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className="w-full text-sm text-gray-800 outline-none bg-transparent resize-none mt-1"
      />
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const isValid = form.firstName && form.lastName && form.email && form.message;

  return (
    <div className="min-h-screen bg-[#080807]  bg-white   dark:bg-gray-900 dark:text-white  bg-[#080807]  bg-gradient-to-br flex items-center justify-center p-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <Navbar />
        <div className="flex flex-col gap-8">
          <div>
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
              <Link to={'/'}>
                <span className="hover:text-gray-600 cursor-pointer">Home</span>
              </Link>
              <FiChevronRight size={12} />
              <span className="text-gray-700 font-medium">My Profile</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-[white] leading-tight mb-4">
              How can We Help?
            </h1>
            <p className="text-gray-500  dark:text-[white] text-base leading-relaxed">
              Get in touch with our sales and support teams for demos,
              onboarding support, or product questions.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {[
              "Request a demo",
              "Learn which plan is right for your team",
              "Get onboarding help",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-gray-700 text-sm font-medium"
              >
                <FiCheckCircle className="text-gray-400 shrink-0" size={18} />
                {item}
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                General communication
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">
                For other queries, please get in touch with us via email.
              </p>
              <a
                href="mailto:hello@codivoo.com"
                className="flex items-center gap-2 text-gray-600 text-xs hover:text-gray-900 transition-colors"
              >
                <FiMail size={13} />
                <span>hello@codivoo.com</span>
              </a>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                Documentation
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">
                Get an overview of our features, integrations, and how to use
                them.
              </p>
              <button className="flex items-center gap-1 text-gray-700 text-xs font-medium hover:text-gray-900 transition-colors group">
                See Docs{" "}
                <FiArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Contact our sales team
          </h2>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                <FiCheckCircle size={28} className="text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Message sent!
              </h3>
              <p className="text-sm text-gray-500 max-w-xs">
                Thanks for reaching out. Our team will get back to you within 24
                hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    website: "",
                    message: "",
                  });
                }}
                className="mt-2 text-sm text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <FloatingInput
                  label="First name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Last name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <FloatingInput
                label="Email address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <FloatingInput
                label="Phone number"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
              <FloatingInput
                label="Company website"
                name="website"
                value={form.website}
                onChange={handleChange}
              />
              <FloatingTextarea
                label="Your message"
                name="message"
                value={form.message}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full text-sm font-medium py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                  isValid && !loading
                    ? "bg-gray-900 hover:bg-gray-700 text-white cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
