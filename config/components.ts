import { LucideIcon, AlertCircle, ArrowRight, ArrowLeft, Download, Upload, Share2, Settings, Search, HelpCircle, Printer, Filter, SortAsc } from 'lucide-react'
import ButtonDemo from "@/registry/default/components/comp-01"
import NeobrutalistButton from "@/registry/default/components/comp-02"
import SecondaryButton from "@/registry/default/components/comp-03"
import LoadingButton from "@/registry/default/components/comp-04"
import DestructiveButton from "@/registry/default/components/comp-05"
import IconButtonWithText from "@/registry/default/components/comp-07"
import SearchModeButton from "@/registry/default/components/comp-10"
import IconOnlyButton from "@/registry/default/components/comp-09"
import DownloadButton from "@/registry/default/components/comp-12"
import LinkButton from "@/registry/default/components/comp-13"
import SuggestedTeamsButton from "@/registry/default/components/comp-14"
import NotificationButton from "@/registry/default/components/comp-15"
import PrintButton from "@/registry/default/components/comp-16"
// import ShareButton from "@/registry/default/components/comp-17"
// import SuccessButton from "@/registry/default/components/comp-18"
// import WarningButton from "@/registry/default/components/comp-19"
// import DisabledButton from "@/registry/default/components/comp-20"
import BookmarkButton from "@/registry/default/components/comp-06"
import CopyButton from "@/registry/default/components/comp-08"
import VoiceModeButton from "@/registry/default/components/comp-11"
import FilterButton from "@/registry/default/components/comp-21"
import ViewToggleButton from "@/registry/default/components/comp-22"
import ToggleButton from "@/registry/default/components/comp-23"
import PropertyButton from "@/registry/default/components/comp-24"
import AppleLoginButtons from "@/registry/default/components/comp-26"
import TwitterLoginButtons from "@/registry/default/components/comp-27"
import GithubLoginButtons from "@/registry/default/components/comp-28"
import FacebookLoginButtons from "@/registry/default/components/comp-29"
import GoogleLoginButtons from "@/registry/default/components/comp-30"
import LinkedinLoginButtons from "@/registry/default/components/comp-31"
import MicrosoftLoginButtons from "@/registry/default/components/comp-32"
import TwitchLoginButtons from "@/registry/default/components/comp-33"
import RaycastCommandMenu from "@/registry/default/components/comp-34"
import LinearCommandMenu from "@/registry/default/components/comp-35"
import VercelCommandMenu from "@/registry/default/components/comp-36"
import SupabaseCommandMenu from "@/registry/default/components/comp-37"
import PerplexityCommandMenu from "@/registry/default/components/comp-38"
import SpotlightCommandMenu from "@/registry/default/components/comp-39"
import ClaudeCommandMenu from "@/registry/default/components/comp-40"
import ChatGPTCommandMenu from "@/registry/default/components/comp-41"

interface ButtonComponent {
  name: string
  description?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right' | 'both'
  disabled?: boolean
  loading?: boolean
  className?: string
  onClick?: () => void
  children?: React.ReactNode
}

export interface ComponentExample {
  name: string
  description?: string
  component: React.ComponentType<{ name?: string }>
}

export interface ComponentCategory {
  slug: string
  name: string
  description?: string
  components: ComponentExample[]
  type: "atom" | "molecule" | "organism" | "template" | "page" | "foundation"
  count: number
  preview?: string // For component preview images
  layout?: "default" | "column" // Layout type for the component grid
}

// export const FUTURE_CATEGORIES: ComponentCategory[] = [
//   // Foundation - Design tokens and base styles
//   {
//     slug: "colors",
//     name: "Colors",
//     type: "foundation",
//     count: 32,
//     description: "Color system and palettes",
//     components: [
//       { name: "Primary" }, { name: "Secondary" }, { name: "Neutral" },
//       { name: "Semantic" }, { name: "Gradients" }
//     ],
//   },
//   {
//     slug: "typography",
//     name: "Typography",
//     type: "foundation",
//     count: 24,
//     description: "Text styles and scales",
//     components: [
//       { name: "Headings" }, { name: "Body" }, { name: "Display" },
//       { name: "Mono" }, { name: "Font Weights" }
//     ],
//   },
//   {
//     slug: "spacing",
//     name: "Spacing",
//     type: "foundation",
//     count: 16,
//     description: "Layout spacing system",
//     components: [
//       { name: "Scale" }, { name: "Margins" }, { name: "Padding" }
//     ],
//   },

