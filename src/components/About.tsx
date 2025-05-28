export function About() {
  return (
    <div className="flex flex-col gap-4">
      <img src="class-img.png" />
      <p></p>
      <p></p>
      <hr />
      <h2 className="text-xl mb-0">Syllabus</h2>
      <div className="flex flex-col gap-8">
        <SyllabusWeek
          week={1}
          title="Receptivity"
          subline="Open yourself up to receiving gifts"
          slidesLink="#"
          sourceSheetLink="#"
        />
        <SyllabusWeek
          week={2}
          title="Attention"
          subline="What does it mean to truly pay attention to someone?"
          slidesLink="#"
          sourceSheetLink="#"
        />
        <div className="flex items-center gap-2 font-bold">
          <p className="font-bold">🎁 Give a gift to a stranger</p>
        </div>
        <SyllabusWeek
          week={3}
          title="Gift objects"
          subline="Lorem ipsum doler sit amet tis nobler der ipsum lorem duolium"
          slidesLink="#"
          sourceSheetLink="#"
        />
        <SyllabusWeek
          week={4}
          title="Gift containers"
          subline="Lorem ipsum doler sit amet tis nobler der ipsum lorem duolium"
          slidesLink="#"
          sourceSheetLink="#"
        />
        <div className="flex items-center gap-2 font-bold">
          <p className="font-bold">🎁 Give a gift to a loved one</p>
        </div>
        <SyllabusWeek
          week={5}
          title="Designing for the individual; gifting at scale"
          subline="Lorem ipsum doler sit amet tis nobler der ipsum lorem duolium"
          slidesLink="#"
          sourceSheetLink="#"
        />
        <SyllabusWeek
          week={6}
          title="Gift economies"
          subline="Lorem ipsum doler sit amet tis nobler der ipsum lorem duolium"
          slidesLink="#"
          sourceSheetLink="#"
        />
        <div className="flex items-center gap-2 font-bold">
          <p className="font-bold">🎁 Give a gift to a community or public</p>
        </div>
        <SyllabusWeek
          week={7}
          title="Gift interfaces (guest: Laurel Schwulst)"
          subline="Lorem ipsum doler sit amet tis nobler der ipsum lorem duolium"
          slidesLink="#"
          sourceSheetLink="#"
        />
        <SyllabusWeek
          week={8}
          title="Rituals"
          subline="Lorem ipsum doler sit amet tis nobler der ipsum lorem duolium"
          slidesLink="#"
          sourceSheetLink="#"
        />
        <SyllabusWeek
          week={9}
          title="Games & tools"
          subline="Lorem ipsum doler sit amet tis nobler der ipsum lorem duolium"
          slidesLink="#"
          sourceSheetLink="#"
        />
        <div className="flex items-center gap-2 font-bold">
          <p className="font-bold">🎁 Make an interface for gifting</p>
        </div>
        <SyllabusWeek
          week={10}
          title="Gift giving party"
          subline="Lorem ipsum doler sit amet tis nobler der ipsum lorem duolium"
          slidesLink="#"
          sourceSheetLink="#"
        />
      </div>
      <hr />
      <h2 className="text-xl mb-0">Teachers</h2>
      <p>
        <a href="https://spencer.place">
          <span className="text-gray-500">Spencer Chang</span>
        </a>{" "}
        is an artist, designer, and toymaker. You can follow their work by
        subscribing to{" "}
        <a href="https://spencerchang.substack.com/">spencer's paradoxes</a>.
      </p>
      <p>
        <a href="https://elan.place/">
          <span className="text-gray-500">Elan Ullendorff</span>
        </a>
        is a designer, educator, and writer. You can follow their work by
        subscribing to{" "}
        <a href="https://escapethealgorithm.substack.com/">
          Escape the Algorithm
        </a>
        .
      </p>
      <hr />
      <h2 className="text-xl mb-0">Links</h2>
      <p>
        <a href="https://open.spotify.com/playlist/6wg8puxlCshrUuzI4P8neT?si=3a1356092f844625">
          🎶 Playlist
        </a>
      </p>
      <p>
        <a href="https://are.na/elan-ullendorff/gifting-interfaces">
          📖 Are.na channel
        </a>
      </p>
      <p>
        {/* TODO: how to link this? */}
        <a href="https://www.figma.com/proto/6aQVSNetrvSNrHMh80hsPQ/gift-interfaces---slides?page-id=226%3A39&node-id=226-40&p=f&viewport=43%2C335%2C0.06&t=SBlzUqFrJz57WMyl-1&scaling=contain&content-scaling=fixed">
          🌅 Slides
        </a>
      </p>
    </div>
  );
}

function SyllabusWeek({
  week,
  title,
  subline,
  slidesLink,
  sourceSheetLink,
}: {
  week: number;
  title: string;
  subline: string;
  slidesLink: string;
  sourceSheetLink: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono font-bold">
        Week {week.toString().padStart(2, "0")}: {title}
      </span>
      <p className="text-black">{subline}</p>
      <p className="text-gray-500">
        <a href={slidesLink}>Lecture slides</a> •{" "}
        <a href={sourceSheetLink}>Source sheet</a>
      </p>
    </div>
  );
}
