export function Loader() {
  return (
    <div className="loader-wrap">
      <div className="loader-spinner" />
    </div>
  );
}

export function ErrorMsg({ message }) {
  return (
    <div className="error-msg">
      <span>⚠️ {message || "Xatolik yuz berdi"}</span>
    </div>
  );
}
