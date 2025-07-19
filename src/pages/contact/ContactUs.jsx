import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm();
const axiosInstance=useAxiosInstance()

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/contact-messages", data);
      if (response.data.insertedId) {
        toast.success("Message sent successfully!");
        reset();
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="px-4 md:px-16 py-10 max-w-screen-xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6 dark:text-primary">
        Contact Us
      </h2>
      <p className="text-center mb-10 text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
        Have questions, suggestions, or feedback? Reach out to the WorkSync team. We’d love to hear from you!
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Our Office</h3>
          <p className="mb-2 dark:text-gray-300">📍 Address: Sector 1, Gazipur, Dhaka, Bangladesh</p>
          <p className="mb-2 dark:text-gray-300">📞 Phone: +8801715994657</p>
          <p className="mb-4 dark:text-gray-300">✉️ Email: infosponsor2@gmail.com</p>
          <iframe
            title="company-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.0724395465846!2d90.39838371499067!3d23.92114738451371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e7dc1a3b7c03%3A0x9cf0d63bbfd507cf!2sGazipur!5e0!3m2!1sen!2sbd!4v1660928947923!5m2!1sen!2sbd"
            className="w-full h-64 rounded-lg border dark:border-gray-700"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Send a Message</h3>

          <div className="mb-4">
            <label className="block mb-1 dark:text-gray-200">Your Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-3 py-2"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 dark:text-gray-200">Your Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-3 py-2"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 dark:text-gray-200">Your Message</label>
            <textarea
              {...register("message", { required: true })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-3 py-2 h-32"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
