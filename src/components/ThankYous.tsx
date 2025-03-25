interface ThankYouNoteProps {
  message: string;
  author: string;
  date: Date;
}

const SAMPLE_THANK_YOUS: ThankYouNoteProps[] = [
  {
    message:
      "Lorem ipsum dolor sit amet consectetur. Pharetra fringilla a quis elit auctor dolor varius. Urna facilisis hac ac dui. Orci senectus eget amet vel nulla in quis. Nulla semper mattis interdum ipsum dui. Nam pretium dictum aliquam ultricies amet tellus dolor. Posuere elit congue vel sollicitudin dui aliquam mi molestie. Et enim in dignissim est. Sed nulla imperdiet sit eu rutrum quam in",
    author: "Spencer and Elan",
    date: new Date("2025-05-20"),
  },
];

function ThankYouNote({ message, author, date }: ThankYouNoteProps) {
  return (
    <div className="flex flex-col gap-6 border-t border-white/20 pt-4">
      <p className="font-mono text-white whitespace-pre-wrap">{message}</p>
      <div className="flex flex-row items-center gap-4 font-mono ">
        <span>{author}</span>
        <span className="text-white/70">
          {date
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            .toUpperCase()}
        </span>
      </div>
    </div>
  );
}

export function ThankYous() {
  return (
    <div className="flex flex-col gap-8">
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
        <button className="bg-yellow-100 text-black px-4 py-2 w-full">
          Submit
        </button>
      </div>
      <div className="flex flex-col gap-8 mt-8">
        {SAMPLE_THANK_YOUS.map((note, index) => (
          <ThankYouNote key={index} {...note} />
        ))}
      </div>
    </div>
  );
}
