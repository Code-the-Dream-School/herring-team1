import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="bg-background">
      <div className="w-full h-1 bg-light_purple" />
      <div className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-center p-3 mb-8 text-3xl sm:text-4xl lg:text-5xl font-semibold">Privacy Policy</h1>
          <div className="w-20 h-1 bg-light_purple mx-auto mb-8" />
        </div>
        <div className="text-sm sm:text-base lg:text-lg space-y-3">
          <p>
            At CareConnect, we value your privacy and are committed to protecting your personal information. This
            Privacy Policy outlines what information we may collect, why we collect it, and how you can update, manage,
            export and delete your information.
          </p>

          <h2 className="font-bold text-gray-800 sm:text-sm md:text-lg lg:text-2xl pt-3">Information We Collect</h2>
          <ul className="list-disc pl-6">
            <li>Personal information you provide during registration or usage.</li>
            <li>Information you provide via fillable forms or text boxes.</li>
            <li>Data related to your usage of the CareConnect app.</li>
            <li>Feedback, support queries, and other interactions.</li>
          </ul>

          <h2 className="font-bold text-gray-800 sm:text-sm md:text-lg lg:text-2xl pt-3">
            How We Use Your Information
          </h2>
          <p>
            We use the collected data to improve our services, provide support, ensure security, and communicate with
            you effectively.
          </p>

          <h2 className="font-bold text-gray-800 sm:text-sm md:text-lg lg:text-2xl pt-3">Sharing Your Information</h2>
          <p>
            We do not sell or share your personal information with third parties, except as required by law or with your
            explicit consent. You can set your browser to refuse all or some browser cookies, or to alert you when
            cookies are being sent. If you disable or refuse cookies, please note that some parts of this site may not
            be able to perform services or tasks that necessitate cookies.
          </p>

          <h2 className="font-bold text-gray-800 sm:text-sm md:text-lg lg:text-2xl pt-3">Your Privacy Choices</h2>
          <p>
            You have the right to access, update, or delete your personal information. Please contact our support team
            for assistance.
          </p>

          <h2 className="font-bold text-gray-800 sm:text-sm md:text-lg lg:text-2xl pt-3">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@careconnect.com">support@careconnect.com</a>.
          </p>
        </div>
        <div className="text-center mt-8 mb-16">
          <Link to="/">
            <button
              className=" bg-orangeButton text-gray-800 font-bold rounded-lg transition hover:bg-gray-400
            w-full sm:w-[150px] md:w-[250px] lg:w-[300px]
            h-10 sm:h-10 md:h-14 lg:h-16
            text-sm sm:text-md md:text-lg"
            >
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
