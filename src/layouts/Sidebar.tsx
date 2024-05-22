import { ChevronDown, ChevronUp, Clapperboard, Clock, FilmIcon, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import Button, { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../context/SidebarContext";
import { PageHeaderNavToggle } from "./Header";


export function Sidebar() {
    const { isLargeOpen, isSmallOpen, close } = useSidebarContext()
    return (
        <>
            <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}>
                <SmallSidebarItem Icon={Home} title="Home" url="/" />
                <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
                <SmallSidebarItem Icon={Clapperboard} title="Subscription" url="/subscription" />
                <SmallSidebarItem Icon={Library} title="Library" url="/library" />
            </aside>
            {isSmallOpen && (
                <div onClick={close} className="lg:hidden fixed inset-0 x-[9999] bg-secondary-dark opacity-50" />
            )}
            <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>
                <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                    <PageHeaderNavToggle />
                </div>
                <LargeSidebarSection visibleItemCount={1}>
                    <LargeSidebarItem isActive IconOrImageUrl={Home} title="Home" url="/" />
                    <LargeSidebarItem IconOrImageUrl={Clapperboard} title="Subscription" url="/subscription" />
                </LargeSidebarSection>
                <hr />

                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItem
                        IconOrImageUrl={Library}
                        title="Library"
                        url="/library"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={History}
                        title="History"
                        url="/history"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={PlaySquare}
                        title="Your Videos"
                        url="/your-videos"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={Clock}
                        title="Watch Later"
                        url="/playlist?list=WL"
                    />
                    {playlists.map(playlist => (
                        <LargeSidebarItem
                            key={playlist.id}
                            IconOrImageUrl={ListVideo}
                            title={playlist.name}
                            url={`/playlist?list=${playlist.id}`}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />

                <LargeSidebarSection visibleItemCount={4}>
                    {subscriptions.map(subscription => (
                        <LargeSidebarItem
                            key={subscription.id}
                            IconOrImageUrl={subscription.imgUrl}
                            title={subscription.channelName}
                            url={`/@${subscription.id}`}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />

                <LargeSidebarSection title="Explore">
                    <LargeSidebarItem
                        IconOrImageUrl={Flame}
                        title="Trending"
                        url="/trending"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={ShoppingBag}
                        title="Shopping"
                        url="/shopping"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={Music2}
                        title="Music" url="/music"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={FilmIcon}
                        title="Movies & TV"
                        url="/movies-tv"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={Radio}
                        title="Live"
                        url="/live"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={Gamepad2}
                        title="Gaming"
                        url="/gaming"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={Newspaper}
                        title="News"
                        url="/news"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={Trophy}
                        title="Sports"
                        url="/sports"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={Lightbulb}
                        title="Learning"
                        url="/learning"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={Shirt}
                        title="Fashion & Beauty"
                        url="/fashion-beauty"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={Podcast}
                        title="Podcasts"
                        url="/podcasts"
                    />
                </LargeSidebarSection>
            </aside>
        </>
    )
}

type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
}

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
    return (
        <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
            <Icon className="w-6 h-6" />
            <div className="text-sm">{title}</div>
        </a>
    )
}

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSidebarSection({
    children,
    title,
    visibleItemCount = Number.POSITIVE_INFINITY
}: LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const showExpandedButton = childrenArray.length > visibleItemCount
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown
    return (
        <div>
            {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
            {visibleChildren}
            {showExpandedButton &&
                <Button
                    onClick={() => setIsExpanded((e => !e))}
                    variant="ghost"
                    className="w-full flex items-center rounded-lg gap-4 p-3">
                    <ButtonIcon className="w-6 h-6" />
                    <div>{isExpanded ? "Show less" : "Show more"}</div>
                </Button>
            }
        </div >
    )
}

type LargeSidebarItemProps = {
    IconOrImageUrl: ElementType | string
    title: string
    url: string
    isActive?: boolean
}

function LargeSidebarItem({ IconOrImageUrl, title, url, isActive = false }: LargeSidebarItemProps) {
    return (
        <a href={url} className={twMerge(buttonStyles({
            variant: "ghost"
        }), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>
            {typeof IconOrImageUrl === "string" ? (
                <img src={IconOrImageUrl} alt="" className="w-6 h-6 rounded-full" />
            ) : (
                <IconOrImageUrl className="w-6 h-6" />
            )}
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
            </div>
        </a>
    )
}
