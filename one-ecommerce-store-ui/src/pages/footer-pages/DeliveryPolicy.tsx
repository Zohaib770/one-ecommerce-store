import textContent from "../../locales/en";

const DeliveryPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        {textContent.footer_delivery_policy}
      </h1>
      <div className="mb-8">
        <p className="text-gray-600 mb-2 font-semibold">
          {textContent.delivery_policy_effective_date}
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.delivery_policy_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.delivery_policy_shipping_methods_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.delivery_policy_shipping_methods_description}
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed">
          {textContent.delivery_policy_shipping_methods_list.map(
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
          {textContent.delivery_policy_shipping_costs_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.delivery_policy_shipping_costs_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.delivery_policy_delivery_times_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.delivery_policy_delivery_times_description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.delivery_policy_order_tracking_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.delivery_policy_order_tracking_description}
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {textContent.delivery_policy_delivery_issues_title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {textContent.delivery_policy_delivery_issues_description}
        </p>
      </div>
    </div>
  );
};

export default DeliveryPolicy;