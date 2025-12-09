import { CheckCircle } from "lucide-react";
import { LineSquiggle } from "lucide-react";
import { CircleOff } from "lucide-react";
import { Timer } from "lucide-react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  AlertCircle,
} from "lucide-react";

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
  { label: "Draft", value: "draft", icon: LineSquiggle },
  { label: "Scheduled", value: "scheduled", icon: Timer },
  { label: "Published", value: "published", icon: CheckCircle },
  { label: "Archived", value: "archived", icon: CircleOff },
];

