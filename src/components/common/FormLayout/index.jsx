export const FormLayout = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-4">
      {children}
    </form>
  );
  