//   // Atoms - Fundamental building blocks
//   {
//     slug: "button",
//     name: "Button",
//     type: "atom",
//     count: 54,
//     description: "Core interactive elements",
//     components: [
//       { name: "Primary" }, { name: "Secondary" }, { name: "Ghost" },
//       // ... more variants
//     ],
//   },
//   {
//     slug: "input",
//     name: "Input",
//     type: "atom",
//     count: 59,
//     description: "Text input controls",
//     components: [
//       { name: "Default" }, { name: "With Icon" }, { name: "Search" },
//       // ... more variants
//     ],
//   },
//   {
//     slug: "badge",
//     name: "Badge",
//     type: "atom",
//     count: 13,
//     description: "Status indicators",
//     components: [
//       { name: "Default" }, { name: "Outline" }, { name: "Dot" },
//     ],
//   },
//   {
//     slug: "avatar",
//     name: "Avatar",
//     type: "atom",
//     count: 23,
//     description: "User representations",
//     components: [
//       // ... more variants
//     ],
//   },
//   {
//     slug: "checkbox",
//     name: "Checkbox",
//     type: "atom",
//     count: 20,
//     description: "Selection controls",
//     components: [
//       { name: "Default" }, { name: "Disabled" }, { name: "Group" },
//     ],
//   },
//   {
//     slug: "radio",
//     name: "Radio",
//     type: "atom",
//     count: 20,
//     description: "Single selection",
//     components: [
//       { name: "Default" }, { name: "Card" }, { name: "Group" },
//     ],
//   },
//   {
//     slug: "switch",
//     name: "Switch",
//     type: "atom",
//     count: 17,
//     description: "Toggle controls",
//     components: [
//       { name: "Default" }, { name: "Small" }, { name: "Large" },
//     ],
//   },
//   {
//     slug: "tooltip",
//     name: "Tooltip",
//     type: "atom",
//     count: 12,
//     description: "Contextual hints",
//     components: [
//       // ... more variants
//     ],
//   },
//   {
//     slug: "slider",
//     name: "Slider",
//     type: "atom",
//     count: 27,
//     description: "Range selection",
//     components: [
//       // ... more variants
//     ],
//   },

//   // Additional Atoms
//   {
//     slug: "icon",
//     name: "Icon",
//     type: "atom",
//     count: 150,
//     description: "Visual symbols",
//     components: [
//       { name: "System" }, { name: "Social" }, { name: "Custom" }
//     ],
//   },
//   {
//     slug: "divider",
//     name: "Divider",
//     type: "atom",
//     count: 8,
//     description: "Section separators",
//     components: [
//       { name: "Horizontal" }, { name: "Vertical" }, { name: "Decorated" }
//     ],
//   },

//   // Molecules - Combinations of atoms
//   {
//     slug: "accordion",
//     name: "Accordion",
//     type: "molecule",
//     count: 20,
//     description: "Collapsible sections",
//     components: [
//       { name: "Single" }, { name: "Multiple" }, { name: "Bordered" },
//     ],
//   },
//   {
//     slug: "alert",
//     name: "Alert",
//     type: "molecule",
//     count: 12,
//     description: "User notifications",
//     components: [
//       // ... more variants
//     ],
//   },
//   {
//     slug: "banner",
//     name: "Banner",
//     type: "molecule",
//     count: 12,
//     description: "Prominent messages",
//     components: [
//       // ... more variants
//     ],
//   },
//   {
//     slug: "breadcrumb",
//     name: "Breadcrumb",
//     type: "molecule",
//     count: 8,
//     description: "Navigation trails",
//     components: [
//       // ... more variants
//     ],
//   },
//   {
//     slug: "dialog",
//     name: "Dialog",
//     type: "molecule",
//     count: 21,
//     description: "Modal overlays",
//     components: [
//       { name: "Basic" }, { name: "Form" }, { name: "Alert" },
//     ],
//   },
//   {
//     slug: "dropdown",
//     name: "Dropdown",
//     type: "molecule",
//     count: 15,
//     description: "Contextual menus",
//     components: [
//       { name: "Basic" }, { name: "Nested" }, { name: "Radio Group" },
//     ],
//   },
//   {
//     slug: "popover",
//     name: "Popover",
//     type: "molecule",
//     count: 9,
//     description: "Floating content",
//     components: [
//       // ... more variants
//     ],
//   },
//   {
//     slug: "select",
//     name: "Select",
//     type: "molecule",
//     count: 51,
//     description: "Option selection",
//     components: [
//       { name: "Basic" }, { name: "Multiple" }, { name: "Combobox" },
//     ],
//   },
//   {
//     slug: "tabs",
//     name: "Tabs",
//     type: "molecule",
//     count: 20,
//     description: "Content organization",
//     components: [
//       { name: "Default" }, { name: "Underline" }, { name: "Pills" },
//     ],
//   },
//   {
//     slug: "textarea",
//     name: "Textarea",
//     type: "molecule",
//     count: 19,
//     description: "Multiline input",
//     components: [
//       // ... more variants
//     ],
//   },

