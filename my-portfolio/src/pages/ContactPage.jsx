import { useEffect } from 'react';
import Contact from '../components/Contact/Contact'

const ContactPage = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])
  return (
    <section>
      <div className="bg-gray-800 flex justify-center items-center h-[50vh] lg:h-[70vh] md:h-[70vh] sm:h-[70vh]">
        <h1 className="text-white text-4xl font-bold">#contact me</h1>
      </div>
      <div className="w-[100%] h-[400px]">
        <div className="w-[100%] h-[100%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7405649263!2d139.7431840749225!3d35.6587630312093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bbd9009ec09%3A0x1fe4f7d846e657e2!2sTOKYO%20TOWER%20%E2%80%9CCHO-TEN%E2%80%9D%20HIGHBALL%20GARDEN!5e0!3m2!1sen!2sjp!4v1713864982183!5m2!1sen!2sjp"
            height="450"
            style={{ border: 0, width: '100%' }}
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div>
        <Contact />
      </div>
    </section>
  )
}

export default ContactPage
