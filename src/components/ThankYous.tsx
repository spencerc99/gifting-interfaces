export function ThankYous() {
  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="font-bold text-8xl">Thank you notes</h1>
      <hr />
      <textarea
        className="w-full h-full border border-white p-2 min-h-44 bg-transparent"
        placeholder="Thank you for..."
      />
      <div className="flex flex-row gap-4 w-full">
        <input
          type="text"
          placeholder="From"
          className="bg-transparent border border-white px-4 py-2 w-full"
        />
        <button className="bg-yellow-100 text-black px-4 py-2 w-full ">
          Submit
        </button>
      </div>
    </div>
  );
}
