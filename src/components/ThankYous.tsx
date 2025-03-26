interface ThankYouNoteProps {
  message: string | React.ReactNode;
  author: string;
  date: Date;
}

const SAMPLE_THANK_YOUS: ThankYouNoteProps[] = [
  {
    message: (
      <>
        <p>To the students of SFPC&#39;s Gift Interfaces:</p>
        <p>
          The very first day that we met, we shared stories of meaningful gifts
          we&#39;ve received. Elan told of the many summers that his mom spent
          weeks pre-cooking and individually wrapping a month&#39;s worth of
          kosher meals so that Elan could attend sleepaway music camp. Spencer
          spoke of a group living experience in which gifting was permanently in
          the air --- communal meals, skill shares, handwritten notes.
        </p>
        <p>
          We couldn&#39;t have known it at the time but it feels obvious now
          that in those very first 10 minutes we were already casting a powerful
          spell, manifesting the kind of learning that can only come from
          gathering, and the kind of gathering that can only come from learning,
          and that in so doing, this gift of gatherlearning would be reflected
          back to us tenfold.
        </p>
        <p>
          You attended to each other as strangers, in your strangenesses, and
          then unfolded the ones you thought you knew best, only to love them in
          their unknowability. You made instruments that{" "}
          <a href="https://drive.google.com/file/d/1Ymvf7oD7Jm00iDjT0xTgo102q1N_SYRJ/view?usp=sharing">
            measure the color of the
          </a>{" "}
          sky. You{" "}
          <a href="https://drive.google.com/file/d/1KHv20nib1UPx3hVDc5MJEq_Gg85ocoQa/view?usp=sharing">
            hid poems in flower petals
          </a>
          , wrote letters to trees. You{" "}
          <a href="https://www.are.na/ahmed-alawadhi/the-one-3xao2rxqlrs">
            saw as much of god
          </a>{" "}
          in mosquitos as in artichokes. You{" "}
          <a href="https://www.are.na/block/35221361">implored us</a> to imagine
          a large wide-mouth jar, wrapped extremely tightly with duct tape
          around the top so it won&#39;t leak, weighing about a pound, sour
          mango deliciousness.
        </p>
        <p>
          We channeled into you{" "}
          <a href="https://www.are.na/block/34107567">
            the words of Sal Randolph
          </a>
          : &quot;The line between gift to the other and pleasure for the self
          is always blurred and shifting. The gift goes back and forth a
          thousand times a day. It&#39;s a kind of game.&quot; Little did we
          know how short and blurry the day would be, that the game had already
          well begun. We channeled into you{" "}
          <a href="https://www.are.na/block/34500737">
            Robin Wall Kimmerer&#39;s story
          </a>{" "}
          of a hunter who, when asked by an anthropologist why he shared surplus
          meat instead of storing it for lean times, simply replied &quot;I
          store my meat in the belly of my brother.&quot; All the while, you
          were already filling our bellies to the brim.
        </p>
        <p>
          After we prompted you to give gifts, we requested gift interfaces:
          rituals and tools that create the context for giving. And in the
          resulting exchange, in between the literal responses to our query, a
          preposterous glimmer. Tacky! Inevitable! Exquisite! You were the gift
          interface the whole time.
        </p>
        <p>
          Thank you for all your propositions, questions, and stories throughout
          our time together. We cultivated generosity materially in our gifts
          but also spiritually in our mutual attention. Exploring these
          questions so core to our identity as a people together, we hope you
          have found a few ideas about the mystery of giftmaking. We hope the
          seeds you have (and will continue) planted find a way to grow beyond
          us into having lives of their own. And eventually through the
          universe, we hope they find their way back to you, like a longlost
          classmate, again and again and again.
        </p>
        <p>Love,</p>
      </>
    ),
    author: "Spencer and Elan",
    date: new Date("2025-05-20"),
  },
];

function ThankYouNote({ message, author, date }: ThankYouNoteProps) {
  return (
    <div className="flex flex-col gap-6 border-t border-white/20 pt-4">
      {message}
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
      {/* <textarea
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
      </div> */}
      <div className="flex flex-col gap-8 mt-8">
        {SAMPLE_THANK_YOUS.map((note, index) => (
          <ThankYouNote key={index} {...note} />
        ))}
      </div>
    </div>
  );
}
