import textContent from '../../locales/en';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        {textContent.footer_privacy_policy}
      </h1>
      <div className="mb-8">
        <p className="text-gray-600 mb-2 font-semibold">
          {textContent.privacy_policy_effective_date}
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.privacy_policy_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.privacy_policy_information_we_collect_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.privacy_policy_information_we_collect_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.privacy_policy_how_we_use_your_information_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {textContent.privacy_policy_how_we_use_your_information_description}
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed">
          {textContent.privacy_policy_how_we_use_your_information_list.map(
            (item, index) => (
              <li key={index} className="mb-2">{item}</li>
            )
          )}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.privacy_policy_sharing_your_information_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {textContent.privacy_policy_sharing_your_information_description}
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed">
          {textContent.privacy_policy_sharing_your_information_list.map(
            (item, index) => (
              <li key={index} className="mb-2">{item}</li>
            )
          )}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.privacy_policy_your_rights_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {textContent.privacy_policy_your_rights_description}
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed">
          {textContent.privacy_policy_your_rights_list.map((item, index) => (
            <li key={index} className="mb-2">{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.privacy_policy_contact_us_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.privacy_policy_contact_us_description}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;