//   // Additional Molecules
//   {
//     slug: "card",
//     name: "Card",
//     type: "molecule",
//     count: 35,
//     description: "Content containers",
//     components: [
//       { name: "Basic" }, { name: "Interactive" }, { name: "Media" },
//       { name: "Pricing" }, { name: "Profile" }
//     ],
//   },
//   {
//     slug: "form-group",
//     name: "Form Group",
//     type: "molecule",
//     count: 28,
//     description: "Input combinations",
//     components: [
//       { name: "Label + Input" }, { name: "With Validation" },
//       { name: "With Helper" }, { name: "Input Groups" }
//     ],
//   },

//   // Organisms - Complex components
//   {
//     slug: "calendar",
//     name: "Calendar & Date picker",
//     type: "organism",
//     count: 28,
//     description: "Date selection",
//     components: [
//       { name: "Date Picker" }, { name: "Range" }, { name: "Month" },
//     ],
//   },
//   {
//     slug: "notification",
//     name: "Notification",
//     type: "organism",
//     count: 22,
//     description: "Alert system",
//     components: [
//       { name: "Toast" }, { name: "Alert" }, { name: "Banner" },
//     ],
//   },
//   {
//     slug: "pagination",
//     name: "Pagination",
//     type: "organism",
//     count: 12,
//     description: "Page navigation",
//     components: [
//       // ... more variants
//     ],
//   },
//   {
//     slug: "stepper",
//     name: "Stepper",
//     type: "organism",
//     count: 17,
//     description: "Progress steps",
//     components: [
//       // ... more variants
//     ],
//   },
//   {
//     slug: "table",
//     name: "Table",
//     type: "organism",
//     count: 20,
//     description: "Data grids",
//     components: [
//       { name: "Basic" }, { name: "Sortable" }, { name: "Expandable" },
//     ],
//   },

//   // Additional Organisms
//   {
//     slug: "data-table",
//     name: "Data Table",
//     type: "organism",
//     count: 45,
//     description: "Complex data grids",
//     components: [
//       { name: "Sortable" }, { name: "Filterable" }, { name: "Selectable" },
//       { name: "Expandable" }, { name: "Virtual Scroll" }
//     ],
//   },
//   {
//     slug: "file-upload",
//     name: "File Upload",
//     type: "organism",
//     count: 25,
//     description: "File handling",
//     components: [
//       { name: "Drag & Drop" }, { name: "Multi Upload" },
//       { name: "Progress" }, { name: "Gallery" }
//     ],
//   },

//   // Templates
//   {
//     slug: "auth-templates",
//     name: "Authentication",
//     type: "template",
//     count: 18,
//     description: "Auth flow layouts",
//     components: [
//       { name: "Sign In" }, { name: "Sign Up" }, { name: "Reset Password" },
//       { name: "Two Factor" }, { name: "Social Auth" }
//     ],
//   },
//   {
//     slug: "dashboard-templates",
//     name: "Dashboard",
//     type: "template",
//     count: 22,
//     description: "Admin layouts",
//     components: [
//       { name: "Analytics" }, { name: "Commerce" }, { name: "CRM" },
//       { name: "Project" }, { name: "Content" }
//     ],
//   },

//   // Pages
//   {
//     slug: "landing-pages",
//     name: "Landing Pages",
//     type: "page",
//     count: 15,
//     description: "Complete pages",
//     components: [
//       { name: "Hero" }, { name: "Features" }, { name: "Pricing" },
//       { name: "Contact" }, { name: "Blog" }
//     ],
//   },
//   {
//     slug: "error-pages",
//     name: "Error Pages",
//     type: "page",
//     count: 8,
//     description: "Error states",
//     components: [
//       { name: "404" }, { name: "500" }, { name: "403" },
//       { name: "Maintenance" }
//     ],
//   }
// ]

