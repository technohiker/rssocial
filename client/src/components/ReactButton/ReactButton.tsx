import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { IconProp, icon, library } from "@fortawesome/fontawesome-svg-core";
import { faReddit } from "@fortawesome/free-brands-svg-icons";

library.add(faReddit, faRss);

export function ReactButton({
  sourceName,
  reactID,
  thisReaction,
}: IReactButtonProps) {
  const [iconName, setIconName] = useState<IconProp>({} as IconProp);

  switch (sourceName) {
    case "reddit":
      setIconName(faReddit as IconProp);
      break;
    case "rss":
      setIconName(faRss as IconProp);
  }

  return (
    <FontAwesomeIcon icon={iconName} />
    // <Button
    //   name="react-button"
    //   className={`${
    //     react.id === thisReaction ? "react-true" : ""
    //   } react-button`}
    //   onClick={() => addReaction(react.id)}
    // >
    //   <img src={react.img} alt={react.name} />
    // </Button>
    //<p>a</p>
  );
}

interface IReactButtonProps {
  sourceName: string;
  reactID: number | null;
  thisReaction: number | null;
}
