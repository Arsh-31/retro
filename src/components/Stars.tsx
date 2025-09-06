export default function Stars() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: `${Math.random() * 2}px`,
            height: `${Math.random() * 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random(),
          }}
        ></div>
      ))}
    </div>
  );
}