export const categories: ComponentCategory[] = [
  {
    slug: "button",
    name: "Button",
    type: "atom",
    layout: "default",
    count: 28,
    description: "A collection of button components built with Tailwind CSS and React",
    components: [
      {
        name: "Primary",
        description: "Main call-to-action button",
        component: ButtonDemo
      },
      {
        name: "Secondary",
        description: "Alternative action button",
        component: SecondaryButton
      },
      {
        name: "Neobrutalist",
        description: "Button with neobrutalist design style",
        component: NeobrutalistButton
      },
      {
        name: "Loading State",
        description: "Button with loading spinner",
        component: LoadingButton
      },
      {
        name: "Destructive",
        description: "Dangerous action button",
        component: DestructiveButton
      },
      {
        name: "Bookmark",
        description: "Interactive bookmark button with state",
        component: BookmarkButton
      },
      {
        name: "Icon with Text",
        description: "Button with leading icon and text",
        component: IconButtonWithText
      },
      {
        name: "Copy",
        description: "Copy to clipboard with feedback",
        component: CopyButton
      },
      {
        name: "Icon Only",
        description: "Button with only an icon",
        component: IconOnlyButton
      },
      {
        name: "Voice Mode",
        description: "Toggle voice input mode",
        component: VoiceModeButton
      },
      {
        name: "Search Mode",
        description: "Toggle global search mode",
        component: SearchModeButton
      },

      {
        name: "Suggested Teams",
        description: "Button with suggested teams",
        component: SuggestedTeamsButton
      },
      {
        name: "Apple",
        description: "Apple login button with icon",
        component: AppleLoginButtons
      },
      {
        name: "Twitter",
        description: "Twitter/X login button with icon",
        component: TwitterLoginButtons
      },
      {
        name: "Github",
        description: "Github login button with icon",
        component: GithubLoginButtons
      },
      {
        name: "Facebook",
        description: "Facebook login button with icon",
        component: FacebookLoginButtons
      },
      {
        name: "Google",
        description: "Google login button with icon",
        component: GoogleLoginButtons
      },
      {
        name: "Linkedin",
        description: "Linkedin login button with icon",
        component: LinkedinLoginButtons
      },
      {
        name: "Microsoft",
        description: "Microsoft login button with icon",
        component: MicrosoftLoginButtons
      },
      {
        name: "Twitch Login",
        description: "Twitch login button with icon",
        component: TwitchLoginButtons
      },
      {
        name: "Link Style",
        description: "Button that looks like a link",
        component: LinkButton
      },
      {
        name: "With Badge",
        description: "Button with notification badge",
        component: NotificationButton
      },
      {
        name: "Print",
        description: "Button for print action",
        component: PrintButton
      },
      {
        name: "Filter",
        description: "Filter button with dropdown indicator",
        component: FilterButton
      },
      {
        name: "Download",
        description: "Button for downloading files",
        component: DownloadButton
      },
      {
        name: "View Toggle",
        description: "Toggle between different view layouts",
        component: ViewToggleButton
      },
      {
        name: "Toggle",
        description: "Toggle switch button",
        component: ToggleButton
      },
      {
        name: "Property Tag",
        description: "Property tag button with icon",
        component: PropertyButton
      },
    ]
  },
  {
    slug: "command-menu",
    name: "Command Menu",
    description: "Command menu components with various styles",
    type: "organism",
    count: 8,
    layout: "default",
    components: [
      {
        name: "Raycast Command Menu",
        description: "Command menu with Raycast style",
        component: RaycastCommandMenu
      },
      {
        name: "Linear Command Menu",
        description: "Command menu with Linear style",
        component: LinearCommandMenu
      },
      {
        name: "Vercel Command Menu",
        description: "Command menu with Vercel style",
        component: VercelCommandMenu
      },
      {
        name: "Supabase Command Menu",
        description: "Command menu with Supabase style",
        component: SupabaseCommandMenu
      },
      {
        name: "Perplexity Command Menu",
        description: "Command menu with Perplexity style",
        component: PerplexityCommandMenu
      },
      {
        name: "Spotlight Command Menu",
        description: "Command menu with macOS Spotlight style",
        component: SpotlightCommandMenu
      },
      {
        name: "Claude Command Menu",
        description: "Command menu with Claude (Anthropic) style",
        component: ClaudeCommandMenu
      },
      {
        name: "ChatGPT Command Menu",
        description: "Command menu with ChatGPT style",
        component: ChatGPTCommandMenu
      },
    ]
  },
]

export function getCategory(slug: string): ComponentCategory | undefined {
  return categories.find((category) => category.slug === slug)
} 