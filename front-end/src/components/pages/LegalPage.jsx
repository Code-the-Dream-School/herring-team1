import { Link } from 'react-router-dom';

function LegalPage() {
  return (
    <div className="bg-background py-8">
      <div className="w-full h-1 bg-light_purple" />
      <div className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-center p-3 mb-8 text-3xl sm:text-4xl lg:text-5xl font-semibold">Legal Information</h1>
          <div className="w-20 h-1 bg-light_purple mx-auto mb-8" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-gray-800">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
            <p className="text-sm sm:text-base">
              By using the CareConnect app, you agree to comply with these Terms of Service. Please read carefully.
            </p>
            <ul className="list-disc ml-5 mt-4 text-sm sm:text-base">
              <li>Use the app only for educational purposes as intended.</li>
              <li>We reserve the right to modify or terminate services at any time.</li>
              <li>All content is proprietary and cannot be used without permission.</li>
              <li>You are responsible for all activities under your account.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
            <p className="text-sm sm:text-base">
              As a user, you must agree to the following responsibilities while using the CareConnect app:
            </p>
            <ul className="list-disc ml-5 mt-4 text-sm sm:text-base">
              <li>Ensure all personal information provided is accurate and up-to-date.</li>
              <li>Do not use the app for illegal or harmful activities.</li>
              <li>Respect other users and their contributions within the app.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Disclaimers</h2>
            <p className="text-sm sm:text-base">
              CareConnect makes no warranty regarding the app’s functionality or the accuracy of the information
              provided.
            </p>
            <ul className="list-disc ml-5 mt-4 text-sm sm:text-base">
              <li>The app is provided &quot;as-is&quot; with no guarantee of uptime or accuracy.</li>
              <li>We are not responsible for any damages resulting from the use of the app.</li>
              <li>CareConnect is not liable for third-party content or external links.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            <p className="text-sm sm:text-base">
              All intellectual property rights in the app and its content are owned by CareConnect Team.
            </p>
            <ul className="list-disc ml-5 mt-4 text-sm sm:text-base">
              <li>Do not reproduce, distribute, or modify the app content without permission.</li>
              <li>Content from the app is for personal educational use only.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p className="text-sm sm:text-base">
              CareConnect is not liable for any loss or damage, direct or indirect, arising from your use of the app.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm sm:text-base">For any questions about these terms, please contact us at:</p>
            <ul className="list-none ml-0 mt-4 text-sm sm:text-base">
              <li>Email: support@careconnect.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Mail: 123 CareConnect Lane, CareConnect, NY</li>
            </ul>
          </section>

          <section className="mb-8">
            <p className="text-sm sm:text-base">
              For more information, please review our{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="text-center mt-10 mb-2">
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
}

export default LegalPage;
