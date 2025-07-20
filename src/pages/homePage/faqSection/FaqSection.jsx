import { Disclosure } from "@headlessui/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

const FaqSection = ({ faqs }) => {
   const [showAll,setShowAll]=useState(false)
   const displayedFaqs=showAll?faqs:faqs.slice(0,5)
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>

        <div className="space-y-4">
          {displayedFaqs?.map((faq, index) => (
            <Disclosure key={faq._id || index}>
              {({ open }) => (
                <div
                  className={`rounded-xl border border-base-300  shadow-sm ${
                    open ? "dark:bg-gray-700" : "dark:bg-gray-800"
                  }`}
                >
                  <Disclosure.Button className="w-full flex justify-between items-center px-6 py-4 font-semibold text-left text-base-content">
                    <span>{faq.question}</span>
                    {open ? (
                      <ChevronUp className="text-primary" size={20} />
                    ) : (
                      <ChevronDown className="text-primary" size={20} />
                    )}
                  </Disclosure.Button>

                  <Disclosure.Panel className="px-6 pb-4 text-sm ">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
         {faqs.length > 8 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-outline btn-primary"
            >
              {showAll ? "See Less" : "See All Consern"}
            </button>
          </div>
        )}
    </section>
  );
};

export default FaqSection;
