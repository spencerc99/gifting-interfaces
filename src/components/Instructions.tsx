import { SpotifyRadio } from "./SpotifyRadio";

export const Instructions = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "-6px",
        backgroundColor: "white",
        fontSize: "12px",
      }}
      className="flex flex-col gap-4 py-4 px-8 pb-6 max-w-md rounded-xl shadow-lg"
    >
      <h1 className="text-7xl font-bold whitespace-nowrap">Gift Interfaces</h1>
      <p>
        The vessels on this page contain gifts developed by students at the{" "}
        <a href="https://sfpc.study">School for Poetic Computation's</a> Gift
        Interfaces class in{" "}
        <a href="https://sfpc.study/sessions/winter-25/gift-interfaces">
          Winter 2025
        </a>
        .
      </p>

      <p>
        Open a container to find the gift within. Then share it with a friend
        who would enjoy it.
      </p>

      {/* Add the functional radio at the bottom */}
      <div className="mt-4">
        <SpotifyRadio playlistUrl="https://open.spotify.com/embed/playlist/6wg8puxlCshrUuzI4P8neT" />
      </div>
    </div>
  );
};
