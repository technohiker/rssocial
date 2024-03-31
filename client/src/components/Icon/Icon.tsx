import "./Icon.css";
import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import {
  faRss,
  faThumbsUp,
  faThumbsDown,
  faFolder,
  faBookmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

library.add(
  faReddit,
  faRss,
  faThumbsUp,
  faThumbsDown,
  faFolder,
  faBookmark,
  faBars
);

/** User inputs a string for a certain Icon name, and the proper icon will be returned. */
export function Icon({ name, className }: IIconProps) {
  const [iconName, setIconName] = useState<IconProp>(() => {
    switch (name) {
      case "reddit":
        return faReddit as IconProp;
      case "rss":
        return faRss as IconProp;
      case "Like":
        return faThumbsUp as IconProp;
      case "Dislike":
        return faThumbsDown as IconProp;
      case "folder":
        return faFolder as IconProp;
      case "bookmark":
        return faBookmark as IconProp;
      case "hamburger":
        return faBars as IconProp;
      default:
        return {} as IconProp;
    }
  });

  return (
    <FontAwesomeIcon
      className={`fontawesome-icon icon-${name} ${className}`}
      icon={iconName}
    />
  );
}

interface IIconProps {
  name: string;
  className?: string;
}
