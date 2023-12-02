export const Input = ({ register, name, label, error, ...rest }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      id={name}
      {...register(name)}
      className={`mt-1 block w-full p-2 rounded-md shadow-sm ${error ? 'border-2 border-red-500' : 'border-2 border-gray-300'}`}
      {...rest}
    />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);
