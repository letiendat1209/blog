import { CheckCircle } from "lucide-react";
import { LineSquiggle } from "lucide-react";
import { CircleOff } from "lucide-react";
import { Timer } from "lucide-react";

export const labels = [
  {
    value: "linh tinh",
    label: "Linh Tinh",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
  {
    value: "code",
    label: "Code",
  },
];

export const statuses = [
  {
    value: "DRAFT",
    label: "draft",
    icon: LineSquiggle,
  },
  {
    value: "PUBLISHED",
    label: "published",
    icon: CheckCircle,
  },
  {
    value: "ARCHIVED",
    label: "archived",
    icon: CircleOff,
  },
];
