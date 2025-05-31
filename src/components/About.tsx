export function About() {
  return (
    <div className="flex flex-col gap-4">
      <img src="class-img.png" />
      <p>
        Gift Interfaces was a 10-week class taught by Spencer Chang and Elan
        Ullendorff at the School for Poetic Computation in 2025. We immersed
        ourselves in gift-giving cultures and practices to imagine design behind
        scale, questioned the norms of what shape a gift can take, and most
        importantly, gave and received: to and from each other, our loved ones,
        and our communities.
      </p>

      <p>
        For our final class, we held a potluck and gift wrapping party where we
        “wrapped” (documented) all the gifts given throughout the class and
        uploaded them to a gift interface. The resulting website represents the
        archive of our work together.
      </p>

      <p>
        Contact Spencer and Elan to learn more, or to bring a Gift Interfaces
        workshop to your community.
      </p>

      <hr />
      <h2 className="text-xl mb-0">Syllabus</h2>
      <div className="flex flex-col gap-8">
        <SyllabusWeek
          week={1}
          title="Receptivity"
          subline="Open yourself up to receiving gifts"
          slidesLink="https://www.figma.com/proto/6aQVSNetrvSNrHMh80hsPQ/gift-interfaces---slides?page-id=226%3A39&node-id=226-40&p=f&viewport=60%2C464%2C0.04&t=DOJKqHWZkcS5CcTm-1&scaling=contain&content-scaling=fixed"
          sourceSheetLink="https://www.are.na/sfpc-gifting-interfaces/week-1-receptivity"
        />
        <div className="flex items-center gap-2 font-bold">
          <p className="font-bold">🎁 Give a gift to a stranger</p>
        </div>
        <SyllabusWeek
          week={2}
          title="Attention"
          subline="What does it mean to truly pay attention to someone?"
          slidesLink="https://www.figma.com/proto/6aQVSNetrvSNrHMh80hsPQ/gift-interfaces---slides?page-id=0%3A1&node-id=375-55&p=f&viewport=243%2C-561%2C0.23&t=fMQ4HgNMJRmctBMz-1&scaling=contain&content-scaling=fixed"
          sourceSheetLink="https://www.are.na/sfpc-gifting-interfaces/week-2-attention"
        />
        <div className="flex items-center gap-2 font-bold">
          <p className="font-bold">🎁 Give a gift to a loved one</p>
        </div>
        <SyllabusWeek
          week={3}
          title="Gift objects"
          subline="What is a gift?"
          slidesLink="https://www.figma.com/proto/6aQVSNetrvSNrHMh80hsPQ/gift-interfaces---slides?page-id=146%3A2&node-id=386-161&p=f&viewport=212%2C-229%2C0.27&t=dF09x8DjUb8cvYRw-1&scaling=min-zoom&content-scaling=fixed"
          sourceSheetLink="https://www.are.na/sfpc-gifting-interfaces/week-3-gift-object"
        />
        <SyllabusWeek
          week={4}
          title="Gift containers"
          subline="we have a gift... now what? how do we make it feel like a gift?"
          slidesLink="https://www.figma.com/proto/6aQVSNetrvSNrHMh80hsPQ/gift-interfaces---slides?page-id=389%3A240&node-id=389-292&p=f&viewport=212%2C-229%2C0.27&t=b2kJNNcudwYMhO4w-1&scaling=contain&content-scaling=fixed"
          sourceSheetLink="https://www.are.na/sfpc-gifting-interfaces/week-4-gift-containers"
        />
        <div className="flex items-center gap-2 font-bold">
          <p className="font-bold">🎁 Give a gift to a community or public</p>
        </div>
        <SyllabusWeek
          week={5}
          title="Designing for the individual; gifting at scale"
          subline="How do you make a gift personal but scale beyond an individual?"
          slidesLink="https://www.figma.com/proto/6aQVSNetrvSNrHMh80hsPQ/gift-interfaces---slides?page-id=700%3A68&node-id=700-69&p=f&viewport=289%2C128%2C0.09&t=aLmEzPwrVKv0Wwlg-1&scaling=contain&content-scaling=fixed"
          sourceSheetLink="https://www.are.na/sfpc-gifting-interfaces/week-5-designing-for-the-individual-gifting-at-scale"
        />
        <SyllabusWeek
          week={6}
          title="Gift economies"
          subline="How can we create gifting cycles that outlast the original giver?"
          slidesLink="https://www.figma.com/proto/6aQVSNetrvSNrHMh80hsPQ/gift-interfaces---slides?page-id=389%3A346&node-id=389-398&p=f&viewport=159%2C-1834%2C0.32&t=Ykr0SmyaMvHN9l0R-1&scaling=contain&content-scaling=fixed"
          sourceSheetLink="https://www.are.na/sfpc-gifting-interfaces/week-6-gift-economies"
        />
        <div className="flex items-center gap-2 font-bold">
          <p className="font-bold">🎁 Make an interface for gifting</p>
        </div>
        <SyllabusWeek
          week={7}
          title="Gift interfaces (guest: Laurel Schwulst)"
          subline="Laurel Schwulst on the different gifting interfaces and gifts she's made"
          slidesLink="https://www.figma.com/proto/6aQVSNetrvSNrHMh80hsPQ/gift-interfaces---slides?page-id=836%3A89&node-id=836-120&p=f&viewport=25%2C202%2C0.04&t=5FM062teewmVsdJX-1&scaling=contain&content-scaling=fixed"
        />
        <SyllabusWeek
          week={8}
          title="Rituals"
          subline="How do rituals facilitate gifting?"
          slidesLink="https://www.figma.com/proto/6aQVSNetrvSNrHMh80hsPQ/gift-interfaces---slides?page-id=924%3A5&node-id=924-6&p=f&viewport=515%2C25%2C0.11&t=VTuzXGEFFhAwjcdh-1&scaling=contain&content-scaling=fixed"
          sourceSheetLink="https://www.are.na/sfpc-gifting-interfaces/week-8-gift-ritual-autobiographies"
        />
        <SyllabusWeek
          week={9}
          title="Games & tools"
          subline="Games and tools as gift-making environments and gifts themselves"
          slidesLink="https://www.are.na/sfpc-gifting-interfaces/week-9-games-and-tools"
          sourceSheetLink="https://www.figma.com/proto/6aQVSNetrvSNrHMh80hsPQ/gift-interfaces---slides?page-id=951%3A158&node-id=951-189&p=f&viewport=25%2C35%2C0.06&t=APRwGTp7bqP5Fi3q-1&scaling=contain&content-scaling=fixed"
        />
        <div className="flex items-center gap-2 font-bold">
          <p className="font-bold">
            🎁 Gift wrapping party (document your gifts)
          </p>
        </div>
        <SyllabusWeek
          week={10}
          title="Gift giving party"
          subline="Let's wrap our gifts (document them) and celebrate our time together"
          slidesLink="https://www.figma.com/proto/6aQVSNetrvSNrHMh80hsPQ/gift-interfaces---slides?page-id=1132%3A86&node-id=1132-87&p=f&viewport=25%2C254%2C0.2&t=iJ2wHVfHCorh6VRL-1&scaling=contain&content-scaling=fixed"
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
  sourceSheetLink?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono font-bold">
        Week {week.toString().padStart(2, "0")}: {title}
      </span>
      <p className="text-black">{subline}</p>
      <p className="text-gray-500">
        <a href={slidesLink}>Lecture slides</a>
        {sourceSheetLink && (
          <>
            {" "}
            •{" "}
            <a href={sourceSheetLink}>
              <span className="text-gray-500">Source sheet</span>
            </a>
          </>
        )}
      </p>
    </div>
  );
}
