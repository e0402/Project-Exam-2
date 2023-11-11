export const Input = ({ register, name, label, error, ...rest }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input id={name} {...register(name)} className="mt-1 block w-full border-2 border-gray-300 p-2 rounded-md shadow-sm" {...rest} />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
  