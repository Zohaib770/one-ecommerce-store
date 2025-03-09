import textContent from "../../locales/en";

const TermsOfService = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        {textContent.footer_terms_of_service}
      </h1>
      <div className="mb-8">
        <p className="text-gray-600 mb-2 font-semibold">
          {textContent.terms_of_service_effective_date}
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.terms_of_service_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.terms_of_service_acceptance_of_terms_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.terms_of_service_acceptance_of_terms_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.terms_of_service_use_of_the_site_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.terms_of_service_use_of_the_site_description}
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed">
          {textContent.terms_of_service_use_of_the_site_list.map(
            (item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.terms_of_service_account_registration_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.terms_of_service_account_registration_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.terms_of_service_product_information_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.terms_of_service_product_information_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.terms_of_service_disclaimer_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.terms_of_service_disclaimer_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.terms_of_service_limitation_of_liability_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.terms_of_service_limitation_of_liability_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.terms_of_service_governing_law_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.terms_of_service_governing_law_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.terms_of_service_changes_to_terms_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.terms_of_service_changes_to_terms_description}
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.terms_of_service_contact_us_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.terms_of_service_contact_us_description}
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;