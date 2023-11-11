export const FormLayout = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto p-4">
      {children}
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
  